import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

// ===== Datos simulados =====
const estadisticas = {
  mesasProcesadas: 52.14,
  votantesRegistrados: 12763599,
  participacion: 73.84,
  incidencias: 126,
};

// Resultados por partido (barras) - Elecciones 2026
const resultadosPartidos = [
  { partido: "FP", nombre: "Fuerza Popular", porcentaje: 18.5, color: "#DC2626" },
  { partido: "RP", nombre: "Renovación Popular", porcentaje: 15.2, color: "#2563EB" },
  { partido: "AP", nombre: "Acción Popular", porcentaje: 12.8, color: "#EA580C" },
  { partido: "APP", nombre: "Alianza para el Progreso", porcentaje: 11.3, color: "#16A34A" },
  { partido: "JPP", nombre: "Juntos por el Perú", porcentaje: 9.7, color: "#9333EA" },
  { partido: "PM", nombre: "Partido Morado", porcentaje: 8.4, color: "#7C3AED" },
  { partido: "UN", nombre: "Unidad Nacional", porcentaje: 7.2, color: "#F59E0B" },
  { partido: "SP", nombre: "Somos Perú", porcentaje: 6.1, color: "#64748B" },
];

// Participación regional (línea)
const participacionRegional = [
  { region: "Lima", participacion: 78 },
  { region: "Cusco", participacion: 69 },
  { region: "Arequipa", participacion: 73 },
  { region: "Piura", participacion: 71 },
  { region: "Junín", participacion: 68 },
  { region: "Loreto", participacion: 65 },
];

// Animación framer
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Dashboard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="space-y-8"
    >
      {/* ======= TARJETAS SUPERIORES CON DISEÑO MODERNO ======= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjeta 1: Mesas Procesadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium opacity-90">Procesamiento</span>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Mesas Procesadas</h3>
            <p className="text-3xl font-bold">{estadisticas.mesasProcesadas.toFixed(2)}%</p>
            <div className="mt-4 flex items-center gap-2 text-xs opacity-80">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                En progreso
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tarjeta 2: Votantes Registrados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium opacity-90">Registro</span>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Votantes Registrados</h3>
            <p className="text-3xl font-bold">{(estadisticas.votantesRegistrados / 1000000).toFixed(1)}M</p>
            <div className="mt-4 flex items-center gap-2 text-xs opacity-80">
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3" />
                Total nacional
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tarjeta 3: Participación Actual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium opacity-90">Participación</span>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Participación Actual</h3>
            <p className="text-3xl font-bold">{estadisticas.participacion.toFixed(2)}%</p>
            <div className="mt-4 flex items-center gap-2 text-xs opacity-80">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +2.3% vs anterior
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tarjeta 4: Incidencias Reportadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium opacity-90">Alertas</span>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Incidencias Reportadas</h3>
            <p className="text-3xl font-bold">{estadisticas.incidencias}</p>
            <div className="mt-4 flex items-center gap-2 text-xs opacity-80">
              <span className="inline-flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Requieren atención
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ======= GRÁFICOS CON DISEÑO MEJORADO ======= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* === Gráfico de resultados === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Resultados por Partido</h2>
              <p className="text-sm text-gray-500 mt-1">Distribución de votos</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <BarChart data={resultadosPartidos} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <XAxis dataKey="partido" tick={{ fill: "#4B5563", fontSize: 12 }} />
                <YAxis hide />
                <Tooltip 
                  formatter={(v) => `${v}%`} 
                  labelFormatter={(n) => `Partido: ${n}`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="porcentaje" radius={[8, 8, 0, 0]}>
                  {resultadosPartidos.map((p, i) => (
                    <cell key={i} fill={p.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* === Gráfico de participación === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Participación por Región</h2>
              <p className="text-sm text-gray-500 mt-1">Análisis regional</p>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <LineChart data={participacionRegional}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="region" tick={{ fill: "#4B5563", fontSize: 12 }} />
                <YAxis hide />
                <Tooltip 
                  formatter={(v) => `${v}%`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="participacion" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#2563EB' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ======= MAPA SIMULADO CON DISEÑO MEJORADO ======= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Distribución Geográfica</h2>
            <p className="text-sm text-gray-500 mt-1">Resultados por región (simulado)</p>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg py-10 border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 600"
            className="w-80 h-96 drop-shadow-lg"
          >
            <rect x="0" y="0" width="400" height="600" fill="#F9FAFB" rx="4" />
            {/* Zonas simuladas con mejor diseño */}
            <path d="M50 100 L150 80 L140 200 L60 220 Z" fill="#2563EB" opacity="0.8" />
            <path d="M160 100 L280 90 L270 220 L150 200 Z" fill="#DC2626" opacity="0.8" />
            <path d="M100 240 L250 230 L240 380 L90 370 Z" fill="#16A34A" opacity="0.8" />
            <path d="M80 400 L200 420 L180 550 L60 520 Z" fill="#F59E0B" opacity="0.8" />
            {/* Límites */}
            <path d="M50 100 L150 80 L280 90 L270 220 L250 230 L240 380 L200 420 L180 550 L60 520 L50 100 Z" 
              stroke="#1E3A8A" strokeWidth="2.5" fill="none" />
          </svg>
          <p className="text-sm mt-4 text-gray-600 font-medium">
            Mapa del Perú — Colores según partido ganador
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
