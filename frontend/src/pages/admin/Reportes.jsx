import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Printer, Calendar, BarChart3 } from "lucide-react";
import Layout from "./Layout";

/**
 * Reportes.jsx - Generación y Exportación de Reportes
 * 
 * Vista para la generación y exportación de reportes:
 * - Selección de tipo de reporte (Resultados, Participación, Candidatos, Partidos)
 * - Selección de formato de exportación (PDF, Excel, CSV)
 * - Filtros por fecha (inicio y fin)
 * - Exportar reporte: Descarga del archivo generado
 * - Imprimir: Opción para imprimir reportes
 * - Programar exportación: Configuración de exportaciones automáticas
 * - Historial de reportes generados recientemente
 */
export default function Reportes() {
  const [tipoReporte, setTipoReporte] = useState("resultados");
  const [formato, setFormato] = useState("pdf");

  const reportes = [
    { id: "resultados", nombre: "Resultados Electorales", icon: BarChart3 },
    { id: "participacion", nombre: "Participación Ciudadana", icon: FileText },
    { id: "candidatos", nombre: "Lista de Candidatos", icon: FileText },
    { id: "partidos", nombre: "Partidos Políticos", icon: FileText },
  ];

  const formatos = [
    { id: "pdf", nombre: "PDF", icon: FileText },
    { id: "excel", nombre: "Excel", icon: FileText },
    { id: "csv", nombre: "CSV", icon: FileText },
  ];

  const handleExportar = () => {
    // Simulación de exportación
    alert(`Exportando reporte de ${reportes.find(r => r.id === tipoReporte)?.nombre} en formato ${formato.toUpperCase()}`);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="space-y-6"
      >
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Generación de Reportes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selección de tipo de reporte */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tipo de Reporte
              </label>
              <div className="space-y-2">
                {reportes.map((reporte) => {
                  const Icono = reporte.icon;
                  return (
                    <button
                      key={reporte.id}
                      onClick={() => setTipoReporte(reporte.id)}
                      className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                        tipoReporte === reporte.id
                          ? "border-[#2563EB] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icono className={`w-5 h-5 ${tipoReporte === reporte.id ? "text-[#2563EB]" : "text-gray-400"}`} />
                      <span className={`font-medium ${tipoReporte === reporte.id ? "text-[#2563EB]" : "text-gray-700"}`}>
                        {reporte.nombre}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selección de formato */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Formato de Exportación
              </label>
              <div className="space-y-2">
                {formatos.map((fmt) => {
                  const Icono = fmt.icon;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => setFormato(fmt.id)}
                      className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                        formato === fmt.id
                          ? "border-[#2563EB] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icono className={`w-5 h-5 ${formato === fmt.id ? "text-[#2563EB]" : "text-gray-400"}`} />
                      <span className={`font-medium ${formato === fmt.id ? "text-[#2563EB]" : "text-gray-700"}`}>
                        {fmt.nombre}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Filtros adicionales */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleExportar}
              className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              <Download className="w-5 h-5" />
              Exportar Reporte
            </button>
            <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
              <Printer className="w-5 h-5" />
              Imprimir
            </button>
            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all">
              <Calendar className="w-5 h-5" />
              Programar Exportación
            </button>
          </div>
        </div>

        {/* Reportes recientes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-[#1E3A8A] mb-4">Reportes Generados Recientemente</h3>
          <div className="space-y-3">
            {[
              { nombre: "Resultados Electorales - Enero 2024", fecha: "15/01/2024", formato: "PDF", tamaño: "2.4 MB" },
              { nombre: "Participación Ciudadana - Diciembre 2023", fecha: "28/12/2023", formato: "Excel", tamaño: "1.8 MB" },
              { nombre: "Lista de Candidatos - Noviembre 2023", fecha: "10/11/2023", formato: "CSV", tamaño: "856 KB" },
            ].map((reporte, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="font-medium text-gray-900">{reporte.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {reporte.fecha} • {reporte.formato} • {reporte.tamaño}
                    </p>
                  </div>
                </div>
                <button className="text-[#2563EB] hover:text-[#1E40AF] transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

