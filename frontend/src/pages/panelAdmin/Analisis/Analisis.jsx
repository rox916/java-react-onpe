// src/pages/panelAdmin/Analisis/Analisis.jsx

import { useState } from "react";
import { Upload, Sparkles, Cpu, CheckCircle, BarChart3, TrendingUp, FileText, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";
import MetricsCard from "./components/MetricsCard";
import PredictionChart from "./components/PredictionChart";
import ProgressCard from "./components/ProgressCard";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analisis() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedCleaning, setSelectedCleaning] = useState([]);

  // Datos simulados para análisis
  const analisisData = {
    totalRegistros: 12763599,
    registrosLimpios: 12458923,
    registrosEliminados: 304676,
    precision: 94.2,
    completitud: 97.6,
  };

  // Datos para gráficos
  const distribucionPorRegion = [
    { region: "Lima", votos: 3200000, porcentaje: 25.1 },
    { region: "Cusco", votos: 890000, porcentaje: 7.0 },
    { region: "Arequipa", votos: 750000, porcentaje: 5.9 },
    { region: "Piura", votos: 680000, porcentaje: 5.3 },
    { region: "Junín", votos: 520000, porcentaje: 4.1 },
    { region: "Loreto", votos: 410000, porcentaje: 3.2 },
  ];

  const tendenciaTemporal = [
    { hora: "08:00", participacion: 12 },
    { hora: "10:00", participacion: 28 },
    { hora: "12:00", participacion: 45 },
    { hora: "14:00", participacion: 58 },
    { hora: "16:00", participacion: 68 },
    { hora: "18:00", participacion: 73 },
  ];

  const prediccionesPartidos = [
    { partido: "FD", nombre: "Fuerza Democrática", prediccion: 18.5, confianza: 92 },
    { partido: "AP", nombre: "Alianza País", prediccion: 15.2, confianza: 89 },
    { partido: "UN", nombre: "Unidad Nacional", prediccion: 13.8, confianza: 87 },
    { partido: "JP", nombre: "Juntos por el Perú", prediccion: 9.1, confianza: 85 },
  ];

  const COLORS = ["#DC2626", "#2563EB", "#EA580C", "#16A34A", "#9333EA", "#64748B"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // Simular procesamiento
      setTimeout(() => {
        setStep(2);
      }, 1000);
    }
  };

  const handleCleaningToggle = (item) => {
    setSelectedCleaning((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    if (step === 2 && selectedCleaning.length === 0) {
      alert("Por favor selecciona al menos una operación de limpieza");
      return;
    }
    if (step === 3) {
      setShowResults(true);
    } else {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* 🧭 Encabezado principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Análisis de Datos Electorales
            </h1>
            <p className="text-sm text-gray-600">
              Flujo completo: carga, limpieza y entrenamiento del modelo.
            </p>
          </div>
        </div>
        {showResults && (
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all">
              <Download className="w-4 h-4" />
              Exportar Reporte
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        )}
      </div>

      {/* 📊 Vista de Resultados */}
      {showResults ? (
        <div className="space-y-6">
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProgressCard
              title="Registros Procesados"
              value={analisisData.registrosLimpios.toLocaleString()}
              total={analisisData.totalRegistros.toLocaleString()}
              percentage={analisisData.completitud}
              color="blue"
            />
            <ProgressCard
              title="Precisión de Datos"
              value={`${analisisData.precision}%`}
              total="100%"
              percentage={analisisData.precision}
              color="green"
            />
            <ProgressCard
              title="Registros Eliminados"
              value={analisisData.registrosEliminados.toLocaleString()}
              total={analisisData.totalRegistros.toLocaleString()}
              percentage={(analisisData.registrosEliminados / analisisData.totalRegistros) * 100}
              color="orange"
            />
            <ProgressCard
              title="Completitud"
              value={`${analisisData.completitud}%`}
              total="100%"
              percentage={analisisData.completitud}
              color="purple"
            />
          </div>

          {/* Gráficos de análisis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de distribución por región */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Distribución por Región</h2>
                  <p className="text-sm text-gray-500 mt-1">Votos por región electoral</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <BarChart data={distribucionPorRegion} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" tick={{ fill: "#4B5563", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} />
                    <Tooltip
                      formatter={(v) => `${v.toLocaleString()} votos`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="votos" fill="#2563EB" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Gráfico de tendencia temporal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Tendencia de Participación</h2>
                  <p className="text-sm text-gray-500 mt-1">Evolución durante el día</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <LineChart data={tendenciaTemporal} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hora" tick={{ fill: "#4B5563", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} />
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
                    <Line type="monotone" dataKey="participacion" stroke="#16A34A" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Predicciones */}
          <PredictionChart data={prediccionesPartidos} />

          {/* Tabla de resumen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Resumen de Análisis</h2>
                <p className="text-sm text-gray-500 mt-1">Estadísticas generales del proceso</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Métrica
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Total de Registros</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{analisisData.totalRegistros.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Completo
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Registros Limpios</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{analisisData.registrosLimpios.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Procesado
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Precisión</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{analisisData.precision}%</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Excelente
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Completitud</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{analisisData.completitud}%</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Alto
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowResults(false);
                setStep(1);
                setFileName("");
                setSelectedCleaning([]);
              }}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all"
            >
              Nuevo Análisis
            </button>
          </div>
        </div>
      ) : (
        <div>
      {/* 💠 Card principal */}
      <div className="p-6 bg-white shadow rounded-xl border border-gray-200">
        {/* 🪜 Progreso de pasos */}
        <div className="flex justify-between items-center mb-10">
          {[
            { id: 1, icon: Upload, label: "Cargar Dataset" },
            { id: 2, icon: Sparkles, label: "Limpieza" },
            { id: 3, icon: Cpu, label: "Entrenamiento" },
            // eslint-disable-next-line no-unused-vars
          ].map(({ id, icon: Icon, label }) => (
            <div
              key={id}
              className={`flex flex-col items-center transition-all ${
                step >= id ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {step > id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <p className="text-sm mt-2 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* 🧩 Contenido dinámico */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Paso 1: Carga */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                Carga de Dataset
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-6">
                <p className="text-gray-500 mb-2">
                  Arrastra tu archivo aquí o selecciona manualmente.
                </p>
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all">
                  Seleccionar archivo
                  <input
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {fileName && (
                  <p className="mt-3 text-sm text-gray-600">
                    Archivo cargado: <strong>{fileName}</strong>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Paso 2: Limpieza */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                Limpieza de Datos
              </h3>
              <p className="text-gray-600 mb-4">
                Selecciona las operaciones que deseas aplicar:
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Eliminar filas vacías",
                  "Corregir nombres geográficos",
                  "Eliminar duplicados",
                  "Normalizar variables numéricas",
                ].map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCleaning.includes(p)}
                      onChange={() => handleCleaningToggle(p)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={selectedCleaning.includes(p) ? "font-medium text-blue-600" : "text-gray-700"}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Paso 3: Entrenamiento */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                Entrenamiento del Modelo
              </h3>
              <p className="text-gray-600 mb-4">
                Simulación del proceso de entrenamiento con datos limpios.
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                <motion.div
                  className="bg-blue-600 h-3"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1 }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricsCard title="Accuracy" value="92%" />
                <MetricsCard title="F1 Score" value="0.88" />
                <MetricsCard title="Precision" value="89%" />
                <MetricsCard title="Recall" value="91%" />
              </div>
            </div>
          )}
        </motion.div>

        {/* 🔘 Controles inferiores */}
        <div className="flex justify-between mt-8 border-t pt-4">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg transition-all ${
              step === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            ← Atrás
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Ver Resultados →
            </button>
          )}
        </div>
      </div>
        </div>
      )}
    </motion.div>
  );
}
