
import React, { useState } from 'react';

export function ContactForm(){
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', formData);
  };
    return(
         <div className="w-full min-w-0 lg:flex-1 rounded-xl shadow-md border hover:border-gray-100 p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-lg font-bold text-white mb-2">Send Me a Message</h3>
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-gray-500">
                  Full Name <span className="text-gray-400">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b6285] focus:border-[#1b6285] bg-gray-50/50"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-gray-500">
                  Email Address <span className="text-gray-400">*</span>
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b6285] focus:border-[#1b6285] bg-gray-50/50"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Subject Input */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500">
                Subject <span className="text-gray-400">*</span>
              </label>
              <div className="relative">
                <select 
                  required
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#1b6285] focus:border-[#1b6285] bg-gray-50/50 text-gray-700"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="" disabled hidden>Select a subject</option>
                  <option value="hire">Hire me !</option>
                  <option value="help">Need help ?</option>
                  <option value="question">General Question</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500">
                Your Message <span className="text-gray-400">*</span>
              </label>
              <textarea 
                rows={4}
                required
                placeholder="Type your message here..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1b6285] focus:border-[#1b6285] bg-gray-50/50 resize-none placeholder-gray-300"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#1b6285] hover:bg-[#144b67] text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 transform rotate-45 -translate-y-0.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              <span>Send Message</span>
            </button>
          </form>
        </div>
    )
}