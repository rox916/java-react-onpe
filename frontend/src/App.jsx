import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VotoDigital from "./pages/VotoDigital";
import Votar from "./pages/Votar";
import Resultados from "./pages/Resultados";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

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
