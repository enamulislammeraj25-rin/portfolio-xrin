import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ResearchNetwork = ({ theme, interests = [], selectedId, onSelect }) => {
    const wrapRef = useRef(null);
    const simRef = useRef(null);
    const selectedRef = useRef(selectedId);
    const dragRef = useRef(null);
    const [frame, setFrame] = useState({ w: 0, h: 0, nodes: [] });
    const [hoverId, setHoverId] = useState(null);

    selectedRef.current = selectedId;

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || !interests.length) return;

        const measure = () => ({ w: Math.max(320, el.clientWidth), h: Math.max(320, el.clientHeight) });
        let { w, h } = measure();

        const palette = [
            '#7DD3C7', '#8EC5F0', '#C4B5FD', '#F3B48B',
            '#86E3CE', '#F6D58A', '#7EB6D9', '#F2A7C3',
            '#6EE7B7', '#93C5FD', '#F0C987', '#A5B4FC',
            '#99E6C3', '#F5B19C', '#67E8F9', '#D8B4FE',
            '#FDE68A', '#5EEAD4', '#BFDBFE', '#F9A8D4',
            '#A7F3D0', '#FCD34D'
        ];
        const nodes = interests.map((item, i) => ({
            ...item,
            x: w / 2 + (Math.random() - 0.5) * 16,
            y: h / 2 + (Math.random() - 0.5) * 16,
            vx: 0,
            vy: 0,
            r: 6 + (item.size || 14) * 0.28,
            color: palette[i % palette.length],
        }));

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
            const drag = dragRef.current;

            for (let i = 0; i < ns.length; i++) {
                for (let j = i + 1; j < ns.length; j++) {
                    let dx = ns[j].x - ns[i].x;
                    let dy = ns[j].y - ns[i].y;
                    let d2 = dx * dx + dy * dy || 0.01;
                    let d = Math.sqrt(d2);
                    const minD = ns[i].r + ns[j].r + 64;
                    let force = 2600 / d2;
                    if (d < minD) force += (minD - d) * 0.22;
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
                const rest = 168;
                const k = (d - rest) * 0.014;
                const fx = (dx / d) * k;
                const fy = (dy / d) * k;
                l.source.vx += fx;
                l.source.vy += fy;
                l.target.vx -= fx;
                l.target.vy -= fy;
            });

            ns.forEach((n) => {
                if (drag && drag.id === n.id) {
                    n.x = drag.x;
                    n.y = drag.y;
                    n.vx = 0;
                    n.vy = 0;
                    return;
                }
                n.vx += (W / 2 - n.x) * 0.0035;
                n.vy += (H / 2 - n.y) * 0.0035;
                if (sel && n.id === sel) {
                    n.vx += (W / 2 - n.x) * 0.05;
                    n.vy += (H * 0.4 - n.y) * 0.05;
                }
                n.vx *= 0.82;
                n.vy *= 0.82;
                n.x += n.vx;
                n.y += n.vy;
                const pad = n.r + 52;
                n.x = Math.max(pad, Math.min(W - pad, n.x));
                n.y = Math.max(pad, Math.min(H - pad, n.y));
            });

            setFrame({
                w: W,
                h: H,
                nodes: ns.map((n) => ({ id: n.id, x: n.x, y: n.y, r: n.r, short: n.short, topic: n.topic, color: n.color })),
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

    const clientPoint = (e) => {
        const box = wrapRef.current.getBoundingClientRect();
        const src = e.touches ? e.touches[0] : e;
        return { x: src.clientX - box.left, y: src.clientY - box.top };
    };

    const nearest = (x, y) => {
        let best = null;
        let bestD = 28;
        frame.nodes.forEach((n) => {
            const d = Math.hypot(n.x - x, n.y - y);
            if (d < Math.max(bestD, n.r + 10)) {
                bestD = d;
                best = n;
            }
        });
        return best;
    };

    const onDown = (e) => {
        const p = clientPoint(e);
        const n = nearest(p.x, p.y);
        if (!n) return;
        dragRef.current = { id: n.id, x: p.x, y: p.y };
        if (onSelect) onSelect(n.id);
        e.preventDefault();
    };

    const onMove = (e) => {
        if (!dragRef.current) {
            const p = clientPoint(e);
            const n = nearest(p.x, p.y);
            setHoverId(n ? n.id : null);
            return;
        }
        const p = clientPoint(e);
        dragRef.current = { ...dragRef.current, x: p.x, y: p.y };
    };

    const onUp = () => {
        dragRef.current = null;
    };

    let cardClass, fill, stroke, labelCls, ring, line;
    switch (theme) {
        case 'light':
        case 'spring':
            cardClass = 'bg-white/70 border-stone-200';
            fill = '#ffffff';
            stroke = '#0d9488';
            labelCls = 'text-stone-800';
            ring = '#0f766e';
            line = 'rgba(17,24,39,0.38)';
            break;
        case 'midnight':
            cardClass = 'bg-slate-900/50 border-slate-800';
            fill = '#1e293b';
            stroke = '#818cf8';
            labelCls = 'text-indigo-50';
            ring = '#a5b4fc';
            line = 'rgba(17,24,39,0.38)';
            break;
        case 'nature':
            cardClass = 'bg-stone-900/40 border-stone-700';
            fill = '#292524';
            stroke = '#84cc16';
            labelCls = 'text-stone-100';
            ring = '#a3e635';
            line = 'rgba(17,24,39,0.38)';
            break;
        case 'musgravite':
            cardClass = 'bg-purple-950/30 border-purple-800/40';
            fill = '#3b0764';
            stroke = '#c084fc';
            labelCls = 'text-purple-50';
            ring = '#e9d5ff';
            line = 'rgba(17,24,39,0.38)';
            break;
        case 'ruby':
            cardClass = 'bg-red-950/20 border-red-900/40';
            fill = '#450a0a';
            stroke = '#f87171';
            labelCls = 'text-red-50';
            ring = '#fca5a5';
            line = 'rgba(17,24,39,0.38)';
            break;
        case 'emerald':
            cardClass = 'bg-emerald-950/20 border-emerald-900/40';
            fill = '#022c22';
            stroke = '#34d399';
            labelCls = 'text-emerald-50';
            ring = '#6ee7b7';
            line = 'rgba(17,24,39,0.38)';
            break;
        default:
            cardClass = 'bg-neutral-900/50 border-white/10';
            fill = '#262626';
            stroke = '#2dd4bf';
            labelCls = 'text-neutral-100';
            ring = '#5eead4';
            line = 'rgba(17,24,39,0.38)';
    }

    const active = hoverId || selectedId;
    const linked = new Set();
    (PORTFOLIO_DATA.research_links || []).forEach(([a, b]) => {
        if (a === active) linked.add(b);
        if (b === active) linked.add(a);
    });

    const drawnLinks = (PORTFOLIO_DATA.research_links || [])
        .map(([a, b]) => {
            const s = frame.nodes.find((n) => n.id === a);
            const t = frame.nodes.find((n) => n.id === b);
            return s && t ? { s, t, hot: active && (a === active || b === active) } : null;
        })
        .filter(Boolean);

    return (
        <div
            ref={wrapRef}
            className={`relative w-full h-[34rem] md:h-[44rem] border rounded-lg overflow-hidden cursor-grab active:cursor-grabbing ${cardClass}`}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
        >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {drawnLinks.map((l, i) => (
                    <line
                        key={i}
                        x1={l.s.x}
                        y1={l.s.y}
                        x2={l.t.x}
                        y2={l.t.y}
                        stroke={l.hot ? '#0f766e' : line}
                        strokeWidth={l.hot ? 2.2 : 1}
                    />
                ))}
                {frame.nodes.map((n) => (
                    <circle
                        key={n.id}
                        cx={n.x}
                        cy={n.y}
                        r={active === n.id ? n.r + 4 : n.r}
                        fill={n.color || fill}
                        stroke="#111827"
                        strokeWidth={active === n.id ? 3.2 : 2.4}
                    />
                ))}
            </svg>
            {frame.nodes.map((n) => (
                <div
                    key={n.id + '-lab'}
                    className={`absolute pointer-events-none -translate-x-1/2 text-center ${labelCls}`}
                    style={{ left: n.x, top: n.y + n.r + 4, width: 120 }}
                >
                    <span className="text-[10px] md:text-[11px] font-semibold leading-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.45)' }}>{n.short}</span>
                </div>
            ))}
        </div>
    );
};
