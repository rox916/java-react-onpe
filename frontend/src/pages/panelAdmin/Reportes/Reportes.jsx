import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  FileSpreadsheet,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import ReporteGenerar from "./ReporteGenerar";

const initialReports = [
  {
    id: 1,
    nombre: "Reporte Oficial de Resultados - Presidenciales",
    descripcion: "Acta con los resultados finales a nivel nacional.",
    tipo: "Resultados",
    ambito: "Nacional",
    estado: "Disponible",
    fechaGeneracion: "2026-05-12 18:30:00",
  },
  {
    id: 2,
    nombre: "Reporte de Participación Ciudadana",
    descripcion: "Estadísticas de participación por departamento.",
    tipo: "Participación",
    ambito: "Nacional",
    estado: "Disponible",
    fechaGeneracion: "2026-05-12 18:45:00",
  },
  {
    id: 3,
    nombre: "Bitácora de Auditoría del Sistema",
    descripcion: "Registro completo de eventos críticos del proceso.",
    tipo: "Auditoría",
    ambito: "Sistema",
    estado: "Generando...",
    fechaGeneracion: null,
  },
  {
    id: 4,
    nombre: "Reporte de Resultados - Departamento Lima",
    descripcion:
      "Acta con los resultados oficiales para el departamento de Lima.",
    tipo: "Resultados",
    ambito: "Departamento: Lima",
    estado: "Disponible",
    fechaGeneracion: "2026-05-12 19:00:00",
  },
];

export default function Reportes() {
  const [reports, setReports] = useState(initialReports);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = (newReport) => {
    setReports([newReport, ...reports]);
    alert("Reporte en proceso de generación...");

    // Simular proceso asíncrono
    setTimeout(() => {
      setReports((current) =>
        current.map((r) =>
          r.id === newReport.id
            ? {
                ...r,
                estado: "Disponible",
                fechaGeneracion: new Date().toLocaleString("es-PE"),
              }
            : r
        )
      );
      alert(`El reporte "${newReport.nombre}" está disponible para descarga.`);
    }, 3000);
  };

  const handleDownload = (report, format) => {
    alert(
      `Descargando "${report.nombre}" en formato ${format.toUpperCase()}...`
    );
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "Disponible":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Generando...":
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* 🧭 Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Generación de Reportes Oficiales
          </h1>
          <p className="text-sm text-gray-600">
            Crea y descarga los documentos finales del proceso electoral.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        >
          <Plus className="w-5 h-5" /> Generar Nuevo Reporte
        </button>
      </div>

      {/* 📄 Lista de Reportes */}
      <div className="space-y-4">
        {reports.map((r) => (
          <motion.div
            key={r.id}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {r.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{r.descripcion}</p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                    <span>Tipo: <strong>{r.tipo}</strong></span>
                    <span>Ámbito: <strong>{r.ambito}</strong></span>
                    {r.fechaGeneracion && (
                      <span>
                        Generado: <strong>{r.fechaGeneracion}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Estado y botones */}
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(r.estado)}
                  <span
                    className={`text-sm font-semibold ${
                      r.estado === "Disponible"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {r.estado}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(r, "pdf")}
                    disabled={r.estado !== "Disponible"}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    <FileText className="w-4 h-4" /> PDF
                  </button>
                  <button
                    onClick={() => handleDownload(r, "excel")}
                    disabled={r.estado !== "Disponible"}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    <FileSpreadsheet className="w-4 h-4" /> Excel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🧩 Modal Generar */}
      <ReporteGenerar
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
      />
    </motion.div>
  );
}
