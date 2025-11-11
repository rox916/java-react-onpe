import React, { useState, useMemo, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
<<<<<<< HEAD
import { Search, Plus, Edit, Trash2, UserSquare2, MapPin, Building2 } from "lucide-react";
import CandidatoCrear from "./CandidatoCrear";
import CandidatoEditar from "./CandidatoEditar";
import CandidatoEliminar from "./CandidatoEliminar";
import { getCandidatos, saveCandidatos, forceUpdateCandidatos } from "../../../services/candidatosService";
import { PARTIDOS_POLITICOS, CARGOS_ELECTORALES, LOGOS_PARTIDOS } from "../../../constants/electoralConstants";
=======
import { Search, Plus, Edit, Trash2, UserSquare2 } from "lucide-react";
import CandidatoCrear from "./CandidatoCrear";
import CandidatoEditar from "./CandidatoEditar";
import CandidatoEliminar from "./CandidatoEliminar";
import { getCandidatos, saveCandidatos } from "../../../services/candidatosService";
import { PARTIDOS_POLITICOS, CARGOS_ELECTORALES } from "../../../constants/electoralConstants";
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54

const partidos = PARTIDOS_POLITICOS;
const cargos = CARGOS_ELECTORALES;

<<<<<<< HEAD
// Función para obtener las iniciales del partido para el símbolo
const getPartidoSimbolo = (partido) => {
  const palabras = partido.split(" ");
  if (palabras.length >= 2) {
    return palabras[0][0] + palabras[1][0];
  }
  return partido.substring(0, 2).toUpperCase();
};

// Función para obtener un color basado en el nombre del partido
const getPartidoColor = (partido) => {
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
    "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-indigo-500",
    "bg-teal-500", "bg-cyan-500", "bg-amber-500", "bg-lime-500"
  ];
  const index = partido.length % colors.length;
  return colors[index];
};

// Componente para mostrar el símbolo del partido (logo o iniciales)
const SimboloPartido = ({ partido }) => {
  const [imageError, setImageError] = useState(false);
  const logoUrl = LOGOS_PARTIDOS[partido];

  if (!logoUrl || imageError) {
    return (
      <div className={`w-16 h-16 ${getPartidoColor(partido)} rounded-lg flex items-center justify-center shadow-md`}>
        <span className="text-white font-bold text-lg">
          {getPartidoSimbolo(partido)}
        </span>
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md border-2 border-gray-200 bg-white flex items-center justify-center">
      <img
        src={logoUrl}
        alt={`Logo ${partido}`}
        className="w-full h-full object-contain p-1"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

=======
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
export default function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);

  // Cargar candidatos del servicio compartido
  useEffect(() => {
<<<<<<< HEAD
    const candidatosData = getCandidatos();
    setCandidatos(candidatosData);
  }, []);

  // Función para actualizar datos si es necesario
  const handleRefreshData = () => {
    const updated = forceUpdateCandidatos();
    setCandidatos(updated);
    alert("Datos actualizados correctamente. Los congresistas ahora muestran su distrito.");
  };
=======
    setCandidatos(getCandidatos());
  }, []);
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
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
<<<<<<< HEAD
      {/*  Encabezado */}
=======
      {/* 🧭 Encabezado */}
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <UserSquare2 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Candidatos</h1>
            <p className="text-sm text-gray-600">Administra la información de los candidatos y sus partidos políticos.</p>
          </div>
        </div>
<<<<<<< HEAD
        <div className="flex gap-2">
          <button
            onClick={handleRefreshData}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
            title="Actualizar datos con distritos"
          >
            <Search className="w-5 h-5" /> Actualizar Datos
          </button>
          <button
            onClick={() => setModalCreate(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <Plus className="w-5 h-5" /> Agregar Candidato
          </button>
        </div>
      </div>

      {/*  Filtros y búsqueda */}
=======
        <button
          onClick={() => setModalCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <Plus className="w-5 h-5" /> Agregar Candidato
        </button>
      </div>

      {/* 🧩 Filtros y búsqueda */}
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
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

<<<<<<< HEAD
      {/* Lista de candidatos estilo tabla */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Encabezado de la tabla */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              #
            </div>
            <div className="col-span-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              AGRUPACIÓN
            </div>
            <div className="col-span-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              SÍMBOLO
            </div>
            <div className="col-span-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              CARGO
            </div>
            <div className="col-span-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              CANDIDATO
            </div>
            <div className="col-span-1 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
              ACCIONES
            </div>
          </div>
        </div>

        {/* Lista de candidatos */}
        <div className="divide-y divide-gray-200">
          {filteredCandidatos.map((candidato, index) => (
            <motion.div
              key={candidato.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="group hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="grid grid-cols-12 gap-4 items-center px-6 py-4">
                {/* Número */}
                <div className="col-span-1">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                </div>

                {/* AGRUPACIÓN */}
                <div className="col-span-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{candidato.partidoPolitico}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          Lista {candidato.numeroLista}
                        </span>
                        {candidato.distrito && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{candidato.distrito}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SÍMBOLO */}
                <div className="col-span-2">
                  <SimboloPartido partido={candidato.partidoPolitico} />
                </div>

                {/* CARGO */}
                <div className="col-span-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{candidato.cargo}</p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                        candidato.estado === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
=======
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
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
                      }`}
                    >
                      {candidato.estado}
                    </span>
                  </div>
                </div>
<<<<<<< HEAD

                {/* CANDIDATO (Foto y nombre) */}
                <div className="col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={candidato.foto || `https://i.pravatar.cc/150?img=${candidato.id}`}
                        alt={candidato.nombre}
                        className="w-14 h-14 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md">
                        <UserSquare2 className="w-3 h-3 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{candidato.nombre}</p>
                  </div>
                </div>

                {/* ACCIONES */}
                <div className="col-span-1 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidato);
                      setModalEdit(true);
                    }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-green-500 rounded-lg transition-all duration-200 hover:scale-110"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidato);
                      setModalDelete(true);
                    }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensaje cuando no hay candidatos */}
        {filteredCandidatos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <UserSquare2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No se encontraron candidatos</p>
          </div>
        )}
=======
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
>>>>>>> ae3117f45a5975c13021fb56e4d732bbd4c8ec54
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
