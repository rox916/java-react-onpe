// src/pages/votar/Candidatos.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function Candidatos({
  fadeUp,
  categoriaActual,
  candidatos,
  onSeleccionarCandidato,
  onVolverCategorias,
}) {
  const lista = candidatos || []; // por seguridad

  return (
    <motion.div
      key="paso3"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -20 }}
      variants={fadeUp}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          {(() => {
            const Icono = categoriaActual.icono;
            return (
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${categoriaActual.color} flex items-center justify-center`}
              >
                <Icono className="w-6 h-6 text-white" />
              </div>
            );
          })()}
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A8A]">
              {categoriaActual.titulo}
            </h2>
            <p className="text-gray-600 text-sm">
              {categoriaActual.subtitulo}
            </p>
          </div>
        </div>
        <p className="text-gray-600">
          Revisa las propuestas y elige tu candidato
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {lista.map((candidato, index) => (
          <motion.div
            key={candidato.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSeleccionarCandidato(candidato)}
            className="group border-2 border-gray-200 rounded-2xl p-6 cursor-pointer transition-all hover:border-[#2563EB] hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden relative"
          >
            {/* brillo hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={
                      candidato.foto ||
                      `https://i.pravatar.cc/150?img=${candidato.id}`
                    }
                    alt={candidato.nombre}
                    className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-[#2563EB] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {candidato.numero}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-[#1E3A8A] mb-1 group-hover:text-[#2563EB] transition-colors">
                    {candidato.nombre}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600">
                    {candidato.partido}
                  </p>
                </div>
              </div>

              {candidato.vicepresidentes && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Vicepresidentes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {candidato.vicepresidentes.map((vp, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium border border-blue-200"
                      >
                        {vp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {candidato.distrito && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Distrito:</span>{" "}
                    {candidato.distrito}
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Principales propuestas:
                </p>
                <ul className="space-y-2">
                  {candidato.propuestas.slice(0, 2).map((propuesta, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                      <span>{propuesta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#1E40AF] to-[#2563EB] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.div>
        ))}

        {/* Tarjeta de voto nulo / blanco */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            onSeleccionarCandidato({
              id: "nulo",
              nombre: "Voto Nulo / En Blanco",
              partido: "No me siento representado",
              numero: "N",
              propuestas: [
                "Ejercer mi derecho al voto sin seleccionar candidato",
              ],
              esNulo: true,
            })
          }
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer transition-all hover:border-orange-400 hover:shadow-lg bg-gradient-to-br from-gray-50 to-orange-50"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold relative">
              <span className="text-2xl">∅</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                Voto Nulo / En Blanco
              </h3>
              <p className="text-sm text-gray-600">No me siento representado</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              ¿Qué significa esto?
            </p>
            <ul className="space-y-1">
              <li className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>
                  Ejercer tu derecho al voto sin seleccionar ningún candidato
                </span>
              </li>
              <li className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Expresar tu descontento con las opciones disponibles</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Tu voto será registrado y contabilizado como nulo</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <button
        onClick={onVolverCategorias}
        className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver atrás
      </button>
    </motion.div>
  );
}
