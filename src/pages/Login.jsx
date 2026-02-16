import React, { useState, useEffect, useRef } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Magnetic Cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);

  const handleMouseEnter = () => setCursorVariant('hover');
  const handleMouseLeave = () => setCursorVariant('default');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && storedUser) {
        localStorage.removeItem("user");
        setIsAlreadyLoggedIn(false);
      } else if (user && storedUser) {
        setIsAlreadyLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const isValidGmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(password);

  const resetMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleEmailSignup = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Please use a valid Gmail address");
    if (!isStrongPassword(password))
      return setErrorMsg("Password must be 8+ characters with uppercase, lowercase, number, and special character");

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Account created successfully");
      handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Please use a valid Gmail address");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Authentication successful");
      handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg("Authentication failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider, providerName) => {
    resetMessages();
    if (loading) return;
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const formattedUser = {
        name: user.displayName || user.email?.split("@")[0],
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(formattedUser));
      setSuccessMsg("Access granted");
      handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg(`Authentication failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Please enter a valid Gmail address");
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Password reset email sent");
    } catch (error) {
      setErrorMsg("Failed to send reset email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isAlreadyLoggedIn) {
      navigate("/predict");
    }
  }, [isAlreadyLoggedIn, navigate]);

  /* ================= STYLES ================= */

  const COLORS = {
    light: {
      bg: '#ffffff',
      bgSecondary: '#f8fafc',
      text: '#111827',
      textMuted: '#6b7280',
      border: '#e5e7eb',
      accent: '#2563eb',
      error: '#dc2626',
      success: '#16a34a',
    }
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: COLORS.light.bg,
      fontFamily: 'cursive',
      cursor: 'none',
    },
    cursor: {
      width: cursorVariant === 'hover' ? '60px' : '40px',
      height: cursorVariant === 'hover' ? '60px' : '40px',
      border: `2px solid ${COLORS.light.accent}`,
      borderRadius: '50%',
      position: 'fixed',
      top: '-20px',
      left: '-20px',
      pointerEvents: 'none',
      zIndex: 9999,
      transition: 'width 0.3s ease, height 0.3s ease',
      opacity: 0.6,
    },
    cursorDot: {
      width: '6px',
      height: '6px',
      backgroundColor: COLORS.light.accent,
      borderRadius: '50%',
      position: 'fixed',
      top: '-3px',
      left: '-3px',
      pointerEvents: 'none',
      zIndex: 10000,
    },
    // Left Panel - Brand Authority
    leftPanel: {
      width: '50%',
      backgroundColor: COLORS.light.bgSecondary,
      padding: '80px 64px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    brandContent: {
      maxWidth: '560px',
      zIndex: 1,
    },
    logo: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '32px',
      color: COLORS.light.text,
      fontFamily: 'cursive',
      letterSpacing: '-1px',
    },
    headline: {
      fontSize: '48px',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '24px',
      color: COLORS.light.text,
      fontFamily: 'cursive',
      letterSpacing: '-1.5px',
    },
    subheadline: {
      fontSize: '20px',
      lineHeight: '1.6',
      color: COLORS.light.textMuted,
      marginBottom: '48px',
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    feature: {
      padding: '20px',
      backgroundColor: COLORS.light.bg,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '8px',
    },
    featureIcon: {
      fontSize: '24px',
      marginBottom: '12px',
    },
    featureTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: COLORS.light.text,
      marginBottom: '4px',
      fontFamily: 'cursive',
    },
    featureText: {
      fontSize: '13px',
      color: COLORS.light.textMuted,
      lineHeight: '1.5',
    },
    // Right Panel - Auth Module
    rightPanel: {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px',
      position: 'relative',
    },
    authCard: {
      width: '100%',
      maxWidth: '480px',
      backgroundColor: COLORS.light.bg,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '16px',
      padding: '48px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03)',
      animation: 'slideIn 0.5s ease-out',
    },
    authTitle: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px',
      color: COLORS.light.text,
      fontFamily: 'cursive',
      letterSpacing: '-1px',
    },
    authSubtitle: {
      fontSize: '15px',
      color: COLORS.light.textMuted,
      marginBottom: '32px',
    },
    modeToggle: {
      display: 'flex',
      backgroundColor: COLORS.light.bgSecondary,
      padding: '4px',
      borderRadius: '8px',
      marginBottom: '32px',
      position: 'relative',
    },
    modeButton: {
      flex: 1,
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '6px',
      cursor: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: 'transparent',
      color: COLORS.light.textMuted,
      zIndex: 1,
      fontFamily: 'cursive',
    },
    modeButtonActive: {
      backgroundColor: COLORS.light.bg,
      color: COLORS.light.text,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '13px',
      fontWeight: '600',
      color: COLORS.light.text,
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '15px',
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: COLORS.light.bg,
      color: COLORS.light.text,
      cursor: 'none',
      fontFamily: 'cursive',
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'none',
      fontSize: '20px',
      opacity: 0.5,
      transition: 'opacity 0.2s ease',
    },
    button: {
      width: '100%',
      padding: '14px 24px',
      fontSize: '15px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      marginBottom: '12px',
      fontFamily: 'cursive',
    },
    primaryButton: {
      backgroundColor: COLORS.light.accent,
      color: '#ffffff',
      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      border: `1px solid ${COLORS.light.border}`,
      color: COLORS.light.text,
    },
    googleButton: {
      backgroundColor: COLORS.light.bg,
      border: `1px solid ${COLORS.light.border}`,
      color: COLORS.light.text,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    },
    forgotButton: {
      width: '100%',
      padding: '12px',
      fontSize: '14px',
      fontWeight: '600',
      color: COLORS.light.accent,
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'none',
      transition: 'all 0.2s ease',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '24px 0',
      color: COLORS.light.textMuted,
      fontSize: '13px',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: COLORS.light.border,
    },
    dividerText: {
      padding: '0 16px',
    },
    message: {
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '16px',
      animation: 'fadeIn 0.3s ease-in',
    },
    errorMessage: {
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      border: `1px solid ${COLORS.light.error}`,
      color: COLORS.light.error,
    },
    successMessage: {
      backgroundColor: 'rgba(22, 163, 74, 0.1)',
      border: `1px solid ${COLORS.light.success}`,
      color: COLORS.light.success,
    },
    securityNote: {
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: `1px solid ${COLORS.light.border}`,
      fontSize: '12px',
      color: COLORS.light.textMuted,
      textAlign: 'center',
      lineHeight: '1.6',
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      margin: '0 auto',
    },
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9998,
    },
  };

  return (
    <div style={styles.container}>
      {/* Magnetic Cursor */}
      <div ref={cursorRef} style={styles.cursor} />
      <div ref={cursorDotRef} style={styles.cursorDot} />

      {/* Left Panel - Brand Authority */}
      <div style={styles.leftPanel}>
        <div style={styles.brandContent}>
          <div style={styles.logo}>Verifiex</div>
          
          <h1 style={styles.headline}>
            Secure Access to Intelligence Infrastructure
          </h1>
          
          <p style={styles.subheadline}>
            Enterprise-grade AI platform for misinformation detection and credibility risk assessment.
          </p>

          <div style={styles.featureGrid}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🔐</div>
              <div style={styles.featureTitle}>End-to-End Encrypted</div>
              <div style={styles.featureText}>
                All authentication secured with enterprise-grade encryption
              </div>
            </div>

            <div style={styles.feature}>
              <div style={styles.featureIcon}>🛡️</div>
              <div style={styles.featureTitle}>Secure OAuth Integration</div>
              <div style={styles.featureText}>
                Industry-standard authentication protocols
              </div>
            </div>

            <div style={styles.feature}>
              <div style={styles.featureIcon}>🔒</div>
              <div style={styles.featureTitle}>Privacy-First Architecture</div>
              <div style={styles.featureText}>
                Your data remains confidential and secure
              </div>
            </div>

            <div style={styles.feature}>
              <div style={styles.featureIcon}>✓</div>
              <div style={styles.featureTitle}>Enterprise Compliance</div>
              <div style={styles.featureText}>
                SOC 2 and GDPR-ready infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Authentication Module */}
      <div style={styles.rightPanel}>
        <div style={styles.authCard}>
          <h2 style={styles.authTitle}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p style={styles.authSubtitle}>
            Access the Verifiex Intelligence Platform
          </p>

          {/* Mode Toggle */}
          <div style={styles.modeToggle}>
            <button
              style={{
                ...styles.modeButton,
                ...(mode === 'login' ? styles.modeButtonActive : {})
              }}
              onClick={() => setMode('login')}
              disabled={loading}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Sign In
            </button>
            <button
              style={{
                ...styles.modeButton,
                ...(mode === 'signup' ? styles.modeButtonActive : {})
              }}
              onClick={() => setMode('signup')}
              disabled={loading}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Create Account
            </button>
          </div>

          {/* Messages */}
          {errorMsg && (
            <div style={{...styles.message, ...styles.errorMessage}}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div style={{...styles.message, ...styles.successMessage}}>
              {successMsg}
            </div>
          )}

          {/* Email Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@gmail.com"
              disabled={loading}
              style={styles.input}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.light.accent;
                e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.light.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                style={styles.input}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.light.accent;
                  e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.light.border;
                  e.target.style.boxShadow = 'none';
                }}
              />
              <span
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => {
                  handleMouseEnter();
                  e.target.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave();
                  e.target.style.opacity = '0.5';
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          {mode === 'signup' ? (
            <button
              style={{...styles.button, ...styles.primaryButton}}
              onClick={handleEmailSignup}
              disabled={loading}
              onMouseEnter={(e) => {
                handleMouseEnter();
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                handleMouseLeave();
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
              }}
            >
              {loading ? <div style={styles.spinner} /> : 'Create Account'}
            </button>
          ) : (
            <>
              <button
                style={{...styles.button, ...styles.primaryButton}}
                onClick={handleEmailLogin}
                disabled={loading}
                onMouseEnter={(e) => {
                  handleMouseEnter();
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave();
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
                }}
              >
                {loading ? <div style={styles.spinner} /> : 'Sign In'}
              </button>

              <button
                style={styles.forgotButton}
                onClick={handleForgotPassword}
                disabled={loading}
                onMouseEnter={(e) => {
                  handleMouseEnter();
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave();
                  e.target.style.textDecoration = 'none';
                }}
              >
                Forgot Password?
              </button>
            </>
          )}

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Google Sign In */}
          <button
            style={{...styles.button, ...styles.googleButton}}
            onClick={() => handleSocialLogin(googleProvider, "Google")}
            disabled={loading}
            onMouseEnter={(e) => {
              handleMouseEnter();
              e.target.style.backgroundColor = COLORS.light.bgSecondary;
              e.target.style.borderColor = COLORS.light.accent;
            }}
            onMouseLeave={(e) => {
              handleMouseLeave();
              e.target.style.backgroundColor = COLORS.light.bg;
              e.target.style.borderColor = COLORS.light.border;
            }}
          >
            {loading ? (
              <div style={styles.spinner} />
            ) : (
              <>
                <img
                  src="https://img.icons8.com/color/24/000000/google-logo.png"
                  alt="Google"
                />
                Continue with Google
              </>
            )}
          </button>

          {/* Security Note */}
          <div style={styles.securityNote}>
            Secured with Firebase Authentication<br />
            All sessions encrypted using TLS 1.2+
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;