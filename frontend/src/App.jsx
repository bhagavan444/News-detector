import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import VeritasTransition from "./components/common/VeritasTransition";
import DeveloperPreviewModal from "./components/common/DeveloperPreviewModal";

// Pages with lazy loading for optimal production bundle splitting
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Login = React.lazy(() => import("./pages/Login"));
const Plans = React.lazy(() => import("./pages/Plans"));
const Predict = React.lazy(() => import("./pages/Predict"));
const Admin = React.lazy(() => import("./pages/Admin"));
const Examples = React.lazy(() => import("./pages/Examples"));
const HowItWorks = React.lazy(() => import("./pages/HowItWorks"));
const Technology = React.lazy(() => import("./pages/Technology"));
const Research = React.lazy(() => import("./pages/Research"));
const Validation = React.lazy(() => import("./pages/Validation"));
const Compare = React.lazy(() => import("./pages/Compare"));
const Limitations = React.lazy(() => import("./pages/Limitations"));
const Workspace = React.lazy(() => import("./pages/Workspace"));
const SavedReports = React.lazy(() => import("./pages/SavedReports"));
const ReportDetail = React.lazy(() => import("./pages/ReportDetail"));

import { auth } from "./firebase";

// Error Boundary
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user) {
        localStorage.setItem("user", JSON.stringify({
          email: user.email,
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0],
          photo: user.photoURL,
        }));
      } else {
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    window.location.href = "/predict";
  };

  return (
    <Router>
      <VeritasTransition>
        <DeveloperPreviewModal />
        <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
        <ErrorBoundary>
          <main id="main-content" role="main" tabIndex="-1">
            <React.Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/plans" element={<Plans />} />
                
                {/* New Portfolio Integration Routes */}
                <Route path="/examples" element={<Examples />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/research" element={<Research />} />
                <Route path="/validation" element={<Validation />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/limitations" element={<Limitations />} />
                
                {/* Intelligence Library Routes */}
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/workspace/saved" element={<SavedReports />} />
                <Route path="/workspace/report/:id" element={<ReportDetail />} />

                <Route
                  path="/login"
                  element={isLoggedIn ? <Navigate to="/predict" /> : <Login handleLogin={handleLogin} />}
                />
                <Route
                  path="/predict"
                  element={isLoggedIn ? <Predict /> : <Navigate to="/login" />}
                />
                <Route
                  path="/admin"
                  element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
                />
                {/* Catch-all route for unknown URLs */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </React.Suspense>
          </main>
        </ErrorBoundary>
      </VeritasTransition>
    </Router>
  );
}

export default App;
