/**
 * Página principal de votación digital
 * Permite a los usuarios ejercer su derecho al voto de forma digital
 * Incluye verificación de DNI, captcha, selección de candidatos y confirmación
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
import { getCandidatosParaVotacion } from "../services/candidatosService";

// Categorías de votación disponibles en el proceso electoral
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
    titulo: "Parlamento Andino",
    subtitulo: "Representantes Regionales",
    icono: Globe,
    color: "from-purple-500 to-purple-600",
    descripcion: "Elige a tus representantes regionales",
  },
];

export default function Votar() {
  // Estados del proceso de votación
  // paso: controla el paso actual del proceso (1: Verificación, 2: Selección de categoría, 3: Candidatos, 4: Confirmación, 5: Éxito)
  const [paso, setPaso] = useState(1);
  const [dni, setDni] = useState("");
  const [dniVerificado, setDniVerificado] = useState(false);
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);
  const [votosRealizados, setVotosRealizados] = useState({});
  const [error, setError] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [candidatosData, setCandidatosData] = useState({
    presidente: [],
    congresistas: [],
    parlamentoAndino: [],
  });

  // Cargar candidatos del servicio compartido y actualizar cuando cambien
  useEffect(() => {
    const cargarCandidatos = () => {
      const datos = getCandidatosParaVotacion();
      setCandidatosData(datos);
    };
    
    cargarCandidatos();
    
    // Escuchar cambios en localStorage (cuando se actualicen en admin)
    const handleStorageChange = (e) => {
      if (e.key === 'candidatos_electorales' || !e.key) {
        cargarCandidatos();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // También verificar periódicamente (para cambios en la misma pestaña)
    const interval = setInterval(cargarCandidatos, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  /**
   * Genera un código captcha aleatorio de 4 caracteres
   * Usa caracteres alfanuméricos excluyendo caracteres confusos (0, O, I, 1)
   * Se genera automáticamente cuando el DNI tiene 8 dígitos
   */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const verificarDNI = () => {
    setError("");
    if (!dni || dni.length < 8) {
      setError("Por favor, ingrese un DNI válido (8 dígitos)");
      return;
    }
    
    if (!captchaInput || captchaInput.toUpperCase() !== captchaCode) {
      setError("El código de verificación no coincide. Por favor, intente nuevamente.");
      generateCaptcha();
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
    // Mapear el id de categoría al nombre correcto en candidatosData
    const categoriaKey = categoriaActual.id === "parlamentoAndino" ? "parlamentoAndino" : categoriaActual.id;
    return candidatosData[categoriaKey] || [];
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
            <h1 className="text-4xl font-bold text-[#1E3A8A]">Realiza tu voto</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ejerce tu derecho al voto de forma segura y transparente
          </p>
        </motion.div>

        {/* Indicador de progreso mejorado */}
        {paso > 1 && paso < 5 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-900 block">
                      Progreso de Votación
                    </span>
                    <span className="text-sm text-gray-500">
                      {Object.keys(votosRealizados).length} de {categoriasVotacion.length} categorías completadas
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#2563EB]">
                    {Math.round((Object.keys(votosRealizados).length / categoriasVotacion.length) * 100)}%
                  </div>
                  <div className="text-xs text-gray-500">Completado</div>
                </div>
              </div>
              
              {/* Barra de progreso mejorada */}
              <div className="relative">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(votosRealizados).length / categoriasVotacion.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 rounded-full shadow-lg"
                  />
                </div>
                
                {/* Indicadores de categorías */}
                <div className="flex justify-between mt-4 gap-2">
                  {categoriasVotacion.map((cat) => {
                    const Icono = cat.icono;
                    const votado = votosRealizados[cat.id];
                    return (
                      <div
                        key={cat.id}
                        className="flex-1 text-center"
                        title={cat.titulo}
                      >
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 transition-all ${
                          votado 
                            ? "bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg scale-110" 
                            : "bg-gray-200"
                        }`}>
                          <Icono className={`w-5 h-5 ${votado ? "text-white" : "text-gray-400"}`} />
                        </div>
                        <div className={`text-xs font-medium ${votado ? "text-green-600" : "text-gray-400"}`}>
                          {votado ? "✓" : "○"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contenido principal */}
        <AnimatePresence mode="wait">
          {/* Paso 1: Verificación de DNI - Estilo ONPE */}
          {paso === 1 && (
            <motion.div
              key="paso1"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              {/* Header estilo ONPE */}
              <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Vote className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">OFICINA NACIONAL DE PROCESOS ELECTORALES</h2>
                    <p className="text-sm text-blue-100">Sistema Electoral Digital Nacional</p>
                  </div>
                </div>
              </div>

              {/* Contenido del formulario */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                    CONSULTE SU IDENTIDAD PARA VOTAR
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ingrese su Documento Nacional de Identidad (DNI) para verificar su identidad y continuar con el proceso de votación
                  </p>
                </div>

                {/* Formulario estilo ONPE */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="space-y-6">
                    {/* Campo DNI */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <span className="text-[#1E3A8A]">&gt;</span>
                        Ingrese su DNI:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={dni}
                          onChange={(e) => {
                            const newDni = e.target.value.replace(/\D/g, "").slice(0, 8);
                            setDni(newDni);
                            setError("");
                            
                            // Generar captcha automáticamente cuando el DNI tenga 8 dígitos
                            if (newDni.length === 8) {
                              generateCaptcha();
                            } else {
                              // Limpiar captcha si el DNI tiene menos de 8 dígitos
                              setCaptchaCode("");
                              setCaptchaInput("");
                            }
                          }}
                          placeholder="Ejemplo: 12345678"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none text-lg font-medium bg-white"
                          onKeyPress={(e) => e.key === "Enter" && verificarDNI()}
                          maxLength={8}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <UserCheck className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 ml-6">
                        Debe contener 8 dígitos numéricos
                      </p>
                    </div>

                    {/* Campo Captcha - Solo se muestra cuando hay código generado */}
                    {captchaCode && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <span className="text-[#1E3A8A]">&gt;</span>
                          Ingrese el código de verificación:
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={captchaInput}
                            onChange={(e) => {
                              setCaptchaInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                              setError("");
                            }}
                            placeholder="Código de la imagen"
                            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none text-lg font-bold bg-white uppercase tracking-widest"
                            maxLength={4}
                            onKeyPress={(e) => e.key === "Enter" && verificarDNI()}
                          />
                          {/* Captcha visual */}
                          <div className="relative bg-white border-2 border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center min-w-[120px] h-[52px] overflow-hidden">
                            <span className="text-2xl font-bold text-gray-800 tracking-wider relative z-10">
                              {captchaCode}
                            </span>
                            {/* Línea diagonal decorativa */}
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 transform rotate-12"></div>
                              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 transform -rotate-12"></div>
                            </div>
                            {/* Ruido de fondo */}
                            <div className="absolute inset-0 opacity-10">
                              {[...Array(20)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-1 h-1 bg-gray-600 rounded-full"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 ml-6">
                          Ingrese los caracteres que aparecen en la imagen
                        </p>
                      </div>
                    )}

                    {/* Mensaje de error */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-700 bg-red-50 border-2 border-red-200 p-4 rounded-lg"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{error}</span>
                      </motion.div>
                    )}

                    {/* Botón de consulta */}
                    <div className="pt-4">
                      <button
                        onClick={verificarDNI}
                        disabled={!dni || dni.length < 8 || !captchaCode || !captchaInput || captchaInput.length < 4}
                        className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2 uppercase tracking-wide"
                      >
                        <Shield className="w-5 h-5" />
                        CONSULTAR
                      </button>
                    </div>
                  </div>
                </div>

                {/* Información de seguridad */}
                <div className="mt-6 bg-blue-50 border-l-4 border-[#2563EB] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-[#1E3A8A] mb-1">
                        Su información está protegida
                      </p>
                      <p>
                        Utilizamos encriptación de extremo a extremo para proteger sus datos personales durante todo el proceso electoral.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Paso 2: Selección de categoría - Diseño Mejorado */}
          {paso === 2 && (
            <motion.div
              key="paso2"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={fadeUp}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header con gradiente */}
              <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1E40AF] text-white p-8">
                <div className="text-center">
                  <div className="inline-block p-3 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <Vote className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">
                    Selecciona la Categoría para Votar
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Elige una de las categorías de las Elecciones Generales 2026
                  </p>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  {categoriasVotacion.map((categoria, index) => {
                    const Icono = categoria.icono;
                    const votado = votosRealizados[categoria.id];
                    const esPendiente = !votado;

                    return (
                      <motion.div
                        key={categoria.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={esPendiente ? { scale: 1.05, y: -5 } : {}}
                        whileTap={esPendiente ? { scale: 0.98 } : {}}
                        onClick={() => esPendiente && seleccionarCategoria(categoria)}
                        className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                          esPendiente
                            ? "bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-[#2563EB] hover:shadow-2xl shadow-lg"
                            : "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 opacity-90 cursor-not-allowed"
                        }`}
                      >
                        {/* Efecto de brillo al hover */}
                        {esPendiente && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        )}

                        <div className="relative p-8">
                          {/* Icono con gradiente mejorado */}
                          <div className="flex justify-center mb-6">
                            <div
                              className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${categoria.color} flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300 ${
                                esPendiente ? "group-hover:rotate-6" : ""
                              }`}
                            >
                              <Icono className="w-12 h-12 text-white" />
                              {esPendiente && (
                                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                              )}
                            </div>
                          </div>

                          {/* Contenido */}
                          <div className="text-center">
                            <h3 className={`font-bold text-xl mb-2 ${
                              esPendiente ? "text-[#1E3A8A] group-hover:text-[#2563EB]" : "text-green-700"
                            } transition-colors`}>
                              {categoria.titulo}
                            </h3>
                            <p className="text-sm font-semibold text-gray-600 mb-2">
                              {categoria.subtitulo}
                            </p>
                            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                              {categoria.descripcion}
                            </p>

                            {/* Estado */}
                            {votado && (
                              <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Votado</span>
                              </div>
                            )}
                            {esPendiente && (
                              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-6 py-3 rounded-xl font-bold shadow-lg group-hover:shadow-xl transition-all">
                                <ArrowRight className="w-5 h-5" />
                                <span>Votar Ahora</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Borde decorativo */}
                        {esPendiente && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#1E40AF] to-[#2563EB] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Botón finalizar si todas están votadas */}
                {categoriasPendientes.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mt-8"
                  >
                    <button
                      onClick={() => setPaso(5)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                      Finalizar Votación
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </motion.div>
                )}

                {/* Botón volver */}
                <div className="text-center mt-8">
                  <button
                    onClick={() => setPaso(1)}
                    className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 mx-auto group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Volver atrás</span>
                  </button>
                </div>
              </div>
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
                {obtenerCandidatos().map((candidato, index) => (
                  <motion.div
                    key={candidato.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => seleccionarCandidato(candidato)}
                    className="group border-2 border-gray-200 rounded-2xl p-6 cursor-pointer transition-all hover:border-[#2563EB] hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden relative"
                  >
                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Foto del candidato */}
                        <div className="relative">
                          <img
                            src={candidato.foto || `https://i.pravatar.cc/150?img=${candidato.id}`}
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
                          <p className="text-sm font-semibold text-gray-600">{candidato.partido}</p>
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
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                              <span>{propuesta}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Borde decorativo inferior */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#1E40AF] to-[#2563EB] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </motion.div>
                ))}
                
                {/* Opción de Voto Nulo/En Blanco */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => seleccionarCandidato({
                    id: 'nulo',
                    nombre: 'Voto Nulo / En Blanco',
                    partido: 'No me siento representado',
                    numero: 'N',
                    propuestas: ['Ejercer mi derecho al voto sin seleccionar candidato'],
                    esNulo: true
                  })}
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
                        <span>Ejercer tu derecho al voto sin seleccionar ningún candidato</span>
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
                {candidatoSeleccionado.esNulo ? (
                  // Confirmación de Voto Nulo
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-400 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold">
                        <span className="text-4xl">∅</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">
                          {candidatoSeleccionado.nombre}
                        </h3>
                        <p className="text-gray-600">{candidatoSeleccionado.partido}</p>
                      </div>
                    </div>
                    <div className="border-t border-orange-200 pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Información importante:
                      </p>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-700 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Tu voto será registrado como <strong>nulo</strong> o <strong>en blanco</strong></span>
                        </li>
                        <li className="text-sm text-gray-700 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Este voto será contabilizado pero no favorecerá a ningún candidato</span>
                        </li>
                        <li className="text-sm text-gray-700 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Es una forma válida de ejercer tu derecho al voto</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  // Confirmación de Candidato Normal
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#2563EB] rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-6 mb-4">
                      {/* Foto del candidato en confirmación */}
                      <div className="relative">
                        <img
                          src={candidatoSeleccionado.foto || `https://i.pravatar.cc/150?img=${candidatoSeleccionado.id}`}
                          alt={candidatoSeleccionado.nombre}
                          className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
                        />
                        <div className="absolute -top-2 -right-2 bg-[#2563EB] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                          {candidatoSeleccionado.numero}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-2xl text-[#1E3A8A] mb-1">
                          {candidatoSeleccionado.nombre}
                        </h3>
                        <p className="text-gray-600 font-semibold">{candidatoSeleccionado.partido}</p>
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
                )}

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
                        className={`flex items-center justify-between p-3 rounded ${
                          candidato.esNulo 
                            ? 'bg-orange-50 border border-orange-200' 
                            : 'bg-white'
                        }`}
                      >
                        <span className="text-sm text-gray-700">
                          {categoria?.titulo}
                        </span>
                        {candidato.esNulo ? (
                          <span className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                            <span className="text-lg">∅</span>
                            Voto Nulo
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
