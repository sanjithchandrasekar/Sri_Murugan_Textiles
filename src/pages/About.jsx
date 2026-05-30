import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { PRODUCTS, STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 4 — ABOUT  (3D flip value cards)
═══════════════════════════════════════════════════════════ */
export default function PageAbout({ navigate, openWA }) {
  const VALUES = [
    { icon:"💰", title:"Honest Pricing", front:"Real MRP vs our price, side by side. Zero fake discounts.", back:"We started this practice in 1998 and it's the foundation of every customer relationship we have." },
    { icon:"🧵", title:"Quality First", front:"Every garment quality-checked before it hits our shelves.", back:"We personally inspect fabrics for weave density, color fastness, and stitching before stocking." },
    { icon:"🤝", title:"Community Roots", front:"A family business rooted in Coimbatore for 27 years.", back:"Thousands of families across Tamil Nadu trust us for their festive, formal, and everyday clothing." },
    { icon:"🏭", title:"Direct Sourcing", front:"No distributors. No wholesalers. Factory price = your price.", back:"We negotiate directly with mills and manufacturers across Tamil Nadu and Karnataka." },
    { icon:"🔄", title:"Easy Returns", front:"7-day hassle-free exchange. If it doesn't fit, we fix it.", back:"Just bring the item back in original condition with your receipt and we'll swap it immediately." },
    { icon:"📲", title:"Modern Convenience", front:"WhatsApp ordering, digital bills, instant confirmations.", back:"Old-school trust backed by new-age tools — order in 2 minutes, pick up same day." },
  ];

  return (
    <div style={{ animation:"page3dIn .8s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><Info size={13}/>&nbsp; Our Story</div>
        <h1>
          <ScrambleText text="Family. Fabric." className="h1-plain" tag="span"/>
          <br/>
          <ScrambleText text="Trust." className="h1-gold" tag="span" delay={300}/>
        </h1>
        <p>27 years of bringing factory-quality clothing to families across Coimbatore and beyond.</p>
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
            <div className="sec-ey">Est. 1998 <span className="sec-ey-line"/></div>
            <h2 className="sec-h2">Straight From the Factory Floor</h2>
            <p>Sri Murugan Textiles was founded with one belief: <strong>great clothing shouldn't cost a fortune</strong>. We cut out every middleman between the factory and your wardrobe.</p>
            <p>Starting as a single shop in Sulur, we've grown into two flagship showrooms along NH 47, serving tens of thousands of customers every year.</p>
            <p>Our <strong>factory-direct model</strong> means we source premium fabrics and finished garments directly from manufacturers — passing every rupee of savings to you.</p>
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
            { num:<AnimCounter target={1998}/>, lbl:"Founded" },
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
          <ScrambleText text="27 Years of Excellence" className="sec-h2" tag="h2" delay={100}/>
        </div>
        <div className="timeline">
          {[
            { yr:"1998", title:"Founded in Sulur", desc:"Opened our first small shop at 176 Avinashi Road, Sulur. Started with shirts and basic men's wear." },
            { yr:"2004", title:"Factory Partnerships", desc:"Direct partnerships with textile manufacturers across Tamil Nadu, unlocking true factory-direct pricing." },
            { yr:"2011", title:"Showroom Expansion", desc:"Relocated to a larger showroom space to house our growing collection of 200+ products across all categories." },
            { yr:"2018", title:"Kinathukadavu Opens", desc:"Opened our second branch on NH 47, near Kinathukadavu Bus Stand, serving the highway corridor." },
            { yr:"2022", title:"WhatsApp Commerce", desc:"Launched WhatsApp ordering. Same factory prices, delivered to your fingertips in seconds." },
            { yr:"Today", title:"Growing Every Year", desc:"Serving 10,000+ customers annually across two stores, with new styles arriving every week." },
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

      <WaveDivider fill="#041a10"/>
      <WABand openWA={openWA}/>
      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}

