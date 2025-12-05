import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, CloudLightning, Leaf, Gem, Hexagon, Flower2,
  User, Briefcase, GraduationCap, 
  Code, Award, Mail, Download, Search, 
  Menu, X, ChevronRight, Globe, Users, FileText,
  MapPin, ArrowUpRight, Anchor, ArrowDown, ArrowUp,
  Facebook, Instagram, Twitter, Send, MessageCircle,
  FileImage, FileCode, FolderOpen, Image as ImageIcon,
  CheckCircle2, Linkedin, ExternalLink, ChevronDown,
  Cpu, Database, Layers, Camera, Video, Settings, Eye, EyeOff
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

/**
 * DATA & CONTENT ARCHITECTURE
 */
const PORTFOLIO_DATA = {
  // --- EDITABLE: Personal Profile Info ---
  profile: {
    name: "Md Enamul Islam Bhuiyan Meraj",
    title: "Post Graduate Student of Civil & Geotechnical Engineering",
    institution: "Bangladesh University of Engineering & Technology (BUET)",
    tagline: "Ensuring structural integrity through advanced ground characterization and resilient foundation design.",
    bio: "Civil and geotechnical engineering researcher with focus on liquefaction behavior, seismic soil response, and resilient ground systems. Currently pursuing an M.Sc. in Civil & Geotechnical Engineering at BUET, with research centered on improving the predictability and safety of soil performance under earthquake loading.",
    email: "enamulislammeraj.25@gmail.com",
    location: "Dhaka, Bangladesh",
    cvLink: "#",
    // --- EDITABLE: Social Links URLs ---
    social: {
      email: "mailto:enamulislammeraj.25@gmail.com",
      linkedin: "https://www.linkedin.com/in/md-enamul-islam-bhuiyan-meraj/", 
      whatsapp: "https://wa.me/8801639146076",
      facebook: "https://www.facebook.com/enamulislam.meraj25/",
      instagram: "https://www.instagram.com/enamul_islam_meraj/",
      twitter: "https://x.com/eimerajxrin",
      telegram: "https://t.me/eimerajxrin"
    }
  },
  
  // --- EDITABLE: Key Performance Metrics ---
  metrics: [
    { label: "Citations", value: "0" },
    { label: "h-index", value: "0" },
    { label: "Projects", value: "3" },
    { label: "Years Active", value: "5" }
  ],

  // --- EDITABLE: Education History ---
  education: [
    {
      degree: "M. Sc. in Civil & Geotechnical Engineering",
      institution: "Bangladesh University of Engineering & Technology (BUET)",
      year: "May, 2025 - Present",
      advisor: "Prof. Dr. Mehedi Ahmed Ansary",
      thesis: "N/A"
    },
    {
      degree: "B.Sc. in Civil Engineering",
      institution: "Rajshahi University of Engineering & Technology (RUET)",
      year: "February, 2019 - April, 2024",
      advisor: "Prof. Dr. Md. Abdul Alim",
      thesis: "Thesis: Behavior of single pile in cohesionless soil on horizontal & sloping ground surface under lateral loading"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Dhaka College",
      year: "2016 - 2018"
    },
    {
      degree: "Secondary School Certificate",
      institution: "Motijheel Government Boys’ High School",
      year: "2014 - 2016"
    },
    {
      degree: "Junior School Certificate (JSC)",
      institution: "Motijheel Government Boys’ High School",
      year: "2011 - 2013"
    }
  ],

  // --- EDITABLE: Certifications ---
  certifications: [
    {
      title: "Microsoft 365 Fundamentals",
      issuer: "Microsoft",
      date: "April, 2025",
      link: "#"
    },
    {
      title: "Construction Management",
      issuer: "Columbia University (Coursera)",
      date: "April 2025",
      link: "#"
    },
    {
      title: "Concrete Multi Storey Building - System Design",
      issuer: "L&T EduTech",
      date: "March, 2025",
      link: "#"
    },
    {
      title: "Financial Markets",
      issuer: "Yale University (Coursera)",
      date: "February, 2025",
      link: "#"
    }
  ],

  // --- EDITABLE: Skills & Expertise ---
  skills: [
    { name: "CSI ETABS & SAFE", level: 90 },
    { name: "PLAXIS 2D/3D", level: 85 },
    { name: "AutoCAD", level: 85 },
    { name: "ArcGIS Pro", level: 75 },
    { name: "Python", level: 60 },
    { name: "C/C++", level: 60 },
    { name: "Microsoft Office Suite", level: 95 },
    { name: "SketchUP", level: 70 }
  ],

  // --- EDITABLE: Professional Experience ---
  experience: [
    {
      role: "Structural Engineer",
      institution: "Al Wakia Construction",
      department: "Engineering Dept.",
      period: "January, 2025 - February, 2025",
      description: "Engaged in structural analysis and construction management tasks."
    },
    {
      role: "Academic Mentor & Tutor",
      institution: "Private Tutoring",
      department: "Education",
      period: "Undergraduate Years",
      description: "Provided academic mentorship and tutoring in mathematics, physics, and ICT to several school and college students during undergraduate studies, fostering their academic growth."
    }
  ],

  // --- EDITABLE: Research Topic Keywords ---
  research_interests: [
    { topic: "Seismic Resilience", subtopics: [] },
    { topic: "Liquefaction", subtopics: [] },
    { topic: "Seismic Soil Dynamics", subtopics: [] },
    { topic: "Foundation Engineering", subtopics: [] },
    { topic: "FEA Analysis", subtopics: [] }
  ],

  // --- EDITABLE: Citation Graph Data ---
  citation_history: [
    { year: 2019, citations: 0 },
    { year: 2020, citations: 0 },
    { year: 2021, citations: 0 },
    { year: 2022, citations: 0 },
    { year: 2023, citations: 0 },
    { year: 2024, citations: 0 },
    { year: 2025, citations: 0 },
    { year: 2026, citations: 0 },
    { year: 2027, citations: 0 },
    { year: 2028, citations: 0 },
  ],

  // --- EDITABLE: Selected Publications ---
  publications: [
    {
      id: 1,
      title: "Behavior of single pile in cohesionless soil on horizontal & sloping ground surface under lateral loading",
      authors: "M. E. I. B. Meraj, K. H. Hridoy, M. A. Alim",
      journal: "International Conference on Architecture and Civil Engineering (ICACE)",
      year: 2024,
      citations: 0,
      type: "Conference",
      tags: ["Lateral Load", "Soil - Structure Interaction", "Sloping Ground"]
    },
  ],

  // --- EDITABLE: Projects & Tools ---
  projects: [
    {
      title: "Water Supply System Investigation (RCC)",
      description: "Carried out an investigation on the existing water supply system of Rajshahi City Corporation (RCC), analysing efficiency and proposing utilization strategies for existing water plants.",
      stack: ["Efficiency Analysis", "Urban Planning", "Water Supply"],
      link: "#",
      stars: "N/A",
      files: []
    },
    {
      title: "15 Storied Building Design",
      description: "Complete structural design and analysis of a 15-storied residential building ensuring safety and code compliance using CSI ETABS & CSI SAFE.",
      stack: ["CSI ETABS", "CSI SAFE", "Structural Design"],
      link: "#",
      stars: "Design",
      files: []
    },
    {
      title: "Group Pile Response Analysis (Ongoing)",
      description: "Conducting Finite Element Analysis (FEA) to assess settlement patterns and reinforcement efficacy in uniform/non-uniform pile group layouts.",
      stack: ["FEA", "PLAXIS 2D/3D", "Research"],
      link: "#",
      stars: "Research",
      files: []
    }
  ],

  // --- EDITABLE: Hobbies (Photos & Videos) ---
  hobbies: [
    { title: "Site Photography", type: "image", description: "Capturing structural details during field visits." },
    { title: "Engineering Simulations", type: "video", description: "Visualizing stress distribution in FEA models." },
    { title: "Travel & Nature", type: "image", description: "Exploring the natural landscapes of Bangladesh." },
    // Add more items as needed...
  ]
};

/**
 * HOOKS & UTILS
 */

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

/**
 * VISUAL COMPONENTS
 */

// 1. Theme-Aware Particle Canvas
const ParticleCanvas = ({ theme }) => {
  const canvasRef = useRef(null);
  const { width, height } = useWindowSize();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;

    // --- CONFIGURATION BASED ON THEME ---
    let particleCount = width < 768 ? 40 : 80;
    let particleColor, lineColor;
    let type = 'truss'; // 'truss', 'bubbles', 'spores', 'petals', 'stars'

    switch (theme) {
      case 'dark':
        particleColor = 'rgba(45, 212, 191, 0.4)'; // Teal
        lineColor = 'rgba(45, 212, 191, 0.1)';
        type = 'truss';
        break;
      case 'light':
        particleColor = 'rgba(87, 83, 78, 0.3)'; // Stone Grey
        lineColor = 'rgba(87, 83, 78, 0.1)';
        type = 'truss';
        break;
      case 'midnight': // New Theme
        particleColor = 'rgba(139, 92, 246, 0.4)'; // Violet
        lineColor = 'rgba(139, 92, 246, 0.1)';
        type = 'stars';
        break;
      case 'spring':
        particleColor = 'rgba(244, 114, 182, 0.6)'; // Pink Petals
        lineColor = 'rgba(255, 255, 255, 0)';
        type = 'petals';
        particleCount = 60;
        break;
      case 'nature':
        particleColor = 'rgba(234, 179, 8, 0.4)'; 
        lineColor = 'rgba(255, 255, 255, 0)'; 
        type = 'spores';
        break;
      case 'musgravite':
        particleColor = 'rgba(216, 180, 254, 0.3)';
        lineColor = 'rgba(216, 180, 254, 0.05)';
        type = 'truss';
        break;
      case 'ruby':
        particleColor = 'rgba(251, 113, 133, 0.4)';
        lineColor = 'rgba(251, 113, 133, 0.1)';
        type = 'truss';
        break;
      case 'emerald':
        particleColor = 'rgba(52, 211, 153, 0.4)';
        lineColor = 'rgba(52, 211, 153, 0.1)';
        type = 'truss';
        break;
      default:
        particleColor = 'rgba(255, 255, 255, 0.2)';
        lineColor = 'rgba(255, 255, 255, 0.05)';
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (type === 'bubbles' || type === 'spores') ? -(Math.random() * 0.5 + 0.1) : 
            (type === 'petals' ? (Math.random() * 0.5 + 0.2) : (Math.random() - 0.5) * 0.15),
        size: (type === 'bubbles') ? Math.random() * 4 + 1 : (Math.random() * 2 + 1.5),
        sway: Math.random() * 0.02 // specific for petals
      });
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        // Movement Logic
        if (type === 'petals') {
            p.x += Math.sin(p.y * 0.01) + p.vx; // Sway logic
            p.y += p.vy;
        } else {
            p.x += p.vx;
            p.y += p.vy;
        }

        // Wrap around
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Drawing Logic
        if (type === 'spores' || type === 'stars') {
             ctx.beginPath();
             ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
             ctx.fillStyle = particleColor;
             ctx.fill();
        } else if (type === 'petals') {
             ctx.beginPath();
             ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, p.sway * 10, 0, Math.PI * 2);
             ctx.fillStyle = particleColor;
             ctx.fill();
        } else {
             // TRUSS SYSTEMS
             ctx.beginPath();
             ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
             ctx.fillStyle = particleColor;
             ctx.fill();

             // Draw Lines only for Trusses
             if (type === 'truss') {
                 for (let j = i + 1; j < particles.length; j++) {
                   const p2 = particles[j];
                   const dx = p.x - p2.x;
                   const dy = p.y - p2.y;
                   const dist = Math.sqrt(dx*dx + dy*dy);

                   if (dist < 180) {
                     ctx.beginPath();
                     ctx.strokeStyle = lineColor;
                     ctx.lineWidth = 1;
                     ctx.moveTo(p.x, p.y);
                     ctx.lineTo(p2.x, p2.y);
                     ctx.stroke();
                   }
                 }
             }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height, theme]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-100" />;
};

// 2. Section Wrapper
const Section = ({ children, id, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section 
      id={id}
      ref={ref}
      className={`py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  );
};

// 3. Research Network
const ResearchNetwork = ({ theme }) => {
    const nodes = [
        { label: "Seismic", x: 50, y: 50, size: 20 },
        { label: "Materials", x: 20, y: 30, size: 24 },
        { label: "AI Monitor", x: 80, y: 30, size: 16 },
        { label: "Urban Flows", x: 30, y: 70, size: 18 },
        { label: "Resilience", x: 70, y: 80, size: 14 },
    ];

    // Style logic
    let cardClass, nodeClass, centerClass, strokeClass;

    switch (theme) {
        case 'dark':
            cardClass = 'bg-neutral-900/50 border-neutral-800';
            nodeClass = 'bg-neutral-800 border-teal-900 text-neutral-200';
            centerClass = 'bg-teal-400/10 border-teal-500/50';
            strokeClass = 'stroke-teal-900';
            break;
        case 'light':
            cardClass = 'bg-white border-neutral-300 shadow-inner';
            nodeClass = 'bg-white border-stone-300 text-stone-800';
            centerClass = 'bg-teal-600/10 border-teal-600/30';
            strokeClass = 'stroke-stone-300';
            break;
        case 'midnight':
            cardClass = 'bg-slate-900/50 border-slate-800';
            nodeClass = 'bg-slate-800 border-indigo-500 text-indigo-100';
            centerClass = 'bg-indigo-500/10 border-indigo-500/50';
            strokeClass = 'stroke-indigo-900';
            break;
        case 'spring':
            cardClass = 'bg-white/60 backdrop-blur-md border-stone-300 shadow-lg';
            nodeClass = 'bg-white border-stone-300 text-stone-800';
            centerClass = 'bg-stone-600/10 border-stone-400/30';
            strokeClass = 'stroke-stone-300';
            break;
        case 'nature':
            cardClass = 'bg-stone-900/40 backdrop-blur-sm border-stone-700';
            nodeClass = 'bg-stone-800 border-lime-800 text-stone-200';
            centerClass = 'bg-lime-500/10 border-lime-500/30';
            strokeClass = 'stroke-lime-900';
            break;
        case 'musgravite':
            cardClass = 'bg-purple-900/20 backdrop-blur-sm border-purple-800/30';
            nodeClass = 'bg-purple-950/50 border-purple-700 text-purple-100';
            centerClass = 'bg-purple-400/10 border-purple-400/30';
            strokeClass = 'stroke-purple-800/50';
            break;
        case 'ruby':
            cardClass = 'bg-red-950/20 backdrop-blur-sm border-red-900/30';
            nodeClass = 'bg-red-950/50 border-red-800 text-red-100';
            centerClass = 'bg-red-500/10 border-red-500/30';
            strokeClass = 'stroke-red-900/50';
            break;
        case 'emerald':
            cardClass = 'bg-emerald-950/20 backdrop-blur-sm border-emerald-900/30';
            nodeClass = 'bg-emerald-950/50 border-emerald-800 text-emerald-100';
            centerClass = 'bg-emerald-500/10 border-emerald-500/30';
            strokeClass = 'stroke-emerald-900/50';
            break;
        default:
            cardClass = '';
            nodeClass = '';
    }

    return (
        <div className={`relative w-full h-64 md:h-96 border rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-700 ${cardClass}`}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50%" y1="50%" x2="20%" y2="30%" className={strokeClass} strokeWidth="1" />
                <line x1="50%" y1="50%" x2="80%" y2="30%" className={strokeClass} strokeWidth="1" />
                <line x1="50%" y1="50%" x2="30%" y2="70%" className={strokeClass} strokeWidth="1" />
                <line x1="50%" y1="50%" x2="70%" y2="80%" className={strokeClass} strokeWidth="1" />
                <line x1="20%" y1="30%" x2="30%" y2="70%" className={strokeClass} strokeWidth="1" />
            </svg>
            
            {nodes.map((node, i) => (
                <div 
                    key={i}
                    className={`absolute flex items-center justify-center rounded-full shadow-sm text-[10px] font-bold transition-transform cursor-pointer z-10 border-2 ${nodeClass}`}
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${node.size * 3}px`,
                        height: `${node.size * 3}px`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <span className="opacity-0 hover:opacity-100 transition-opacity absolute -top-6 whitespace-nowrap px-2 py-1 rounded text-xs bg-black text-white">
                        {node.label}
                    </span>
                </div>
            ))}
            
             <div 
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 flex items-center justify-center animate-pulse z-0 ${centerClass}`}
             />
        </div>
    )
}

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

  const desktopNavLinks = [
    { name: "Education", id: "education" },
    { name: "Research", id: "research" },
    { name: "Projects", id: "projects" },
    { name: "Publications", id: "publications" },
    { name: "Career", id: "career" }
  ];

  const allNavLinks = [
    { name: "About", id: "about" },
    { name: "Education", id: "education" },
    { name: "Research", id: "research" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Skills", id: "skills" },
    { name: "Publications", id: "publications" },
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
    } else if (id === 'hobbies' && showHobbies) {
       // Edge case: sometimes element might not be ready? usually React handles this.
    }
  };

  const handleFloatingButtonClick = () => {
    if (scrollDir === 'down') {
        scrollToSection('contact');
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
  
  const getCardStyle = () => {
      switch (theme) {
          case 'dark': return 'bg-transparent border-neutral-800 hover:bg-white/5 hover:border-neutral-700';
          case 'light': return 'bg-transparent border-stone-300 text-stone-900 hover:bg-white hover:border-stone-400 hover:shadow-md';
          case 'midnight': return 'bg-transparent border-slate-800 text-slate-200 hover:bg-white/5 hover:border-indigo-500/50';
          case 'spring': return 'bg-transparent border-stone-300 text-stone-900 hover:bg-white/60 hover:border-stone-400 hover:shadow-md';
          case 'nature': return 'bg-transparent border-stone-700 text-stone-200 hover:bg-stone-800/60 hover:border-lime-800';
          case 'musgravite': return 'bg-transparent border-purple-800/30 text-purple-50 hover:bg-purple-900/30 hover:border-purple-500/30';
          case 'ruby': return 'bg-transparent border-rose-900/30 text-rose-50 hover:bg-rose-950/40 hover:border-rose-500/30';
          case 'emerald': return 'bg-transparent border-emerald-900/30 text-emerald-50 hover:bg-emerald-950/40 hover:border-emerald-500/30';
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
      if (theme === 'dark') return 'bg-neutral-950/90 border-neutral-800 backdrop-blur-3xl';
      if (theme === 'light') return 'bg-white/90 border-stone-200 backdrop-blur-3xl';
      if (theme === 'midnight') return 'bg-slate-950/90 border-slate-800 backdrop-blur-3xl';
      if (theme === 'spring') return 'bg-white/70 backdrop-blur-3xl border-stone-200';
      return 'backdrop-blur-3xl border-white/10 bg-black/50';
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
            <div key={idx} className={`relative group overflow-hidden rounded-xl border aspect-square ${getCardStyle()}`}>
                <div className={`absolute inset-0 flex items-center justify-center bg-black/5 z-0`}>
                    {hobby.type === 'image' ? <Camera className="w-12 h-12 opacity-20" /> : <Video className="w-12 h-12 opacity-20" />}
                </div>
                {/* If you had real images, you'd use <img src={hobby.src} /> here */}
                
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
            <div className={`w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95
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
                                <div key={i} className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 hover:bg-black/5 transition-colors cursor-pointer group
                                    ${(theme === 'light' || theme === 'spring') ? 'border-stone-200' : 'border-white/10'}`}>
                                    {file.type === 'image' && <FileImage className={`w-8 h-8 ${getAccentColor()}`} />}
                                    {file.type === 'code' && <FileCode className={`w-8 h-8 ${getAccentColor()}`} />}
                                    {file.type === 'pdf' && <FileText className={`w-8 h-8 ${getAccentColor()}`} />}
                                    <span className="text-xs font-medium text-center truncate w-full">{file.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center opacity-50 border-2 border-dashed rounded-xl border-current">
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
            <div className={`w-full max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95
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
          <div className={`w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border animate-in fade-in zoom-in-95 duration-200
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
                    className={`block w-full text-left text-base font-medium opacity-90 hover:opacity-100 ${getMenuLinkHoverStyle()}`}
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

          <div className="hidden md:flex items-center h-full gap-0">
            {desktopNavLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm h-full flex items-center px-6 font-medium transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] opacity-90 ${getNavHoverColor()} 
                    ${(theme === 'light' || theme === 'spring') ? 'text-stone-600' : 'text-white'}`}
              >
                {link.name}
              </button>
            ))}
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
            <button 
                className={`px-8 py-3.5 border rounded-lg font-medium transition-colors flex items-center gap-2
                    ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 hover:bg-white' : 
                      'border-white/30 hover:bg-white/10 text-white'}`}
            >
              <Download className="w-4 h-4" /> Download CV
            </button>
          </div>

          {/* Social Icons with Square Rounded Style */}
          <div className="flex items-center justify-center gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700">
            {[
              { icon: Mail, link: PORTFOLIO_DATA.profile.social.email },
              { icon: Linkedin, link: PORTFOLIO_DATA.profile.social.linkedin },
              { icon: MessageCircle, link: PORTFOLIO_DATA.profile.social.whatsapp },
              { icon: Facebook, link: PORTFOLIO_DATA.profile.social.facebook },
              { icon: Instagram, link: PORTFOLIO_DATA.profile.social.instagram },
              { icon: Twitter, link: PORTFOLIO_DATA.profile.social.twitter },
              { icon: Send, link: PORTFOLIO_DATA.profile.social.telegram },
            ].map((social, idx) => (
                <a key={idx} href={social.link} target="_blank" rel="noreferrer" className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 hover:scale-110 ${getGlowStyle()}`}>
                    <social.icon className="w-5 h-5" />
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
                <p className="text-lg opacity-80 leading-relaxed mb-6">
                    {PORTFOLIO_DATA.profile.bio}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {PORTFOLIO_DATA.metrics.map((m, i) => (
                        <div key={i} className={`border-l-2 pl-4 py-2 pr-2 rounded-r-xl transition-all duration-300 group
                            ${(theme === 'light' || theme === 'spring') ? 'border-stone-300 hover:bg-white' : 'border-white/20 hover:bg-white/5'}`}>
                            <div className={`text-3xl font-bold transition-colors ${getHoverTextColor()}`}>{m.value}</div>
                            <div className="text-sm opacity-60 uppercase tracking-wide">{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative">
                <div className={`aspect-square rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 ease-out
                    ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10 backdrop-blur-md'}`}>
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br
                        ${(theme === 'light' || theme === 'spring') ? 'from-stone-200 to-stone-300' : 'from-white/5 to-white/10'}`}>
                        <User className="w-32 h-32 opacity-50" />
                    </div>
                </div>
            </div>
        </div>
      </Section>

      {/* --- EDUCATION SECTION --- */}
      <Section id="education">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
                <h2 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3">
                    <GraduationCap className={`w-8 h-8 ${getAccentColor()}`} />
                    Education
                </h2>
                <p className="opacity-70">
                    A timeline of my academic qualifications and research milestones.
                </p>
            </div>
            <div className="md:w-2/3 space-y-0">
                {/* Continuous Vertical Line Container */}
                <div className={`border-l-2 py-2 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                    {PORTFOLIO_DATA.education.map((edu, idx) => (
                        <div key={idx} className={`relative group pl-8 p-4 rounded-r-xl transition-all duration-300 border-transparent
                            ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 
                              'hover:bg-white/5'}`}>
                            
                            {/* Outer Circle (Static) */}
                            <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                                {/* Inner Dot (Changes Color) */}
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                            </div>
                            
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
                    ))}
                </div>
            </div>
          </div>
      </Section>

      {/* --- RESEARCH SECTION --- */}
      <Section id="research">
        <div className="mb-12">
             <h2 className="text-3xl font-serif font-bold mb-6">Research Interests</h2>
             <p className="opacity-70 max-w-2xl">
                 Bridging physical infrastructure with digital intelligence.
             </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
             <ResearchNetwork theme={theme} />
             <div className="space-y-6">
                 {PORTFOLIO_DATA.research_interests.map((interest, i) => (
                     <div key={i} className={`group flex items-center justify-between gap-4 p-4 rounded-xl border transition-all cursor-pointer duration-300
                        ${getCardStyle()}`}>
                          <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                 ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200 text-stone-600' : (theme === 'midnight' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/20 text-white')}`}>
                                 <ArrowUpRight className={`w-5 h-5 group-hover:rotate-45 transition-transform duration-300 ${getHoverTextColor()}`} />
                              </div>
                              <span className={`text-lg font-medium transition-colors duration-300 ${getHoverTextColor()}`}>{interest.topic}</span>
                          </div>
                          {/* Inside options blank indicator */}
                          <ChevronDown className="w-5 h-5 opacity-30" />
                     </div>
                 ))}
             </div>
        </div>
      </Section>

      {/* --- PROJECTS --- */}
      <Section id="projects">
        <h2 className="text-3xl font-serif font-bold mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.projects.map((proj, i) => (
                <div key={i} className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${getCardStyle()}`}>
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-lg shadow-sm ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10'}`}>
                            <Anchor className={`w-6 h-6 ${getAccentColor()}`} />
                        </div>
                        <div className="flex gap-2 flex-wrap justify-end">
                            {proj.stack.map(tech => (
                                <span key={tech} className={`px-2 py-1 text-[10px] font-mono rounded opacity-70
                                    ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10'}`}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 transition-colors ${getHoverTextColor()}`}>
                        {proj.title}
                    </h3>
                    <p className="opacity-70 mb-6">
                        {proj.description}
                    </p>
                    <button 
                        onClick={(e) => { e.preventDefault(); setSelectedProject(proj); }}
                        className={`inline-flex items-center text-sm font-bold hover:underline ${getAccentColor()}`}
                    >
                        View Project <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            ))}
        </div>
      </Section>

      {/* --- CERTIFICATIONS SECTION --- */}
      <Section id="certifications">
        <h2 className="text-3xl font-serif font-bold mb-12">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.certifications.map((cert, i) => (
                <div key={i} className={`flex items-center gap-4 p-6 rounded-xl border transition-all hover:scale-[1.01] ${getCardStyle()}`}>
                    <div className={`p-4 rounded-full ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200' : 'bg-white/10'}`}>
                        <Award className={`w-6 h-6 ${getAccentColor()}`} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-lg leading-tight mb-1">{cert.title}</h4>
                        <div className="text-sm opacity-60 flex gap-2">
                            <span>{cert.issuer}</span>
                            <span>•</span>
                            <span>{cert.date}</span>
                        </div>
                    </div>
                    <a href={cert.link} className={`p-2 rounded-full border transition-colors hover:bg-white/10 opacity-60 hover:opacity-100 
                        ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            ))}
        </div>
      </Section>

      {/* --- SKILLS SECTION (NEW) --- */}
      <Section id="skills">
        <h2 className="text-3xl font-serif font-bold mb-12">Technical Expertise</h2>
        <div className="grid md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.skills.map((skill, i) => (
                <div key={i} className={`group p-6 rounded-xl transition-all duration-300 ${getCardStyle()}`}>
                    <div className="flex justify-between mb-3">
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
            ))}
        </div>
      </Section>

      {/* --- PUBLICATIONS --- */}
      <Section id="publications">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-serif font-bold mb-4">Selected Publications</h2>
                <p className="opacity-70">
                    Peer-reviewed journals in structural engineering and materials science.
                </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
                <button className={`px-4 py-2 text-sm font-medium rounded-md ${(theme === 'light' || theme === 'spring') ? 'bg-stone-200 text-stone-800' : 'bg-white/10 text-white'}`}>
                    All Years
                </button>
            </div>
        </div>

        {/* Citation Graph */}
        <div className="mb-16 h-64 w-full">
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

        {/* Publication List */}
        <div className="space-y-6">
            {PORTFOLIO_DATA.publications.map((pub) => (
                <div key={pub.id} className={`group p-6 rounded-xl border transition-all duration-300 ${getCardStyle()}`}>
                    <div className="flex justify-between items-start">
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
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className={`p-2 rounded-full hover:bg-black/5 hover:${getAccentColor()}`} title="Download PDF">
                                <FileText className="w-5 h-5" />
                            </button>
                            <button className={`p-2 rounded-full hover:bg-black/5 hover:${getAccentColor()}`} title="Cite">
                                <Award className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </Section>

      {/* --- HOBBIES SECTION (SHOWN WHEN VISIBLE) --- */}
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

      {/* --- CAREER / EXPERIENCE --- */}
      <Section id="career">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
                <h2 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3">
                    <Briefcase className={`w-8 h-8 ${getAccentColor()}`} />
                    Experience
                </h2>
                <p className="opacity-70">
                    Professional appointments and history.
                </p>
            </div>
            <div className="md:w-2/3 space-y-0">
                <div className={`border-l-2 py-2 ${(theme === 'light' || theme === 'spring') ? 'border-stone-300' : 'border-white/20'}`}>
                    {PORTFOLIO_DATA.experience.map((exp, idx) => (
                        <div key={idx} className={`relative group pl-8 p-4 rounded-r-xl transition-all duration-300 border-transparent
                            ${(theme === 'light' || theme === 'spring') ? 'hover:bg-white' : 
                              'hover:bg-white/5'}`}>
                            
                            {/* Outer Circle (Static) */}
                            <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                ${(theme === 'light' || theme === 'spring') ? 'bg-white border-stone-300' : 'bg-neutral-950 border-neutral-700'}`}>
                                {/* Inner Dot (Changes Color) */}
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${getHoverBgColor()}`} />
                            </div>
                            
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
                    ))}
                </div>
            </div>
          </div>
      </Section>

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
