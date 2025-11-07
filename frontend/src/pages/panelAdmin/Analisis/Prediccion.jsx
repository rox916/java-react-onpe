// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import PredictionChart from "./components/PredictionChart";

export default function Prediccion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      {/* Encabezado */}
      <div className="text-center mb-8">
        <div className="bg-[#2B4C7E]/10 p-3 rounded-full mx-auto mb-3 w-fit">
          <BarChart3 className="w-8 h-8 text-[#2B4C7E]" />
        </div>
        <h2 className="text-3xl font-bold text-[#2B4C7E] mb-2">
          Predicción de Resultados
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Proyecciones generadas por el modelo entrenado según los patrones
          detectados en los datos electorales procesados.
        </p>
      </div>

      {/* Gráfico de predicción */}
      <div className="mb-10">
        <PredictionChart />
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-end">
        <a
          href="/admin/analisis"
          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all"
        >
          ← Volver al Inicio
        </a>
      </div>
    </motion.div>
  );
}
