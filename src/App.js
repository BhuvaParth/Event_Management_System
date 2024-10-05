import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ExpoEvents from "./pages/ExpoEvents";
import MusicEvents from "./pages/MusicEvents";
import Header from "./components/Header";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import About from "./pages/About";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup onSignup={handleLogin} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={isAuthenticated ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/expo-events"
          element={isAuthenticated ? <ExpoEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/music-events"
          element={isAuthenticated ? <MusicEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-event"
          element={isAuthenticated ? <AddEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-event/:eventId" 
          element={isAuthenticated ? <EditEvent /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
