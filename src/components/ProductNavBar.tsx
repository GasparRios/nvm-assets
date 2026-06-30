import { useEffect } from 'react';

export default function ProductNavBar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for header if needed
      const yOffset = -56; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="absolute top-0 z-50 w-full flex flex-col transition-all duration-300">
      <div className="relative w-full h-[60px] flex items-center">
      {/* Logo Container (Left) */}
      <div className="absolute left-4 sm:left-6 flex items-center gap-2 z-10">
        <img 
          src="/logo-estandar.png"
          alt="NVM Composites"
          className="h-5 sm:h-8 object-contain brightness-0"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="w-full flex justify-center pl-14 pr-20 sm:px-0">
        <ul className="flex items-center gap-0 sm:gap-4 md:gap-10">
          {['diseno', 'rendimiento', 'impacto'].map((id) => {
            const labels: Record<string, string> = {
              'diseno': 'Diseño',
              'rendimiento': 'Rendimiento',
              'impacto': 'Impacto'
            };
            if (id === 'home') return null;
            
            return (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className="capitalize font-semibold text-[10px] sm:text-[13px] md:text-[15px] transition-all duration-300 relative tracking-wide px-1 sm:px-2 py-1 text-[#329F5C] hover:text-[#0C8346] [text-shadow:_0_1px_12px_rgba(255,255,255,1)]"
                >
                  {labels[id]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="absolute right-3 md:right-8 flex items-center z-10">
        <button 
          onClick={() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-[#329F5C] hover:bg-[#0C8346] text-white transition-all rounded-full px-2 sm:px-3 py-1.5 md:px-4 md:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest shadow-lg shadow-[#329F5C]/20"
        >
          CONTACTO
        </button>
      </div>
      </div>
    </nav>
  );
}
