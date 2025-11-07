import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function Configuracion() {
  return (
    <motion.div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Configuración de la Elección</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
        <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>Formularios para configurar fechas, candidatos y parámetros del sistema.</p>
        <p className="text-sm">Funcionalidad en desarrollo...</p>
      </div>
    </motion.div>
  );
}