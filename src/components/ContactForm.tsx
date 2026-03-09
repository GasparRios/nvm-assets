import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageCircle, Send, Loader2 } from 'lucide-react';

type UserType = 'producer' | 'oem';

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<UserType>('producer');
  const [whatsapp, setWhatsapp] = useState(true);
  
  // Nuevos estados para la lógica de envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // PEGA AQUÍ LA URL QUE COPIASTE DE GOOGLE APPS SCRIPT
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzyRlFk0x6kCetDsAAuNWIgo5bfsZIJ8DEZet7T31sMY2k1Z1zUNUA_S8-MxOQmMraP/exec";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        // mode: 'no-cors' es vital para evitar errores de políticas de seguridad al enviar a Google
        mode: 'no-cors' 
      });
      
      setIsSuccess(true);
      form.reset(); // Limpiamos el formulario
      
      // Opcional: Volver al estado normal después de 5 segundos
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white rounded-[100%] blur-[120px] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tighter leading-tight"
          >
            Tu botalón NVM <br className="hidden md:block"/>
            <span className="text-[#0C8346]">comienza acá.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto"
          >
            Dejanos tus datos y nos pondremos en contacto a la brevedad.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-6 md:p-12 relative overflow-hidden"
        >
          <div className="flex justify-center mb-10 md:mb-12">
            <div className="bg-gray-100/80 p-1.5 rounded-2xl inline-flex w-full md:w-auto">
              <button
                onClick={() => setActiveTab('producer')}
                className={`flex-1 md:flex-none px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'producer'
                    ? 'bg-[#0C8346] text-white shadow-[0_2px_10px_rgba(12,131,70,0.2)]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Soy Productor
              </button>
              <button
                onClick={() => setActiveTab('oem')}
                className={`flex-1 md:flex-none px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'oem'
                    ? 'bg-[#111111] text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Soy Fabricante
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Inputs ocultos para mandar el estado de los botones a Google Sheets */}
              <input type="hidden" name="tipoUsuario" value={activeTab === 'producer' ? 'Productor' : 'Fabricante'} />
              <input type="hidden" name="quiereWhatsapp" value={whatsapp ? 'Sí' : 'No'} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-[#0C8346]/10 focus:border-[#0C8346] transition-all placeholder:text-gray-400"
                    placeholder="Ej. Juan"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    required
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-[#0C8346]/10 focus:border-[#0C8346] transition-all placeholder:text-gray-400"
                    placeholder="Ej. Pérez"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-[#0C8346]/10 focus:border-[#0C8346] transition-all placeholder:text-gray-400"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              {activeTab === 'producer' ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-[#0C8346]/10 focus:border-[#0C8346] transition-all placeholder:text-gray-400"
                    placeholder="+54 9 11 ..."
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-[#0C8346]/10 focus:border-[#0C8346] transition-all placeholder:text-gray-400"
                      placeholder="Ej. AgroAplicaciones S.A."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Cargo</label>
                    <input
                      type="text"
                      name="cargo"
                      required
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-[#0C8346]/10 focus:border-[#0C8346] transition-all placeholder:text-gray-400"
                      placeholder="Ej. Gerente de Compras"
                    />
                  </div>
                </div>
              )}

              {/* RECUADRO DE WHATSAPP MEJORADO */}
              <div 
                className={`mt-6 flex items-start md:items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  whatsapp 
                    ? 'bg-[#25D366]/5 border-[#25D366] shadow-md shadow-[#25D366]/10 translate-y-[-2px]' 
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setWhatsapp(!whatsapp)}
              >
                <div className={`mt-1 md:mt-0 w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  whatsapp ? 'bg-[#25D366] border-[#25D366]' : 'bg-white border-gray-300'
                }`}>
                  {whatsapp && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-bold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    Quiero que me contacten por WhatsApp
                  </p>
                  <p className="text-gray-500 text-xs font-medium mt-1">Para una respuesta mucho más rápida y directa.</p>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full mt-8 h-14 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed ${
                  isSuccess 
                    ? 'bg-green-500 text-white' 
                    : activeTab === 'producer' 
                      ? 'bg-[#0C8346] hover:bg-[#0A6D3A] text-white shadow-[0_8px_20px_rgba(12,131,70,0.2)] hover:shadow-[0_8px_25px_rgba(12,131,70,0.3)] hover:-translate-y-0.5' 
                      : 'bg-[#111111] hover:bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSuccess ? (
                  <>¡Solicitud enviada con éxito! <Check className="w-5 h-5 ml-1" /></>
                ) : (
                  <>Enviar solicitud <Send className="w-4 h-4 ml-1" /></>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 font-medium mt-4">
                Tus datos están seguros y no enviamos spam.
              </p>

            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
