import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const PALETTE = [
    '#7DD3C7', '#8EC5F0', '#C4B5FD', '#F3B48B',
    '#86E3CE', '#F6D58A', '#7EB6D9', '#F2A7C3',
    '#6EE7B7', '#93C5FD', '#F0C987', '#A5B4FC',
    '#99E6C3', '#F5B19C', '#67E8F9', '#D8B4FE',
    '#FDE68A', '#5EEAD4', '#BFDBFE', '#F9A8D4',
    '#A7F3D0', '#FCD34D'
];

function strengthToCenter(id, links) {
    const direct = links.find((l) => (l.from === 'core' && l.to === id) || (l.to === 'core' && l.from === id));
    if (direct) return direct.strength;
    const via = links.filter((l) => l.from === id || l.to === id);
    return via.length ? Math.max(...via.map((l) => l.strength)) - 0.5 : 1;
}

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
        const { w, h } = measure();
        const links = PORTFOLIO_DATA.research_links || [];

        const ranked = [...interests].sort((a, b) => strengthToCenter(b.id, links) - strengthToCenter(a.id, links));
        const core = {
            id: 'core',
            short: 'Geotechnical engineering',
            topic: 'Geotechnical engineering',
            x: w / 2,
            y: h / 2,
            hx: w / 2,
            hy: h / 2,
            vx: 0,
            vy: 0,
            r: 22,
            color: '#5EEAD4',
            fixed: true,
        };

        const nodes = [core, ...ranked.map((item, i) => {
            const s = strengthToCenter(item.id, links);
            const ring = s >= 3 ? 0.30 : s >= 2 ? 0.46 : 0.64;
            const ang = (i / ranked.length) * Math.PI * 2 - Math.PI / 2;
            const R = Math.min(w, h) * ring;
            const hx = w / 2 + Math.cos(ang) * R * (w / Math.min(w, h));
            const hy = h / 2 + Math.sin(ang) * R * (h / Math.min(w, h) * 0.92);
            return {
                ...item,
                x: hx,
                y: hy,
                hx,
                hy,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22,
                r: 7 + (item.size || 14) * 0.22,
                color: PALETTE[i % PALETTE.length],
                phase: ang,
                spin: 0.08 + (i % 5) * 0.02,
                fixed: false,
            };
        })];

        const resolved = links
            .map((l) => ({
                ...l,
                source: nodes.find((n) => n.id === l.from),
                target: nodes.find((n) => n.id === l.to),
            }))
            .filter((l) => l.source && l.target);

        simRef.current = { nodes, links: resolved, w, h, t: 0 };

        const tick = () => {
            const sim = simRef.current;
            if (!sim) return;
            const { nodes: ns } = sim;
            const W = sim.w;
            const H = sim.h;
            const sel = selectedRef.current;
            const drag = dragRef.current;
            sim.t += 1;
            const t = sim.t;

            ns.forEach((n) => {
                if (n.fixed) {
                    n.x = W / 2;
                    n.y = H / 2;
                    n.vx = 0;
                    n.vy = 0;
                    return;
                }
                n.x += n.vx;
                n.y += n.vy;
                const pad = n.r + 48;
                if (n.x < pad) { n.x = pad; n.vx = Math.abs(n.vx); }
                if (n.x > W - pad) { n.x = W - pad; n.vx = -Math.abs(n.vx); }
                if (n.y < pad) { n.y = pad; n.vy = Math.abs(n.vy); }
                if (n.y > H - pad) { n.y = H - pad; n.vy = -Math.abs(n.vy); }
            });

            // keep home positions updated if canvas resized
            ns.forEach((n) => {
                if (n.fixed) {
                    n.hx = W / 2;
                    n.hy = H / 2;
                }
            });

            setFrame({
                w: W,
                h: H,
                nodes: ns.map((n) => ({
                    id: n.id, x: n.x, y: n.y, r: n.r, short: n.short, topic: n.topic, color: n.color, fixed: n.fixed,
                })),
            });
        };

        let raf;
        const loop = () => { tick(); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);

        const onResize = () => {
            const m = measure();
            if (!simRef.current) return;
            simRef.current.w = m.w;
            simRef.current.h = m.h;
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
        let bestD = 26;
        frame.nodes.forEach((n) => {
            const d = Math.hypot(n.x - x, n.y - y);
            if (d < Math.max(bestD, n.r + 12)) { bestD = d; best = n; }
        });
        return best;
    };
    const onClick = (e) => {
        const p = clientPoint(e);
        const n = nearest(p.x, p.y);
        if (!n || n.fixed) {
            if (onSelect) onSelect(null);
            return;
        }
        if (onSelect) onSelect(selectedRef.current === n.id ? null : n.id);
    };
    const onMove = (e) => {
        const p = clientPoint(e);
        const n = nearest(p.x, p.y);
        setHoverId(n ? n.id : null);
    };

    const isLight = theme === 'light' || theme === 'spring';
    const cardClass = isLight ? 'bg-white/70 border-stone-200' : 'bg-neutral-900/50 border-white/10';
    const labelCls = isLight ? 'text-stone-800' : 'text-neutral-100';

    const active = hoverId || selectedId;
    const rawLinks = PORTFOLIO_DATA.research_links || [];
    const drawnLinks = rawLinks.map((l, i) => {
        const s = frame.nodes.find((n) => n.id === l.from);
        const t = frame.nodes.find((n) => n.id === l.to);
        if (!s || !t) return null;
        const hot = active && (l.from === active || l.to === active || l.from === 'core' && active);
        return { i, s, t, strength: l.strength || 1, hot: !!(active && (l.from === active || l.to === active)) };
    }).filter(Boolean);

    return (
        <div
            ref={wrapRef}
            className={`relative w-full h-[36rem] md:h-[46rem] border rounded-lg overflow-hidden cursor-pointer ${cardClass}`}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={() => setHoverId(null)}
        >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {drawnLinks.map((l) => (
                    <line
                        key={l.i}
                        x1={l.s.x} y1={l.s.y} x2={l.t.x} y2={l.t.y}
                        stroke={l.hot ? '#0f766e' : 'rgba(17,24,39,0.42)'}
                        strokeWidth={l.strength === 3 ? 3.2 : l.strength === 2 ? 1.8 : 0.9}
                        strokeOpacity={l.hot ? 0.95 : 0.7}
                    />
                ))}
                {frame.nodes.map((n) => (
                    <circle
                        key={n.id}
                        cx={n.x} cy={n.y}
                        r={n.fixed ? n.r : (active === n.id ? n.r + 3 : n.r)}
                        fill={n.color}
                        stroke="#111827"
                        strokeWidth={n.fixed ? 3.4 : active === n.id ? 3 : 2.3}
                    />
                ))}
            </svg>
            {frame.nodes.map((n) => (
                <div
                    key={n.id + '-lab'}
                    className={`absolute pointer-events-none -translate-x-1/2 text-center ${labelCls}`}
                    style={{ left: n.x, top: n.fixed ? n.y + n.r + 6 : n.y + n.r + 4, width: n.fixed ? 150 : 128 }}
                >
                    <span
                        className={`font-semibold leading-tight transition-all duration-300 ${n.fixed ? 'text-[11px] md:text-xs' : (selectedId === n.id ? 'text-sm md:text-base' : 'text-[10px] md:text-[11px]')}`}
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.45)' }}
                    >
                        {n.short}
                    </span>
                </div>
            ))}
        </div>
    );
};
