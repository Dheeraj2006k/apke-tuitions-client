"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
        <Link
          href="/"
          className="font-poppins font-extrabold text-xl text-slate-900 cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          Apke <span className="text-orange">Tuitions</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 flex-1">
          {[
            { label: "Home", path: "/" },
            { label: "For Parents", path: "/parent" },
            { label: "For Tutors", path: "/tutor" },
            { label: "Areas", path: "/hyderabad" },
            { label: "Subjects", path: "/subjects" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className={`text-sm font-medium cursor-pointer pb-0.5 border-b-2 transition-colors duration-150 ${
                isActive(path)
                  ? "text-orange border-orange"
                  : "text-slate-600 border-transparent hover:text-orange hover:border-orange"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Link href="/parent" className="btn-primary !py-2.5 !px-5 !text-sm">
            Get a Tutor
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-0"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all duration-250 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all duration-250 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all duration-250 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-fadeUp">
          {[
            { label: "Home", path: "/" },
            { label: "For Parents", path: "/parent" },
            { label: "For Tutors", path: "/tutor" },
            { label: "Areas", path: "/hyderabad" },
            { label: "Subjects", path: "/subjects" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer border-b border-slate-50"
            >
              {label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <Link
              href="/parent"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Get a Tutor Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
