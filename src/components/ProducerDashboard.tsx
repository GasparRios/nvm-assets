import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Leaf, Calculator, Gauge, AlertCircle } from 'lucide-react';

// --- MICRO-COMPONENTE 1: Telemetría (Contador animado estilo DJI) ---
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 1200; 

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); 
      
      setDisplayValue(Math.floor(ease * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <>{new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(displayValue)}</>;
}

// --- COMPONENTE PRINCIPAL ---
export default function ProducerDashboard() {
  const [horasAno, setHorasAno] = useState<number | ''>(1000);
  const [material, setMaterial] = useState<'Acero' | 'Aluminio' | 'Fibra Convencional'>('Acero');
  const [ancho, setAncho] = useState<number | ''>(36);
  const [diasParada, setDiasParada] = useState<number | ''>(12);
  const [nvmModelo, setNvmModelo] = useState<number | ''>(36);

  const [results, setResults] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleCalculate = () => {
    const safeHorasAno = Number(horasAno) || 0;
    const safeAncho = Number(ancho) || 0;
    const safeDiasParada = Number(diasParada) || 0;
    const safeNvmModelo = Number(nvmModelo) || 36;

    if (safeAncho < 10 || safeAncho > 60) {
      setErrorMsg('Por favor, ingresá un ancho de labor real (entre 10 y 60 metros).');
      return;
    }
    if (safeHorasAno <= 0 || safeHorasAno > 8760) {
      setErrorMsg('Las horas anuales deben estar entre 1 y 8760 (un año completo).');
      return;
    }
    if (safeDiasParada < 0 || safeDiasParada > 365) {
      setErrorMsg('Los días de parada deben ser un valor entre 0 y 365.');
      return;
    }
    setErrorMsg('');

    const matProps = {
      'Acero': { kgM: 40, baseSpeed: 16, penalty: 0.3 },
      'Aluminio': { kgM: 20, baseSpeed: 18, penalty: 0.2 },
      'Fibra Convencional': { kgM: 16.5, baseSpeed: 19.5, penalty: 0.1 }
    };

    const nvmAncho = safeNvmModelo;
    const nvmKgM = 11;
    const nvmBaseSpeed = 21;
    const nvmPenalty = 0.05;
    const nvmDiasParada = 1;

    // 1. Cálculos Máquina Actual
    const props = matProps[material];
    const currentWeight = safeAncho * props.kgM;
    const currentSpeed = Math.max(1, props.baseSpeed - ((safeAncho - 30) * props.penalty));
    
    const currentCap = (safeAncho * currentSpeed * 0.8) / 10;
    const currentTotalHa = currentCap * safeHorasAno;
    const currentDowntimeHa = safeDiasParada * 8 * currentCap; 

    const currentWheelLoad = (8000 + currentWeight * 1.3) / 2; 
    const currentPressure = currentWheelLoad / 3000; 
    const currentDamage = currentPressure > 1.5 ? 0.18 : 0.08; 
    const currentCompactionHa = currentTotalHa * (0.8 / safeAncho) * currentDamage * 4; 

    // 2. Cálculos NVM
    const nvmWeight = nvmAncho * nvmKgM;
    const nvmSpeed = Math.max(1, nvmBaseSpeed - ((nvmAncho - 30) * nvmPenalty)); 
    const nvmCap = (nvmAncho * nvmSpeed * 0.8) / 10;
    const nvmTotalHa = nvmCap * safeHorasAno;
    const nvmDowntimeHa = nvmDiasParada * 8 * nvmCap;

    const nvmWheelLoad = (8000 + nvmWeight * 1.3) / 2;
    const nvmPressure = nvmWheelLoad / 3000;
    const nvmDamage = nvmPressure > 1.5 ? 0.18 : 0.08;
    const nvmCompactionHa = nvmTotalHa * (0.8 / nvmAncho) * nvmDamage * 4;

    // 3. Diferencias y Tratamiento Visual
    const capGain = nvmTotalHa - currentTotalHa;
    const realDowntimeGain = currentDowntimeHa - nvmDowntimeHa;
    const realCompactionGain = currentCompactionHa - nvmCompactionHa;
    
    // Si la ganancia es negativa, mostramos 0 en la lista para no confundir.
    const displayCompactionGain = Math.max(0, realCompactionGain);
    const displayDowntimeGain = Math.max(0, realDowntimeGain);
    
    // Pero el total real suma todo (incluso si la logística da negativa).
    const grandTotal = capGain + realDowntimeGain + realCompactionGain;

    setResults({
      currentSpeed,
      currentWeight,
      nvmSpeed,
      nvmWeight,
      capGain,
      displayDowntimeGain, 
      displayCompactionGain, 
      grandTotal
    });
  };

  const numberFormatter = useMemo(() => {
    return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
  }, []);

  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const premiumInputClass = "w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-mono focus:border-[#329F5C] focus:ring-4 focus:ring-[#329F5C]/10 outline-none transition-all duration-300 shadow-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]";

  return (
    <section id="producer-dashboard" className="py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 text-center md:text-left tracking-tight">
            Impacto productivo real
          </h2>
          <p className="text-gray-500 max-w-2xl text-center md:text-left text-base md:text-lg">
            Descubrí cuántas hectáreas productivas estás perdiendo al año por culpa del peso, la inestabilidad y las roturas de tu botalón actual.
          </p>
        </div>

        {/* LAYOUT: Calculadora a Ancho Completo */}
        <Card className="w-full bg-white border border-gray-100 shadow-xl rounded-3xl relative overflow-hidden">
          <div className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-100">
                <Calculator className="w-4 h-4 text-[#329F5C]" />
              </div>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                Simulador Agronómico
              </span>
            </div>
          </div>

          <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            
            {/* LADO IZQUIERDO: Controles de Input */}
            <div className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <span>Horas de máquina al año</span>
                </label>
                <input
                  type="number"
                  value={horasAno}
                  onChange={(e) => { setHorasAno(e.target.value === '' ? '' : Number(e.target.value)); setResults(null); }}
                  className={premiumInputClass}
                  placeholder="Ej: 1000"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <span>Material actual</span>
                </label>
                <select
                  value={material}
                  onChange={(e) => { setMaterial(e.target.value as any); setResults(null); }}
                  className={premiumInputClass}
                >
                  <option value="Acero">Acero</option>
                  <option value="Aluminio">Aluminio</option>
                  <option value="Fibra Convencional">Fibra de Carbono (Otras marcas)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <span>Ancho actual (metros)</span>
                  </label>
                  <input
                    type="number"
                    value={ancho}
                    onChange={(e) => { setAncho(e.target.value === '' ? '' : Number(e.target.value)); setResults(null); }}
                    className={premiumInputClass}
                    placeholder="Ej: 36"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <span>Días de máquina parada</span>
                  </label>
                  <input
                    type="number"
                    value={diasParada}
                    onChange={(e) => { setDiasParada(e.target.value === '' ? '' : Number(e.target.value)); setResults(null); }}
                    className={premiumInputClass}
                    placeholder="Ej: 12"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-100 my-3"></div>

              <div className="space-y-1.5 p-3 bg-[#329F5C]/5 border border-[#329F5C]/10 rounded-xl">
                <label className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#329F5C] mb-1.5">
                  <span>Modelo NVM a comparar</span>
                </label>
                <select
                  value={nvmModelo}
                  onChange={(e) => { setNvmModelo(e.target.value === '' ? '' : Number(e.target.value)); setResults(null); }}
                  className={`${premiumInputClass} bg-white`}
                >
                  <option value={36}>NVM 36 metros</option>
                  <option value={40}>NVM 40 metros</option>
                </select>
              </div>

              <div className="pt-1">
                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl text-xs tracking-widest uppercase transition-colors shadow-md shadow-gray-900/20"
                  >
                    Calcular Impacto
                  </Button>
                </motion.div>
                
                <button
                  className="w-full mt-3 text-[11px] font-bold text-gray-400 hover:text-gray-600 tracking-wider uppercase transition-colors"
                  onClick={() => { setHorasAno(1000); setMaterial('Acero'); setAncho(36); setDiasParada(12); setNvmModelo(36); setResults(null); setErrorMsg(''); }}
                >
                  Restaurar Ejemplo
                </button>
              </div>
            </div>

            {/* LADO DERECHO: Resultados (Efecto Glassmorphism / Cristal) */}
            <div className="flex flex-col justify-center items-center relative h-full min-h-[380px] rounded-2xl overflow-hidden group">
              
              <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] rounded-2xl z-0" />

              <div className="relative z-10 text-center w-full px-4 md:px-6 py-6 flex flex-col justify-center h-full">
                {!results ? (
                  <div className="opacity-50 transition-opacity group-hover:opacity-80">
                    <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4 drop-shadow-sm" />
                    <h4 className="text-lg font-bold text-gray-800 mb-2 tracking-tight">Módulo en espera</h4>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                      Procesaremos los datos de tu máquina para simular su comportamiento en el lote y calcular tu pérdida de productividad.
                    </p>
                  </div>
                ) : (
                  <motion.div
                    key={results.grandTotal}
                    initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full flex flex-col justify-center"
                  >
                    
                    {/* Impacto Físico */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="bg-white/70 hover:bg-white/90 transition-colors rounded-xl p-3 border border-white/80 shadow-sm flex flex-col items-center justify-center backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 mb-0.5 text-gray-500">
                          <Leaf className="w-3.5 h-3.5 text-[#329F5C]" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Menos Peso</span>
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 font-mono tracking-tighter">
                          {(results.currentWeight - results.nvmWeight) > 0 ? '-' : '+'}
                          <AnimatedNumber value={Math.abs(results.currentWeight - results.nvmWeight)} />
                          <span className="text-xs text-gray-400 ml-1">kg</span>
                        </div>
                        <div className="text-[9px] text-gray-400 font-medium mt-0.5">
                          De {numberFormatter.format(results.currentWeight)} a {numberFormatter.format(results.nvmWeight)}
                        </div>
                      </div>

                      <div className="bg-white/70 hover:bg-white/90 transition-colors rounded-xl p-3 border border-white/80 shadow-sm flex flex-col items-center justify-center backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 mb-0.5 text-gray-500">
                          <Gauge className="w-3.5 h-3.5 text-[#329F5C]" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">+ Velocidad</span>
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 font-mono tracking-tighter">
                          {(results.nvmSpeed - results.currentSpeed) > 0 ? '+' : ''}
                          <AnimatedNumber value={Math.max(0, results.nvmSpeed - results.currentSpeed)} />
                          <span className="text-xs text-gray-400 ml-1">km/h</span>
                        </div>
                        <div className="text-[9px] text-gray-400 font-medium mt-0.5">
                          De {results.currentSpeed.toFixed(1)} a {results.nvmSpeed.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-[0.2em]">
                      Hectáreas Extra por Año*
                    </div>

                    {/* El contenedor con flex y whitespace-nowrap evita que se parta de línea */}
                    <div className="flex items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-3 font-mono tracking-tighter drop-shadow-sm whitespace-nowrap">
                      <span className="text-[#329F5C] mr-1.5 md:mr-2 text-4xl md:text-5xl lg:text-4xl xl:text-5xl leading-none">{results.grandTotal > 0 ? '+' : ''}</span>
                      <AnimatedNumber value={results.grandTotal} />
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-5 opacity-50"></div>

                    <div className="grid grid-cols-1 gap-2 w-full max-w-sm mx-auto">
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-between items-center bg-white/60 hover:bg-white/90 transition-colors p-3 rounded-lg border border-white/80 shadow-sm backdrop-blur-sm">
                        <span className="text-[10px] sm:text-xs text-gray-600 font-bold uppercase tracking-wider text-left">Ganadas por mayor Ancho y Velocidad</span>
                        <span className="text-sm font-mono font-bold text-gray-900 whitespace-nowrap shrink-0 ml-2">
                          {results.capGain > 0 ? '+' : ''}<AnimatedNumber value={results.capGain} /> ha
                        </span>
                      </motion.div>
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex justify-between items-center bg-white/60 hover:bg-white/90 transition-colors p-3 rounded-lg border border-white/80 shadow-sm backdrop-blur-sm">
                        <span className="text-[10px] sm:text-xs text-gray-600 font-bold uppercase tracking-wider text-left">Recuperadas por Logística (Reparaciones)</span>
                        <span className="text-sm font-mono font-bold text-gray-900 whitespace-nowrap shrink-0 ml-2">
                          {results.displayDowntimeGain > 0 ? '+' : ''}<AnimatedNumber value={results.displayDowntimeGain} /> ha
                        </span>
                      </motion.div>
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-between items-center bg-white/60 hover:bg-white/90 transition-colors p-3 rounded-lg border border-white/80 shadow-sm backdrop-blur-sm">
                        <span className="text-[10px] sm:text-xs text-gray-600 font-bold uppercase tracking-wider text-left">Salvadas por menor Compactación</span>
                        <span className="text-sm font-mono font-bold text-gray-900 whitespace-nowrap shrink-0 ml-2">
                          {results.displayCompactionGain > 0 ? '+' : ''}<AnimatedNumber value={results.displayCompactionGain} /> ha
                        </span>
                      </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-5 text-[9px] leading-relaxed text-gray-400/80 max-w-md mx-auto px-2 text-center font-sans">
                      * Aviso Legal: Todos los datos técnicos y cálculos de rendimiento mostrados en este sitio son estimaciones teóricas de carácter referencial. El desempeño real está sujeto a variables climáticas, operativas y del terreno. Esta información no constituye garantía de resultados ni oferta vinculante.
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
