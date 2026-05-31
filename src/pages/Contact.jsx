import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { PRODUCTS, STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 5 — CONTACT
═══════════════════════════════════════════════════════════ */
export default function PageContact({ openWA, navigate }) {
  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><Mail size={13}/>&nbsp; Get in Touch</div>
        <h1>
          <ScrambleText text="We're Here" className="h1-plain" tag="span"/>
          <br/>
  
          <ScrambleText text="to Help You." className="h1-italic" tag="span" delay={200}/>
        </h1>
        <p>Questions about sizing, stock, or orders? Reach out — we respond fast.</p>
      </div>

      <WaveDivider fill="var(--black)"/>

      <section className="sec sec-pt0">
        <div className="contact-grid">
          <div className="reveal-l">
            <div className="sec-ey">Join the Community <span className="sec-ey-line"/></div>
            <h2 className="sec-h2" style={{ marginBottom:32 }}>WhatsApp Groups</h2>
            <p style={{ color:"var(--gray-lt)", fontSize:"1.05rem", lineHeight:1.6, marginBottom:32 }}>
              Be the first to know about new arrivals, exclusive factory discounts, and festival offers. Join our thriving WhatsApp community!
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div className="contact-form" style={{ padding: 24, margin: 0 }}>
                <div style={{ fontSize:"1.2rem", fontWeight:600, color:"#fff", marginBottom:8 }}>Group 1: Factory direct sales👚👕👖👔</div>
                <p style={{ color:"var(--gray-lt)", fontSize:".9rem", marginBottom:20 }}>Daily updates on new stock and premium collections.</p>
                <MagButton className="btn-wa-lg" onClick={() => window.open("https://chat.whatsapp.com/YOUR_GROUP_1_LINK", "_blank")} strength={0.35}>
                  <MessageCircle size={18}/> Join Group 1
                </MagButton>
              </div>
              <div className="contact-form" style={{ padding: 24, margin: 0 }}>
                <div style={{ fontSize:"1.2rem", fontWeight:600, color:"#fff", marginBottom:8 }}>Group 2: Factory direct sales 2👚👕👖👔</div>
                <p style={{ color:"var(--gray-lt)", fontSize:".9rem", marginBottom:20 }}>Flash sales, clearance items, and exclusive offers.</p>
                <MagButton className="btn-wa-lg" onClick={() => window.open("https://chat.whatsapp.com/YOUR_GROUP_2_LINK", "_blank")} strength={0.35}>
                  <MessageCircle size={18}/> Join Group 2
                </MagButton>
              </div>
            </div>
          </div>
          <div className="contact-aside reveal-r">
            {STORES.map((s,i) => (
              <div key={s.n} className="ca-card">
                <div className="ca-title">Branch {s.n} — {s.name}</div>
                <div className="ca-rows">
                  <div className="ca-row"><User size={16} className="ca-ic"/>Incharge: {s.incharge}</div>
                  <div className="ca-row"><Phone size={16} className="ca-ic"/>{s.phone}</div>
                  <div className="ca-row"><MapPin size={16} className="ca-ic"/>{s.addr}</div>
                  
                </div>
                <div style={{ marginTop:16, display:"flex", gap:10 }}>
                  <MagButton className="sc-btn sc-call" style={{ flex:1 }} onClick={() => window.open(`tel:${s.tel}`)} strength={0.3}><Phone size={14}/> Call</MagButton>
                  <MagButton className="sc-btn sc-dir" style={{ flex:1 }} onClick={() => window.open(`mailto:${s.email}`)} strength={0.3}><Mail size={14}/> Mail</MagButton>
                </div>
                <MagButton className="btn-wa-lg" onClick={() => window.open(`https://wa.me/91${s.tel}`, "_blank")} strength={0.3} style={{ width:"100%", justifyContent:"center", marginTop: 10, padding: "12px" }}>
                  <MessageCircle size={16}/> Chat with {s.incharge}
                </MagButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}

