import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,      // Dashboard
  Users,          // Usuarios
  UserSquare2,     // Candidatos
  Building2,      // Centros
  Settings,       // Configuración
  FileText,       // Reportes
  TrendingUp,     // Resultados
  Shield,         // Auditoría
  UserCheck,      // Padrón Electoral
  Brain,          // Análisis de Datos
  KeyRound,       // 🔑 Roles y Permisos (nuevo)
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  // Menú principal
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/admin" },
    { id: "usuarios", label: "Usuarios", icon: Users, path: "/admin/usuarios" },

    // 🔑 NUEVO SUBMÓDULO
    { id: "roles", label: "Roles y Permisos", icon: KeyRound, path: "/admin/roles" },

    { id: "candidatos", label: "Candidatos", icon: UserSquare2, path: "/admin/candidatos" },
    { id: "centros", label: "Centros de Votación", icon: Building2, path: "/admin/centros" },
    { id: "padron-electoral", label: "Padrón Electoral", icon: UserCheck, path: "/admin/padron-electoral" },
    { id: "configuracion", label: "Configuración", icon: Settings, path: "/admin/configuracion" },
    { id: "reportes", label: "Reportes", icon: FileText, path: "/admin/reportes" },
    { id: "resultados", label: "Resultados", icon: TrendingUp, path: "/admin/resultados" },
    { id: "analisis", label: "Análisis de Datos", icon: Brain, path: "/admin/analisis" },
    { id: "auditoria", label: "Auditoría", icon: Shield, path: "/admin/auditoria" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      {/* Encabezado */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-[#1E3A8A]">Panel ONPE 2026</h1>
      </div>

      {/* Navegación */}
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icono = item.icon;
          
          // Lógica de resaltado activo
          const isActive =
            location.pathname === item.path ||
            (item.id === 'dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/dashboard'));

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 font-medium transition-all ${
                isActive
                  ? "text-[#2563EB] bg-blue-50 border-r-4 border-[#2563EB]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icono className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
