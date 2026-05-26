import { motion } from 'framer-motion';
import { servicesData } from '../constants/portfolioData';

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="services" className="relative py-28 overflow-hidden bg-[#030014]">
      {/* Background ambient light gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] glow-orb-primary rounded-full blur-[120px] pointer-events-none opacity-20" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] glow-orb-secondary rounded-full blur-[120px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 select-none">
          <p className="font-mono-tech text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            04 // PROFESSIONAL ASSISTANCE
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            My <span className="text-gradient-purple filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">Services</span>
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Services grid cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 select-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                className="glass-card p-8 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] transition-all duration-400 shadow-xl flex flex-col justify-between h-72 relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ y: -5, border: "1px solid rgba(139, 92, 246, 0.2)" }}
              >
                {/* Background glow highlights centered in each service card */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  style={{
                    background: `radial-gradient(150px circle at 50% 50%, ${service.glow}, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  {/* Service Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-300 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent group-hover:scale-108 transition-all duration-300 shadow-md">
                    <Icon className="w-6 h-6 filter drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display font-extrabold text-lg text-slate-200 mt-6 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Service Details */}
                  <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Animated visual border neon bar at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
