import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login/registration logic
    // For this example, we'll navigate to the appropriate page based on the form type
    if (isLogin) {
      navigate('/home');
    } else {
      setIsLogin(true); // Switch to login form after registration
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ width: '350px', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <motion.div
          initial={false}
          animate={{ opacity: isLogin ? 1 : 0, x: isLogin ? 0 : '-100%' }}
          transition={{ duration: 0.5 }}
          style={{ display: isLogin ? 'block' : 'none' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Login</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="email" placeholder="Email" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="password" placeholder="Password" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Login</button>
          </form>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: !isLogin ? 1 : 0, x: !isLogin ? 0 : '100%' }}
          transition={{ duration: 0.5 }}
          style={{ display: !isLogin ? 'block' : 'none' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Register</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Username" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="email" placeholder="Email" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="password" placeholder="Password" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="password" placeholder="Confirm Password" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Register</button>
          </form>
        </motion.div>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={toggleForm} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;
