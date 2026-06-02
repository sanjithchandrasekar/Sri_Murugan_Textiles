import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, MessageCircle, ArrowLeft, Star, Heart, CheckCircle, Shield, Truck } from "lucide-react";
import { MagButton, Footer } from "../components/Shared.jsx";

export default function PageProductDetail({ addCart, openWA, wishlists, toggleWish, navigate, products }) {
  const { id } = useParams();
  const location = useLocation();
  const product = products.find((p) => p._id === id || p.id === parseInt(id));

  const [activeImage, setActiveImage] = useState(null);
  const [activeColorName, setActiveColorName] = useState(null);
  const [activeSize, setActiveSize] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (product) {
      const incomingColor = location.state?.colorName;
      if (incomingColor && product.colors) {
        const found = product.colors.find(c => c.name === incomingColor);
        if (found) {
          setActiveImage(found.img);
          setActiveColorName(found.name);
          return;
        }
      }

      if (product.colors && product.colors.length > 0) {
        setActiveImage(product.colors[0].img);
        setActiveColorName(product.colors[0].name);
      } else {
        setActiveImage(product.image);
        setActiveColorName(null);
      }

      if (product.sizes && product.sizes.length > 0) {
        setActiveSize(product.sizes[0]);
      }
    }
  }, [product, id, location.state]);

  if (products.length === 0) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh" }}>
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh" }}>
        <h2>Product not found</h2>
        <MagButton className="btn-sm" onClick={() => navigate("shop")} style={{ marginTop: 20 }}>
          <ArrowLeft size={16} /> Back to Shop
        </MagButton>
      </div>
    );
  }

  const selectedProduct = {
    ...product,
    name: `${product.name}${activeColorName && activeColorName !== "All Colors" ? ` (${activeColorName})` : ""}`,
    image: activeColorName && activeColorName !== "All Colors" ? activeImage : product.image,
    colorName: activeColorName && activeColorName !== "All Colors" ? activeColorName : null,
    size: activeSize
  };

  const wishKey = `${product.id}${selectedProduct.colorName ? `-${selectedProduct.colorName}` : ''}${activeSize ? `-${activeSize}` : ''}`;

  return (
    <div style={{ animation: "page3dIn .3s var(--ease-out) both" }}>
      <div className="sec sec-pt0" style={{ paddingTop: 120 }}>
        <button 
          onClick={() => window.history.back()} 
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "var(--gray-lt)", cursor: "pointer", marginBottom: 32, fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, transition: "color 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--red)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--gray-lt)"}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          
          {/* Image/Emoji Section */}
          <div style={{ background: "var(--b3)", borderRadius: 24, padding: "10%", aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", border: "1px solid var(--glass-b)" }}>
            {activeImage ? (
              <img src={activeImage} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", position: "absolute", inset: 0 }} />
            ) : (
              <div style={{ fontSize: "10rem", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))" }}>{product.emoji}</div>
            )}
            
            <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 8, flexDirection: "column" }}>
              <span className="badge badge-factory">Fixed Price</span>
              {product.isNew && <span className="badge badge-new">New</span>}
            </div>

            <button 
              onClick={() => toggleWish(wishKey, selectedProduct)}
              style={{ position: "absolute", top: 20, right: 20, width: 44, height: 44, borderRadius: "50%", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--glass-b)", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "transform 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <Heart size={20} fill={wishlists[wishKey] ? "#c8102e" : "none"} color={wishlists[wishKey] ? "#c8102e" : "var(--gray-lt)"}/>
            </button>
          </div>

          {/* Details Section */}
          <div>
            <div style={{ color: "var(--gray-lt)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {product.cat}
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", lineHeight: 1.1, marginBottom: 16 }}>
              {product.name}
            </h1>
            
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: "0.9rem", color: "var(--gray-lt)", marginBottom: 12 }}>
                  Color: <strong style={{ color: "var(--white)", fontWeight: 600 }}>{activeColorName}</strong>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImage(c.img);
                        setActiveColorName(c.name);
                      }}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 10,
                        padding: 0,
                        border: activeImage === c.img ? "2px solid var(--red)" : "1px solid var(--glass-b)",
                        background: "var(--b4)",
                        cursor: "pointer",
                        overflow: "hidden",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => { if (activeImage !== c.img) e.currentTarget.style.borderColor = "var(--gray-lt)"; }}
                      onMouseLeave={(e) => { if (activeImage !== c.img) e.currentTarget.style.borderColor = "var(--glass-b)"; }}
                    >
                      <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: "0.9rem", color: "var(--gray-lt)", marginBottom: 12 }}>
                  Size: <strong style={{ color: "var(--white)", fontWeight: 600 }}>{activeSize}</strong>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSize(s)}
                      style={{
                        minWidth: 48,
                        height: 48,
                        borderRadius: 10,
                        padding: "0 12px",
                        border: activeSize === s ? "2px solid var(--red)" : "1px solid var(--glass-b)",
                        background: activeSize === s ? "var(--red)" : "var(--b4)",
                        color: activeSize === s ? "var(--white)" : "var(--gray-lt)",
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => { if (activeSize !== s) e.currentTarget.style.borderColor = "var(--gray-lt)"; }}
                      onMouseLeave={(e) => { if (activeSize !== s) e.currentTarget.style.borderColor = "var(--glass-b)"; }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
              <span style={{ fontSize: "2rem", fontWeight: 600, color: "var(--red)" }}>₹{product.price}</span>
              <span style={{ fontSize: "1.2rem", color: "var(--gray-lt)", textDecoration: "line-through" }}>₹{product.mrp}</span>
            </div>

            <p style={{ color: "var(--gray-lt)", lineHeight: 1.7, marginBottom: 40, fontSize: "1.05rem" }}>
              Experience premium quality and exceptional comfort with our {product.name}. 
              Crafted from high-grade materials, this piece is designed for perfect fit and lasting durability. 
              Available exclusively at unbeatable prices from Sri Murugan Textiles.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              <MagButton onClick={() => addCart(selectedProduct)} strength={0.2} style={{ background: "var(--black)", color: "var(--white)", border: "none", padding: "18px", borderRadius: 12, fontWeight: 600, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <ShoppingCart size={20} /> Add to Cart
              </MagButton>
              <MagButton onClick={() => openWA(selectedProduct)} strength={0.2} style={{ background: "#25D366", color: "white", border: "none", padding: "18px", borderRadius: 12, fontWeight: 600, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <MessageCircle size={20} /> WhatsApp Us
              </MagButton>
            </div>

            <div style={{ borderTop: "1px solid var(--glass-b)", paddingTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--gray-lt)", fontSize: "0.95rem" }}>
                <CheckCircle size={20} color="var(--red)"/>
                <span>In stock at Saralai & Bhavani branches</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--gray-lt)", fontSize: "0.95rem" }}>
                <Shield size={20} color="var(--red)"/>
                <span>100% Quality Guarantee from Sri Murugan Textiles</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--gray-lt)", fontSize: "0.95rem" }}>
                <Truck size={20} color="var(--red)"/>
                <span>Same day pickup available in-store</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
