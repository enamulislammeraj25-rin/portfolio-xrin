import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, CloudLightning, Leaf, Gem, Flower2,
  User, Briefcase, GraduationCap, 
  Award, Mail, Download, Search, 
  Menu, X, ChevronRight, Globe, Users, FileText,
  MapPin, Anchor, ArrowDown, ArrowUp,
  Facebook, Instagram, Twitter, Send, MessageCircle,
  FileImage, FileCode, FolderOpen,
  CheckCircle2, Linkedin, ExternalLink,
  Camera, Video, Settings, Eye, EyeOff,
  BookOpen, Fingerprint
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

import { PORTFOLIO_DATA } from './data/portfolioData';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Section } from './components/Section';
import { ResearchNetwork } from './components/ResearchNetwork';

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [theme, setTheme] = useState('dark');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState('down');
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
  
  // --- NEW: HOBBIES VISIBILITY STATE ---
  const [showHobbies, setShowHobbies] = useState(true);
  const [hobbiesModalOpen, setHobbiesModalOpen] = useState(false);

  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // --- PROJECT MODAL STATE ---
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedCiteId, setCopiedCiteId] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [activeSection, setActiveSection] = useState('about');

  // Cycle through 8 themes
  const cycleTheme = () => {
    const themes = ['dark', 'light', 'midnight', 'spring', 'nature', 'musgravite', 'ruby', 'emerald'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 30);
        if (window.scrollY > 300) {
            setScrollDir('up');
        } else {
            setScrollDir('down');
        }
        // Auto-close menu on scroll
        if (menuOpen) setMenuOpen(false);

        const ids = ['about','education','research','publications','projects','certifications','skills','career','hobbies','contact'];
        const y = window.scrollY + 96;
        let current = ids[0];
        for (const id of ids) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= y) current = id;
        }
        setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
          setSearchOpen(false);
          setSelectedProject(null);
          setHobbiesModalOpen(false); // Close hobbies modal on ESC
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  // --- LIVE SEARCH LOGIC ---
  useEffect(() => {
    if (!searchQuery.trim()) {
        setSearchResults(null);
        return;
    }
    const q = searchQuery.toLowerCase();
    const results = [];

    const add = (section, title, id) => results.push({ section, title, id });

    if (PORTFOLIO_DATA.profile.bio.toLowerCase().includes(q) || 
        PORTFOLIO_DATA.profile.tagline.toLowerCase().includes(q)) {
        add('Profile', 'Bio & Tagline', 'about');
    }
    // ... (Search logic remains the same)

    setSearchResults(results);
  }, [searchQuery]);

  const allNavLinks = [
    { name: "About", id: "about" },
    { name: "Education", id: "education" },
    { name: "Research", id: "research" },
    { name: "Publications", id: "publications" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Skills", id: "skills" },
    { name: "Career", id: "career" },
    { name: "Hobbies", id: "hobbies" }, // Hobbies ID for link logic
    { name: "Contact", id: "contact" }
  ];

  // MODIFIED SCROLL/NAVIGATE LOGIC
  const scrollToSection = (id) => {
    if (id === 'hobbies') {
      // If hobbies is hidden, open modal instead of scrolling
      if (!showHobbies) {
        setHobbiesModalOpen(true);
        setMenuOpen(false);
        return;
      }
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
      setSearchOpen(false);
    }
  };

  const handleFloatingButtonClick = () => {
    if (scrollDir === 'down') {
        scrollToSection('contact');
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCite = async (pub) => {
    const text = pub.citation || `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCiteId(pub.id);
      setTimeout(() => setCopiedCiteId(null), 2000);
    } catch (err) {
      window.prompt('Copy citation:', text);
    }
  };

  // --- SEND MESSAGE LOGIC ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  // --- THEME STYLE HELPERS ---
  const getAppBg = () => {
      switch (theme) {
          case 'dark': return 'bg-neutral-950 text-white';
          case 'light': return 'bg-stone-100 text-stone-900'; 
          case 'midnight': return 'bg-slate-950 text-slate-100'; 
          case 'spring': return 'bg-gradient-to-br from-rose-100 via-pink-100 to-teal-50 text-stone-900';
          case 'nature': return 'bg-gradient-to-br from-green-950 via-stone-900 to-emerald-950 text-stone-100';
          case 'musgravite': return 'bg-gradient-to-br from-stone-800 via-slate-700 to-purple-900 text-stone-100';
          case 'ruby': return 'bg-gradient-to-br from-red-950 via-rose-950 to-stone-950 text-rose-50';
          case 'emerald': return 'bg-gradient-to-br from-emerald-950 via-teal-950 to-green-900 text-emerald-50';
          default: return 'bg-neutral-950 text-white';
      }
  };

  const getAccentColor = () => {
      switch (theme) {
          case 'dark': return 'text-teal-600';
          case 'light': return 'text-stone-700';
          case 'midnight': return 'text-indigo-400';
          case 'spring': return 'text-stone-700';
          case 'nature': return 'text-lime-400';
          case 'musgravite': return 'text-purple-300';
          case 'ruby': return 'text-rose-400';
          case 'emerald': return 'text-emerald-400';
          default: return 'text-teal-600';
      }
  };
  
  // Updated to be transparent by default, only border on hover
  const getCardStyle = () => {
      switch (theme) {
          case 'dark': return 'bg-transparent border border-transparent hover:bg-white/5 hover:border-neutral-700';
          case 'light': return 'bg-transparent border border-transparent text-stone-900 hover:bg-white hover:border-stone-400 hover:shadow-md';
          case 'midnight': return 'bg-transparent border border-transparent text-slate-200 hover:bg-white/5 hover:border-indigo-500/50';
          case 'spring': return 'bg-transparent border border-transparent text-stone-900 hover:bg-white/60 hover:border-stone-400 hover:shadow-md';
          case 'nature': return 'bg-transparent border border-transparent text-stone-200 hover:bg-stone-800/60 hover:border-lime-800';
          case 'musgravite': return 'bg-transparent border border-transparent text-purple-50 hover:bg-purple-900/30 hover:border-purple-500/30';
          case 'ruby': return 'bg-transparent border border-transparent text-rose-50 hover:bg-rose-950/40 hover:border-rose-500/30';
          case 'emerald': return 'bg-transparent border border-transparent text-emerald-50 hover:bg-emerald-950/40 hover:border-emerald-500/30';
          default: return '';
      }
  };

  const getHoverTextColor = () => {
      switch (theme) {
          case 'dark': return 'group-hover:text-teal-400 transition-colors duration-300';
          case 'light': return 'group-hover:text-stone-600 transition-colors duration-300';
          case 'midnight': return 'group-hover:text-indigo-300 transition-colors duration-300';
          case 'spring': return 'group-hover:text-stone-600 transition-colors duration-300';
          case 'nature': return 'group-hover:text-lime-300 transition-colors duration-300';
          case 'musgravite': return 'group-hover:text-purple-200 transition-colors duration-300';
          case 'ruby': return 'group-hover:text-rose-300 transition-colors duration-300';
          case 'emerald': return 'group-hover:text-emerald-300 transition-colors duration-300';
          default: return 'group-hover:text-teal-600 transition-colors duration-300';
      }
  }

  const getHoverBgColor = () => {
      switch (theme) {
          case 'dark': return 'group-hover:bg-teal-500 transition-colors duration-300';
          case 'light': return 'group-hover:bg-stone-500 transition-colors duration-300';
          case 'midnight': return 'group-hover:bg-indigo-500 transition-colors duration-300';
          case 'spring': return 'group-hover:bg-stone-500 transition-colors duration-300';
          case 'nature': return 'group-hover:bg-lime-500 transition-colors duration-300';
          case 'musgravite': return 'group-hover:bg-purple-400 transition-colors duration-300';
          case 'ruby': return 'group-hover:bg-rose-500 transition-colors duration-300';
          case 'emerald': return 'group-hover:bg-emerald-500 transition-colors duration-300';
          default: return 'group-hover:bg-teal-500 transition-colors duration-300';
      }
  }

  // Progress Bar Color Logic
  const getProgressBarColor = () => {
      switch (theme) {
          case 'dark': return 'bg-teal-500';
          case 'light': return 'bg-stone-500';
          case 'midnight': return 'bg-indigo-500';
          case 'spring': return 'bg-pink-400';
          case 'nature': return 'bg-lime-500';
          case 'musgravite': return 'bg-purple-400';
          case 'ruby': return 'bg-rose-500';
          case 'emerald': return 'bg-emerald-500';
          default: return 'bg-teal-500';
      }
  }

  const getNavStyle = () => {
      // Reduced blur from 3xl to md/lg for better scroll performance
      if (theme === 'dark') return 'bg-neutral-950/90 border-neutral-800 backdrop-blur-md';
      if (theme === 'light') return 'bg-white/90 border-stone-200 backdrop-blur-md';
      if (theme === 'midnight') return 'bg-slate-950/90 border-slate-800 backdrop-blur-md';
      if (theme === 'spring') return 'bg-white/70 backdrop-blur-md border-stone-200';
      return 'backdrop-blur-md border-white/10 bg-black/50';
  };

  // Updated Nav Hover - Glow Text Effect Only (No background box)
  const getNavHoverColor = () => {
      switch (theme) {
          case 'dark': return 'hover:text-teal-400 hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]';
          case 'light': return 'hover:text-stone-900 hover:drop-shadow-[0_0_8px_rgba(87,83,78,0.5)]'; 
          case 'midnight': return 'hover:text-indigo-400 hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]';
          case 'spring': return 'hover:text-pink-600 hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]';
          case 'nature': return 'hover:text-lime-400 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.8)]';
          case 'musgravite': return 'hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]';
          case 'ruby': return 'hover:text-rose-300 hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]';
          case 'emerald': return 'hover:text-emerald-300 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]';
          default: return 'hover:text-teal-400 hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]';
      }
  }
  
  const getGlowStyle = () => {
      switch (theme) {
          case 'dark': return 'hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)] text-teal-500/80 hover:text-teal-400 border-white/10 bg-white/5'; 
          case 'light': return 'hover:drop-shadow-[0_0_8px_rgba(87,83,78,0.6)] text-stone-500 hover:text-stone-800 border-stone-300 bg-stone-100'; 
          case 'midnight': return 'hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.8)] text-indigo-400/80 hover:text-indigo-300 border-indigo-900 bg-indigo-950/30'; 
          case 'spring': return 'hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] text-pink-500/80 hover:text-pink-600 border-pink-200 bg-white/40'; 
          case 'nature': return 'hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.8)] text-lime-500/80 hover:text-lime-400 border-lime-900/30 bg-lime-950/20'; 
          case 'musgravite': return 'hover:drop-shadow-[0_0_8px_rgba(216,180,254,0.8)] text-purple-400/80 hover:text-purple-300 border-purple-900/30 bg-purple-950/20'; 
          case 'ruby': return 'hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.8)] text-rose-400/80 hover:text-rose-300 border-rose-900/30 bg-rose-950/20'; 
          case 'emerald': return 'hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] text-emerald-400/80 hover:text-emerald-300 border-emerald-900/30 bg-emerald-950/20'; 
          default: return 'hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-white/60 hover:text-white border-white/10 bg-white/5';
      }
  }

  // Hamburger Menu Link Hover - Squared, Full Width, Smooth Box Effect
  const getMenuLinkHoverStyle = () => {
      const transitionClass = "transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]";
      switch (theme) {
          case 'dark': return `hover:text-teal-400 hover:drop-shadow-[0_0_5px_rgba(45,212,191,0.8)] hover:bg-white/5 rounded-none px-6 py-3 ${transitionClass}`;
          case 'light': return `hover:text-stone-900 hover:drop-shadow-[0_0_5px_rgba(87,83,78,0.5)] hover:bg-stone-200/50 rounded-none px-6 py-3 ${transitionClass}`; 
          case 'midnight': return `hover:text-indigo-400 hover:drop-shadow-[0_0_5px_rgba(129,140,248,0.8)] hover:bg-indigo-900/30 rounded-none px-6 py-3 ${transitionClass}`;
          case 'spring': return `hover:text-pink-600 hover:drop-shadow-[0_0_5px_rgba(244,114,182,0.8)] hover:bg-white/60 rounded-none px-6 py-3 ${transitionClass}`;
          case 'nature': return `hover:text-lime-400 hover:drop-shadow-[0_0_5px_rgba(163,230,53,0.8)] hover:bg-lime-900/20 rounded-none px-6 py-3 ${transitionClass}`;
          case 'musgravite': return `hover:text-purple-300 hover:drop-shadow-[0_0_5px_rgba(216,180,254,0.8)] hover:bg-purple-900/20 rounded-none px-6 py-3 ${transitionClass}`;
          case 'ruby': return `hover:text-rose-300 hover:drop-shadow-[0_0_5px_rgba(251,113,133,0.8)] hover:bg-rose-900/20 rounded-none px-6 py-3 ${transitionClass}`;
          case 'emerald': return `hover:text-emerald-300 hover:drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] hover:bg-emerald-900/20 rounded-none px-6 py-3 ${transitionClass}`;
          default: return `hover:text-teal-400 hover:drop-shadow-[0_0_5px_rgba(45,212,191,0.8)] hover:bg-white/5 rounded-none px-6 py-3 ${transitionClass}`;
      }
  }

  // Sidebar Background Style with Blur (More transparent for clearer glass effect)
  const getSidebarStyle = () => {
      switch (theme) {
          case 'dark': return 'bg-neutral-950/60 backdrop-blur-2xl border-r border-neutral-800';
          case 'light': return 'bg-white/60 backdrop-blur-2xl border-r border-stone-200';
          case 'midnight': return 'bg-slate-950/60 backdrop-blur-2xl border-r border-slate-800';
          case 'spring': return 'bg-white/50 backdrop-blur-2xl border-r border-stone-200';
          case 'nature': return 'bg-stone-900/60 backdrop-blur-2xl border-r border-stone-700';
          case 'musgravite': return 'bg-stone-900/60 backdrop-blur-2xl border-r border-purple-900/30';
          case 'ruby': return 'bg-stone-900/60 backdrop-blur-2xl border-r border-rose-900/30';
          case 'emerald': return 'bg-stone-900/60 backdrop-blur-2xl border-r border-emerald-900/30';
          default: return 'bg-neutral-950/60 backdrop-blur-2xl border-r border-white/10';
      }
  }

  const ThemeIcon = () => {
      switch(theme) {
          case 'dark': return <Moon className="w-5 h-5" />;
          case 'light': return <Sun className="w-5 h-5" />;
          case 'midnight': return <CloudLightning className="w-5 h-5" />;
          case 'spring': return <Flower2 className="w-5 h-5" />;
          case 'nature': return <Leaf className="w-5 h-5" />;
          default: return <Gem className="w-5 h-5" />;
      }
  }
  
  // --- HOBBIES COMPONENT (Used in Section AND Modal) ---
  const HobbiesContent = () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {PORTFOLIO_DATA.hobbies.map((hobby, idx) => (
            <div key={idx} className={`relative group overflow-hidden rounded-lg border aspect-square ${getCardStyle()}`}>
                <img 
                    src={hobby.src} 
                    alt={hobby.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                    onError={(e) => {
                        e.target.style.display = 'none'; // Fallback if image fails
                    }}
                />
                <div className={`absolute inset-0 flex items-center justify-center bg-black/5 z-0`}>
                    {/* Fallback Icon if image doesn't load/exist */}
                    {hobby.type === 'image' ? <Camera className="w-12 h-12 opacity-20" /> : <Video className="w-12 h-12 opacity-20" />}
                </div>
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h4 className="font-bold text-lg mb-2">{hobby.title}</h4>
                    <p className="text-xs opacity-80">{hobby.description}</p>
                </div>
            </div>
        ))}
      </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out font-sans ${getAppBg()} ${theme === 'dark' ? 'dark' : ''}`}>
      
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background: #fff; color: #000; opacity: 0.5; }
      `}</style>

      {/* --- FLOATING ACTION BUTTON --- */}
      <button 
        onClick={handleFloatingButtonClick}
        className={`fixed bottom-8 right-8 z-40 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110
            ${(theme === 'light' || theme === 'spring') ? 'bg-stone-800 text-white' : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'}`}
      >
          {scrollDir === 'down' ? <ArrowDown className="w-6 h-6" /> : <ArrowUp className="w-6 h-6" />}
      </button>

      {/* --- PROJECT MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <div className={`w-full max-w-4xl h-[80vh] rounded-lg overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95
                ${(theme === 'light' || theme === 'spring') ? 'bg-white text-stone-900' : 'bg-neutral-900 text-white border border-white/10'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`p-6 border-b flex justify-between items-center ${(theme === 'light' || theme === 'spring') ? 'border-stone-200' : 'border-white/10'}`}>
                    <div>
                        <h2 className="text-2xl font-bold font-serif">{selectedProject.title}</h2>
                        <p className="text-sm opacity-60 mt-1">Project Showcase</p>
                    </div>
                    <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-black/10 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <p className="text-lg opacity-80 mb-8 leading-relaxed max-w-2xl">{selectedProject.description}</p>
                    
                    {/* Mock File Explorer */}
                    <h3 className="text-sm font-bold uppercase opacity-60 mb-4 tracking-wider">Project Files</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedProject.files && selectedProject.files.length > 0 ? (
                            selectedProject.files.map((file, i) => (
                                <div key={i} className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-3 hover:bg-black/5 transition-colors cursor-pointer group
                                    ${(theme === 'light' || theme === 'spring') ? 'border-stone-200' : 'border-white/10'}`}>
                                    {file.type === 'image' && <FileImage className={`w-8 h-8 ${getAccentColor()}`} />}
                                    {file.type === 'code' && <FileCode className={`w-8 h-8 ${getAccentColor()}`} />}
                                    {file.type === 'pdf' && <FileText className={`w-8 h-8 ${getAccentColor()}`} />}
                                    <span className="text-xs font-medium text-center truncate w-full">{file.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center opacity-50 border-2 border-dashed rounded-lg border-current">
                                <FolderOpen className="w-12 h-12 mb-4" />
                                <p>No public files available for this project.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className={`p-6 border-t flex justify-end gap-4 ${(theme === 'light' || theme === 'spring') ? 'border-stone-200' : 'border-white/10'}`}>
                    <button onClick={() => setSelectedProject(null)} className="px-6 py-2 rounded-lg font-medium hover:opacity-80">Close</button>
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className={`px-6 py-2 rounded-lg font-medium text-white shadow-lg
                        ${theme === 'light' ? 'bg-stone-800 hover:bg-stone-900' : 'bg-white/10 hover:bg-white/20 border border-white/20'}`}>
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
      )}

      {/* --- HOBBIES MODAL (SHOWN WHEN HIDDEN FROM SCROLL) --- */}
      {hobbiesModalOpen && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setHobbiesModalOpen(false)}>
            <div className={`w-full max-w-4xl max-h-[80vh] rounded-lg overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95
                ${(theme === 'light' || theme === 'spring') ? 'bg-white text-stone-900' : 'bg-neutral-900 text-white border border-white/10'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className={`p-6 border-b flex justify-between items-center ${(theme === 'light' || theme === 'spring') ? 'border-stone-200' : 'border-white/10'}`}>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold font-serif">Hobbies & Interests</h2>
                         {/* TOGGLE SWITCH IN MODAL */}
                        <button 
                            onClick={() => setShowHobbies(!showHobbies)}
                            className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full border transition-all
                            ${showHobbies ? 'bg-green-500/20 border-green-500/50 text-green-500' : 'bg-red-500/20 border-red-500/50 text-red-500'}`}
                        >
                             {showHobbies ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                             {showHobbies ? "Visible on Page" : "Hidden from Page"}
                        </button>
                    </div>
                    <button onClick={() => setHobbiesModalOpen(false)} className="p-2 rounded-full hover:bg-black/10 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8">
                    <HobbiesContent />
                </div>
            </div>
         </div>
      )}

      {/* --- GLOBAL SEARCH MODAL --- */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-black/40 backdrop-blur-md" onClick={() => setSearchOpen(false)}>
          <div className={`w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border animate-in fade-in zoom-in-95 duration-200
            ${(theme === 'light' || theme === 'spring') ? 'bg-white text-stone-900 border-stone-200' : 'bg-black/80 backdrop-blur-xl border-white/10 text-white'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="w-5 h-5 opacity-50" />
              <input 
                type="text" 
                autoFocus
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 px-4 bg-transparent outline-none text-lg placeholder-white/40 text-inherit"
              />
              <span className="text-xs opacity-50 border px-2 py-1 rounded">ESC</span>
            </div>
            <div className="p-4 text-sm opacity-70 max-h-96 overflow-y-auto">
              {searchResults ? (
                searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((result, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => scrollToSection(result.id)}
                        className="block w-full text-left p-3 hover:bg-white/10 rounded transition-colors group"
                      >
                        <div className="text-xs font-bold uppercase opacity-50 mb-1">{result.section}</div>
                        <div className="font-medium group-hover:text-current">{result.title}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>There is nothing found related to the word "{searchQuery}".</p>
                )
              ) : (
                <>
                  <p className="mb-2 font-medium">Quick Links</p>
                  <div className="space-y-2">
                    <button onClick={() => { scrollToSection('publications'); setSearchOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded transition-colors">
                      Latest Publications
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- UNIFIED SIDE/MOBILE MENU (MOVED OUTSIDE NAV) --- */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
            <div className={`absolute top-0 left-0 w-72 h-full py-6 shadow-2xl animate-in slide-in-from-left duration-300 ${getSidebarStyle()}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 px-6">
                  <span className="font-bold text-xl tracking-tight">Menu</span>
                  <button onClick={() => setMenuOpen(false)}>
                      <X className="w-6 h-6 opacity-60 hover:opacity-100" />
                  </button>
              </div>
              <div className="flex flex-col space-y-0 w-full">
                {allNavLinks.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`block w-full text-left text-base font-medium ${getMenuLinkHoverStyle()} ${activeSection === link.id ? 'opacity-100 ' + getAccentColor() : 'opacity-70'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
        </div>
      )}

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? `shadow-md border-b py-0 ${getNavStyle()}` : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-14">
          <div className="flex items-center gap-4">
             {/* Left-side Hamburger Menu */}
             <button 
              className={`p-2 rounded hover:bg-white/10 transition-colors ${(theme === 'light' || theme === 'spring') ? 'text-stone-900' : 'text-white'}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group"
            >
              <h1 className={`text-base font-serif font-bold tracking-tight transition-colors ${(theme === 'light' || theme === 'spring') ? 'text-stone-900' : 'text-white'}`}>
                M. E. I. B. Meraj<span className={getAccentColor()}></span>
              </h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center h-full gap-0 overflow-x-auto">
            {allNavLinks.map((link) => {
              const on = activeSection === link.id;
              return (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-[11px] xl:text-xs h-full flex items-center px-2.5 xl:px-3 font-medium whitespace-nowrap border-b-2 transition-all duration-300
                    ${on
                      ? `${getAccentColor()} border-current opacity-100`
                      : `border-transparent opacity-70 ${getNavHoverColor()} ${(theme === 'light' || theme === 'spring') ? 'text-stone-600' : 'text-white'}`}`}
              >
                {link.name}
              </button>
            );})}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className={`p-2 opacity-70 hover:opacity-100 transition-colors ${(theme === 'light' || theme === 'spring') ? 'text-stone-900' : 'text-white'}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* THEME CYCLE BUTTON */}
            <button 
              onClick={cycleTheme}
              className={`p-2 rounded-full transition-colors flex items-center gap-2
                ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200 text-stone-900' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}
              aria-label="Toggle Theme"
            >
              <ThemeIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 transition-colors duration-500">
           <ParticleCanvas theme={theme} />
        </div>
        
        {/* Gradient Overlay based on Theme */}
        <div className={`absolute inset-0 z-1 pointer-events-none bg-gradient-to-b
            ${theme === 'dark' ? 'from-transparent via-neutral-950/20 to-neutral-950' : 
             (theme === 'light' || theme === 'spring') ? 'from-transparent via-white/50 to-stone-100' :
             'from-transparent via-black/10 to-transparent'}`} 
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className={`mb-6 inline-flex items-center px-3 py-1 rounded-full backdrop-blur-sm text-xs font-semibold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 border
             ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 bg-white/50 text-stone-600' : 
               'border-white/20 bg-white/10 text-inherit'}`}>
             Open to Collaborations
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-serif font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {PORTFOLIO_DATA.profile.name}
          </h1>
          
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 opacity-80">
            {PORTFOLIO_DATA.profile.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <button 
                onClick={() => scrollToSection('research')}
                className={`px-8 py-3.5 rounded-lg font-medium hover:scale-105 transition-transform duration-200 shadow-xl
                    ${(theme === 'light' || theme === 'spring') ? 'bg-stone-800 text-white shadow-stone-400/50' : 
                      'bg-white text-black shadow-white/20'}`}
            >
              View Research
            </button>
            <a 
                href={PORTFOLIO_DATA.profile.cvLink}
                download="Enamul_Islam_Meraj_WebsiteCV.pdf"
                className={`px-8 py-3.5 border rounded-lg font-medium transition-colors flex items-center gap-2
                    ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 hover:bg-white' : 
                      'border-white/30 hover:bg-white/10 text-white'}`}
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>

          {/* Social Icons with Square Rounded Style */}
          <div className="flex items-center justify-center gap-4 mt-8 mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 flex-wrap">
            {[
              { icon: GraduationCap, link: PORTFOLIO_DATA.profile.social.scholar, label: "Google Scholar" },
              PORTFOLIO_DATA.profile.social.researchgate && { icon: BookOpen, link: PORTFOLIO_DATA.profile.social.researchgate, label: "ResearchGate" },
              PORTFOLIO_DATA.profile.social.orcid && { icon: Fingerprint, link: PORTFOLIO_DATA.profile.social.orcid, label: "ORCID" },
              { icon: Mail, link: PORTFOLIO_DATA.profile.social.email, label: "Email" },
              { icon: Linkedin, link: PORTFOLIO_DATA.profile.social.linkedin, label: "LinkedIn" },
              { icon: MessageCircle, link: PORTFOLIO_DATA.profile.social.whatsapp, label: "WhatsApp" },
              { icon: Facebook, link: PORTFOLIO_DATA.profile.social.facebook, label: "Facebook" },
              { icon: Instagram, link: PORTFOLIO_DATA.profile.social.instagram, label: "Instagram" },
              { icon: Twitter, link: PORTFOLIO_DATA.profile.social.twitter, label: "X" },
              { icon: Send, link: PORTFOLIO_DATA.profile.social.telegram, label: "Telegram" },
            ].filter(Boolean).map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`relative group w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 hover:scale-110 ${getGlowStyle()}`}
                >
                    <social.icon className="w-5 h-5" />
                    <span className={`pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-[10px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity z-20
                      ${(theme === 'light' || theme === 'spring') ? 'bg-stone-800 text-white' : 'bg-white text-neutral-900'}`}>
                      {social.label}
                    </span>
                </a>
            ))}
          </div>

        </div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 opacity-50
                ${(theme === 'light' || theme === 'spring') ? 'border-stone-400' : 'border-white'}`}>
                <div className={`w-1 h-2 rounded-full animate-scroll ${(theme === 'light' || theme === 'spring') ? 'bg-stone-400' : 'bg-white'}`} />
            </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className={`text-sm font-bold tracking-widest uppercase mb-3 ${getAccentColor()}`}>About Me</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                    Analyzing ground behavior to build safer, resilient infrastructure.
                </h3>
                <p className="text-lg opacity-80 leading-relaxed mb-6 whitespace-pre-line">
                    {PORTFOLIO_DATA.profile.bio}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {PORTFOLIO_DATA.metrics.map((m, i) => (
                        <div key={i} className={`border-l-2 pl-4 py-2 pr-2 rounded-r-lg transition-all duration-300 group
                            ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 hover:bg-white' : 'border-white/20 hover:bg-white/5'}`}>
                            <div className={`text-3xl font-bold transition-colors ${getHoverTextColor()}`}>{m.value}</div>
                            <div className="text-sm opacity-60 uppercase tracking-wide">{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative">
                <div className={`aspect-square rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 ease-out
                    ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10 backdrop-blur-md'}`}>
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br
                        ${(theme === 'light' || theme === 'spring') ? 'from-stone-200 to-stone-300' : 'from-white/5 to-white/10'}`}>
                        {/* Placeholder for User Image */}
                        <User className="w-32 h-32 opacity-50" />
                    </div>
                </div>
            </div>
        </div>
      </Section>

      {/* --- EDUCATION SECTION --- */}
      <Section id="education">
          <div className="flex flex-col gap-8">
            <div className="w-full">
                <h2 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3">
                    <GraduationCap className={`w-8 h-8 ${getAccentColor()}`} />
                    Education
                </h2>
                <p className="opacity-70">
                    A timeline of my academic qualifications and research milestones.
                </p>
            </div>
            <div className="w-full">
                {/* Continuous Vertical Line Container */}
                <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                    {PORTFOLIO_DATA.education.map((edu, idx) => (
                        <div key={idx} className={`relative group pl-8 py-6 rounded-r-lg transition-all duration-300 border-transparent
                            ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 
                              'hover:bg-white/5'}`}>
                            
                            {/* Outer Circle (Static) - CENTERED */}
                            <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                                {/* Inner Dot (Changes Color) */}
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                            </div>
                            
                            <div> 
                                <span className={`inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider uppercase rounded-full ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/20'}`}>
                                    {edu.year}
                                </span>
                                <h3 className={`text-xl font-bold mt-1 transition-colors ${getHoverTextColor()}`}>{edu.institution}</h3>
                                <div className="text-lg font-medium opacity-90 mb-1">{edu.degree}</div>
                                {edu.advisor && (
                                     <p className="text-sm opacity-70">
                                        <span className="font-semibold">Advisor/Board:</span> {edu.advisor}
                                    </p>
                                )}
                                 <p className="text-sm italic opacity-60">
                                    {edu.thesis}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      </Section>

      {/* --- RESEARCH SECTION --- */}
      <Section id="research">
        <div className="flex flex-col gap-8">
            <div className="w-full">
                 <h2 className="text-3xl font-serif font-bold mb-4">Research Interests</h2>
                 <p className="opacity-70 max-w-2xl">
                     Click a node to bring it forward. The list below follows the same selection.
                 </p>
            </div>
            
            <div className="w-full mb-4">
                 <ResearchNetwork
                    theme={theme}
                    interests={PORTFOLIO_DATA.research_interests}
                    selectedId={selectedInterest}
                    onSelect={(id) => setSelectedInterest(id)}
                 />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-3">
                     {[...PORTFOLIO_DATA.research_interests].sort((a, b) => {
                         if (a.id === selectedInterest) return -1;
                         if (b.id === selectedInterest) return 1;
                         return 0;
                     }).map((interest) => (
                         <button
                            type="button"
                            key={interest.id}
                            id={`interest-${interest.id}`}
                            onClick={() => setSelectedInterest(interest.id === selectedInterest ? null : interest.id)}
                            className={`text-left p-4 rounded-lg transition-all duration-300 border
                            ${selectedInterest === interest.id
                                ? ((theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-white/10 border-white/20')
                                : ((theme === 'light' || theme === 'spring') ? 'border-transparent hover:bg-white' : 'border-transparent hover:bg-white/5')}`}
                         >
                              <span className={`text-base font-medium ${getHoverTextColor()}`}>{interest.topic}</span>
                              {interest.note && selectedInterest === interest.id && (
                                <p className="mt-2 text-sm opacity-70">{interest.note}</p>
                              )}
                         </button>
                     ))}
            </div>
        </div>
      </Section>

      {/* --- PUBLICATIONS (MOVED UP) --- */}
      <Section id="publications">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif font-bold mb-4">Selected Publications</h2>
                    <p className="opacity-70">
                        Published work and manuscripts in progress.
                    </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className={`px-4 py-2 text-sm font-medium rounded-lg ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200 text-stone-800' : 'bg-white/10 text-white'}`}>
                        All Years
                    </button>
                </div>
            </div>

            {/* Citation Graph - Kept as is */}
            <div className="mb-8 h-64 w-full">
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-6">Citation Growth</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PORTFOLIO_DATA.citation_history}>
                        <defs>
                            <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={(theme === 'light' || theme === 'spring') ? '#78716c' : '#ffffff'} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={(theme === 'light' || theme === 'spring') ? '#78716c' : '#ffffff'} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={(theme === 'light' || theme === 'spring') ? "#e5e5e5" : "#ffffff30"} />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: (theme === 'light' || theme === 'spring') ? '#737373' : '#a3a3a3'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: (theme === 'light' || theme === 'spring') ? '#737373' : '#a3a3a3'}} />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: (theme === 'light' || theme === 'spring') ? '#fff' : '#171717', 
                                borderColor: (theme === 'light' || theme === 'spring') ? '#e5e5e5' : '#404040', 
                                borderRadius: '8px' 
                            }}
                        />
                        <Area type="monotone" dataKey="citations" stroke={(theme === 'light' || theme === 'spring') ? '#78716c' : '#ffffff'} strokeWidth={3} fillOpacity={1} fill="url(#colorCitations)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {PORTFOLIO_DATA.working_papers && PORTFOLIO_DATA.working_papers.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-4">In progress</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {PORTFOLIO_DATA.working_papers.map((wp) => (
                    <div key={wp.id} className={`p-5 rounded-lg border ${(theme === 'light' || theme === 'spring') ? 'border-stone-200 bg-white' : 'border-white/10 bg-white/5'}`}>
                      <div className="text-[10px] uppercase tracking-wider opacity-60 mb-2">{wp.status} · {wp.year}</div>
                      <h4 className="font-semibold leading-snug mb-2">{wp.title}</h4>
                      <p className="text-sm opacity-60 italic mb-1">{wp.venue}</p>
                      {wp.note && <p className="text-sm opacity-70">{wp.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publication List - Converted to Timeline */}
            <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-4 ml-8">Published</h3>
                {PORTFOLIO_DATA.publications.map((pub) => (
                    <div key={pub.id} className={`relative group pl-8 py-6 rounded-r-lg transition-all duration-300 border-transparent
                        ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 'hover:bg-white/5'}`}>
                        
                        {/* Bullet - CENTERED */}
                        <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                            ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex gap-2 items-center mb-2">
                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded
                                        ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200 text-stone-800' : 'bg-white/20 text-white'}`}>
                                        {pub.type}
                                    </span>
                                    <span className="text-sm opacity-60">{pub.year}</span>
                                </div>
                                <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors ${getHoverTextColor()}`}>
                                    {pub.title}
                                </h3>
                                <p className="opacity-70 mb-3 italic">
                                    {pub.authors}
                                </p>
                                <div className="flex items-center gap-4 text-sm opacity-60">
                                    <span className="font-semibold">{pub.journal}</span>
                                    <span>•</span>
                                    <span>{pub.citations} Citations</span>
                                </div>
                            </div>
                            <div className="flex gap-2 self-start md:self-center">
                                {pub.url && (
                                  <a href={pub.url} target="_blank" rel="noreferrer" className={`p-2 rounded-full hover:bg-black/5 ${getAccentColor()}`} title="ResearchGate">
                                    <ExternalLink className="w-5 h-5" />
                                  </a>
                                )}
                                {pub.pdf && (
                                  <a href={pub.pdf} download className={`p-2 rounded-full hover:bg-black/5 ${getAccentColor()}`} title="Download paper">
                                    <span className="relative inline-flex w-5 h-6">
                                      <FileText className="w-5 h-5" />
                                      <ArrowDown className="w-3 h-3 absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
                                    </span>
                                  </a>
                                )}
                                {pub.certificate && (
                                  <a href={pub.certificate} download className={`p-2 rounded-full hover:bg-black/5 ${getAccentColor()}`} title="Participation certificate">
                                    <Award className="w-5 h-5" />
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleCite(pub)}
                                  className={`p-2 rounded-full hover:bg-black/5 ${getAccentColor()}`}
                                  title="Copy citation"
                                >
                                    {copiedCiteId === pub.id ? <CheckCircle2 className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Section>

      {/* --- PROJECTS (MOVED DOWN & CHANGED TO TIMELINE) --- */}
      <Section id="projects">
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-serif font-bold">Projects</h2>
            <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                {PORTFOLIO_DATA.projects.map((proj, i) => (
                    <div key={i} className={`relative group pl-8 py-8 rounded-r-lg transition-all duration-300 border-transparent
                        ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 'hover:bg-white/5'}`}>
                        
                        {/* Bullet - CENTERED */}
                        <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                            ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                        </div>

                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <Anchor className={`w-5 h-5 ${getAccentColor()}`} />
                                    <h3 className={`text-2xl font-bold transition-colors ${getHoverTextColor()}`}>
                                        {proj.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="opacity-70 mb-4 max-w-3xl">
                                {proj.description}
                            </p>
                            <div className="flex gap-2 flex-wrap mb-4">
                                {proj.stack.map(tech => (
                                    <span key={tech} className={`px-2 py-1 text-[10px] font-mono rounded opacity-70
                                        ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10'}`}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <button 
                                onClick={(e) => { e.preventDefault(); setSelectedProject(proj); }}
                                className={`inline-flex items-center text-sm font-bold hover:underline ${getAccentColor()}`}
                            >
                                View Project <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Section>

      {/* --- CERTIFICATIONS SECTION (CHANGED TO TIMELINE) --- */}
      <Section id="certifications">
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-serif font-bold">Certifications</h2>
            <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                {PORTFOLIO_DATA.certifications.map((cert, i) => (
                    <div key={i} className={`relative group pl-8 py-6 rounded-r-lg transition-all duration-300 border-transparent
                        ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 'hover:bg-white/5'}`}>
                        
                        {/* Bullet - CENTERED */}
                        <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                            ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                            <div className="flex-1">
                                <h4 className={`font-bold text-lg leading-tight mb-1 transition-colors ${getHoverTextColor()}`}>{cert.title}</h4>
                                <div className="text-sm opacity-60 flex gap-2">
                                    <span>{cert.issuer}</span>
                                    <span>•</span>
                                    <span>{cert.date}</span>
                                </div>
                            </div>
                            <a href={cert.link} target="_blank" rel="noreferrer" className={`p-2 rounded-full border transition-colors hover:bg-white/10 opacity-60 hover:opacity-100 self-start md:self-center
                                ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Section>

      {/* --- SKILLS SECTION (2-COLUMN TIMELINE) --- */}
      <Section id="skills">
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-serif font-bold">Technical Expertise</h2>
            <h3 className="text-xl font-bold opacity-80">Software & Tools</h3>
            
            <div className="grid md:grid-cols-2 gap-12">
                {/* Column 1 */}
                <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                    {PORTFOLIO_DATA.skills.slice(0, Math.ceil(PORTFOLIO_DATA.skills.length / 2)).map((skill, i) => (
                        <div key={i} className={`relative group pl-8 pr-6 py-6 rounded-r-lg transition-all duration-300 border-transparent
                            ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 'hover:bg-white/5'}`}>
                            
                            {/* Bullet - CENTERED */}
                            <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className={`font-bold text-lg transition-colors ${getHoverTextColor()}`}>{skill.name}</span>
                                    <span className="opacity-60 font-mono text-sm">{skill.level}%</span>
                                </div>
                                <div className={`w-full h-2 rounded-full overflow-hidden ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10'}`}>
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressBarColor()}`} 
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Column 2 */}
                <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                    {PORTFOLIO_DATA.skills.slice(Math.ceil(PORTFOLIO_DATA.skills.length / 2)).map((skill, i) => (
                        <div key={i} className={`relative group pl-8 pr-6 py-6 rounded-r-lg transition-all duration-300 border-transparent
                            ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 'hover:bg-white/5'}`}>
                            
                            {/* Bullet - CENTERED */}
                            <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className={`font-bold text-lg transition-colors ${getHoverTextColor()}`}>{skill.name}</span>
                                    <span className="opacity-60 font-mono text-sm">{skill.level}%</span>
                                </div>
                                <div className={`w-full h-2 rounded-full overflow-hidden ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10'}`}>
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressBarColor()}`} 
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nested Timeline for Tests - CHANGED TO VERTICAL LIST */}
            {PORTFOLIO_DATA.tests && (
                <div>
                        <h3 className="text-xl font-bold mb-6 opacity-80">Standardized Tests & Languages</h3>
                        <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                            {PORTFOLIO_DATA.tests.map((test, i) => (
                                <div key={i} className={`relative group pl-8 py-4 rounded-r-lg transition-all duration-300 border-transparent
                                    ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 'hover:bg-white/5'}`}>
                                    
                                    {/* Bullet - CENTERED */}
                                    <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                                    </div>

                                    <div>
                                        <div className={`text-xl font-bold mb-1 transition-colors ${getHoverTextColor()}`}>{test.name}</div>
                                        <div className="text-sm opacity-60 flex gap-2">
                                            <span>Score: {test.score}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
            )}
        </div>
      </Section>

      {/* --- CAREER / EXPERIENCE (MOVED BEFORE HOBBIES) --- */}
      <Section id="career">
          <div className="flex flex-col gap-8">
            <div className="w-full">
                <h2 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3">
                    <Briefcase className={`w-8 h-8 ${getAccentColor()}`} />
                    Experience
                </h2>
                <p className="opacity-70">
                    Professional appointments and history.
                </p>
            </div>
            <div className="w-full">
                <div className={`border-l-2 py-2 ml-3 md:ml-6 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                    {PORTFOLIO_DATA.experience.map((exp, idx) => (
                        <div key={idx} className={`relative group pl-8 py-6 rounded-r-lg transition-all duration-300 border-transparent
                            ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 
                              'hover:bg-white/5'}`}>
                            
                            {/* Outer Circle (Static) - CENTERED */}
                            <div className={`absolute -left-[9px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                                {/* Inner Dot (Changes Color) */}
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                            </div>
                            
                            <div>
                                <span className={`inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider uppercase rounded-full ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/20'}`}>
                                    {exp.period}
                                </span>
                                <h3 className={`text-xl font-bold mt-1 transition-colors duration-300 ${getHoverTextColor()}`}>{exp.role}</h3>
                                <div className="text-lg font-medium opacity-90 mb-2">
                                    {exp.institution}
                                </div>
                                <p className="opacity-70 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      </Section>

      {/* --- HOBBIES SECTION (MOVED BEFORE CONTACT) --- */}
      {showHobbies && (
        <Section id="hobbies">
             <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif font-bold">Hobbies & Interests</h2>
                <button 
                    onClick={() => setShowHobbies(false)} 
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs transition-colors hover:bg-white/10 
                        ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 text-stone-600' : 'border-white/20 text-white/60'}`}
                    title="Hide from page (Accessible via Menu)"
                >
                    <Settings className="w-3 h-3" /> Hide Section
                </button>
             </div>
             <HobbiesContent />
        </Section>
      )}

      {/* --- CONTACT (REDESIGNED - SPLIT CARD) --- */}
      <Section id="contact" className="mb-0 md:mb-12">
          {/* Main Card Container */}
          <div className={`flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border
              ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-200' : 'bg-white/5 border-white/10 backdrop-blur-xl'}`}>
              
              {/* Left Panel: Info (Solid Color) */}
              <div className={`p-10 md:w-2/5 flex flex-col justify-between text-white
                  ${theme === 'dark' ? 'bg-teal-900' : 
                    theme === 'light' ? 'bg-stone-800' : 
                    theme === 'midnight' ? 'bg-indigo-900' :
                    theme === 'spring' ? 'bg-stone-700' :
                    theme === 'nature' ? 'bg-lime-900' :
                    theme === 'musgravite' ? 'bg-purple-900' :
                    theme === 'ruby' ? 'bg-rose-900' :
                    theme === 'emerald' ? 'bg-emerald-900' : 'bg-black'}`}>
                  
                  <div>
                      <h2 className="text-3xl font-serif font-bold mb-6">Let's Connect</h2>
                      <p className="opacity-80 text-sm mb-8 leading-relaxed">
                          Interested in collaboration or have questions about my research? I'm currently accepting new PhD students for Fall 2025.
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex items-center gap-4">
                              <Mail className="w-5 h-5 opacity-80" />
                              <div>
                                  <div className="text-xs opacity-60 uppercase tracking-wider font-semibold">Email</div>
                                  <div className="text-sm font-medium">{PORTFOLIO_DATA.profile.email}</div>
                              </div>
                          </div>
                          <div className="flex items-center gap-4">
                              <MapPin className="w-5 h-5 opacity-80" />
                              <div>
                                  <div className="text-xs opacity-60 uppercase tracking-wider font-semibold">Lab</div>
                                  <div className="text-sm font-medium">Y2E2 Building, Suite 300</div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/20">
                      <p className="text-xs opacity-60 mb-4">Socials</p>
                      <div className="flex gap-4">
                          <Globe className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
                          <Twitter className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
                          <Users className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
                      </div>
                  </div>
              </div>

              {/* Right Panel: Form (Clean White/Glass) */}
              <div className="p-10 md:w-3/5 bg-transparent">
                  <form className="space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-1">
                              <label className="text-xs font-bold opacity-60 uppercase tracking-wide">First Name</label>
                              <input type="text" className={`w-full rounded-lg p-3 bg-transparent border focus:outline-none focus:ring-2 transition-all
                                  ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 focus:ring-stone-400' : 'border-white/20 focus:border-white focus:ring-white/20 text-white'}`} />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-bold opacity-60 uppercase tracking-wide">Last Name</label>
                              <input type="text" className={`w-full rounded-lg p-3 bg-transparent border focus:outline-none focus:ring-2 transition-all
                                  ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 focus:ring-stone-400' : 'border-white/20 focus:border-white focus:ring-white/20 text-white'}`} />
                          </div>
                      </div>
                      
                      <div className="space-y-1">
                          <label className="text-xs font-bold opacity-60 uppercase tracking-wide">Topic</label>
                          <div className="relative">
                            <select className={`w-full rounded-lg p-3 bg-transparent border focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer
                                ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 focus:ring-stone-400' : 'border-white/20 focus:border-white focus:ring-white/20 text-white'}`}>
                                <option className="text-black">Research Collaboration</option>
                                <option className="text-black">Speaking Inquiry</option>
                                <option className="text-black">Prospective Student</option>
                                <option className="text-black">Media/Press</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-3.5 w-4 h-4 opacity-50 rotate-90 pointer-events-none" />
                          </div>
                      </div>

                      <div className="space-y-1">
                          <label className="text-xs font-bold opacity-60 uppercase tracking-wide">Message</label>
                          <textarea rows="4" className={`w-full rounded-lg p-3 bg-transparent border focus:outline-none focus:ring-2 transition-all
                              ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 focus:ring-stone-400' : 'border-white/20 focus:border-white focus:ring-white/20 text-white'}`}></textarea>
                      </div>

                      <button 
                        type="button"
                        onClick={handleSendMessage}
                        disabled={formStatus !== 'idle'}
                        className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 text-white flex items-center justify-center gap-2
                          ${theme === 'dark' ? 'bg-teal-600 hover:bg-teal-700' : 
                            theme === 'light' ? 'bg-stone-800 hover:bg-black' : 
                            theme === 'midnight' ? 'bg-indigo-700 hover:bg-indigo-800' :
                            theme === 'spring' ? 'bg-stone-700 hover:bg-stone-800' :
                            theme === 'nature' ? 'bg-lime-700 hover:bg-lime-800' :
                            theme === 'musgravite' ? 'bg-purple-700 hover:bg-purple-800' :
                            theme === 'ruby' ? 'bg-rose-700 hover:bg-rose-800' :
                            theme === 'emerald' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-white/20'}`}
                      >
                          {formStatus === 'idle' && "Send Message"}
                          {formStatus === 'sending' && "Sending..."}
                          {formStatus === 'success' && <><CheckCircle2 className="w-5 h-5" /> Sent!</>}
                      </button>
                  </form>
              </div>
          </div>
      </Section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center opacity-60 text-sm">
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved.</p>
          <p className="mt-2 text-xs">Built for resilience.</p>
      </footer>

    </div>
  );
}
