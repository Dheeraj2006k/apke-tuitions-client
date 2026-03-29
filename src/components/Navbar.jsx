import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Navbar — fixed top, transparent → frosted glass on scroll
 * Mobile: hamburger menu with slide-down links
 * Admin button removed from navbar — accessible via footer or /admin directly
 */
export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
        }`}
    >
      {/* ── Inner container ── */}
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">

        {/* Logo */}
        <span
          onClick={() => go("/")}
          className="font-poppins font-extrabold text-xl text-slate-900 cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          Apke <span className="text-orange">Tuitions</span>
        </span>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7 flex-1">
          {[
            { label: "Home",        path: "/" },
            { label: "For Parents", path: "/parent" },
            { label: "For Tutors",  path: "/tutor" },
          ].map(({ label, path }) => (
            <span
              key={path}
              onClick={() => go(path)}
              className={`text-sm font-medium cursor-pointer pb-0.5 border-b-2 transition-colors duration-150
                ${isActive(path)
                  ? "text-orange border-orange"
                  : "text-slate-600 border-transparent hover:text-orange hover:border-orange"
                }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Desktop action button — Admin removed, only Get a Tutor remains */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            onClick={() => go("/parent")}
            className="btn-primary !py-2.5 !px-5 !text-sm"
          >
            Get a Tutor
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-0"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all duration-250
            ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all duration-250
            ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all duration-250
            ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-fadeUp">
          {[
            { label: "Home",        path: "/" },
            { label: "For Parents", path: "/parent" },
            { label: "For Tutors",  path: "/tutor" },
          ].map(({ label, path }) => (
            <span
              key={path}
              onClick={() => go(path)}
              className="block px-6 py-4 text-sm font-medium text-slate-700
                         hover:bg-slate-50 cursor-pointer border-b border-slate-50"
            >
              {label}
            </span>
          ))}
          <div className="px-6 py-4">
            <button
              onClick={() => go("/parent")}
              className="btn-primary w-full justify-center"
            >
              Get a Tutor Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}