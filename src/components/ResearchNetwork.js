import React, { useEffect, useRef, useState } from 'react';

export const ResearchNetwork = ({ theme, interests = [], selectedId, onSelect }) => {
    const wrapRef = useRef(null);
    const [tick, setTick] = useState(0);
    const t0 = useRef(performance.now());

    useEffect(() => {
        let raf;
        const loop = (now) => {
            setTick((now - t0.current) / 1000);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    let cardClass, fill, stroke, hubClass, labelCls, ring;
    switch (theme) {
        case 'light':
        case 'spring':
            cardClass = 'bg-white/70 border-stone-200';
            fill = 'bg-white';
            stroke = 'border-teal-600';
            hubClass = 'bg-teal-600/15 border-teal-600 text-teal-800';
            labelCls = 'text-stone-800';
            ring = 'ring-teal-600';
            break;
        case 'midnight':
            cardClass = 'bg-slate-900/50 border-slate-800';
            fill = 'bg-slate-800';
            stroke = 'border-indigo-400';
            hubClass = 'bg-indigo-500/15 border-indigo-400 text-indigo-100';
            labelCls = 'text-indigo-50';
            ring = 'ring-indigo-400';
            break;
        case 'nature':
            cardClass = 'bg-stone-900/40 border-stone-700';
            fill = 'bg-stone-800';
            stroke = 'border-lime-500';
            hubClass = 'bg-lime-500/15 border-lime-500 text-lime-100';
            labelCls = 'text-stone-100';
            ring = 'ring-lime-400';
            break;
        case 'musgravite':
            cardClass = 'bg-purple-950/30 border-purple-800/40';
            fill = 'bg-purple-950';
            stroke = 'border-purple-400';
            hubClass = 'bg-purple-400/15 border-purple-300 text-purple-50';
            labelCls = 'text-purple-50';
            ring = 'ring-purple-300';
            break;
        case 'ruby':
            cardClass = 'bg-red-950/20 border-red-900/40';
            fill = 'bg-red-950';
            stroke = 'border-red-400';
            hubClass = 'bg-red-500/15 border-red-400 text-red-50';
            labelCls = 'text-red-50';
            ring = 'ring-red-400';
            break;
        case 'emerald':
            cardClass = 'bg-emerald-950/20 border-emerald-900/40';
            fill = 'bg-emerald-950';
            stroke = 'border-emerald-400';
            hubClass = 'bg-emerald-500/15 border-emerald-400 text-emerald-50';
            labelCls = 'text-emerald-50';
            ring = 'ring-emerald-400';
            break;
        default:
            cardClass = 'bg-neutral-900/50 border-white/10';
            fill = 'bg-neutral-800';
            stroke = 'border-teal-400';
            hubClass = 'bg-teal-400/10 border-teal-400 text-teal-100';
            labelCls = 'text-neutral-100';
            ring = 'ring-teal-400';
    }

    const n = interests.length || 1;
    const placed = interests.map((item, i) => {
        const speed = 0.08 + (item.drift || 0.05);
        const base = (i / n) * Math.PI * 2;
        const angle = base + tick * speed;
        const radius = selectedId === item.id ? 18 : 28 + (item.size || 16) * 0.35 + Math.sin(tick * 0.6 + i) * 2.2;
        let x = 50 + Math.cos(angle) * radius;
        let y = 50 + Math.sin(angle) * radius * 0.78;
        if (selectedId === item.id) {
            x = 50 + Math.sin(tick * 0.4) * 2;
            y = 30 + Math.cos(tick * 0.4) * 1.5;
        }
        x = Math.min(92, Math.max(8, x));
        y = Math.min(88, Math.max(12, y));
        return { ...item, x, y, px: 22 + (item.size || 14) };
    });

    const lineColor = (theme === 'light' || theme === 'spring') ? 'rgba(13,148,136,0.35)' : 'rgba(45,212,191,0.28)';

    return (
        <div ref={wrapRef} className={`relative w-full h-[26rem] md:h-[34rem] border rounded-lg overflow-hidden ${cardClass}`}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {placed.map((p) => (
                    <line key={p.id} x1="50" y1="50" x2={p.x} y2={p.y} stroke={lineColor} strokeWidth={selectedId === p.id ? 0.7 : 0.28} vectorEffect="non-scaling-stroke" />
                ))}
            </svg>

            <button
                type="button"
                onClick={() => onSelect && onSelect(null)}
                className={`absolute z-20 rounded-full border-2 flex items-center justify-center text-center ${hubClass}`}
                style={{ left: '50%', top: '50%', width: 76, height: 76, transform: 'translate(-50%, -50%)' }}
                title="Reset"
            >
                <span className="text-[9px] font-bold leading-tight">Earthquake<br />Geotech</span>
            </button>

            {placed.map((node) => {
                const active = selectedId === node.id;
                const labelAbove = node.y > 55;
                return (
                    <button
                        type="button"
                        key={node.id}
                        onClick={() => onSelect && onSelect(active ? null : node.id)}
                        className={`absolute z-10 flex flex-col items-center ${active ? 'z-30' : ''}`}
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: 'translate(-50%, -50%)',
                            width: 110,
                        }}
                        title={node.topic}
                    >
                        {labelAbove && (
                            <span className={`mb-1 text-[10px] md:text-[11px] font-semibold leading-tight text-center whitespace-normal ${labelCls}`}>
                                {node.short}
                            </span>
                        )}
                        <span
                            className={`rounded-full border-2 ${fill} ${stroke} ${active ? `ring-2 ${ring}` : ''} transition-transform duration-500`}
                            style={{ width: node.px, height: node.px }}
                        />
                        {!labelAbove && (
                            <span className={`mt-1 text-[10px] md:text-[11px] font-semibold leading-tight text-center whitespace-normal ${labelCls}`}>
                                {node.short}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};
