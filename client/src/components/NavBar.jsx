import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
          JR
        </div>
        <span className="font-semibold text-gray-800 text-lg">Juan Ramirez's Portafolio</span>
      </Link>

      {/* Tabs */}
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-500 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-blue-500 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `hover:text-blue-500 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          Projects
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            `hover:text-blue-500 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          Services
        </NavLink>

        <NavLink
          to="/education"
          className={({ isActive }) =>
            `hover:text-blue-500 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          Education
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `hover:text-blue-500 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;