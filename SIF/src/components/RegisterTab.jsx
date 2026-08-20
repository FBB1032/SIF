import React, { useState } from 'react';
import { Send, CheckCircle, XCircle } from 'lucide-react';

// Set to true to re-open registration, false to close it
const REGISTRATION_OPEN = false;

function RegisterTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [level, setLevel] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('In-Person');
  const [gender, setGender] = useState('Male');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneStartsWithZero = phone.trim().startsWith('0');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage('');
    setSubmissionStatus('idle');

    if (!name || !email || !dept || !level || !phone) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (phoneStartsWithZero) {
      setSubmissionStatus('error');
      setSubmissionMessage('Invalid phone number. Remove the first 0 and enter your number after +234.');
      setIsSubmitting(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          dept,
          level,
          attendance,
          gender,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed.');
      }

      const data = await response.json();

      setSubmissionStatus('success');
      setSubmissionMessage('Registration Successful! Thank you for registering.');
      setName('');
      setEmail('');
      setDept('');
      setLevel('');
      setPhone('');
      setGender('Male');
    } catch (error) {
      console.error('Failed to submit registration:', error);
      setSubmissionStatus('error');
      
      // Check if it's a network/fetch failure (typically happens when the Render server is spun down and takes time to power up)
      const errorMsg = error.message || '';
      if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError') || errorMsg.includes('network') || errorMsg.includes('fetch')) {
        setSubmissionMessage('Unable to connect to the server. The backend may be booting up (Render free tier servers take about 50 seconds to power up). Please wait a few moments and click "Register Now" to retry registering.');
      } else {
        setSubmissionMessage(`${errorMsg}. Please check if the server is running and retry registering.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="bg-green-700 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Summit Registration 2.0</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto font-semibold uppercase tracking-wide">
            Theme: Beyond the Narrative: Redefining the Nigerian Trajectory
          </p>
        </div>
      </div>

      {REGISTRATION_OPEN ? (
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Form */}
          <div className="lg:col-span-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left border-b border-gray-100 pb-3">
              Register for Students' Interactive Summit 2.0
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="dept" className="block text-gray-700 text-sm font-bold mb-2">Department / Faculty</label>
                  <input
                    type="text"
                    id="dept"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Computer Science"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                  <input
                    type="text"
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="e.g. 300 Level"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <div className="flex items-stretch overflow-hidden rounded border border-gray-300 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent">
                    <span className="flex items-center bg-gray-100 px-3 text-sm font-semibold text-gray-700">+234</span>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 outline-none text-sm"
                      placeholder="Enter number without leading 0"
                      required
                    />
                  </div>
                  {phoneStartsWithZero && (
                    <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2">
                      <p className="text-sm font-semibold text-red-600">
                        Invalid phone number. Remove the first 0.
                      </p>
                    </div>
                  )}
                  <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2">
                    <p className="text-sm font-semibold text-red-600">
                      Please register with your WhatsApp number.
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="attendance" className="block text-gray-700 text-sm font-bold mb-2">Attendance Type</label>
                  <select
                    id="attendance"
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  >
                    <option value="In-Person">In-Person (On campus)</option>
                    <option value="Online">Online / Live Stream</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded shadow flex items-center justify-center gap-2 transition duration-200"
              >
                {isSubmitting ? 'Registering...' : (
                  <>
                    <Send className="w-5 h-5" />
                    Register Now
                  </>
                )}
              </button>
            </form>
            {submissionMessage && (
              <div className={`mt-4 p-4 rounded-lg border text-sm font-semibold text-center ${
                submissionStatus === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : submissionStatus === 'error' 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
                {submissionMessage}
              </div>
            )}
          </div>

          {/* Right Info */}
          <div className="lg:col-span-4 bg-green-50 p-6 rounded-xl border border-green-100 text-left space-y-6">
            <h3 className="text-xl font-bold text-green-800">Registration Info</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-700 block">Free Attendance</span>
                  Registration is 100% free but mandatory to secure entry.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-700 block">Limited Seats</span>
                  In-person sitting is capped. Register early to avoid missing out.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-700 block">Certificates Issued</span>
                  Official SIF Summit certificates will be sent to all registered attendees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="bg-red-600 text-white rounded-2xl shadow-xl px-10 py-14 max-w-xl w-full flex flex-col items-center gap-5">
            <XCircle className="w-16 h-16 text-white opacity-90" />
            <h2 className="text-3xl font-extrabold">Registration Closed</h2>
            <p className="text-red-100 text-base font-medium leading-relaxed">
              We've reached maximum capacity. Registration is no longer available for the Students' Interactive Summit 2.0.
            </p>
            <p className="text-red-200 text-sm">
              Thank you for your interest. Stay connected for future events.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterTab;
