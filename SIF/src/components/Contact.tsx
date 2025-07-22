import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail } from 'lucide-react'; // Import Send icon
import { Label } from './label';

const Contact = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // **IMPORTANT**: Replace with the actual WhatsApp number you want contact messages to go to.
  const contactWhatsAppNumber = '+2348144733943'; // Your provided number (example)

  // For display only
  const contactEmail = 'studentsinteractiveforum@gmail.com';
  const displayPhoneNumber = '+2348144733943';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('submitting');

    if (!name || !phoneNumber || !message) {
      setSubmissionStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const whatsappMessageBody = `
New Contact Request!
Name: ${name}
Phone Number: ${phoneNumber}
Message:
${message}
`;

      const encodedMessage = encodeURIComponent(whatsappMessageBody);
      const whatsappLink = `https://wa.me/${contactWhatsAppNumber}?text=${encodedMessage}`;

      window.open(whatsappLink, '_blank');

      setSubmissionStatus('success');
      setIsSubmitting(false);
      setName('');
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      console.error('Failed to open WhatsApp link:', error);
      setSubmissionStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div id ="contact" className="bg-gradient-to-br from-white to-green-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-green-200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-green-700 text-sm">
                  Name
                </Label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="p-2 mt-1 block bg-green-50 text-green-700 border-green-300 placeholder:text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="text-green-700 text-sm">
                  Phone Number
                </Label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Your Phone Number"
                  required
                  className="p-2 mt-1 block bg-green-50 text-green-700 border-green-300 placeholder:text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-green-700 text-sm">
                  Message
                </Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="p-2 mt-1 block bg-green-50 text-green-700 border-green-300 placeholder:text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-full
                          hover:from-green-600 hover:to-green-800 transition-all duration-300
                          flex items-center justify-center gap-2"
              disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> {}
                    Send
                  </>
                )}
              </button>
              {submissionStatus === 'error' && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Please fill in all fields correctly before contacting us.
                </p>
              )}
              {submissionStatus === 'success' && (
                <p className="text-green-600 text-sm mt-2 text-center">
                  Contact request sent successfully! We'll get back to you soon.
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info (right side) - Still useful for users */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-green-200 flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-2xl font-bold text-green-700 mb-6">
              Reach Out Directly
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <Mail className="w-6 h-6 text-green-600" />
                <a href={`mailto:${contactEmail}`} className="hover:underline text-green-600">
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <Phone className="w-6 h-6 text-green-600" />
                <a href={`tel:${displayPhoneNumber}`} className="hover:underline text-green-600">
                  {displayPhoneNumber}
                </a>
              </div>
              <p className="text-gray-600 mt-4">
                We're here to answer any questions you have.
                Feel free to connect with us through the form or directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;