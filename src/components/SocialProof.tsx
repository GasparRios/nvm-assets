import { motion } from 'motion/react';
import { Activity, Zap, Maximize } from 'lucide-react';

export default function FieldValidation() {
  return (
    <section id="field-validation" className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Fondo sutil claro */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white rounded-[100%] blur-[120px] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* ENCABEZADO MINIMALISTA */}
        <div className="text-center mb-16 md:mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tighter text-gray-900 leading-tight"
          >
            Rendimiento <span className="text-[#0C8346]">sin límites.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed tracking-wide"
          >
            Llevamos la ingeniería estructural al límite. Absorción de impactos y agilidad de ensamblaje en tiempo real.
          </motion.p>
        </div>

        {/* GRILLA BENTO PURA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* TARJETA 1: Video de Curva de Nivel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden group"
          >
            <div className="w-full aspect-video relative overflow-hidden bg-gray-50 flex-shrink-0">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              >
                <source src="/CurvaNivelFinal.mp4" type="video/mp4" />
              </video>
            </div>
            
            <div className="p-8 md:p-10 flex flex-col flex-grow justify-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#0C8346]/10 text-[#0C8346] px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 w-max">
                  <Activity className="w-3 h-3 md:w-4 md:h-4" />
                  Estabilidad Dinámica
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-[#0C8346] transition-colors">
                Control en curvas de nivel.
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                A máxima velocidad, la fibra copia el terreno y absorbe las vibraciones naturalmente.
              </p>
            </div>
          </motion.div>

          {/* TARJETA 2: Video Timelapse GoPro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden group"
          >
            <div className="w-full aspect-[1920/696] relative overflow-hidden bg-gray-50 flex-shrink-0">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              >
                <source src="/GoproFinal.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="p-8 md:p-10 flex flex-col flex-grow justify-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#CCAB76]/10 text-[#CCAB76] px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 w-max">
                  <Zap className="w-3 h-3 md:w-4 md:h-4" />
                  Plug & Play
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-[#CCAB76] transition-colors">
                Ensamble inmediato.
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                Montaje rápido en minutos con solo 4 operarios. Sin grúas ni herramental especial.
              </p>
            </div>
          </motion.div>

          {/* TARJETA 3: Foto del Detalle (Horizontal) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 flex flex-col md:flex-row bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden group"
          >
            <div className="w-full md:w-[60%] aspect-[2560/1097] relative overflow-hidden bg-gray-50 flex-shrink-0">
              <img 
                src="/Still 2026-03-09 132054_1.1.1.jpg" 
                alt="Geometría panorámica del Botalón NVM en el lote" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center flex-grow w-full md:w-[40%]">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#329F5C]/10 text-[#329F5C] px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 w-max">
                  <Maximize className="w-3 h-3 md:w-4 md:h-4" />
                  Listo para AGTECH
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-[#329F5C] transition-colors">
                Preparado para el futuro.
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                Diseñado para soportar las nuevas tecnologías. Apto para selectiva, PWM y líneas extra
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
