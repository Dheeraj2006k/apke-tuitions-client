import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SERVICES = [
  { icon: "📚", label: "All Subjects" },
  { icon: "🏫", label: "CBSE, ICSE & State Board" },
  { icon: "🎓", label: "Qualified Tutors" },
  { icon: "👤", label: "One-on-One Coaching" },
  { icon: "🏠", label: "Home & Online Tuitions" },
  { icon: "📝", label: "Classes 1 to 12" },
];

const BENEFITS = [
  { icon: "📈", title: "Improve Grades",   desc: "Personalised attention helps students excel in exams and score higher." },
  { icon: "💪", title: "Boost Confidence", desc: "One-on-one sessions build self-belief and independent learning habits." },
  { icon: "🕐", title: "Flexible Timings", desc: "Schedule sessions at your convenience — morning, evening, or weekend." },
  { icon: "🌐", title: "Online & Offline",  desc: "Choose home visits or online classes based on your comfort." },
];

const STATS = [
  { value: "500+", label: "Students Taught" },
  { value: "100+", label: "Verified Tutors" },
  { value: "10+",  label: "Subjects Covered" },
  { value: "98%",  label: "Satisfaction Rate" },
];

const HOW_STEPS = [
  { n: "01", t: "Submit Request", d: "Parents fill a quick form with student details and subject needs." },
  { n: "02", t: "We Match",       d: "Our admin finds the best-suited verified tutor near your location." },
  { n: "03", t: "Free Demo",      d: "A free demo class is arranged before you commit to anything." },
  { n: "04", t: "Start Learning", d: "Regular sessions begin. Track progress every month." },
];

export default function Home() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((prev) => ({ ...prev, [e.target.dataset.id]: true }));
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const vis = (id) =>
    visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <div className="min-h-screen bg-slate-50 font-dm">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-between gap-12
                          px-[7vw] pt-32 pb-20 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full
                        bg-orange-dim opacity-60 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full
                        bg-blue-100 opacity-40 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-[560px] animate-fadeUp">
          <span className="section-tag mb-5">🎓 Hyderabad's Trusted Tuition Network</span>
          <h1 className="font-poppins font-extrabold leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)" }}>
            <span style={{
              background: "linear-gradient(120deg, #ff7f00, #e65c00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Apke Tuitions
            </span>
            <br />
            <span className="text-slate-900">Expert Home Tutors</span>
            <br />
            <span className="text-brand-blue">for Classes 1 – 12</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-[460px]">
            Connect with verified, experienced tutors near you. Personalised
            learning for every student — CBSE, ICSE &amp; State Board.
          </p>
          <div className="flex flex-wrap gap-4 mb-5">
            <button className="btn-primary" onClick={() => navigate("/parent")}>
              I'm a Parent
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => navigate("/tutor")}>
              I'm a Tutor
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-slate-400">✅ Free registration &nbsp;|&nbsp; ✅ No hidden charges</p>
        </div>

        {/* Decorative tutor cards */}
        <div className="relative z-10 hidden lg:flex flex-col gap-4 animate-fadeUp-d1 flex-shrink-0">
          <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card
                          border border-slate-100 min-w-[280px] hover:-translate-y-1 transition-transform duration-300">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white
                            font-poppins font-bold text-sm flex-shrink-0"
                 style={{ background: "linear-gradient(135deg, #ff9e3d, #ff7f00)" }}>
              AS
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm text-slate-800">Anjali Sharma</span>
              <span className="text-xs text-slate-500">Mathematics · Class 10</span>
              <span className="text-xs text-slate-400">⭐ 4.9 · 3 yrs exp.</span>
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Available</span>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card
                          border border-slate-100 ml-6 min-w-[280px] hover:-translate-y-1 transition-transform duration-300">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white
                            font-poppins font-bold text-sm flex-shrink-0"
                 style={{ background: "linear-gradient(135deg, #3b82f6, #1a56db)" }}>
              RK
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm text-slate-800">Rahul Kumar</span>
              <span className="text-xs text-slate-500">Science + Maths · Class 8</span>
              <span className="text-xs text-slate-400">⭐ 4.8 · 5 yrs exp.</span>
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Available</span>
          </div>
          <div className="self-end rounded-xl px-5 py-3 text-white flex flex-col items-center"
               style={{ background: "linear-gradient(135deg, #1a56db, #3b82f6)",
                        boxShadow: "0 6px 20px rgba(26,86,219,0.3)" }}>
            <span className="font-poppins font-bold text-xl">500+</span>
            <span className="text-xs opacity-80">Happy Students</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section
        data-id="stats"
        className={`py-12 px-[7vw] bg-white border-y border-slate-100
                    transition-all duration-500 ${vis("stats")}`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-poppins font-extrabold text-3xl text-orange mb-1">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-[7vw]">
        <div data-id="services"
             className={`text-center mb-12 transition-all duration-500 ${vis("services")}`}>
          <span className="section-tag">What We Offer</span>
          <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-3">Complete Tuition Services</h2>
          <p className="text-slate-500">Everything a student needs under one roof.</p>
        </div>
        <div data-id="services-grid"
             className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4
                         transition-all duration-500 delay-150 ${vis("services-grid")}`}>
          {SERVICES.map((s, i) => (
            <div key={i}
                 className="bg-white rounded-2xl border border-slate-100 p-6
                            flex flex-col items-center gap-3 text-center shadow-card
                            hover:-translate-y-1 hover:border-orange-light hover:shadow-orange
                            transition-all duration-200 cursor-default">
              <span className="text-3xl">{s.icon}</span>
              <span className="text-sm font-semibold text-slate-600 leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-[7vw] bg-blue-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full
                        bg-blue-100 opacity-50 blur-[60px] pointer-events-none" />
        <div data-id="how"
             className={`text-center mb-12 transition-all duration-500 ${vis("how")}`}>
          <span className="section-tag">Simple Process</span>
          <h2 className="font-poppins font-bold text-3xl text-slate-900">How It Works</h2>
        </div>
        <div data-id="how-steps"
             className={`flex flex-wrap justify-center transition-all duration-500 delay-150 ${vis("how-steps")}`}>
          {HOW_STEPS.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center px-8 py-6 max-w-[240px]">
              <span className="font-poppins font-extrabold text-5xl leading-none mb-4"
                    style={{ color: "#fff3e0", WebkitTextStroke: "2px #ff9e3d" }}>
                {s.n}
              </span>
              <h3 className="font-poppins font-bold text-base text-slate-900 mb-2">{s.t}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.d}</p>
              {i < HOW_STEPS.length - 1 && (
                <span className="absolute -right-3 top-10 text-orange-light text-2xl hidden sm:block">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 px-[7vw]">
        <div data-id="benefits"
             className={`text-center mb-12 transition-all duration-500 ${vis("benefits")}`}>
          <span className="section-tag">Why Choose Us</span>
          <h2 className="font-poppins font-bold text-3xl text-slate-900">Built for Student Success</h2>
        </div>
        <div data-id="benefits-grid"
             className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5
                         transition-all duration-500 delay-150 ${vis("benefits-grid")}`}>
          {BENEFITS.map((b, i) => (
            <div key={i}
                 className="bg-white rounded-2xl border border-slate-100 p-7 shadow-card
                            hover:-translate-y-1 transition-transform duration-200">
              <span className="text-3xl block mb-4">{b.icon}</span>
              <h3 className="font-poppins font-bold text-base text-slate-900 mb-2">{b.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        data-id="cta"
        className="py-20 px-[7vw] text-center"
        style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}
      >
        <div className={`transition-all duration-500 ${vis("cta")}`}>
          <h2 className="font-poppins font-extrabold text-white mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
            Ready to Get Started?
          </h2>
          <p className="text-white/60 text-base mb-8">
            Book a <strong className="text-orange-light">Free Demo Class</strong> today. No commitment required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="btn-primary !py-4 !px-10 !text-base" onClick={() => navigate("/parent")}>
              Request a Tutor
            </button>
            <a href="tel:+917671958601"
               className="text-orange-light font-semibold text-sm border-b
                          border-dashed border-orange-light pb-0.5 hover:opacity-75 transition-opacity">
              📞 Call Now for Free Demo
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER — no admin link ── */}
      <footer style={{ background: "#0f172a" }} className="px-[7vw] pt-10">
        <div className="flex flex-wrap justify-between items-start gap-6 pb-8
                        border-b border-white/10">
          <div className="max-w-xs">
            <span className="font-poppins font-extrabold text-xl text-orange-light block mb-2">
              Apke Tuitions
            </span>
            <p className="text-sm text-white/50 leading-relaxed">
              Connecting students with the right tutors across Hyderabad.
            </p>
          </div>
          <div className="flex gap-8 flex-wrap items-center">
            {[
              { label: "For Parents", path: "/parent" },
              { label: "For Tutors",  path: "/tutor" },
              { label: "Admin Login", path: "/admin" },
            ].map(({ label, path }) => (
              <span
                key={path}
                onClick={() => navigate(path)}
                className="text-sm text-white/50 cursor-pointer hover:text-white transition-colors"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-white/25 py-4">
          © {new Date().getFullYear()} Apke Tuitions · All rights reserved
        </p>
      </footer>
    </div>
  );
}