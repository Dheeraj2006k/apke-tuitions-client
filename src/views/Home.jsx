"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { LOCALITY_PAGES, SEO_FAQS, SUBJECT_PAGES } from "../content/seo";

const SERVICES = [
  { icon: "\u{1F4DA}", label: "All Subjects" },
  { icon: "\u{1F3EB}", label: "CBSE, ICSE and State Board" },
  { icon: "\u{1F393}", label: "Qualified Tutors" },
  { icon: "\u{1F464}", label: "One-on-One Coaching" },
  { icon: "\u{1F3E0}", label: "Home and Online Tuitions" },
  { icon: "\u{1F4DD}", label: "Classes 1 to 12" },
];

const BENEFITS = [
  {
    icon: "\u{1F4C8}",
    title: "Improve Grades",
    desc: "Personalised attention helps students excel in exams and score higher.",
  },
  {
    icon: "\u{1F4AA}",
    title: "Boost Confidence",
    desc: "One-on-one sessions build self-belief and independent learning habits.",
  },
  {
    icon: "\u{1F550}",
    title: "Flexible Timings",
    desc: "Schedule sessions at your convenience in the morning, evening, or on weekends.",
  },
  {
    icon: "\u{1F310}",
    title: "Online and Offline",
    desc: "Choose home visits or online classes based on your comfort and schedule.",
  },
];

const STATS = [
  { value: "500+", label: "Students Taught" },
  { value: "100+", label: "Verified Tutors" },
  { value: "10+", label: "Subjects Covered" },
  { value: "98%", label: "Satisfaction Rate" },
];

const HOW_STEPS = [
  {
    n: "01",
    t: "Submit Request",
    d: "Parents fill a quick form with student details and subject needs.",
  },
  {
    n: "02",
    t: "We Match",
    d: "Our team finds the best-suited verified tutor near your location.",
  },
  {
    n: "03",
    t: "Free Demo",
    d: "A free demo class is arranged before you commit to anything.",
  },
  {
    n: "04",
    t: "Start Learning",
    d: "Regular sessions begin and progress can be tracked over time.",
  },
];

export default function Home() {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const vis = (id) =>
    visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <div className="min-h-screen bg-slate-50 font-dm">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-between gap-12 px-[7vw] pt-32 pb-20 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full bg-orange-dim opacity-60 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-blue-100 opacity-40 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-[560px] animate-fadeUp">
          <span className="section-tag mb-5">
            <span aria-hidden="true">{"\u{1F393}"}</span> Hyderabad's trusted tuition network
          </span>
          <h1 className="font-poppins font-extrabold leading-[1.1] mb-5" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)" }}>
            <span
              style={{
                background: "linear-gradient(120deg, #ff7f00, #e65c00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Apke Tuitions
            </span>
            <br />
            <span className="text-slate-900">Expert Home Tutors</span>
            <br />
            <span className="text-brand-blue">for Classes 1 to 12</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-[460px]">
            Connect with verified, experienced tutors near you. Personalised learning for every student across CBSE, ICSE, and State Board.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <Link href="/parent" className="btn-primary">
              I'm a Parent
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/tutor" className="btn-secondary">
              I'm a Tutor
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <a href="tel:+917671958601" className="inline-flex items-center gap-3 mb-5 group cursor-pointer" style={{ textDecoration: "none" }}>
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all duration-200 group-hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #fff3e0, #fff8f0)",
                borderColor: "#ff9e3d",
                boxShadow: "0 4px 16px rgba(255,127,0,0.18)",
              }}
            >
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-slate-600 text-sm font-medium">Call us directly -</span>
              <span className="font-poppins font-extrabold text-lg" style={{ color: "#ff7f00" }}>
                +91 76719 58601
              </span>
              <span className="text-slate-400 text-xs font-medium hidden sm:block">Free Demo</span>
            </div>
          </a>

          <p className="text-xs text-slate-400">
            <span aria-hidden="true">{"\u2705"}</span> Free registration &nbsp;|&nbsp; <span aria-hidden="true">{"\u2705"}</span> No hidden charges
          </p>
        </div>

        <div className="relative z-10 hidden lg:flex flex-col gap-4 animate-fadeUp-d1 flex-shrink-0">
          <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card border border-slate-100 min-w-[280px] hover:-translate-y-1 transition-transform duration-300">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-poppins font-bold text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff9e3d, #ff7f00)" }}>
              AS
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm text-slate-800">Anjali Sharma</span>
              <span className="text-xs text-slate-500">Mathematics | Class 10</span>
              <span className="text-xs text-slate-400"><span aria-hidden="true">{"\u2B50"}</span> 4.9 | 3 yrs exp.</span>
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Available</span>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card border border-slate-100 ml-6 min-w-[280px] hover:-translate-y-1 transition-transform duration-300">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-poppins font-bold text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #1a56db)" }}>
              RK
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm text-slate-800">Rahul Kumar</span>
              <span className="text-xs text-slate-500">Science + Maths | Class 8</span>
              <span className="text-xs text-slate-400"><span aria-hidden="true">{"\u2B50"}</span> 4.8 | 5 yrs exp.</span>
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Available</span>
          </div>
          <div className="self-end rounded-xl px-5 py-3 text-white flex flex-col items-center" style={{ background: "linear-gradient(135deg, #1a56db, #3b82f6)", boxShadow: "0 6px 20px rgba(26,86,219,0.3)" }}>
            <span className="font-poppins font-bold text-xl">500+</span>
            <span className="text-xs opacity-80">Happy Students</span>
          </div>
        </div>
      </section>

      <section data-id="stats" className={`py-12 px-[7vw] bg-white border-y border-slate-100 transition-all duration-500 ${vis("stats")}`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-poppins font-extrabold text-3xl text-orange mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-[7vw]">
        <div data-id="services" className={`text-center mb-12 transition-all duration-500 ${vis("services")}`}>
          <span className="section-tag">What We Offer</span>
          <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-3">Complete Tuition Services</h2>
          <p className="text-slate-500">Everything a student needs under one roof.</p>
        </div>
        <div data-id="services-grid" className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-500 delay-150 ${vis("services-grid")}`}>
          {SERVICES.map((service) => (
            <div key={service.label} className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center gap-3 text-center shadow-card hover:-translate-y-1 hover:border-orange-light hover:shadow-orange transition-all duration-200 cursor-default">
              <span className="text-3xl" aria-hidden="true">{service.icon}</span>
              <span className="text-sm font-semibold text-slate-600 leading-tight">{service.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-[7vw] bg-blue-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-100 opacity-50 blur-[60px] pointer-events-none" />
        <div data-id="how" className={`text-center mb-12 transition-all duration-500 ${vis("how")}`}>
          <span className="section-tag">Simple Process</span>
          <h2 className="font-poppins font-bold text-3xl text-slate-900">How It Works</h2>
        </div>
        <div data-id="how-steps" className={`flex flex-wrap justify-center transition-all duration-500 delay-150 ${vis("how-steps")}`}>
          {HOW_STEPS.map((step, index) => (
            <div key={step.n} className="relative flex flex-col items-center text-center px-8 py-6 max-w-[240px]">
              <span className="font-poppins font-extrabold text-5xl leading-none mb-4" aria-hidden="true" style={{ color: "#fff3e0", WebkitTextStroke: "2px #ff9e3d" }}>
                {step.n}
              </span>
              <h3 className="font-poppins font-bold text-base text-slate-900 mb-2">{step.t}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.d}</p>
              {index < HOW_STEPS.length - 1 && (
                <span className="absolute -right-3 top-10 text-orange-light text-2xl hidden sm:block" aria-hidden="true">
                  -&gt;
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-[7vw]">
        <div data-id="benefits" className={`text-center mb-12 transition-all duration-500 ${vis("benefits")}`}>
          <span className="section-tag">Why Choose Us</span>
          <h2 className="font-poppins font-bold text-3xl text-slate-900">Built for Student Success</h2>
        </div>
        <div data-id="benefits-grid" className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-500 delay-150 ${vis("benefits-grid")}`}>
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-card hover:-translate-y-1 transition-transform duration-200">
              <span className="text-3xl block mb-4" aria-hidden="true">{benefit.icon}</span>
              <h3 className="font-poppins font-bold text-base text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-[7vw] bg-white border-y border-slate-100">
        <div data-id="localities" className={`max-w-6xl mx-auto transition-all duration-500 ${vis("localities")}`}>
          <div className="text-center mb-12">
            <span className="section-tag">Local SEO</span>
            <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-3">Home Tutors Across Popular Hyderabad Areas</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Explore location-specific tutor pages for the Hyderabad areas we serve most often, from apartment communities to exam-focused neighbourhoods.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
            {LOCALITY_PAGES.map((area) => (
              <Link key={area.slug} href={`/hyderabad/${area.slug}`} className="bg-slate-50 rounded-3xl border border-slate-100 p-6 shadow-sm hover:-translate-y-1 hover:shadow-card transition-all duration-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">Hyderabad Area</p>
                <h3 className="font-poppins font-bold text-xl text-slate-900 mb-2">{area.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{area.description}</p>
                <span className="text-sm font-semibold text-brand-blue">View {area.name} page</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/hyderabad" className="btn-ghost">Explore All Hyderabad Areas</Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-[7vw]">
        <div data-id="subjects" className={`max-w-6xl mx-auto transition-all duration-500 ${vis("subjects")}`}>
          <div className="text-center mb-12">
            <span className="section-tag">Subject SEO</span>
            <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-3">Subject-Specific Tutor Support</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We also have dedicated pages for high-intent tutor searches like maths, science, English, physics, and chemistry in Hyderabad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
            {SUBJECT_PAGES.map((subject) => (
              <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card hover:-translate-y-1 transition-transform duration-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">Subject Page</p>
                <h3 className="font-poppins font-bold text-xl text-slate-900 mb-2">{subject.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{subject.description}</p>
                <span className="text-sm font-semibold text-brand-blue">View subject page</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/subjects" className="btn-ghost">Explore All Subject Pages</Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-[7vw] bg-blue-50">
        <div data-id="faq" className={`max-w-4xl mx-auto transition-all duration-500 ${vis("faq")}`}>
          <div className="text-center mb-10">
            <span className="section-tag">FAQs</span>
            <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-3">Common Questions from Parents and Students</h2>
            <p className="text-slate-500">Quick answers to the tutoring questions we hear most often in Hyderabad.</p>
          </div>
          <div className="space-y-4">
            {SEO_FAQS.map((faq) => (
              <details key={faq.question} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <summary className="font-poppins font-semibold text-slate-900 cursor-pointer list-none">{faq.question}</summary>
                <p className="text-sm text-slate-500 leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section data-id="cta" className="py-20 px-[7vw] text-center" style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
        <div className={`transition-all duration-500 ${vis("cta")}`}>
          <h2 className="font-poppins font-extrabold text-white mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
            Ready to Get Started?
          </h2>
          <p className="text-white/60 text-base mb-8">
            Book a <strong className="text-orange-light">Free Demo Class</strong> today. No commitment required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/parent" className="btn-primary !py-4 !px-10 !text-base">Request a Tutor</Link>
            <a href="tel:+917671958601" className="text-orange-light font-semibold text-sm border-b border-dashed border-orange-light pb-0.5 hover:opacity-75 transition-opacity">
              <span aria-hidden="true">{"\u{1F4DE}"}</span> Call Now for Free Demo
            </a>
          </div>
        </div>
      </section>

      <footer style={{ background: "#0f172a" }} className="px-[7vw] pt-10">
        <div className="flex flex-wrap justify-between items-start gap-6 pb-8 border-b border-white/10">
          <div className="max-w-xs">
            <span className="font-poppins font-extrabold text-xl text-orange-light block mb-2">Apke Tuitions</span>
            <p className="text-sm text-white/50 leading-relaxed">Connecting students with the right tutors across Hyderabad.</p>
          </div>
          <div className="flex gap-8 flex-wrap items-center">
            {[
              { label: "For Parents", path: "/parent" },
              { label: "For Tutors", path: "/tutor" },
              { label: "Areas", path: "/hyderabad" },
              { label: "Subjects", path: "/subjects" },
              { label: "Admin Login", path: "/admin" },
            ].map(({ label, path }) => (
              <Link key={path} href={path} className="text-sm text-white/50 cursor-pointer hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-white/25 py-4">Copyright {new Date().getFullYear()} Apke Tuitions. All rights reserved.</p>
      </footer>
    </div>
  );
}

