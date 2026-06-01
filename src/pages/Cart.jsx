import React, { useMemo } from "react";
import { ShoppingCart, Trash2, ArrowRight, MessageCircle, Shield, Truck } from "lucide-react";
import { ScrambleText, WaveDivider, MagButton, Footer, WABand } from "../components/Shared.jsx";

export default function PageCart({ cart, setCart, openWA, navigate }) {
  const { totalMrp, totalDiscount, finalPrice } = useMemo(() => {
    let mrp = 0, price = 0;
    cart.forEach(item => {
      mrp += item.mrp;
      price += item.price;
    });
    return {
      totalMrp: mrp,
      totalDiscount: mrp - price,
      finalPrice: price
    };
  }, [cart]);

  const handleRemove = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutWA = () => {
    if (cart.length === 0) return;
    
    let msg = `Hi! I would like to order the following ${cart.length} items:\n\n`;
    cart.forEach((item, i) => {
      msg += `${i+1}. ${item.name} - ₹${item.price}\n`;
    });
    msg += `\nTotal Amount: ₹${finalPrice}\nPlease let me know the availability and payment details.`;
    
    // Defaulting to Saralai branch for generic checkout
    window.open(`https://wa.me/919965022228?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ animation:"page3dIn .25s var(--ease-out) both" }}>
      <div className="page-hero">
        <div className="page-hero-bg"/>
        <div className="page-hero-grid"/>
        <div className="page-pill"><ShoppingCart size={13}/>&nbsp; Your Cart</div>
        <h1><ScrambleText text="Shopping Bag" className="h1-plain" tag="span"/></h1>
        <p>Review your premium selections.</p>
      </div>

      <WaveDivider fill="var(--black)"/>

      <section className="sec sec-pt0">
        {cart.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 20px", background:"var(--b3)", borderRadius:16, border:"1px solid var(--glass-b)" }}>
            <div style={{ fontSize:"3rem", marginBottom:16 }}>🛒</div>
            <h2 style={{ fontSize:"1.8rem", color:"var(--white)", marginBottom:12, fontFamily:"'Cormorant Garamond', serif" }}>Your cart is empty</h2>
            <p style={{ color:"var(--gray-lt)", marginBottom:24 }}>Looks like you haven't made your choice yet.</p>
            <MagButton className="btn-red" onClick={() => navigate("shop")} strength={0.4} style={{ margin:"0 auto" }}>
              Explore Collections <ArrowRight size={16}/>
            </MagButton>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:40 }}>
            {/* Cart Items List */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div className="sec-ey">Review Items <span className="sec-ey-line"/></div>
              <h2 className="sec-h2" style={{ marginBottom:16 }}>{cart.length} Items Selected</h2>
              
              {cart.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", padding:16, background:"var(--b3)", borderRadius:12, border:"1px solid var(--glass-b)", position:"relative" }}>
                  <div style={{ width: 80, height: 80, flexShrink: 0, marginRight:16, background:"var(--b4)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", overflow: "hidden" }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize:"2rem" }}>{item.emoji}</span>
                    )}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, color:"var(--white)", fontSize:"1.05rem" }}>{item.name}</div>
                    <div style={{ fontSize:".8rem", color:"var(--gray-lt)", marginTop:4 }}>Category: {item.cat}</div>
                    <div style={{ marginTop:8, display:"flex", alignItems:"baseline", gap:8 }}>
                      <span style={{ color:"var(--red)", fontWeight:700 }}>₹{item.price}</span>
                      <span style={{ color:"var(--gray-lt)", textDecoration:"line-through", fontSize:".85rem", opacity:0.7 }}>₹{item.mrp}</span>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(i)} style={{ background:"none", border:"none", color:"var(--gray-lt)", cursor:"pointer", padding:8, borderRadius:8 }} onMouseEnter={e => e.currentTarget.style.color="var(--red)"} onMouseLeave={e => e.currentTarget.style.color="var(--gray-lt)"}>
                    <Trash2 size={18}/>
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary & Checkout */}
            <div>
              <div style={{ background:"var(--b3)", borderRadius:16, border:"1px solid var(--glass-b)", padding:32, position:"sticky", top:100 }}>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", color:"var(--white)", marginBottom:24 }}>Order Summary</h3>
                
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, color:"var(--gray-lt)" }}>
                  <span>Total MRP</span>
                  <span>₹{totalMrp}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, color:"var(--wa)" }}>
                  <span>Special Discount</span>
                  <span>- ₹{totalDiscount}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:24, color:"var(--gray-lt)" }}>
                  <span>Delivery Charges</span>
                  <span style={{ color:"var(--red)" }}>Free</span>
                </div>
                
                <div style={{ display:"flex", justifyContent:"space-between", padding:"20px 0", borderTop:"1px solid var(--glass-b)", borderBottom:"1px solid var(--glass-b)", marginBottom:24 }}>
                  <span style={{ fontWeight:600, color:"var(--white)", fontSize:"1.2rem" }}>Total Amount</span>
                  <span style={{ fontWeight:700, color:"var(--red)", fontSize:"1.4rem" }}>₹{finalPrice}</span>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <MagButton className="btn-wa-lg" onClick={handleCheckoutWA} strength={0.3} style={{ width:"100%", justifyContent:"center" }}>
                    <MessageCircle size={18}/> Checkout via WhatsApp
                  </MagButton>
                  <p style={{ fontSize:".8rem", color:"var(--gray)", textAlign:"center", marginTop:8 }}>You will be redirected to WhatsApp to confirm availability and sizes.</p>
                </div>

                <div style={{ marginTop:32, display:"flex", flexDirection:"column", gap:12 }}>
                  <div style={{ display:"flex", gap:12, color:"var(--gray-lt)", fontSize:".85rem", alignItems:"center" }}>
                    <Shield size={16} color="var(--red)"/> Secure Order Processing
                  </div>
                  <div style={{ display:"flex", gap:12, color:"var(--gray-lt)", fontSize:".85rem", alignItems:"center" }}>
                    <Truck size={16} color="var(--red)"/> Same day in-store pickup available
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <WaveDivider fill="var(--b2)"/>
      <Footer navigate={navigate}/>
    </div>
  );
}
