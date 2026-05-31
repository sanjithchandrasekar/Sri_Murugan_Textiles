import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { PRODUCTS, STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 1 — HOME  (Three.js hero + all 4 systems)
═══════════════════════════════════════════════════════════ */
export default function PageHome({ addCart, openWA, wishlists, toggleWish, navigate }) {
  const heroRef = useRef(null);
  useHeroScene(heroRef);
  const plxL = useParallax(0.07);

  const particles = useMemo(() => Array.from({ length:14 }, (_,i) => ({
    id:i, size:Math.random()*3+2, left:Math.random()*100,
    dur:Math.random()*12+10, delay:Math.random()*14,
    drift:`${(Math.random()-.5)*140}px`,
  })), []);

  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      {/* ── HERO with Three.js 3D scene ── */}
      <section className="hero" style={{ position:"relative", overflow:"hidden" }}>
        {/* Three.js canvas mount point */}
        <div ref={heroRef} className="hero-3d-canvas"/>
        <div className="hero-noise"/>
        <div className="particles-2d">
          {particles.map(p => (
            <div key={p.id} className="particle" style={{ width:p.size, height:p.size, left:`${p.left}%`, "--dur":`${p.dur}s`, "--delay":`${-p.delay}s`, "--drift":p.drift }}/>
          ))}
        </div>

        <div ref={plxL} className="hero-left" style={{ position:"relative", zIndex:3 }}>
          <div className="hero-pill"><span className="hero-dot"/>Factory Direct — No Middlemen</div>
          <h1 className="hero-h1">
            <ScrambleText text="Premium" className="h1-plain" tag="span" delay={80}/>
            <ScrambleText text="Fashion," className="h1-italic" tag="span" delay={280}/>
            <ScrambleText text="Half Price." className="h1-gold" tag="span" delay={480}/>
          </h1>
          <p className="hero-sub">Sri Murugan Textiles brings you top-quality men's clothing straight from the factory floor — shirts, jeans, T-shirts, trousers and more at prices that simply can't be beaten.</p>
          <div className="hero-ctas">
            <MagButton className="btn-red" onClick={() => navigate("shop")} strength={0.45}>Shop Collection <ArrowRight size={16}/></MagButton>
            <MagButton className="btn-wa-pill" onClick={() => openWA(null)} strength={0.45}><MessageCircle size={16}/> WhatsApp Order</MagButton>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card-big">
            <div className="hcb-bg"/>
            <div style={{position:"relative",zIndex:2}}>
              <div className="hcb-emoji">👔</div>
              <div className="hcb-tag">This Season's Pick</div>
              <div className="hcb-name">Oxford Cotton<br/>Formal Shirt</div>
              <div className="hcb-price">From ₹649 · Factory Direct</div>
            </div>
          </div>
          <div className="hero-cards-row">
            {[
              { emoji:"🏭", label:"Factory Direct", val:<AnimCounter target={50} suffix="%"/>, sub:"Below MRP always" },
              { emoji:"🧵", label:"Products", val:<AnimCounter target={200} suffix="+"/>, sub:"New arrivals weekly" },
              { emoji:"⭐", label:"Customers", val:<AnimCounter target={10000} suffix="+"/>, sub:"Across Tamil Nadu" },
              { emoji:"📍", label:"Locations", val:<AnimCounter target={2}/>, sub:"On NH 47 corridor" },
            ].map((c,i) => <div key={i} className="hero-card-sm"><div className="hcs-icon">{c.emoji}</div><div className="hcs-label">{c.label}</div><div className="hcs-val">{c.val}</div><div className="hcs-sub">{c.sub}</div></div>)}
          </div>
        </div>
      </section>

      {/* Wave → Ticker */}
      <WaveDivider fill="#c8102e"/>
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((t,i) => <span key={i} className="tick-item">{t}<span className="tick-sep"/></span>)}
        </div>
      </div>
      <WaveDivider fill="#0e0e0e" flip/>

      {/* Features */}
      <div className="features">
        {[
          { icon:<Truck size={20}/>, t:"Free In-Store Pickup", d:"Order online, collect same day from either showroom." },
          { icon:<Shield size={20}/>, t:"Quality Guaranteed", d:"Every product inspected before sale, no exceptions." },
          { icon:<RefreshCw size={20}/>, t:"Easy Exchange", d:"Size not right? Swap within 7 days, hassle-free." },
          { icon:<Zap size={20}/>, t:"Factory Prices Daily", d:"Direct sourcing means unbeatable prices every single day." },
        ].map((f,i) => (
          <div key={i} className={`feat reveal d${i+1}`}>
            <div className="feat-icon">{f.icon}</div>
            <div><div className="feat-title">{f.t}</div><div className="feat-desc">{f.d}</div></div>
          </div>
        ))}
      </div>

      {/* 3D Stats */}
      <section className="sec">
        <div className="stat-row reveal">
          {[
            { num:<AnimCounter target={27} suffix=" yrs"/>, lbl:"In Business" },
            { num:<AnimCounter target={50000} suffix="+"/>, lbl:"Items Sold" },
            { num:<AnimCounter target={70} suffix="%"/>, lbl:"Max Savings" },
            { num:<AnimCounter target={2}/>, lbl:"Showrooms" },
          ].map((s,i) => <div key={i} className="stat-cell"><div className="stat-num">{s.num}</div><div className="stat-lbl">{s.lbl}</div></div>)}
        </div>
      </section>

      {/* Categories */}
      <WaveDivider fill="var(--black)"/>
      <section className="sec sec-pt0">
        <div className="sec-hd reveal">
          <div className="sec-ey">Shop by Category <span className="sec-ey-line"/></div>
          <ScrambleText text="Every Look, Every Need" className="sec-h2" tag="h2" delay={100}/>
          <p className="sec-sub">Six curated categories. Zero middlemen. Maximum savings.</p>
        </div>
        <div className="bento">
          {CATS.map((c,i) => (
            <div key={i} className={`cc reveal d${(i%4)+1}`}
              style={{ gridColumn:c.col, gridRow:c.row||"span 1", background:`linear-gradient(145deg,${c.accent} 0%,var(--b3) 70%)` }}
              onClick={() => navigate("shop")}>
              <div className="cc-emoji">{c.emoji}</div>
              <div className="cc-content">
                <div className="cc-label">{c.label}</div>
                <div className="cc-name">{c.name}</div>
                <div className="cc-sub">{c.sub}</div>
                <span className="cc-tag">{c.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="sec sec-pt0">
        <div className="sec-hdr reveal">
          <div>
            <div className="sec-ey">Factory Collection <span className="sec-ey-line"/></div>
            <ScrambleText text="Top Picks" className="sec-h2" tag="h2" delay={120}/>
            <p className="sec-sub">Direct-from-factory pricing. Premium quality. Everyday.</p>
          </div>
          <MagButton className="view-all" onClick={() => navigate("shop")} strength={0.3}>View All <ChevronRight size={15}/></MagButton>
        </div>
        <div className="products-grid">
          {PRODUCTS.slice(0,6).map((p,i) => <ProductCard key={p.id} p={p} idx={i} wishlists={wishlists} toggleWish={toggleWish} addCart={addCart} openWA={openWA}/>)}
        </div>
      </section>

      {/* Stores */}
      <section className="sec sec-pt0">
        <div className="sec-hd reveal">
          <div className="sec-ey">Find Us <span className="sec-ey-line"/></div>
          <ScrambleText text="Visit Our Showrooms" className="sec-h2" tag="h2" delay={100}/>
          <p className="sec-sub">Two locations across Tamil Nadu's NH 47 corridor.</p>
        </div>
        <div className="stores-grid">
          {STORES.map((s,i) => <StoreCard key={s.n} s={s} i={i}/>)}
        </div>
      </section>

      <WaveDivider fill="#041a10"/>
      <WABand openWA={openWA}/>
      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}

