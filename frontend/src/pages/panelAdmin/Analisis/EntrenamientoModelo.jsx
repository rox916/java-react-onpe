// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Brain, CheckCircle2 } from "lucide-react";
import MetricsCard from "./components/MetricsCard";

export default function EntrenamientoModelo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      {/* Encabezado */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-[#2B4C7E]/10 p-3 rounded-full mb-3">
          <Brain className="w-8 h-8 text-[#2B4C7E]" />
        </div>
        <h2 className="text-3xl font-bold text-[#2B4C7E] mb-2">
          Entrenamiento del Modelo
        </h2>
        <p className="text-gray-600 max-w-xl">
          Simulación del proceso de entrenamiento con los datos limpios.
          Observa las métricas generadas tras la fase de ajuste del modelo.
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-10 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-[#2B4C7E] h-3 rounded-full"
        />
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <MetricsCard title="Accuracy" value="92%" color="#2B4C7E" />
        <MetricsCard title="F1 Score" value="0.88" color="#2B4C7E" />
        <MetricsCard title="Precision" value="89%" color="#2B4C7E" />
        <MetricsCard title="Recall" value="91%" color="#2B4C7E" />
      </div>

      {/* Botón de siguiente paso */}
      <div className="flex justify-end">
        <a
          href="/admin/analisis/prediccion"
          className="flex items-center gap-2 bg-[#2B4C7E] hover:bg-[#233e68] text-white px-5 py-2.5 rounded-lg font-medium transition-all"
        >
          <CheckCircle2 className="w-5 h-5" /> Ver Predicciones →
        </a>
      </div>
    </motion.div>
  );
}
