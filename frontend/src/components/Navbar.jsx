import { useState } from "react";
import { Link } from "react-router-dom";
// --- CAMBIO: Importamos 'Eye' (para daltonismo) y 'Moon' (modo oscuro) ---
import { Menu, X, Vote, Shield, Accessibility, Baseline, Moon, Eye as DaltonismIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "../context/AccessibilityContext";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  
  // --- CAMBIO: Obtenemos los nuevos estados ---
  const { 
    fontSize, setFontSize, 
    darkMode, toggleDarkMode,
    highlightLinks, toggleHighlightLinks 
  } = useAccessibility();

  // (El resto de las funciones toggleMenu, handleLinkClick, etc. no cambian)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAccessibilityOpen(false); 
  };

  const toggleAccessibilityMenu = () => {
    setIsAccessibilityOpen(!isAccessibilityOpen);
    setIsMenuOpen(false); 
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsAccessibilityOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 border-b border-blue-100">
      
      {/* --- (El código del Navbar (logo, links, menú móvil) no cambia) --- */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-lg">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-semibold text-slate-900">SEDN</span>
              <span className="block text-xs text-gray-500 -mt-1">
                Sistema Electoral Digital Nacional
              </span>
            </div>
          </Link>
          <ul className="hidden md:flex items-center space-x-8 text-gray-700">
            <li><Link to="/" className="font-medium hover:text-blue-700 transition-colors relative group">Inicio<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span></Link></li>
            <li><Link to="/voto-digital" className="font-medium hover:text-blue-700 transition-colors relative group">Voto Digital<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span></Link></li>
            <li><Link to="/resultados" className="font-medium hover:text-blue-700 transition-colors relative group">Resultados<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span></Link></li>
            <li><Link to="/informacion" className="font-medium hover:text-blue-700 transition-colors relative group">Información<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span></Link></li>
            <li><Link to="/votar" onClick={handleLinkClick} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-sm">Ir a votar</Link></li>
            <li className="relative">
              <button
                onClick={toggleAccessibilityMenu}
                className={`p-2 rounded-lg transition-colors ${
                  isAccessibilityOpen
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
                title="Opciones de Accesibilidad"
              ><Accessibility className="w-5 h-5" /></button>
            </li>
            <li>
              <Link to="/admin/login" onClick={handleLinkClick} className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg" title="Acceso Administrativo">
                <Shield className="w-5 h-5" />
              </Link>
            </li>
          </ul>
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleAccessibilityMenu}
              className={`p-2 rounded-lg transition-colors ${
                isAccessibilityOpen
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-900 hover:text-blue-700"
              }`}
              title="Opciones de Accesibilidad"
            ><Accessibility className="w-6 h-6" /></button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-colors ${
                isMenuOpen
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-900 hover:text-blue-700"
              }`}
            >{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <ul className="space-y-3 text-gray-700">
              <li><Link to="/" onClick={handleLinkClick} className="block font-medium hover:text-blue-700 transition-colors py-2">Inicio</Link></li>
              <li><Link to="/voto-digital" onClick={handleLinkClick} className="block font-medium hover:text-blue-700 transition-colors py-2">Voto Digital</Link></li>
              <li><Link to="/resultados" onClick={handleLinkClick} className="block font-medium hover:text-blue-700 transition-colors py-2">Resultados</Link></li>
              <li><Link to="/informacion" onClick={handleLinkClick} className="block font-medium hover:text-blue-700 transition-colors py-2">Información</Link></li>
              <li className="pt-2"><Link to="/votar" onClick={handleLinkClick} className="block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all text-center">Ir a votar</Link></li>
              <li className="pt-2 border-t border-gray-200 mt-2"><Link to="/admin/login" onClick={handleLinkClick} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors py-2"><Shield className="w-5 h-5" /><span>Acceso Administrativo</span></Link></li>
            </ul>
          </div>
        )}
      </div>

      {/* --- CAMBIO: Panel de Accesibilidad Actualizado --- */}
      <AnimatePresence>
        {isAccessibilityOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 left-0 md:left-auto md:right-6 mt-2 w-auto md:w-80 mx-4 md:mx-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <p className="font-semibold text-gray-800 text-center">
                Opciones de Accesibilidad
              </p>
              
              {/* 1. Control de Tamaño de Texto */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-700 text-sm">Ajustar Texto</label>
                  <Baseline className="w-5 h-5 text-gray-500" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFontSize("text-size-md")}
                    className={`p-2 rounded-md font-bold text-sm ${fontSize === 'text-size-md' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >A</button>
                  <button
                    onClick={() => setFontSize("text-size-lg")}
                    className={`p-2 rounded-md font-bold text-lg ${fontSize === 'text-size-lg' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >A</button>
                  <button
                    onClick={() => setFontSize("text-size-xl")}
                    className={`p-2 rounded-md font-bold text-xl ${fontSize === 'text-size-xl' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >A</button>
                </div>
              </div>

              {/* --- CAMBIO: De 'Baja Visión' a 'Modo Oscuro' --- */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-700 text-sm">Modo Oscuro</label>
                  <Moon className="w-5 h-5 text-gray-500" />
                </div>
                <button
                  onClick={() => toggleDarkMode()}
                  className={`mt-2 w-full p-2 rounded-md font-semibold text-sm transition-colors ${
                    darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {darkMode ? "Desactivar" : "Activar"}
                </button>
              </div>

              {/* --- CAMBIO: Nuevo Botón (Resaltar Enlaces) --- */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-700 text-sm">Resaltar Enlaces (Daltonismo)</label>
                  <DaltonismIcon className="w-5 h-5 text-gray-500" />
                </div>
                <button
                  onClick={() => toggleHighlightLinks()}
                  className={`mt-2 w-full p-2 rounded-md font-semibold text-sm transition-colors ${
                    highlightLinks
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {highlightLinks ? "Desactivar" : "Activar"}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}