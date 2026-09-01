import React from 'react';

// 3. Research Network
export const ResearchNetwork = ({ theme }) => {
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
            cardClass = 'bg-neutral-900/50 border-transparent hover:border-neutral-800'; 
            nodeClass = 'bg-neutral-800 border-teal-900 text-neutral-200';
            centerClass = 'bg-teal-400/10 border-teal-500/50';
            strokeClass = 'stroke-teal-900';
            break;
        case 'light':
            cardClass = 'bg-white border-transparent hover:border-stone-300 shadow-sm'; 
            nodeClass = 'bg-white border-stone-300 text-stone-800';
            centerClass = 'bg-teal-600/10 border-teal-600/30';
            strokeClass = 'stroke-stone-300';
            break;
        case 'midnight':
            cardClass = 'bg-slate-900/50 border-transparent hover:border-slate-800';
            nodeClass = 'bg-slate-800 border-indigo-500 text-indigo-100';
            centerClass = 'bg-indigo-500/10 border-indigo-500/50';
            strokeClass = 'stroke-indigo-900';
            break;
        case 'spring':
            cardClass = 'bg-white/60 backdrop-blur-md border-transparent hover:border-stone-300 shadow-lg';
            nodeClass = 'bg-white border-stone-300 text-stone-800';
            centerClass = 'bg-stone-600/10 border-stone-400/30';
            strokeClass = 'stroke-stone-300';
            break;
        case 'nature':
            cardClass = 'bg-stone-900/40 backdrop-blur-sm border-transparent hover:border-stone-700';
            nodeClass = 'bg-stone-800 border-lime-800 text-stone-200';
            centerClass = 'bg-lime-500/10 border-lime-500/30';
            strokeClass = 'stroke-lime-900';
            break;
        case 'musgravite':
            cardClass = 'bg-purple-900/20 backdrop-blur-sm border-transparent hover:border-purple-800/30';
            nodeClass = 'bg-purple-950/50 border-purple-700 text-purple-100';
            centerClass = 'bg-purple-400/10 border-purple-400/30';
            strokeClass = 'stroke-purple-800/50';
            break;
        case 'ruby':
            cardClass = 'bg-red-950/20 backdrop-blur-sm border-transparent hover:border-red-900/30';
            nodeClass = 'bg-red-950/50 border-red-800 text-red-100';
            centerClass = 'bg-red-500/10 border-red-500/30';
            strokeClass = 'stroke-red-900/50';
            break;
        case 'emerald':
            cardClass = 'bg-emerald-950/20 backdrop-blur-sm border-transparent hover:border-emerald-900/30';
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
