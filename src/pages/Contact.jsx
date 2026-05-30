import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { ShoppingCart, Search, Heart, Phone, MapPin, Star, MessageCircle, Truck, Shield, RefreshCw, ChevronRight, Home, Grid, User, Clock, Zap, ArrowRight, X, Menu, Package, Tag, Info, Mail, CheckCircle } from "lucide-react";
import { PRODUCTS, STORES, CATS, TICKER_ITEMS, FILTERS, useHeroScene, ScrambleText, WaveDivider, useParallax, MagButton, TiltCard, AnimCounter, ProductCard, StoreCard, WABand, Footer } from "../components/Shared.jsx";

/* ═══════════════════════════════════════════════════════════
   PAGE 5 — CONTACT
═══════════════════════════════════════════════════════════ */
export default function PageContact({ openWA, navigate }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = () => {
    if (!form.name || !form.message) return;
    const msg = `Hi! I'm ${form.name}${form.phone?`, my number is ${form.phone}`:""}.\n\nSubject: ${form.subject||"General Enquiry"}\n\n${form.message}`;
    window.open(`https://wa.me/919965022228?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div style={{ animation:"page3dIn .8s var(--ease-out) both" }}>
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
            <div className="sec-ey">Send a Message <span className="sec-ey-line"/></div>
            <h2 className="sec-h2" style={{ marginBottom:32 }}>Drop Us a Line</h2>
            {sent ? (
              <div className="submit-success">
                <CheckCircle size={22} color="var(--wa)"/>
                <div>
                  <div style={{ fontWeight:600 }}>Message sent via WhatsApp!</div>
                  <div style={{ fontSize:".82rem", color:"var(--gray-lt)", marginTop:4 }}>We'll reply within minutes during store hours.</div>
                </div>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-row">
                  <div className="field"><label>Your Name *</label><input name="name" value={form.name} onChange={onChange} placeholder="e.g. Arjun Kumar"/></div>
                  <div className="field"><label>Phone Number</label><input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210"/></div>
                </div>
                <div className="field"><label>Email (optional)</label><input name="email" value={form.email} onChange={onChange} placeholder="you@example.com"/></div>
                <div className="field"><label>Subject</label><input name="subject" value={form.subject} onChange={onChange} placeholder="Product availability, Sizing help…"/></div>
                <div className="field"><label>Your Message *</label><textarea name="message" value={form.message} onChange={onChange} placeholder="Tell us what you need…"/></div>
                <MagButton className="btn-wa-lg" onClick={onSubmit} strength={0.35}><MessageCircle size={18}/> Send via WhatsApp</MagButton>
              </div>
            )}
          </div>
          <div className="contact-aside reveal-r">
            {STORES.map((s,i) => (
              <div key={s.n} className="ca-card">
                <div className="ca-title">Branch {s.n} — {s.name}</div>
                <div className="ca-rows">
                  <div className="ca-row"><MapPin size={16} className="ca-ic"/>{s.addr}</div>
                  <div className="ca-row"><Phone size={16} className="ca-ic"/>{s.phone}</div>
                  <div className="ca-row"><Clock size={16} className="ca-ic"/>{s.hrs}</div>
                </div>
                <div style={{ marginTop:16, display:"flex", gap:10 }}>
                  <MagButton className="sc-btn sc-call" style={{ flex:1 }} onClick={() => window.open(`tel:${s.tel}`)} strength={0.3}><Phone size={14}/> Call</MagButton>
                  <MagButton className="sc-btn sc-dir" style={{ flex:1 }} onClick={() => window.open(s.maps,"_blank")} strength={0.3}><MapPin size={14}/> Map</MagButton>
                </div>
              </div>
            ))}
            <div className="ca-card" style={{ background:"linear-gradient(135deg,#0a2e1a,#082416)", border:"1px solid rgba(37,211,102,.18)" }}>
              <div className="ca-title" style={{ color:"var(--wa)" }}>💬 Fastest Response</div>
              <p style={{ color:"rgba(255,255,255,.55)", fontSize:".84rem", lineHeight:1.6, marginBottom:16 }}>WhatsApp is quickest. We typically respond within 5 minutes during store hours.</p>
              <MagButton className="btn-wa-lg" onClick={() => openWA(null)} strength={0.35} style={{ width:"100%", justifyContent:"center" }}>
                <MessageCircle size={17}/> Open WhatsApp
              </MagButton>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}

