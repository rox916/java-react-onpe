// src/pages/votar/Congresistas.jsx

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  X,
  Eye,
  User,
  List,
  CheckCircle,
  AlertCircle,
  Users, // Para el modal
} from "lucide-react";
import { useState, useEffect } from "react";

// --- 1. RUTA DE IMPORTACIÓN CORREGIDA ---
import { useAccessibility } from "../../context/AccessibilityContext";

// --- 2. IMPORTAMOS TODOS LOS LOGOS ---
import logoRenovacion from "../../assets/logos/renovacion_popular.png";
import logoFuerza from "../../assets/logos/fuerza_popular.png";
import logoAPP from "../../assets/logos/app.png";
import logoPaisTodos from "../../assets/logos/pais_para_todos.png";
import logoAhoraNacion from "../../assets/logos/ahora_nacion.png";
import logoAvanza from "../../assets/logos/avanza_pais.png";
import logoPrimeroGente from "../../assets/logos/primero_la_gente.png";

// --- 3. IMPORTAMOS LAS FOTOS (¡COMPLETO!) ---

// Renovación Popular
import imgJorgeMontoya from "../../assets/images/jorge_montoya_manrique.jpg";
import imgJoseCueto from "../../assets/images/jose_cueto_aservi.jpg";
import imgGladysEchaiz from "../../assets/images/gladys_echaiz.jpg";
import imgAlejandroMunante from "../../assets/images/alejandro_munante_barrios.jpg";
import imgNormaYarrow from "../../assets/images/norma_yarrow_lumbreras.jpg";
import imgMariaJauregui from "../../assets/images/maria_jauregui_martinez.jpg";
import imgJavierPadilla from "../../assets/images/javier_padilla_romero.jpg";
import imgMiguelCiccia from "../../assets/images/miguel_ciccia_vasquez.jpg";
import imgNoeliaHerrera from "../../assets/images/noelia_herrera_medina.jpg";
import imgMilagrosJauregui from "../../assets/images/milagros_jauregui_de_aguayo.jpg";
/*
// Fuerza Popular 
import imgMarthaMoyano from "../../assets/images/martha_moyano_delgado.jpg";
import imgAlejandroAguinaga from "../../assets/images/alejandro_aguinaga_recuenco.jpg";
import imgPatriciaJuarez from "../../assets/images/patricia_juarez_gallegos.jpg";
import imgRosangellaBarbaran from "../../assets/images/rosangella_barbaran_reyes.jpg";
import imgErnestoBustamante from "../../assets/images/ernesto_bustamante_donayre.jpg";
import imgArturoAlegria from "../../assets/images/arturo_alegria_garcia.jpg";
import imgHectorVentura from "../../assets/images/hector_ventura_angel.jpg";
import imgJuanCarlosLizarzaburu from "../../assets/images/juan_carlos_lizarzaburu.jpg";
import imgTaniaRamirez from "../../assets/images/tania_ramirez_garcia.jpg";
import imgCesarRevilla from "../../assets/images/cesar_revilla_villanueva.jpg";

// Alianza Para el Progreso
import imgLadyCamones from "../../assets/images/lady_camones_soriano.jpg";
import imgAlejandroSoto from "../../assets/images/alejandro_soto_reyes.jpg";
import imgLuisValdez from "../../assets/images/luis_valdez_farias.jpg";
import imgMagalyRuiz from "../../assets/images/magaly_ruiz_rodriguez.jpg";
import imgRobertoChiabra from "../../assets/images/roberto_chiabra_leon.jpg";
import imgElvaJulon from "../../assets/images/elva_julon_irigoin.jpg";
import imgIdelsoGarcia from "../../assets/images/idelso_garcia_correa.jpg";
import imgMariaAcuna from "../../assets/images/maria_acuna_peralta.jpg";
import imgRosioTorres from "../../assets/images/rosio_torres_salinas.jpg";
import imgEduardoSalhuana from "../../assets/images/eduardo_salhuana_cavides.jpg";

// Avanza País
import imgAdrianaTudela from "../../assets/images/adriana_tudela_gutierrez.jpg";
import imgAlejandroCavero from "../../assets/images/alejandro_cavero_alva.jpg";
import imgRosselliAmuruz from "../../assets/images/rosselli_amuruz_dulanto.jpg";
import imgJoseWilliams from "../../assets/images/jose_williams_zapata.jpg";
import imgDiegoBazan from "../../assets/images/diego_bazan_calderon.jpg";
import imgPatriciaChirinos from "../../assets/images/patricia_chirinos_venegas.jpg";
import imgJuanBurgos from "../../assets/images/juan_burgos_oliveros.jpg";
import imgDianaGonzales from "../../assets/images/diana_gonzales_delgado.jpg";
import imgMariaCordova from "../../assets/images/maria_cordova_lobaton.jpg";
import imgJoseJeri from "../../assets/images/jose_jeri_ore.jpg";
*/

// --- 4. LISTA DE PARTIDOS (PARA LA VISTA 1) ---
const partidosData = [
  { id: "p1", nombre: "Renovación Popular", logo: logoRenovacion, color: "bg-sky-600" },
  { id: "p2", nombre: "Fuerza Popular", logo: logoFuerza, color: "bg-orange-500" },
  { id: "p3", nombre: "Alianza Para el Progreso", logo: logoAPP, color: "bg-blue-500" },
  { id: "p4", nombre: "Avanza País", logo: logoAvanza, color: "bg-purple-600" },
  { id: "p5", nombre: "Ahora Nación", logo: logoAhoraNacion, color: "bg-red-600" },
  { id: "p6", nombre: "País para Todos", logo: logoPaisTodos, color: "bg-green-600" },
  { id: "p7", nombre: "Primero la Gente", logo: logoPrimeroGente, color: "bg-indigo-600" },
];

// --- 4. LISTA DE CANDIDATOS (¡CORREGIDA!) ---
const mockCongresistas = [
  // Renovación Popular (Con fotos que ya tienes)
  { id: 101, nombre: "Jorge Montoya Manrique", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "1", biografia: "Militar retirado...", propuestas: ["Leyes más estrictas...", "Fiscalización..."], foto: imgJorgeMontoya },
  { id: 102, nombre: "José Cueto Aservi", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "2", biografia: "Militar retirado...", propuestas: ["Reforma de las FFAA...", "Lucha contra el terrorismo."], foto: imgJoseCueto },
  { id: 103, nombre: "Gladys Echaíz", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "3", biografia: "Ex Fiscal de la Nación...", propuestas: ["Autonomía del MP...", "Leyes de transparencia..."], foto: imgGladysEchaiz },
  { id: 104, nombre: "Alejandro Muñante Barrios", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "4", biografia: "Abogado...", propuestas: ["Defensa de la vida...", "Reducción de burocracia..."], foto: imgAlejandroMunante },
  { id: 105, nombre: "Norma Yarrow Lumbreras", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "5", biografia: "Administradora...", propuestas: ["Reforma de ley...", "Agua y desagüe..."], foto: imgNormaYarrow },
  { id: 106, nombre: "María Jáuregui Martínez", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "6", biografia: "Activista social...", propuestas: ["Lucha contra violencia...", "Apoyo a ollas comunes."], foto: imgMariaJauregui },
  { id: 107, nombre: "Javier Padilla Romero", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "7", biografia: "Médico...", propuestas: ["Gestión hospitalaria.", "Acceso a medicamentos."], foto: imgJavierPadilla },
  { id: 108, nombre: "Miguel Ciccia Vásquez", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "8", biografia: "Empresario...", propuestas: ["Desarrollo de infra...", "Promoción de la Amazonía."], foto: imgMiguelCiccia },
  { id: 109, nombre: "Noelia Herrera Medina", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "9", biografia: "Docente...", propuestas: ["Calidad educativa.", "Protección de la infancia."], foto: imgNoeliaHerrera },
  { id: 110, nombre: "Milagros Jáuregui de Aguayo", partido: "Renovación Popular", logoPartido: logoRenovacion, numero: "10", biografia: "Conferencista...", propuestas: ["Protección de la familia.", "Reforma educativa..."], foto: imgMilagrosJauregui },
  
  // Fuerza Popular (Sin fotos, usarán placeholder)
  { id: 201, nombre: "Martha Moyano Delgado", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "1", biografia: "Política experimentada...", propuestas: ["..."], foto: "" },
  { id: 202, nombre: "Alejandro Aguinaga Recuenco", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "2", biografia: "Médico...", propuestas: ["..."], foto: "" },
  { id: 203, nombre: "Patricia Juárez Gallegos", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "3", biografia: "Abogada...", propuestas: ["..."], foto: "" },
  { id: 204, nombre: "Rosangella Barbarán Reyes", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "4", biografia: "Joven líder...", propuestas: ["..."], foto: "" },
  { id: 205, nombre: "Ernesto Bustamante Donayre", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "5", biografia: "Científico...", propuestas: ["..."], foto: "" },
  { id: 206, nombre: "Arturo Alegría García", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "6", biografia: "Politólogo...", propuestas: ["..."], foto: "" },
  { id: 207, nombre: "Héctor Ventura Ángel", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "7", biografia: "Abogado...", propuestas: ["..."], foto: "" },
  { id: 208, nombre: "Juan Carlos Lizarzaburu", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "8", biografia: "Administrador...", propuestas: ["..."], foto: "" },
  { id: 209, nombre: "Tania Ramírez García", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "9", biografia: "Obstetra...", propuestas: ["..."], foto: "" },
  { id: 210, nombre: "César Revilla Villanueva", partido: "Fuerza Popular", logoPartido: logoFuerza, numero: "10", biografia: "Economista...", propuestas: ["..."], foto: "" },

  // Alianza Para el Progreso (Sin fotos)
  { id: 301, nombre: "Lady Camones Soriano", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "1", biografia: "Política...", propuestas: ["..."], foto: "" },
  { id: 302, nombre: "Alejandro Soto Reyes", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "2", biografia: "Comunicador...", propuestas: ["..."], foto: "" },
  { id: 303, nombre: "Luis Valdez Farías", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "3", biografia: "Abogado...", propuestas: ["..."], foto: "" },
  { id: 304, nombre: "Magaly Ruiz Rodríguez", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "4", biografia: "Educadora...", propuestas: ["..."], foto: "" },
  { id: 305, nombre: "Roberto Chiabra León", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "5", biografia: "Militar retirado...", propuestas: ["..."], foto: "" },
  { id: 306, nombre: "Elva Julon Irigoín", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "6", biografia: "Obstetra...", propuestas: ["..."], foto: "" },
  { id: 307, nombre: "Idelso García Correa", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "7", biografia: "Profesor...", propuestas: ["..."], foto: "" },
  { id: 308, nombre: "María Acuña Peralta", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "8", biografia: "Empresaria...", propuestas: ["..."], foto: "" },
  { id: 309, nombre: "Rosio Torres Salinas", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "9", biografia: "Abogada...", propuestas: ["..."], foto: "" },
  { id: 310, nombre: "Eduardo Salhuana Cavides", partido: "Alianza Para el Progreso", logoPartido: logoAPP, numero: "10", biografia: "Abogado...", propuestas: ["..."], foto: "" },

  // Avanza País (Sin fotos)
  { id: 401, nombre: "Adriana Tudela Gutiérrez", partido: "Avanza País", logoPartido: logoAvanza, numero: "1", biografia: "Abogada...", propuestas: ["..."], foto: "" },
  { id: 402, nombre: "Alejandro Cavero Alva", partido: "Avanza País", logoPartido: logoAvanza, numero: "2", biografia: "Politólogo...", propuestas: ["..."], foto: "" },
  { id: 403, nombre: "Rosselli Amuruz Dulanto", partido: "Avanza País", logoPartido: logoAvanza, numero: "3", biografia: "Administradora...", propuestas: ["..."], foto: "" },
  { id: 404, nombre: "José Williams Zapata", partido: "Avanza País", logoPartido: logoAvanza, numero: "4", biografia: "Militar retirado...", propuestas: ["..."], foto: "" },
  { id: 405, nombre: "Diego Bazán Calderón", partido: "Avanza País", logoPartido: logoAvanza, numero: "5", biografia: "Abogado...", propuestas: ["..."], foto: "" },
  { id: 406, nombre: "Patricia Chirinos Venegas", partido: "Avanza País", logoPartido: logoAvanza, numero: "6", biografia: "Política...", propuestas: ["..."], foto: "" },
  { id: 407, nombre: "Juan Burgos Oliveros", partido: "Avanza País", logoPartido: logoAvanza, numero: "7", biografia: "Médico...", propuestas: ["..."], foto: "" },
  { id: 408, nombre: "Diana Gonzales Delgado", partido: "Avanza País", logoPartido: logoAvanza, numero: "8", biografia: "Ex-deportista...", propuestas: ["..."], foto: "" },
  { id: 409, nombre: "María Córdova Lobatón", partido: "Avanza País", logoPartido: logoAvanza, numero: "9", biografia: "Abogada...", propuestas: ["..."], foto: "" },
  { id: 410, nombre: "José Jerí Oré", partido: "Avanza País", logoPartido: logoAvanza, numero: "10", biografia: "Economista...", propuestas: ["..."], foto: "" },
  
  // Ahora Nación (Lista Simulada - Sin fotos)
  { id: 501, nombre: "Inés Suárez Velasco", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "1", biografia: "Socióloga...", propuestas: ["..."], foto: "" },
  { id: 502, nombre: "Martín Paz Soldán", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "2", biografia: "Defensor...", propuestas: ["..."], foto: "" },
  { id: 503, nombre: "Daniel Ugarte Paz", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "3", biografia: "Economista...", propuestas: ["..."], foto: "" },
  { id: 504, nombre: "Silvia Romero Cáceres", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "4", biografia: "Maestra...", propuestas: ["..."], foto: "" },
  { id: 505, nombre: "Miguel Pacheco Quintanilla", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "5", biografia: "Abogado...", propuestas: ["..."], foto: "" },
  { id: 506, nombre: "Gabriela Ochoa del Risco", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "6", biografia: "Periodista...", propuestas: ["..."], foto: "" },
  { id: 507, nombre: "Luis Calderón Ponce", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "7", biografia: "Arquitecto...", propuestas: ["..."], foto: "" },
  { id: 508, nombre: "Valeria Torres-García", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "8", biografia: "Activista...", propuestas: ["..."], foto: "" },
  { id: 509, nombre: "Raúl Pinto Cárdenas", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "9", biografia: "Filósofo...", propuestas: ["..."], foto: "" },
  { id: 510, nombre: "Claudia Bambarén Ruiz", partido: "Ahora Nación", logoPartido: logoAhoraNacion, numero: "10", biografia: "Nutricionista...", propuestas: ["..."], foto: "" },
  
  // País para Todos (Lista Simulada - Sin fotos)
  { id: 601, nombre: "Julia Casas Valdivia", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "1", biografia: "Líder vecinal...", propuestas: ["..."], foto: "" },
  { id: 602, nombre: "Óscar Pimentel Vargas", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "2", biografia: "Pequeño empresario...", propuestas: ["..."], foto: "" },
  { id: 603, nombre: "Lorena Chávez Soto", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "3", biografia: "Enfermera...", propuestas: ["..."], foto: "" },
  { id: 604, nombre: "David Franco Quispe", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "4", biografia: "Transportista...", propuestas: ["..."], foto: "" },
  { id: 605, nombre: "Teresa Ormeño Díaz", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "5", biografia: "Docente...", propuestas: ["..."], foto: "" },
  { id: 606, nombre: "Roberto Zegarra Milla", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "6", biografia: "Abogado...", propuestas: ["..."], foto: "" },
  { id: 607, nombre: "Verónica Angulo Peña", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "7", propuestas: ["..."], biografia: "Artista...", foto: "" },
  { id: 608, nombre: "Héctor Aguirre Campos", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "8", biografia: "Ingeniero agrónomo...", propuestas: ["..."], foto: "" },
  { id: 609, nombre: "Roxana Castillo Benítez", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "9", biografia: "Psicóloga...", propuestas: ["..."], foto: "" },
  { id: 610, nombre: "Jorge Espinoza Farfán", partido: "País para Todos", logoPartido: logoPaisTodos, numero: "10", biografia: "Líder deportivo...", propuestas: ["..."], foto: "" },

  // Primero la Gente (Lista Simulada - Sin fotos)
  { id: 701, nombre: "Miguel Torres Morales", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "1", biografia: "Abogado...", propuestas: ["..."], foto: "" },
  { id: 702, nombre: "Carolina Lizárraga Houghton", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "2", biografia: "Ex-jueza...", propuestas: ["..."], foto: "" },
  { id: 703, nombre: "Ernesto Ocampo Vilchez", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "3", biografia: "Economista...", propuestas: ["..."], foto: "" },
  { id: 704, nombre: "Lucía Dávila Mendoza", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "4", biografia: "Defensora...", propuestas: ["..."], foto: "" },
  { id: 705, nombre: "Jorge Sánchez Lira", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "5", biografia: "Médico...", propuestas: ["..."], foto: "" },
  { id: 706, nombre: "Fátima Alarcón de la Guerra", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "6", biografia: "Emprendedora...", propuestas: ["..."], foto: "" },
  { id: 707, nombre: "Pablo Gutiérrez Flores", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "7", biografia: "Docente...", propuestas: ["..."], foto: "" },
  { id: 708, nombre: "Jimena Cárdenas Reyes", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "8", biografia: "Internacionalista...", propuestas: ["..."], foto: "" },
  { id: 709, nombre: "Manuel Risco Bermeo", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "9", biografia: "Ingeniero...", propuestas: ["..."], foto: "" },
  { id: 710, nombre: "Victoria Pardo del Valle", partido: "Primero la Gente", logoPartido: logoPrimeroGente, numero: "10", biografia: "Socióloga...", propuestas: ["..."], foto: "" },
];

// --- 5. COMPONENTE PRINCIPAL CON LÓGICA DE 2 PASOS ---

export default function Congresistas({
  categoriaActual,
  onConfirmarVoto,
  onVolverCategorias,
}) {
  const { darkMode } = useAccessibility();
  
  const [vista, setVista] = useState('partidos');
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
  const [votosPreferenciales, setVotosPreferenciales] = useState([]);
  const [errorVoto, setErrorVoto] = useState(null);
  
  const [candidatoModal, setCandidatoModal] = useState(null);
  const [tabActiva, setTabActiva] = useState("perfil");

  useEffect(() => {
    if (errorVoto) {
      const timer = setTimeout(() => {
        setErrorVoto(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorVoto]);

  const handlePartySelect = (partidoNombre) => {
    setPartidoSeleccionado(partidoNombre);
    setVotosPreferenciales([]);
    setErrorVoto(null);
    setVista('candidatos');
  };

  const handleNuloSelect = () => {
    setPartidoSeleccionado('nulo');
    setVotosPreferenciales([]);
    setVista('confirmar');
  };

  const handleCandidateSelect = (candidatoId) => {
    setErrorVoto(null);
    const yaEstaSeleccionado = votosPreferenciales.includes(candidatoId);

    if (yaEstaSeleccionado) {
      setVotosPreferenciales(votosPreferenciales.filter(id => id !== candidatoId));
    } else {
      if (votosPreferenciales.length < 2) {
        setVotosPreferenciales([...votosPreferenciales, candidatoId]);
      } else {
        setErrorVoto("Solo puedes seleccionar hasta 2 votos preferenciales.");
      }
    }
  };

  const handleBackToParties = () => {
    setVista('partidos');
    setPartidoSeleccionado(null);
    setVotosPreferenciales([]);
    setErrorVoto(null);
  };

  const handleConfirmar = () => {
    if (!partidoSeleccionado) {
      setErrorVoto("Debes seleccionar un partido para votar.");
      return;
    }
    const votoCongresal = {
      partido: partidoSeleccionado,
      preferenciales: votosPreferenciales,
    };
    onConfirmarVoto(votoCongresal);
  };
  
  // --- OPTIMIZACIÓN: Animación más rápida (sin 'spring') ---
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" } // <-- MÁS RÁPIDO
    },
  };
  
  const abrirModal = (candidato) => { setCandidatoModal(candidato); setTabActiva("perfil"); };
  const cerrarModal = () => { setCandidatoModal(null); };

  const candidatosDelPartido = mockCongresistas.filter(c => c.partido === partidoSeleccionado);

  return (
    <motion.div
      key="paso3-congreso"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -20 }}
      // Quitamos 'variants' del contenedor principal
      className={`rounded-2xl p-6 md:p-10 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* --- Encabezado --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${categoriaActual.color} flex items-center justify-center text-xl shadow-lg`}>
            <categoriaActual.icono className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {categoriaActual.titulo}
            </h2>
            <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Distrito Electoral: Lima
            </p>
          </div>
        </div>
      </div>
      
      {/* --- MENSAJE DE ERROR FLOTANTE --- */}
      <AnimatePresence>
        {errorVoto && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 bg-red-600 text-white font-semibold rounded-lg shadow-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {errorVoto}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTENEDOR DE VISTAS (Partidos vs Candidatos) --- */}
      <AnimatePresence mode="wait">

        {/* --- VISTA 1: SELECCIÓN DE PARTIDO --- */}
        {vista === 'partidos' && (
          <motion.div
            key="partidos"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Paso 1: Selecciona un partido político
            </p>
            {/* --- OPTIMIZACIÓN: Quitamos 'variants' de la grid --- */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            >
              {partidosData.map(partido => (
                <motion.div
                  key={partido.id}
                  // --- OPTIMIZACIÓN: Animación 'whileInView' en la tarjeta ---
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  
                  whileHover={{ y: -6, scale: 1.03 }} // Sombra quitada
                  whileTap={{ scale: 0.98, y: 0 }}
                  onClick={() => handlePartySelect(partido.nombre)}
                  className={`
                    rounded-2xl shadow-lg overflow-hidden cursor-pointer h-48
                    flex flex-col items-center justify-center p-6
                    transition-all duration-300 border-4 border-transparent
                    ${darkMode ? 'bg-gray-800 hover:border-blue-700' : 'bg-white hover:shadow-xl hover:border-blue-400'}
                  `}
                >
                  <img src={partido.logo} alt={`Logo ${partido.nombre}`} className="h-20 w-auto object-contain mb-4" />
                  <p className={`text-center text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{partido.nombre}</p>
                </motion.div>
              ))}
              
              <motion.div
                // --- OPTIMIZACIÓN: Animación 'whileInView' en la tarjeta ---
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                
                whileHover={{ y: -6, scale: 1.03 }} // Sombra quitada
                whileTap={{ scale: 0.98, y: 0 }}
                onClick={handleNuloSelect}
                className={`
                  rounded-2xl shadow-lg overflow-hidden cursor-pointer h-48
                  flex flex-col items-center justify-center p-6
                  transition-all duration-300 border-4 border-dashed
                  ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-400' : 'bg-white border-gray-300 hover:border-orange-500'}
                `}
              >
                <span className={`text-7xl font-light ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>∅</span>
                <p className={`text-center text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Voto Nulo / En Blanco</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* --- VISTA 2: SELECCIÓN DE CANDIDATOS (CON DISEÑO DE PRESIDENTES) --- */}
        {vista === 'candidatos' && (
          <motion.div
            key="candidatos"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Paso 2: Selecciona hasta 2 votos preferenciales (opcional)
            </p>
            {/* --- OPTIMIZACIÓN: Quitamos 'variants' de la grid --- */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {candidatosDelPartido.map((candidato, index) => {
                const estaSeleccionado = votosPreferenciales.includes(candidato.id);
                
                return (
                  // --- ESTE ES EL DISEÑO DE TARJETA DE 'Candidatos.jsx' ---
                  <motion.div
                    key={candidato.id}
                    // --- OPTIMIZACIÓN: Animación 'whileInView' en la tarjeta ---
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}

                    whileHover={{ scale: 1.03, y: -5 }} // Sombra quitada
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCandidateSelect(candidato.id)}
                    className={`group bg-gradient-to-br rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-2xl relative
                      ${
                        estaSeleccionado
                          ? "border-blue-500 ring-4 ring-blue-200 shadow-blue-200"
                          : `border-2 ${darkMode ? 'border-gray-700 hover:border-blue-600' : 'border-gray-300 hover:border-blue-400'}`
                      }
                      ${darkMode ? 'from-gray-800 to-gray-900' : 'from-white to-gray-50'}
                    `}
                  >
                    {estaSeleccionado && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-2 right-2 z-10"
                      >
                        <CheckCircle
                          size={40}
                          className="text-white bg-green-500 rounded-full"
                          strokeWidth={3}
                        />
                      </motion.div>
                    )}

                    <div className="absolute top-2 left-2 z-10 bg-black/50 text-white font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full border-2 border-white">
                      {candidato.numero}
                    </div>

                    <div className={`relative ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-200 to-gray-300'} overflow-hidden h-48`}>
                      <img
                        src={candidato.foto}
                        alt={candidato.nombre}
                        // --- ¡ESTE ES EL CAMBIO QUE PEDISTE! ---
                        className={`w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300 ${ // <-- OPTIMIZACIÓN: transition-transform
                          estaSeleccionado ? '' : 'grayscale group-hover:grayscale-0'
                        }`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                      <p className="text-white text-lg font-bold text-center leading-tight truncate" title={candidato.nombre}>
                        {candidato.nombre}
                      </p>
                    </div>

                    <div className={`p-5 space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-3">
                        <div className="flex items-center justify-center gap-2 h-6">
                          <img
                            src={candidato.logoPartido}
                            alt={`Logo ${candidato.partido}`}
                            className="h-full object-contain"
                          />
                          <p className="text-base font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            {candidato.partido}
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <p className={`text-sm font-bold mb-1 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                          PROPUESTAS CLAVE:
                        </p>
                        <div className="space-y-1">
                          {candidato.propuestas
                            .slice(0, 2)
                            .map((propuesta, i) => (
                              <p
                                key={i}
                                className={`text-base leading-snug pl-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
                              >
                                • {propuesta}
                              </p>
                            ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirModal(candidato);
                          }}
                          className={`flex items-center justify-center gap-2 w-full font-bold py-3 px-5 rounded-lg transition-colors text-base
                            ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-blue-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}
                          `}
                        >
                          <Eye className="w-5 h-5" />
                          Ver Detalles
                        </button>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* --- VISTA 3: CONFIRMAR VOTO NULO --- */}
        {vista === 'confirmar' && partidoSeleccionado === 'nulo' && (
          <motion.div
            key="nulo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`rounded-2xl shadow-lg overflow-hidden border-4 border-orange-500 ${darkMode ? 'bg-gray-800' : 'bg-white'} max-w-lg mx-auto`}
          >
            <div className={`relative h-64 flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <span className={`text-8xl font-light ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>∅</span>
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute top-3 right-3 z-10">
                <CheckCircle size={32} className="text-white bg-green-500 rounded-full" strokeWidth={3} />
              </motion.div>
            </div>
            <div className="p-5">
              <h3 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Voto Nulo / En Blanco
              </h3>
              <p className={`text-center text-lg mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Has seleccionado Voto Nulo / En Blanco. Haz clic en confirmar para continuar.
              </p>
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>
      
      {/* --- Botones de navegación (Lógica actualizada) --- */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-12 gap-4">
        <button 
          onClick={vista === 'partidos' ? onVolverCategorias : handleBackToParties}
          className={`
            flex items-center justify-center gap-2
            font-bold py-3 px-6 rounded-lg 
            transition-all duration-200
            ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-200'}
          `}
        >
          <ArrowLeft className="w-5 h-5" />
          {vista === 'partidos' ? 'Volver a Categorías' : 'Volver a Partidos'}
        </button>

        <button
          disabled={!partidoSeleccionado}
          onClick={handleConfirmar}
          className="
            flex items-center justify-center gap-3
            w-full sm:w-auto
            bg-green-600 text-white font-bold text-lg 
            py-4 px-10 rounded-lg shadow-lg 
            hover:bg-green-700 transition-all duration-300 
            transform hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 disabled:hover:scale-100
          "
        >
          <CheckCircle className="w-6 h-6" />
          {partidoSeleccionado
            ? "Confirmar Voto y Continuar"
            : "Selecciona un partido"}
        </button>
      </div>

      {/* --- MODAL (Adaptado del de 'Candidatos.jsx' pero sin Vicepresidentes) --- */}
      <AnimatePresence>
        {candidatoModal && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={cerrarModal}
          />
        )}
        {candidatoModal && (
          <motion.div
            key="modal-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={cerrarModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative max-w-4xl w-full max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={cerrarModal}
                className={`absolute top-4 right-4 transition-colors z-10 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <X size={28} />
              </button>
              <div className={`w-full md:w-1/3 flex-shrink-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <img
                  src={candidatoModal.foto}
                  alt={candidatoModal.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col overflow-y-auto">
                <div className={`px-8 pt-8 pb-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50/50'}`}>
                  <h2 className={`text-4xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    {candidatoModal.nombre}
                  </h2>
                  <div className="flex items-center gap-3 mt-2 mb-6">
                    <img
                      src={candidatoModal.logoPartido}
                      alt={`Logo ${candidatoModal.partido}`}
                      className="w-10 h-10 object-contain"
                    />
                    <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {candidatoModal.partido}
                    </p>
                  </div>
                  <nav className="flex gap-2">
                    <button
                      onClick={() => setTabActiva("perfil")}
                      className={`flex items-center gap-2 py-3 px-6 rounded-t-lg text-base font-semibold transition-colors
                        ${
                          tabActiva === "perfil"
                            ? `${darkMode ? 'bg-gray-800 text-blue-300' : 'bg-white text-blue-700'} shadow-sm`
                            : `${darkMode ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                        }`}
                    >
                      <User className="w-5 h-5" /> Perfil
                    </button>
                    <button
                      onClick={() => setTabActiva("propuestas")}
                      className={`flex items-center gap-2 py-3 px-6 rounded-t-lg text-base font-semibold transition-colors
                        ${
                          tabActiva === "propuestas"
                          ? `${darkMode ? 'bg-gray-800 text-blue-300' : 'bg-white text-blue-700'} shadow-sm`
                          : `${darkMode ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                        }`}
                    >
                      <List className="w-5 h-5" /> Propuestas
                    </button>
                  </nav>
                </div>
                <div className="p-8">
                  {tabActiva === "perfil" && (
                    <motion.div
                      key="perfil"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Biografía
                      </h3>
                      <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        {candidatoModal.biografia ||
                          "Información biográfica no disponible."}
                      </p>
                    </motion.div>
                  )}
                  {tabActiva === "propuestas" && (
                    <motion.div
                      key="propuestas"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Propuestas Clave
                      </h3>
                      <ul className={`list-disc list-inside text-lg space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        {candidatoModal.propuestas.map(
                          (prop, i) => (
                            <li key={i}>{prop}</li>
                          )
                        )}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}