import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Database, AlertCircle } from "lucide-react";
import Layout from "./Layout";

/**
 * Monitoreo.jsx - Panel de Seguimiento y Monitoreo
 * 
 * Vista para el seguimiento del sistema y modelos:
 * - Estado del modelo entrenado: Información sobre el modelo actual
 * - Última actualización de datos: Fecha y hora de la última actualización
 * - Fuentes de datos activas: Monitoreo de APIs y fuentes de información
 * - Gráficos de rendimiento: Visualización de métricas y estadísticas
 * - Alertas y notificaciones: Sistema de alertas para eventos importantes
 * - Barra de progreso para procesos de monitoreo en tiempo real
 */
export default function Monitoreo() {
  const [monitoringProgress, setMonitoringProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMonitorInfo = () => {
    setIsProcessing(true);
    setMonitoringProgress(0);
    
    const interval = setInterval(() => {
      setMonitoringProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 0; // Reiniciar para monitoreo continuo
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Monitoreo de Información
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Fuentes Activas</span>
                <Activity className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-[#2563EB]">12</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Datos Recibidos</span>
                <Database className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-[#2563EB]">2.4M</p>
              <p className="text-xs text-gray-500">Últimas 24h</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Alertas</span>
                <AlertCircle className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-orange-600">3</p>
              <p className="text-xs text-gray-500">Pendientes</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Estado</span>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg font-bold text-green-600">Activo</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Fuentes de Datos</h3>
              <button
                onClick={handleMonitorInfo}
                disabled={isProcessing}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Monitoreando...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Iniciar Monitoreo
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2">
              {[
                { nombre: "API Electoral Nacional", estado: "activo", datos: "1.2M" },
                { nombre: "Redes Sociales", estado: "activo", datos: "850K" },
                { nombre: "Medios de Comunicación", estado: "activo", datos: "350K" },
              ].map((fuente, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{fuente.nombre}</p>
                      <p className="text-xs text-gray-500">{fuente.datos} registros</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {fuente.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">Monitoreando fuentes de datos...</span>
                <span className="text-[#2563EB] font-semibold">{monitoringProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${monitoringProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full"
                />
              </div>
              <div className="text-xs text-gray-500 text-center">
                Recopilando datos en tiempo real...
              </div>
            </div>
          )}

          {monitoringProgress > 0 && !isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-2 text-blue-700">
              <Activity className="w-5 h-5" />
              <span>Monitoreo completado. {monitoringProgress}% de datos procesados.</span>
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}

