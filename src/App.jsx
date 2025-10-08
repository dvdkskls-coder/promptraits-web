import React, a useState, useEffect, useRef } from "react";
import { Camera, Sparkles, Check, Instagram, Send, Menu, X, ArrowRight, Star, Zap, Download, Copy, Users, Gift, Crown, Lock } from "lucide-react";

// ===================================================================================
// TU BASE DE DATOS COMPLETA DE PROMPTS
// ===================================================================================
const ALL_PROMPTS = [
    // ... (Aquí está la lista completa de tus 60+ prompts)
    // (Por brevedad no la muestro aquí, pero está en el código final)
    { title: "Retrato de perfil B/N", src: "09ij0fdi32j9d8j32g34.jpg", prompt: `...`, category: "hombre" },
    { title: "Foto en pareja 2", src: "t2gf3gvr87y7.jpg", prompt: `...`, category: "pareja" },
    { title: "Perro con dona", src: "t5y453eyjytj56j56.jpg", prompt: `...`, category: "mascotas" },
    { title: "Harley Quinn", src: "r3223ffdswfsdgfgge3.jpg", prompt: `...`, category: "halloween" },
    { title: "Retrato mujer blanco y negro", src: "3r2f2f232ffffasd.jpg", prompt: `...`, category: "mujer" }
    // ... y el resto de la lista
].map(p => ({ ...p, id: p.src, src: `/${p.src}`, prompt: (p.prompt || '').replace(/\s+/g, ' ').trim() }));

const CATEGORIES = [
    { id: 'todos', name: 'Todos' },
    { id: 'hombre', name: 'Hombre' },
    { id: 'mujer', name: 'Mujer' },
    { id: 'mascotas', name: 'Mascotas' },
    { id: 'halloween', name: 'Halloween' },
    { id: 'pareja', name: 'Parejas' }
];

// NUEVA LÓGICA: Seleccionamos un prompt de cada categoría para la portada
const CATEGORIES_FOR_HOME = ['hombre', 'mujer', 'mascotas', 'halloween'];
const PROMPTS_FOR_HOME = CATEGORIES_FOR_HOME.map(category => {
    return ALL_PROMPTS.find(p => p.category === category);
}).filter(Boolean); // .filter(Boolean) elimina resultados nulos si una categoría no tiene prompts


// --- El resto de tus datos (Planes, Packs, etc.) ---
const SUBSCRIPTION_PLANS = [
    { name: "FREE", price: "0", period: "Gratis siempre", popular: false, icon: <Gift className="w-6 h-6" />, features: ["Acceso a prompts públicos", "3 prompts exclusivos al mes", "Newsletter semanal", "Consejos y trucos IA"], gradient: "from-gray-700 to-gray-600" },
    { name: "PRO", price: "9.99", period: "/mes", popular: true, icon: <Zap className="w-6 h-6" />, features: ["Todo de FREE +", "5 prompts exclusivos al mes", "3 prompts personalizados", "Revisiones incluidas", "Entrega en 24h", "Soporte prioritario"], gradient: "from-blue-500 to-purple-600" },
    { name: "PREMIUM", price: "29.99", period: "/mes", popular: false, icon: <Crown className="w-6 h-6" />, features: ["Todo de PRO +", "10 prompts exclusivos al mes", "Acceso al GPT personalizado", "Generación ilimitada de retratos", "Asesoría personalizada 1:1", "Soporte VIP 24/7"], gradient: "from-green-400 to-cyan-500" }
];

const PORTRAIT_PACKS = [
    { name: "Básico", price: "29", features: ["5 retratos profesionales", "1 estilo a elegir", "Entrega en 48h", "Formato digital HD"] },
    { name: "Pro", price: "59", popular: true, features: ["15 retratos profesionales", "3 estilos diferentes", "Entrega en 24h", "Revisiones incluidas"] },
    { name: "Premium", price: "99", features: ["30 retratos profesionales", "Todos los estilos", "Video animado incluido", "Entrega inmediata"] }
];
// ... (Aquí iría la lista de PRESETS que ya teníamos)

// --- Componentes de la UI ---

const AnimatedSection = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

const PromptCard = ({ item }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transform hover:-translate-y-2 transition-transform duration-300">
        <img src={item.src} alt={item.title} className="w-full h-80 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x500.png?text=Imagen+no+encontrada"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
            <h3 className="font-bold text-lg p-6 w-full">{item.title}</h3>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white font-bold text-lg">Ver Prompt</span>
        </div>
    </div>
);

const CategoryTabs = ({ selected, onSelect }) => (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map(cat => (
            <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${ selected === cat.id ? 'bg-white/10 text-white ring-2 ring-cyan-400' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white' }`}
            >
                {cat.name}
            </button>
        ))}
    </div>
);

const PromptModal = ({ item, onClose, onCopy }) => {
    if (!item) return null;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        onCopy(item.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] grid md:grid-cols-2 gap-6 p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center bg-black rounded-lg overflow-hidden">
                    <img src={item.src} alt={item.title} className="w-full h-full object-contain max-h-[80vh]" />
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <textarea readOnly value={item.prompt} className="w-full flex-grow bg-black/50 border border-white/10 rounded-lg p-3 text-gray-300 text-sm resize-none focus:ring-2 focus:ring-cyan-500"></textarea>
                    <div className="flex gap-4">
                        <button onClick={onClose} className="w-full py-3 rounded-full font-bold bg-white/10 text-white hover:bg-white/20 transition-all duration-300">Cerrar</button>
                        <button onClick={handleCopy} className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-green-400 to-cyan-500 text-black hover:shadow-lg hover:shadow-cyan-500/20'}`}>
                            {copied ? '¡Copiado!' : 'Copiar Prompt'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ===================================================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ===================================================================================
export default function App() {
    const [view, setView] = useState('home');
    const [galleryFilter, setGalleryFilter] = useState('todos');
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };
    
    const navigateToGallery = (filter = 'todos') => {
        setGalleryFilter(filter);
        setView('gallery');
        window.scrollTo(0, 0);
    };

    const filteredGalleryPrompts = galleryFilter === 'todos'
        ? ALL_PROMPTS
        : ALL_PROMPTS.filter(p => p.category === galleryFilter);
    
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-gray-200 font-sans">
            <nav className="fixed top-0 w-full z-50 bg-[#0D0D0D]/80 backdrop-blur-lg border-b border-white/10">
                 {/* ... (código del Nav, sin cambios significativos) ... */}
            </nav>

            {/* VISTA DE LA PORTADA */}
            {view === 'home' && (
                <main>
                    <section className="relative pt-40 pb-24 px-4 overflow-hidden text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Convierte tus Selfies en <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-2">Retratos Profesionales</span>
                        </h1>
                        <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">Accede a nuestra biblioteca de presets y solicita retratos personalizados.</p>
                        {/* ... (Botones de acción del Hero) ... */}
                    </section>

                    <section id="prompts-sample" className="py-24 px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Últimos <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Prompts Compartidos</span></h2>
                                <p className="text-gray-400 text-lg">Una muestra de nuestro catálogo. Haz clic en una categoría para explorar la galería completa.</p>
                            </div>

                            <CategoryTabs selected={galleryFilter} onSelect={navigateToGallery} />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {PROMPTS_FOR_HOME.map(item => (
                                    <div key={item.id} onClick={() => setSelectedPrompt(item)} className="cursor-pointer">
                                        <PromptCard item={item} />
                                    </div>
                                ))}
                            </div>
                            
                            <div className="text-center mt-16">
                                <button onClick={() => navigateToGallery()} className="inline-flex items-center space-x-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold">
                                    <span>Ver todos los prompts</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </section>
                    
                    {/* AQUÍ VAN TUS OTRAS SECCIONES: PLANES, PACKS, PRESETS, ETC. */}
                    {/* Las he omitido aquí para no hacer el código gigante, pero en tu App.jsx deben estar */}
                    <section id="planes" className="py-24 px-4">
                         {/* ... Tu sección de planes ... */}
                    </section>
                     <section id="packs" className="py-24 px-4 bg-black/20">
                         {/* ... Tu sección de packs ... */}
                    </section>
                </main>
            )}

            {/* VISTA DE LA GALERÍA COMPLETA */}
            {view === 'gallery' && (
                <main className="pt-32 px-4">
                     <section id="full-gallery" className="py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Galería de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Prompts</span></h2>
                                <p className="text-gray-400 text-lg">Navega, copia y aprende de nuestra colección completa.</p>
                            </div>
                            <CategoryTabs selected={galleryFilter} onSelect={setGalleryFilter} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {filteredGalleryPrompts.map(item => (
                                    <div key={item.id} onClick={() => setSelectedPrompt(item)} className="cursor-pointer">
                                        <PromptCard item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            )}

            <PromptModal item={selectedPrompt} onClose={() => setSelectedPrompt(null)} onCopy={handleCopy} />
            
            <footer className="bg-black/20 border-t border-white/10 py-12 px-4 mt-20">
                <p className="text-center text-gray-600">© {new Date().getFullYear()} Promptraits by Sr. Waly. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
