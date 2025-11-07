import React from "react";
import { LogOut, UserCircle2 } from "lucide-react";

const AdminHeader = () => {
  const handleLogout = () => {
    // Aquí puedes integrar tu lógica real de cierre de sesión
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const userName = localStorage.getItem("userName") || "Administrador";

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 shadow-sm px-6 py-3">
      {/* Sección izquierda: logo e info institucional */}
      <div className="flex items-center gap-3">
        <div className="leading-tight">
          <h1 className="text-sm font-semibold text-gray-800">
            Oficina Nacional de Procesos Electorales
          </h1>
          <p className="text-xs text-gray-500">Panel Administrativo 2026</p>
        </div>
      </div>

      {/* Sección derecha: usuario */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <UserCircle2 className="w-6 h-6 text-gray-500" />
          <span className="text-sm font-medium">{userName}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#2F4B8C] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#243869] transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Salir</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
