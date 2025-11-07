// src/pages/panelAdmin/Analisis/AnalisisFlujo.jsx

import { useState } from "react";
import { Upload, Sparkles, Cpu, CheckCircle, BarChart3 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import MetricsCard from "./components/MetricsCard";

export default function AnalisisFlujo() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* 🧭 Encabezado principal fuera de la card */}
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
      </div>

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
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>{p}</span>
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
            <a
              href="/admin/analisis/prediccion"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Ver Predicciones →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
