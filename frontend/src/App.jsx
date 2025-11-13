/**
 * Componente principal de la aplicación
 * Define todas las rutas públicas y de administración
 * Utiliza React Router para la navegación entre páginas
 */
import { Routes, Route, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Votar from "./pages/votar/Votar";

// import VotoDigital from "./pages/VotoDigital"; // <-- YA NO USAMOS ESTE

import Resultados from "./pages/Resultados";
import Informacion from "./pages/Informacion";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/panelAdmin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

// === 1. IMPORTAMOS EL COMPONENTE CORRECTO ===
import Verificacion from "./pages/votar/Verificacion";

/**
 * Layout para las páginas públicas
 * Incluye Navbar y Footer en todas las páginas públicas
 */
const PublicLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTop />
      <Routes>
        {/* Rutas de administración - No incluyen Navbar/Footer público */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Rutas públicas - Incluyen Navbar y Footer */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="votar" element={<Votar />} />
          <Route path="resultados" element={<Resultados />} />
          <Route path="informacion" element={<Informacion />} />
          
          {/* === 2. USAMOS LA RUTA Y EL COMPONENTE CORRECTO === */}
          {/* <Route path="voto-digital" element={<VotoDigital />} /> */} {/* <-- ESTA ES LA LÍNEA ANTIGUA */}
          <Route path="verificacion" element={<Verificacion />} /> {/* <-- ESTA ES LA NUEVA LÍNEA */}

        </Route>
        
        {/* Página 404 - Debe estar al final para capturar rutas no encontradas */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </div>
  );
}

export default App;