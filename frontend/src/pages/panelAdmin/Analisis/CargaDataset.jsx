// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export default function CargaDataset() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#2B4C7E] mb-2">
          Carga de Dataset
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Sube o arrastra un archivo con datos electorales para comenzar el proceso de análisis.
          Se admiten formatos <span className="font-semibold">CSV</span> o <span className="font-semibold">XLSX</span>.
        </p>
      </div>

      {/* Zona de carga */}
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center mb-10 hover:border-[#2B4C7E] transition-all duration-300">
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-600">
          <UploadCloud className="w-12 h-12 text-[#2B4C7E]" />
          <p className="text-gray-500">Arrastra tu archivo aquí o</p>
          <button className="bg-[#2B4C7E] hover:bg-[#233e68] text-white px-5 py-2.5 rounded-lg font-medium transition-all">
            Seleccionar archivo
          </button>
        </div>
      </div>

      {/* Botón de navegación */}
      <div className="flex justify-end mt-8">
        <a
          href="/admin/analisis/limpieza"
          className="flex items-center gap-2 bg-[#2B4C7E] hover:bg-[#233e68] text-white px-5 py-2.5 rounded-lg font-medium transition-all"
        >
          Continuar →
        </a>
      </div>
    </motion.div>
  );
}
