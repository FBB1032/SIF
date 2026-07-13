import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Menu, 
  X, 
  LogOut 
} from 'lucide-react';

// Import sub-views
import DashboardSubView from './DashboardSubView';
import RegistrationsSubView from './RegistrationsSubView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
    { label: 'Registrations', id: 'registrations', icon: UserCheck },
  ];

  const handleLogout = () => {
    // Redirect to the public website root
    window.location.href = '/';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardSubView setActiveTab={setActiveTab} />;
      case 'registrations':
        return <RegistrationsSubView />;
      default:
        return <DashboardSubView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-green-800 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold tracking-tight">SIF Admin Panel</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none p-1 rounded hover:bg-green-700"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar (Desktop & Mobile drawer) */}
      <aside
        className={`bg-green-900 text-white w-64 flex flex-col justify-between flex-shrink-0 transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0 fixed inset-y-0 left-0 z-50' : '-translate-x-full fixed inset-y-0 left-0 lg:relative lg:flex z-50'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-green-800 flex items-center justify-between">
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-lg font-bold tracking-tight">STUDENTS</span>
              <span className="text-[10px] tracking-widest text-green-300 uppercase font-semibold mt-0.5">Admin Portal</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-green-300 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-left">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded text-sm transition font-medium focus:outline-none ${
                    activeTab === item.id
                      ? 'bg-green-800 text-white font-semibold'
                      : 'text-green-100 hover:bg-green-800/40 hover:text-white'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Profile Details & Logout */}
        <div className="p-4 border-t border-green-800 space-y-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center font-bold text-white uppercase border border-green-600">
              AD
            </div>
            <div>
              <h4 className="text-sm font-bold leading-none">Admin SIF</h4>
              <span className="text-xs text-green-300">Super Admin</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600/20 hover:bg-red-600 text-red-100 hover:text-white py-2 rounded text-sm font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Main Panel Content */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
