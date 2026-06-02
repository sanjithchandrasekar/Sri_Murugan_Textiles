import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 2 — SHOP
═══════════════════════════════════════════════════════════ */
export default function PageShop({ addCart, openWA, wishlists, toggleWish, navigate, products }) {
  const [activeFilter, setFilter] = useState("All");
  const filtered = useMemo(() => {
    if (activeFilter === "All") return products;
    const key = activeFilter.toLowerCase();
    return products.filter(p => p.tags.some(t => key.includes(t) || t.includes(key)));
  }, [activeFilter, products]);

  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><Package size={13}/>&nbsp; Collections</div>
        <h1><ScrambleText text="Shop All" className="h1-plain" tag="span"/>&nbsp;<ScrambleText text="Styles" className="h1-italic" tag="span" delay={200}/></h1>
        <p>Unbeatable pricing on every item. Premium quality without the premium price tag.</p>
      </div>
      <WaveDivider fill="var(--black)"/>
      <section className="sec sec-pt0">
        <div className="shop-filter-bar">
          <span className="filter-label">Filter:</span>
          {FILTERS.map(f => <button key={f} className={`filter-btn${activeFilter===f?" active":""}`} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <div className="products-grid">
          {filtered.length > 0 ? filtered.map((p,i) => <ProductCard key={p._id || p.id} p={p} idx={i} wishlists={wishlists} toggleWish={toggleWish} addCart={addCart} openWA={openWA}/>) : null}
        </div>
        {products.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"var(--gray)" }}><div style={{fontSize:"3rem",marginBottom:16}}>⏳</div><p>Loading Products...</p></div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"var(--gray)" }}><div style={{fontSize:"3rem",marginBottom:16}}>🧵</div><p>No products found. Try "All"!</p></div>
        ) : null}
      </section>
      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}

