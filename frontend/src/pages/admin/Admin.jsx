import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, FileText, UserCheck, AlertCircle, Users, Building2, Database, Activity, ArrowRight } from "lucide-react";
import Layout from "./Layout";

/**
 * Admin.jsx - Panel general / Dashboard
 * 
 * Vista principal del panel de administración que muestra:
 * - Tarjetas con totales (candidatos, partidos, estado de votaciones)
 * - Estadísticas generales del sistema
 * - Resultados por partido político
 * - Enlaces rápidos a otras secciones del admin
 */
export default function Admin() {
  const navigate = useNavigate();
  const [totalCandidatos, setTotalCandidatos] = useState(0);
  const [totalPartidos, setTotalPartidos] = useState(0);

  useEffect(() => {
    // Verificar autenticación
    const auth = localStorage.getItem("adminAuth");
    if (!auth || auth !== "true") {
      navigate("/admin/login");
    }

    // Cargar totales desde localStorage
    const candidatos = localStorage.getItem("candidatos");
    const partidos = localStorage.getItem("partidos");
    
    if (candidatos) {
      setTotalCandidatos(JSON.parse(candidatos).length);
    }
    if (partidos) {
      setTotalPartidos(JSON.parse(partidos).length);
    }
  }, [navigate]);

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
    <Layout>
      <motion.div
        initial="hidden"
        animate="visible"
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

        {/* Tarjetas de resumen con totales y enlaces rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#2563EB]" />
                <h3 className="text-lg font-semibold text-gray-900">Total Candidatos</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A8A] mb-2">
              {totalCandidatos}
            </p>
            <Link
              to="/admin/candidatos"
              className="text-sm text-[#2563EB] hover:text-[#1E40AF] font-medium flex items-center gap-1 transition-colors"
            >
              Ver candidatos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Total Partidos</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A8A] mb-2">
              {totalPartidos}
            </p>
            <Link
              to="/admin/partidos"
              className="text-sm text-[#2563EB] hover:text-[#1E40AF] font-medium flex items-center gap-1 transition-colors"
            >
              Ver partidos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Estado Dataset</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A8A] mb-2">
              Activo
            </p>
            <Link
              to="/admin/dataset"
              className="text-sm text-[#2563EB] hover:text-[#1E40AF] font-medium flex items-center gap-1 transition-colors"
            >
              Ver dataset <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Monitoreo</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A8A] mb-2">
              En línea
            </p>
            <Link
              to="/admin/monitoreo"
              className="text-sm text-[#2563EB] hover:text-[#1E40AF] font-medium flex items-center gap-1 transition-colors"
            >
              Ver monitoreo <ArrowRight className="w-4 h-4" />
            </Link>
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
    </Layout>
  );
}
