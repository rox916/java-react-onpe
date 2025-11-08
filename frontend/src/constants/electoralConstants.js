/**
 * Constantes compartidas para toda la aplicación electoral
 * 
 * Este archivo centraliza todas las constantes utilizadas en diferentes partes
 * de la aplicación para mantener consistencia y facilitar el mantenimiento.
 * 
 * Incluye:
 * - Partidos políticos
 * - Cargos electorales
 * - Departamentos del Perú
 * - Roles de usuario
 * - Tipos y ámbitos de reportes
 */

// Lista de partidos políticos registrados en el sistema
export const PARTIDOS_POLITICOS = [
  "Fuerza Democrática",
  "Alianza País",
  "Unidad Nacional",
  "Renovación",
  "Partido Popular",
  "Juntos por el Perú",
];

// Cargos electorales disponibles en el sistema
export const CARGOS_ELECTORALES = [
  "Presidente",
  "Vicepresidente",
  "Congresista",
  "Parlamentario Andino",
];

// Departamentos del Perú para selección en formularios
export const DEPARTAMENTOS_PERU = [
  "Lima",
  "Cusco",
  "Arequipa",
  "Loreto",
  "Piura",
  "La Libertad",
  "Puno",
  "Junín",
  "Ancash",
];

// Roles de usuario disponibles en el sistema de administración
export const ROLES_USUARIO = [
  "Super Admin",
  "Admin Regional",
  "Presidente de Mesa",
  "Soporte Técnico",
];

// Tipos de reportes que se pueden generar en el sistema
export const TIPOS_REPORTE = [
  "Resultados",
  "Participación",
  "Auditoría",
  "Padrón Electoral",
];

// Ámbitos geográficos o administrativos para los reportes
export const AMBITOS_REPORTE = [
  "Nacional",
  "Departamento: Lima",
  "Departamento: Cusco",
  "Sistema",
];

