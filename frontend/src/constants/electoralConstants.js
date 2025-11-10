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

// Lista de partidos políticos registrados en el sistema - Elecciones 2026
export const PARTIDOS_POLITICOS = [
  // Partidos principales
  "Acción Popular",
  "Ahora Nación",
  "Alianza para el Progreso",
  "País para Todos",
  "Avanza País",
  "Integridad Democrática",
  "Partido Regionalista de Integración Nacional",
  "Fe en el Perú",
  "Fuerza Popular",
  "Partido Patriótico del Perú",
  "Partido Democrático Federal",
  "Partido Morado",
  "Juntos por el Perú",
  "Libertad Popular",
  "Partido Cívico Obras",
  "Partido Demócrata Verde",
  "Somos Perú",
  "Partido Aprista Peruano",
  "Renovación Popular",
  "Progresemos",
  "Perú Moderno",
  "Perú Primero",
  "Un Camino Diferente",
  "Partido Primero La Gente",
  "Partido Ciudadanos por el Perú",
  "Salvemos al Perú",
  "Frente de la Esperanza",
  "Perú Libre",
  "Podemos Perú",
  "Cooperación Popular",
  "Sí creo",
  "Partido del Buen Gobierno",
  "Partido Demócrata Unido Perú",
  // Alianzas
  "Fuerza y Libertad",
  "Unidad Nacional",
  "Venceremos",
];

// Cargos electorales disponibles en el sistema
export const CARGOS_ELECTORALES = [
  "Presidente",
  "Primer Vicepresidente",
  "Segundo Vicepresidente",
  "Senador",
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

