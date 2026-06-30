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
    src="/RenderWhiteFull.jpg"
    alt="Carbon fiber"
    className="w-full h-full object-cover"
  />
  {/* Fade-out hacia el gris-blanco (#FAFAFA) de las secciones siguientes: funde el hero sin corte visible */}
  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-[#FAFAFA]/40 to-[#FAFAFA] pointer-events-none" />
</div>

      {/* Main Content - Bottom Right */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 flex-grow flex flex-col justify-end items-end pb-8 md:pb-10 lg:pb-16 pt-32 [@media(max-height:500px)]:pt-16 [@media(max-height:500px)]:pb-4 text-right">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-end"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl [@media(max-height:500px)]:text-xl font-bold tracking-tight text-gray-900 mb-4 md:mb-5 [@media(max-height:500px)]:mb-2 leading-[1.1]">
            Modular.<br />
            Ultraliviano.<br />
            <span className="text-[#F97316]">Imparable.</span>
          </h1>
          
          <p className="text-sm md:text-base [@media(max-height:500px)]:text-xs text-gray-600 max-w-xl [@media(max-height:500px)]:max-w-[280px] sm:max-w-md lg:max-w-xl font-medium leading-relaxed [@media(max-height:500px)]:leading-snug border-r-4 border-[#329F5C] pr-4 md:pr-5">
            Acelerá tu pulverización. El primer botalón de fibra de carbono que no compacta y se instala a mano, sin grúas ni demoras.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
