import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa el Layout y todas las vistas que SÍ existen en tu proyecto
import AdminLayout from './Sidebar/AdminLayout';
import Dashboard from './Dashboard/Dashboard';
import Usuarios from './Usuarios/Usuarios';
import Centros from './Centros/Centros';
import Configuracion from './Configuracion/Configuracion';
import Reportes from './Reportes/Reportes';
import Resultados from './Resultados/Resultados';
import Auditoria from './Auditoria/Auditoria';
import PadronElectoral from './PadronElectoral/PadronElectoral';
import Candidatos from './Candidatos/Candidatos';
import Analisis from "./Analisis/Analisis";
import CargaDataset from "./Analisis/CargaDataset";
import LimpiezaDatos from "./Analisis/LimpiezaDatos";
import EntrenamientoModelo from "./Analisis/EntrenamientoModelo";
import Prediccion from "./Analisis/Prediccion";
import RolesyPermisos from "./RolesyPermisos/RolesyPermisos";


export default function Admin() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> {/* Ruta por defecto: /admin */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="centros" element={<Centros />} />
        <Route path="configuracion" element={<Configuracion />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="resultados" element={<Resultados />} />
        <Route path="auditoria" element={<Auditoria />} />
        <Route path="candidatos" element={<Candidatos />} />
        <Route path="padron-electoral" element={<PadronElectoral />} />
        <Route path="roles" element={<RolesyPermisos />} />
        <Route path="analisis" element={<Analisis />} />
        <Route path="analisis/carga" element={<CargaDataset />} />
        <Route path="analisis/limpieza" element={<LimpiezaDatos />} />
        <Route path="analisis/entrenamiento" element={<EntrenamientoModelo />} />
        <Route path="analisis/prediccion" element={<Prediccion />} />
      </Route>
    </Routes>
  );
}