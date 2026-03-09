import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Leaf, Calculator, Hammer, Gauge, AlertCircle } from 'lucide-react';

// --- MICRO-COMPONENTE 1: Telemetría (Contador animado estilo DJI) ---
// Este componente agarra un número y lo hace "subir" desde 0 hasta el final en 1 segundo fluido.
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 1200; // 1.2 segundos de animación

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // Función matemática para que frene suavemente al llegar al final (Ease-out)
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

    // 3. Diferencias
    const capGain = nvmTotalHa - currentTotalHa;
    const downtimeGain = currentDowntimeHa - nvmDowntimeHa;
    const realCompactionGain = currentCompactionHa - nvmCompactionHa;
    
    const displayCompactionGain = Math.max(0, realCompactionGain);
    const grandTotal = capGain + downtimeGain + realCompactionGain;

    setResults({
      currentSpeed,
      currentWeight,
      nvmSpeed,
      nvmWeight,
      capGain,
      downtimeGain,
      displayCompactionGain, 
      grandTotal
    });
  };

  const numberFormatter = useMemo(() => {
    return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
  }, []);

  // Clases CSS Premium para inputs: Bordes suaves y resplandor verde sutil al hacer clic (Física Táctil)
  const premiumInputClass = "w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 font-mono focus:border-[#329F5C] focus:ring-4 focus:ring-[#329F5C]/10 outline-none transition-all duration-300 shadow-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]";

  return (
    <section id="producer-dashboard" className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 text-center md:text-left tracking-tight">
            Impacto productivo real
          </h2>
          <p className="text-gray-500 max-w-2xl text-center md:text-left text-lg">
            Descubrí cuántas hectáreas productivas estás perdiendo al año por culpa del peso, la inestabilidad y las roturas de tu botalón actual.
          </p>
        </div>

        {/* LAYOUT: Fila de Tarjetas Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-500 p-6 relative overflow-hidden group h-full flex flex-col justify-center rounded-2xl">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
              <Hammer className="w-24 h-24 text-[#CCAB76]" />
            </div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Mantenimiento</h3>
            <div className="flex flex-col gap-3 relative z-10">
              <div className="text-3xl font-bold text-gray-900 tracking-tight">Plug &amp; Play</div>
              <div className="text-[#CCAB76] font-medium flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCAB76] ring-4 ring-[#CCAB76]/20"></span>
                Lo instalan 4 personas
              </div>
              <div className="text-[#CCAB76] font-medium flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCAB76] ring-4 ring-[#CCAB76]/20"></span>
                Recambio fácil y rápido
              </div>
            </div>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-500 p-6 h-full flex flex-col justify-between rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Menos Peso</span>
              <Leaf className="w-5 h-5 text-[#329F5C]" />
            </div>
            <div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-mono tracking-tighter break-words">
                {results ? (
                  <>
                    {(results.currentWeight - results.nvmWeight) > 0 ? '-' : '+'}
                    <AnimatedNumber value={Math.abs(results.currentWeight - results.nvmWeight)} />
                  </>
                ) : '--'}
              </span>
              <span className="text-lg text-gray-400 ml-1 font-medium">kg</span>
              
              {/* MICRO-INTERACCIÓN: Sparkline (Barrita comparativa) */}
              {results && (
                <div className="mt-4 space-y-2">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${Math.min(100, (results.nvmWeight / results.currentWeight) * 100)}%` }} 
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-[#329F5C] h-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                    <span>NVM: {numberFormatter.format(results.nvmWeight)}kg</span>
                    <span>Actual: {numberFormatter.format(results.currentWeight)}kg</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-500 p-6 h-full flex flex-col justify-between rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">+ Velocidad</span>
              <Gauge className="w-5 h-5 text-[#329F5C]" />
            </div>
            <div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-mono tracking-tighter break-words">
                {results ? (
                  <>
                    {(results.nvmSpeed - results.currentSpeed) > 0 ? '+' : ''}
                    <AnimatedNumber value={Math.max(0, results.nvmSpeed - results.currentSpeed)} />
                  </>
                ) : '--'}
              </span>
              <span className="text-lg text-gray-400 ml-1 font-medium">km/h</span>

              {/* MICRO-INTERACCIÓN: Sparkline (Barrita comparativa) */}
              {results && (
                <div className="mt-4 space-y-2">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${Math.min(100, (results.currentSpeed / results.nvmSpeed) * 100)}%` }} 
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gray-300 h-full"
                    />
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${Math.min(100, ((results.nvmSpeed - results.currentSpeed) / results.nvmSpeed) * 100)}%` }} 
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-[#329F5C] h-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                    <span>Actual: {results.currentSpeed.toFixed(1)} km/h</span>
                    <span>NVM: {results.nvmSpeed.toFixed(1)} km/h</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

        </div>

        {/* LAYOUT: Calculadora a Ancho Completo */}
        <Card className="w-full bg-white border border-gray-100 shadow-xl rounded-3xl relative overflow-hidden">
          <div className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <Calculator className="w-4 h-4 text-[#329F5C]" />
              </div>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                Simulador Agronómico
              </span>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* LADO IZQUIERDO: Controles de Input */}
            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
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

              <div className="space-y-2">
                <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
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

                <div className="space-y-2">
                  <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                    <span>Días de máquina parada al año</span>
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
              
              <div className="border-t border-gray-100 my-4"></div>

              <div className="space-y-2 p-4 bg-[#329F5C]/5 border border-[#329F5C]/10 rounded-xl">
                <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#329F5C] mb-2">
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

              <div className="pt-2">
                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {/* MICRO-INTERACCIÓN: Botón con física táctil (se hunde al hacer clic) */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-5 rounded-xl text-sm tracking-widest uppercase transition-colors shadow-lg shadow-gray-900/20"
                  >
                    Calcular Impacto
                  </Button>
                </motion.div>
                
                <button
                  className="w-full mt-4 text-xs font-bold text-gray-400 hover:text-gray-600 tracking-wider uppercase transition-colors"
                  onClick={() => { setHorasAno(1000); setMaterial('Acero'); setAncho(36); setDiasParada(12); setNvmModelo(36); setResults(null); setErrorMsg(''); }}
                >
                  Restaurar Ejemplo
                </button>
              </div>
            </div>

            {/* LADO DERECHO: Resultados (Efecto Glassmorphism / Cristal) */}
            <div className="flex flex-col justify-center items-center relative h-full min-h-[450px] rounded-2xl overflow-hidden group">
              {/* Fondo abstracto con gradientes (simula la luz detrás del cristal) */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#329F5C]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CCAB76]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              {/* Capa de cristal esmerilado */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] rounded-2xl z-0" />

              <div className="relative z-10 text-center w-full px-4 md:px-10 py-10 flex flex-col justify-center">
                {!results ? (
                  <div className="opacity-50 transition-opacity group-hover:opacity-80">
                    <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-6 drop-shadow-sm" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">Módulo en espera</h4>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                      Procesaremos los datos de tu máquina para simular su comportamiento en el lote y calcular tu pérdida de productividad.
                    </p>
                  </div>
                ) : (
                  <motion.div
                    key={results.grandTotal}
                    initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full"
                  >
                    <div className="text-xs text-gray-500 mb-3 font-bold uppercase tracking-[0.2em]">
                      Hectáreas Extra por Año
                    </div>

                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-4 font-mono tracking-tighter drop-shadow-sm break-words">
                      <span className="text-[#329F5C] mr-1 md:mr-2 text-4xl md:text-5xl align-top leading-tight">{results.grandTotal > 0 ? '+' : ''}</span>
                      <AnimatedNumber value={results.grandTotal} />
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 opacity-50"></div>

                    <div className="grid grid-cols-1 gap-3 w-full max-w-sm mx-auto">
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-between items-center bg-white/60 hover:bg-white/90 transition-colors p-4 rounded-xl border border-white/80 shadow-sm backdrop-blur-sm">
                        <span className="text-xs text-gray-600 font-bold uppercase tracking-wider text-left">Ganadas por mayor Ancho y Velocidad.</span>
                        <span className="text-base font-mono font-bold text-gray-900 whitespace-nowrap shrink-0">
                          {results.capGain > 0 ? '+' : ''}<AnimatedNumber value={results.capGain} /> ha
                        </span>
                      </motion.div>
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex justify-between items-center bg-white/60 hover:bg-white/90 transition-colors p-4 rounded-xl border border-white/80 shadow-sm backdrop-blur-sm">
                        <span className="text-xs text-gray-600 font-bold uppercase tracking-wider text-left">Recuperadas por Logística (Reparaciones)</span>
                        <span className="text-base font-mono font-bold text-gray-900 whitespace-nowrap shrink-0">
                          {results.downtimeGain > 0 ? '+' : ''}<AnimatedNumber value={results.downtimeGain} /> ha
                        </span>
                      </motion.div>
                      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-between items-center bg-white/60 hover:bg-white/90 transition-colors p-4 rounded-xl border border-white/80 shadow-sm backdrop-blur-sm">
                        <span className="text-xs text-gray-600 font-bold uppercase tracking-wider text-left">Salvadas por menor Compactación</span>
                        <span className="text-base font-mono font-bold text-gray-900 whitespace-nowrap shrink-0">
                          {results.displayCompactionGain > 0 ? '+' : ''}<AnimatedNumber value={results.displayCompactionGain} /> ha
                        </span>
                      </motion.div>
                    </div>
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
