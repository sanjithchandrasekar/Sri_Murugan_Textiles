import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { PRODUCTS, STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 2 — SHOP
═══════════════════════════════════════════════════════════ */
export default function PageShop({ addCart, openWA, wishlists, toggleWish, navigate }) {
  const [activeFilter, setFilter] = useState("All");
  const filtered = useMemo(() => {
    if (activeFilter === "All") return PRODUCTS;
    const key = activeFilter.toLowerCase().replace(/\s/g,"");
    return PRODUCTS.filter(p => p.tags.some(t => key.includes(t) || t.includes(key)));
  }, [activeFilter]);

  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><Package size={13}/>&nbsp; Collections</div>
        <h1><ScrambleText text="Shop All" className="h1-plain" tag="span"/>&nbsp;<ScrambleText text="Styles" className="h1-italic" tag="span" delay={200}/></h1>
        <p>Factory-direct pricing on every item. No middlemen, no markups — ever.</p>
      </div>
      <WaveDivider fill="var(--black)"/>
      <section className="sec sec-pt0">
        <div className="shop-filter-bar">
          <span className="filter-label">Filter:</span>
          {FILTERS.map(f => <button key={f} className={`filter-btn${activeFilter===f?" active":""}`} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <div className="products-grid">
          {filtered.map((p,i) => <ProductCard key={p.id} p={p} idx={i} wishlists={wishlists} toggleWish={toggleWish} addCart={addCart} openWA={openWA}/>)}
        </div>
        {filtered.length === 0 && <div style={{ textAlign:"center", padding:"80px 0", color:"var(--gray)" }}><div style={{fontSize:"3rem",marginBottom:16}}>🧵</div><p>No products found. Try "All"!</p></div>}
      </section>
      <WaveDivider fill="#041a10"/>
      <WABand openWA={openWA}/>
      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}

