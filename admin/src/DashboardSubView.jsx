import React, { useState, useEffect } from 'react';
import { UserCheck, Users, Clock, MessageSquare, Plus, Mail, FileSpreadsheet, ArrowUpRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function DashboardSubView({ setActiveTab }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/dashboard/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-green-700 font-semibold space-y-2">
        <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        <p>Loading Dashboard metrics...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500 font-semibold space-y-2">
        <p>{error || 'Could not fetch dashboard metrics.'}</p>
        <button 
          onClick={fetchStats} 
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const stats = [
    { 
      label: 'Total Registrations', 
      value: String(data.total_registrations), 
      change: '100% of registrations', 
      trend: 'up', 
      icon: Users, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      label: 'Male Registrations', 
      value: String(data.male_registrations), 
      change: `${data.total_registrations > 0 ? ((data.male_registrations * 100) / data.total_registrations).toFixed(1) : 0}% of total`, 
      trend: 'stable', 
      icon: UserCheck, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      label: 'Female Registrations', 
      value: String(data.female_registrations), 
      change: `${data.total_registrations > 0 ? ((data.female_registrations * 100) / data.total_registrations).toFixed(1) : 0}% of total`, 
      trend: 'stable', 
      icon: Clock, 
      color: 'text-pink-600 bg-pink-50' 
    },
    { 
      label: 'Added to WhatsApp', 
      value: String(data.added_to_whatsapp), 
      change: `${data.total_registrations > 0 ? ((data.added_to_whatsapp * 100) / data.total_registrations).toFixed(1) : 0}% of total`, 
      trend: 'up', 
      icon: MessageSquare, 
      color: 'text-emerald-600 bg-emerald-50' 
    },
  ];

  const departmentData = data.department_data;

  // SVG Trend Chart dynamic calculation
  const trendPoints = data.trend_data;
  const N = trendPoints.length;
  const maxCount = Math.max(...trendPoints.map(t => t.count), 1);
  
  const getX = (index) => {
    if (N <= 1) return 250;
    return (index * 500) / (N - 1);
  };
  
  const getY = (count) => {
    // 130 is the bottom baseline, 20 is the top padding, height is 150
    return 130 - (count / maxCount) * 110;
  };
  
  const linePath = trendPoints.map((t, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(t.count)}`).join(' ');
  const fillPath = trendPoints.length > 0 ? `${linePath} L ${getX(N - 1)} 150 L 0 150 Z` : '';

  return (
    <div className="space-y-8">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">SIF Summit 2.0 Admin Portal Console.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('registrations')}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Registrations</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition">
              <div className="text-left space-y-2">
                <span className="text-sm text-gray-500 font-medium block">{stat.label}</span>
                <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
                <span className="text-xs text-gray-400 font-semibold block">{stat.change}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <IconComp className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registrations Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2 text-left">
          <h3 className="text-base font-bold text-gray-800 mb-6">Registrations Over Time</h3>
          <div className="h-64 flex flex-col justify-between">
            <div className="relative w-full h-48 bg-gray-50 rounded-lg p-2 overflow-hidden border border-gray-100">
              <svg viewBox="0 0 500 150" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {trendPoints.length > 0 && (
                  <>
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d={fillPath}
                      fill="url(#chartGrad)"
                    />
                    {trendPoints.map((t, i) => (
                      <circle key={i} cx={getX(i)} cy={getY(t.count)} r="5" fill="#16a34a" />
                    ))}
                  </>
                )}
              </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-400 font-semibold px-2">
              {trendPoints.map((t, i) => (
                <span key={i}>{t.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown by Dept */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-left">
          <h3 className="text-base font-bold text-gray-800 mb-6">Registrations by Department</h3>
          <div className="space-y-4">
            {departmentData.length === 0 ? (
              <div className="text-xs text-gray-400 py-4 text-center">No department statistics available.</div>
            ) : (
              departmentData.map((dept, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-600">
                    <span>{dept.name}</span>
                    <span>{dept.count} ({dept.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${dept.color} rounded-full`} style={{ width: `${dept.percentage}%` }}></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Registrations list */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2 text-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-gray-800">Recent Registrations</h3>
            <button 
              onClick={() => setActiveTab('registrations')}
              className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold">
                  <th className="py-2 text-left">Full Name</th>
                  <th className="py-2 text-left">Department</th>
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.recent_registrations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-400">No registrations yet.</td>
                  </tr>
                ) : (
                  data.recent_registrations.map((reg, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="py-3 font-semibold text-gray-700">{reg.name}</td>
                      <td className="py-3 text-gray-500">{reg.dept}</td>
                      <td className="py-3 text-gray-500">{reg.date}</td>
                      <td className="py-3 text-right text-gray-400 font-medium">{reg.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registrations by Gender */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-left flex flex-col justify-between h-full">
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-6">Registrations by Gender</h3>
            <div className="space-y-6">
              {/* Male stats */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    <span>Male Attendees</span>
                  </div>
                  <span>{data.male_registrations} ({data.total_registrations > 0 ? ((data.male_registrations * 100) / data.total_registrations).toFixed(1) : 0}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                    style={{ width: `${data.total_registrations > 0 ? (data.male_registrations * 100) / data.total_registrations : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Female stats */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                    <span>Female Attendees</span>
                  </div>
                  <span>{data.female_registrations} ({data.total_registrations > 0 ? ((data.female_registrations * 100) / data.total_registrations).toFixed(1) : 0}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-500" 
                    style={{ width: `${data.total_registrations > 0 ? (data.female_registrations * 100) / data.total_registrations : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ratio bar */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <span>Ratio Breakdown</span>
              <span>Gender Balance</span>
            </div>
            <div className="mt-2 w-full h-4 rounded bg-gray-100 overflow-hidden flex shadow-inner">
              {data.total_registrations > 0 ? (
                <>
                  <div 
                    className="bg-blue-500 transition-all duration-500 flex items-center justify-center text-[9px] text-white font-bold" 
                    style={{ width: `${(data.male_registrations * 100) / data.total_registrations}%` }}
                  >
                    {data.male_registrations > 0 && `${((data.male_registrations * 100) / data.total_registrations).toFixed(0)}% M`}
                  </div>
                  <div 
                    className="bg-pink-500 transition-all duration-500 flex items-center justify-center text-[9px] text-white font-bold" 
                    style={{ width: `${(data.female_registrations * 100) / data.total_registrations}%` }}
                  >
                    {data.female_registrations > 0 && `${((data.female_registrations * 100) / data.total_registrations).toFixed(0)}% F`}
                  </div>
                </>
              ) : (
                <div className="w-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-semibold">
                  No attendees registered
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSubView;
