import React, { useState, useEffect } from 'react';
import { Database, PlusCircle, RefreshCw, Server, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MagButton, WaveDivider } from '../components/Shared.jsx';

export default function TestDB({ navigate }) {
  const [dbStatus, setDbStatus] = useState({ status: 'Checking...', code: -1 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seeding, setSeeding] = useState(false);

  const API_URL = 'http://localhost:5000/api/test';

  const checkStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/db-status`);
      if (!res.ok) throw new Error('Backend server is not reachable');
      const data = await res.json();
      setDbStatus(data);
    } catch (err) {
      setDbStatus({ status: 'Error/Offline', code: -1 });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Error fetching products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const seedProduct = async () => {
    try {
      setSeeding(true);
      const res = await fetch(`${API_URL}/seed-product`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to seed product');
      const data = await res.json();
      if (data.success) {
        // refresh list
        fetchProducts();
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Error seeding product: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    checkStatus();
    fetchProducts();
  }, []);

  return (
    <div style={{ animation: "page3dIn .3s var(--ease-out) both", paddingTop: 120, paddingBottom: 100, minHeight: '100vh', padding: '120px 5% 100px' }}>
      
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Database size={40} color="var(--red)" />
          Database Connection Test
        </h1>
        <p style={{ color: "var(--gray-lt)", marginBottom: 40 }}>
          Use this page to verify that the React frontend is successfully communicating with the Node/Express backend and MongoDB Atlas.
        </p>

        {error && (
          <div style={{ background: 'rgba(200, 16, 46, 0.1)', border: '1px solid var(--red)', padding: 16, borderRadius: 12, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, color: '#ff8a8a' }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* STATUS CARD */}
        <div style={{ background: 'var(--b3)', borderRadius: 24, padding: 32, border: '1px solid var(--glass-b)', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Server size={24} /> Backend Status
            </h2>
            <MagButton className="btn-sm" onClick={checkStatus} style={{ padding: '8px 16px' }} strength={0.2}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
            </MagButton>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'var(--b2)', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ color: 'var(--gray-lt)', fontSize: '0.9rem' }}>Connection State</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.2rem', fontWeight: 600 }}>
                {dbStatus.code === 1 ? <CheckCircle2 color="#25D366" /> : <AlertCircle color="var(--red)" />}
                <span style={{ color: dbStatus.code === 1 ? '#25D366' : (dbStatus.code === 0 ? 'var(--red)' : 'var(--white)') }}>
                  {dbStatus.status}
                </span>
              </div>
            </div>
            
            <div style={{ background: 'var(--b2)', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ color: 'var(--gray-lt)', fontSize: '0.9rem' }}>API Endpoint</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: 'monospace', color: 'var(--gray-lt)' }}>
                http://localhost:5000
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS TEST */}
        <div style={{ background: 'var(--b3)', borderRadius: 24, padding: 32, border: '1px solid var(--glass-b)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              Database Read/Write Test
            </h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <MagButton className="btn-red" onClick={seedAllCollections} style={{ padding: '8px 16px', display: 'flex', gap: 8, background: 'var(--red)', color: 'white' }} strength={0.2}>
                <PlusCircle size={16} /> Seed All Collections
              </MagButton>
              <MagButton className="btn-red" onClick={seedProduct} style={{ padding: '8px 16px', display: 'flex', gap: 8 }} strength={0.2}>
                <PlusCircle size={16} /> {seeding ? 'Adding...' : 'Add Test Product'}
              </MagButton>
            </div>
          </div>

          <div style={{ color: "var(--gray-lt)", marginBottom: 16 }}>
            Recently Added Products (Top 10):
          </div>

          {products.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', background: 'var(--b2)', borderRadius: 12, color: 'var(--gray-lt)' }}>
              No products found in the database. Click "Add Test Product" to seed one.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {products.map(p => (
                <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--b2)', padding: 16, borderRadius: 12 }}>
                  <img src={p.image} alt={p.name} style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{p.name}</div>
                    <div style={{ color: 'var(--gray-lt)', fontSize: '0.9rem' }}>{p.category} • ₹{p.price}</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-lt)', fontFamily: 'monospace' }}>
                    ID: {p._id.substring(0, 8)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
