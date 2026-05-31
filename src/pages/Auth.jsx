import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Auth({ navigate }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-bg"></div>
      
      <div className={`auth-container ${!isLogin ? "flipped" : ""}`}>
        <div className="auth-flipper">
          
          {/* SIGN IN FRONT */}
          <div className="auth-face auth-front">
            <div className="auth-head">
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-sub">Enter your details to access your account</p>
            </div>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); navigate("home"); }}>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <Mail size={16} className="input-ic" />
                  <input type="email" placeholder="hello@example.com" required />
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-ic" />
                  <input type="password" placeholder="••••••••" required />
                </div>
              </div>
              <div className="auth-utils">
                <label className="chk-wrap">
                  <input type="checkbox" /> <span className="chk-lbl">Remember me</span>
                </label>
                <button type="button" className="forgot-btn">Forgot Password?</button>
              </div>
              <button type="submit" className="btn-red auth-btn">Sign In <ArrowRight size={16}/></button>
            </form>
            <div className="auth-foot">
              Don't have an account? <button type="button" onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>
          </div>

          {/* SIGN UP BACK */}
          <div className="auth-face auth-back">
            <div className="auth-head">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-sub">Join us for exclusive factory direct offers</p>
            </div>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); navigate("home"); }}>
              <div className="field">
                <label>Full Name</label>
                <div className="input-wrap">
                  <User size={16} className="input-ic" />
                  <input type="text" placeholder="John Doe" required />
                </div>
              </div>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <Mail size={16} className="input-ic" />
                  <input type="email" placeholder="hello@example.com" required />
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-ic" />
                  <input type="password" placeholder="••••••••" required />
                </div>
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-ic" />
                  <input type="password" placeholder="••••••••" required />
                </div>
              </div>
              <button type="submit" className="btn-red auth-btn">Create Account <ArrowRight size={16}/></button>
            </form>
            <div className="auth-foot">
              I already have an account. <button type="button" onClick={() => setIsLogin(true)}>Sign In</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
