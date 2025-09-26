import React, { useState, useCallback, useMemo } from 'react';
import { Star, Shield, TrendingUp, Users, CheckCircle, ArrowRight, Send, Phone, Target, Award, DollarSign, Camera, MessageCircle, Mail, Eye, FileText, Lock, Rocket, Diamond, User, Building } from 'lucide-react';
import Chatbot from './components/Chatbot';

interface FormData {
  nombre: string;
  edad: string;
  ciudad: string;
  experiencia_of: string;
  seguidores_instagram: string;
  seguidores_tiktok: string;
  motivacion: string;
  disponibilidad: string;
  ingresos_actuales: string;
  objetivos_ingresos: string;
  telefono: string;
  tiene_contenido: string;
  dispuesta_promocion: string;
  comentarios: string;
}

const PolicyModal = React.memo(({ type, onClose }: { type: string; onClose: () => void }) => {
  const getPolicyContent = useCallback(() => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Política de Privacidad',
          content: `
            <h3>1. INFORMACIÓN AL USUARIO</h3>
            <p>MYONLYFXNS, en adelante RESPONSABLE, es el Responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril de 2016 (GDPR) relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos.</p>

            <h3>2. FINALIDAD DEL TRATAMIENTO DE DATOS</h3>
            <p>Los datos personales se tratarán para las siguientes finalidades:</p>
            <ul>
              <li>Gestión de consultas y solicitudes de información</li>
              <li>Prestación de servicios de agencia OF</li>
              <li>Comunicaciones comerciales y promocionales</li>
              <li>Cumplimiento de obligaciones legales</li>
            </ul>

            <h3>3. BASE LEGAL PARA EL TRATAMIENTO</h3>
            <p>La base legal para el tratamiento de sus datos es el consentimiento del interesado y la ejecución de un contrato.</p>

            <h3>4. CONSERVACIÓN DE DATOS</h3>
            <p>Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.</p>

            <h3>5. DERECHOS DEL USUARIO</h3>
            <p>El Usuario puede ejercer sus derechos de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición a su tratamiento dirigiéndose a agenciaonlyfxns@gmail.com o al teléfono +34 621 48 22 56.</p>

            <h3>6. CONTACTO</h3>
            <p>Para cualquier consulta sobre esta Política de Privacidad, puede contactarnos en:</p>
            <p>Teléfono: +34 621 48 22 56</p>
          `
        };
      case 'legal':
        return {
          title: 'Aviso Legal',
          content: `
            <h3>1. DATOS IDENTIFICATIVOS</h3>
            <p>En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:</p>
            <p>Denominación social: MYONLYFXNS</p>
            <p>Teléfono: +34 621 48 22 56</p>

            <h3>2. OBJETO</h3>
            <p>El presente aviso legal regula el uso del sitio web de MYONLYFXNS, que pone a disposición de los usuarios de Internet.</p>

            <h3>3. CONDICIONES DE USO</h3>
            <p>El acceso y uso de este sitio web implica la aceptación expresa y sin reservas de todas las condiciones establecidas en este Aviso Legal.</p>

            <h3>4. RESPONSABILIDAD</h3>
            <p>El propietario del sitio web no se hace responsable de la información publicada en su web siempre que no tenga conocimiento efectivo de que esta actividad o información almacenada es ilícita.</p>

            <h3>5. PROPIEDAD INTELECTUAL</h3>
            <p>Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece al propietario del sitio web.</p>

            <h3>6. CONTACTO</h3>
            <p>Para cualquier consulta sobre este Aviso Legal, puede contactarnos en:</p>
            <p>Teléfono: +34 621 48 22 56</p>
          `
        };
      case 'cookies':
        return {
          title: 'Política de Cookies',
          content: `
            <h3>1. ¿QUÉ SON LAS COOKIES?</h3>
            <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo.</p>

            <h3>2. TIPOS DE COOKIES QUE UTILIZAMOS</h3>
            <p><strong>Cookies técnicas:</strong> Son necesarias para el funcionamiento del sitio web.</p>
            <p><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo los usuarios interactúan con el sitio web.</p>
            <p><strong>Cookies de personalización:</strong> Permiten recordar sus preferencias.</p>

            <h3>3. FINALIDAD DE LAS COOKIES</h3>
            <ul>
              <li>Permitir la navegación y uso del sitio web</li>
              <li>Mejorar el funcionamiento del sitio web</li>
              <li>Analizar el uso del sitio web</li>
              <li>Personalizar la experiencia del usuario</li>
            </ul>

            <h3>4. GESTIÓN DE COOKIES</h3>
            <p>Puede configurar su navegador para aceptar o rechazar cookies. La desactivación de cookies puede afectar al funcionamiento del sitio web.</p>

            <h3>5. COOKIES DE TERCEROS</h3>
            <p>Este sitio web puede utilizar servicios de terceros que instalan cookies en su dispositivo para mejorar nuestros servicios.</p>

            <h3>6. CONTACTO</h3>
            <p>Para cualquier consulta sobre esta Política de Cookies, puede contactarnos en:</p>
            <p>Teléfono: +34 621 48 22 56</p>
          `
        };
      default:
        return { title: '', content: '' };
    }
  }, [type]);

  const policy = getPolicyContent();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{policy.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div 
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
        </div>
      </div>
    </div>
  );
});

function App() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    edad: '',
    ciudad: '',
    experiencia_of: '',
    seguidores_instagram: '',
    seguidores_tiktok: '',
    motivacion: '',
    disponibilidad: '',
    ingresos_actuales: '',
    objetivos_ingresos: '',
    telefono: '',
    tiene_contenido: '',
    dispuesta_promocion: '',
    comentarios: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPolicies, setShowPolicies] = useState<string | null>(null);
  const [showPrivacyError, setShowPrivacyError] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedPrivacy) {
      setShowPrivacyError(true);
      setTimeout(() => setShowPrivacyError(false), 3000);
      return;
    }
    
    setShowPrivacyError(false);
    setIsSubmitting(true);

    const whatsappMessage = `🌟 *NUEVA CANDIDATA - MYONLYFXNS* 🌟

👤 *INFORMACIÓN PERSONAL:*
• Nombre: ${formData.nombre}
• Edad: ${formData.edad}
• Ciudad: ${formData.ciudad}
• Email: ${formData.telefono}

📱 *REDES SOCIALES:*
• Instagram: ${formData.seguidores_instagram}
• TikTok: ${formData.seguidores_tiktok}

💼 *EXPERIENCIA OF:*
• Experiencia previa: ${formData.experiencia_of}
• Tiene contenido: ${formData.tiene_contenido}
• Dispuesta a promoción: ${formData.dispuesta_promocion}

💰 *OBJETIVOS FINANCIEROS:*
• Ingresos actuales: ${formData.ingresos_actuales}
• Objetivo de ingresos: ${formData.objetivos_ingresos}
• Motivación: ${formData.motivacion}

⏰ *DISPONIBILIDAD:*
• ${formData.disponibilidad}

💬 *COMENTARIOS:*
${formData.comentarios || 'Ninguno'}

¡Contactar lo antes posible! 🚀`;

    const emailSubject = encodeURIComponent('Nueva Candidata - MYONLYFXNS');
    const emailBody = encodeURIComponent(whatsappMessage);
    const emailUrl = `mailto:agenciaonlyfxns@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    window.open(emailUrl, '_blank');
    
    setIsSubmitting(false);
    
    // Resetear formulario
    setFormData({
      nombre: '',
      edad: '',
      ciudad: '',
      experiencia_of: '',
      seguidores_instagram: '',
      seguidores_tiktok: '',
      motivacion: '',
      disponibilidad: '',
      ingresos_actuales: '',
      objetivos_ingresos: '',
      telefono: '',
      tiene_contenido: '',
      dispuesta_promocion: '',
      comentarios: ''
    });
    setAcceptedPrivacy(false);
  }, [formData]);

  const scrollToForm = useCallback(() => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const stats = useMemo(() => [
    { value: "€8.5K", label: "Media Mensual", icon: DollarSign },
    { value: "24/7", label: "Soporte Total", icon: Shield },
    { value: "+150", label: "Modelos Activas", icon: Eye },
    { value: "0€", label: "Inversión", icon: Target }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "LAURA M.",
      age: "23 años",
      location: "Madrid",
      earning: "€6,200",
      period: "mes pasado",
      story: "\"Trabajaba en una tienda ganando €900 al mes. Con MYONLYFXNS ahora tengo ingresos extra que me permiten estudiar. El equipo me apoya mucho.\""
    },
    {
      name: "SOFIA R.",
      age: "25 años", 
      location: "Barcelona",
      earning: "€9,800",
      period: "mes pasado",
      story: "\"Empecé hace 8 meses sin experiencia. Me enseñaron todo paso a paso. Ahora tengo más estabilidad económica trabajando desde casa.\""
    },
    {
      name: "CARLA V.",
      age: "24 años",
      location: "Valencia", 
      earning: "€7,400",
      period: "mes pasado",
      story: "\"Al principio tenía dudas, pero el equipo es profesional. Me ayudaron con fotos, marketing y consejos. Voy creciendo poco a poco.\""
    }
  ], []);

  const services = useMemo(() => [
    {
      icon: Camera,
      title: "GESTIÓN DE CONTENIDO",
      description: "Te ayudamos con ideas de contenido, edición básica de fotos/videos y consejos para mejorar la calidad de tus publicaciones en la página azul."
    },
    {
      icon: TrendingUp,
      title: "MARKETING PROFESIONAL",
      description: "Estrategias de promoción en redes sociales, optimización de perfil y técnicas probadas para hacer crecer tu audiencia de forma orgánica."
    },
    {
      icon: MessageCircle,
      title: "APOYO EN CHAT",
      description: "Te enseñamos técnicas de conversación efectivas y te apoyamos con estrategias para mejorar la interacción con tus seguidores."
    },
    {
      icon: DollarSign,
      title: "OPTIMIZACIÓN INGRESOS",
      description: "Consejos sobre precios, estrategias de monetización y técnicas para aumentar gradualmente tus ingresos mensuales."
    },
    {
      icon: Shield,
      title: "PROTECCIÓN TOTAL",
      description: "Consejos de seguridad, privacidad online y cómo manejar situaciones difíciles manteniendo tu bienestar personal."
    },
    {
      icon: Award,
      title: "COACHING PERSONAL",
      description: "Sesiones de mentoría personalizada, apoyo emocional y desarrollo de confianza para crecer profesionalmente."
    }
  ], []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <span className="text-2xl font-black text-blue-600">
                  MYONLYFXNS
                </span>
                <div className="text-xs text-gray-600 font-medium">AGENCY</div>
              </div>
            </div>
            <button
              onClick={scrollToForm}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contactar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full px-6 py-3 mb-8">
            <Diamond className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-semibold text-blue-600">
              AGENCIA ESPECIALIZADA PÁGINA AZUL
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            TRANSFORMA TU
            <br />
            <span className="text-blue-600">
              SITUACIÓN
            </span>
            <br />
            <span className="text-blue-600">
              FINANCIERA
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Únete a nuestra agencia especializada y descubre cómo generar €5,000-€15,000 mensuales 
            en la página azul con nuestro apoyo profesional.
          </p>

          <button 
            onClick={scrollToForm}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors mb-12"
          >
            <div className="flex items-center space-x-3">
              <Rocket className="h-5 w-5" />
              <span>CONTACTAR POR EMAIL</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              HISTORIAS DE
              <span className="text-blue-600 ml-2">
                ÉXITO REAL
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modelos reales generando €5K-€15K mensuales con nuestra agencia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((story, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black mr-3">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-lg text-gray-900">{story.name}</div>
                    <div className="text-gray-600">{story.age} • {story.location}</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200">
                  <div className="text-2xl font-black text-blue-600 text-center">{story.earning}</div>
                  <div className="text-blue-600 text-center font-semibold">{story.period}</div>
                </div>

                <blockquote className="text-gray-700 italic leading-relaxed">
                  {story.story}
                </blockquote>

                <div className="flex justify-center mt-4">
                  <div className="flex text-blue-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              <span className="text-blue-600">
                SERVICIOS
              </span>
              <br />
              TODO INCLUIDO
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos encargamos de todo para que te enfoques en crear contenido
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formulario" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              ¿LISTA PARA
              <span className="text-blue-600 ml-2">
                CAMBIAR
              </span>
              <br />
              <span className="text-blue-600">
                TU VIDA?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Completa este formulario y te contactaremos
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: María García"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Edad *
                  </label>
                  <select
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona tu edad</option>
                    <option value="18-20">18-20 años</option>
                    <option value="21-25">21-25 años</option>
                    <option value="26-30">26-30 años</option>
                    <option value="31-35">31-35 años</option>
                    <option value="36+">36+ años</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: Madrid"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: maria@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  ¿Tienes experiencia en OF? *
                </label>
                <select
                  name="experiencia_of"
                  value={formData.experiencia_of}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="no-tengo">No, nunca he tenido OF</option>
                  <option value="tengo-pero-no-gano">Sí, pero gano menos de €500/mes</option>
                  <option value="gano-poco">Sí, gano entre €500-1500/mes</option>
                  <option value="gano-bien">Sí, gano más de €1500/mes</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Seguidores Instagram
                  </label>
                  <select
                    name="seguidores_instagram"
                    value={formData.seguidores_instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona cantidad</option>
                    <option value="0-1k">0 - 1,000</option>
                    <option value="1k-5k">1,000 - 5,000</option>
                    <option value="5k-10k">5,000 - 10,000</option>
                    <option value="10k-50k">10,000 - 50,000</option>
                    <option value="50k+">Más de 50,000</option>
                    <option value="no-tengo">No tengo Instagram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Seguidores TikTok
                  </label>
                  <select
                    name="seguidores_tiktok"
                    value={formData.seguidores_tiktok}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona cantidad</option>
                    <option value="0-1k">0 - 1,000</option>
                    <option value="1k-10k">1,000 - 10,000</option>
                    <option value="10k-50k">10,000 - 50,000</option>
                    <option value="50k-100k">50,000 - 100,000</option>
                    <option value="100k+">Más de 100,000</option>
                    <option value="no-tengo">No tengo TikTok</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  ¿Cuál es tu principal motivación? *
                </label>
                <select
                  name="motivacion"
                  value={formData.motivacion}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Selecciona tu motivación</option>
                  <option value="libertad-financiera">Libertad financiera</option>
                  <option value="independencia">Independencia económica</option>
                  <option value="ayudar-familia">Ayudar a mi familia</option>
                  <option value="cambiar-vida">Cambiar completamente mi vida</option>
                  <option value="emprendimiento">Crear mi propio negocio</option>
                  <option value="experiencia">Probar algo nuevo</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    ¿Cuánto tiempo puedes dedicar? *
                  </label>
                  <select
                    name="disponibilidad"
                    value={formData.disponibilidad}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona disponibilidad</option>
                    <option value="1-2-horas">1-2 horas al día</option>
                    <option value="3-4-horas">3-4 horas al día</option>
                    <option value="5-6-horas">5-6 horas al día</option>
                    <option value="tiempo-completo">Tiempo completo (8+ horas)</option>
                    <option value="flexible">Horario flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Ingresos actuales mensuales
                  </label>
                  <select
                    name="ingresos_actuales"
                    value={formData.ingresos_actuales}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona rango</option>
                    <option value="0-500">€0 - €500</option>
                    <option value="500-1000">€500 - €1,000</option>
                    <option value="1000-2000">€1,000 - €2,000</option>
                    <option value="2000+">Más de €2,000</option>
                    <option value="no-trabajo">No trabajo actualmente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  ¿Cuál es tu objetivo de ingresos mensuales? *
                </label>
                <select
                  name="objetivos_ingresos"
                  value={formData.objetivos_ingresos}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Selecciona tu objetivo</option>
                  <option value="1k-2k">€1,000 - €2,000</option>
                  <option value="2k-3k">€2,000 - €3,000</option>
                  <option value="3k-5k">€3,000 - €5,000</option>
                  <option value="5k-8k">€5,000 - €8,000</option>
                  <option value="8k+">Más de €8,000</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    ¿Ya tienes contenido creado? *
                  </label>
                  <select
                    name="tiene_contenido"
                    value={formData.tiene_contenido}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona opción</option>
                    <option value="si-mucho">Sí, tengo mucho contenido</option>
                    <option value="si-poco">Sí, pero poco</option>
                    <option value="no-pero-puedo">No, pero puedo crear</option>
                    <option value="necesito-ayuda">Necesito ayuda para crear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    ¿Dispuesta a promocionarte? *
                  </label>
                  <select
                    name="dispuesta_promocion"
                    value={formData.dispuesta_promocion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona opción</option>
                    <option value="si-totalmente">Sí, completamente</option>
                    <option value="si-con-limites">Sí, pero con límites</option>
                    <option value="no-segura">No estoy segura</option>
                    <option value="prefiero-anonimo">Prefiero mantenerme anónima</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  ¿Algo más que quieras contarnos?
                </label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Cuéntanos sobre tus metas, dudas o cualquier información adicional..."
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                {showPrivacyError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium">
                      ⚠️ Debes aceptar nuestra Política de Privacidad para continuar
                    </p>
                  </div>
                )}
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 text-sm leading-relaxed">
                    He leído y acepto la{' '}
                    <button
                      type="button"
                      onClick={() => setShowPolicies('privacy')}
                      className="text-blue-600 hover:text-blue-700 underline font-medium"
                    >
                      Política de Privacidad
                    </button>
                    {' '}y el{' '}
                    <button
                      type="button"
                      onClick={() => setShowPolicies('legal')}
                      className="text-blue-600 hover:text-blue-700 underline font-medium"
                    >
                      Aviso Legal
                    </button>
                    . Consiento el tratamiento de mis datos personales para los fines descritos. *
                  </span>
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !acceptedPrivacy}
                  className="bg-blue-600 text-white px-12 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <span>{isSubmitting ? 'ABRIENDO EMAIL...' : 'ENVIAR POR EMAIL'}</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </button>
                
                <p className="text-gray-600 mt-4">
                  Al enviar se abrirá tu cliente de email con la información prellenada
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Building className="h-10 w-10 text-white" />
              <div>
                <span className="text-3xl font-black text-white">
                  MYONLYFXNS
                </span>
                <div className="text-sm text-gray-400 font-bold">AGENCY</div>
              </div>
            </div>
            
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Más de 150 modelos generando €5K-€15K mensuales con nuestro apoyo
            </p>
            
            <div className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-bold inline-flex mb-8">
              <Mail className="h-5 w-5" />
              <span>agenciaonlyfxns@gmail.com</span>
            </div>
            
            <div className="flex justify-center space-x-8 mb-8">
              <button
                onClick={() => setShowPolicies('privacy')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Lock className="h-4 w-4" />
                <span>Política de Privacidad</span>
              </button>
              <button
                onClick={() => setShowPolicies('legal')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Aviso Legal</span>
              </button>
              <button
                onClick={() => setShowPolicies('cookies')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Política de Cookies</span>
              </button>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 font-medium">
                © 2025 MYONLYFXNS AGENCY. Transformando vidas desde 2020.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modals */}
      {showPolicies && (
        <PolicyModal 
          type={showPolicies} 
          onClose={() => setShowPolicies(null)} 
        />
      )}

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;