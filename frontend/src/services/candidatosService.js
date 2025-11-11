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

<<<<<<< HEAD
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
=======
// Clave para almacenar candidatos en localStorage
const CANDIDATOS_STORAGE_KEY = 'candidatos_electorales';

// Datos iniciales de candidatos - Elecciones 2026
// Basado en información oficial de precandidatos
const initialCandidatos = [
  // Acción Popular - Lista 1: Julio Chávez
  { id: 1, nombre: "Julio Chávez", partidoPolitico: "Acción Popular", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  // Acción Popular - Lista 2: Alfredo Barnechea
  { id: 2, nombre: "Alfredo Barnechea", partidoPolitico: "Acción Popular", numeroLista: "2", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  // Acción Popular - Lista 3: Víctor Andrés García Belaúnde
  { id: 3, nombre: "Víctor Andrés García Belaúnde", partidoPolitico: "Acción Popular", numeroLista: "3", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  
  // Ahora Nación
  { id: 4, nombre: "Alfonso López Chau", partidoPolitico: "Ahora Nación", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 5, nombre: "Luis Villanueva", partidoPolitico: "Ahora Nación", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 6, nombre: "Ruth Buendía", partidoPolitico: "Ahora Nación", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 7, nombre: "Alfonso López Chau", partidoPolitico: "Ahora Nación", numeroLista: "1", cargo: "Senador", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  
  // Alianza para el Progreso
  { id: 8, nombre: "César Acuña", partidoPolitico: "Alianza para el Progreso", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 9, nombre: "Jessica Tummi", partidoPolitico: "Alianza para el Progreso", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 10, nombre: "Alejandro Soto", partidoPolitico: "Alianza para el Progreso", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  
  // País para Todos
  { id: 11, nombre: "Carlos Álvarez", partidoPolitico: "País para Todos", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  { id: 12, nombre: "María Chambizea", partidoPolitico: "País para Todos", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 13, nombre: "Diego Guevara", partidoPolitico: "País para Todos", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  
  // Avanza País
  { id: 14, nombre: "Phillip Butters", partidoPolitico: "Avanza País", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  { id: 15, nombre: "Fernán Altuve", partidoPolitico: "Avanza País", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 16, nombre: "Karol Paredes", partidoPolitico: "Avanza País", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  
  // Integridad Democrática
  { id: 17, nombre: "Wolfgang Grozo", partidoPolitico: "Integridad Democrática", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 18, nombre: "Cecilia Azabache", partidoPolitico: "Integridad Democrática", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 19, nombre: "Wellington Prada", partidoPolitico: "Integridad Democrática", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  
  // Partido Regionalista de Integración Nacional - Lista 1
  { id: 20, nombre: "Walter Chirinos", partidoPolitico: "Partido Regionalista de Integración Nacional", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  // PRIN - Lista 2
  { id: 21, nombre: "Liliana Humala", partidoPolitico: "Partido Regionalista de Integración Nacional", numeroLista: "2", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  
  // Fe en el Perú
  { id: 22, nombre: "Álvaro Paz de la Barra", partidoPolitico: "Fe en el Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 23, nombre: "Yessika Arteaga", partidoPolitico: "Fe en el Perú", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  { id: 24, nombre: "Shella Palacios", partidoPolitico: "Fe en el Perú", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  
  // Fuerza Popular
  { id: 25, nombre: "Keiko Fujimori", partidoPolitico: "Fuerza Popular", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 26, nombre: "Miki Torres", partidoPolitico: "Fuerza Popular", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 27, nombre: "Luis Galarreta", partidoPolitico: "Fuerza Popular", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  
  // Partido Patriótico del Perú
  { id: 28, nombre: "Herbert Caller", partidoPolitico: "Partido Patriótico del Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 29, nombre: "Rossana Montes", partidoPolitico: "Partido Patriótico del Perú", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  { id: 30, nombre: "Jorge Carcovich", partidoPolitico: "Partido Patriótico del Perú", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  
  // Partido Democrático Federal
  { id: 31, nombre: "Armando Massé", partidoPolitico: "Partido Democrático Federal", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 32, nombre: "Virgilio Acuña", partidoPolitico: "Partido Democrático Federal", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  { id: 33, nombre: "Lidia Lourdes", partidoPolitico: "Partido Democrático Federal", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  
  // Partido Morado - Lista 1
  { id: 34, nombre: "Messias Guevara", partidoPolitico: "Partido Morado", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 35, nombre: "Herber Cueva", partidoPolitico: "Partido Morado", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 36, nombre: "Marisol Liñán", partidoPolitico: "Partido Morado", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  // Partido Morado - Lista 2
  { id: 37, nombre: "Richard Arce", partidoPolitico: "Partido Morado", numeroLista: "2", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 38, nombre: "Ronnie Jurado", partidoPolitico: "Partido Morado", numeroLista: "2", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  { id: 39, nombre: "Frida Ríos", partidoPolitico: "Partido Morado", numeroLista: "2", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  
  // Juntos por el Perú
  { id: 40, nombre: "Roberto Sánchez", partidoPolitico: "Juntos por el Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 41, nombre: "Analí Marquez", partidoPolitico: "Juntos por el Perú", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  { id: 42, nombre: "Brígida Curo", partidoPolitico: "Juntos por el Perú", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  
  // Libertad Popular
  { id: 43, nombre: "Rafael Belaúnde Llosa", partidoPolitico: "Libertad Popular", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 44, nombre: "Pedro Cateriano", partidoPolitico: "Libertad Popular", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 45, nombre: "Tania Porles", partidoPolitico: "Libertad Popular", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  
  // Partido Cívico Obras
  { id: 46, nombre: "Ricardo Belmont", partidoPolitico: "Partido Cívico Obras", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  
  // Partido Demócrata Verde
  { id: 47, nombre: "Alex González", partidoPolitico: "Partido Demócrata Verde", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  { id: 48, nombre: "Maritza del Carmen Sánchez", partidoPolitico: "Partido Demócrata Verde", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 49, nombre: "Félix Murazzo", partidoPolitico: "Partido Demócrata Verde", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  
  // Somos Perú
  { id: 50, nombre: "George Forsyth", partidoPolitico: "Somos Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  
  // Renovación Popular
  { id: 51, nombre: "Rafael López Aliaga", partidoPolitico: "Renovación Popular", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 52, nombre: "Norma Yarrow", partidoPolitico: "Renovación Popular", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 53, nombre: "Jhon Ramos Malpica", partidoPolitico: "Renovación Popular", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  
  // Perú Primero
  { id: 54, nombre: "Mario Vizcarra", partidoPolitico: "Perú Primero", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 55, nombre: "Martín Vizcarra", partidoPolitico: "Perú Primero", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 56, nombre: "Judith Mendoza", partidoPolitico: "Perú Primero", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  
  // Un Camino Diferente
  { id: 57, nombre: "Rosario Fernández", partidoPolitico: "Un Camino Diferente", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 58, nombre: "Arturo Fernández", partidoPolitico: "Un Camino Diferente", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 59, nombre: "Anita Carnero", partidoPolitico: "Un Camino Diferente", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  
  // Partido Primero La Gente - Lista 1
  { id: 60, nombre: "Miguel del Castillo", partidoPolitico: "Partido Primero La Gente", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 61, nombre: "Luis Machicao", partidoPolitico: "Partido Primero La Gente", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 62, nombre: "Rocío Pizarro", partidoPolitico: "Partido Primero La Gente", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  // Partido Primero La Gente - Lista 2
  { id: 63, nombre: "Marisol Pérez Tello", partidoPolitico: "Partido Primero La Gente", numeroLista: "2", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 64, nombre: "Raúl Molina", partidoPolitico: "Partido Primero La Gente", numeroLista: "2", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 65, nombre: "Manuel Ato", partidoPolitico: "Partido Primero La Gente", numeroLista: "2", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  
  // Partido Ciudadanos por el Perú
  { id: 66, nombre: "Morgan Quero", partidoPolitico: "Partido Ciudadanos por el Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 67, nombre: "Alberto Moreno", partidoPolitico: "Partido Ciudadanos por el Perú", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 68, nombre: "Melanie Herrera", partidoPolitico: "Partido Ciudadanos por el Perú", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  
  // Salvemos al Perú
  { id: 69, nombre: "Mariano González", partidoPolitico: "Salvemos al Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 70, nombre: "Gilbert Portugal", partidoPolitico: "Salvemos al Perú", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 71, nombre: "Katherine Ramírez", partidoPolitico: "Salvemos al Perú", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  
  // Frente de la Esperanza
  { id: 72, nombre: "Fernando Olivera", partidoPolitico: "Frente de la Esperanza", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 73, nombre: "Elizabeth León", partidoPolitico: "Frente de la Esperanza", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 74, nombre: "Carlos Cuaresma", partidoPolitico: "Frente de la Esperanza", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  
  // Perú Libre
  { id: 75, nombre: "Vladimir Cerrón", partidoPolitico: "Perú Libre", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 76, nombre: "Flavio Cruz", partidoPolitico: "Perú Libre", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 77, nombre: "Bertha Rojas", partidoPolitico: "Perú Libre", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  
  // Podemos Perú
  { id: 78, nombre: "José Luna Gálvez", partidoPolitico: "Podemos Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 79, nombre: "Cecilia García", partidoPolitico: "Podemos Perú", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 80, nombre: "Raúl Noblecilla", partidoPolitico: "Podemos Perú", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  
  // Cooperación Popular
  { id: 81, nombre: "Yonhy Lescano", partidoPolitico: "Cooperación Popular", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 82, nombre: "Vanessa Lazo", partidoPolitico: "Cooperación Popular", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 83, nombre: "Carmela Salazar", partidoPolitico: "Cooperación Popular", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  
  // Sí creo
  { id: 84, nombre: "Carlos Espá", partidoPolitico: "Sí creo", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 85, nombre: "Alejandro Santa María", partidoPolitico: "Sí creo", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 86, nombre: "Melitza Yanzich", partidoPolitico: "Sí creo", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  
  // Partido del Buen Gobierno
  { id: 87, nombre: "Jorge Nieto", partidoPolitico: "Partido del Buen Gobierno", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 88, nombre: "Susana Matute", partidoPolitico: "Partido del Buen Gobierno", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 89, nombre: "Carlos Caballero", partidoPolitico: "Partido del Buen Gobierno", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  
  // Partido Demócrata Unido Perú
  { id: 90, nombre: "Charlie Carrasco", partidoPolitico: "Partido Demócrata Unido Perú", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 91, nombre: "María Paredes Verdi", partidoPolitico: "Partido Demócrata Unido Perú", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
  { id: 92, nombre: "Wilbert Segovia", partidoPolitico: "Partido Demócrata Unido Perú", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=33", estado: "Activo" },
  
  // Alianzas - Fuerza y Libertad
  { id: 93, nombre: "Fiorella Molinelli", partidoPolitico: "Fuerza y Libertad", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 94, nombre: "Gilbert Violeta", partidoPolitico: "Fuerza y Libertad", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 95, nombre: "Mariona Pariona", partidoPolitico: "Fuerza y Libertad", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  
  // Unidad Nacional
  { id: 96, nombre: "Roberto Chiabra", partidoPolitico: "Unidad Nacional", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 97, nombre: "Javier Bedoya", partidoPolitico: "Unidad Nacional", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=47", estado: "Activo" },
  { id: 98, nombre: "Neldy Mendoza", partidoPolitico: "Unidad Nacional", numeroLista: "1", cargo: "Segundo Vicepresidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  
  // Venceremos
  { id: 99, nombre: "Vicente Alanoca", partidoPolitico: "Venceremos", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=20", estado: "Activo" },
  { id: 100, nombre: "Ronald Atencio", partidoPolitico: "Venceremos", numeroLista: "1", cargo: "Primer Vicepresidente", foto: "https://i.pravatar.cc/150?img=12", estado: "Activo" },
];

// Propuestas políticas asociadas a cada partido
// Se utilizan para mostrar información en la página de votación
const propuestasPorPartido = {
  "Acción Popular": [
    "Democracia participativa y fortalecimiento institucional",
    "Desarrollo económico sostenible",
    "Educación y salud de calidad",
    "Transparencia y lucha contra la corrupción",
  ],
  "Ahora Nación": [
    "Innovación tecnológica y educación superior",
    "Desarrollo científico y tecnológico",
    "Modernización del estado",
    "Inclusión y desarrollo social",
  ],
  "Alianza para el Progreso": [
    "Desarrollo regional y descentralización",
    "Infraestructura y obras públicas",
    "Crecimiento económico",
    "Generación de empleo",
  ],
  "Fuerza Popular": [
    "Seguridad ciudadana",
    "Crecimiento económico",
    "Estabilidad política",
    "Fortalecimiento de la familia",
  ],
  "Renovación Popular": [
    "Valores cristianos y familia",
    "Seguridad y orden",
    "Desarrollo económico",
    "Lucha contra la corrupción",
  ],
  "Juntos por el Perú": [
    "Justicia social e inclusión",
    "Derechos laborales",
    "Protección del medio ambiente",
    "Desarrollo rural y agrario",
  ],
  "Partido Morado": [
    "Modernización del estado",
    "Transparencia y anticorrupción",
    "Derechos humanos",
    "Innovación y tecnología",
  ],
  "Perú Libre": [
    "Socialismo y justicia social",
    "Nacionalización de recursos",
    "Reforma agraria",
    "Derechos de los trabajadores",
  ],
  "Podemos Perú": [
    "Desarrollo económico",
    "Seguridad ciudadana",
    "Inversión en infraestructura",
    "Generación de empleo",
  ],
  "Somos Perú": [
    "Desarrollo local y regional",
    "Obras públicas",
    "Seguridad ciudadana",
    "Apoyo a la pequeña empresa",
  ],
  "Unidad Nacional": [
    "Unidad y reconciliación nacional",
    "Desarrollo económico inclusivo",
    "Fortalecimiento democrático",
    "Justicia y transparencia",
  ],
  "Cooperación Popular": [
    "Desarrollo social",
    "Educación y salud",
    "Inclusión social",
    "Fortalecimiento democrático",
  ],
  // Propuestas genéricas para otros partidos
  "País para Todos": [
    "Entretenimiento y cultura",
    "Desarrollo social",
    "Inclusión",
  ],
  "Avanza País": [
    "Desarrollo económico",
    "Modernización",
    "Crecimiento sostenible",
  ],
  "Integridad Democrática": [
    "Transparencia",
    "Ética política",
    "Fortalecimiento democrático",
  ],
  "Fe en el Perú": [
    "Valores y principios",
    "Desarrollo nacional",
    "Unidad",
  ],
};

/**
 * Inicializa los datos de candidatos en localStorage si no existen
 * Solo se ejecuta la primera vez que se carga la aplicación
 */
const initializeData = () => {
  if (!localStorage.getItem(CANDIDATOS_STORAGE_KEY)) {
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
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
<<<<<<< HEAD
 * Fuerza la actualización de los datos desde los datos iniciales
 * Útil cuando se han actualizado los datos iniciales y se necesita refrescar
 */
export const forceUpdateCandidatos = () => {
  localStorage.setItem(CANDIDATOS_STORAGE_KEY, JSON.stringify(initialCandidatos));
  return initialCandidatos;
};

/**
=======
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
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
<<<<<<< HEAD
      c => c.cargo === "Primer Vicepresidente" && 
      c.numeroLista === pres.numeroLista && 
      c.partidoPolitico === pres.partidoPolitico
    );
=======
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
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
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
<<<<<<< HEAD
=======

>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
