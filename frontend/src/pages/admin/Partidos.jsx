import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Save, X, Building2 } from "lucide-react";
import Layout from "./Layout";

/**
 * Partidos.jsx - Gestión de Partidos Políticos
 * 
 * Vista para el registro y administración de partidos políticos:
 * - Lista de partidos políticos registrados
 * - Formulario para agregar/editar partidos
 * - Campos: nombre, siglas, número de lista, color, logo
 * - Búsqueda por nombre, siglas o número
 * - Operaciones CRUD completas
 * - Persistencia de datos en localStorage
 */
export default function Partidos() {
  const [partidos, setPartidos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPartido, setEditingPartido] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    numero: "",
    color: "#2563EB",
    logo: "",
    siglas: "",
  });

  useEffect(() => {
    const partidosGuardados = localStorage.getItem("partidos");
    if (partidosGuardados) {
      setPartidos(JSON.parse(partidosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("partidos", JSON.stringify(partidos));
  }, [partidos]);

  const handleAddPartido = () => {
    setEditingPartido(null);
    setFormData({
      nombre: "",
      numero: "",
      color: "#2563EB",
      logo: "",
      siglas: "",
    });
    setShowForm(true);
  };

  const handleEditPartido = (partido) => {
    setEditingPartido(partido);
    setFormData(partido);
    setShowForm(true);
  };

  const handleSavePartido = () => {
    if (editingPartido) {
      setPartidos(partidos.map(p => 
        p.id === editingPartido.id ? { ...formData, id: editingPartido.id } : p
      ));
    } else {
      const newPartido = {
        ...formData,
        id: Date.now().toString(),
        fechaRegistro: new Date().toISOString(),
      };
      setPartidos([...partidos, newPartido]);
    }
    setShowForm(false);
    setEditingPartido(null);
  };

  const handleDeletePartido = (id) => {
    if (window.confirm("¿Está seguro de eliminar este partido?")) {
      setPartidos(partidos.filter(p => p.id !== id));
    }
  };

  const partidosFiltrados = partidos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.siglas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.numero.includes(searchTerm)
  );

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
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-[#1E3A8A]">Gestión de Partidos Políticos</h2>
            <button
              onClick={handleAddPartido}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar Partido
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, siglas o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1E3A8A]">
                {editingPartido ? "Editar Partido" : "Nuevo Partido"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPartido(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Partido *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Nombre completo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Siglas *
                </label>
                <input
                  type="text"
                  value={formData.siglas}
                  onChange={(e) => setFormData({ ...formData, siglas: e.target.value })}
                  placeholder="Ej: AP, PP, FD..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número de Lista *
                </label>
                <input
                  type="text"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                  placeholder="Ej: 1, 2, 3..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color del Partido *
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#2563EB"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL del Logo
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://ejemplo.com/logo.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPartido(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePartido}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </div>
          </motion.div>
        )}

        {/* Lista de partidos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Partido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Siglas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {partidosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm
                        ? "No se encontraron partidos con los filtros aplicados"
                        : "No hay partidos registrados. Agregue uno para comenzar."}
                    </td>
                  </tr>
                ) : (
                  partidosFiltrados.map((partido) => (
                    <tr key={partido.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {partido.logo ? (
                            <img
                              src={partido.logo}
                              alt={partido.nombre}
                              className="w-10 h-10 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: partido.color }}
                            >
                              {partido.siglas || <Building2 className="w-5 h-5" />}
                            </div>
                          )}
                          <div className="font-medium text-gray-900">{partido.nombre}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {partido.siglas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-sm font-bold text-[#1E3A8A] bg-blue-50 rounded-lg">
                          {partido.numero}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg border border-gray-300"
                            style={{ backgroundColor: partido.color }}
                          ></div>
                          <span className="text-sm text-gray-600">{partido.color}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditPartido(partido)}
                            className="text-[#2563EB] hover:text-[#1E40AF] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePartido(partido.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {partidosFiltrados.length > 0 && (
          <div className="text-sm text-gray-600 text-center">
            Mostrando {partidosFiltrados.length} de {partidos.length} partidos
          </div>
        )}
      </motion.div>
    </Layout>
  );
}

