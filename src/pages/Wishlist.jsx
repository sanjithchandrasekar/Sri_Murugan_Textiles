import React from "react";
import { Heart, Search, ShoppingCart, ArrowRight } from "lucide-react";
import { PRODUCTS, ScrambleText, WaveDivider, MagButton, ProductCard, Footer, WABand } from "../components/Shared.jsx";

export default function PageWishlist({ wishlists, toggleWish, addCart, openWA, navigate }) {
  const wishItems = Object.keys(wishlists).map(key => {
    const val = wishlists[key];
    if (typeof val === 'object') return { ...val, wishKey: key };
    const p = PRODUCTS.find(p => p.id == key);
    return p ? { ...p, wishKey: key } : null;
  }).filter(Boolean);

  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><Heart size={13}/>&nbsp; Your Favorites</div>
        <h1><ScrambleText text="Saved Items" className="h1-plain" tag="span"/></h1>
        <p>Your curated list of premium factory-direct clothing.</p>
      </div>

      <WaveDivider fill="var(--black)"/>

      <section className="sec sec-pt0">
        {wishItems.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 20px", background:"var(--b3)", borderRadius:16, border:"1px solid var(--glass-b)" }}>
            <div style={{ fontSize:"3rem", marginBottom:16 }}>💔</div>
            <h2 style={{ fontSize:"1.8rem", color:"var(--white)", marginBottom:12, fontFamily:"'Cormorant Garamond', serif" }}>Your wishlist is empty</h2>
            <p style={{ color:"var(--gray-lt)", marginBottom:24 }}>You haven't saved any items yet. Browse our collections and click the heart icon to save your favorites.</p>
            <MagButton className="btn-red" onClick={() => navigate("shop")} strength={0.4} style={{ margin:"0 auto" }}>
              Explore Collections <ArrowRight size={16}/>
            </MagButton>
          </div>
        ) : (
          <div>
            <div className="sec-hd reveal">
              <div className="sec-ey">{wishItems.length} Items <span className="sec-ey-line"/></div>
              <h2 className="sec-h2">Your Wishlist</h2>
            </div>
            <div className="products-grid">
              {wishItems.map((p, i) => (
                <ProductCard key={p.wishKey || p.id} p={p} idx={i} wishlists={wishlists} toggleWish={toggleWish} addCart={addCart} openWA={openWA} />
              ))}
            </div>
          </div>
        )}
      </section>

      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}
