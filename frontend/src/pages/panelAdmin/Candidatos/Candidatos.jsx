import React, { useState, useMemo, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, UserSquare2 } from "lucide-react";
import CandidatoCrear from "./CandidatoCrear";
import CandidatoEditar from "./CandidatoEditar";
import CandidatoEliminar from "./CandidatoEliminar";
import { getCandidatos, saveCandidatos } from "../../../services/candidatosService";
import { PARTIDOS_POLITICOS, CARGOS_ELECTORALES } from "../../../constants/electoralConstants";

const partidos = PARTIDOS_POLITICOS;
const cargos = CARGOS_ELECTORALES;

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);

  // Cargar candidatos del servicio compartido
  useEffect(() => {
    setCandidatos(getCandidatos());
  }, []);
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

  // Acciones - Sincronizar con localStorage
  const handleCreate = (data) => {
    const nuevosCandidatos = [...candidatos, { ...data, id: Date.now() }];
    setCandidatos(nuevosCandidatos);
    saveCandidatos(nuevosCandidatos);
    setModalCreate(false);
  };

  const handleEdit = (data) => {
    const candidatosActualizados = candidatos.map((c) => (c.id === data.id ? data : c));
    setCandidatos(candidatosActualizados);
    saveCandidatos(candidatosActualizados);
    setModalEdit(false);
  };

  const handleDelete = () => {
    const candidatosActualizados = candidatos.filter((c) => c.id !== selectedCandidate.id);
    setCandidatos(candidatosActualizados);
    saveCandidatos(candidatosActualizados);
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

      {/* 🧾 Grid de candidatos con diseño mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidatos.map((candidato, index) => (
          <motion.div
            key={candidato.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative flex items-start gap-4">
                <div className="relative">
                  <img
                    src={candidato.foto}
                    alt={candidato.nombre}
                    className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow-md">
                    <UserSquare2 className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 text-white">
                  <h3 className="text-lg font-bold mb-1">{candidato.nombre}</h3>
                  <p className="text-sm opacity-90 mb-3">{candidato.cargo}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                      Lista {candidato.numeroLista}
                    </span>
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                        candidato.estado === "Activo"
                          ? "bg-green-500/80 text-white border-green-400"
                          : "bg-red-500/80 text-white border-red-400"
                      }`}
                    >
                      {candidato.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Partido Político</p>
                <p className="text-base font-bold text-gray-900">{candidato.partidoPolitico}</p>
              </div>
            </div>

            {/* Footer con acciones */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex justify-end gap-2 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedCandidate(candidato);
                  setModalEdit(true);
                }}
                className="p-2.5 text-gray-400 hover:text-white hover:bg-green-500 rounded-lg transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
                title="Editar"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setSelectedCandidate(candidato);
                  setModalDelete(true);
                }}
                className="p-2.5 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
                title="Eliminar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
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
