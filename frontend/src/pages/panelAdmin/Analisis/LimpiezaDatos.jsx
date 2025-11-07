// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function LimpiezaDatos() {
  const pasos = [
    "Eliminar filas vacías",
    "Corregir nombres geográficos",
    "Eliminar duplicados",
    "Normalizar variables numéricas",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2B4C7E] mb-2">
          Limpieza de Datos
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Selecciona las operaciones que deseas aplicar sobre el dataset antes
          del entrenamiento del modelo.
        </p>
      </div>

      {/* Lista de pasos */}
      <div className="max-w-md mx-auto">
        <ul className="space-y-4 mb-10">
          {pasos.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition rounded-lg p-3 border border-gray-200"
            >
              <input
                type="checkbox"
                className="w-5 h-5 text-[#2B4C7E] focus:ring-[#2B4C7E] border-gray-300 rounded"
              />
              <span className="text-gray-800 font-medium">{p}</span>
            </motion.li>
          ))}
        </ul>

        {/* Botón continuar */}
        <div className="flex justify-end">
          <a
            href="/admin/analisis/entrenamiento"
            className="flex items-center gap-2 bg-[#2B4C7E] hover:bg-[#233e68] text-white px-5 py-2.5 rounded-lg font-medium transition-all"
          >
            <CheckCircle2 className="w-5 h-5" /> Entrenar Modelo →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
