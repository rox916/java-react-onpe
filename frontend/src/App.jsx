import { Routes, Route, Outlet } from "react-router-dom"; // <-- 1. Importa Outlet
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VotoDigital from "./pages/VotoDigital";
import Votar from "./pages/Votar";
import Resultados from "./pages/Resultados";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/panelAdmin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

// 2. Este componente ahora se usará correctamente
const PublicLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow pt-16">
      <Outlet /> {/* Aquí se renderizarán Home, VotoDigital, etc. */}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 3. Un solo bloque <Routes> para toda la aplicación */}
      <Routes>
        {/* Rutas de administración (sin Navbar/Footer público) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*" // El asterisco es clave para rutas anidadas
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Rutas públicas con su propio layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="voto-digital" element={<VotoDigital />} />
          <Route path="votar" element={<Votar />} />
          <Route path="resultados" element={<Resultados />} />
        </Route>
        
        {/* Página 404 si no encuentra nada (siempre al final) */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </div>
  );
}

export default App;