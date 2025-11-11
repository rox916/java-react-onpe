// src/pages/votar/Final.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";

export default function Final({
  fadeUp,
  votosRealizados,     // objeto { idCategoria: candidatoSeleccionado }
  categoriasVotacion,  // array con info de las categorías
  onReiniciar,         // función para reiniciar todo el proceso
}) {
  return (
    <motion.div
      key="paso5"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={fadeUp}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center"
    >
      {/* Icono grande de éxito */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </motion.div>

      {/* Mensaje principal */}
      <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
        ¡Votación completada exitosamente!
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Has completado todas tus votaciones de forma segura. Gracias por participar
        en el proceso democrático.
      </p>

      {/* Resumen de votos */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Resumen de tus votos:
        </p>
        <div className="space-y-2 text-left">
          {Object.entries(votosRealizados).map(([categoriaId, candidato]) => {
            const categoria = categoriasVotacion.find(
              (c) => c.id === categoriaId
            );
            return (
              <div
                key={categoriaId}
                className={`flex items-center justify-between p-3 rounded ${
                  candidato.esNulo
                    ? "bg-orange-50 border border-orange-200"
                    : "bg-white"
                }`}
              >
                <span className="text-sm text-gray-700">
                  {categoria?.titulo}
                </span>

                {candidato.esNulo ? (
                  <span className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                    <span className="text-lg">∅</span>
                    Voto nulo
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-[#2563EB]">
                    Lista {candidato.numero}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info de seguridad */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
        <div className="flex items-center gap-3 justify-center mb-2">
          <Shield className="w-6 h-6 text-[#2563EB]" />
          <p className="font-semibold text-[#1E3A8A]">
            Tu voto está protegido
          </p>
        </div>
        <p className="text-sm text-gray-700">
          Recibirás un comprobante digital por correo electrónico en los
          próximos minutos.
        </p>
      </div>

      {/* Botón Finalizar / Reiniciar */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onReiniciar}
          className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]"
        >
          Finalizar
        </button>
      </div>
    </motion.div>
  );
}
