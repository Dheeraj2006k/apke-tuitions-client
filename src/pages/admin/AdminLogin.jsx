import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/adminService";

/**
 * AdminLogin — JWT-based login page
 * Lives at /admin — completely separate from the public site.
 * On success: stores token in localStorage → redirects to /admin/dashboard
 */
export default function AdminLogin() {
  const navigate = useNavigate();

  const [form,     setForm]     = useState({ email: "", password: "" });
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await loginAdmin(form);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-dm flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] animate-fadeUp">

        {/* Brand */}
        <div className="text-center mb-8">
          <span className="font-poppins font-extrabold text-2xl">
            Apke <span className="text-orange">Tuitions</span>
          </span>
          <p className="text-slate-500 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-card">
          <div className="px-8 py-6 border-b border-slate-100"
               style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
            <h1 className="font-poppins font-bold text-xl text-white mb-1">Welcome Back</h1>
            <p className="text-sm text-white/50">Sign in to manage requests and tutors</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="px-8 py-7 space-y-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border
                              border-red-200 rounded-xl text-red-700 text-sm">
                <span>⚠</span> {error}
              </div>
            )}

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="User@apke.com"
                autoComplete="email" className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password"
                  autoComplete="current-password" className="form-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                             hover:text-slate-600 transition-colors text-sm cursor-pointer
                             bg-transparent border-0"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center !py-3.5 !text-base
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white
                                   rounded-full animate-spin-slow inline-block" />
                  Signing in...
                </>
              ) : "Sign In →"}
            </button>
          </form>
        </div>

        {/* Back to public site */}
        <p className="text-center text-sm text-slate-400 mt-5">
          <span
            onClick={() => navigate("/")}
            className="text-orange cursor-pointer hover:underline"
          >
            ← Back to website
          </span>
        </p>
      </div>
    </div>
  );
}