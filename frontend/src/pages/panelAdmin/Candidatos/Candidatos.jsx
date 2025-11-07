import React, { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, UserSquare2 } from "lucide-react";
import CandidatoCrear from "./CandidatoCrear";
import CandidatoEditar from "./CandidatoEditar";
import CandidatoEliminar from "./CandidatoEliminar";

// Datos iniciales simulados
const initialCandidatos = [
  { id: 1, nombre: "Rosa Paredes", partidoPolitico: "Fuerza Democrática", numeroLista: "1", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=26", estado: "Activo" },
  { id: 2, nombre: "Carlos Vargas", partidoPolitico: "Fuerza Democrática", numeroLista: "1", cargo: "Vicepresidente", foto: "https://i.pravatar.cc/150?img=32", estado: "Activo" },
  { id: 3, nombre: "Marco Antonio Luna", partidoPolitico: "Alianza País", numeroLista: "2", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=68", estado: "Activo" },
  { id: 4, nombre: "Sofia Gutiérrez", partidoPolitico: "Alianza País", numeroLista: "2", cargo: "Vicepresidente", foto: "https://i.pravatar.cc/150?img=44", estado: "Activo" },
  { id: 5, nombre: "David Fernández", partidoPolitico: "Unidad Nacional", numeroLista: "3", cargo: "Presidente", foto: "https://i.pravatar.cc/150?img=51", estado: "Activo" },
  { id: 6, nombre: "Elena Rojas", partidoPolitico: "Renovación", numeroLista: "4", cargo: "Congresista", foto: "https://i.pravatar.cc/150?img=47", estado: "Inactivo" },
];

const partidos = ["Fuerza Democrática", "Alianza País", "Unidad Nacional", "Renovación", "Partido Popular", "Juntos por el Perú"];
const cargos = ["Presidente", "Vicepresidente", "Congresista", "Parlamentario Andino"];

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState(initialCandidatos);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCargo, setFilterCargo] = useState("Todos");

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  // Filtro y búsqueda
  const filteredCandidatos = useMemo(() => {
    return candidatos.filter((c) => {
      const matchesSearch =
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.partidoPolitico.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCargo = filterCargo === "Todos" || c.cargo === filterCargo;
      return matchesSearch && matchesCargo;
    });
  }, [candidatos, searchTerm, filterCargo]);

  // Acciones
  const handleCreate = (data) => {
    setCandidatos([...candidatos, { ...data, id: Date.now() }]);
    setModalCreate(false);
  };

  const handleEdit = (data) => {
    setCandidatos(candidatos.map((c) => (c.id === data.id ? data : c)));
    setModalEdit(false);
  };

  const handleDelete = () => {
    setCandidatos(candidatos.filter((c) => c.id !== selectedCandidate.id));
    setModalDelete(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* 🧭 Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <UserSquare2 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Candidatos</h1>
            <p className="text-sm text-gray-600">Administra la información de los candidatos y sus partidos políticos.</p>
          </div>
        </div>
        <button
          onClick={() => setModalCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <Plus className="w-5 h-5" /> Agregar Candidato
        </button>
      </div>

      {/* 🧩 Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o partido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={filterCargo}
            onChange={(e) => setFilterCargo(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos">Todos los cargos</option>
            {cargos.map((cargo) => (
              <option key={cargo} value={cargo}>
                {cargo}
              </option>
            ))}
          </select>

          <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3">
            {filteredCandidatos.length} candidatos encontrados
          </div>
        </div>
      </div>

      {/* 🧾 Grid de candidatos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidatos.map((candidato) => (
          <div
            key={candidato.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={candidato.foto}
                  alt={candidato.nombre}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{candidato.nombre}</h3>
                  <p className="text-sm text-gray-600">{candidato.cargo}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Lista {candidato.numeroLista}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        candidato.estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {candidato.estado}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700">Partido Político</p>
                <p className="text-sm text-gray-900">{candidato.partidoPolitico}</p>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedCandidate(candidato);
                  setModalEdit(true);
                }}
                className="text-gray-400 hover:text-green-600"
                title="Editar"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setSelectedCandidate(candidato);
                  setModalDelete(true);
                }}
                className="text-gray-400 hover:text-red-600"
                title="Eliminar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🧱 Modales */}
      <CandidatoCrear
        isOpen={modalCreate}
        onClose={() => setModalCreate(false)}
        onSave={handleCreate}
        partidos={partidos}
        cargos={cargos}
      />

      <CandidatoEditar
        isOpen={modalEdit}
        onClose={() => setModalEdit(false)}
        onSave={handleEdit}
        candidate={selectedCandidate}
        partidos={partidos}
        cargos={cargos}
      />

      <CandidatoEliminar
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={handleDelete}
        candidate={selectedCandidate}
      />
    </motion.div>
  );
}
