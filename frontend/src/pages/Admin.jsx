import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Vote,
  Shield,
  LogOut,
  BarChart3,
  UserCheck,
  Settings,
  AlertCircle,
  Crown,
  Building2,
  Globe,
  FileText,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Verificar autenticación
    const auth = localStorage.getItem("adminAuth");
    const user = localStorage.getItem("adminUser");

    if (!auth || auth !== "true") {
      navigate("/admin/login");
    } else {
      setAdminUser(user || "Administrador");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  // Datos de ejemplo para estadísticas
  const estadisticas = {
    electoresHabiles: 12763599,
    participacionCiudadana: 9425702,
    porcentajeParticipacion: 73.848,
    actasProcesadas: 52.147,
    totalActas: 85000,
    actasRegistradas: 44324,
  };

  const resultadosPartidos = [
    { nombre: "Fuerza Democrática", numero: "1", porcentaje: 16.294, color: "#DC2626", logo: "FD" },
    { nombre: "Alianza País", numero: "2", porcentaje: 13.495, color: "#2563EB", logo: "AP" },
    { nombre: "Unidad Nacional", numero: "3", porcentaje: 12.094, color: "#EA580C", logo: "UN" },
    { nombre: "Renovación", numero: "4", porcentaje: 12.009, color: "#2563EB", logo: "R" },
    { nombre: "Partido Popular", numero: "5", porcentaje: 8.900, color: "#DC2626", logo: "PP" },
    { nombre: "Juntos por el Perú", numero: "6", porcentaje: 7.806, color: "#16A34A", logo: "JP" },
    { nombre: "Vamos con Todos", numero: "7", porcentaje: 5.941, color: "#DC2626", logo: "VW" },
    { nombre: "Avanzada", numero: "8", porcentaje: 5.937, color: "#2563EB", logo: "A" },
    { nombre: "Otros", numero: "9", porcentaje: 15.765, color: "#6B7280", logo: "OTROS" },
  ];

  const maxPorcentaje = Math.max(...resultadosPartidos.map((p) => p.porcentaje));

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          <div className="flex border-b border-gray-200">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "candidatos", label: "Candidatos", icon: Users },
              { id: "votos", label: "Votos", icon: Vote },
              { id: "usuarios", label: "Usuarios", icon: UserCheck },
              { id: "configuracion", label: "Configuración", icon: Settings },
            ].map((tab) => {
              const Icono = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
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

        {/* Contenido según tab activo */}
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={fadeUp}
              className="space-y-6"
            >
              {/* Barra de estadísticas superior */}
              <div className="bg-[#374151] text-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    {/* Selector de categoría */}
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        <span className="font-semibold">TODOS</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <p className="font-medium">Fórmula Presidencial</p>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="flex flex-wrap items-center gap-8">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{estadisticas.electoresHabiles.toLocaleString()}</p>
                        <p className="text-xs text-gray-300 mt-1">Electores Hábiles</p>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold">{estadisticas.participacionCiudadana.toLocaleString()}</p>
                        <p className="text-xs text-gray-300 mt-1">Participación Ciudadana</p>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold">{estadisticas.porcentajeParticipacion.toFixed(3)}%</p>
                        <p className="text-xs text-gray-300 mt-1">(%) Participación Ciudadana</p>
                      </div>

                      <div className="bg-[#2563EB] px-6 py-3 rounded-lg">
                        <p className="text-2xl font-bold">{estadisticas.actasProcesadas.toFixed(3)}%</p>
                        <p className="text-xs text-white/90 mt-1">Actas Procesadas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico de barras - Resultados por partido */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-[#1E3A8A] mb-6">
                  Resultados por Partido Político
                </h2>
                
                <div className="space-y-6">
                  {resultadosPartidos.map((partido, index) => (
                    <div key={index} className="flex items-center gap-4">
                      {/* Logo/Numero del partido */}
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
                        style={{ backgroundColor: partido.color }}
                      >
                        {partido.logo}
                      </div>

                      {/* Barra de porcentaje */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{partido.nombre}</span>
                          <span className="font-bold text-[#1E3A8A]">{partido.porcentaje.toFixed(3)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(partido.porcentaje / maxPorcentaje) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full rounded-full flex items-center justify-end pr-2"
                            style={{ backgroundColor: partido.color }}
                          >
                            <span className="text-white text-xs font-semibold">
                              {partido.porcentaje.toFixed(3)}%
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información adicional */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-[#2563EB]" />
                    <h3 className="text-lg font-semibold text-gray-900">Actas Registradas</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#1E3A8A] mb-2">
                    {estadisticas.actasRegistradas.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">de {estadisticas.totalActas.toLocaleString()} totales</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <UserCheck className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Participación</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#1E3A8A] mb-2">
                    {estadisticas.porcentajeParticipacion.toFixed(2)}%
                  </p>
                  <p className="text-sm text-gray-600">Ciudadanos que han votado</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Pendientes</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#1E3A8A] mb-2">
                    {(estadisticas.electoresHabiles - estadisticas.participacionCiudadana).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Ciudadanos que aún no han votado</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "candidatos" && (
            <motion.div
              key="candidatos"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1E3A8A]">Gestión de Candidatos</h2>
                <button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-lg font-medium transition-all">
                  + Agregar Candidato
                </button>
              </div>
              <p className="text-gray-600">Funcionalidad de gestión de candidatos en desarrollo...</p>
            </motion.div>
          )}

          {activeTab === "votos" && (
            <motion.div
              key="votos"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-6">Gestión de Votos</h2>
              <p className="text-gray-600">Funcionalidad de gestión de votos en desarrollo...</p>
            </motion.div>
          )}

          {activeTab === "usuarios" && (
            <motion.div
              key="usuarios"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-6">Gestión de Usuarios</h2>
              <p className="text-gray-600">Funcionalidad de gestión de usuarios en desarrollo...</p>
            </motion.div>
          )}

          {activeTab === "configuracion" && (
            <motion.div
              key="configuracion"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-6">Configuración del Sistema</h2>
              <p className="text-gray-600">Funcionalidad de configuración en desarrollo...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

