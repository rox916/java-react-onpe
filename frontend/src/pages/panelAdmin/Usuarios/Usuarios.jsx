import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, UserCheck, UserX, Users } from "lucide-react";
import UsuarioCrear from "./UsuarioCrear";
import UsuarioEditar from "./UsuarioEditar";
import UsuarioEliminar from "./UsuarioEliminar";

const roles = ["Super Admin", "Admin Regional", "Presidente de Mesa", "Soporte Técnico"];
const departamentos = ["Lima", "Cusco", "Arequipa", "Loreto", "Piura", "La Libertad", "Puno", "Junín", "Ancash"];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Ana García Castillo", dni: "87654321", email: "ana.garcia@onpe.gob.pe", rol: "Super Admin", estado: "Activo", departamento: "Lima" },
    { id: 2, nombre: "Carlos Ruiz Mendoza", dni: "12345678", email: "carlos.ruiz@onpe.gob.pe", rol: "Admin Regional", estado: "Activo", departamento: "Cusco" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const filtered = usuarios.filter((u) =>
    [u.nombre, u.email, u.dni, u.rol].some((v) =>
      v.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCreate = (data) => {
    setUsuarios([...usuarios, { ...data, id: Date.now() }]);
    setModalCreate(false);
  };

  const handleEdit = (data) => {
    setUsuarios(usuarios.map((u) => (u.id === data.id ? data : u)));
    setModalEdit(false);
  };

  const handleDelete = () => {
    setUsuarios(usuarios.filter((u) => u.id !== selectedUser.id));
    setModalDelete(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* 🧭 Encabezado con icono y descripción */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p className="text-sm text-gray-600">
              Administra la información de los usuarios, sus roles y estados dentro del sistema.
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all font-medium"
        >
          <Plus className="w-5 h-5" /> Nuevo Usuario
        </button>
      </div>

      {/* 🔍 Buscador */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, DNI, email o rol..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 🧾 Tabla de usuarios */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{u.nombre}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {u.rol}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{u.departamento}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                      u.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {u.estado === "Activo" ? (
                      <UserCheck className="w-3 h-3" />
                    ) : (
                      <UserX className="w-3 h-3" />
                    )}
                    {u.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setModalEdit(true);
                    }}
                    className="text-gray-400 hover:text-green-600 mx-1"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setModalDelete(true);
                    }}
                    className="text-gray-400 hover:text-red-600 mx-1"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧩 Modales */}
      <UsuarioCrear
        isOpen={modalCreate}
        onClose={() => setModalCreate(false)}
        onSave={handleCreate}
        roles={roles}
        departamentos={departamentos}
      />
      <UsuarioEditar
        isOpen={modalEdit}
        onClose={() => setModalEdit(false)}
        onSave={handleEdit}
        user={selectedUser}
        roles={roles}
        departamentos={departamentos}
      />
      <UsuarioEliminar
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={handleDelete}
        user={selectedUser}
      />
    </motion.div>
  );
}
