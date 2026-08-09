import React, { useState, useEffect } from 'react';
import { Search, Filter, Check, X, Trash2, ShieldCheck, Mail, Phone, BookOpen, Plus, UserPlus, MessageSquare, FileSpreadsheet } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function RegistrationsSubView() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add Attendee Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newLevel, setNewLevel] = useState('300 Level');
  const [newAttendance, setNewAttendance] = useState('In-Person');
  const [newGender, setNewGender] = useState('Male');

  // Delete Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [attendeeToDelete, setAttendeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // WhatsApp Re-send Modal State
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsappAttendee, setWhatsappAttendee] = useState(null);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [linkType, setLinkType] = useState('group');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/registrations`);
      if (!response.ok) {
        throw new Error('Failed to fetch registrations');
      }
      const data = await response.json();
      setRegistrations(data);
      if (data.length > 0) {
        setSelectedAttendee(data[0]);
      } else {
        setSelectedAttendee(null);
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);



  const buildWhatsAppMessage = (reg, linkValue = '') => {
    const baseMessage = `Hello ${reg.name},\n\nThis is the Students' Interactive Forum (SIF) Admin.\n\nWe are pleased to confirm that your registration for the Students' Interactive Summit 2.0 has been approved!\n\nThank you for registering.`;

    if ((reg.attendance || '').toLowerCase() === 'online') {
      if (linkType === 'group') {
        return `${baseMessage}\n\nPlease join the official WhatsApp group here:\nhttps://chat.whatsapp.com/LvOCpBaU8EK02XjsAXqKOB?s=cl&p=a&ilr=0\n\nWe look forward to seeing you there!`;
      }

      return `${baseMessage}\n\nPlease use the event meeting link below:\n${linkValue || ''}\n\nWe look forward to seeing you there!`;
    }

    return `${baseMessage}\n\nPlease click the link below to join our official WhatsApp announcement group to receive further updates:\nhttps://chat.whatsapp.com/LvOCpBaU8EK02XjsAXqKOB?s=cl&p=a&ilr=0\n\nWe look forward to seeing you there!`;
  };

  const handleDirectOpenWhatsAppChat = async (reg, linkValue = '') => {
    const cleanedPhone = reg.phone.replace(/[^0-9]/g, '');
    const message = buildWhatsAppMessage(reg, linkValue);
    const encoded = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${cleanedPhone}?text=${encoded}`;
    
    window.open(whatsappLink, '_blank');
    
    if (reg.whatsapp !== 'Added') {
      try {
        const response = await fetch(`${API_URL}/api/registrations/${reg.id}/whatsapp`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ whatsapp: 'Added' }),
        });
        if (!response.ok) throw new Error('Failed to update WhatsApp status');
        const updatedReg = await response.json();
        
        const updated = registrations.map(item => item.id === reg.id ? updatedReg : item);
        setRegistrations(updated);
        if (selectedAttendee && selectedAttendee.id === reg.id) {
          setSelectedAttendee(updatedReg);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleOpenWhatsAppChat = (reg) => {
    if ((reg.attendance || '').toLowerCase() === 'online') {
      setWhatsappAttendee(reg);
      setIsWhatsAppModalOpen(true);
      setWhatsappLink('');
      setLinkType('group');
      return;
    }

    if (reg.whatsapp === 'Added') {
      setWhatsappAttendee(reg);
      setIsWhatsAppModalOpen(true);
      setWhatsappLink('');
      setLinkType('group');
    } else {
      handleDirectOpenWhatsAppChat(reg);
    }
  };

  const handleWhatsAppToggle = async (id) => {
    const currentReg = registrations.find(reg => reg.id === id);
    if (!currentReg) return;
    const nextState = currentReg.whatsapp === 'Added' ? 'Not Added' : 'Added';
    try {
      const response = await fetch(`${API_URL}/api/registrations/${id}/whatsapp`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp: nextState }),
      });
      if (!response.ok) throw new Error('Failed to update WhatsApp status');
      const updatedReg = await response.json();
      
      const updated = registrations.map(reg => reg.id === id ? updatedReg : reg);
      setRegistrations(updated);
      if (selectedAttendee && selectedAttendee.id === id) {
        setSelectedAttendee(updatedReg);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = (reg) => {
    setAttendeeToDelete(reg);
    setIsDeleteModalOpen(true);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!attendeeToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch(`${API_URL}/api/registrations/${attendeeToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete registration');
      
      const updated = registrations.filter(item => item.id !== attendeeToDelete.id);
      setRegistrations(updated);
      if (selectedAttendee && selectedAttendee.id === attendeeToDelete.id) {
        setSelectedAttendee(updated[0] || null);
      }
      setIsDeleteModalOpen(false);
      setAttendeeToDelete(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddAttendee = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPhone || !newDept) return;
    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          phone: newPhone,
          dept: newDept,
          level: newLevel,
          attendance: newAttendance,
          gender: newGender,
          whatsapp: 'Not Added',
          reason: 'Registered via Admin console.',
          expectations: 'Summit knowledge & networking.',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add attendee');
      }

      const newReg = await response.json();

      setRegistrations([newReg, ...registrations]);
      setSelectedAttendee(newReg);
      setIsModalOpen(false);

      // Reset Form
      setNewName('');
      setNewEmail('');
      setNewPhone('');
      setNewDept('');
    } catch (err) {
      alert(err.message);
    }
  };

  const formatRegId = (id) => `REG${String(id).padStart(3, '0')}`;
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };

  const handleExportCSV = () => {
    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      return `"${String(val).replace(/"/g, '""')}"`;
    };

    // CSV headers
    const headers = ['Registration ID', 'Full Name', 'Email', 'Phone Number', 'Department/Faculty', 'Level', 'Attendance Type', 'WhatsApp Status', 'Gender', 'Registration Date'];
    
    // Map registrations data rows (using filteredData so it matches current view filters)
    const rows = filteredData.map(reg => [
      escapeCSV(formatRegId(reg.id)),
      escapeCSV(reg.name),
      escapeCSV(reg.email),
      escapeCSV(reg.phone),
      escapeCSV(reg.dept),
      escapeCSV(reg.level),
      escapeCSV(reg.attendance),
      escapeCSV(reg.whatsapp),
      escapeCSV(reg.gender),
      escapeCSV(formatDate(reg.reg_date))
    ]);
    
    // Build CSV content
    const csvContent = [headers.map(escapeCSV).join(','), ...rows.map(e => e.join(','))].join('\n');
    
    // Create Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sif_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = registrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'All' || reg.gender === genderFilter;
    const matchesDept = deptFilter === 'All' || reg.dept === deptFilter;

    return matchesSearch && matchesGender && matchesDept;
  });

  const departments = ['All', ...new Set(registrations.map(r => r.dept))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Registrations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and audit students interactive summit registrations.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleExportCSV}
            className="bg-green-100 hover:bg-green-200 text-green-800 text-sm px-4 py-2.5 rounded font-bold flex items-center gap-2 transition shadow-sm"
          >
            <FileSpreadsheet className="w-4.5 h-4.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2.5 rounded font-bold flex items-center gap-2 transition shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Attendee</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, dept..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Filter:</span>
          </div>

          {/* Gender */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Department */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual Panel (List + Details) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Table Panel */}
        <div className="xl:col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold text-xs uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Department</th>
                  <th className="py-3 px-4 text-left">Level</th>
                  <th className="py-3 px-4 text-center">Attendance</th>
                  <th className="py-3 px-4 text-center">Gender</th>
                  <th className="py-3 px-4 text-left">Phone Number</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-green-700 font-medium">Loading registrations from database...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-red-500 font-medium">{error}</td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400 font-medium">No registrations found matching the filters.</td>
                  </tr>
                ) : (
                  filteredData.map((reg) => (
                    <tr
                      key={reg.id}
                      onClick={() => setSelectedAttendee(reg)}
                      className={`cursor-pointer transition ${
                        selectedAttendee && selectedAttendee.id === reg.id
                          ? 'bg-green-50/40 hover:bg-green-50/60'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-gray-800">
                        <div>
                          <span>{reg.name}</span>
                          <span className="text-[10px] text-gray-400 block font-normal mt-0.5">{reg.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">{reg.dept}</td>
                      <td className="py-3.5 px-4 text-gray-500">{reg.level}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full ${
                          (reg.attendance || '').toLowerCase() === 'online'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {reg.attendance || 'In-Person'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full ${
                          reg.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                          {reg.gender}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-left text-gray-500 font-medium">{reg.phone}</td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenWhatsAppChat(reg)}
                            title="Send WhatsApp Confirmation"
                            className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded transition flex items-center justify-center"
                          >
                            <FaWhatsapp className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(reg)}
                            title="Delete"
                            className="p-1 hover:bg-gray-100 text-gray-400 hover:text-red-500 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Card Panel */}
        <div className="xl:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-left space-y-6">
          {selectedAttendee ? (
            <>
              {/* Profile Card Header */}
              <div className="flex flex-col items-center border-b border-gray-100 pb-5 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center font-bold text-2xl text-green-700 uppercase border-2 border-green-200 shadow-inner mb-4">
                  {selectedAttendee.name.slice(0, 2)}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{selectedAttendee.name}</h3>
                <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full mt-2 ${
                  selectedAttendee.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                }`}>
                  {selectedAttendee.gender}
                </span>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">Personal Information</h4>
                <div className="space-y-3.5 text-sm text-gray-700">
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{selectedAttendee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Phone className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
                    <span>{selectedAttendee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
                    <span>{selectedAttendee.dept} ({selectedAttendee.level})</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
                    <span>Attendance: {selectedAttendee.attendance || 'In-Person'}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
                    <span>Gender: {selectedAttendee.gender}</span>
                  </div>
                </div>
              </div>

              {/* Additional Questions */}
              <div className="space-y-4 border-t border-gray-100 pt-5">
                <h4 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">Additional Information</h4>
                <div className="space-y-3.5">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">Why do you want to attend?</span>
                    <p className="text-xs text-gray-600 mt-1 italic">"{selectedAttendee.reason}"</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">What are your expectations?</span>
                    <p className="text-xs text-gray-600 mt-1 italic">"{selectedAttendee.expectations}"</p>
                  </div>
                </div>
              </div>

              {/* Redirection / Toggle buttons */}
              <div className="space-y-2 border-t border-gray-100 pt-5">
                <button
                  onClick={() => handleOpenWhatsAppChat(selectedAttendee)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded font-bold text-sm text-center flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <FaWhatsapp className="w-4.5 h-4.5" />
                  <span>Send WhatsApp Confirmation</span>
                </button>
                <button
                  onClick={() => handleDelete(selectedAttendee)}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded font-bold text-sm text-center flex items-center justify-center gap-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Registration</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
              <UserPlus className="w-12 h-12 mb-3 opacity-20" />
              <p>Select an attendee to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Attendee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden text-left animate-scaleIn">
            <div className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Add New Attendee</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-green-200 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAttendee} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="johndoe@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+234..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5">Department</label>
                  <input
                    type="text"
                    required
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Chemistry"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5">Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="100 Level">100 Level</option>
                    <option value="200 Level">200 Level</option>
                    <option value="300 Level">300 Level</option>
                    <option value="400 Level">400 Level</option>
                    <option value="500 Level">500 Level</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5">Attendance</label>
                  <select
                    value={newAttendance}
                    onChange={(e) => setNewAttendance(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1.5">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded text-sm transition shadow-sm"
              >
                Approve & Register Attendee
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && attendeeToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden text-left animate-scaleIn">
            <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Delete Registration</h3>
              <button 
                onClick={() => { setIsDeleteModalOpen(false); setAttendeeToDelete(null); setDeleteError(null); }} 
                className="text-red-200 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete the registration for <strong className="text-gray-800 font-bold">{attendeeToDelete.name}</strong>?
              </p>
              <p className="text-xs text-red-500 font-medium">
                This action is permanent and cannot be undone.
              </p>
              {deleteError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded">
                  {deleteError}
                </div>
              )}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => { setIsDeleteModalOpen(false); setAttendeeToDelete(null); setDeleteError(null); }}
                  className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded transition shadow-sm flex items-center gap-1.5"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Re-send Confirmation Modal */}
      {isWhatsAppModalOpen && whatsappAttendee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden text-left animate-scaleIn">
            <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Send WhatsApp Confirmation</h3>
              <button 
                onClick={() => { setIsWhatsAppModalOpen(false); setWhatsappAttendee(null); }} 
                className="text-emerald-200 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-gray-800 font-bold">{whatsappAttendee.name}</strong> has already been marked as added to WhatsApp. 
                Do you want to send the message again?
              </p>
              {(whatsappAttendee?.attendance || '').toLowerCase() === 'online' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-700">Choose the online link type</label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value="group">Group Link</option>
                    <option value="event">Event Link</option>
                  </select>
                  {linkType === 'event' && (
                    <input
                      type="url"
                      value={whatsappLink}
                      onChange={(e) => setWhatsappLink(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="https://..."
                    />
                  )}
                </div>
              )}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => { setIsWhatsAppModalOpen(false); setWhatsappAttendee(null); }}
                  className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDirectOpenWhatsAppChat(whatsappAttendee, whatsappLink);
                    setIsWhatsAppModalOpen(false);
                    setWhatsappAttendee(null);
                    setWhatsappLink('');
                    setLinkType('group');
                  }}
                  className="px-4 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition shadow-sm"
                >
                  Send Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationsSubView;
