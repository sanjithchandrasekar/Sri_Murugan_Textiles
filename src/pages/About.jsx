import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { PRODUCTS, STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 4 — ABOUT  (3D flip value cards)
═══════════════════════════════════════════════════════════ */
export default function PageAbout({ navigate, openWA }) {
  const VALUES = [
    { icon:"💰", title:"Honest Pricing", front:"Real MRP vs our price, side by side. Zero fake discounts.", back:"We started this practice in 2010 and it's the foundation of every customer relationship we have." },
    { icon:"🧵", title:"Quality First", front:"Every garment quality-checked before it hits our shelves.", back:"We personally inspect fabrics for weave density, color fastness, and stitching before stocking." },
    { icon:"🤝", title:"Community Roots", front:"A family business rooted in Erode for 16 years.", back:"Thousands of families across Tamil Nadu trust us for their festive, formal, and everyday clothing." },
    { icon:"🏭", title:"Premium Sourcing", front:"We carefully curate premium branded clothing to bring you the best possible value and quality.", back:"We negotiate for the best collections across Tamil Nadu and Karnataka." },
    { icon:"🔄", title:"Easy Returns", front:"7-day hassle-free exchange. If it doesn't fit, we fix it.", back:"Just bring the item back in original condition with your receipt and we'll swap it immediately." },
    { icon:"📲", title:"Modern Convenience", front:"WhatsApp ordering, digital bills, instant confirmations.", back:"Old-school trust backed by new-age tools — order in 2 minutes, pick up same day." },
  ];

  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><Info size={13}/>&nbsp; Our Story</div>
        <h1>
          <ScrambleText text="Family. Fabric." className="h1-plain" tag="span"/>
          <br/>
          <ScrambleText text="Trust." className="h1-gold" tag="span" delay={300}/>
        </h1>
        <p>16 years of bringing premium quality clothing to families across Erode and beyond.</p>
      </div>

      <WaveDivider fill="var(--black)"/>

      <section className="sec sec-pt0">
        <div className="about-grid">
          <div className="reveal-l">
            <div className="about-img-wrap">
              <div className="about-emoji-big">🏭</div>
            </div>
          </div>
          <div className="about-body reveal-r">
            <div className="sec-ey">Est. 2010 <span className="sec-ey-line"/></div>
            <h2 className="sec-h2">A Journey from Cutting Fabrics to Owning a Showroom</h2>
            <p>The story of Sri Murugan Textiles began between 2006 and 2010. Two friends, who met while working in the same textile unit cutting dress pieces, shared a dream of starting their own shop.</p>
            <p>They faced many struggles from childhood to adulthood. With a borrowed investment from their parents, they finally opened their first shop in Saralai in 2010.</p>
            <p>Today, with a <strong>premium sourcing model</strong> and an unwavering commitment to quality, we bring you incredible value, passing every rupee of savings to you.</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <MagButton className="btn-red" onClick={() => navigate("shop")} strength={0.4}>Shop Now <ArrowRight size={16}/></MagButton>
              <MagButton className="btn-ghost" onClick={() => navigate("stores")} strength={0.4}>Visit a Store <MapPin size={16}/></MagButton>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Stats */}
      <section className="sec sec-pt0">
        <div className="stat-row reveal">
          {[
            { num:<AnimCounter target={2010}/>, lbl:"Founded" },
            { num:<AnimCounter target={50000} suffix="+"/>, lbl:"Happy Customers" },
            { num:<AnimCounter target={200} suffix="+"/>, lbl:"Products" },
            { num:<AnimCounter target={70} suffix="%"/>, lbl:"Max Off MRP" },
          ].map((s,i) => <div key={i} className="stat-cell"><div className="stat-num">{s.num}</div><div className="stat-lbl">{s.lbl}</div></div>)}
        </div>
      </section>

      {/* 3D Flip Value Cards */}
      <section className="sec sec-pt0">
        <div className="sec-hd reveal">
          <div className="sec-ey">What We Stand For <span className="sec-ey-line"/></div>
          <ScrambleText text="Our Values" className="sec-h2" tag="h2" delay={100}/>
          <p className="sec-sub">Hover to reveal what each value means in practice.</p>
        </div>
        <div className="values-grid">
          {VALUES.map((v,i) => (
            <div key={i} className={`val-wrap reveal d${(i%3)+1}`}>
              <div className="val-inner">
                <div className="val-face val-front">
                  <div className="val-icon">{v.icon}</div>
                  <div className="val-title">{v.title}</div>
                  <div className="val-desc">{v.front}</div>
                </div>
                <div className="val-face val-back">
                  <div className="val-back-label">{v.title}</div>
                  <div className="val-back-txt">{v.back}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="sec sec-pt0">
        <div className="sec-hd reveal">
          <div className="sec-ey">Our Journey <span className="sec-ey-line"/></div>
          <ScrambleText text="16 Years of Excellence" className="sec-h2" tag="h2" delay={100}/>
        </div>
        <div className="timeline">
          {[
            { yr:"2006", title:"The Shared Dream", desc:"Two friends met while cutting fabric pieces in a textile unit and planned to open their own shop." },
            { yr:"2010", title:"Founded in Saralai", desc:"With borrowed money from parents and overcoming childhood struggles, the first shop opened in Saralai." },
            { yr:"2013", title:"Bhavani Branch Opens", desc:"After establishing trust and a growing customer base, our second branch was opened in Bhavani." },
            { yr:"2018", title:"Premium Sourcing", desc:"Built strong partnerships with top brands to deliver premium menswear at unmatched retail prices." },
            { yr:"Today", title:"Growing Every Year", desc:"Serving thousands of customers annually across two stores, with new styles arriving every week." },
          ].map((t,i) => (
            <div key={i} className={`tl-item reveal d${(i%3)+1}`}>
              <div className="tl-dot">{i+1}</div>
              <div className="tl-body">
                <div className="tl-year">{t.yr}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}