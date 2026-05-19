import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import AnimatedTitle from '../components/AnimatedTitle';
import MatrixRain from '../components/MatrixRain';

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send email or data goes here
    console.log('Form Data:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Matrix Code Rain Background */}
      <MatrixRain />
      
      {/* Background Ambient Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none z-0 transition-colors duration-300 ${
        isLight ? 'bg-slate-200/30' : 'bg-white/5'
      }`}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <AnimatedTitle 
          text="Get In Touch"
          className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4 justify-center"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mb-16"
        >
          Have a project in mind or just want to say hi? Feel free to send me a message and I'll get back to you as soon as possible.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 w-full mt-4 items-stretch">
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className={`border rounded-sm p-6 backdrop-blur-sm relative overflow-hidden group h-full flex flex-col justify-between transition-all duration-300 ${
              isLight 
                ? 'border-slate-200/80 bg-white/80 shadow-lg shadow-slate-100/50' 
                : 'border-white/10 bg-[#0a0a0a]/50'
            }`}>
              {/* Corner decor lines for a futuristic terminal feel */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300 ${isLight ? 'border-black' : 'border-white'}`}></div>
              <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-300 ${isLight ? 'border-black' : 'border-white'}`}></div>
              <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-300 ${isLight ? 'border-black' : 'border-white'}`}></div>
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 ${isLight ? 'border-black' : 'border-white'}`}></div>
              
              <div>
                <h3 className={`text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2 transition-colors ${
                  isLight ? 'text-slate-900 font-bold' : 'text-white'
                }`}>
                  System Access Points
                </h3>
                
                <p className={`text-sm mb-6 leading-relaxed transition-colors ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}>
                  Connect via direct communication channels or view professional profiles on social networks.
                </p>
              </div>

              {/* Contact list */}
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {/* Phone Card */}
                <a 
                  href="tel:09918547240"
                  className={`flex items-center p-4 border rounded-sm transition-all duration-300 group/item ${
                    isLight 
                      ? 'bg-slate-50/50 border-slate-100 hover:border-black/35 hover:bg-slate-100/50' 
                      : 'bg-[#050505]/60 border-white/5 hover:border-white/35 hover:bg-white/5'
                  }`}
                >
                  <div className={`p-3 rounded-sm transition-all duration-300 mr-4 ${
                    isLight 
                      ? 'bg-slate-100 text-slate-800 group-hover/item:bg-black group-hover/item:text-white' 
                      : 'bg-white/10 text-white group-hover/item:bg-white group-hover/item:text-[#050505]'
                  }`}>
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`block text-[10px] tracking-widest uppercase font-semibold transition-colors ${
                      isLight ? 'text-slate-400' : 'text-gray-500'
                    }`}>Contact Number</span>
                    <span className={`font-mono text-sm tracking-wide transition-colors ${
                      isLight ? 'text-slate-855 group-hover/item:text-black font-semibold' : 'text-white group-hover/item:text-white'
                    }`}>09918547240</span>
                  </div>
                </a>

                {/* Facebook Card */}
                <a 
                  href="https://www.facebook.com/jesper.ian.villacorte.barila" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 border rounded-sm transition-all duration-300 group/item ${
                    isLight 
                      ? 'bg-slate-50/50 border-slate-100 hover:border-black/35 hover:bg-slate-100/50' 
                      : 'bg-[#050505]/60 border-white/5 hover:border-white/35 hover:bg-white/5'
                  }`}
                >
                  <div className={`p-3 rounded-sm transition-all duration-300 mr-4 ${
                    isLight 
                      ? 'bg-slate-100 text-slate-800 group-hover/item:bg-black group-hover/item:text-white' 
                      : 'bg-white/10 text-white group-hover/item:bg-white group-hover/item:text-[#050505]'
                  }`}>
                    <FaFacebook className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className={`block text-[10px] tracking-widest uppercase font-semibold transition-colors ${
                      isLight ? 'text-slate-400' : 'text-gray-500'
                    }`}>Social Network</span>
                    <span className={`text-sm truncate block transition-colors ${
                      isLight ? 'text-slate-855 group-hover/item:text-black font-semibold' : 'text-white group-hover/item:text-white'
                    }`}>jesper.ian.villacorte.barila</span>
                  </div>
                </a>

                {/* LinkedIn Card */}
                <a 
                  href="https://www.linkedin.com/in/jesper-ian-barila-269086334/?locale=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 border rounded-sm transition-all duration-300 group/item ${
                    isLight 
                      ? 'bg-slate-50/50 border-slate-100 hover:border-black/35 hover:bg-slate-100/50' 
                      : 'bg-[#050505]/60 border-white/5 hover:border-white/35 hover:bg-white/5'
                  }`}
                >
                  <div className={`p-3 rounded-sm transition-all duration-300 mr-4 ${
                    isLight 
                      ? 'bg-slate-100 text-slate-800 group-hover/item:bg-black group-hover/item:text-white' 
                      : 'bg-white/10 text-white group-hover/item:bg-white group-hover/item:text-[#050505]'
                  }`}>
                    <FaLinkedin className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className={`block text-[10px] tracking-widest uppercase font-semibold transition-colors ${
                      isLight ? 'text-slate-400' : 'text-gray-500'
                    }`}>Professional Link</span>
                    <span className={`text-sm truncate block transition-colors ${
                      isLight ? 'text-slate-855 group-hover/item:text-black font-semibold' : 'text-white group-hover/item:text-white'
                    }`}>Jesper Ian Barila</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 w-full space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`bg-[#0a0a0a] border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                    isLight 
                      ? 'focus:border-black/50 focus:ring-black/50' 
                      : 'focus:border-white/50 focus:ring-white/50'
                  }`}
                  placeholder="Your Full Name"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`bg-[#0a0a0a] border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                    isLight 
                      ? 'focus:border-black/50 focus:ring-black/50' 
                      : 'focus:border-white/50 focus:ring-white/50'
                  }`}
                  placeholder="test@gmail.com"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-400">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`bg-[#0a0a0a] border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                  isLight 
                    ? 'focus:border-black/50 focus:ring-black/50' 
                    : 'focus:border-white/50 focus:ring-white/50'
                }`}
                placeholder="Project Inquiry"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`bg-[#0a0a0a] border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors resize-none ${
                  isLight 
                    ? 'focus:border-black/50 focus:ring-black/50' 
                    : 'focus:border-white/50 focus:ring-white/50'
                }`}
                placeholder="Your message here..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full rounded-sm py-4 font-medium text-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                isLight 
                  ? 'bg-black/5 hover:bg-black/10 text-black border border-black/25' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              Send Message
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
