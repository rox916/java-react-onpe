import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Vote,
  Shield,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserCheck,
  FileText,
  UserCircle,
  ArrowLeft,
  Crown,
  Globe,
  Building2,
} from "lucide-react";

// Datos de ejemplo - en producción vendrían de una API
const candidatosData = {
  presidente: [
    {
      id: 1,
      nombre: "María González Pérez",
      partido: "Fuerza Democrática",
      numero: "1",
      vicepresidentes: ["Juan Pérez", "Carmen López"],
      propuestas: [
        "Educación gratuita y de calidad",
        "Mejora del sistema de salud pública",
        "Fortalecimiento de la economía",
      ],
    },
    {
      id: 2,
      nombre: "Carlos Ramírez Torres",
      partido: "Alianza Nacional",
      numero: "2",
      vicepresidentes: ["Luis García", "María Rodríguez"],
      propuestas: [
        "Seguridad ciudadana integral",
        "Desarrollo de infraestructura",
        "Apoyo a pequeñas empresas",
      ],
    },
    {
      id: 3,
      nombre: "Ana Martínez Silva",
      partido: "Unidad Popular",
      numero: "3",
      vicepresidentes: ["Pedro Sánchez", "Laura Fernández"],
      propuestas: [
        "Protección del medio ambiente",
        "Igualdad de género",
        "Tecnología e innovación",
      ],
    },
  ],
  congresistas: [
    {
      id: 101,
      nombre: "Roberto Mendoza",
      partido: "Fuerza Democrática",
      numero: "1",
      distrito: "Lima",
      propuestas: [
        "Ley de transparencia gubernamental",
        "Reforma del sistema judicial",
        "Apoyo a la educación técnica",
      ],
    },
    {
      id: 102,
      nombre: "Patricia Vargas",
      partido: "Alianza Nacional",
      numero: "2",
      distrito: "Lima",
      propuestas: [
        "Seguridad en barrios",
        "Mejora de servicios públicos",
        "Fomento al emprendimiento",
      ],
    },
    {
      id: 103,
      nombre: "Miguel Torres",
      partido: "Unidad Popular",
      numero: "3",
      distrito: "Lima",
      propuestas: [
        "Protección ambiental",
        "Derechos laborales",
        "Inclusión social",
      ],
    },
  ],
  parlamentoAndino: [
    {
      id: 201,
      nombre: "Sofía Ramírez",
      partido: "Fuerza Democrática",
      numero: "1",
      propuestas: [
        "Integración regional",
        "Comercio justo",
        "Cooperación cultural",
      ],
    },
    {
      id: 202,
      nombre: "Diego Morales",
      partido: "Alianza Nacional",
      numero: "2",
      propuestas: [
        "Seguridad fronteriza",
        "Desarrollo económico conjunto",
        "Turismo regional",
      ],
    },
    {
      id: 203,
      nombre: "Elena Castro",
      partido: "Unidad Popular",
      numero: "3",
      propuestas: [
        "Sostenibilidad ambiental",
        "Derechos humanos",
        "Paz regional",
      ],
    },
  ],
};

const categoriasVotacion = [
  {
    id: "presidente",
    titulo: "Presidente y Vicepresidentes",
    subtitulo: "de la República",
    icono: Crown,
    color: "from-blue-500 to-blue-600",
    descripcion: "Elige a tu fórmula presidencial",
  },
  {
    id: "congresistas",
    titulo: "Congresistas",
    subtitulo: "de la República",
    icono: Building2,
    color: "from-green-500 to-green-600",
    descripcion: "Elige a tus representantes en el Congreso",
  },
  {
    id: "parlamentoAndino",
    titulo: "Representantes",
    subtitulo: "al Parlamento Andino",
    icono: Globe,
    color: "from-purple-500 to-purple-600",
    descripcion: "Elige a tus representantes regionales",
  },
];

export default function Votar() {
  const [paso, setPaso] = useState(1); // 1: Verificación, 2: Selección de categoría, 3: Candidatos, 4: Confirmación, 5: Éxito
  const [dni, setDni] = useState("");
  const [dniVerificado, setDniVerificado] = useState(false);
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);
  const [votosRealizados, setVotosRealizados] = useState({});
  const [error, setError] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const verificarDNI = () => {
    setError("");
    if (!dni || dni.length < 8) {
      setError("Por favor, ingresa un DNI válido (8 dígitos)");
      return;
    }

    // Simulación de verificación - en producción sería una llamada a API
    setTimeout(() => {
      setDniVerificado(true);
      setPaso(2); // Ir a selección de categoría
    }, 1000);
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaActual(categoria);
    setCandidatoSeleccionado(null);
    setPaso(3); // Ir a selección de candidatos
  };

  const seleccionarCandidato = (candidato) => {
    setCandidatoSeleccionado(candidato);
    setPaso(4); // Ir a confirmación
  };

  const confirmarVoto = () => {
    // Simulación de envío de voto - en producción sería una llamada a API
    setTimeout(() => {
      // Guardar el voto realizado
      const nuevosVotos = {
        ...votosRealizados,
        [categoriaActual.id]: candidatoSeleccionado,
      };
      setVotosRealizados(nuevosVotos);

      // Verificar si quedan categorías por votar
      const categoriasVotadas = Object.keys(nuevosVotos);
      if (categoriasVotadas.length === categoriasVotacion.length) {
        // Todas las categorías votadas
        setPaso(5);
      } else {
        // Volver a selección de categoría
        setCategoriaActual(null);
        setCandidatoSeleccionado(null);
        setPaso(2);
      }
    }, 1500);
  };

  const reiniciar = () => {
    setPaso(1);
    setDni("");
    setDniVerificado(false);
    setCategoriaActual(null);
    setCandidatoSeleccionado(null);
    setVotosRealizados({});
    setError("");
  };

  const obtenerCandidatos = () => {
    if (!categoriaActual) return [];
    return candidatosData[categoriaActual.id] || [];
  };

  const categoriasPendientes = categoriasVotacion.filter(
    (cat) => !votosRealizados[cat.id]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-[#0F172A] p-3 rounded-lg">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#1E3A8A]">Ir a Votar</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ejerce tu derecho al voto de forma segura y transparente
          </p>
        </motion.div>

        {/* Indicador de progreso */}
        {paso > 1 && paso < 5 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8"
          >
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Progreso de votación
                </span>
                <span className="text-sm text-gray-600">
                  {Object.keys(votosRealizados).length} de{" "}
                  {categoriasVotacion.length} votos completados
                </span>
              </div>
              <div className="flex gap-2">
                {categoriasVotacion.map((cat) => {
                  const Icono = cat.icono;
                  const votado = votosRealizados[cat.id];
                  return (
                    <div
                      key={cat.id}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        votado ? "bg-green-500" : "bg-gray-200"
                      }`}
                      title={cat.titulo}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Contenido principal */}
        <AnimatePresence mode="wait">
          {/* Paso 1: Verificación de DNI */}
          {paso === 1 && (
            <motion.div
              key="paso1"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-10 h-10 text-[#2563EB]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                  Verificación de Identidad
                </h2>
                <p className="text-gray-600">
                  Ingresa tu número de DNI para verificar tu identidad y continuar
                  con el proceso de votación
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => {
                      setDni(e.target.value.replace(/\D/g, "").slice(0, 8));
                      setError("");
                    }}
                    placeholder="Ingresa tu DNI (8 dígitos)"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none text-lg"
                    onKeyPress={(e) => e.key === "Enter" && verificarDNI()}
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#2563EB] mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-[#1E3A8A] mb-1">
                        Tu información está protegida
                      </p>
                      <p>
                        Utilizamos encriptación de extremo a extremo para proteger
                        tus datos personales durante todo el proceso.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={verificarDNI}
                  disabled={!dni || dni.length < 8}
                  className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  Verificar DNI
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Paso 2: Selección de categoría */}
          {paso === 2 && (
            <motion.div
              key="paso2"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                  Selecciona la categoría para votar
                </h2>
                <p className="text-gray-600">
                  Elige una de las categorías de las Elecciones Generales 2026
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {categoriasVotacion.map((categoria) => {
                  const Icono = categoria.icono;
                  const votado = votosRealizados[categoria.id];
                  const esPendiente = !votado;

                  return (
                    <motion.div
                      key={categoria.id}
                      whileHover={esPendiente ? { scale: 1.02 } : {}}
                      whileTap={esPendiente ? { scale: 0.98 } : {}}
                      onClick={() => esPendiente && seleccionarCategoria(categoria)}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        esPendiente
                          ? "border-gray-200 hover:border-[#2563EB] hover:shadow-lg bg-gradient-to-br from-white to-gray-50"
                          : "border-green-300 bg-green-50 opacity-75 cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${categoria.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icono className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-[#1E3A8A] mb-1 text-center">
                        {categoria.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 text-center mb-2">
                        {categoria.subtitulo}
                      </p>
                      <p className="text-xs text-gray-500 text-center mb-4">
                        {categoria.descripcion}
                      </p>
                      {votado && (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm font-semibold">Votado</span>
                        </div>
                      )}
                      {esPendiente && (
                        <div className="flex items-center justify-center gap-2 text-[#2563EB]">
                          <ArrowRight className="w-4 h-4" />
                          <span className="text-sm font-semibold">Votar</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {categoriasPendientes.length === 0 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setPaso(5)}
                    className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]"
                  >
                    Finalizar votación
                    <ArrowRight className="w-5 h-5 inline-block ml-2" />
                  </button>
                </div>
              )}

              <button
                onClick={() => setPaso(1)}
                className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 mx-auto mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver atrás
              </button>
            </motion.div>
          )}

          {/* Paso 3: Selección de candidatos */}
          {paso === 3 && categoriaActual && (
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
                    <p className="text-gray-600 text-sm">{categoriaActual.subtitulo}</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Revisa las propuestas y elige tu candidato
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {obtenerCandidatos().map((candidato) => (
                  <motion.div
                    key={candidato.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => seleccionarCandidato(candidato)}
                    className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer transition-all hover:border-[#2563EB] hover:shadow-lg bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-[#2563EB] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold relative">
                        {candidato.numero}
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
                          <UserCircle className="w-4 h-4 text-[#2563EB]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#1E3A8A] mb-1">
                          {candidato.nombre}
                        </h3>
                        <p className="text-sm text-gray-600">{candidato.partido}</p>
                      </div>
                    </div>
                    {candidato.vicepresidentes && (
                      <div className="border-t border-gray-200 pt-3 mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Vicepresidentes:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {candidato.vicepresidentes.map((vp, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {vp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {candidato.distrito && (
                      <div className="border-t border-gray-200 pt-3 mb-3">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Distrito:</span>{" "}
                          {candidato.distrito}
                        </p>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Principales propuestas:
                      </p>
                      <ul className="space-y-1">
                        {candidato.propuestas.slice(0, 2).map((propuesta, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                            <span>{propuesta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => {
                  setCategoriaActual(null);
                  setPaso(2);
                }}
                className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver atrás
              </button>
            </motion.div>
          )}

          {/* Paso 4: Confirmación */}
          {paso === 4 && candidatoSeleccionado && categoriaActual && (
            <motion.div
              key="paso3"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <div className="bg-yellow-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-yellow-600" />
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-[#1E3A8A] mb-1">
                    Confirma tu Voto
                  </h2>
                  <p className="text-sm text-gray-600">
                    {categoriaActual.titulo} - {categoriaActual.subtitulo}
                  </p>
                </div>
                <p className="text-gray-600">
                  Revisa tu selección antes de confirmar. Una vez confirmado, no
                  podrás cambiar tu voto.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#2563EB] rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#2563EB] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold relative">
                      {candidatoSeleccionado.numero}
                      <div className="absolute -top-1 -right-1 bg-white rounded-full p-1.5">
                        <UserCircle className="w-5 h-5 text-[#2563EB]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#1E3A8A]">
                        {candidatoSeleccionado.nombre}
                      </h3>
                      <p className="text-gray-600">{candidatoSeleccionado.partido}</p>
                      {candidatoSeleccionado.distrito && (
                        <p className="text-sm text-gray-500 mt-1">
                          Distrito: {candidatoSeleccionado.distrito}
                        </p>
                      )}
                    </div>
                  </div>
                  {candidatoSeleccionado.vicepresidentes && (
                    <div className="border-t border-blue-200 pt-4 mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Vicepresidentes:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {candidatoSeleccionado.vicepresidentes.map((vp, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
                          >
                            {vp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="border-t border-blue-200 pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Propuestas:
                    </p>
                    <ul className="space-y-2">
                      {candidatoSeleccionado.propuestas.map((propuesta, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                          <span>{propuesta}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#2563EB] mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-[#1E3A8A] mb-1">
                        Tu voto es secreto
                      </p>
                      <p>
                        Tu selección está encriptada y será anónima. Nadie podrá
                        conocer tu elección.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setPaso(3)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Volver
                  </button>
                  <button
                    onClick={confirmarVoto}
                    className="flex-1 bg-[#2563EB] hover:bg-[#1E40AF] text-white py-4 rounded-lg font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Confirmar Voto
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Paso 5: Voto completado */}
          {paso === 5 && (
            <motion.div
              key="paso5"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </motion.div>

              <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
                ¡Votación Completada Exitosamente!
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Has completado todas tus votaciones de forma segura. Gracias por
                participar en el proceso democrático.
              </p>

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
                        className="flex items-center justify-between bg-white p-2 rounded"
                      >
                        <span className="text-sm text-gray-700">
                          {categoria?.titulo}
                        </span>
                        <span className="text-sm font-semibold text-[#2563EB]">
                          Lista {candidato.numero}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

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

              <div className="flex gap-4 justify-center">
                <button
                  onClick={reiniciar}
                  className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]"
                >
                  Finalizar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
