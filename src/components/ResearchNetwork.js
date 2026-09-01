import React from 'react';

export const ResearchNetwork = ({ theme, interests = [], selectedId, onSelect }) => {
    let cardClass, nodeNow, nodePhd, hubClass, strokeNow, strokePhd, labelNow, labelPhd;

    switch (theme) {
        case 'light':
        case 'spring':
            cardClass = 'bg-white/70 border-stone-200 shadow-sm';
            nodeNow = 'bg-white border-teal-600 text-stone-900';
            nodePhd = 'bg-white border-stone-400 border-dashed text-stone-700';
            hubClass = 'bg-teal-600/15 border-teal-600 text-teal-800';
            strokeNow = 'stroke-teal-600/40';
            strokePhd = 'stroke-stone-400/50';
            labelNow = 'text-stone-800';
            labelPhd = 'text-stone-600';
            break;
        case 'midnight':
            cardClass = 'bg-slate-900/50 border-slate-800';
            nodeNow = 'bg-slate-800 border-indigo-400 text-indigo-50';
            nodePhd = 'bg-slate-900 border-indigo-400/50 border-dashed text-indigo-100';
            hubClass = 'bg-indigo-500/15 border-indigo-400 text-indigo-100';
            strokeNow = 'stroke-indigo-400/40';
            strokePhd = 'stroke-indigo-400/25';
            labelNow = 'text-indigo-50';
            labelPhd = 'text-indigo-200';
            break;
        case 'nature':
            cardClass = 'bg-stone-900/40 border-stone-700';
            nodeNow = 'bg-stone-800 border-lime-500 text-stone-100';
            nodePhd = 'bg-stone-900 border-lime-700 border-dashed text-stone-200';
            hubClass = 'bg-lime-500/15 border-lime-500 text-lime-100';
            strokeNow = 'stroke-lime-600/40';
            strokePhd = 'stroke-lime-800/50';
            labelNow = 'text-stone-100';
            labelPhd = 'text-stone-300';
            break;
        case 'musgravite':
            cardClass = 'bg-purple-950/30 border-purple-800/40';
            nodeNow = 'bg-purple-950/80 border-purple-400 text-purple-50';
            nodePhd = 'bg-purple-950/40 border-purple-500/60 border-dashed text-purple-100';
            hubClass = 'bg-purple-400/15 border-purple-300 text-purple-50';
            strokeNow = 'stroke-purple-400/40';
            strokePhd = 'stroke-purple-700/50';
            labelNow = 'text-purple-50';
            labelPhd = 'text-purple-200';
            break;
        case 'ruby':
            cardClass = 'bg-red-950/20 border-red-900/40';
            nodeNow = 'bg-red-950/80 border-red-400 text-red-50';
            nodePhd = 'bg-red-950/40 border-red-500/60 border-dashed text-red-100';
            hubClass = 'bg-red-500/15 border-red-400 text-red-50';
            strokeNow = 'stroke-red-400/40';
            strokePhd = 'stroke-red-800/50';
            labelNow = 'text-red-50';
            labelPhd = 'text-red-200';
            break;
        case 'emerald':
            cardClass = 'bg-emerald-950/20 border-emerald-900/40';
            nodeNow = 'bg-emerald-950/80 border-emerald-400 text-emerald-50';
            nodePhd = 'bg-emerald-950/40 border-emerald-500/60 border-dashed text-emerald-100';
            hubClass = 'bg-emerald-500/15 border-emerald-400 text-emerald-50';
            strokeNow = 'stroke-emerald-400/40';
            strokePhd = 'stroke-emerald-800/50';
            labelNow = 'text-emerald-50';
            labelPhd = 'text-emerald-200';
            break;
        default:
            cardClass = 'bg-neutral-900/50 border-white/10';
            nodeNow = 'bg-neutral-800 border-teal-400 text-neutral-100';
            nodePhd = 'bg-neutral-900 border-teal-700 border-dashed text-neutral-200';
            hubClass = 'bg-teal-400/10 border-teal-400 text-teal-100';
            strokeNow = 'stroke-teal-500/40';
            strokePhd = 'stroke-teal-800/60';
            labelNow = 'text-neutral-100';
            labelPhd = 'text-neutral-300';
    }

    const hub = { x: 50, y: 50 };

    return (
        <div className={`relative w-full h-[22rem] md:h-[28rem] border rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-700 ${cardClass}`}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {interests.map((n) => (
                    <line
                        key={n.id}
                        x1={hub.x}
                        y1={hub.y}
                        x2={n.x}
                        y2={n.y}
                        className={n.status === 'now' ? strokeNow : strokePhd}
                        strokeWidth={selectedId === n.id ? 0.6 : 0.35}
                        vectorEffect="non-scaling-stroke"
                    />
                ))}
            </svg>

            <button
                type="button"
                onClick={() => onSelect && onSelect(null)}
                className={`absolute z-10 rounded-full border-2 flex flex-col items-center justify-center text-center px-2 ${hubClass}`}
                style={{ left: '50%', top: '50%', width: 88, height: 88, transform: 'translate(-50%, -50%)' }}
                title="Current research core"
            >
                <span className="text-[10px] font-bold leading-tight">Earthquake<br/>Geotech</span>
            </button>

            {interests.map((node) => {
                const active = selectedId === node.id;
                const isNow = node.status === 'now';
                const size = isNow ? 72 : 64;
                return (
                    <button
                        type="button"
                        key={node.id}
                        onClick={() => onSelect && onSelect(node.id)}
                        className={`absolute z-10 rounded-full border-2 flex items-center justify-center text-center px-1.5 leading-tight transition-all duration-300 hover:scale-110 focus:outline-none ${isNow ? nodeNow : nodePhd} ${active ? 'scale-110 ring-2 ring-offset-2 ring-offset-transparent' : ''}`}
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            width: size,
                            height: size,
                            transform: 'translate(-50%, -50%)',
                        }}
                        title={node.topic}
                    >
                        <span className={`text-[9px] md:text-[10px] font-semibold ${isNow ? labelNow : labelPhd}`}>
                            {node.short}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
