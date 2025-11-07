// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function PredictionChart({ data }) {
  // Si no se recibe data, usamos valores de ejemplo
  const predictions =
    data || [
      { region: "Lima", porcentaje: 45.2 },
      { region: "Cusco", porcentaje: 28.4 },
      { region: "Arequipa", porcentaje: 26.4 },
    ];

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-[#2B4C7E] mb-6 text-center">
        Predicción de Resultados por Región
      </h3>

      <div className="space-y-5">
        {predictions.map((item, index) => (
          <div key={item.region}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{item.region}</span>
              <span className="font-medium">{item.porcentaje}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-4 rounded-full"
                style={{ backgroundColor: "#2B4C7E" }}
                initial={{ width: 0 }}
                animate={{ width: `${item.porcentaje}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
