import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { PRODUCTS, STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 3 — STORES
═══════════════════════════════════════════════════════════ */
export default function PageStores({ openWA, navigate }) {
  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><MapPin size={13}/>&nbsp; Locations</div>
        <h1><ScrambleText text="Our Showrooms" className="h1-plain" tag="span"/></h1>
        <p>Two flagship stores on the NH 47 corridor. Walk in anytime — 9 AM to 9 PM, every day.</p>
      </div>
      <WaveDivider fill="var(--black)"/>
      <section className="sec sec-pt0">
        <div className="sec-hd reveal">
          <div className="sec-ey">Tamil Nadu Locations <span className="sec-ey-line"/></div>
          <ScrambleText text="Find Us Near You" className="sec-h2" tag="h2" delay={100}/>
        </div>
        <div className="stores-grid">
          {STORES.map((s,i) => <StoreCard key={s.n} s={s} i={i}/>)}
        </div>
      </section>
      <section className="sec sec-pt0">
        <div className="sec-hd reveal">
          <div className="sec-ey">Map & Directions <span className="sec-ey-line"/></div>
          <h2 className="sec-h2">Get Here Easily</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {STORES.map((s,i) => (
            <div key={s.n} className={`reveal-${i===0?"l":"r"}`} style={{ background:"var(--b3)", border:"1px solid var(--glass-b)", borderRadius:18, overflow:"hidden", transition:"transform .5s var(--ease-out),box-shadow .5s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="perspective(800px) rotateX(-4deg) rotateY(3deg) translateZ(16px)"; e.currentTarget.style.boxShadow="0 28px 60px rgba(0,0,0,.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
              <div style={{ padding:"24px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:600 }}>{s.name}</div>
                <div style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"var(--red)" }}>Branch {s.n}</div>
              </div>
              <div style={{ padding:28 }}>
                <div style={{ background:"var(--b4)", borderRadius:12, height:180, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3.5rem", marginBottom:20 }}>🗺️</div>
                <div style={{ fontSize:".84rem", color:"var(--gray-lt)", lineHeight:1.6, marginBottom:16 }}>{s.addr}</div>
                <div style={{ display:"flex", gap:12 }}>
                  <MagButton className="sc-btn sc-call" style={{ flex:1 }} onClick={() => window.open(`tel:${s.tel}`)} strength={0.3}><Phone size={15}/> Call</MagButton>
                  <MagButton className="sc-btn sc-dir" style={{ flex:1 }} onClick={() => window.open(s.maps,"_blank")} strength={0.3}><MapPin size={15}/> Map</MagButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="sec sec-pt0">
        <div className="sec-hd reveal">
          <div className="sec-ey">Common Questions <span className="sec-ey-line"/></div>
          <h2 className="sec-h2">Store FAQ</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            ["Do I need to book an appointment?","No! Just walk in during store hours. We always have full stock on display."],
            ["Can I exchange if the size doesn't fit?","Absolutely. Hassle-free exchange within 7 days with proof of purchase."],
            ["Do you offer WhatsApp ordering?","Yes! Message us on WhatsApp and we'll confirm availability and arrange same-day pickup."],
            ["Are prices the same online and in-store?","Yes, our factory-direct pricing is the same across all channels, always."],
          ].map(([q,a],i) => (
            <div key={i} className={`faq-item reveal d${i+1}`}>
              <div style={{ fontWeight:600, marginBottom:8, display:"flex", gap:10 }}><span style={{ color:"var(--red)" }}>Q</span>{q}</div>
              <div style={{ color:"var(--gray-lt)", fontSize:".85rem", lineHeight:1.6 }}>{a}</div>
            </div>
          ))}
        </div>
      </section>
      <WaveDivider fill="#041a10"/>
      <WABand openWA={openWA}/>
      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}

