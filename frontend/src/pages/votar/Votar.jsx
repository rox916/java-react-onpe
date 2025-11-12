// src/pages/votar/Votar.jsx

import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Vote, Crown, Globe, Building2 } from "lucide-react";
import { getCandidatosParaVotacion } from "../../services/candidatosService";

// componentes de esta carpeta
import ProgressCard from "./ProgressCard";
import Verificacion from "./Verificacion";
import Categorias from "./Categorias";
import Candidatos from "./Candidatos";
import Congresistas from "./Congresistas";
import Final from "./Final";

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
  // Estados del proceso
  const [paso, setPaso] = useState(1);
  const [dni, setDni] = useState("");
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [votosRealizados, setVotosRealizados] = useState({});
  const [error, setError] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [candidatosData, setCandidatosData] = useState({
    presidente: [],
    congresistas: [],
    parlamentoAndino: [],
  });

  // Animación común
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Cargar candidatos del servicio compartido y actualizar cuando cambien
  useEffect(() => {
    const cargarCandidatos = () => {
      const datos = getCandidatosParaVotacion();
      setCandidatosData(datos);
    };

    cargarCandidatos();

    const handleStorageChange = (e) => {
      if (e.key === "candidatos_electorales" || !e.key) {
        cargarCandidatos();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(cargarCandidatos, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  /** Genera código captcha */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  const verificarDNI = () => {
    setError("");
    if (!dni || dni.length < 8) {
      setError("Por favor, ingrese un DNI válido (8 dígitos)");
      return;
    }

    if (!captchaInput || captchaInput.toUpperCase() !== captchaCode) {
      setError(
        "El código de verificación no coincide. Por favor, intente nuevamente."
      );
      generateCaptcha();
      return;
    }

    // Simulación de verificación
    setTimeout(() => {
      setPaso(2);
    }, 1000);
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaActual(categoria);
    setPaso(3);
  };

  // confirmarVotoDirecto
  const confirmarVotoDirecto = (candidatoVotado) => {
    setTimeout(() => {
      const nuevosVotos = {
        ...votosRealizados,
        [categoriaActual.id]: candidatoVotado,
      };
      setVotosRealizados(nuevosVotos);

      const categoriasVotadas = Object.keys(nuevosVotos);
      if (categoriasVotadas.length === categoriasVotacion.length) {
        setPaso(5);
      } else {
        setCategoriaActual(null);
        setPaso(2);
      }
    }, 500);
  };

  // Función para volver a categorías
  const volverACategorias = () => {
    setCategoriaActual(null);
    setPaso(2);
  };

  const reiniciar = () => {
    setPaso(1);
    setDni("");
    setCategoriaActual(null);
    setVotosRealizados({});
    setError("");
    setCaptchaCode("");
    setCaptchaInput("");
  };

  const obtenerCandidatos = () => {
    if (!categoriaActual) return [];
    const categoriaKey =
      categoriaActual.id === "parlamentoAndino"
        ? "parlamentoAndino"
        : categoriaActual.id;
    return candidatosData[categoriaKey] || [];
  };

  const categoriasPendientes = categoriasVotacion.filter(
    (cat) => !votosRealizados[cat.id]
  );

  const progreso =
    (Object.keys(votosRealizados).length / categoriasVotacion.length) * 100;

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
            <Vote className="w-8 h-8 text-[#2563EB]" />
            <h1 className="text-4xl font-bold text-[#1E3A8A]">Realiza tu voto</h1>
          </div>
        </motion.div>

        {/* Progreso */}
        {paso > 1 && paso < 5 && (
          <ProgressCard
            fadeUp={fadeUp}
            votosRealizados={votosRealizados}
            categorias={categoriasVotacion}
            progreso={progreso}
          />
        )}

        {/* Contenido principal por paso */}
        <AnimatePresence mode="wait">
          {paso === 1 && (
            <Verificacion
              key="paso1"
              fadeUp={fadeUp}
              dni={dni}
              setDni={setDni}
              error={error}
              setError={setError}
              captchaCode={captchaCode}
              setCaptchaCode={setCaptchaCode}
              captchaInput={captchaInput}
              setCaptchaInput={setCaptchaInput}
              generateCaptcha={generateCaptcha}
              verificarDNI={verificarDNI}
            />
          )}

          {paso === 2 && (
            <Categorias
              key="paso2"
              fadeUp={fadeUp}
              categorias={categoriasVotacion}
              votosRealizados={votosRealizados}
              categoriasPendientes={categoriasPendientes}
              onSeleccionarCategoria={seleccionarCategoria}
              onVolverPaso1={() => setPaso(1)}
              onIrFinal={() => setPaso(5)}
            />
          )}

          {paso === 3 && categoriaActual && categoriaActual.id === "presidente" && (
            <Candidatos
              key="paso3-presidente"
              categoriaActual={categoriaActual}
              onConfirmarVoto={confirmarVotoDirecto}
              onVolverCategorias={volverACategorias}
            />
          )}

          {paso === 3 && categoriaActual && categoriaActual.id === "congresistas" && (
            <Congresistas
              key="paso3-congreso"
              categoriaActual={categoriaActual}
              onConfirmarVoto={confirmarVotoDirecto}
              onVolverCategorias={volverACategorias}
            />
          )}

          {paso === 3 && categoriaActual && categoriaActual.id === "parlamentoAndino" && (
            <motion.div
              key="paso3-parlamento"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={fadeUp}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-purple-700">
                Parlamento Andino
              </h2>
              <p className="mt-4 text-gray-600">
                Este componente aún está en construcción.
              </p>
              <button
                onClick={volverACategorias}
                className="mt-6 bg-purple-600 text-white py-2 px-5 rounded-lg"
              >
                Volver a Categorías
              </button>
            </motion.div>
          )}

          {paso === 5 && (
            <Final
              key="paso5"
              fadeUp={fadeUp}
              votosRealizados={votosRealizados}
              categorias={categoriasVotacion}
              onReiniciar={reiniciar}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
