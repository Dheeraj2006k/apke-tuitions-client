import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitTutorRegistration } from "../services/tutorService";
import Navbar from "../components/Navbar";

/* ── Form initial state matching backend Tutor model ── */
const INITIAL = {
  name: "", qualification: "", experience: "", subjects: "",
  classes: "", mode: "", location: "", available_time: "",
  phone: "", email: "", bio: "",
};

/* ── Sidebar benefit bullets ── */
const PERKS = [
  "Get matched with students near you",
  "Flexible timings — you decide",
  "Home visits or online classes",
  "Free registration, no commission",
  "Grow your student base organically",
];

export default function TutorForm() {
  const navigate = useNavigate();

  // Form state
  const [form,        setForm]        = useState(INITIAL);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [serverError, setServerError] = useState("");

  /* ── Validation — matches backend required fields ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())          e.name          = "Your name is required";
    if (!form.qualification.trim()) e.qualification = "Qualification is required";
    if (!form.experience.trim())    e.experience    = "Experience is required";
    if (!form.subjects.trim())      e.subjects      = "Subjects you teach are required";
    if (!form.classes.trim())       e.classes       = "Classes you teach are required";
    if (!form.mode)                 e.mode          = "Please select a teaching mode";
    if (!form.location.trim())      e.location      = "Location is required";
    if (!form.available_time.trim()) e.available_time = "Available time is required";
    if (!form.phone.trim())         e.phone         = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone))
                                    e.phone         = "Enter a valid 10-digit Indian mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                    e.email         = "Enter a valid email address";
    return e;
  };

  /* ── Field change handler ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error immediately on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  /* ── Submit handler ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to the first error field smoothly
      document.querySelector(".field-error")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      await submitTutorRegistration(form);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      // Backend returns a message for duplicate phone registrations
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ════ SUCCESS SCREEN ════ */
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 font-dm">
        <Navbar />
        <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center
                        text-center px-6 pt-24 animate-fadeUp">
          {/* Blue check circle — different from parent form's green, to differentiate pages */}
          <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-400
                          flex items-center justify-center text-4xl text-blue-500 mb-6">
            ✓
          </div>
          <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-3">
            Registration Successful!
          </h2>
          <p className="text-slate-500 max-w-md leading-relaxed mb-8">
            Welcome, <strong className="text-slate-700">{form.name}</strong>!
            Your profile has been submitted. Our team will review it and reach
            out to you with student matches soon.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-primary" onClick={() => navigate("/")}>Back to Home</button>
            <button className="btn-ghost"
                    onClick={() => { setForm(INITIAL); setSubmitted(false); }}>
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ════ MAIN FORM ════ */
  return (
    <div className="min-h-screen bg-slate-50 font-dm">
      <Navbar />

      <div className="flex min-h-screen pt-[72px]">

        {/* ── Sidebar — blue theme to differentiate from parent form ── */}
        <aside className="hidden lg:flex flex-col w-[340px] flex-shrink-0 px-10 py-16
                          sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto"
               style={{ background: "linear-gradient(160deg, #0c1a3a, #1a56db)" }}>
          <div className="animate-fadeUp">
            {/* Blue-toned tag */}
            <span className="inline-block text-xs font-semibold uppercase tracking-widest
                             px-3 py-1 rounded-full mb-6 border"
                  style={{ background:"rgba(255,255,255,0.1)", color:"#93c5fd",
                           borderColor:"rgba(255,255,255,0.2)" }}>
              Become a Tutor
            </span>
            <h1 className="font-poppins font-bold text-2xl text-white leading-snug mb-4">
              Share Your Knowledge, Grow Your Income
            </h1>
            <p className="text-sm text-white/55 leading-relaxed mb-8">
              Register as a tutor and get matched with students in your area.
              Free registration — no hidden fees, ever.
            </p>
            <ul className="space-y-3 mb-10">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                  <span className="text-blue-300 font-bold flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-6">
              <span className="text-xs text-white/35 block mb-1">Need help? Call us</span>
              <a href="tel:+917671958601"
                 className="font-poppins font-semibold text-lg text-blue-300 hover:underline">
                +91 76719 58601
              </a>
            </div>
          </div>
        </aside>

        {/* ── Form panel ── */}
        <main className="flex-1 px-[5vw] py-12 flex flex-col items-center">
          <div className="w-full max-w-[660px] animate-fadeUp">
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-card">

              {/* Card header — blue tint to match sidebar */}
              <div className="px-9 py-7 border-b border-blue-100"
                   style={{ background:"linear-gradient(135deg,#eff6ff,#f0f7ff)" }}>
                <h2 className="font-poppins font-bold text-xl text-slate-900 mb-1">
                  Tutor Registration Form
                </h2>
                <p className="text-xs text-slate-500">
                  Fields marked <span className="text-orange font-semibold">*</span> are required
                </p>
              </div>

              {/* Server error banner */}
              {serverError && (
                <div className="mx-9 mt-5 flex items-center gap-2 px-4 py-3
                                bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <span>⚠</span> {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="px-9 pt-7">

                {/* ── Personal Info ── */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">
                  Personal Info
                </p>
                <div className="space-y-4 mb-7 pb-7 border-b border-slate-100">
                  <div>
                    <label className="form-label">Full Name <span className="text-orange">*</span></label>
                    <input type="text" name="name" value={form.name}
                           onChange={handleChange} placeholder="e.g. Priya Reddy"
                           className={`form-input ${errors.name ? "error" : ""}`} />
                    {errors.name && <span className="field-error text-xs text-red-500 mt-1 block">{errors.name}</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Qualification <span className="text-orange">*</span></label>
                      <input type="text" name="qualification" value={form.qualification}
                             onChange={handleChange} placeholder="e.g. B.Sc Mathematics, B.Ed"
                             className={`form-input ${errors.qualification ? "error" : ""}`} />
                      {errors.qualification && <span className="field-error text-xs text-red-500 mt-1 block">{errors.qualification}</span>}
                    </div>
                    <div>
                      <label className="form-label">Experience <span className="text-orange">*</span></label>
                      <input type="text" name="experience" value={form.experience}
                             onChange={handleChange} placeholder="e.g. 3 years"
                             className={`form-input ${errors.experience ? "error" : ""}`} />
                      {errors.experience && <span className="field-error text-xs text-red-500 mt-1 block">{errors.experience}</span>}
                    </div>
                  </div>
                </div>

                {/* ── Teaching Details ── */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">
                  Teaching Details
                </p>
                <div className="space-y-4 mb-7 pb-7 border-b border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Subjects You Teach <span className="text-orange">*</span></label>
                      <input type="text" name="subjects" value={form.subjects}
                             onChange={handleChange} placeholder="e.g. Maths, Physics"
                             className={`form-input ${errors.subjects ? "error" : ""}`} />
                      {errors.subjects && <span className="field-error text-xs text-red-500 mt-1 block">{errors.subjects}</span>}
                    </div>
                    <div>
                      <label className="form-label">Classes You Teach <span className="text-orange">*</span></label>
                      <input type="text" name="classes" value={form.classes}
                             onChange={handleChange} placeholder="e.g. Class 9, 10, 11"
                             className={`form-input ${errors.classes ? "error" : ""}`} />
                      {errors.classes && <span className="field-error text-xs text-red-500 mt-1 block">{errors.classes}</span>}
                    </div>
                  </div>

                  {/* Mode — 3 options for tutors (online / offline / both) */}
                  <div>
                    <label className="form-label">Teaching Mode <span className="text-orange">*</span></label>
                    <div className="flex gap-3">
                      {[
                        { value:"online",  label:"🌐 Online" },
                        { value:"offline", label:"🏠 Home Visit" },
                        { value:"both",    label:"🔄 Both" },
                      ].map((m) => (
                        <button key={m.value} type="button"
                                onClick={() => {
                                  setForm((p) => ({ ...p, mode: m.value }));
                                  if (errors.mode) setErrors((p) => ({ ...p, mode:"" }));
                                }}
                                className={`flex-1 py-3 px-2 rounded-xl border-2 text-sm font-medium
                                            transition-all duration-150 cursor-pointer
                                            ${form.mode === m.value
                                              ? "border-orange bg-orange-dim text-orange font-semibold"
                                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-orange-light"}`}>
                          {m.label}
                        </button>
                      ))}
                    </div>
                    {errors.mode && <span className="field-error text-xs text-red-500 mt-1 block">{errors.mode}</span>}
                  </div>
                </div>

                {/* ── Location & Availability ── */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">
                  Location & Availability
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7 pb-7 border-b border-slate-100">
                  <div>
                    <label className="form-label">Location <span className="text-orange">*</span></label>
                    <input type="text" name="location" value={form.location}
                           onChange={handleChange} placeholder="e.g. Hyderabad, Ameerpet"
                           className={`form-input ${errors.location ? "error" : ""}`} />
                    {errors.location && <span className="field-error text-xs text-red-500 mt-1 block">{errors.location}</span>}
                  </div>
                  <div>
                    <label className="form-label">Available Time <span className="text-orange">*</span></label>
                    <input type="text" name="available_time" value={form.available_time}
                           onChange={handleChange} placeholder="e.g. Weekdays 4–8 PM"
                           className={`form-input ${errors.available_time ? "error" : ""}`} />
                    {errors.available_time && <span className="field-error text-xs text-red-500 mt-1 block">{errors.available_time}</span>}
                  </div>
                </div>

                {/* ── Contact & Bio ── */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">
                  Contact & Bio
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Phone <span className="text-orange">*</span></label>
                      <input type="tel" name="phone" value={form.phone}
                             onChange={handleChange} placeholder="10-digit mobile number"
                             maxLength={10} className={`form-input ${errors.phone ? "error" : ""}`} />
                      {errors.phone && <span className="field-error text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                    </div>
                    <div>
                      <label className="form-label">Email <span className="text-slate-400 font-normal text-xs">(optional)</span></label>
                      <input type="email" name="email" value={form.email}
                             onChange={handleChange} placeholder="you@example.com"
                             className={`form-input ${errors.email ? "error" : ""}`} />
                      {errors.email && <span className="field-error text-xs text-red-500 mt-1 block">{errors.email}</span>}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">
                      Short Bio <span className="text-slate-400 font-normal text-xs">(optional)</span>
                    </label>
                    <textarea name="bio" value={form.bio} onChange={handleChange} rows={3}
                              placeholder="Tell students about your teaching style, achievements, or specialisations..."
                              className="form-input resize-y min-h-[90px]" />
                  </div>
                </div>
              </form>

              {/* Submit footer */}
              <div className="px-9 py-7 border-t border-slate-100 mt-7">
                <button onClick={handleSubmit} disabled={loading}
                        className="btn-primary w-full justify-center !py-4 !text-base
                                   disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white
                                       rounded-full animate-spin-slow inline-block" />
                      Registering...
                    </>
                  ) : "Register as Tutor →"}
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  Free registration — our team will contact you with student matches.
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


