// src/pages/panelAdmin/Analisis/AnalisisFlujo.jsx

import { useState } from "react";
import { Upload, Sparkles, Cpu, CheckCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import MetricsCard from "./components/MetricsCard";

export default function Analisis() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      {/* 🧭 Header */}
      <h2 className="text-2xl font-semibold text-[#1A2C56] mb-2">
        Análisis de Datos Electorales
      </h2>
      <p className="text-gray-600 mb-6">
        Flujo completo: carga, limpieza y entrenamiento del modelo.
      </p>

      {/* 🪜 Barra de progreso de pasos */}

      <div className="flex justify-between items-center mb-8">
        {[
          { id: 1, icon: Upload, label: "Cargar Dataset" },
          { id: 2, icon: Sparkles, label: "Limpieza" },
          { id: 3, icon: Cpu, label: "Entrenamiento" },
          // eslint-disable-next-line no-unused-vars
        ].map(({ id, icon: Icon, label }) => (
          <div
            key={id}
            className={`flex flex-col items-center ${
              step >= id ? "text-[#1A2C56]" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= id
                  ? "bg-[#1A2C56] text-white border-[#1A2C56]"
                  : "border-gray-300 bg-white"
              }`}
            >
              {step > id ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </div>
            <p className="text-sm mt-2">{label}</p>
          </div>
        ))}
      </div>

      {/* 🧩 Contenido dinámico según paso */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-[#1A2C56] mb-4">
              1️⃣ Carga de Dataset
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-6">
              <p className="text-gray-500 mb-2">
                Arrastra tu archivo aquí o selecciona manualmente.
              </p>
              <label className="bg-[#1A2C56] hover:bg-[#23396A] text-white px-4 py-2 rounded-lg cursor-pointer">
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

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-[#1A2C56] mb-4">
              2️⃣ Limpieza de Datos
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
                  <input type="checkbox" className="w-4 h-4 text-[#1A2C56]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-[#1A2C56] mb-4">
              3️⃣ Entrenamiento del Modelo
            </h3>
            <p className="text-gray-600 mb-4">
              Simulación del proceso de entrenamiento con datos limpios.
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <motion.div
                className="bg-[#1A2C56] h-3 rounded-full"
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
          className={`px-4 py-2 rounded-lg ${
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
            className="bg-[#1A2C56] hover:bg-[#23396A] text-white px-4 py-2 rounded-lg"
          >
            Siguiente →
          </button>
        ) : (
          <a
            href="/admin/analisis/prediccion"
            className="bg-[#1A2C56] hover:bg-[#23396A] text-white px-4 py-2 rounded-lg"
          >
            Ver Predicciones →
          </a>
        )}
      </div>
    </div>
  );
}
