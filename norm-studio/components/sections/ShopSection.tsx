"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const DELIVERY_FEE = 150; // KES flat rate

const PRODUCTS = [
  { id:"315-bowl",      name:"The 315 Bowl",      subtitle:"Hand-thrown stoneware",  price:2800, image:"/images/shop/315-bowl.jpg",      tag:"Bestseller" },
  { id:"stackable-cup", name:"Stackable Cup 01",  subtitle:"Wheel-thrown, stackable",price:1800, image:"/images/shop/stackable-cup.jpg",  tag:null },
  { id:"pour-over",     name:"Gigiri Pour-Over",  subtitle:"Single-hole dripper",    price:3500, image:"/images/shop/pour-over.jpg",       tag:"New" },
  { id:"glaze-plate",   name:"Studio Glaze Plate",subtitle:"Slab-built dinner plate",price:2200, image:"/images/shop/glaze-plate.jpg",     tag:null },
];

type CartItem = { product: typeof PRODUCTS[0]; qty: number };
type CheckoutStep = "idle"|"summary"|"cart"|"fulfillment"|"payment"|"done";
type FulfillType = "pickup"|"delivery"|null;
type PayMethod = "mpesa"|"card"|null;

const fmt = (n: number) => `KES ${n.toLocaleString()}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ShopSection() {
  const [hoverId, setHoverId]       = useState<string|null>(null);
  const [cart, setCart]             = useState<CartItem[]>([]);
  const [pendingItem, setPending]   = useState<typeof PRODUCTS[0]|null>(null);
  const [step, setStep]             = useState<CheckoutStep>("idle");
  const [fulfillType, setFulfill]   = useState<FulfillType>(null);
  const [address, setAddress]       = useState("");
  const [payMethod, setPayMeth]     = useState<PayMethod>(null);
  const [form, setForm]             = useState({ name:"", email:"", phone:"+254", card:"" });
  const [submitting, setSubmit]     = useState(false);

  const hoveredProd  = PRODUCTS.find(p => p.id === hoverId);
  const defaultImage = PRODUCTS[0].image;

  const cartTotal    = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const deliveryFee  = fulfillType === "delivery" ? DELIVERY_FEE : 0;
  const grandTotal   = cartTotal + deliveryFee;

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (exists) return prev.map(i => i.product.id===product.id ? {...i,qty:i.qty+1} : i);
      return [...prev, { product, qty:1 }];
    });
  };

  const openBuy = (p: typeof PRODUCTS[0]) => {
    setPending(p); setStep("summary");
  };

  const continueShopping = () => {
    if (pendingItem) addToCart(pendingItem);
    setPending(null); setStep("idle");
  };

  const proceedToCart = () => {
    if (pendingItem) addToCart(pendingItem);
    setPending(null); setStep("cart");
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payMethod) return;
    if (!EMAIL_RE.test(form.email)) return;
    setSubmit(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmit(false);
    setStep("done");
  };

  const reset = () => {
    setCart([]); setStep("idle"); setFulfill(null); setAddress("");
    setPayMeth(null); setForm({ name:"", email:"", phone:"+254", card:"" });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.product.id===id ? {...i,qty:Math.max(1,i.qty+delta)} : i).filter(i=>i.qty>0));
  };
  const removeItem = (id: string) => setCart(prev => prev.filter(i=>i.product.id!==id));

  return (
    <section id="shop" style={{ backgroundColor:"#FDF9F3", minHeight:"100vh", display:"flex", flexDirection:"column", justifyItems:"center", paddingBottom:"6rem", paddingTop:"4rem" }} aria-label="Shop">
      
      {/* Hide Scrollbar for mobile swipe */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div style={{ padding:"2rem 2.5rem 3rem" }}>
        <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(26,17,11,0.5)", marginBottom:"1rem" }}>
          Take a piece home
        </p>
        <h2 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, fontSize:"clamp(3rem,7vw,6rem)", color:"#1A110B", lineHeight:0.95, letterSpacing:"-0.02em" }}>
          The Collection
        </h2>
        {cart.length > 0 && (
          <button onClick={() => setStep("cart")}
            style={{ marginTop:"1.25rem", display:"inline-flex", alignItems:"center", gap:"8px", fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#FDF9F3", background:"#1A110B", padding:"9px 16px", borderRadius:"2px", border:"none", cursor:"pointer" }}>
            View cart ({cart.reduce((s,i)=>s+i.qty,0)} item{cart.reduce((s,i)=>s+i.qty,0)!==1?"s":""}) · {fmt(cartTotal)}
          </button>
        )}
      </div>

      <div className="px-0 md:px-10">
        <div style={{ display:"grid", gap:"4rem", alignItems:"start" }} className="grid-cols-1 md:grid-cols-2 max-md:gap-8">

          {/* ─── MOBILE: Touchy Coffee Swipe Carousel ─── */}
          {/* 10vw padding on the ends ensures the centered item lets its neighbors peek in */}
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full pb-8" style={{ paddingLeft: "10vw", paddingRight: "10vw" }}>
            {PRODUCTS.map((p, idx) => (
              <div key={`mob-${p.id}`} className="w-[80vw] snap-center shrink-0 relative flex flex-col items-center justify-between" style={{ padding: "0 4vw" }}>
                
                {/* Top Number Indicator & Tags */}
                <div className="flex flex-col items-center justify-center w-full mb-6">
                  <span className="font-satoshi text-[11px] tracking-[0.2em] text-[#1A110B]/50 uppercase mb-2">
                    0{idx + 1} / 0{PRODUCTS.length}
                  </span>
                  {p.tag && (
                    <span className="font-satoshi text-[9px] tracking-widest uppercase bg-[#FF4D00] text-white py-1 px-2 rounded-sm">
                      {p.tag}
                    </span>
                  )}
                </div>

                {/* Massive Borderless Image */}
                <div className="relative w-full aspect-[4/5] mb-8">
                  <Image src={p.image} alt={p.name} fill className="object-contain" sizes="80vw"/>
                </div>

                {/* Typography and Button */}
                <div className="text-center w-full mt-auto">
                  <h3 className="font-cormorant font-bold text-3xl text-[#1A110B] mb-2 leading-none tracking-tight">{p.name}</h3>
                  <p className="font-satoshi text-xs text-[#1A110B]/60 mb-6 uppercase tracking-widest">{p.subtitle}</p>
                  
                  {/* Sleek Buy Button */}
                  <button
                    onClick={() => openBuy(p)}
                    className="w-full max-w-[220px] py-4 mx-auto bg-[#1A110B] text-[#FDF9F3] font-satoshi text-[11px] tracking-[0.2em] uppercase rounded-full active:scale-95 transition-transform"
                  >
                    Buy — {fmt(p.price)}
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* ─── DESKTOP: Original Vertical List ─── */}
          <div className="hidden md:block border-t border-[#1A110B]/15">
            {PRODUCTS.map((p) => (
              <div key={`desk-${p.id}`} style={{ borderBottom:"0.5px solid rgba(26,17,11,0.15)" }}
                   onMouseEnter={() => setHoverId(p.id)}
                   onMouseLeave={() => setHoverId(null)}>
                <div style={{ padding:"1.5rem 0", display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    {p.tag && <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", background:"#FF4D00", color:"#FDF9F3", padding:"2px 7px", borderRadius:"2px", display:"inline-block", marginBottom:"5px" }}>{p.tag}</span>}
                    <p style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, fontSize:"clamp(1.4rem,2.5vw,2rem)", lineHeight:1.05, color: hoverId===p.id?"#FF4D00":"#1A110B", transition:"color 0.2s", marginBottom:"2px" }}>
                      {p.name}
                    </p>
                    <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(26,17,11,0.6)", marginBottom:"0.75rem" }}>{p.subtitle}</p>
                    <p style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, fontSize:"1.3rem", color:"#1A110B", marginBottom:"0.75rem" }}>{fmt(p.price)}</p>
                    <button onClick={() => openBuy(p)}
                      style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#FDF9F3", background:"#1A110B", padding:"8px 14px", borderRadius:"2px", border:"none", cursor:"pointer", transition:"background 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="#FF4D00")}
                      onMouseLeave={e=>(e.currentTarget.style.background="#1A110B")}>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <p style={{ marginTop:"1.75rem", fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(26,17,11,0.5)", lineHeight:1.7 }}>
              Ships across Kenya in 3–5 days.<br/>Pickup at 315 UN Crescent, Gigiri.
            </p>
          </div>

          {/* ─── THE POPUP: Mobile Fixed Modal / Desktop Sticky ─── */}
          <div className={`
            md:sticky md:top-[15vh] md:block
            ${step !== "idle" 
              ? "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm md:bg-transparent md:p-0 md:z-auto" 
              : "hidden"}
          `}>
            <AnimatePresence mode="wait">
              {step==="idle" ? (
                <motion.div key={hoverId || "default"}
                  initial={{ opacity:0, y:10, scale:0.98 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-8, scale:0.98 }}
                  transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
                  style={{ position:"relative", aspectRatio:"4/5", borderRadius:"4px", overflow:"hidden" }}
                  className="hidden md:block"
                >
                  <Image src={hoveredProd?.image || defaultImage} alt={hoveredProd?.name || "Norm Ceramics"} fill className="object-cover" sizes="45vw"/>
                  {!hoveredProd && (
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"flex-end", padding:"2rem" }}>
                      <p style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, color:"rgba(253,249,243,0.7)", fontSize:"1.5rem", mixBlendMode:"difference" }}>The Collection</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Checkout panel Modal Box */
                <motion.div key="checkout-panel"
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
                  style={{ background:"#1A110B", borderRadius:"12px", padding:"2rem", color:"#FDF9F3", maxHeight:"85dvh", overflowY:"auto", boxShadow:"0 20px 40px rgba(0,0,0,0.3)" }}
                  className="w-full max-w-md md:max-w-none md:rounded-[4px] md:shadow-none"
                >

                  <AnimatePresence mode="wait">

                    {/* Step 1: Summary */}
                    {step==="summary" && pendingItem && (
                      <motion.div key="summary" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(253,249,243,0.3)", marginBottom:"1.25rem" }}>Added to cart</p>
                        <div style={{ padding:"14px", background:"rgba(253,249,243,0.06)", borderRadius:"2px", marginBottom:"1.5rem" }}>
                          <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", color:"rgba(253,249,243,0.7)", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                            1 × {pendingItem.name.toUpperCase()} — {fmt(pendingItem.price)}
                          </p>
                        </div>
                        <p style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, color:"rgba(253,249,243,0.55)", fontSize:"1.3rem", marginBottom:"1.25rem" }}>
                          Is that all you will be buying?
                        </p>
                        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                          <button onClick={proceedToCart}
                            style={{ padding:"12px", background:"#FF4D00", color:"#FDF9F3", border:"none", borderRadius:"2px", fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer" }}>
                            Proceed to checkout →
                          </button>
                          <button onClick={continueShopping}
                            style={{ padding:"12px", background:"rgba(253,249,243,0.07)", color:"rgba(253,249,243,0.6)", border:"0.5px solid rgba(253,249,243,0.15)", borderRadius:"2px", fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer" }}>
                            Continue shopping
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Cart review */}
                    {step==="cart" && (
                      <motion.div key="cart" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(253,249,243,0.3)", marginBottom:"1.25rem" }}>Your cart</p>
                        {cart.length === 0 ? (
                           <p className="text-white/50 text-sm font-satoshi mb-6">Your cart is empty.</p>
                        ) : (
                          <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"1.5rem" }}>
                            {cart.map(item => (
                              <div key={item.product.id} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", background:"rgba(253,249,243,0.05)", borderRadius:"2px" }}>
                                <div style={{ flex:1 }}>
                                  <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", color:"#FDF9F3", fontWeight:500 }}>{item.product.name}</p>
                                  <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", color:"rgba(253,249,243,0.38)" }}>{fmt(item.product.price)} each</p>
                                </div>
                                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                                  <button onClick={()=>updateQty(item.product.id,-1)} style={{ width:24, height:24, borderRadius:"50%", background:"rgba(253,249,243,0.1)", border:"none", color:"#FDF9F3", cursor:"pointer", fontSize:"14px", display:"flex", alignItems:"center", justifyItems:"center" }}>−</button>
                                  <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", color:"#FDF9F3", minWidth:"16px", textAlign:"center" }}>{item.qty}</span>
                                  <button onClick={()=>updateQty(item.product.id,1)}  style={{ width:24, height:24, borderRadius:"50%", background:"rgba(253,249,243,0.1)", border:"none", color:"#FDF9F3", cursor:"pointer", fontSize:"14px", display:"flex", alignItems:"center", justifyItems:"center" }}>+</button>
                                </div>
                                <div style={{ textAlign:"right", minWidth:"60px" }}>
                                  <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", color:"#FDF9F3" }}>{fmt(item.product.price*item.qty)}</p>
                                  <button onClick={()=>removeItem(item.product.id)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", color:"rgba(253,249,243,0.25)", letterSpacing:"0.1em" }}>remove</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div style={{ borderTop:"0.5px solid rgba(253,249,243,0.12)", paddingTop:"1rem", marginBottom:"1.5rem" }}>
                          <div style={{ display:"flex", justifyContent:"space-between" }}>
                            <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", color:"rgba(253,249,243,0.5)" }}>Subtotal</span>
                            <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", color:"#FDF9F3" }}>{fmt(cartTotal)}</span>
                          </div>
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                          <button onClick={() => setStep("fulfillment")} disabled={cart.length === 0}
                            style={{ padding:"12px", background:cart.length===0?"rgba(253,249,243,0.08)":"#FF4D00", color:cart.length===0?"rgba(253,249,243,0.3)":"#FDF9F3", border:"none", borderRadius:"2px", fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:cart.length===0?"not-allowed":"pointer" }}>
                            Choose fulfillment →
                          </button>
                          <button onClick={() => setStep("idle")}
                            style={{ padding:"12px", background:"rgba(253,249,243,0.06)", color:"rgba(253,249,243,0.5)", border:"0.5px solid rgba(253,249,243,0.12)", borderRadius:"2px", fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer" }}>
                            {cart.length === 0 ? "← Back to Shop" : "+ Add more items"}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Fulfillment */}
                    {step==="fulfillment" && (
                      <motion.div key="fulfillment" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(253,249,243,0.3)", marginBottom:"1.25rem" }}>How would you like your pieces?</p>
                        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"1.5rem" }}>
                          {[
                            { id:"pickup" as FulfillType, label:"Studio Pickup", sub:"315 UN Crescent · Mon–Sat 10AM–6PM", fee:0 },
                            { id:"delivery" as FulfillType, label:"Delivery", sub:"3-5 days · Anywhere in Kenya", fee:DELIVERY_FEE },
                          ].map(f => (
                            <button key={f.id!} onClick={() => setFulfill(f.id)}
                              style={{ textAlign:"left", padding:"14px 16px", background:fulfillType===f.id?"rgba(255,77,0,0.14)":"rgba(253,249,243,0.05)", border:"0.5px solid", borderColor:fulfillType===f.id?"#FF4D00":"rgba(253,249,243,0.12)", borderRadius:"2px", cursor:"pointer", transition:"all 0.2s" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                                <div>
                                  <span style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, color:"#FDF9F3", fontSize:"1.2rem", display:"block" }}>{f.label}</span>
                                  <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", color:"rgba(253,249,243,0.35)" }}>{f.sub}</span>
                                </div>
                                <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(253,249,243,0.5)", flexShrink:0, marginLeft:"8px" }}>
                                  {f.fee===0 ? "Free" : `+${fmt(f.fee)}`}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>

                        {fulfillType==="delivery" && (
                          <div style={{ marginBottom:"1.25rem" }}>
                            <label style={{ display:"block", fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(253,249,243,0.3)", marginBottom:"5px" }}>Delivery address</label>
                            <input type="text" placeholder="Street address, city, county"
                              value={address} onChange={e => setAddress(e.target.value)}
                              style={{ width:"100%", padding:"11px 13px", background:"rgba(253,249,243,0.06)", border:"0.5px solid rgba(253,249,243,0.18)", borderRadius:"2px", color:"#FDF9F3", fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", outline:"none" }} />
                          </div>
                        )}

                        {/* Price breakdown */}
                        {fulfillType && (
                          <div style={{ padding:"12px 14px", background:"rgba(253,249,243,0.04)", borderRadius:"2px", marginBottom:"1.25rem" }}>
                            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                              <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(253,249,243,0.45)" }}>Subtotal</span>
                              <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(253,249,243,0.6)" }}>{fmt(cartTotal)}</span>
                            </div>
                            {fulfillType==="delivery" && (
                              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                                <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(253,249,243,0.45)" }}>Delivery fee</span>
                                <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(253,249,243,0.6)" }}>{fmt(DELIVERY_FEE)}</span>
                              </div>
                            )}
                            <div style={{ borderTop:"0.5px solid rgba(253,249,243,0.1)", paddingTop:"6px", marginTop:"6px", display:"flex", justifyContent:"space-between" }}>
                              <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", color:"#FDF9F3", fontWeight:500 }}>Total</span>
                              <span style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, fontSize:"1.25rem", color:"#FDF9F3" }}>{fmt(grandTotal)}</span>
                            </div>
                          </div>
                        )}

                        <button onClick={() => setStep("payment")} disabled={!fulfillType || (fulfillType==="delivery" && !address.trim())}
                          style={{ width:"100%", padding:"12px", background:(!fulfillType||(fulfillType==="delivery"&&!address.trim()))?"rgba(253,249,243,0.08)":"#FF4D00", color:(!fulfillType||(fulfillType==="delivery"&&!address.trim()))?"rgba(253,249,243,0.25)":"#FDF9F3", border:"none", borderRadius:"2px", fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:(!fulfillType||(fulfillType==="delivery"&&!address.trim()))?"not-allowed":"pointer" }}>
                          Continue to payment →
                        </button>
                        <button onClick={() => setStep("cart")} style={{ marginTop:"0.75rem", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(253,249,243,0.22)" }}>
                          ← Back
                        </button>
                      </motion.div>
                    )}

                    {/* Step 4: Payment */}
                    {step==="payment" && (
                      <motion.div key="payment" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(253,249,243,0.3)", marginBottom:"1.25rem" }}>
                          {fmt(grandTotal)} total
                        </p>
                        <form onSubmit={handlePayment} style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                          {[{key:"name",label:"Full name",type:"text",ph:"Your name"},{key:"email",label:"Email",type:"email",ph:"you@example.com"}].map(f => (
                            <div key={f.key}>
                              <label style={{ display:"block", fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(253,249,243,0.3)", marginBottom:"4px" }}>{f.label}</label>
                              <input type={f.type} required placeholder={f.ph}
                                value={(form as Record<string,string>)[f.key]}
                                onChange={e => setForm(p=>({...p,[f.key]:e.target.value}))}
                                style={{ width:"100%", padding:"10px 12px", background:"rgba(253,249,243,0.06)", border:"0.5px solid rgba(253,249,243,0.18)", borderRadius:"2px", color:"#FDF9F3", fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", outline:"none" }} />
                            </div>
                          ))}

                          <div>
                            <label style={{ display:"block", fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(253,249,243,0.3)", marginBottom:"6px" }}>Payment method</label>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px" }}>
                              {[{id:"mpesa" as PayMethod,label:"M-Pesa",sub:"STK push"},{id:"card" as PayMethod,label:"Card",sub:"Visa · Mastercard"}].map(pm => (
                                <button type="button" key={pm.id!} onClick={() => setPayMeth(pm.id)}
                                  style={{ textAlign:"left", padding:"10px 11px", background:payMethod===pm.id?"rgba(255,77,0,0.14)":"rgba(253,249,243,0.05)", border:"0.5px solid", borderColor:payMethod===pm.id?"#FF4D00":"rgba(253,249,243,0.12)", borderRadius:"2px", cursor:"pointer" }}>
                                  <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontWeight:500, fontSize:"12px", color:"#FDF9F3", display:"block" }}>{pm.label}</span>
                                  <span style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", color:"rgba(253,249,243,0.3)" }}>{pm.sub}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {payMethod==="mpesa" && (
                            <input type="tel" required placeholder="+254 7XX XXX XXX" value={form.phone}
                              onChange={e => setForm(p=>({...p,phone:e.target.value}))}
                              style={{ width:"100%", padding:"10px 12px", background:"rgba(253,249,243,0.06)", border:"0.5px solid rgba(253,249,243,0.18)", borderRadius:"2px", color:"#FDF9F3", fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", outline:"none" }} />
                          )}
                          {payMethod==="card" && (
                            <input type="text" required placeholder="•••• •••• •••• ••••" value={form.card}
                              onChange={e => setForm(p=>({...p,card:e.target.value}))}
                              style={{ width:"100%", padding:"10px 12px", background:"rgba(253,249,243,0.06)", border:"0.5px solid rgba(253,249,243,0.18)", borderRadius:"2px", color:"#FDF9F3", fontFamily:"var(--font-satoshi),system-ui", fontSize:"13px", outline:"none" }} />
                          )}

                          <button type="submit" disabled={!payMethod||submitting}
                            style={{ padding:"12px", background:!payMethod?"rgba(253,249,243,0.08)":submitting?"rgba(255,77,0,0.5)":"#FF4D00", color:!payMethod?"rgba(253,249,243,0.25)":"#FDF9F3", border:"none", borderRadius:"2px", fontFamily:"var(--font-satoshi),system-ui", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:!payMethod||submitting?"not-allowed":"pointer" }}>
                            {submitting?"Processing...":!payMethod?"Select payment method":fmt(grandTotal)+" — Confirm"}
                          </button>
                        </form>
                        <button onClick={() => setStep("fulfillment")} style={{ marginTop:"0.75rem", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(253,249,243,0.22)" }}>
                          ← Back
                        </button>
                      </motion.div>
                    )}

                    {/* Step 5: Done */}
                    {step==="done" && (
                      <motion.div key="done" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.5,ease:[0.16,1,0.3,1]}} style={{ textAlign:"center", paddingTop:"1rem" }}>
                        <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(255,77,0,0.12)", border:"0.5px solid #FF4D00", display:"flex", alignItems:"center", justifyItems:"center", margin:"0 auto 1.25rem" }}>
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="M4 10L8 14L16 6" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontWeight:700, color:"#FDF9F3", fontSize:"2rem", marginBottom:"8px" }}>Order confirmed.</h3>
                        <p style={{ fontFamily:"var(--font-satoshi),system-ui", fontSize:"12px", color:"rgba(253,249,243,0.4)", lineHeight:1.7, marginBottom:"1.5rem" }}>
                          {fulfillType==="pickup" ? "Ready for collection at 315 UN Crescent." : "We will arrange delivery within 3-5 days."}<br/>
                          Confirmation sent to {form.email}.
                        </p>
                        <button onClick={reset}
                          style={{ background:"none", border:"0.5px solid rgba(253,249,243,0.2)", borderRadius:"2px", padding:"10px 18px", cursor:"pointer", fontFamily:"var(--font-satoshi),system-ui", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(253,249,243,0.45)" }}>
                          Buy another item
                        </button>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}