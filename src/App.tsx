import Hero from './components/Hero';
import ProducerDashboard from './components/ProducerDashboard';
import OEMShowcase from './components/OEMShowcase';
import SocialProof from './components/SocialProof';
import ContactForm from './components/ContactForm';
import { Instagram } from 'lucide-react'; // <-- Importamos el ícono

export default function App() {
  return (
    <main className="bg-white min-h-screen text-gray-900 selection:bg-[#0C8346] selection:text-white relative">
      {/* Global Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      <Hero />
      <ProducerDashboard />
      <OEMShowcase />
      <SocialProof />
      <ContactForm />
      
      <footer className="py-8 bg-gray-50 border-t border-gray-200 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} NVM Composites. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Términos</a>
            
            {/* Botón de Instagram optimizado */}
            <a 
              href="https://www.instagram.com/nvmcomposites/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 hover:text-[#0C8346] transition-colors duration-300 font-medium"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}