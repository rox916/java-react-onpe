import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VotoDigital from "./pages/VotoDigital";
import Votar from "./pages/Votar";
import Resultados from "./pages/Resultados";
import AdminLogin from "./pages/admin/AdminLogin";
import Admin from "./pages/admin/Admin";
import Candidatos from "./pages/admin/Candidatos";
import Partidos from "./pages/admin/Partidos";
import Dataset from "./pages/admin/Dataset";
import Monitoreo from "./pages/admin/Monitoreo";
import Reportes from "./pages/admin/Reportes";
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * App.jsx - Configuración de Rutas y Navegación
 * 
 * Cómo se integran las vistas del panel de administración:
 * 
 * Admin.jsx - Panel general / Dashboard
 *   - Muestra tarjetas con totales (candidatos, partidos, estado de votaciones)
 *   - Estadísticas generales del sistema
 *   - Resultados por partido político
 *   - Enlaces rápidos a otras secciones usando Link de React Router
 * 
 * Candidatos.jsx - Gestión de Candidatos
 *   - Formulario + tabla de registro de candidatos (Presidente, Vicepresidente, Congresistas)
 *   - Operaciones CRUD completas
 * 
 * Partidos.jsx - Gestión de Partidos
 *   - Lista de partidos políticos registrados
 *   - Opción para agregar/editar partidos
 * 
 * Dataset.jsx - Gestión de Datasets y ML
 *   - Botón para cargar dataset (CSV, XLSX, JSON)
 *   - Botón para limpiar datos (muestra en tabla los nulos, duplicados, outliers)
 *   - Botón para entrenar modelo con barra de progreso
 *   - Resultados y métricas (accuracy, etc.)
 * 
 * Monitoreo.jsx - Panel de Seguimiento
 *   - Estado del modelo entrenado
 *   - Última actualización de datos
 *   - Gráficos de rendimiento
 *   - Fuentes de datos activas
 * 
 * Reportes.jsx - Exportación de Reportes
 *   - Exportar y ver resultados
 *   - Generación de reportes en diferentes formatos (PDF, Excel, CSV)
 * 
 * AdminLogin.jsx - Pantalla de Acceso
 *   - Formulario de autenticación
 *   - Las rutas del admin están protegidas con ProtectedRoute.jsx
 * 
 * Todas las rutas del admin están protegidas y requieren autenticación.
 * El Layout compartido proporciona la estructura común (header, navegación).
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Routes>
        {/* Rutas de admin sin Navbar */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/candidatos"
          element={
            <ProtectedRoute>
              <Candidatos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/partidos"
          element={
            <ProtectedRoute>
              <Partidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dataset"
          element={
            <ProtectedRoute>
              <Dataset />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/monitoreo"
          element={
            <ProtectedRoute>
              <Monitoreo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute>
              <Reportes />
            </ProtectedRoute>
          }
        />
        {/* Rutas públicas con Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/voto-digital" element={<VotoDigital />} />
                  <Route path="/votar" element={<Votar />} />
                  <Route path="/resultados" element={<Resultados />} />
                </Routes>
              </main>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
