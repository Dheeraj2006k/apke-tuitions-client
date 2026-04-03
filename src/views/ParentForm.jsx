"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitParentRequest } from "../services/parentService";
import Navbar from "../components/Navbar";

/* ── Dropdown options ── */
const CLASSES = [
  "Class 1","Class 2","Class 3","Class 4","Class 5","Class 6",
  "Class 7","Class 8","Class 9","Class 10","Class 11","Class 12",
];

/* ── Empty form state ── */
const INITIAL = {
  parent_name: "", student_name: "", class: "", subjects: "",
  mode: "", number_of_students: 1, location: "",
  preferred_time: "", phone: "", whatsapp: "", message: "",
};

/* ── Sidebar trust bullets ── */
const PERKS = [
  "Free demo class before you commit",
  "Verified & background-checked tutors",
  "Home visits or online sessions",
  "CBSE, ICSE & State Board covered",
  "Response within 24 hours",
];

export default function ParentForm() {
  const router = useRouter();

  // Form state
  const [form,        setForm]        = useState(INITIAL);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [serverError, setServerError] = useState("");

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.parent_name.trim())    e.parent_name    = "Parent name is required";
    if (!form.student_name.trim())   e.student_name   = "Student name is required";
    if (!form.class)                 e.class          = "Please select a class";
    if (!form.subjects.trim())       e.subjects       = "At least one subject is required";
    if (!form.mode)                  e.mode           = "Please select a mode";
    if (!form.location.trim())       e.location       = "Location is required";
    if (!form.preferred_time.trim()) e.preferred_time = "Preferred time is required";
    if (!form.phone.trim())          e.phone          = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone))
                                     e.phone          = "Enter a valid 10-digit Indian mobile number";
    return e;
  };

  /* ── Field change handler ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  /* ── Submit handler ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error smoothly
      document.querySelector(".field-error")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      await submitParentRequest({
        ...form,
        number_of_students: Number(form.number_of_students),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      // Show backend error (e.g. duplicate 24hr detection)
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
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-400
                          flex items-center justify-center text-4xl text-emerald-500 mb-6">
            ✓
          </div>
          <h2 className="font-poppins font-bold text-3xl text-slate-900 mb-3">
            Request Submitted!
          </h2>
          <p className="text-slate-500 max-w-md leading-relaxed mb-8">
            Thank you, <strong className="text-slate-700">{form.parent_name}</strong>.
            We've received your tutor request for{" "}
            <strong className="text-slate-700">{form.student_name}</strong>.
            Our team will contact you within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-primary" onClick={() => router.push("/")}>Back to Home</button>
            <button className="btn-ghost"
                    onClick={() => { setForm(INITIAL); setSubmitted(false); }}>
              Submit Another
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

        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-[340px] flex-shrink-0 px-10 py-16
                          sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto"
               style={{ background: "linear-gradient(160deg, #0f172a, #1e3a5f)" }}>
          <div className="animate-fadeUp">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest
                             px-3 py-1 rounded-full mb-6 border"
                  style={{ background:"rgba(255,127,0,0.15)", color:"#ff9e3d",
                           borderColor:"rgba(255,127,0,0.25)" }}>
              Find a Tutor
            </span>
            <h1 className="font-poppins font-bold text-2xl text-white leading-snug mb-4">
              Get the Right Tutor for Your Child
            </h1>
            <p className="text-sm text-white/55 leading-relaxed mb-8">
              Fill in your requirements and we'll match you with a verified,
              experienced tutor near you — completely free.
            </p>
            <ul className="space-y-3 mb-10">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                  <span className="text-emerald-400 font-bold flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-6">
              <span className="text-xs text-white/35 block mb-1">Need help? Call us</span>
              <a href="tel:+917671958601"
                 className="font-poppins font-semibold text-lg hover:underline"
                 style={{ color:"#ff9e3d" }}>
                +91 76719 58601
              </a>
            </div>
          </div>
        </aside>

        {/* ── Form panel ── */}
        <main className="flex-1 px-[5vw] py-12 flex flex-col items-center">
          <div className="w-full max-w-[660px] animate-fadeUp">
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-card">

              {/* Header */}
              <div className="px-9 py-7 border-b border-orange-100"
                   style={{ background:"linear-gradient(135deg,#fff3e0,#fff8f0)" }}>
                <h2 className="font-poppins font-bold text-xl text-slate-900 mb-1">
                  Parent Request Form
                </h2>
                <p className="text-xs text-slate-500">
                  Fields marked <span className="text-orange font-semibold">*</span> are required
                </p>
              </div>

              {/* Server error */}
              {serverError && (
                <div className="mx-9 mt-5 flex items-center gap-2 px-4 py-3
                                bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <span>⚠</span> {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="px-9 pt-7">

                {/* About You */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">About You</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7 pb-7 border-b border-slate-100">
                  <div>
                    <label className="form-label">Parent Name <span className="text-orange">*</span></label>
                    <input type="text" name="parent_name" value={form.parent_name}
                           onChange={handleChange} placeholder="e.g. Ravi Sharma"
                           className={`form-input ${errors.parent_name ? "error" : ""}`} />
                    {errors.parent_name && <span className="field-error text-xs text-red-500 mt-1 block">{errors.parent_name}</span>}
                  </div>
                  <div>
                    <label className="form-label">Student Name <span className="text-orange">*</span></label>
                    <input type="text" name="student_name" value={form.student_name}
                           onChange={handleChange} placeholder="e.g. Aryan Sharma"
                           className={`form-input ${errors.student_name ? "error" : ""}`} />
                    {errors.student_name && <span className="field-error text-xs text-red-500 mt-1 block">{errors.student_name}</span>}
                  </div>
                </div>

                {/* Tuition Details */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">Tuition Details</p>
                <div className="space-y-4 mb-7 pb-7 border-b border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Class <span className="text-orange">*</span></label>
                      <select name="class" value={form.class} onChange={handleChange}
                              className={`form-input ${errors.class ? "error" : ""}`}>
                        <option value="">Select class</option>
                        {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.class && <span className="field-error text-xs text-red-500 mt-1 block">{errors.class}</span>}
                    </div>
                    <div>
                      <label className="form-label">Number of Students</label>
                      <input type="number" name="number_of_students" value={form.number_of_students}
                             onChange={handleChange} min="1" max="10" className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Subjects <span className="text-orange">*</span></label>
                    <input type="text" name="subjects" value={form.subjects}
                           onChange={handleChange} placeholder="e.g. Mathematics, Science, English"
                           className={`form-input ${errors.subjects ? "error" : ""}`} />
                    {errors.subjects && <span className="field-error text-xs text-red-500 mt-1 block">{errors.subjects}</span>}
                  </div>
                  {/* Mode toggle buttons */}
                  <div>
                    <label className="form-label">Teaching Mode <span className="text-orange">*</span></label>
                    <div className="flex gap-3">
                      {[{ value:"online", label:"🌐 Online" },{ value:"offline", label:"🏠 Home Visit" }].map((m) => (
                        <button key={m.value} type="button"
                                onClick={() => {
                                  setForm((p) => ({ ...p, mode: m.value }));
                                  if (errors.mode) setErrors((p) => ({ ...p, mode:"" }));
                                }}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium
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

                {/* Location & Timing */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">Location & Timing</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7 pb-7 border-b border-slate-100">
                  <div>
                    <label className="form-label">Location <span className="text-orange">*</span></label>
                    <input type="text" name="location" value={form.location}
                           onChange={handleChange} placeholder="e.g. Hyderabad, Kukatpally"
                           className={`form-input ${errors.location ? "error" : ""}`} />
                    {errors.location && <span className="field-error text-xs text-red-500 mt-1 block">{errors.location}</span>}
                  </div>
                  <div>
                    <label className="form-label">Preferred Time <span className="text-orange">*</span></label>
                    <input type="text" name="preferred_time" value={form.preferred_time}
                           onChange={handleChange} placeholder="e.g. Evening 5–7 PM"
                           className={`form-input ${errors.preferred_time ? "error" : ""}`} />
                    {errors.preferred_time && <span className="field-error text-xs text-red-500 mt-1 block">{errors.preferred_time}</span>}
                  </div>
                </div>

                {/* Contact */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">Contact Details</p>
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
                      <label className="form-label">WhatsApp <span className="text-slate-400 font-normal text-xs">(optional)</span></label>
                      <input type="tel" name="whatsapp" value={form.whatsapp}
                             onChange={handleChange} placeholder="If different from phone"
                             maxLength={10} className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Message <span className="text-slate-400 font-normal text-xs">(optional)</span></label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                              placeholder="Any specific requirements, preferred tutor gender, board, etc."
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
                      Submitting...
                    </>
                  ) : "Submit Request →"}
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  By submitting, you agree to be contacted by our team. No spam, ever.
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}



