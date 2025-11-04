import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Vote, Shield, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // ✅ Cierra el dropdown al hacer clic fuera (opcional)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Función que cierra todo al hacer clic en un enlace del menú
  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* 🔹 Logo estático sin hover */}
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

          {/* 🔹 Menú Desktop */}
          <ul className="hidden md:flex items-center space-x-8 text-gray-700">
            <li>
              <Link
                to="/"
                className="font-medium hover:text-blue-700 transition-colors relative group"
              >
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span>
              </Link>
            </li>

            {/* 🔹 Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="font-medium hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                Voto Digital
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 bg-slate-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-900">
                        Voto Seguro
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/voto-digital"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors"
                    >
                      ¿Cómo votar digitalmente?
                    </Link>
                    <Link
                      to="/requisitos"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors"
                    >
                      Requisitos
                    </Link>
                    <Link
                      to="/seguridad"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors"
                    >
                      Seguridad y privacidad
                    </Link>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link
                to="/resultados"
                className="font-medium hover:text-blue-700 transition-colors relative group"
              >
                Resultados
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span>
              </Link>
            </li>

            <li>
              <Link
                to="/informacion"
                className="font-medium hover:text-blue-700 transition-colors relative group"
              >
                Información
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span>
              </Link>
            </li>

            {/* 🔹 Botón principal */}
            <li>
              <Link
                to="/votar"
                onClick={handleLinkClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-sm"
              >
                Ir a votar
              </Link>
            </li>
          </ul>

          {/* 🔹 Menú móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-slate-900 hover:text-blue-700 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 🔹 Contenido menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="block font-medium hover:text-blue-700 transition-colors py-2"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <button
                  onClick={toggleDropdown}
                  className="w-full text-left font-medium hover:text-blue-700 transition-colors flex items-center justify-between py-2"
                >
                  Voto Digital
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      to="/voto-digital"
                      onClick={handleLinkClick}
                      className="block text-gray-600 hover:text-blue-700 transition-colors py-1"
                    >
                      ¿Cómo votar digitalmente?
                    </Link>
                    <Link
                      to="/requisitos"
                      onClick={handleLinkClick}
                      className="block text-gray-600 hover:text-blue-700 transition-colors py-1"
                    >
                      Requisitos
                    </Link>
                    <Link
                      to="/seguridad"
                      onClick={handleLinkClick}
                      className="block text-gray-600 hover:text-blue-700 transition-colors py-1"
                    >
                      Seguridad y privacidad
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <Link
                  to="/resultados"
                  onClick={handleLinkClick}
                  className="block font-medium hover:text-blue-700 transition-colors py-2"
                >
                  Resultados
                </Link>
              </li>

              <li>
                <Link
                  to="/informacion"
                  onClick={handleLinkClick}
                  className="block font-medium hover:text-blue-700 transition-colors py-2"
                >
                  Información
                </Link>
              </li>

              <li className="pt-2">
                <Link
                  to="/votar"
                  onClick={handleLinkClick}
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all text-center"
                >
                  Ir a votar
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
