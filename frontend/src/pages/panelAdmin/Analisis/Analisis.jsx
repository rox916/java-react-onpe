import { Link } from "react-router-dom";
import { Upload, Sparkles, Cpu, LineChart } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Analisis() {
  const etapas = [
    {
      icon: Upload,
      titulo: "Cargar Dataset",
      ruta: "carga",
      descripcion: "Sube datos electorales en formato CSV o Excel.",
    },
    {
      icon: Sparkles,
      titulo: "Limpieza de Datos",
      ruta: "limpieza",
      descripcion: "Corrige valores nulos o inconsistentes.",
    },
    {
      icon: Cpu,
      titulo: "Entrenamiento del Modelo",
      ruta: "entrenamiento",
      descripcion: "Simula entrenamiento con algoritmos de IA.",
    },
    {
      icon: LineChart,
      titulo: "Predicciones",
      ruta: "prediccion",
      descripcion: "Visualiza proyecciones de resultados electorales.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2B4C7E] mb-2">
          Análisis de Datos Electorales
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora el flujo completo del análisis y predicción de resultados
          electorales mediante técnicas de ciencia de datos e inteligencia
          artificial.
        </p>
      </div>

      {/* Etapas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {etapas.map((etapa, index) => {
          const Icon = etapa.icon;
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={etapa.ruta}
                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
              >
                {/* Ícono */}
                <div className="p-4 rounded-full mb-4 bg-[#2B4C7E]/10 text-[#2B4C7E] shadow-sm">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#2B4C7E] transition-colors">
                  {etapa.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {etapa.descripcion}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
