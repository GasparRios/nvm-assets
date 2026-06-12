import { motion } from 'motion/react';
import { Button } from './ui/Button';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">
      {/* Background Image */}
<div className="absolute inset-0 z-0">
  <img
    src="https://raw.githubusercontent.com/GasparRios/nvm-assets/2f52cad64e80664a0da76b1797fc24219550cf51/Render3White.png" 
    alt="Carbon fiber"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/20 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent md:hidden" />
</div>

      {/* Main Content - Bottom Right */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 flex-grow flex flex-col justify-end items-end pb-8 md:pb-10 lg:pb-16 pt-32 text-right">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-end"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 md:mb-5 leading-[1.1]">
            Modular.<br />
            Ultraliviano.<br />
            <span className="text-[#F97316]">Imparable.</span>
          </h1>
          
          <p className="text-sm md:text-base text-gray-600 max-w-xl font-medium leading-relaxed border-r-4 border-[#329F5C] pr-4 md:pr-5">
            Acelerá tu pulverización. El primer botalón de fibra de carbono que no compacta y se instala a mano, sin grúas ni demoras.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
