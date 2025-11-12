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

import { initialCandidatos } from './data/candidatosData';
import { propuestasPorPartido } from './data/propuestasData';

// Clave para almacenar candidatos en localStorage
const CANDIDATOS_STORAGE_KEY = 'candidatos_electorales';

/**
 * Verifica si los datos necesitan actualizarse
 * Compara la cantidad de candidatos y actualiza si es necesario
 */
const needsUpdate = (storedData) => {
  if (!storedData || storedData.length === 0) return true;
  // Si la cantidad de candidatos es muy diferente, actualizar
  if (Math.abs(storedData.length - initialCandidatos.length) > 10) return true;
  // Verificar si los congresistas tienen el campo distrito
  const congresistasStored = storedData.filter(c => c.cargo === "Congresista");
  const congresistasWithDistrito = congresistasStored.filter(c => c.distrito);
  // Si hay congresistas sin distrito, actualizar
  if (congresistasStored.length > 0 && congresistasWithDistrito.length < congresistasStored.length) {
    return true;
  }
  return false;
};

/**
 * Inicializa los datos de candidatos en localStorage si no existen o necesitan actualización
 * Actualiza automáticamente si detecta que faltan campos importantes
 */
const initializeData = () => {
  const stored = localStorage.getItem(CANDIDATOS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(CANDIDATOS_STORAGE_KEY, JSON.stringify(initialCandidatos));
    return;
  }
  
  try {
    const storedData = JSON.parse(stored);
    if (needsUpdate(storedData)) {
      // Actualizar con los datos iniciales que tienen todos los campos
      localStorage.setItem(CANDIDATOS_STORAGE_KEY, JSON.stringify(initialCandidatos));
    }
  } catch (e) {
    // Si hay error al parsear, reemplazar con datos iniciales
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
 * Fuerza la actualización de los datos desde los datos iniciales
 * Útil cuando se han actualizado los datos iniciales y se necesita refrescar
 */
export const forceUpdateCandidatos = () => {
  localStorage.setItem(CANDIDATOS_STORAGE_KEY, JSON.stringify(initialCandidatos));
  return initialCandidatos;
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
      c => (c.cargo === "Primer Vicepresidente" || c.cargo === "Segundo Vicepresidente" || c.cargo === "Vicepresidente") && 
      c.numeroLista === pres.numeroLista && 
      c.partidoPolitico === pres.partidoPolitico
    ).sort((a, b) => {
      // Ordenar: Primer Vicepresidente primero, luego Segundo Vicepresidente
      if (a.cargo === "Primer Vicepresidente") return -1;
      if (b.cargo === "Primer Vicepresidente") return 1;
      if (a.cargo === "Segundo Vicepresidente") return -1;
      if (b.cargo === "Segundo Vicepresidente") return 1;
      return 0;
    });
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
