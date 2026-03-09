import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Download } from 'lucide-react';

export default function OEMShowcase() {
  return (
    <section id="oem-showcase" className="py-24 md:py-32 bg-[#FAFAFA] text-gray-900 relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
      {/* Fondo técnico minimalista estilo Apple */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white rounded-[100%] blur-[120px] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* ENCABEZADO ESTILO APPLE */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight text-gray-900 leading-tight md:leading-tight"
          >
            El <span className="text-[#0C8346]">nuevo estándar</span> <br className="hidden md:block" />
            en aplicación.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed tracking-wide"
          >
            Una estructura de fibra de carbono diseñada para maximizar el ancho de labor, eliminar vibraciones y montarse en minutos.
          </motion.p>
        </div>

        {/* ZONA DEL PLANO TÉCNICO (BLUEPRINT) - ESTÉTICA DJI */}
        <div className="relative w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-6 md:p-12">
          
          {/* Etiqueta técnica estilo Badge */}
          <div className="flex justify-center md:justify-start mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-100/80 border border-gray-200 text-gray-500 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
            >
              Vista frontal de un ala
            </motion.div>
          </div>

          {/* Container principal con SVG + anotaciones conectadas */}
          <div className="relative w-full">

            {/* ANOTACIONES ARRIBA */}
            <div className="relative w-full h-24 md:h-32 mb-2 hidden md:block">
              
              {/* Punto 1: Integración a Medida (~10%) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute flex flex-col items-center -translate-x-1/2 bottom-0"
                style={{ left: '10%' }}
              >
                <div className="text-center pb-2 md:pb-3">
                  <p className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Integración a Medida</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-[140px] leading-snug mx-auto">Montaje directo a cualquier máquina.</p>
                </div>
                <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent to-[#0C8346] opacity-40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0C8346] shadow-[0_0_8px_rgba(12,131,70,0.8)] mt-1"></div>
              </motion.div>

              {/* Punto 3: Plug & Play (~50%) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute flex flex-col items-center -translate-x-1/2 bottom-0"
                style={{ left: '50%' }}
              >
                <div className="text-center pb-2 md:pb-3">
                  <p className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Plug & Play</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-[140px] leading-snug mx-auto">Módulos reemplazables en el lote.</p>
                </div>
                <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent to-[#0C8346] opacity-40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0C8346] shadow-[0_0_8px_rgba(12,131,70,0.8)] mt-1"></div>
              </motion.div>

              {/* Punto 5: Puntera ZAFE (~90%) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 }}
                className="absolute flex flex-col items-center -translate-x-1/2 bottom-0"
                style={{ left: '90%' }}
              >
                <div className="text-center pb-2 md:pb-3">
                  <p className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Puntera Zafe</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-[140px] leading-snug mx-auto">Zafe bidireccional y ajustable.</p>
                </div>
                <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent to-[#0C8346] opacity-40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0C8346] shadow-[0_0_8px_rgba(12,131,70,0.8)] mt-1"></div>
              </motion.div>
            </div>

            {/* IMAGEN DEL BOTALÓN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full"
            >
              <img 
                src="/SVGFin.svg" 
                alt="Botalón pulverizadora NVM - Vista frontal" 
                className="w-full h-auto drop-shadow-sm"
              />
            </motion.div>

            {/* ANOTACIONES ABAJO */}
            <div className="relative w-full h-24 md:h-32 mt-2 hidden md:block">
              
              {/* Punto 2: Fibra de Carbono (~30%) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute flex flex-col items-center -translate-x-1/2 top-0"
                style={{ left: '30%' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0C8346] shadow-[0_0_8px_rgba(12,131,70,0.8)] mb-1"></div>
                <div className="w-px h-8 md:h-12 bg-gradient-to-t from-transparent to-[#0C8346] opacity-40"></div>
                <div className="text-center pt-2 md:pt-3">
                  <p className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Fibra de Carbono</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-[150px] leading-snug mx-auto">Hasta un 50% mas liviano que el carbono convencional.</p>
                </div>
              </motion.div>

              {/* Punto 4: Estabilidad Absoluta (~70%) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="absolute flex flex-col items-center -translate-x-1/2 top-0"
                style={{ left: '70%' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0C8346] shadow-[0_0_8px_rgba(12,131,70,0.8)] mb-1"></div>
                <div className="w-px h-8 md:h-12 bg-gradient-to-t from-transparent to-[#0C8346] opacity-40"></div>
                <div className="text-center pt-2 md:pt-3">
                  <p className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Estabilidad Absoluta</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-[150px] leading-snug mx-auto">Hasta 40 m de ancho de labor.</p>
                </div>
              </motion.div>

            </div>

            {/* LISTA DE CARACTERÍSTICAS PARA MÓVIL */}
            <div className="mt-8 flex flex-col gap-6 md:hidden">
              {/* Item 1 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-[#0C8346] mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(12,131,70,0.8)]"></div>
                <div>
                  <p className="text-base font-semibold text-gray-900 tracking-tight">Integración a Medida</p>
                  <p className="text-sm text-gray-500 mt-1">Montaje directo a cualquier máquina.</p>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-[#0C8346] mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(12,131,70,0.8)]"></div>
                <div>
                  <p className="text-base font-semibold text-gray-900 tracking-tight">Fibra de Carbono</p>
                  <p className="text-sm text-gray-500 mt-1">11 kg por metro, estructura ultra liviana.</p>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-[#0C8346] mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(12,131,70,0.8)]"></div>
                <div>
                  <p className="text-base font-semibold text-gray-900 tracking-tight">Plug & Play</p>
                  <p className="text-sm text-gray-500 mt-1">Módulos reemplazables en el lote, en tiempo record.</p>
                </div>
              </motion.div>

              {/* Item 4 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-[#0C8346] mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(12,131,70,0.8)]"></div>
                <div>
                  <p className="text-base font-semibold text-gray-900 tracking-tight">Estabilidad Absoluta</p>
                  <p className="text-sm text-gray-500 mt-1">Hasta 40 m de ancho (ambas alas).</p>
                </div>
              </motion.div>

              {/* Item 5 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-[#0C8346] mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(12,131,70,0.8)]"></div>
                <div>
                  <p className="text-base font-semibold text-gray-900 tracking-tight">Puntera Zafe</p>
                  <p className="text-sm text-gray-500 mt-1">Zafe bidireccional y ajustable.</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* LLAMADA A LA ACCIÓN (CTA) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
          className="flex flex-col items-center justify-center mt-12 gap-3"
        >
           <Button className="bg-[#111827] text-white hover:bg-black hover:scale-[1.02] transition-all duration-300 px-8 py-6 rounded-2xl text-sm tracking-widest uppercase font-semibold shadow-xl shadow-gray-900/10 border border-gray-800/50">
              <Download className="mr-2 w-5 h-5" /> Ficha Técnica
           </Button>
           <p className="text-xs text-gray-400 font-medium tracking-wide">Especificaciones (PDF)</p>
        </motion.div>

      </div>
    </section>
  );
}
