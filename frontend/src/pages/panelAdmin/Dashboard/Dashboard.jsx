import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
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

// Resultados por partido (barras)
const resultadosPartidos = [
  { partido: "FD", nombre: "Fuerza Democrática", porcentaje: 16.29, color: "#DC2626" },
  { partido: "AP", nombre: "Alianza País", porcentaje: 13.49, color: "#2563EB" },
  { partido: "UN", nombre: "Unidad Nacional", porcentaje: 12.09, color: "#EA580C" },
  { partido: "JP", nombre: "Juntos por el Perú", porcentaje: 7.8, color: "#16A34A" },
  { partido: "PP", nombre: "Partido Popular", porcentaje: 8.9, color: "#9333EA" },
  { partido: "VW", nombre: "Vamos con Todos", porcentaje: 5.9, color: "#64748B" },
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
      {/* ======= TARJETAS SUPERIORES ======= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Mesas Procesadas</p>
            <p className="text-2xl font-bold text-blue-700">
              {estadisticas.mesasProcesadas.toFixed(2)}%
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Votantes Registrados</p>
            <p className="text-2xl font-bold text-gray-800">
              {estadisticas.votantesRegistrados.toLocaleString("es-PE")}
            </p>
          </div>
          <Users className="w-8 h-8 text-gray-600" />
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Participación Actual</p>
            <p className="text-2xl font-bold text-green-600">
              {estadisticas.participacion.toFixed(2)}%
            </p>
          </div>
          <FileText className="w-8 h-8 text-green-500" />
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Incidencias Reportadas</p>
            <p className="text-2xl font-bold text-red-600">
              {estadisticas.incidencias}
            </p>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
      </div>

      {/* ======= GRÁFICOS ======= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* === Gráfico de resultados === */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-[#1E3A8A] mb-4">
            Resultados por Partido
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <BarChart data={resultadosPartidos} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <XAxis dataKey="partido" tick={{ fill: "#4B5563", fontSize: 12 }} />
                <YAxis hide />
                <Tooltip formatter={(v) => `${v}%`} labelFormatter={(n) => `Partido: ${n}`} />
                <Bar dataKey="porcentaje" radius={[4, 4, 0, 0]}>
                  {resultadosPartidos.map((p, i) => (
                    <cell key={i} fill={p.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* === Gráfico de participación === */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-[#1E3A8A] mb-4">
            Participación Electoral por Región
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <LineChart data={participacionRegional}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="region" tick={{ fill: "#4B5563", fontSize: 12 }} />
                <YAxis hide />
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend />
                <Line type="monotone" dataKey="participacion" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ======= MAPA SIMULADO ======= */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-[#1E3A8A] mb-4">
          Distribución Geográfica de Resultados (Simulada)
        </h2>
        <div className="flex flex-col items-center justify-center text-gray-500 py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 600"
            className="w-80 h-96"
          >
            <rect x="0" y="0" width="400" height="600" fill="#F9FAFB" />
            {/* Zonas simuladas */}
            <path d="M50 100 L150 80 L140 200 L60 220 Z" fill="#2563EB" />
            <path d="M160 100 L280 90 L270 220 L150 200 Z" fill="#DC2626" />
            <path d="M100 240 L250 230 L240 380 L90 370 Z" fill="#16A34A" />
            <path d="M80 400 L200 420 L180 550 L60 520 Z" fill="#F59E0B" />
            {/* Límites */}
            <path d="M50 100 L150 80 L280 90 L270 220 L250 230 L240 380 L200 420 L180 550 L60 520 L50 100 Z" 
              stroke="#1E3A8A" strokeWidth="2" fill="none" />
          </svg>
          <p className="text-sm mt-3 text-gray-600">
            (Mapa del Perú — Colores simulados según partido ganador)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
