import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Save, X, Users } from "lucide-react";
import Layout from "./Layout";

/**
 * Candidatos.jsx - Gestión de Candidatos
 * 
 * Vista para el registro y administración de candidatos:
 * - Formulario para agregar/editar candidatos (Presidente, Vicepresidente, Congresistas)
 * - Tabla con lista de candidatos registrados
 * - Búsqueda y filtrado por tipo de candidato
 * - Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar)
 * - Persistencia de datos en localStorage
 */
export default function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCandidato, setEditingCandidato] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [formData, setFormData] = useState({
    tipo: "presidente",
    nombre: "",
    apellidos: "",
    dni: "",
    partido: "",
    numero: "",
    cargo: "",
    distrito: "",
    foto: "",
  });

  useEffect(() => {
    const candidatosGuardados = localStorage.getItem("candidatos");
    if (candidatosGuardados) {
      setCandidatos(JSON.parse(candidatosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("candidatos", JSON.stringify(candidatos));
  }, [candidatos]);

  const handleAddCandidato = () => {
    setEditingCandidato(null);
    setFormData({
      tipo: "presidente",
      nombre: "",
      apellidos: "",
      dni: "",
      partido: "",
      numero: "",
      cargo: "",
      distrito: "",
      foto: "",
    });
    setShowForm(true);
  };

  const handleEditCandidato = (candidato) => {
    setEditingCandidato(candidato);
    setFormData(candidato);
    setShowForm(true);
  };

  const handleSaveCandidato = () => {
    if (editingCandidato) {
      setCandidatos(candidatos.map(c => 
        c.id === editingCandidato.id ? { ...formData, id: editingCandidato.id } : c
      ));
    } else {
      const newCandidato = {
        ...formData,
        id: Date.now().toString(),
        fechaRegistro: new Date().toISOString(),
      };
      setCandidatos([...candidatos, newCandidato]);
    }
    setShowForm(false);
    setEditingCandidato(null);
  };

  const handleDeleteCandidato = (id) => {
    if (window.confirm("¿Está seguro de eliminar este candidato?")) {
      setCandidatos(candidatos.filter(c => c.id !== id));
    }
  };

  const candidatosFiltrados = candidatos.filter(c => {
    const matchesSearch = 
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.partido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dni.includes(searchTerm);
    
    const matchesFilter = filterTipo === "todos" || c.tipo === filterTipo;
    
    return matchesSearch && matchesFilter;
  });

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
        {/* Header con búsqueda y filtros */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-[#1E3A8A]">Gestión de Candidatos</h2>
            <button
              onClick={handleAddCandidato}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar Candidato
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido, DNI o partido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="todos">Todos los tipos</option>
                <option value="presidente">Presidente</option>
                <option value="vicepresidente">Vicepresidente</option>
                <option value="congresista">Congresista</option>
              </select>
            </div>
          </div>
        </div>

        {/* Formulario de candidato */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1E3A8A]">
                {editingCandidato ? "Editar Candidato" : "Nuevo Candidato"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingCandidato(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Candidato *
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                >
                  <option value="presidente">Presidente</option>
                  <option value="vicepresidente">Vicepresidente</option>
                  <option value="congresista">Congresista</option>
                </select>
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
                  Nombres *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Nombres del candidato"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apellidos *
                </label>
                <input
                  type="text"
                  value={formData.apellidos}
                  onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                  placeholder="Apellidos del candidato"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  DNI *
                </label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  placeholder="Número de DNI"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Partido Político *
                </label>
                <input
                  type="text"
                  value={formData.partido}
                  onChange={(e) => setFormData({ ...formData, partido: e.target.value })}
                  placeholder="Nombre del partido"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>

              {formData.tipo === "vicepresidente" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cargo (1° o 2° Vicepresidente)
                  </label>
                  <select
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">1° Vicepresidente</option>
                    <option value="2">2° Vicepresidente</option>
                  </select>
                </div>
              )}

              {formData.tipo === "congresista" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Distrito Electoral
                  </label>
                  <input
                    type="text"
                    value={formData.distrito}
                    onChange={(e) => setFormData({ ...formData, distrito: e.target.value })}
                    placeholder="Ej: Lima, Cusco, Arequipa..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL de Foto
                </label>
                <input
                  type="text"
                  value={formData.foto}
                  onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                  placeholder="https://ejemplo.com/foto.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingCandidato(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCandidato}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </div>
          </motion.div>
        )}

        {/* Lista de candidatos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Partido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidatosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm || filterTipo !== "todos" 
                        ? "No se encontraron candidatos con los filtros aplicados"
                        : "No hay candidatos registrados. Agregue uno para comenzar."}
                    </td>
                  </tr>
                ) : (
                  candidatosFiltrados.map((candidato) => (
                    <tr key={candidato.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {candidato.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {candidato.foto ? (
                            <img
                              src={candidato.foto}
                              alt={candidato.nombre}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {candidato.nombre} {candidato.apellidos}
                            </div>
                            {candidato.cargo && (
                              <div className="text-sm text-gray-500">
                                {candidato.cargo}° Vicepresidente
                              </div>
                            )}
                            {candidato.distrito && (
                              <div className="text-sm text-gray-500">
                                {candidato.distrito}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {candidato.dni}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {candidato.partido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-sm font-bold text-[#1E3A8A] bg-blue-50 rounded-lg">
                          {candidato.numero}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditCandidato(candidato)}
                            className="text-[#2563EB] hover:text-[#1E40AF] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCandidato(candidato.id)}
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

        {candidatosFiltrados.length > 0 && (
          <div className="text-sm text-gray-600 text-center">
            Mostrando {candidatosFiltrados.length} de {candidatos.length} candidatos
          </div>
        )}
      </motion.div>
    </Layout>
  );
}

