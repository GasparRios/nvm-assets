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
    <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">
{/* Navigation / Logo Area */}
<div className="absolute top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center">
  <div className="flex items-center gap-3">
    {/* Logo Image */}
    <img 
      src="https://raw.githubusercontent.com/GasparRios/nvm-assets/main/1 - Logo estandar.png"
      alt="NVM Composites"
      className="h-12 md:h-16 object-contain invert brightness-0 saturate-0"
      onError={(e) => {
        // Fallback if image fails to load
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <div className="hidden font-black text-2xl md:text-3xl tracking-tighter italic flex">
      <span className="text-white">NVM</span>
      <span className="text-[#CCAB76] ml-1">COMPOSITES</span>
    </div>
  </div>

  <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
    <Button 
      onClick={() => scrollToSection('contact')} 
      className="bg-[#329F5C] hover:bg-[#0C8346] text-white border-none transition-all rounded-full px-8 py-3 text-xs font-bold tracking-widest shadow-lg shadow-[#329F5C]/20"
    >
      CONTACTO
    </Button>
  </div>
</div>

      {/* Background Image */}
<div className="absolute inset-0 z-0">
  <img
    src="https://raw.githubusercontent.com/GasparRios/nvm-assets/b309c0b022970e3aa905423ce8af3455a3b4073a/HeroImage.png" 
    alt="Carbon fiber"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
</div>

      {/* Main Content - Aligned Bottom Left */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 flex-grow flex flex-col justify-end pb-24 md:pb-32 lg:pb-48 pt-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[0.9]">
            Modular.<br />
            Ultraliviano.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCAB76] to-[#F5F5F7]">Imparable.</span>
          </h1>
          
          <p className="text-lg text-[#F5F5F7]/80 mb-10 max-w-xl font-light leading-relaxed border-l-2 border-[#329F5C] pl-6">
            Acelerá tu pulverización. El primer botalón de fibra de carbono que no compacta y se instala a mano, sin grúas ni demoras.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => scrollToSection('producer-dashboard')}
              className="bg-[#329F5C] hover:bg-[#0C8346] text-white border-none px-8 h-12 rounded-full hover:shadow-lg hover:shadow-[#329F5C]/20 transition-all"
            >
              <span className="font-bold tracking-wide">Performance</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => scrollToSection('oem-showcase')}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/60 px-8 h-12 rounded-full transition-all"
            >
              <span className="font-bold tracking-wide">Especificaciones</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Right Thumbnails / Features */}
      <div className="absolute bottom-10 right-6 md:right-10 z-20 hidden lg:flex gap-4">
        {[
          { title: "Fibra de Carbono", sub: "Ultraliviano", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop" },
          { title: "Instalación en minutos", sub: "Plug & Play", img: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?q=80&w=200&auto=format&fit=crop" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="group relative w-48 h-28 rounded-lg overflow-hidden border border-white/10"
          >
            <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[#CCAB76] text-xs font-mono uppercase">{item.sub}</span>
              <span className="text-white font-bold text-sm">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
