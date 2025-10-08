import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Sparkles,
  Check,
  Instagram,
  Send,
  Menu,
  X,
  ArrowRight,
  Star,
  Zap,
  Download,
  Copy,
  Gift,
  Crown,
  Lock,
} from "lucide-react";

// Hook para animaciones en scroll
const useIntersectionObserver = (options) => {
  const [entry, setEntry] = useState(null);
  const [node, setNode] = useState(null);

  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntry(entry);
      }
    }, options)
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();
    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};

const AnimatedSection = ({ children, className }) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = !!entry;

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [copiedId, setCopiedId] = useState(null);

  const latestPrompts = [
    {
      id: 1,
      src: "/3C9358F7-D303-4F73-8072-072EB8338AA7-1221f8eb.jpg",
      category: "hombre",
      title: "Retrato Profesional Estudio",
      prompt: "Ultra-realistic professional studio portrait...",
    },
    {
      id: 2,
      src: "/70637C95-07A5-4A5E-837A-B84612724715.jpg",
      category: "hombre",
      title: "Editorial B/N con Gafas",
      prompt: "Ultra-realistic portrait...",
    },
    {
      id: 3,
      src: "/ghgjuh65342r543.jpg",
      category: "halloween",
      title: "Catrina Hombre",
      prompt: "Ultra-realistic portrait...",
    },
    {
      id: 4,
      src: "/t43g34g34g34yh534.jpg",
      category: "mascotas",
      title: "Perro con Chaqueta",
      prompt: "Ultra-realistic studio portrait...",
    },
  ];

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "hombre", name: "Hombre" },
    { id: "mujer", name: "Mujer" },
    { id: "mascotas", name: "Mascotas" },
    { id: "halloween", name: "Halloween" },
    { id: "pareja", name: "Parejas" },
  ];

  const subscriptionPlans = [
    {
      name: "FREE",
      price: "0",
      period: "Gratis siempre",
      popular: false,
      icon: <Gift className="w-6 h-6" />,
      features: [
        "Acceso a prompts públicos",
        "3 prompts exclusivos al mes",
        "Newsletter semanal",
        "Consejos y trucos IA",
      ],
      gradient: "from-gray-700 to-gray-600",
    },
    {
      name: "PRO",
      price: "9.99",
      period: "/mes",
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Todo de FREE +",
        "5 prompts exclusivos al mes",
        "3 prompts personalizados",
        "Revisiones incluidas",
        "Entrega en 24h",
        "Soporte prioritario",
      ],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      name: "PREMIUM",
      price: "29.99",
      period: "/mes",
      popular: false,
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Todo de PRO +",
        "10 prompts exclusivos al mes",
        "Acceso al GPT personalizado",
        "Generación ilimitada de retratos",
        "Asesoría personalizada 1:1",
        "Soporte VIP 24/7",
      ],
      gradient: "from-green-400 to-cyan-500",
    },
  ];

  const portraitPacks = [
    {
      name: "Básico",
      price: "29",
      features: [
        "5 retratos profesionales",
        "1 estilo a elegir",
        "Entrega en 48h",
        "Formato digital HD",
      ],
    },
    {
      name: "Pro",
      price: "59",
      popular: true,
      features: [
        "15 retratos profesionales",
        "3 estilos diferentes",
        "Entrega en 24h",
        "Revisiones incluidas",
      ],
    },
    {
      name: "Premium",
      price: "99",
      features: [
        "30 retratos profesionales",
        "Todos los estilos",
        "Video animado incluido",
        "Entrega inmediata",
      ],
    },
  ];

  const presets = [
    {
      id: 1,
      name: "Cinematográfico Editorial",
      subtitle: "Low-Key Rembrandt",
      free: true,
      promptBlock:
        "Ultra-realistic editorial portrait, 85mm f/1.4, Rembrandt lighting...",
    },
    {
      id: 2,
      name: "Golden Hour Lifestyle",
      subtitle: "Cálido atardecer",
      free: true,
      promptBlock:
        "Warm golden hour portrait, 50mm f/1.8, backlight with golden reflector...",
    },
    {
      id: 3,
      name: "Corporate Clean",
      subtitle: "High-Key profesional",
      free: true,
      promptBlock:
        "High-key professional headshot, 85mm f/2.2, large frontal key with diffusers...",
    },
    {
      id: 4,
      name: "Environmental Portrait",
      subtitle: "Sujeto en su entorno",
      free: false,
      promptBlock:
        "Environmental portrait, 35mm f/2, subject in natural setting...",
    },
    {
      id: 5,
      name: "Beauty Soft Front",
      subtitle: "Beauty homogéneo",
      free: false,
      promptBlock:
        "Beauty portrait, 100mm macro or 85mm f/2, centered beauty dish...",
    },
    {
      id: 6,
      name: "B/N Clásico Film",
      subtitle: "Monocromo atemporal",
      free: false,
      promptBlock:
        "Classic black and white portrait, 85mm f/2, soft Loop or Rembrandt lighting...",
    },
  ];

  const copyPrompt = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts =
    selectedCategory === "todos"
      ? latestPrompts
      : latestPrompts.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-200 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0D0D0D]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Camera className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold tracking-wider">
                PROMPTRAITS
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#prompts"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Explora
              </a>
              <a
                href="#planes"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Planes
              </a>
              <a
                href="#packs"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Servicios
              </a>
            </div>

            <div className="hidden md:flex items-center">
              <a
                href="#login"
                className="bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition duration-300"
              >
                Login
              </a>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#prompts"
                className="block text-gray-300 hover:text-white"
              >
                Explora
              </a>
              <a
                href="#planes"
                className="block text-gray-300 hover:text-white"
              >
                Planes
              </a>
              <a href="#packs" className="block text-gray-300 hover:text-white">
                Servicios
              </a>
              <a href="#login" className="block text-gray-300 hover:text-white">
                Login
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        <AnimatedSection className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium tracking-wide">
              Plataforma Profesional de Prompts con IA
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter">
            Convierte tus Selfies en
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
              Retratos Profesionales
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
            Accede a nuestra biblioteca de presets profesionales, solicita
            retratos personalizados y eleva tu marca personal al siguiente
            nivel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/Promptraits_Guia_Completa_Prompts_y_Fotografia_v2.pdf"
              download
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Download className="w-5 h-5" />
              <span>Descargar Guía Completa PDF</span>
            </a>
            <a
              href="#prompts"
              className="inline-flex items-center justify-center space-x-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Explorar Prompts</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Latest Prompts Section */}
      <section id="prompts" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              Últimos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Prompts Compartidos
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Navega, copia y aprende de nuestra colección de prompts para crear
              imágenes increíbles.
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-white/10 text-white ring-2 ring-cyan-400"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPrompts.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="font-bold text-lg mb-4">{item.title}</h3>
                  <button
                    onClick={() => copyPrompt(item.id, "Prompt de ejemplo...")}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-400 to-cyan-500 text-black px-4 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                  >
                    {copiedId === item.id ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                    <span>
                      {copiedId === item.id ? "¡Copiado!" : "Copiar Prompt"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Presets Section */}
      <section id="presets" className="py-24 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              Presets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Profesionales
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Bloques de código listos para copiar y pegar en tus prompts.
              Resultados garantizados.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {presets.map((preset) => (
              <AnimatedSection
                key={preset.id}
                className="relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50"
              >
                {!preset.free && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10 p-4 text-center">
                    <Lock className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                    <p className="text-white font-bold text-lg mb-2">
                      Plan PRO Requerido
                    </p>
                    <a
                      href="#planes"
                      className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
                    >
                      Ver planes →
                    </a>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{preset.name}</h3>
                    <p className="text-sm text-gray-400">{preset.subtitle}</p>
                  </div>
                  {preset.free && (
                    <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                      GRATIS
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-4 h-12">
                  {preset.promptBlock.substring(0, 80)}...
                </p>

                <button
                  onClick={() => copyPrompt(preset.id, preset.promptBlock)}
                  className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white px-4 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors duration-300"
                >
                  {copiedId === preset.id ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                  <span>
                    {copiedId === preset.id ? "¡Copiado!" : "Copiar Preset"}
                  </span>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="planes" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              Planes de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Suscripción
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Accede a prompts exclusivos y crea sin límites.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, idx) => (
              <AnimatedSection
                key={idx}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  plan.popular
                    ? "bg-white/5 border-purple-500 shadow-2xl shadow-purple-500/20"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Más Popular</span>
                  </div>
                )}

                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${plan.gradient}`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-bold tracking-tighter">
                    {plan.price}€
                  </span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 text-gray-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {plan.name === "FREE"
                    ? "Comenzar Gratis"
                    : "Suscribirme Ahora"}
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portrait Packs */}
      <section id="packs" className="py-24 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              ¿Prefieres que lo hagamos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                por ti?
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Packs de retratos personalizados - Pago único.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portraitPacks.map((pack, idx) => (
              <AnimatedSection
                key={idx}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  pack.popular
                    ? "bg-white/5 border-green-500 shadow-2xl shadow-green-500/20"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    Recomendado
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold tracking-tighter">
                    {pack.price}€
                  </span>
                  <span className="text-gray-400 text-sm ml-2">pago único</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
                    pack.popular
                      ? "bg-gradient-to-r from-green-400 to-cyan-500 text-black hover:shadow-lg hover:shadow-cyan-500/20"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Contratar Ahora
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Camera className="w-7 h-7 text-cyan-400" />
            <span className="text-lg font-bold tracking-wider">
              PROMPTRAITS
            </span>
          </div>
          <p className="text-gray-500 max-w-lg mx-auto mb-6">
            Plataforma profesional de prompts y retratos IA. Transforma tu
            presencia digital y eleva tu marca personal.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://www.instagram.com/sr_waly/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Instagram />
            </a>
            <a
              href="https://t.me/+nyMJxze9il4wZGJk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Send />
            </a>
          </div>
          <div className="border-t border-white/10 pt-8 text-gray-600 text-sm">
            <p>
              © {new Date().getFullYear()} Promptraits by Sr. Waly. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
