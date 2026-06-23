import { NavLink } from "react-router-dom"

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-white text-blue-900 shadow-md"
        : "text-blue-100 hover:bg-blue-700 hover:text-white"
    }`

  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-blue-950 shadow-lg">
      {/* Brand */}
      <span className="text-white font-bold text-lg tracking-tight">PastCreator</span>

      {/* Nav Links */}
      <div className="flex items-center gap-2">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/pastes" className={navLinkClass}>Pastes</NavLink>
      </div>
    </nav>
  )
}

export default Navbar