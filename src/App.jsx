import React, { useState, useEffect, useRef } from "react";
import { Camera, Sparkles, Check, Instagram, Send, Menu, X, ArrowRight, Star, Zap, Download, Copy, Gift, Crown, Lock } from "lucide-react";

// ===================================================================================
// TU BASE DE DATOS COMPLETA DE PROMPTS
// ===================================================================================
const ALL_PROMPTS = [
    { title: "Retrato de perfil B/N", src: "09ij0fdi32j9d8j32g34.jpg", prompt: `Ultra-realistic cinematic street fashion portrait on a rainy London-style sidewalk...`, category: "hombre" },
    { title: "Retrato de perfil B/N", src: "gewrgerg443g5g.jpg", prompt: `Cinematic urban portrait at dusk in front of a modern stone building entrance...`, category: "hombre" },
    { title: "Retrato de perfil B/N", src: "01338EE2-A333-4883-870E-96D3620A1BBA.jpg", prompt: `using the exact face from the provided selfie — no editing, no retouching...`, category: "hombre" },
    { title: "Foto en pareja 2", src: "t2gf3gvr87y7.jpg", prompt: `A stylish indoor editorial portrait of a couple...`, category: "pareja" },
    { title: "Retrato de perfil", src: "gfdh455634g43.jpg", prompt: `Ultra-realistic cinematic streetwear portrait in a cool-toned city street...`, category: "hombre" },
    { title: "Retrato de perfil", src: "k76kkj546j4h45.jpg", prompt: `Ultra-realistic cinematic street portrait taken in a bustling downtown avenue at sunset...`, category: "hombre" },
    { title: "Perro con dona", src: "t5y453eyjytj56j56.jpg", prompt: `Ultra-realistic comic studio portrait of a dog mid-action...`, category: "mascotas" },
    { title: "Retrato de perfil", src: "u656uhg4g4g4.jpg", prompt: `Ultra-realistic editorial street portrait in a modern urban plaza...`, category: "hombre" },
    { title: "Perro de cumpleaños", src: "y453ey54yh54h4h4354h.jpg", prompt: `Ultra-realistic playful outdoor dog birthday scene...`, category: "mascotas" },
    { title: "Perro con chaqueta de cuero", src: "t43g34g34g34yh534.jpg", prompt: `Ultra-realistic studio portrait with seamless dark background...`, category: "mascotas" },
    { title: "Perros a la moda", src: "gherh453h45.jpg", prompt: `Ultra-realistic studio fashion portrait of stylish animals...`, category: "mascotas" },
    { title: "Perro con sudadera amarilla", src: "43t43tg34g34h45h54.jpg", prompt: `Ultra-realistic studio portrait of a pet sitting on the floor...`, category: "mascotas" },
    { title: "Perra de princesa", src: "hfdgh54y54hbtrhrt.jpg", prompt: `Ultra-realistic luxury birthday portrait of a pet...`, category: "mascotas" },
    { title: "Perro con manta roja", src: "g43guky7kyukghfjd.jpg", prompt: `Ultra-realistic intimate portrait of a dog wrapped in a deep burgundy...`, category: "mascotas" },
    { title: "Perro en la oscuridad", src: "ghfrtth646545h4.jpg", prompt: `Ultra-realistic monochrome portrait of a dog partially hidden...`, category: "mascotas" },
    { title: "Freddy Krueger", src: "jknf2i3u9i892f38jff23.jpg", prompt: `Ultra-realistic cinematic horror portrait in a dark studio...`, category: "halloween" },
    { title: "El Sombrerero", src: "hr54e3h45h4h45555.jpg", prompt: `Ultra-realistic portrait of a whimsical tea-party character...`, category: "halloween" },
    { title: "Harley Quinn", src: "r3223ffdswfsdgfgge3.jpg", prompt: `Ultra-realistic cinematic portrait of a character inspired by a rebellious comic anti-hero...`, category: "halloween" },
    { title: "Catrina hombre", src: "ghgjuh65342r543.jpg", prompt: `Ultra-realistic portrait of a person in a dark, ornate suit...`, category: "halloween" },
    { title: "Familia Addams", src: "435t34gf4g34g43gg3.jpg", prompt: `Ultra-realistic cinematic portrait replicating the exact scene of a gothic couple...`, category: "pareja" },
    { title: "Retrato halloween 1", src: "89Y3742EHJFIOH322OIHF3E.jpg", prompt: `Ultra-realistic cinematic portrait of a distressed clown...`, category: "halloween" },
    { title: "Retrato de estudio profesional", src: "3C9358F7-D303-4F73-8072-072EB8338AA7.jpg", prompt: `Ultra-realistic professional studio portrait, using the exact face...`, category: "hombre" },
    { title: "Retrato en B/N con gafas de sol", src: "70637C95-07A5-4A5E-837A-B84612724715.jpg", prompt: `ultra-realistic portrait of a person, using the exact face from the provided selfie...`, category: "hombre" },
    { title: "Retrato en B/N", src: "19F959ED-077D-4C02-93D5-F00CC4187432.jpg", prompt: `ultra-realistic black and white portrait of a middle-aged subject...`, category: "hombre" },
    { title: "Retrato cinematografico en el mar", src: "775CF221-A62C-4619-B45F-B1B771D0CAFE.jpg", prompt: `A person standing waist-deep in turbulent sea water, wearing a wet, semi-transparent...`, category: "hombre" },
    { title: "Retrato B/N con sombras", src: "96A05973-F466-4CC6-8AF7-A5F0A0CEDB1B.jpg", prompt: `You are a professional photography studio assistant...`, category: "hombre" },
    { title: "Foto de perfil profesional", src: "C9322E23-3D12-40DF-82AE-3478DC157F99.jpg", prompt: `Portrait of a person in a clean editorial studio setup...`, category: "hombre" },
    { title: "Retrato perfil profesional", src: "C9697CBB-E76C-4424-94A2-F53893968DC4.jpg", prompt: `Ultra-realistic black-and-white portrait using the exact face...`, category: "hombre" },
    { title: "Retrato cinematografico B/N con gafas de sol", src: "ChatGPT-Image-30-jul-2025,-12_19_33.jpg", prompt: `Ultra-realistic portrait of a person, using the exact face...`, category: "hombre" },
    { title: "Retrato mujer blanco y negro", src: "3r2f2f232ffffasd.jpg", prompt: `Ultra-realistic black and white portrait set indoors...`, category: "mujer" },
    { title: "Retrato Mujer apoyada", src: "32r4u23h9f238yh23f.jpg", prompt: `Ultra-realistic editorial studio portrait of a person sitting...`, category: "mujer" },
    { title: "Fotografia mujer en playa", src: "43gdshdsfa3245.jpg", prompt: `Ultra-realistic cinematic portrait of a person standing at the seaside...`, category: "mujer" },
    { title: "Retrato mujer reflejo", src: "21421RF1FE2FF2F.jpg", prompt: `Ultra-realistic cinematic portrait in a minimal dark studio...`, category: "mujer" },
    { title: "Retrato mujer ciudad", src: "3r123err126u5657ui.jpg", prompt: `Ultra-realistic cinematic street portrait on an overcast day...`, category: "mujer" },
    { title: "Retrato con mascota", src: "74E5837C-B1AA-4C23-AE43-FC68FFBF3615.jpg", prompt: `A playful studio portrait of a person laughing openly...`, category: "mascotas" },
    { title: "Foto perro motero", src: "3r522tgyg2g34g43.jpg", prompt: `ultra-realist — A motorcyclist with a rugged presence...`, category: "mascotas" },
    { title: "Foto cinematica con mascota", src: "5312greg432g324.jpg", prompt: `Ultra-realistic vertical 9:16 night rooftop portrait...`, category: "mascotas" },
    { title: "Retrato con mascota", src: "f232f23f23f232rfh.jpg", prompt: `Ultra-realistic vertical 9:16 studio portrait on pure black...`, category: "mascotas" },
    { title: "Retrato con mascota", src: "42145gfedws32.jpg", prompt: `Ultra-realistic A cinematic low-key medium portrait...`, category: "mascotas" },
    { title: "Foto pefil fondo blanco PROMPT", src: "fsqa12fds21hbgfd.jpg", prompt: `Ultra-realistic black-and-white studio portrait of a person...`, category: "hombre" },
    { title: "Foto Piscina Esmoquin", src: "rg233rfvewfewwe.jpg", prompt: `Ultra-realistic luxury editorial portrait in a night-time swimming pool...`, category: "hombre" },
    { title: "Retrato neon rojo", src: "t345tg3g3g.jpg", prompt: `Ultra-realistic cinematic portrait of a person in an extreme close-up...`, category: "hombre" },
    { title: "Retrato calle London", src: "1231312dgd465ujh4.jpg", prompt: `Ultra-realistic cinematic street portrait in a narrow European city street...`, category: "hombre" },
    { title: "Retrato aro neon azul", src: "43tg3g3g3g3g.jpg", prompt: `Ultra-realistic studio portrait of a man in 3/4 profile view...`, category: "hombre" },
    { title: "Retrato luz cenital", src: "0E58B7C4-A726-4F48-AFF0-910A81BB21C9.jpg", prompt: `Ultra-realistic black-and-white portrait using the exact face...`, category: "hombre" },
    { title: "Foto de estudio", src: "6464533gtgfdsg.jpg", prompt: `A hyper-realistic vertical half-body portrait of a person...`, category: "hombre" },
    { title: "Foto de estudio tattoo", src: "y654364g5g3454u7.jpg", prompt: `Hyper-realistic editorial portrait with a nearly black background...`, category: "hombre" },
    { title: "Retrato cinematografico con vehículo", src: "BA06D8BF-A42C-44F7-8D45-4EE31841EA4D.jpg", prompt: `Ultra-cinematic long-exposure poster-style composition...`, category: "hombre" },
    { title: "hombre redes sociales", src: "982h31iiuhg128yhg2j1hf.jpg", prompt: `A realistic man with identical proportions...`, category: "hombre" },
    { title: "Retrato profesional lujoso", src: "EC06BC62-E654-4CBE-847B-2D9738859025.jpg", prompt: `Produce a luxurious rooftop portrait at golden hour...`, category: "hombre" },
    { title: "Retrato Blanco y negro", src: "22763199-D14F-4747-B7BE-38A23D38BA3C-2.jpg", prompt: `Black and white portrait of a person sitting on a chair...`, category: "hombre" },
    { title: "Retrato peaky blinders", src: "bfrr432532f23yhh3.jpg", prompt: `A cinematic noir-style waist-up portrait in black and white...`, category: "hombre" },
    { title: "Retrato Blanco y negro", src: "iuhjih21ibhnndb1ujujsa.jpg", prompt: `Hyperrealistic black and white portrait, subject wearing dark suit...`, category: "hombre" },
    { title: "Retrato Blanco y negro", src: "uh12iuh2ui1h21gg12hygb21.jpg", prompt: `Black-and-white portrait of a confident man wearing a mustard-yellow hoodie...`, category: "hombre" },
    { title: "Retrato estudio sudadera", src: "gfh4453gf34g34gg.jpg", prompt: `Ultra-realistic extreme close-up monochrome portrait photo...`, category: "hombre" },
    { title: "Retrato estudio sudadera", src: "F669182A-378D-481D-8705-EFF953EC505F.jpg", prompt: `Portrait of a confident man seated in a studio...`, category: "hombre" },
    { title: "Retrato estudio sudadera", src: "fh435g3h3g43g3g44.jpg", prompt: `Ultra-realistic editorial portrait of a person, using the exact face...`, category: "hombre" },
    { title: "Retrato cinematografico aparcamiento", src: "fwef232f3232f.jpg", prompt: `Ultra-realistic cinematic portrait photo of a person...`, category: "hombre" },
    { title: "Perfil redes sociales Mujer", src: "ui12hiuh29h12eh12fd12.jpg", prompt: `A confident woman leaning against the side of a giant vertical smartphone...`, category: "mujer" },
    { title: "Retrato elegante aeropuerto", src: "Hombre-elegante-al-atardecer-en-aeropuerto.jpg", prompt: `Walking confidently on a private airport runway at golden hour...`, category: "hombre" },
    { title: "Retrato fondo rojo", src: "IMG_6026.jpg", prompt: `Ultra-realistic studio portrait, using the exact face...`, category: "hombre" },
    { title: "Retrato cinematografico en poligono", src: "Imagen de WhatsApp 2025-07-04 a las 03.08.29_598dc3e3.jpg", prompt: `Create a hyper-realistic, high-resolution (8K) cinematic portrait of me...`, category: "hombre" },
    { title: "Retrato sillón Ozzy", src: "oikjnn213q9oiuerhj1239oiujni.jpg", prompt: `A gothic cinematic portrait: a person seated on a tall black leather throne...`, category: "hombre" },
    { title: "Retrato en pareja B/N", src: "Retrato-en-blanco-y-negro-de-pareja.jpg", prompt: `Couple posing in a photography studio with a dark plain backdrop...`, category: "pareja" },
    { title: "Retrato Gato", src: "7171nu187drf.jpg", prompt: `A studio portrait of a subject dressed as a medieval king...`, category: "mascotas" }
].map(p => ({ ...p, id: p.src, src: `/${p.src}`, prompt: (p.prompt || '').replace(/\s+/g, ' ').trim() }));


const CATEGORIES = [
    { id: 'todos', name: 'Todos' }, { id: 'hombre', name: 'Hombre' }, { id: 'mujer', name: 'Mujer' }, { id: 'mascotas', name: 'Mascotas' }, { id: 'halloween', name: 'Halloween' }, { id: 'pareja', name: 'Parejas' }
];

const CATEGORIES_FOR_HOME = ['hombre', 'mujer', 'mascotas', 'halloween'];
const PROMPTS_FOR_HOME = CATEGORIES_FOR_HOME.map(category => {
    return ALL_PROMPTS.find(p => p.category === category);
}).filter(Boolean);

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

const PRESETS = [
    { id: 1, name: "Cinematográfico Editorial", subtitle: "Low-Key Rembrandt", free: true, promptBlock: "Ultra-realistic editorial portrait, 85mm f/1.4, Rembrandt lighting with soft key at 45° left elevated, fill 1.5 stops lower, WB 5400K, 4:5 vertical, charcoal to black gradient backdrop, gentle S-curve, fine film grain, natural skin texture." },
    { id: 2, name: "Golden Hour Lifestyle", subtitle: "Cálido atardecer", free: true, promptBlock: "Warm golden hour portrait, 50mm f/1.8, backlight with golden reflector front fill, WB 6000-6500K, 3:2 or 4:5, warm bokeh background, split-toning warm highlights, natural glow." },
    { id: 3, name: "Corporate Clean", subtitle: "High-Key profesional", free: true, promptBlock: "High-key professional headshot, 85mm f/2.2, large frontal key with diffusers, white seamless background, WB 5200K, 1:1 or 4:5, low clarity, natural skin, no halos, LinkedIn quality." },
    { id: 4, name: "Environmental Portrait 35mm", subtitle: "Sujeto en su entorno", free: false, promptBlock: "Environmental portrait, 35mm f/2, subject in natural setting, side natural light with fill, WB 5200-5600K, 3:2 horizontal, soft curve, micro-contrast enhancement." },
    { id: 5, name: "Beauty Soft Front", subtitle: "Beauty homogéneo", free: false, promptBlock: "Beauty portrait, 100mm macro or 85mm f/2, centered beauty dish with subtle fill, WB 5000-5200K, 4:5 or 1:1, real skin texture, no plastic look, magazine beauty standard." },
    { id: 6, name: "B/N Clásico Film", subtitle: "Monocromo atemporal", free: false, promptBlock: "Classic black and white portrait, 85mm f/2, soft Loop or Rembrandt lighting, monochrome conversion, 4:5 vertical, S-curve contrast, 400 ISO film grain texture, timeless look." }
];

// --- Componentes de la UI ---

const AnimatedSection = ({ children, className }) => {
    // Para simplificar, quitamos la lógica de IntersectionObserver que puede dar problemas
    return <div className={className}>{children}</div>;
};

const PromptCard = ({ item }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transform hover:-translate-y-2 transition-transform duration-300">
        <img src={item.src} alt={item.title} className="w-full h-80 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x500.png?text=Imagen+no+encontrada"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
            <h3 className="font-bold text-lg p-6 w-full text-white">{item.title}</h3>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white font-bold text-lg">Ver Prompt</span>
        </div>
    </div>
);

const CategoryTabs = ({ selected, onSelect }) => (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => onSelect(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selected === cat.id ? 'bg-white/10 text-white ring-2 ring-cyan-400' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                {cat.name}
            </button>
        ))}
    </div>
);

const PromptModal = ({ item, onClose, onCopy }) => {
    if (!item) return null;
    const [copied, setCopied] = useState(false);

    const handleLocalCopy = () => {
        onCopy(item.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] grid md:grid-cols-2 gap-6 p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center bg-black rounded-lg overflow-hidden">
                    <img src={item.src} alt={item.title} className="w-full h-full object-contain max-h-[80vh]" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x1000.png?text=Imagen+no+encontrada"; }} />
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <textarea readOnly value={item.prompt} className="w-full flex-grow bg-black/50 border border-white/10 rounded-lg p-3 text-gray-300 text-sm resize-none focus:ring-2 focus:ring-cyan-500"></textarea>
                    <div className="flex gap-4">
                        <button onClick={onClose} className="w-full py-3 rounded-full font-bold bg-white/10 text-white hover:bg-white/20 transition-all duration-300">Cerrar</button>
                        <button onClick={handleLocalCopy} className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-green-400 to-cyan-500 text-black hover:shadow-lg hover:shadow-cyan-500/20'}`}>
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

    const navigateToHome = (hash) => {
        setView('home');
        setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const filteredGalleryPrompts = galleryFilter === 'todos'
        ? ALL_PROMPTS
        : ALL_PROMPTS.filter(p => p.category === galleryFilter);

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-gray-200 font-sans">
            <nav className="fixed top-0 w-full z-50 bg-[#0D0D0D]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <button onClick={() => setView('home')} className="flex items-center space-x-3">
                            <Camera className="w-8 h-8 text-cyan-400" />
                            <span className="text-xl font-bold tracking-wider">PROMPTRAITS</span>
                        </button>
                        <div className="hidden md:flex items-center space-x-8">
                            <button onClick={() => navigateToGallery()} className="text-gray-300 hover:text-white transition duration-300">Explora Prompts</button>
                            <button onClick={() => navigateToHome('#planes')} className="text-gray-300 hover:text-white transition duration-300">Planes</button>
                            <button onClick={() => navigateToHome('#packs')} className="text-gray-300 hover:text-white transition duration-300">Servicios</button>
                        </div>
                        <div className="hidden md:flex items-center">
                            <a href="#login" className="bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition duration-300">Login</a>
                        </div>
                        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#111111] border-t border-white/10">
                        <div className="px-4 py-4 space-y-4">
                            <button onClick={() => { navigateToGallery(); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Explora Prompts</button>
                            <button onClick={() => { navigateToHome('#planes'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Planes</button>
                            <button onClick={() => { navigateToHome('#packs'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Servicios</button>
                            <a href="#login" className="block text-gray-300 hover:text-white">Login</a>
                        </div>
                    </div>
                )}
            </nav>

            {view === 'home' && (
                <main>
                    <section className="relative pt-40 pb-24 px-4 overflow-hidden text-center">
                        <AnimatedSection className="max-w-5xl mx-auto relative z-10">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter">
                                Convierte tus Selfies en
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
                                    Retratos Profesionales
                                </span>
                            </h1>
                            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
                                Accede a nuestra biblioteca de presets profesionales, solicita retratos personalizados y eleva tu marca personal al siguiente nivel.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a href="/Promptraits_Guia_Completa_Prompts_y_Fotografia_v2.pdf" download className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                    <Download className="w-5 h-5" />
                                    <span>Descargar Guía Completa PDF</span>
                                </a>
                                <button onClick={() => navigateToGallery()} className="inline-flex items-center justify-center space-x-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                    <span>Explorar Prompts</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </AnimatedSection>
                    </section>

                    <section id="prompts-sample" className="py-24 px-4">
                        <div className="max-w-7xl mx-auto">
                            <AnimatedSection className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Una Muestra de la Galería</h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Una selección por categoría. Haz clic en un filtro para explorar la galería completa.</p>
                            </AnimatedSection>
                            <CategoryTabs selected={'todos'} onSelect={navigateToGallery} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {PROMPTS_FOR_HOME.map(item => (
                                    <div key={item.id} onClick={() => setSelectedPrompt(item)} className="cursor-pointer">
                                        <PromptCard item={item} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-16">
                                <button onClick={() => navigateToGallery()} className="inline-flex items-center justify-center space-x-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                                    <span>Ver Galería Completa</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </section>

                    <section id="planes" className="py-24 px-4">
                        <div className="max-w-7xl mx-auto">
                            <AnimatedSection className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                                Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Suscripción</span>
                                </h2>
                                <p className="text-gray-400 text-lg">Accede a prompts exclusivos y crea sin límites.</p>
                            </AnimatedSection>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {SUBSCRIPTION_PLANS.map((plan, idx) => (
                                    <AnimatedSection key={idx} className={`relative rounded-2xl p-8 border transition-all duration-300 ${plan.popular ? 'bg-white/5 border-purple-500 shadow-2xl shadow-purple-500/20' : 'bg-white/5 border-white/10'}`}>
                                        {plan.popular && ( <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1"><Star className="w-4 h-4" /><span>Más Popular</span></div> )}
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${plan.gradient}`}>{plan.icon}</div>
                                            <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                                        </div>
                                        <div className="mb-6">
                                            <span className="text-5xl font-bold tracking-tighter">{plan.price}€</span>
                                            <span className="text-gray-400 ml-1">{plan.period}</span>
                                        </div>
                                        <ul className="space-y-3 mb-8 text-gray-300">
                                            {plan.features.map((feature, i) => ( <li key={i} className="flex items-start space-x-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" /><span>{feature}</span></li> ))}
                                        </ul>
                                        <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                            {plan.name === 'FREE' ? 'Comenzar Gratis' : 'Suscribirme Ahora'}
                                        </button>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </section>

                     <section id="packs" className="py-24 px-4 bg-black/20">
                        <div className="max-w-7xl mx-auto">
                          <AnimatedSection className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                              ¿Prefieres que lo hagamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">por ti?</span>
                            </h2>
                            <p className="text-gray-400 text-lg">Packs de retratos personalizados - Pago único.</p>
                          </AnimatedSection>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {PORTRAIT_PACKS.map((pack, idx) => (
                              <AnimatedSection key={idx} className={`relative rounded-2xl p-8 border transition-all duration-300 ${pack.popular ? 'bg-white/5 border-green-500 shadow-2xl shadow-green-500/20' : 'bg-white/5 border-white/10'}`}>
                                 {pack.popular && ( <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold">Recomendado</div> )}
                                <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                                <div className="mb-6">
                                  <span className="text-5xl font-bold tracking-tighter">{pack.price}€</span>
                                  <span className="text-gray-400 text-sm ml-2">pago único</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                  {pack.features.map((feature, i) => ( <li key={i} className="flex items-start space-x-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">{feature}</span></li> ))}
                                </ul>
                                <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${pack.popular ? 'bg-gradient-to-r from-green-400 to-cyan-500 text-black hover:shadow-lg hover:shadow-cyan-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                  Contratar Ahora
                                </button>
                              </AnimatedSection>
                            ))}
                          </div>
                        </div>
                    </section>
                    
                     <section id="presets" className="py-24 px-4">
                        <div className="max-w-7xl mx-auto">
                            <AnimatedSection className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                                    Presets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Profesionales</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Bloques de código listos para copiar y pegar en tus prompts. Resultados garantizados.</p>
                            </AnimatedSection>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {PRESETS.map((preset) => (
                                    <AnimatedSection key={preset.id} className="relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50">
                                        {!preset.free && (
                                            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10 p-4 text-center">
                                                <Lock className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                                                <p className="text-white font-bold text-lg mb-2">Plan PRO Requerido</p>
                                                <button onClick={() => navigateToHome('#planes')} className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                                                    Ver planes →
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{preset.name}</h3>
                                                <p className="text-sm text-gray-400">{preset.subtitle}</p>
                                            </div>
                                            {preset.free && ( <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">GRATIS</div> )}
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4 h-12">
                                            {preset.promptBlock.substring(0, 80)}...
                                        </p>
                                        <button onClick={() => handleCopy(preset.promptBlock)} className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white px-4 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors duration-300">
                                           <Copy size={18} />
                                           <span>Copiar Preset</span>
                                        </button>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            )}

            {view === 'gallery' && (
                <main className="pt-32 px-4">
                     <section id="full-gallery" className="py-12">
                        <div className="max-w-7xl mx-auto">
                            <AnimatedSection className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Galería de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Prompts</span></h2>
                                <p className="text-gray-400 text-lg">Navega, copia y aprende de nuestra colección completa.</p>
                            </AnimatedSection>
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
                 <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <Camera className="w-7 h-7 text-cyan-400" />
                        <span className="text-lg font-bold tracking-wider">PROMPTRAITS</span>
                    </div>
                    <p className="text-gray-500 max-w-lg mx-auto mb-6">
                        Plataforma profesional de prompts y retratos IA. Transforma tu presencia digital y eleva tu marca personal.
                    </p>
                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="https://www.instagram.com/sr_waly/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><Instagram /></a>
                        <a href="https://t.me/+nyMJxze9il4wZGJk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><Send /></a>
                    </div>
                     <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Promptraits by Sr. Waly. Todos los derechos reservados.</p>
                 </div>
            </footer>
        </div>
    );
}
