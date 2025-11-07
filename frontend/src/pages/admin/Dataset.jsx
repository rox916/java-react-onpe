import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Sparkles, Brain, Upload, AlertCircle } from "lucide-react";
import Layout from "./Layout";

/**
 * Dataset.jsx - Gestión de Datasets y Entrenamiento de Modelos
 * 
 * Vista para el procesamiento de datos y machine learning:
 * - Carga de datasets: Botón para cargar archivos CSV, XLSX, JSON
 * - Limpieza de datos: Muestra en tabla los valores nulos, duplicados, outliers
 *   y permite limpiar los datos con barra de progreso
 * - Entrenamiento de modelos: Configuración y entrenamiento de modelos ML
 *   con barra de progreso que muestra épocas y métricas (accuracy, etc.)
 * - Resultados y métricas: Visualización de precisión y rendimiento del modelo
 */
export default function Dataset() {
  const [activeTab, setActiveTab] = useState("carga");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cleaningProgress, setCleaningProgress] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState({
    upload: false,
    cleaning: false,
    training: false,
  });

  const handleUploadDataset = () => {
    setIsProcessing({ ...isProcessing, upload: true });
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing({ ...isProcessing, upload: false });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCleanData = () => {
    setIsProcessing({ ...isProcessing, cleaning: true });
    setCleaningProgress(0);
    
    const interval = setInterval(() => {
      setCleaningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing({ ...isProcessing, cleaning: false });
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleTrainModel = () => {
    setIsProcessing({ ...isProcessing, training: true });
    setTrainingProgress(0);
    
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing({ ...isProcessing, training: false });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex border-b border-gray-200">
            {[
              { id: "carga", label: "Carga de Datasets", icon: Upload },
              { id: "limpieza", label: "Limpieza de Datos", icon: Sparkles },
              { id: "entrenamiento", label: "Entrenamiento", icon: Brain },
            ].map((tab) => {
              const Icono = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icono className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carga de Datasets */}
        {activeTab === "carga" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
              <Upload className="w-6 h-6" />
              Carga de Datasets
            </h2>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Arrastra y suelta archivos aquí o</p>
                <label className="inline-block bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-2 rounded-lg cursor-pointer transition-all">
                  Seleccionar archivos
                  <input
                    type="file"
                    multiple
                    accept=".csv,.xlsx,.json"
                    className="hidden"
                    onChange={handleUploadDataset}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Formatos soportados: CSV, XLSX, JSON
                </p>
              </div>

              {isProcessing.upload && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Procesando archivo...</span>
                    <span className="text-[#2563EB] font-semibold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-full"
                    />
                  </div>
                </div>
              )}

              {uploadProgress === 100 && !isProcessing.upload && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
                  <AlertCircle className="w-5 h-5" />
                  <span>Dataset cargado exitosamente</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Limpieza de Datos */}
        {activeTab === "limpieza" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Limpieza de Datos
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Operaciones disponibles</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                      Eliminar valores nulos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                      Normalizar formatos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                      Eliminar duplicados
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                      Validar integridad
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Estadísticas</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registros totales:</span>
                      <span className="font-semibold">125,430</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registros válidos:</span>
                      <span className="font-semibold text-green-600">118,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registros a limpiar:</span>
                      <span className="font-semibold text-orange-600">7,180</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCleanData}
                disabled={isProcessing.cleaning}
                className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing.cleaning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Limpiando datos...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Iniciar Limpieza de Datos
                  </>
                )}
              </button>

              {isProcessing.cleaning && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Procesando limpieza...</span>
                    <span className="text-[#2563EB] font-semibold">{cleaningProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cleaningProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                    />
                  </div>
                </div>
              )}

              {cleaningProgress === 100 && !isProcessing.cleaning && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
                  <AlertCircle className="w-5 h-5" />
                  <span>Limpieza de datos completada exitosamente</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Entrenamiento */}
        {activeTab === "entrenamiento" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Entrenamiento de Modelos
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Modelo Actual</h3>
                  <p className="text-sm text-gray-600">Predicción Electoral v2.1</p>
                  <p className="text-xs text-gray-500 mt-1">Última actualización: 15/01/2024</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Precisión</h3>
                  <p className="text-2xl font-bold text-[#2563EB]">94.2%</p>
                  <p className="text-xs text-gray-500 mt-1">Accuracy Score</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Épocas</h3>
                  <p className="text-2xl font-bold text-[#2563EB]">150</p>
                  <p className="text-xs text-gray-500 mt-1">Iteraciones completadas</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Configuración de Entrenamiento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Algoritmo
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none">
                      <option>Random Forest</option>
                      <option>Neural Network</option>
                      <option>Support Vector Machine</option>
                      <option>Gradient Boosting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tasa de Aprendizaje
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      defaultValue="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleTrainModel}
                disabled={isProcessing.training}
                className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing.training ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrenando modelo...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Iniciar Entrenamiento
                  </>
                )}
              </button>

              {isProcessing.training && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Procesando entrenamiento...</span>
                    <span className="text-[#2563EB] font-semibold">{trainingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${trainingProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full"
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Época {Math.floor(trainingProgress / 0.67)} de 150
                  </div>
                </div>
              )}

              {trainingProgress === 100 && !isProcessing.training && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
                  <AlertCircle className="w-5 h-5" />
                  <span>Modelo entrenado exitosamente. Precisión: 94.2%</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

