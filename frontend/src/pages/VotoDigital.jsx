import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck, Vote, Lock, LogOut, Laptop } from "lucide-react";

export default function VotoDigital() {
  const pasos = [
    {
      icono: <ShieldCheck className="w-10 h-10 text-blue-500 mb-4" />,
      titulo: "1. Verifica tu identidad",
      texto:
        "Accede al sistema con tu número de DNI y valida tus datos personales. Este paso garantiza que solo tú puedas emitir tu voto digital.",
    },
    {
      icono: <Laptop className="w-10 h-10 text-blue-500 mb-4" />,
      titulo: "2. Ingresa al módulo de votación",
      texto:
        "Una vez verificada tu identidad, ingresarás al entorno seguro del Sistema Electoral Digital Nacional, donde podrás visualizar las cédulas habilitadas.",
    },
    {
      icono: <Vote className="w-10 h-10 text-blue-500 mb-4" />,
      titulo: "3. Elige tus candidatos",
      texto:
        "Selecciona tus opciones de forma libre, segura y confidencial. Podrás revisar tus elecciones antes de confirmarlas.",
    },
    {
      icono: <FileCheck className="w-10 h-10 text-blue-500 mb-4" />,
      titulo: "4. Confirma tu voto",
      texto:
        "Verifica el resumen de tus selecciones y confirma el envío. El sistema genera un comprobante digital cifrado de tu voto.",
    },
    {
      icono: <Lock className="w-10 h-10 text-blue-500 mb-4" />,
      titulo: "5. Seguridad garantizada",
      texto:
        "Tu voto se encripta y almacena en servidores seguros. Ningún tercero puede acceder, modificar o rastrear tu decisión.",
    },
    {
      icono: <LogOut className="w-10 h-10 text-blue-500 mb-4" />,
      titulo: "6. Finaliza el proceso",
      texto:
        "Cierra tu sesión con confianza. El sistema confirma la recepción y registro correcto de tu voto digital.",
    },
  ];

  const requisitos = [
    "Tener tu Documento Nacional de Identidad (DNI) vigente.",
    "Contar con conexión a Internet estable.",
    "Usar un dispositivo con navegador actualizado.",
    "Verificar tus datos en el padrón electoral.",
  ];

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <header className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-4 tracking-tight">
            Proceso de Voto Digital
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            El voto digital es una solución tecnológica desarrollada para facilitar la participación 
            ciudadana en las Elecciones Generales 2026, garantizando seguridad, transparencia y accesibilidad.
          </p>
        </header>

        {/* Requisitos previos */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 mb-20">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-6">
            Antes de empezar, asegúrate de cumplir los siguientes requisitos:
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {requisitos.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        {/* Pasos */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-12">
            Guía paso a paso para emitir tu voto digital
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {pasos.map((p, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center">
                  {p.icono}
                  <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">{p.titulo}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Información de seguridad */}
        <section className="bg-[#0F172A] text-white rounded-xl p-12 text-center mb-20">
          <h3 className="text-2xl font-bold mb-4 text-blue-100">Seguridad y Transparencia</h3>
          <p className="text-blue-200 max-w-4xl mx-auto leading-relaxed">
            Nuestro sistema implementa cifrado de extremo a extremo, auditorías independientes y 
            almacenamiento seguro de datos. Cada voto es inalterable y completamente anónimo. 
            La infraestructura cumple con estándares internacionales de seguridad digital.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/votar"
            className="bg-[#1E3A8A] text-white px-10 py-3 rounded-lg text-lg font-medium hover:bg-[#111827] transition"
          >
            Iniciar Voto Digital
          </Link>
        </div>
      </div>
    </section>
  );
}
