import React, { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Home, Grid, MapPin, Info, Mail, User } from "lucide-react";
import { MagButton } from "./components/Shared.jsx";
import PageHome from "./pages/Home.jsx";
import PageShop from "./pages/Shop.jsx";
import PageStores from "./pages/Stores.jsx";
import PageAbout from "./pages/About.jsx";
import PageContact from "./pages/Contact.jsx";
import PageAuth from "./pages/Auth.jsx";
import PageWishlist from "./pages/Wishlist.jsx";
import PageCart from "./pages/Cart.jsx";
import Preloader from "./components/Preloader.jsx";
import muruganLogo from "./assets/murugan.png";
import brandLogo from "./assets/logo-bg removal.png";
import "./styles/main.css";

/* ═══════════════════════════════════════════════════════════
   ROOT COMPONENT
═══════════════════════════════════════════════════════════ */
export default function SriMuruganTextiles() {
  const [page, setPage]             = useState("home");
  const [preGone, setPreGone]       = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [cart, setCart]             = useState([]);
  const [wishlists, setWishlists]   = useState({});
  const [toast, setToast]           = useState(null);
  const [toastOut, setToastOut]     = useState(false);
  const [mobileMenu, setMobile]     = useState(false);



  const navigateTo = useNavigate();
  const navigate = useCallback((pg) => {
    setPage(pg);
    setMobile(false);
    if (pg === 'home') navigateTo('/');
    else navigateTo('/' + pg);
    window.scrollTo({ top:0, behavior:"instant" });
  }, [navigateTo]);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.src = muruganLogo;
    
    Promise.all([
      new Promise(resolve => {
        if (img.complete) resolve();
        else { img.onload = resolve; img.onerror = resolve; }
      }),
      new Promise(resolve => setTimeout(resolve, 2200))
    ]).then(() => {
      if (isMounted) setPreGone(true);
    });

    return () => { isMounted = false; };
  }, []);
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } });
    }, { threshold:0.1, rootMargin:"0px 0px -50px 0px" });
    
    const run = () => {
      document.querySelectorAll(".reveal:not(.vis),.reveal-l:not(.vis),.reveal-r:not(.vis),.reveal-s:not(.vis)").forEach(el => obs.observe(el));
    };
    
    run();
    const int = setInterval(run, 500);
    return () => { clearInterval(int); obs.disconnect(); };
  }, []);



  const addCart = useCallback(p => {
    setCart(c => [...c, p]);
    setToastOut(false); setToast(p);
    setTimeout(() => { setToastOut(true); setTimeout(() => setToast(null), 400); }, 3000);
  }, []);
  const toggleWish = useCallback(id => setWishlists(w => ({ ...w, [id]:!w[id] })), []);
  const openWA = useCallback(p => {
    const msg = p?.name?.startsWith("Hi!") ? p.name
      : p ? `Hi! I'm interested in the ${p.name} at ₹${p.price}. Please share availability and sizes.`
           : "Hi! I'd like to browse your latest collection and place an order.";
    window.open(`https://wa.me/919965022228?text=${encodeURIComponent(msg)}`, "_blank");
  }, []);

  const NAV_PAGES = [
    { id:"home", label:"Home" }, { id:"shop", label:"Collections" },
    { id:"stores", label:"Stores" }, { id:"about", label:"About" }, { id:"contact", label:"Contact" },
  ];
  const MOB_TABS = [
    { id:"home", ic:<Home size={21}/>, lb:"Home" }, { id:"shop", ic:<Grid size={21}/>, lb:"Shop" },
    { id:"stores", ic:<MapPin size={21}/>, lb:"Stores" }, { id:"about", ic:<Info size={21}/>, lb:"About" }, { id:"contact", ic:<Mail size={21}/>, lb:"Contact" },
  ];

  return (
    <div className="R">
      

      {/* PRELOADER */}
      <Preloader preGone={preGone} />



      {/* TOAST */}
      {toast && (
        <div className={`toast${toastOut?" out":""}`}>
          <div className="toast-ic"><ShoppingCart size={18}/></div>
          <div><div className="toast-txt">Added to cart!</div><div className="toast-sub">{toast.name} · ₹{toast.price}</div></div>
        </div>
      )}

      {/* NAV */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo" onClick={() => navigate("home")}>
          <img src={brandLogo} alt="Sri Murugan Textiles Logo" className="nav-logo-img" />
          <div className="nav-logo-text">
            <div className="nav-logo-main">Sri&nbsp;<em>Murugan</em>&nbsp;Textiles</div>
            <div className="nav-logo-sub">Factory Direct Sales</div>
          </div>
        </div>
        <ul className="nav-links">
          {NAV_PAGES.map(p => (
            <li key={p.id} className={`nav-link-item${page===p.id?" active":""}`}>
              <button className="nav-link-btn" onClick={() => navigate(p.id)}>{p.label}</button>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="ic-btn" onClick={() => navigate("auth")}><User size={18}/></button>
          <button className="ic-btn" onClick={() => navigate("wishlist")}><Heart size={18}/></button>
          <MagButton className="cart-pill" onClick={() => navigate("cart")} strength={0.35}>
            <ShoppingCart size={17}/>Cart
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </MagButton>
          <button className="nav-hamburger ic-btn" onClick={() => setMobile(m => !m)}>
            {mobileMenu ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      {mobileMenu && (
        <div style={{ position:"fixed", top:76, left:0, right:0, zIndex:490, background:"rgba(14,14,14,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--glass-b)", padding:"16px 24px 24px", display:"flex", flexDirection:"column", gap:4, animation:"page3dIn .4s var(--ease-out) both" }}>
          {NAV_PAGES.map(p => (
            <button key={p.id} onClick={() => navigate(p.id)}
              style={{ background:page===p.id?"rgba(200,16,46,.12)":"none", border:"none", borderRadius:10, color:page===p.id?"var(--red)":"var(--gray-lt)", fontFamily:"'DM Sans',sans-serif", fontSize:".9rem", fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", padding:"14px 16px", textAlign:"left", transition:"background .2s,color .2s" }}>
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* PAGE CONTENT */}
      <Routes>
        <Route path="/" element={<PageHome addCart={addCart} openWA={openWA} wishlists={wishlists} toggleWish={toggleWish} navigate={navigate}/>} />
        <Route path="/shop" element={<PageShop addCart={addCart} openWA={openWA} wishlists={wishlists} toggleWish={toggleWish} navigate={navigate}/>} />
        <Route path="/stores" element={<PageStores openWA={openWA} navigate={navigate}/>} />
        <Route path="/about" element={<PageAbout openWA={openWA} navigate={navigate}/>} />
        <Route path="/contact" element={<PageContact openWA={openWA} navigate={navigate}/>} />
        <Route path="/auth" element={<PageAuth navigate={navigate}/>} />
        <Route path="/wishlist" element={<PageWishlist wishlists={wishlists} toggleWish={toggleWish} addCart={addCart} navigate={navigate} openWA={openWA} />} />
        <Route path="/cart" element={<PageCart cart={cart} setCart={setCart} navigate={navigate} openWA={openWA} />} />
      </Routes>



      {/* MOBILE NAV BAR */}
      <nav className="mob-nav">
        <div className="mob-nav-in">
          {MOB_TABS.map(item => (
            <button key={item.id} className={`mob-ic${page===item.id?" on":""}`} onClick={() => navigate(item.id)}>
              {item.ic}{item.lb}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
