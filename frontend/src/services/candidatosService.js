/**
 * Servicio compartido para gestionar candidatos electorales
 * 
 * Este servicio centraliza la gestión de candidatos para que sean accesibles
 * tanto desde el panel de administración como desde la página de votación.
 * Los datos se almacenan en localStorage para persistencia entre sesiones.
 * 
 * Funcionalidades:
 * - Almacenamiento y recuperación de candidatos
 * - Transformación de datos para diferentes vistas (admin vs votación)
 * - Agrupación de presidentes con sus vicepresidentes
 * - Filtrado por estado (activo/inactivo)
 */

// Clave para almacenar candidatos en localStorage
const CANDIDATOS_STORAGE_KEY = 'candidatos_electorales';

// Datos iniciales de candidatos (datos de ejemplo para desarrollo)
const initialCandidatos = [
  { id: 1, nombre: "Rosa Paredes", partidoPolitico: "Fuerza Democrática", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 2, nombre: "Carlos Vargas", partidoPolitico: "Fuerza Democrática", numeroLista: "1", cargo: "Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 3, nombre: "Marco Antonio Luna", partidoPolitico: "Alianza País", numeroLista: "2", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  { id: 4, nombre: "Sofia Gutiérrez", partidoPolitico: "Alianza País", numeroLista: "2", cargo: "Vicepresidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 5, nombre: "David Fernández", partidoPolitico: "Unidad Nacional", numeroLista: "3", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 6, nombre: "Elena Rojas", partidoPolitico: "Renovación", numeroLista: "4", cargo: "Congresista", foto: "https://i.pravatar.cc/150?img=47", estado: "Inactivo" },
  // Candidatos adicionales para completar las categorías electorales
  { id: 7, nombre: "Roberto Mendoza", partidoPolitico: "Fuerza Democrática", numeroLista: "1", cargo: "Congresista", foto: "https://i.pravatar.cc/150?img=51", distrito: "Lima", estado: "Activo" },
  { id: 8, nombre: "Patricia Vargas", partidoPolitico: "Alianza País", numeroLista: "2", cargo: "Congresista", foto: "https://i.pravatar.cc/150?img=47", distrito: "Lima", estado: "Activo" },
  { id: 9, nombre: "Miguel Torres", partidoPolitico: "Unidad Nacional", numeroLista: "3", cargo: "Congresista", foto: "https://i.pravatar.cc/150?img=68", distrito: "Lima", estado: "Activo" },
  { id: 10, nombre: "Sofía Ramírez", partidoPolitico: "Fuerza Democrática", numeroLista: "1", cargo: "Parlamentario Andino", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 11, nombre: "Diego Morales", partidoPolitico: "Alianza País", numeroLista: "2", cargo: "Parlamentario Andino", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 12, nombre: "Elena Castro", partidoPolitico: "Unidad Nacional", numeroLista: "3", cargo: "Parlamentario Andino", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
];

// Propuestas políticas asociadas a cada partido
// Se utilizan para mostrar información en la página de votación
const propuestasPorPartido = {
  "Fuerza Democrática": [
    "Educación gratuita y de calidad",
    "Mejora del sistema de salud pública",
    "Fortalecimiento de la economía",
    "Ley de transparencia gubernamental",
    "Reforma del sistema judicial",
  ],
  "Alianza País": [
    "Seguridad ciudadana integral",
    "Desarrollo de infraestructura",
    "Apoyo a pequeñas empresas",
    "Seguridad en barrios",
    "Mejora de servicios públicos",
  ],
  "Unidad Nacional": [
    "Protección del medio ambiente",
    "Igualdad de género",
    "Tecnología e innovación",
    "Protección ambiental",
    "Derechos laborales",
  ],
  "Renovación": [
    "Modernización del estado",
    "Inversión en tecnología",
    "Desarrollo sostenible",
  ],
  "Partido Popular": [
    "Tradición y valores",
    "Seguridad nacional",
    "Crecimiento económico",
  ],
  "Juntos por el Perú": [
    "Inclusión social",
    "Desarrollo rural",
    "Justicia social",
  ],
};

/**
 * Inicializa los datos de candidatos en localStorage si no existen
 * Solo se ejecuta la primera vez que se carga la aplicación
 */
const initializeData = () => {
  if (!localStorage.getItem(CANDIDATOS_STORAGE_KEY)) {
    localStorage.setItem(CANDIDATOS_STORAGE_KEY, JSON.stringify(initialCandidatos));
  }
};

/**
 * Obtiene todos los candidatos almacenados
 * @returns {Array} Lista de todos los candidatos
 */
export const getCandidatos = () => {
  initializeData();
  const data = localStorage.getItem(CANDIDATOS_STORAGE_KEY);
  return data ? JSON.parse(data) : initialCandidatos;
};

/**
 * Guarda la lista de candidatos en localStorage
 * @param {Array} candidatos - Lista de candidatos a guardar
 */
export const saveCandidatos = (candidatos) => {
  localStorage.setItem(CANDIDATOS_STORAGE_KEY, JSON.stringify(candidatos));
};

/**
 * Obtiene candidatos filtrados por cargo específico
 * @param {string} cargo - Cargo a filtrar (Presidente, Vicepresidente, Congresista, etc.)
 * @returns {Array} Lista de candidatos activos con el cargo especificado
 */
export const getCandidatosPorCargo = (cargo) => {
  const candidatos = getCandidatos();
  return candidatos.filter(c => c.cargo === cargo && c.estado === "Activo");
};

/**
 * Obtiene candidatos organizados por categoría para la página de votación
 * Agrupa presidentes con sus vicepresidentes y organiza por categorías
 * @returns {Object} Objeto con candidatos organizados por categoría (presidente, congresistas, parlamentoAndino)
 */
export const getCandidatosParaVotacion = () => {
  const candidatos = getCandidatos();
  // Filtrar solo candidatos activos para mostrar en votación
  const activos = candidatos.filter(c => c.estado === "Activo");

  // Agrupar presidentes con sus vicepresidentes correspondientes
  // Los vicepresidentes se agrupan por número de lista y partido político
  const presidentes = activos.filter(c => c.cargo === "Presidente");
  const presidentesConVice = presidentes.map(pres => {
    const vicepresidentes = activos.filter(
      c => c.cargo === "Vicepresidente" && 
      c.numeroLista === pres.numeroLista && 
      c.partidoPolitico === pres.partidoPolitico
    );
    return {
      id: pres.id,
      nombre: pres.nombre,
      partido: pres.partidoPolitico,
      numero: pres.numeroLista,
      foto: pres.foto,
      vicepresidentes: vicepresidentes.map(v => v.nombre),
      propuestas: propuestasPorPartido[pres.partidoPolitico] || [],
    };
  });

  // Transformar candidatos a congresistas con formato para votación
  const congresistas = activos
    .filter(c => c.cargo === "Congresista")
    .map(c => ({
      id: c.id,
      nombre: c.nombre,
      partido: c.partidoPolitico,
      numero: c.numeroLista,
      foto: c.foto,
      distrito: c.distrito || "Lima",
      propuestas: propuestasPorPartido[c.partidoPolitico] || [],
    }));

  // Transformar candidatos a parlamentarios andinos con formato para votación
  const parlamentoAndino = activos
    .filter(c => c.cargo === "Parlamentario Andino")
    .map(c => ({
      id: c.id,
      nombre: c.nombre,
      partido: c.partidoPolitico,
      numero: c.numeroLista,
      foto: c.foto,
      propuestas: propuestasPorPartido[c.partidoPolitico] || [],
    }));

  return {
    presidente: presidentesConVice,
    congresistas: congresistas,
    parlamentoAndino: parlamentoAndino,
  };
};

// Inicializar datos al cargar el módulo
initializeData();

