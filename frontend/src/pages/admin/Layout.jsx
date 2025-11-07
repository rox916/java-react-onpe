import { useNavigate, useLocation } from "react-router-dom";
import { Shield, LogOut, BarChart3, Users, Building2, Database, Activity, FileText } from "lucide-react";

/**
 * Layout.jsx - Componente de Layout Compartido para el Panel de Administración
 * 
 * Componente wrapper que proporciona la estructura común para todas las vistas del admin:
 * - Header con logo, título y botón de logout
 * - Barra de navegación con tabs para todas las secciones
 * - Detección automática de la ruta activa para resaltar el tab correspondiente
 * - Navegación entre secciones mediante React Router
 * - Contenedor para el contenido específico de cada vista (children)
 * 
 * Todas las vistas del admin (Admin, Candidatos, Partidos, Dataset, Monitoreo, Reportes)
 * utilizan este Layout para mantener una interfaz consistente.
 */
export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const adminUser = localStorage.getItem("adminUser") || "Administrador";

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/admin" },
    { id: "candidatos", label: "Candidatos", icon: Users, path: "/admin/candidatos" },
    { id: "partidos", label: "Partidos", icon: Building2, path: "/admin/partidos" },
    { id: "dataset", label: "Dataset", icon: Database, path: "/admin/dataset" },
    { id: "monitoreo", label: "Monitoreo", icon: Activity, path: "/admin/monitoreo" },
    { id: "reportes", label: "Reportes", icon: FileText, path: "/admin/reportes" },
  ];

  // Determinar el tab activo basado en la ruta actual
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.id : "dashboard";
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab) => {
    navigate(tab.path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#0F172A] p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1E3A8A]">
                  Panel de Administración
                </h1>
                <p className="text-sm text-gray-600">Sistema Electoral Digital Nacional</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">{adminUser}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs de navegación */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icono = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icono className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido */}
        {children}
      </div>
    </div>
  );
}

