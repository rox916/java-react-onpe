/**
 * Página principal (Home) del sistema electoral
 * Muestra información general sobre las elecciones, modalidades de votación
 * y proporciona acceso rápido a las funcionalidades principales
 */
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Users, Building2, Vote, FileSearch, CheckCircle2 } from "lucide-react";

export default function Home() {
  // Cálculo de días y meses restantes hasta las elecciones
  const fechaElecciones = new Date("2026-04-12T00:00:00").getTime();
  const ahora = new Date().getTime();
  const diferencia = fechaElecciones - ahora;
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const meses = Math.floor(dias / 30);

  // Configuración de animaciones para las secciones
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="bg-[#F8FAFC] text-gray-800">
      {/* ===== HERO PRINCIPAL ===== */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white text-center py-32 px-6">
        {/* Fondo decorativo con gradiente dinámico */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#13203d] to-[#0F172A] opacity-95"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Sistema Electoral Digital Nacional
          </h1>
          <p className="text-blue-100 text-lg mb-10">
            Participa en las Elecciones Generales 2026 del Perú.  
            Elige tu modalidad de voto — presencial o digital — y ejerce tu derecho 
            con seguridad, transparencia y confianza.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/votar"
              className="bg-[#2563EB] hover:bg-[#1E40AF] px-8 py-3 rounded-lg text-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-900/30 flex items-center gap-2"
            >
              <Vote className="w-5 h-5" />
              Ir a Votar Ahora
            </Link>
            <Link
              to="/informacion"
              className="border border-blue-200 text-blue-100 px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-[#0F172A] transition-all transform hover:scale-[1.02] flex items-center gap-2"
            >
              <FileSearch className="w-5 h-5" />
              Información Electoral
            </Link>
          </div>
        </motion.div>

        {/* Efecto de fondo animado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#2563EB,_transparent_60%)]"
        />
      </section>

      {/* ===== INFORMACIÓN DE ELECCIONES ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="py-20 text-center px-6 bg-white border-b border-gray-200"
      >
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6">
          Elecciones Generales y Parlamento Andino 2026
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-10">
          Las Elecciones Generales del Perú se llevarán a cabo el{" "}
          <span className="font-semibold text-[#1E3A8A]">12 de abril de 2026</span>.  
          En esta jornada los ciudadanos elegirán al Presidente, Vicepresidentes, Congresistas 
          y Representantes ante el Parlamento Andino.
        </p>

        <div className="flex justify-center gap-16">
          <div className="text-center">
            <Calendar className="w-10 h-10 text-[#2563EB] mx-auto mb-2" />
            <p className="text-4xl font-bold text-[#1E3A8A]">{meses}</p>
            <p className="text-gray-600">Meses</p>
          </div>
          <div className="text-center">
            <FileSearch className="w-10 h-10 text-[#2563EB] mx-auto mb-2" />
            <p className="text-4xl font-bold text-[#1E3A8A]">{dias % 30}</p>
            <p className="text-gray-600">Días</p>
          </div>
        </div>

        <p className="mt-8 text-gray-600">
          Faltan <span className="font-semibold">{dias}</span> días para las Elecciones Generales 2026.
        </p>
      </motion.section>

      {/* ===== MODALIDADES DE VOTO ===== */}
      <section className="relative py-24 bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] px-6 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold rounded-full">
                Modalidades Disponibles
              </span>
            </div>
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-6">
              Modalidades de Votación
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              En las Elecciones Generales 2026 podrás participar de dos maneras:  
              <strong className="text-[#1E3A8A]"> voto presencial</strong> y <strong className="text-[#1E3A8A]">voto digital</strong>.  
              Ambas modalidades aseguran accesibilidad y transparencia en el proceso.
            </p>
            <ul className="space-y-4 text-gray-700 mb-8">
              {[
                {
                  label: "Voto presencial",
                  desc: "Acércate a tu local de votación asignado con tu DNI vigente.",
                  icon: Building2,
                },
                {
                  label: "Voto digital",
                  desc: "Emite tu voto en línea de forma segura desde cualquier dispositivo conectado a Internet.",
                  icon: Vote,
                },
                {
                  label: "Verificación",
                  desc: "Confirma tu modalidad en el padrón electoral oficial.",
                  icon: CheckCircle2,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                  >
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                      <Icon className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1E3A8A] mb-1">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/informacion#voto-digital"
                className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Conocer voto digital
              </Link>
            </div>
          </motion.div>

          {/* Tarjeta lateral mejorada */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-gray-100 rounded-3xl p-10 text-center hover:shadow-3xl transition-all transform hover:-translate-y-2">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Vote className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#1E3A8A] mb-4">Tu voto cuenta</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                El voto es un derecho y un deber ciudadano. Participa activamente 
                en la construcción del futuro de nuestro país.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <p className="text-gray-600 italic text-sm font-medium">
                  "Una democracia fuerte se construye con la participación de todos."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ETAPAS DEL PROCESO ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="bg-white py-24 px-6 border-t border-gray-200"
      >
        <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-12">
          Etapas del Proceso Electoral
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <Users className="w-10 h-10 text-[#2563EB] mx-auto mb-3" />,
              title: "Convocatoria",
              desc: "Inicio del proceso electoral y registro de candidatos por los partidos políticos.",
            },
            {
              icon: <Building2 className="w-10 h-10 text-[#2563EB] mx-auto mb-3" />,
              title: "Campaña Electoral",
              desc: "Difusión de planes de gobierno y propuestas bajo las normas vigentes.",
            },
            {
              icon: <Vote className="w-10 h-10 text-[#2563EB] mx-auto mb-3" />,
              title: "Jornada Electoral",
              desc: "Los ciudadanos emiten su voto presencial o digital de forma transparente.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== CTA FINAL ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="bg-[#0F172A] text-white text-center py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#2563EB,_transparent_70%)] opacity-20"></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
          Participa en el proceso electoral 2026
        </h2>
        <p className="max-w-2xl mx-auto text-blue-100 mb-8 relative z-10">
          Infórmate sobre las modalidades de votación, conoce los pasos del proceso 
          y ejerce tu derecho ciudadano con responsabilidad y confianza.
        </p>
        <Link
          to="/informacion#voto-digital"
          className="bg-[#2563EB] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1E40AF] transition-all transform hover:scale-[1.02] relative z-10"
        >
          Explorar voto digital
        </Link>
      </motion.section>
    </div>
  );
}
