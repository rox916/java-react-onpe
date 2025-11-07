import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Plus, Edit, Trash2, Lock } from "lucide-react";
import RolCrear from "./RolCrear";
import RolEditar from "./RolEditar";
import RolEliminar from "./RolEliminar";

// Datos iniciales simulados
const initialRoles = [
  {
    id: 1,
    nombre: "Super Admin",
    descripcion: "Acceso total al sistema y configuración global.",
    permisos: ["Usuarios", "Centros", "Resultados", "Configuración", "Auditoría", "Análisis de Datos"],
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Admin Regional",
    descripcion: "Gestiona centros y resultados dentro de su región.",
    permisos: ["Centros", "Resultados", "Reportes"],
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Presidente de Mesa",
    descripcion: "Registra y valida los resultados de mesa electoral.",
    permisos: ["Resultados"],
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Soporte Técnico",
    descripcion: "Da soporte al sistema y usuarios regionales.",
    permisos: ["Usuarios", "Reportes"],
    estado: "Inactivo",
  },
];

export default function RolesyPermisos() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleCreate = (data) => {
    setRoles([...roles, { ...data, id: Date.now() }]);
    setModalCreate(false);
  };

  const handleEdit = (data) => {
    setRoles(roles.map((r) => (r.id === data.id ? data : r)));
    setModalEdit(false);
  };

  const handleDelete = () => {
    setRoles(roles.filter((r) => r.id !== selectedRole.id));
    setModalDelete(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* 🧭 Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Roles y Permisos</h1>
            <p className="text-sm text-gray-600">
              Define los niveles de acceso y responsabilidades dentro del sistema.
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <Plus className="w-5 h-5" /> Crear Nuevo Rol
        </button>
      </div>

      {/* 🧾 Tabla */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permisos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((rol) => (
              <tr key={rol.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {rol.estado === "Activo" ? (
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm font-semibold text-gray-900">{rol.nombre}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{rol.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {rol.permisos.map((p, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                      rol.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {rol.estado === "Activo" ? (
                      <ShieldCheck className="w-3 h-3" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                    {rol.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedRole(rol);
                      setModalEdit(true);
                    }}
                    className="text-gray-400 hover:text-green-600 mx-1"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRole(rol);
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
      <RolCrear
        isOpen={modalCreate}
        onClose={() => setModalCreate(false)}
        onSave={handleCreate}
      />
      <RolEditar
        isOpen={modalEdit}
        onClose={() => setModalEdit(false)}
        onSave={handleEdit}
        role={selectedRole}
      />
      <RolEliminar
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={handleDelete}
        role={selectedRole}
      />
    </motion.div>
  );
}
