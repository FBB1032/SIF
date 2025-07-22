import React, { useState } from 'react';
import { Send } from 'lucide-react'; // Import the Send icon

function Membership() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add isSubmitting state

  // This will be the SIF's WhatsApp number for new applications
  // **IMPORTANT**: Replace with the actual WhatsApp number you want to send applications to
  const sifWhatsAppNumber = '+2348144733943'; // Your provided number

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state
    setSubmissionMessage(''); // Clear previous messages

    // Basic form validation
    if (!name || !email || !phone) {
      setSubmissionMessage('Please fill in all required fields.');
      setIsSubmitting(false); // Reset submitting state on error
      return;
    }

    // Construct the message for WhatsApp, including the desired phrase.
    const message = `
Hello, I would like to register for (SIS) student interactive summit! These are my details for registration:

Name: ${name}
Email: ${email}
Phone: ${phone}
`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${sifWhatsAppNumber}?text=${encodedMessage}`;

    try {
      // Redirect directly to the WhatsApp link
      window.open(whatsappLink, '_blank'); // Opens in a new tab

      setSubmissionMessage('Thank you for your interest! Opening WhatsApp to complete your registration...');

      // Optionally, clear the form fields after submission
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Failed to open WhatsApp link:', error);
      setSubmissionMessage('Failed to open WhatsApp. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false); // Ensure submitting state is reset
    }
  };

  return (
    <section id="membership" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Register for Student Interactive Summit(SIS)</h2>
        <div className="max-w-lg mx-auto bg-white rounded-md shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label> {/* Changed label */}
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline w-full flex items-center justify-center gap-2" // Added flex classes
              disabled={isSubmitting} // Disable button during submission
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  <Send className="w-5 h-5" /> {/* Send icon */}
                  Submit Info
                </>
              )}
            </button>
          </form>

          {/* Submission message display */}
          {submissionMessage && (
            <p className="mt-4 text-center text-gray-700">{submissionMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Membership;