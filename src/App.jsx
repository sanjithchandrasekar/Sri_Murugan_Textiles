import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Home, Grid, MapPin, Info, Mail, User } from "lucide-react";
import { AuthContext } from "./context/AuthContext.jsx";
import { MagButton } from "./components/Shared.jsx";
import PageHome from "./pages/Home.jsx";
import PageShop from "./pages/Shop.jsx";
import PageStores from "./pages/Stores.jsx";
import PageAbout from "./pages/About.jsx";
import PageContact from "./pages/Contact.jsx";
import PageAuth from "./pages/Auth.jsx";
import PageWishlist from "./pages/Wishlist.jsx";
import PageCart from "./pages/Cart.jsx";
import PageProductDetail from "./pages/ProductDetail.jsx";
import PageTestDB from "./pages/TestDB.jsx";
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
  const [products, setProducts]     = useState([]);
  const [toast, setToast]           = useState(null);
  const [toastOut, setToastOut]     = useState(false);
  const [mobileMenu, setMobile]     = useState(false);
  
  const { token, API_URL } = useContext(AuthContext);



  const navigateTo = useNavigate();
  const navigate = useCallback((pg) => {
    setPage(pg);
    setMobile(false);
    if (pg === 'home') navigateTo('/');
    else if (pg.startsWith('product/')) navigateTo('/' + pg);
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
    
    let timeout;
    const observer = new MutationObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(run, 100);
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    run();
    
    return () => { clearTimeout(timeout); observer.disconnect(); obs.disconnect(); };
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      })
      .catch(err => console.error("Failed to fetch products:", err));

    if (token) {
      // Fetch Wishlist
      fetch(`${API_URL}/wishlist`, { headers: { 'x-auth-token': token }})
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const w = {};
            data.data.forEach(id => w[id] = true);
            setWishlists(w);
          }
        });
      // Fetch Cart
      fetch(`${API_URL}/cart`, { headers: { 'x-auth-token': token }})
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.items) {
            setCart(data.data.items.map(item => ({
              ...item.product,
              quantity: item.quantity,
              cartItemId: item._id
            })));
          }
        });
    }
  }, [token, API_URL]);



  const addCart = useCallback(async p => {
    if (!token) return alert('Please login to add items to cart!');
    
    setToastOut(false); setToast(p);
    setTimeout(() => { setToastOut(true); setTimeout(() => setToast(null), 400); }, 3000);

    const res = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
      body: JSON.stringify({ productId: p._id || p.id, quantity: 1, price: p.price, color: p.colors?.[0]?.name, size: p.sizes?.[0] })
    });
    const data = await res.json();
    if (data.success) {
      setCart(data.data.items.map(item => ({
        ...item.product,
        quantity: item.quantity,
        cartItemId: item._id
      })));
    }
  }, [token, API_URL]);

  const toggleWish = useCallback(async (id, customData) => {
    if (!token) return alert('Please login to use wishlist!');
    
    setWishlists(w => {
      if (w[id]) {
        const next = { ...w };
        delete next[id];
        return next;
      }
      return { ...w, [id]: customData || true };
    });

    await fetch(`${API_URL}/wishlist/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
      body: JSON.stringify({ productId: id })
    });
  }, [token, API_URL]);
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
          <button className="ic-btn" onClick={() => navigate("wishlist")} style={{ position: "relative" }}>
            <Heart size={18}/>
            {Object.values(wishlists).filter(Boolean).length > 0 && (
              <span className="cart-badge" style={{ position: "absolute", top: -4, right: -4 }}>
                {Object.values(wishlists).filter(Boolean).length}
              </span>
            )}
          </button>
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
        <div style={{ position:"fixed", top:76, left:0, right:0, zIndex:490, background:"rgba(255,255,255,.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--glass-b)", padding:"16px 24px 24px", display:"flex", flexDirection:"column", gap:4, animation:"page3dIn .4s var(--ease-out) both" }}>
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
        <Route path="/" element={<PageHome addCart={addCart} openWA={openWA} wishlists={wishlists} toggleWish={toggleWish} navigate={navigate} products={products} />} />
        <Route path="/shop" element={<PageShop addCart={addCart} openWA={openWA} wishlists={wishlists} toggleWish={toggleWish} navigate={navigate} products={products} />} />
        <Route path="/stores" element={<PageStores openWA={openWA} navigate={navigate} />} />
        <Route path="/about" element={<PageAbout openWA={openWA} navigate={navigate} />} />
        <Route path="/contact" element={<PageContact openWA={openWA} navigate={navigate} />} />
        <Route path="/auth" element={<PageAuth navigate={navigate} />} />
        <Route path="/wishlist" element={<PageWishlist wishlists={wishlists} toggleWish={toggleWish} addCart={addCart} navigate={navigate} openWA={openWA} products={products} />} />
        <Route path="/cart" element={<PageCart cart={cart} setCart={setCart} navigate={navigate} openWA={openWA} products={products} />} />
        <Route path="/product/:id" element={<PageProductDetail addCart={addCart} openWA={openWA} wishlists={wishlists} toggleWish={toggleWish} navigate={navigate} products={products} />} />
        <Route path="/test" element={<PageTestDB navigate={navigate} />} />
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
