import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  Shield,
  CheckCircle2,
  Users,
  Vote,
  MapPin,
  Phone,
  Mail,
  Info,
  BookOpen,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function Informacion() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const secciones = [
    {
      id: "fechas",
      titulo: "Fechas Importantes",
      icono: Calendar,
      color: "from-blue-500 to-blue-600",
      items: [
        { titulo: "Fecha de Elecciones", descripcion: "12 de abril de 2026" },
        { titulo: "Inicio de Campaña", descripcion: "1 de marzo de 2026" },
        { titulo: "Cierre de Campaña", descripcion: "10 de abril de 2026" },
        { titulo: "Publicación de Resultados", descripcion: "13 de abril de 2026" },
      ],
    },
    {
      id: "requisitos",
      titulo: "Requisitos para Votar",
      icono: CheckCircle2,
      color: "from-green-500 to-green-600",
      items: [
        { titulo: "DNI Vigente", descripcion: "Documento Nacional de Identidad actualizado" },
        { titulo: "Estar en el Padrón", descripcion: "Verificar tu inscripción en el padrón electoral" },
        { titulo: "Mayoría de Edad", descripcion: "Ser mayor de 18 años al momento de las elecciones" },
        { titulo: "Conexión a Internet", descripcion: "Para voto digital, contar con conexión estable" },
      ],
    },
    {
      id: "proceso",
      titulo: "Proceso Electoral",
      icono: BookOpen,
      color: "from-purple-500 to-purple-600",
      items: [
        { titulo: "1. Verificación", descripcion: "Confirma tu identidad con tu DNI" },
        { titulo: "2. Selección", descripcion: "Elige la categoría para votar" },
        { titulo: "3. Votación", descripcion: "Selecciona tus candidatos o voto nulo" },
        { titulo: "4. Confirmación", descripcion: "Revisa y confirma tu voto" },
        { titulo: "5. Comprobante", descripcion: "Recibe tu comprobante digital" },
      ],
    },
    {
      id: "seguridad",
      titulo: "Seguridad y Transparencia",
      icono: Shield,
      color: "from-indigo-500 to-indigo-600",
      items: [
        { titulo: "Encriptación", descripcion: "Todos los votos están encriptados de extremo a extremo" },
        { titulo: "Anonimato", descripcion: "Tu voto es completamente secreto e irrastreable" },
        { titulo: "Auditoría", descripcion: "Sistema de auditoría independiente y transparente" },
        { titulo: "Verificación", descripcion: "Puedes verificar que tu voto fue registrado correctamente" },
      ],
    },
  ];

  // Preguntas frecuentes sobre el proceso electoral
  const preguntasFrecuentes = [
    {
      pregunta: "¿Puedo cambiar mi voto después de confirmarlo?",
      respuesta: "No, una vez confirmado, tu voto es final e inalterable. Por eso es importante revisar cuidadosamente antes de confirmar.",
    },
    {
      pregunta: "¿Mi voto es realmente secreto?",
      respuesta: "Sí, el sistema garantiza el anonimato completo. Ni siquiera los administradores del sistema pueden conocer tu elección.",
    },
    {
      pregunta: "¿Qué pasa si no me siento representado por ningún candidato?",
      respuesta: "Puedes ejercer tu derecho al voto nulo o en blanco. Esta es una opción válida y será contabilizada en los resultados.",
    },
    {
      pregunta: "¿Puedo votar desde cualquier dispositivo?",
      respuesta: "Sí, puedes votar desde cualquier dispositivo con conexión a Internet: computadora, tablet o smartphone.",
    },
    {
      pregunta: "¿Qué información necesito para votar?",
      respuesta: "Solo necesitas tu número de DNI (8 dígitos) y resolver el código de verificación que aparece en pantalla.",
    },
    {
      pregunta: "¿Cómo sé que mi voto fue registrado correctamente?",
      respuesta: "Al finalizar el proceso recibirás un comprobante digital por correo electrónico confirmando que tu voto fue registrado exitosamente.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1E40AF] text-white py-20 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-block p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
            <Info className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Información Electoral
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre las Elecciones Generales 2026 y el proceso de votación digital
          </p>
        </motion.div>
      </section>

      {/* Secciones de Información */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {secciones.map((seccion, index) => {
              const Icono = seccion.icono;
              return (
                <motion.div
                  key={seccion.id}
                  id={seccion.id}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 scroll-mt-20"
                >
                  {/* Header con gradiente */}
                  <div className={`bg-gradient-to-r ${seccion.color} p-6`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Icono className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{seccion.titulo}</h2>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <ul className="space-y-4">
                      {seccion.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${seccion.color} mt-0.5`}>
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.titulo}</h3>
                            <p className="text-sm text-gray-600">{item.descripcion}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block p-3 bg-blue-100 rounded-xl mb-4">
              <HelpCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600 text-lg">
              Resolvemos las dudas más comunes sobre el proceso electoral
            </p>
          </motion.div>

          <div className="space-y-4">
            {preguntasFrecuentes.map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {faq.pregunta}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Voto Digital Detallado */}
      <section id="voto-digital" className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
              Proceso de Voto Digital
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              El voto digital es una solución tecnológica desarrollada para facilitar la participación 
              ciudadana en las Elecciones Generales 2026, garantizando seguridad, transparencia y accesibilidad.
            </p>
          </motion.div>

          {/* Pasos detallados del voto digital */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { 
                paso: 1, 
                titulo: "Verifica tu identidad", 
                descripcion: "Accede al sistema con tu número de DNI y valida tus datos personales. Este paso garantiza que solo tú puedas emitir tu voto digital.",
                icono: Shield 
              },
              { 
                paso: 2, 
                titulo: "Ingresa al módulo de votación", 
                descripcion: "Una vez verificada tu identidad, ingresarás al entorno seguro del Sistema Electoral Digital Nacional, donde podrás visualizar las cédulas habilitadas.",
                icono: FileText 
              },
              { 
                paso: 3, 
                titulo: "Elige tus candidatos", 
                descripcion: "Selecciona tus opciones de forma libre, segura y confidencial. Podrás revisar tus elecciones antes de confirmarlas.",
                icono: Vote 
              },
              { 
                paso: 4, 
                titulo: "Confirma tu voto", 
                descripcion: "Verifica el resumen de tus selecciones y confirma el envío. El sistema genera un comprobante digital cifrado de tu voto.",
                icono: CheckCircle2 
              },
              { 
                paso: 5, 
                titulo: "Seguridad garantizada", 
                descripcion: "Tu voto se encripta y almacena en servidores seguros. Ningún tercero puede acceder, modificar o rastrear tu decisión.",
                icono: Shield 
              },
              { 
                paso: 6, 
                titulo: "Finaliza el proceso", 
                descripcion: "Cierra tu sesión con confianza. El sistema confirma la recepción y registro correcto de tu voto digital.",
                icono: CheckCircle2 
              },
            ].map((item, index) => {
              const Icono = item.icono;
              return (
                <motion.div
                  key={item.paso}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {item.paso}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icono className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-gray-900">{item.titulo}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.descripcion}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Información de seguridad del voto digital */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="bg-[#0F172A] text-white rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-100">Seguridad y Transparencia del Voto Digital</h3>
            <p className="text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Nuestro sistema implementa cifrado de extremo a extremo, auditorías independientes y 
              almacenamiento seguro de datos. Cada voto es inalterable y completamente anónimo. 
              La infraestructura cumple con estándares internacionales de seguridad digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <Vote className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para ejercer tu derecho al voto?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Participa en las Elecciones Generales 2026 de forma segura y transparente. 
              Tu voto es importante para el futuro del Perú.
            </p>
            <div className="flex justify-center">
              <Link
                to="/votar"
                className="bg-white text-[#2563EB] px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Vote className="w-5 h-5" />
                Ir a Votar Ahora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
              ¿Necesitas Ayuda?
            </h2>
            <p className="text-gray-600 text-lg">
              Contáctanos si tienes alguna duda o problema
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icono: Phone, titulo: "Teléfono", info: "417-0630", descripcion: "Lunes a Viernes, 8:00 AM - 6:00 PM" },
              { icono: Mail, titulo: "Correo Electrónico", info: "informes@onpe.gob.pe", descripcion: "Respuesta en 24 horas" },
              { icono: MapPin, titulo: "Oficina Central", info: "Jr. Washington 1894", descripcion: "Cercado de Lima, Perú" },
            ].map((contacto, index) => {
              const Icono = contacto.icono;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 text-center hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icono className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{contacto.titulo}</h3>
                  <p className="text-[#2563EB] font-semibold mb-2">{contacto.info}</p>
                  <p className="text-sm text-gray-600">{contacto.descripcion}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

