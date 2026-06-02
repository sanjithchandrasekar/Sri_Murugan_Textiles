import React, { useState, useContext } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Auth({ navigate }) {
  const { login, register, user, logout } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate("home");
    } else {
      setError(res.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    const res = await register(formData.name, formData.email, formData.password);
    if (res.success) {
      navigate("home");
    } else {
      setError(res.error);
    }
  };

  if (user) {
    return (
      <div className="auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', background: 'white', padding: 40, borderRadius: 20 }}>
          <h2>Welcome back, {user.name}!</h2>
          <button onClick={logout} className="btn-red" style={{ marginTop: 20 }}>Sign Out</button>
        </div>
      </div>
    );
  }

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
            <form className="auth-form" onSubmit={handleLogin}>
              {error && isLogin && <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: 10 }}>{error}</div>}
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <Mail size={16} className="input-ic" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" required />
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-ic" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
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
            <form className="auth-form" onSubmit={handleRegister}>
              {error && !isLogin && <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: 10 }}>{error}</div>}
              <div className="field">
                <label>Full Name</label>
                <div className="input-wrap">
                  <User size={16} className="input-ic" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                </div>
              </div>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <Mail size={16} className="input-ic" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" required />
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-ic" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                </div>
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-ic" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
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
