import * as THREE from "three";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ShoppingCart, Search, Heart, Phone, MapPin, Star,
  MessageCircle, Truck, Shield, RefreshCw,
  ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight,
  X, Menu, Package, Tag, Info, Mail, CheckCircle,
} from "lucide-react";


/* ═══════════════════════════════════════════════════════════
   SRI MURUGAN TEXTILES — 3D ANIMATED EDITION
   Three.js hero scene · CSS 3D cards · Z-depth parallax
   Needle & thread cursor · Liquid wave dividers
   Magnetic buttons · Text scramble · 5 full pages
═══════════════════════════════════════════════════════════ */

import '../styles/main.css';


/* ─── DATA ─── */
export const PRODUCTS = [
  { id:1, cat:"Premium Shirts", name:"Oxford Cotton Formal Shirt", emoji:"👔", price:649, mrp:1299, rating:4.8, rev:124, badge:"50% OFF", isNew:false, tags:["shirts","formal"] },
  { id:2, cat:"Denim Collection", name:"Slim Fit Stretch Jeans", emoji:"👖", price:899, mrp:1799, rating:4.7, rev:98, badge:"50% OFF", isNew:true, tags:["jeans","denim"] },
  { id:3, cat:"T-Shirts", name:"Premium Round Neck T-Shirt", emoji:"👕", price:299, mrp:599, rating:4.9, rev:256, badge:"50% OFF", isNew:false, tags:["tshirts","casual"] },
  { id:4, cat:"Track Wear", name:"Comfort Track Pants", emoji:"🩳", price:549, mrp:1099, rating:4.6, rev:78, badge:"50% OFF", isNew:true, tags:["track","casual"] },
  { id:5, cat:"Formal Wear", name:"Slim Chino Trousers", emoji:"🧥", price:749, mrp:1499, rating:4.7, rev:103, badge:"50% OFF", isNew:false, tags:["formal","trousers"] },
  { id:6, cat:"Innerwear", name:"Premium Stretch Brief Set", emoji:"🩲", price:399, mrp:799, rating:4.8, rev:312, badge:"50% OFF", isNew:false, tags:["innerwear"] },
  { id:7, cat:"Shirts", name:"Linen Summer Shirt", emoji:"👗", price:549, mrp:1099, rating:4.5, rev:67, badge:"50% OFF", isNew:true, tags:["shirts","casual"] },
  { id:8, cat:"Denim", name:"Regular Fit Classic Jeans", emoji:"👖", price:799, mrp:1599, rating:4.6, rev:88, badge:"50% OFF", isNew:false, tags:["jeans","denim"] },
  { id:9, cat:"Track Wear", name:"Dry-Fit Sports Shorts", emoji:"🩳", price:349, mrp:699, rating:4.7, rev:145, badge:"50% OFF", isNew:false, tags:["track","casual"] },
  { id:10, cat:"T-Shirts", name:"Solid Color Polo T-Shirt", emoji:"👕", price:399, mrp:799, rating:4.6, rev:112, badge:"50% OFF", isNew:true, tags:["tshirts","casual"] },
  { id:11, cat:"Ethnic Wear", name:"Men's Cotton Dhoti", emoji:"🧣", price:449, mrp:899, rating:4.8, rev:89, badge:"50% OFF", isNew:false, tags:["ethnic"] },
  { id:12, cat:"Shirts", name:"Checkered Casual Shirt", emoji:"👔", price:599, mrp:1199, rating:4.5, rev:210, badge:"50% OFF", isNew:true, tags:["shirts","casual"] },
  { id:13, cat:"Track Wear", name:"Printed Lounge Shorts", emoji:"🩳", price:299, mrp:599, rating:4.4, rev:65, badge:"50% OFF", isNew:false, tags:["track","casual"] },
  { id:14, cat:"Womens Wear", name:"Premium Silk Saree", emoji:"🥻", price:1499, mrp:2999, rating:4.9, rev:342, badge:"50% OFF", isNew:true, tags:["womens","ethnic"] },
  { id:15, cat:"Outerwear", name:"Classic Denim Jacket", emoji:"🧥", price:1299, mrp:2599, rating:4.7, rev:56, badge:"50% OFF", isNew:false, tags:["denim","outerwear"] },
];
export const STORES = [
  { n:"01", name:"Saralai Branch", incharge:"Ragunathan V", addr:"NH 47, Covai Main Road, Bharathi School (Opp), Saralai — 638118", phone:"+91 99650 22228", tel:"9965022228", hrs:"9:00 AM – 9:00 PM · All Days", email:"saralai@srimurugantextiles.com", maps:"https://maps.app.goo.gl/KmmoCpHPWSFyejyU7", landmark:"Opposite Bharathi School", mapCoords:"11.2489516,77.5330221", images: ["https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80"] },
  { n:"02", name:"Bhavani Branch", incharge:"Karthi K", addr:"NH 47, Covai Main Road, Lakshmi Nagar, Bhavani — 638301", phone:"+91 97887 22002", tel:"9788722002", hrs:"9:00 AM – 9:00 PM · All Days", email:"bhavani@srimurugantextiles.com", maps:"https://maps.app.goo.gl/b1pkyb5SLfzRxzhg8", landmark:"Lakshmi Nagar, NH 47", mapCoords:"11.4282049,77.6755644", images: ["https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1558769132-cb1fac08b432?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"] },
];
export const CATS = [
  { col:"span 5", row:"span 2", name:"Formal Shirts", label:"Best Seller", sub:"35+ styles", tag:"From ₹649", emoji:"👔", accent:"rgba(200,16,46,.15)" },
  { col:"span 4", name:"Jeans & Denim", label:"New Arrivals", sub:"20+ cuts", tag:"From ₹899", emoji:"👖", accent:"rgba(100,80,200,.1)" },
  { col:"span 3", name:"T-Shirts", label:"Factory Fav", sub:"50+ designs", tag:"From ₹299", emoji:"👕", accent:"rgba(201,168,76,.1)" },
  { col:"span 4", name:"Track Pants", label:"Comfort Wear", sub:"15+ fits", tag:"From ₹549", emoji:"🩳", accent:"rgba(37,211,102,.08)" },
  { col:"span 3", name:"Trousers", label:"Office Ready", sub:"25+ styles", tag:"From ₹749", emoji:"🧥", accent:"rgba(200,100,16,.1)" },
  { col:"span 12", name:"Innerwear", label:"Value Pack", sub:"Brand quality", tag:"From ₹399", emoji:"🩲", accent:"rgba(200,16,46,.08)" },
];
export const TICKER_ITEMS = ["Factory Direct Prices","Up to 70% Off MRP","Premium Cotton Fabrics","2 Tamil Nadu Stores","WhatsApp Orders Welcome","Same Day In-Store Pickup","Trusted Since 1998"];
export const FILTERS = ["All","Shirts","T-Shirts","Jeans","Track Wear","Formal","Innerwear"];

/* ═══════════════════════════════════════════════════════════
   THREE.JS HERO SCENE HOOK
═══════════════════════════════════════════════════════════ */
export function useHeroScene(mountRef) {
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || window.innerWidth;
    const H = el.clientHeight || window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 100);
    camera.position.z = 6;

    // Group for mouse parallax
    const group = new THREE.Group();
    scene.add(group);

    // Materials
    const mGold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.12 });
    const mRed  = new THREE.MeshStandardMaterial({ color: 0xc8102e, metalness: 0.65, roughness: 0.28, emissive: 0x3a0008, emissiveIntensity: 0.35 });
    const mWire = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, opacity: 0.05, transparent: true });
    const mDark = new THREE.MeshStandardMaterial({ color: 0x1e0005, metalness: 0.1, roughness: 0.9 });

    // Rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.038, 16, 90), mGold);
    ring1.rotation.x = Math.PI * 0.18;
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.026, 16, 90), mRed);
    ring2.rotation.x = Math.PI * 0.44; ring2.rotation.y = Math.PI * 0.28;
    group.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.042, 16, 70), mGold);
    ring3.rotation.y = Math.PI * 0.5; ring3.rotation.z = Math.PI * 0.1;
    group.add(ring3);

    // Floating fabric swatches
    const swatchData = [
      [2.6, 1.3, -1.0], [-2.3, -0.9, -0.6], [1.9, -1.6, -0.9],
      [-1.6, 1.9, -1.1], [0.6, 2.3, -0.4], [-0.9, -2.1, -0.7],
    ];
    const swatches = swatchData.map(([x, y, z], i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xc8102e : 0xc9a84c,
        metalness: 0.35, roughness: 0.65,
        emissive: i % 2 === 0 ? 0x2a0006 : 0x1a1000,
        emissiveIntensity: 0.22,
      });
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.22 + Math.random() * 0.18, 0.30 + Math.random() * 0.18, 0.04), mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      group.add(mesh);
      return mesh;
    });

    // Fabric cylinders (bolts)
    const cylData = [[-3.2, 0.2, -1.5], [3.4, -0.4, -1.2]];
    cylData.forEach(([x, y, z]) => {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.8, 10), mRed);
      cyl.position.set(x, y, z);
      cyl.rotation.z = Math.PI * 0.2 + Math.random() * 0.4;
      group.add(cyl);
    });

    // Wireframe sphere (background depth)
    const wireSphere = new THREE.Mesh(new THREE.SphereGeometry(4.8, 12, 8), mWire);
    scene.add(wireSphere);

    // Particles
    const PCount = 220;
    const pos = new Float32Array(PCount * 3);
    for (let i = 0; i < PCount; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xb8860b, size: 0.045, transparent: true, opacity: 0.8 }));
    scene.add(particles);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const dLight = new THREE.DirectionalLight(0xff2244, 1.9);
    dLight.position.set(5, 6, 4);
    scene.add(dLight);
    const pLight1 = new THREE.PointLight(0xc9a84c, 2.8, 14);
    pLight1.position.set(-3, 2.5, 3);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0xc8102e, 1.6, 10);
    pLight2.position.set(3.5, -2, 2);
    scene.add(pLight2);

    // Mouse parallax
    let mx = 0, my = 0;
    const onMouse = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // Resize
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animate
    let raf;
    let isVisible = true;
    const obs = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; }, { threshold: 0 });
    obs.observe(el);
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = Date.now() * 0.001;
      ring1.rotation.z = t * 0.17; ring1.rotation.y = t * 0.07;
      ring2.rotation.z = -t * 0.11; ring2.rotation.x = Math.PI * 0.44 + t * 0.055;
      ring3.rotation.x = t * 0.21; ring3.rotation.z = t * 0.09;
      swatches.forEach((s, i) => {
        s.rotation.x += 0.004 + i * 0.001;
        s.rotation.y += 0.005 + i * 0.0008;
        s.position.y += Math.sin(t * 0.9 + i * 1.1) * 0.003;
      });
      particles.rotation.y = t * 0.018; particles.rotation.x = t * 0.009;
      wireSphere.rotation.y = t * 0.025; wireSphere.rotation.x = t * 0.012;
      // Smooth mouse parallax
      group.rotation.y += (mx * 0.22 - group.rotation.y) * 0.055;
      group.rotation.x += (-my * 0.14 - group.rotation.x) * 0.055;
      // Pulsing light
      pLight1.intensity = 2.5 + Math.sin(t * 1.4) * 0.6;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      obs.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);
}

/* ─── ANIMATION SYSTEM 2: TEXT SCRAMBLE ─── */
const SC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
export function ScrambleText({ text, className, tag: Tag = "span", delay = 0 }) {
  const [chars, setChars] = useState(() => text.split("").map(c => ({ c, s: "done" })));
  const ref = useRef(null); const ran = useRef(false); const tmrs = useRef([]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true; obs.unobserve(el);
        const t0 = setTimeout(() => {
          const arr = text.split("");
          setChars(arr.map(c => ({ c: c === " " ? " " : SC[Math.floor(Math.random() * SC.length)], s: "scramble" })));
          arr.forEach((ch, i) => {
            const t1 = setTimeout(() => {
              setChars(p => { const n=[...p]; n[i]={c:ch,s:"settling"}; return n; });
              const t2 = setTimeout(() => { setChars(p => { const n=[...p]; n[i]={c:ch,s:"done"}; return n; }); }, 180);
              tmrs.current.push(t2);
            }, i * 55 + Math.random() * 40);
            tmrs.current.push(t1);
          });
        }, delay);
        tmrs.current.push(t0);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); tmrs.current.forEach(clearTimeout); };
  }, [text, delay]);
  return (
    <Tag ref={ref} className={className}>
      {chars.map((d, i) => <span key={i} className={`scramble-char ${d.s}`}>{d.c}</span>)}
    </Tag>
  );
}

/* ─── ANIMATION SYSTEM 3: WAVE DIVIDER ─── */
export function WaveDivider({ fill = "var(--black)", flip = false }) {
  const id = useRef(`w${Math.random().toString(36).slice(2, 7)}`).current;
  return (
    <div className="wave-divider" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={id}>
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="3" seed="2" result="noise">
              <animate attributeName="baseFrequency" values="0.012 0.04;0.018 0.06;0.012 0.04" dur="6s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <path filter={`url(#${id})`} d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 L1200,80 L0,80 Z" fill={fill}/>
      </svg>
    </div>
  );
}

/* ─── ANIMATION SYSTEM 4: PARALLAX HOOK ─── */
export function useParallax(depth = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          const rotX = (-center / window.innerHeight) * 14 * depth;
          const ty = center * depth * -0.35;
          el.style.transform = `perspective(1200px) rotateX(${rotX}deg) translateY(${ty}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
  }, [depth]);
  return ref;
}

/* ─── ANIMATION SYSTEM 1: MAGNETIC BUTTON ─── */
export function MagButton({ children, className, onClick, strength = 0.4, style }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const onEnter = useCallback(() => { if (ref.current) rectRef.current = ref.current.getBoundingClientRect(); }, []);
  const onMove = useCallback(e => {
    const el = ref.current; if (!el || !rectRef.current) return;
    const r = rectRef.current;
    el.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*strength}px,${(e.clientY-(r.top+r.height/2))*strength}px)`;
  }, [strength]);
  const onLeave = useCallback(() => { if (ref.current) { ref.current.style.transform = "translate(0,0)"; rectRef.current = null; } }, []);
  return (
    <button ref={ref} className={`mag ${className}`} onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

/* ─── 3D TILT CARD ─── */
export function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const onEnter = useCallback(() => { if (ref.current) rectRef.current = ref.current.getBoundingClientRect(); }, []);
  const onMove = useCallback(e => {
    const el = ref.current; if (!el || !rectRef.current) return;
    const r = rectRef.current;
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    el.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateZ(14px)`;
    el.style.boxShadow = `${-x * 18}px ${y * 18}px 60px rgba(0,0,0,.55),0 0 0 1px rgba(200,16,46,.18),${x * 4}px ${-y * 4}px 0 rgba(200,16,46,.1)`;
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
    el.style.boxShadow = "";
    rectRef.current = null;
  }, []);
  return (
    <div ref={ref} className={className} style={{ ...style, transition: "transform .55s cubic-bezier(0.22,1,0.36,1),box-shadow .55s" }}
      onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ─── ANIMATED COUNTER ─── */
export function AnimCounter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null); const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now(), dur = 1600;
        const step = () => { const p = Math.min((Date.now()-t0)/dur,1); setVal(Math.round((1-Math.pow(1-p,3))*target)); if(p<1) requestAnimationFrame(step); };
        requestAnimationFrame(step); obs.unobserve(el);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── SHARED: PRODUCT CARD ─── */
export function ProductCard({ p, wishlists, toggleWish, addCart, openWA, idx }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("vis");
        obs.unobserve(el);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal d${(idx % 3) + 1}`}>
      <TiltCard className="pc">
        <div className="pc-img">
          <div className="pc-img-inner">{p.emoji}</div>
          <div className="pc-overlay">
            <button className="pc-ov-btn" onClick={() => addCart(p)}><ShoppingCart size={14}/> Add</button>
            <button className="pc-ov-btn" onClick={() => openWA(p)}><MessageCircle size={14}/> WhatsApp</button>
          </div>
          <div className="pc-badges">
            <span className="badge badge-discount">{p.badge}</span>
            <span className="badge badge-factory">Factory Price</span>
            {p.isNew && <span className="badge badge-new">New</span>}
          </div>
          <button className="pc-wish" onClick={() => toggleWish(p.id)}>
            <Heart size={16} fill={wishlists[p.id] ? "#c8102e" : "none"} color={wishlists[p.id] ? "#c8102e" : "#aaa"}/>
          </button>
        </div>
        <div className="pc-body">
          <div className="pc-cat">{p.cat}</div>
          <div className="pc-name">{p.name}</div>
          <div className="pc-stars">
            {[...Array(5)].map((_,j) => <Star key={j} size={13} fill={j<Math.floor(p.rating)?"#c9a84c":"none"} color="#c9a84c"/>)}
            <span className="pc-rc">({p.rev})</span>
          </div>
          <div className="pc-pr">
            <div><span className="p-cur">₹{p.price}</span><span className="p-org">₹{p.mrp}</span></div>
            <button className="btn-sm" onClick={() => addCart(p)}>+ Cart</button>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

/* ─── SHARED: STORE CARD ─── */
export function StoreCard({ s, i }) {
  return (
    <div className={`sc reveal-${i === 0 ? "l" : "r"}`}>
      <div className="sc-head">
        <div className="sc-n1">Branch {s.n}</div>
        <div className="sc-nm">{s.name}</div>
      </div>
      <div className="sc-body">
        <div className="sd"><User size={17} className="sd-ic"/><div><div className="sd-lbl">Branch Incharge</div><div className="sd-val">{s.incharge}</div></div></div>
        <div className="sd"><MapPin size={17} className="sd-ic"/><div><div className="sd-lbl">Address</div><div className="sd-val">{s.addr}</div></div></div>
        <div className="sd"><Tag size={17} className="sd-ic"/><div><div className="sd-lbl">Landmark</div><div className="sd-val">{s.landmark}</div></div></div>
        <div className="sd"><Phone size={17} className="sd-ic"/><div><div className="sd-lbl">Phone</div><div className="sd-val">{s.phone}</div></div></div>
        <div className="sd"><Clock size={17} className="sd-ic"/><div><div className="sd-lbl">Hours</div><div className="sd-val">{s.hrs}</div></div></div>
        <div className="sc-acts">
          <MagButton className="sc-btn sc-call" onClick={() => window.open(`tel:${s.tel}`)} strength={0.3}><Phone size={15}/> Call Now</MagButton>
          <MagButton className="sc-btn sc-dir" onClick={() => window.open(`mailto:${s.email}`)} strength={0.3}><Mail size={15}/> Mail Branch</MagButton>
        </div>
        <div style={{ marginTop:16 }}>
          <MagButton className="btn-wa-lg" onClick={() => window.open(`https://wa.me/91${s.tel}`, "_blank")} strength={0.3} style={{ width:"100%", justifyContent:"center", padding: "12px" }}>
            <MessageCircle size={16}/> Chat in WhatsApp</MagButton>
        </div>
      </div>
    </div>
  );
}

/* ─── SHARED: WA BAND ─── */
export function WABand({ openWA }) {
  return (
    <div style={{ padding:"0 0 96px" }}>
      <div className="wa-band reveal-s">
        <div className="wa-ico">💬</div>
        <div className="wa-txt">
          <ScrambleText text="Order on WhatsApp" tag="h2" delay={200}/>
          <p>Browse, pick your size, and order in seconds. We respond within minutes.</p>
        </div>
        <MagButton className="btn-wa-lg" onClick={() => openWA(null)} strength={0.38}>
          <MessageCircle size={20}/> Chat on WhatsApp
        </MagButton>
      </div>
    </div>
  );
}

/* ─── SHARED: FOOTER ─── */
export function Footer({ navigate }) {
  return (
    <footer className="footer" style={{ background:"var(--b2)" }}>
      <div className="ft-grid">
        <div>
          <div className="ft-bn">Sri&nbsp;<em>Murugan</em>&nbsp;Textiles</div>
          <div className="ft-tl">Factory Direct Sales</div>
          <p className="ft-desc">Premium men's clothing at factory-direct prices. Two Tamil Nadu showrooms on the NH 47 corridor.</p>
          <div className="ft-soc">
            
            
            <button className="soc-ic"><MessageCircle size={17}/></button>
          </div>
        </div>
        <div>
          <div className="ft-col-h">Quick Links</div>
          <ul className="ft-links">
            {[["home","Home"],["shop","Products"],["shop","Sale Items"],["about","About Us"],["contact","Contact"]].map(([pg,lb]) => (
              <li key={lb}><button onClick={() => navigate(pg)}>{lb}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="ft-col-h">Categories</div>
          <ul className="ft-links">
            {["Shirts","T-Shirts","Jeans","Cotton Pants","Track Pants","Trousers","Innerwear"].map(c => (
              <li key={c}><button onClick={() => navigate("shop")}>{c}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="ft-col-h">Contact Us</div>
          {STORES.map(s => (
            <div key={s.n} className="ft-ci">
              <MapPin size={15} color="#c8102e" style={{flexShrink:0,marginTop:2}}/>
              <span>{s.addr}</span>
            </div>
          ))}
          <div className="ft-ci"><Phone size={15} color="#c8102e" style={{flexShrink:0}}/><div><div>+91 99650 22228</div><div>+91 97887 22002</div></div></div>
          <div className="ft-ci"><Clock size={15} color="#c8102e" style={{flexShrink:0}}/><span>Open daily · 9 AM – 9 PM</span></div>
        </div>
      </div>
      <div className="ft-bot">
        <div className="ft-copy">© 2025 Sri Murugan Textiles. All rights reserved.</div>
        <div className="ft-leg"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Refund Policy</a></div>
      </div>
    </footer>
  );
}

