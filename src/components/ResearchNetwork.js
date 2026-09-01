import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ResearchNetwork = ({ theme, interests = [], selectedId, onSelect }) => {
    const wrapRef = useRef(null);
    const simRef = useRef(null);
    const selectedRef = useRef(selectedId);
    const [frame, setFrame] = useState({ w: 0, h: 0, nodes: [] });

    selectedRef.current = selectedId;

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || !interests.length) return;

        const measure = () => ({ w: el.clientWidth || 800, h: el.clientHeight || 480 });
        let { w, h } = measure();

        const nodes = interests.map((item, i) => {
            const ang = (i / interests.length) * Math.PI * 2;
            return {
                ...item,
                x: w / 2 + Math.cos(ang) * Math.min(w, h) * 0.28,
                y: h / 2 + Math.sin(ang) * Math.min(w, h) * 0.28,
                vx: 0,
                vy: 0,
                r: 7 + (item.size || 14) * 0.45,
            };
        });

        const links = (PORTFOLIO_DATA.research_links || [])
            .map(([a, b]) => ({
                source: nodes.find((n) => n.id === a),
                target: nodes.find((n) => n.id === b),
            }))
            .filter((l) => l.source && l.target);

        simRef.current = { nodes, links, w, h };

        const tick = () => {
            const sim = simRef.current;
            if (!sim) return;
            const { nodes: ns, links: ls } = sim;
            const W = sim.w;
            const H = sim.h;
            const sel = selectedRef.current;

            for (let i = 0; i < ns.length; i++) {
                for (let j = i + 1; j < ns.length; j++) {
                    let dx = ns[j].x - ns[i].x;
                    let dy = ns[j].y - ns[i].y;
                    let d2 = dx * dx + dy * dy || 1;
                    let d = Math.sqrt(d2);
                    const minD = ns[i].r + ns[j].r + 28;
                    let force = 420 / d2;
                    if (d < minD) force += (minD - d) * 0.08;
                    const fx = (dx / d) * force;
                    const fy = (dy / d) * force;
                    ns[i].vx -= fx;
                    ns[i].vy -= fy;
                    ns[j].vx += fx;
                    ns[j].vy += fy;
                }
            }

            ls.forEach((l) => {
                const dx = l.target.x - l.source.x;
                const dy = l.target.y - l.source.y;
                const d = Math.sqrt(dx * dx + dy * dy) || 1;
                const rest = 92;
                const k = (d - rest) * 0.012;
                const fx = (dx / d) * k;
                const fy = (dy / d) * k;
                l.source.vx += fx;
                l.source.vy += fy;
                l.target.vx -= fx;
                l.target.vy -= fy;
            });

            ns.forEach((n) => {
                n.vx += (W / 2 - n.x) * 0.008;
                n.vy += (H / 2 - n.y) * 0.008;
                if (sel && n.id === sel) {
                    n.vx += (W / 2 - n.x) * 0.06;
                    n.vy += (H * 0.38 - n.y) * 0.06;
                }
                n.vx *= 0.86;
                n.vy *= 0.86;
                n.x += n.vx;
                n.y += n.vy;
                const pad = n.r + 36;
                n.x = Math.max(pad, Math.min(W - pad, n.x));
                n.y = Math.max(pad, Math.min(H - pad, n.y));
            });

            setFrame({
                w: W,
                h: H,
                nodes: ns.map((n) => ({ id: n.id, x: n.x, y: n.y, r: n.r, short: n.short, topic: n.topic })),
            });
        };

        let raf;
        const loop = () => {
            tick();
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onResize = () => {
            const m = measure();
            if (simRef.current) {
                simRef.current.w = m.w;
                simRef.current.h = m.h;
            }
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
            simRef.current = null;
        };
    }, [interests]);

    let cardClass, fill, stroke, labelCls, ring, line;
    switch (theme) {
        case 'light':
        case 'spring':
            cardClass = 'bg-white/70 border-stone-200';
            fill = '#ffffff';
            stroke = '#0d9488';
            labelCls = 'text-stone-800';
            ring = '#0d9488';
            line = 'rgba(13,148,136,0.35)';
            break;
        case 'midnight':
            cardClass = 'bg-slate-900/50 border-slate-800';
            fill = '#1e293b';
            stroke = '#818cf8';
            labelCls = 'text-indigo-50';
            ring = '#818cf8';
            line = 'rgba(129,140,248,0.35)';
            break;
        case 'nature':
            cardClass = 'bg-stone-900/40 border-stone-700';
            fill = '#292524';
            stroke = '#84cc16';
            labelCls = 'text-stone-100';
            ring = '#84cc16';
            line = 'rgba(132,204,22,0.35)';
            break;
        case 'musgravite':
            cardClass = 'bg-purple-950/30 border-purple-800/40';
            fill = '#3b0764';
            stroke = '#c084fc';
            labelCls = 'text-purple-50';
            ring = '#c084fc';
            line = 'rgba(192,132,252,0.35)';
            break;
        case 'ruby':
            cardClass = 'bg-red-950/20 border-red-900/40';
            fill = '#450a0a';
            stroke = '#f87171';
            labelCls = 'text-red-50';
            ring = '#f87171';
            line = 'rgba(248,113,113,0.35)';
            break;
        case 'emerald':
            cardClass = 'bg-emerald-950/20 border-emerald-900/40';
            fill = '#022c22';
            stroke = '#34d399';
            labelCls = 'text-emerald-50';
            ring = '#34d399';
            line = 'rgba(52,211,153,0.35)';
            break;
        default:
            cardClass = 'bg-neutral-900/50 border-white/10';
            fill = '#262626';
            stroke = '#2dd4bf';
            labelCls = 'text-neutral-100';
            ring = '#2dd4bf';
            line = 'rgba(45,212,191,0.32)';
    }

    const links = (PORTFOLIO_DATA.research_links || [])
        .map(([a, b]) => {
            const s = frame.nodes.find((n) => n.id === a);
            const t = frame.nodes.find((n) => n.id === b);
            return s && t ? { s, t } : null;
        })
        .filter(Boolean);

    return (
        <div ref={wrapRef} className={`relative w-full h-[28rem] md:h-[36rem] border rounded-lg overflow-hidden ${cardClass}`}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {links.map((l, i) => (
                    <line
                        key={i}
                        x1={l.s.x}
                        y1={l.s.y}
                        x2={l.t.x}
                        y2={l.t.y}
                        stroke={line}
                        strokeWidth={selectedId && (l.s.id === selectedId || l.t.id === selectedId) ? 2 : 1}
                    />
                ))}
                {frame.nodes.map((n) => (
                    <circle
                        key={n.id + '-c'}
                        cx={n.x}
                        cy={n.y}
                        r={selectedId === n.id ? n.r + 3 : n.r}
                        fill={fill}
                        stroke={selectedId === n.id ? ring : stroke}
                        strokeWidth={selectedId === n.id ? 3 : 2}
                    />
                ))}
            </svg>

            {frame.nodes.map((n) => (
                <button
                    type="button"
                    key={n.id}
                    onClick={() => onSelect && onSelect(selectedId === n.id ? null : n.id)}
                    className="absolute z-10 -translate-x-1/2 text-center"
                    style={{ left: n.x, top: n.y + n.r + 2, width: 108 }}
                    title={n.topic}
                >
                    <span className={`block text-[10px] md:text-[11px] font-semibold leading-tight ${labelCls}`}>
                        {n.short}
                    </span>
                </button>
            ))}

            {/* invisible hit targets on the circles */}
            {frame.nodes.map((n) => (
                <button
                    type="button"
                    key={n.id + '-hit'}
                    aria-label={n.topic}
                    onClick={() => onSelect && onSelect(selectedId === n.id ? null : n.id)}
                    className="absolute z-20 rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ left: n.x, top: n.y, width: n.r * 2 + 8, height: n.r * 2 + 8 }}
                    title={n.topic}
                />
            ))}
        </div>
    );
};
