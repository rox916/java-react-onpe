/**
 * Componente de navegación principal
 * Barra de navegación responsive con menú móvil
 * Incluye enlaces a las páginas principales y acceso administrativo
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Vote, Shield } from "lucide-react";

export default function Navbar() {
  // Estado para controlar la visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Alternar la visibilidad del menú móvil
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Cerrar el menú móvil al hacer clic en un enlace
  const handleLinkClick = () => {
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

            <li>
              <Link
                to="/informacion#voto-digital"
                className="font-medium hover:text-blue-700 transition-colors relative group"
              >
                Voto Digital
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all"></span>
              </Link>
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

            {/* 🔹 Enlace Admin (discreto) */}
            <li>
              <Link
                to="/admin/login"
                onClick={handleLinkClick}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                title="Acceso Administrativo"
              >
                <Shield className="w-5 h-5" />
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
                <Link
                  to="/informacion#voto-digital"
                  onClick={handleLinkClick}
                  className="block font-medium hover:text-blue-700 transition-colors py-2"
                >
                  Voto Digital
                </Link>
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

              <li className="pt-2 border-t border-gray-200 mt-2">
                <Link
                  to="/admin/login"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors py-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>Acceso Administrativo</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
