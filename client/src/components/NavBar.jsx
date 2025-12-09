
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "../utils/auth";
import { signout as apiSignout } from "../api/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track login state in React state
  const [loggedIn, setLoggedIn] = useState(!!auth.isAuthenticated());

  // Whenever the route changes, re-check auth state
  useEffect(() => {
    setLoggedIn(!!auth.isAuthenticated());
  }, [location.pathname]);

  const handleSignout = async () => {
    try {
      // Call backend to clear cookie
      await apiSignout();
    } catch (err) {
      console.error("Error calling signout API:", err);
    }

    // Clear sessionStorage + update state + redirect
    auth.clear(() => {
      setLoggedIn(false);
      navigate("/signin");
    });
  };

  const baseLinkClasses = "hover:text-blue-500";
  const activeClasses = "text-blue-600 font-semibold";
  const inactiveClasses = "text-gray-700";

  const linkClass = ({ isActive }) =>
    `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / brand */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
          JR
        </div>
        <span className="font-semibold text-gray-800 text-lg">
          Juan Ramirez&apos;s Portfolio
        </span>
      </Link>

      {/* Links */}
      <div className="flex space-x-6 items-center">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/education" className={linkClass}>
          Education
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          Projects
        </NavLink>
        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>

        {/* Auth links */}
        {!loggedIn && (
          <>
            <NavLink to="/signin" className={linkClass}>
              Sign In
            </NavLink>
            <NavLink to="/signup" className={linkClass}>
              Sign Up
            </NavLink>
          </>
        )}

        {loggedIn && (
          <button
            onClick={handleSignout}
            className="ml-4 px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;