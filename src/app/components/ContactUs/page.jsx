"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
    }
  };

  return (
    <div className="bg-white font-montserrat">
      <div className="container mx-auto px-6 py-16">
        <div className="lg:flex lg:items-center">
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop" 
              alt="Fashion Model" 
              className="w-full h-[600px] object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 tracking-wider uppercase">Get in Touch</h2>
              <p className="mt-2 text-gray-500">We'd love to hear from you. Please fill out this form.</p>
              <div className="mt-4 mx-auto lg:mx-0 w-24 h-1 bg-gray-900"></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-800" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-800" />
              </div>
              <div className="mt-6">
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-800" />
              </div>
              <div className="mt-6">
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-800"></textarea>
              </div>
              <div className="mt-6">
                <button type="submit" disabled={isSubmitting} className="uppercase text-sm font-bold tracking-wide bg-gray-900 text-gray-100 p-3 rounded-lg w-full hover:bg-gray-700 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {status && <p className="mt-4 text-center text-sm">{status}</p>}
            </form>
            <div className="mt-12 flex flex-col sm:flex-row justify-between text-center lg:text-left space-y-4 sm:space-y-0">
                <div className="flex items-center justify-center lg:justify-start">
                    <MapPin className="text-gray-800 mr-3" size={20}/>
                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                </div>
                 <div className="flex items-center justify-center lg:justify-start">
                    <Phone className="text-gray-800 mr-3" size={20}/>
                    <p className="text-gray-600">+880 123 456 7890</p>
                </div>
                 <div className="flex items-center justify-center lg:justify-start">
                    <Mail className="text-gray-800 mr-3" size={20}/>
                    <p className="text-gray-600">contact@khfashion.com</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
