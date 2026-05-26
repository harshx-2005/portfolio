import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCopy, FaCheck, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaDiscord, FaPhoneAlt } from 'react-icons/fa';
import { personalDetails } from '../constants/portfolioData';

const FORMSPREE_FORM_ID = "https://formspree.io/f/mpqnyqrw"; // Replace with your actual Formspree form ID
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom toast notification states
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalDetails.socials.email);
    setCopied(true);
    triggerToast("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(personalDetails.socials.phone);
    setCopiedPhone(true);
    triggerToast("Phone number copied to clipboard!");
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const copyDiscord = () => {
    navigator.clipboard.writeText(personalDetails.socials.discord);
    setCopiedDiscord(true);
    triggerToast("Discord username copied to clipboard!");
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const validate = () => {
    let tempErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Sender name is required.";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message text is required.";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mpqnyqrw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        triggerToast("Transmission complete! Message delivered successfully.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        triggerToast(data.error || "Failed to transmit message. Please try again.");
      }
    } catch (err) {
      triggerToast("Network error. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-[#030014]">
      {/* Background glow overlay */}
      <div className="absolute top-[30%] left-[-10%] w-[380px] h-[380px] glow-orb-primary rounded-full blur-[100px] pointer-events-none opacity-25 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] glow-orb-secondary rounded-full blur-[100px] pointer-events-none opacity-20 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 select-none">
          <p className="font-mono-tech text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            07 // LET'S TALK
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Contact <span className="text-gradient-purple filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">Me</span>
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Direct contact info */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 select-none">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
              Have a system in mind? <br />
              <span className="text-indigo-400">Let's compile it together.</span>
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              I am open to engineering partnerships, freelance developments, and technical MERN/Django opportunities. Drop your specifications in the dispatch panel and I'll follow up shortly.
            </p>

            <div className="flex flex-col gap-4">
              {/* Location Badge */}
              <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex items-center gap-4 hover:border-blue-500/25 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">Location</h4>
                  <p className="text-sm font-semibold text-slate-200 mt-0.5">{personalDetails.location}</p>
                </div>
              </div>

              {/* Phone Badge */}
              <div 
                onClick={copyPhone}
                className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex items-center justify-between gap-4 hover:border-cyan-500/25 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <FaPhoneAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">Phone</h4>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{personalDetails.socials.phone}</p>
                  </div>
                </div>
                <button className="text-slate-400 group-hover:text-cyan-400 transition-colors mr-2">
                  {copiedPhone ? <FaCheck className="w-4 h-4 text-emerald-500" /> : <FaCopy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email Badge (Copy Trigger) */}
              <div 
                onClick={copyEmail}
                className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex items-center justify-between gap-4 hover:border-purple-500/25 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">Email</h4>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5 break-all">{personalDetails.socials.email}</p>
                  </div>
                </div>
                <button className="text-slate-400 group-hover:text-purple-400 transition-colors mr-2">
                  {copied ? <FaCheck className="w-4 h-4 text-emerald-500" /> : <FaCopy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social icons links */}
            <div className="flex items-center gap-4 mt-4 justify-center lg:justify-start">
              <a 
                href={personalDetails.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href={personalDetails.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href={personalDetails.socials.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <button 
                onClick={copyDiscord}
                className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-300 cursor-pointer"
                aria-label="Copy Discord username"
              >
                {copiedDiscord ? <FaCheck className="w-4 h-4 text-emerald-400" /> : <FaDiscord className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Right Column: Cyber mock Email Form Client */}
          <div className="w-full lg:w-[60%]">
            <div className="glass-card rounded-3xl border border-white/[0.06] bg-slate-950/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden select-none">
              
              {/* macOS bar decoration */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/40" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/40" />
                  <span className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <span className="font-mono-tech text-[10px] text-slate-500 uppercase tracking-widest">
                  secure_channel.sh
                </span>
                <div className="w-5 h-5" />
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-5 select-none">
                {/* Sender Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sender Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/30 focus:bg-white/[0.04] transition-all"
                  />
                  {errors.name && <p className="font-mono-tech text-[10px] text-red-400 mt-1 select-none">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-[10px] uppercase font-bold text-slate-400 tracking-wider">Return Channels (Email)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/30 focus:bg-white/[0.04] transition-all"
                  />
                  {errors.email && <p className="font-mono-tech text-[10px] text-red-400 mt-1 select-none">{errors.email}</p>}
                </div>

                {/* Message Specs */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tech text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Specifications (Message)</label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Outline your project requirements or hello message..."
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/30 focus:bg-white/[0.04] transition-all resize-none"
                  />
                  {errors.message && <p className="font-mono-tech text-[10px] text-red-400 mt-1 select-none">{errors.message}</p>}
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white cursor-pointer hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 select-none shadow-lg text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                      Transmitting Data Core...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      Transmit message
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Floating custom spring Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-4 rounded-xl bg-slate-900 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.35)] text-white select-none backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <FaCheck className="w-3 h-3" />
            </div>
            <p className="text-xs font-semibold">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
