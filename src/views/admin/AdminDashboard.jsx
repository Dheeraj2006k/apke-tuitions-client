"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getParentRequests,
  getTutors,
  updateRequestStatus,
  assignTutor,
  changePassword,
} from "../../services/adminService";

const STATUS_STYLES = {
  new:       "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  assigned:  "bg-green-100 text-green-700",
  closed:    "bg-slate-100 text-slate-500",
};

const STATUS_OPTIONS = ["new", "contacted", "assigned", "closed"];

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.replace("/admin");
  }, [router]);

  const [activeTab,      setActiveTab]      = useState("requests");
  const [requests,       setRequests]       = useState([]);
  const [tutors,         setTutors]         = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [assignModal,    setAssignModal]    = useState(null);
  const [statusLoading,  setStatusLoading]  = useState(null);

  // ── Change Password state ──
  const [pwModal,     setPwModal]     = useState(false);
  const [pwForm,      setPwForm]      = useState({ current: "", newPw: "", confirm: "" });
  const [pwError,     setPwError]     = useState("");
  const [pwSuccess,   setPwSuccess]   = useState("");
  const [pwLoading,   setPwLoading]   = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [reqData, tutorData] = await Promise.all([
        getParentRequests(),
        getTutors(),
      ]);
      setRequests(reqData.data   || []);
      setTutors(tutorData.data   || []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        router.replace("/admin");
      } else {
        setError("Failed to load data. Please refresh.");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.replace("/admin");
  };

  const handleStatusChange = async (requestId, newStatus) => {
    setStatusLoading(requestId);
    try {
      await updateRequestStatus(requestId, newStatus);
      setRequests((prev) =>
        prev.map((r) => r._id === requestId ? { ...r, status: newStatus } : r)
      );
    } catch {
      alert("Failed to update status. Try again.");
    } finally {
      setStatusLoading(null);
    }
  };

  const handleAssign = async (requestId, tutorId) => {
    try {
      await assignTutor(requestId, tutorId);
      const assignedTutor = tutors.find((t) => t._id === tutorId);
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId
            ? { ...r, status: "assigned", assigned_tutor_id: assignedTutor }
            : r
        )
      );
      setAssignModal(null);
    } catch {
      alert("Failed to assign tutor. Try again.");
    }
  };

  // ── Change Password ──
  const openPwModal = () => {
    setPwForm({ current: "", newPw: "", confirm: "" });
    setPwError("");
    setPwSuccess("");
    setShowCurrent(false);
    setShowNew(false);
    setPwModal(true);
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
    setPwError("");
    setPwSuccess("");
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
      setPwError("All fields are required.");
      return;
    }
    if (pwForm.newPw.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError("New passwords do not match.");
      return;
    }
    if (pwForm.current === pwForm.newPw) {
      setPwError("New password must be different from current password.");
      return;
    }

    setPwLoading(true);
    setPwError("");
    try {
      await changePassword(pwForm.current, pwForm.newPw);
      setPwSuccess("Password changed! Logging you out in 2 seconds...");
      setTimeout(() => {
        localStorage.removeItem("adminToken");
        router.replace("/admin");
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password. Try again.";
      setPwError(msg);
    } finally {
      setPwLoading(false);
    }
  };

  const filteredRequests = requests.filter((r) =>
    locationFilter
      ? r.location?.toLowerCase().includes(locationFilter.toLowerCase())
      : true
  );

  const counts = {
    total:    requests.length,
    new:      requests.filter((r) => r.status === "new").length,
    assigned: requests.filter((r) => r.status === "assigned").length,
    tutors:   tutors.length,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-dm">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center
                         justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-poppins font-extrabold text-lg">
            Apke <span className="text-orange">Tuitions</span>
          </span>
          <span className="text-xs font-semibold bg-orange-dim text-orange
                           px-2 py-0.5 rounded-full border border-orange-light">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchAll}
                  className="text-sm text-slate-500 hover:text-slate-800 transition-colors
                             flex items-center gap-1.5 cursor-pointer bg-transparent border-0">
            ↻ Refresh
          </button>
          <button onClick={openPwModal}
                  className="text-sm font-medium text-slate-500 hover:text-slate-800
                             transition-colors cursor-pointer bg-transparent border-0">
            🔑 Change Password
          </button>
          <button onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-700
                             transition-colors cursor-pointer bg-transparent border-0">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeUp">
          {[
            { label: "Total Requests", value: counts.total,    color: "bg-blue-50 border-blue-100",        text: "text-blue-700"   },
            { label: "New Requests",   value: counts.new,      color: "bg-orange-dim border-orange-light",  text: "text-orange"     },
            { label: "Assigned",       value: counts.assigned, color: "bg-green-50 border-green-100",      text: "text-green-700"  },
            { label: "Total Tutors",   value: counts.tutors,   color: "bg-purple-50 border-purple-100",    text: "text-purple-700" },
          ].map((c) => (
            <div key={c.label} className={`${c.color} border rounded-2xl p-5`}>
              <p className="text-xs font-semibold text-slate-500 mb-1">{c.label}</p>
              <p className={`font-poppins font-bold text-3xl ${c.text}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-slate-100 rounded-2xl p-1 w-fit mb-6 shadow-sm">
          {[
            { id: "requests", label: "📋 Parent Requests" },
            { id: "tutors",   label: "👨‍🏫 Tutors" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                                cursor-pointer border-0
                                ${activeTab === tab.id
                                  ? "bg-slate-900 text-white"
                                  : "text-slate-500 hover:text-slate-800 bg-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl
                          text-red-700 text-sm flex items-center gap-2">
            <span>⚠</span> {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-8 h-8 border-2 border-orange/30 border-t-orange
                             rounded-full animate-spin-slow inline-block" />
          </div>

        ) : activeTab === "requests" ? (

          /* ── REQUESTS TAB ── */
          <div className="animate-fadeUp">
            <div className="flex items-center gap-3 mb-5">
              <input type="text" placeholder="🔍 Filter by location..."
                     value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
                     className="form-input max-w-xs !bg-white" />
              {locationFilter && (
                <button onClick={() => setLocationFilter("")}
                        className="text-sm text-slate-400 hover:text-slate-700 cursor-pointer bg-transparent border-0">
                  Clear
                </button>
              )}
              <span className="text-sm text-slate-400 ml-auto">
                {filteredRequests.length} of {requests.length} requests
              </span>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-4xl mb-3">📭</p>
                <p className="font-medium">No requests found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredRequests.map((req) => (
                  <div key={req._id}
                       className="bg-white rounded-2xl border border-slate-100 p-5
                                  shadow-sm hover:shadow-card transition-shadow duration-200">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{req.parent_name}</p>
                        <p className="text-xs text-slate-500">Student: {req.student_name} · {req.class}</p>
                      </div>
                      <select value={req.status} disabled={statusLoading === req._id}
                              onChange={(e) => handleStatusChange(req._id, e.target.value)}
                              className={`text-xs font-semibold px-2 py-1 rounded-full border-0
                                          cursor-pointer outline-none
                                          ${STATUS_STYLES[req.status] || "bg-slate-100 text-slate-600"}
                                          ${statusLoading === req._id ? "opacity-50" : ""}`}>
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500 mb-4">
                      <span className="inline-block mr-3">📚 {req.subjects}</span>
                      <span className="inline-block mr-3">📍 {req.location}</span>
                      <span className="inline-block mr-3">🕐 {req.preferred_time}</span>
                      <span className="inline-block mr-3">📱 {req.phone}</span>
                      <span className="inline-block">{req.mode === "online" ? "🌐 Online" : "🏠 Home Visit"}</span>
                      {req.message && <p className="mt-1">💬 {req.message}</p>}
                    </div>

                    {req.assigned_tutor_id ? (
                      <div className="flex items-center gap-2 bg-green-50 border border-green-100
                                      rounded-xl px-3 py-2 text-sm text-green-700">
                        <span aria-hidden="true">✓</span>
                        <span>
                          Assigned to <strong>{req.assigned_tutor_id.name || "Tutor"}</strong>
                          {req.assigned_at && (
                            <span className="text-green-500 font-normal ml-2">
                              · {new Date(req.assigned_at).toLocaleDateString()}
                            </span>
                          )}
                        </span>
                      </div>
                    ) : (
                      <button onClick={() => setAssignModal(req._id)}
                              className="text-xs font-semibold text-orange border border-orange-light
                                         bg-orange-dim px-3 py-1.5 rounded-lg hover:bg-orange
                                         hover:text-white transition-all duration-150 cursor-pointer">
                        + Assign Tutor
                      </button>
                    )}
                    <p className="text-xs text-slate-300 mt-3">
                      Submitted {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        ) : (

          /* ── TUTORS TAB ── */
          <div className="animate-fadeUp">
            {tutors.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-4xl mb-3">👨‍🏫</p>
                <p className="font-medium">No tutors registered yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {tutors.map((tutor) => (
                  <div key={tutor._id}
                       className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm
                                  hover:shadow-card transition-shadow duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center
                                      text-white font-poppins font-bold text-sm flex-shrink-0"
                           style={{ background: "linear-gradient(135deg, #ff9e3d, #ff7f00)" }}>
                        {tutor.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{tutor.name}</p>
                        <p className="text-xs text-slate-500">{tutor.qualification}</p>
                      </div>
                      <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full
                        ${tutor.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {tutor.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-500">
                      <p>📚 {tutor.subjects} &nbsp;·&nbsp; {tutor.classes}</p>
                      <p>📍 {tutor.location}</p>
                      <p>🕐 {tutor.available_time}</p>
                      <p>{tutor.mode === "online" ? "🌐 Online" : tutor.mode === "offline" ? "🏠 Home Visit" : "🔄 Online & Home Visit"}</p>
                      <p>📱 {tutor.phone}</p>
                      {tutor.experience && <p>⏳ {tutor.experience} experience</p>}
                    </div>
                    {tutor.bio && (
                      <p className="text-xs text-slate-400 mt-3 italic leading-relaxed border-t border-slate-100 pt-3">
                        "{tutor.bio}"
                      </p>
                    )}
                    <p className="text-xs text-slate-300 mt-3">
                      Joined {new Date(tutor.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── ASSIGN TUTOR MODAL ── */}
      {assignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
             onClick={(e) => { if (e.target === e.currentTarget) setAssignModal(null); }}>
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-fadeUp overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between"
                 style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
              <div>
                <h3 className="font-poppins font-bold text-white text-lg">Assign a Tutor</h3>
                <p className="text-white/50 text-xs mt-0.5">Select a tutor for this request</p>
              </div>
              <button onClick={() => setAssignModal(null)}
                      className="text-white/50 hover:text-white text-xl cursor-pointer bg-transparent border-0 leading-none">✕</button>
            </div>
            <div className="px-6 py-4 max-h-[400px] overflow-y-auto space-y-2">
              {tutors.filter((t) => t.status === "active").length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">No active tutors available</p>
              ) : (
                tutors.filter((t) => t.status === "active").map((tutor) => (
                  <button key={tutor._id} onClick={() => handleAssign(assignModal, tutor._id)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100
                                     hover:border-orange hover:bg-orange-dim transition-all duration-150
                                     text-left cursor-pointer bg-white">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center
                                    text-white font-bold text-sm flex-shrink-0"
                         style={{ background: "linear-gradient(135deg, #ff9e3d, #ff7f00)" }}>
                      {tutor.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{tutor.name}</p>
                      <p className="text-xs text-slate-500 truncate">{tutor.subjects} · {tutor.location}</p>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{tutor.experience}</span>
                  </button>
                ))
              )}
            </div>
            <div className="px-6 py-4 border-t border-slate-100">
              <button onClick={() => setAssignModal(null)} className="btn-ghost w-full justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CHANGE PASSWORD MODAL ── */}
      {pwModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
             onClick={(e) => { if (e.target === e.currentTarget) setPwModal(false); }}>
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-fadeUp overflow-hidden">

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between"
                 style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
              <div>
                <h3 className="font-poppins font-bold text-white text-lg">🔑 Change Password</h3>
                <p className="text-white/50 text-xs mt-0.5">You'll be logged out after changing</p>
              </div>
              <button onClick={() => setPwModal(false)}
                      className="text-white/50 hover:text-white text-xl cursor-pointer bg-transparent border-0 leading-none">✕</button>
            </div>

            {/* Form */}
            <form onSubmit={handlePwSubmit} noValidate className="px-6 py-6 space-y-4">

              {pwError && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border
                                border-red-200 rounded-xl text-red-700 text-sm">
                  <span>⚠</span> {pwError}
                </div>
              )}

              {pwSuccess && (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border
                                border-green-200 rounded-xl text-green-700 text-sm">
                  <span aria-hidden="true">✓</span> {pwSuccess}
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="form-label">Current Password</label>
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} name="current"
                         value={pwForm.current} onChange={handlePwChange}
                         placeholder="Enter current password" className="form-input pr-12" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                                     hover:text-slate-600 text-sm cursor-pointer bg-transparent border-0">
                    {showCurrent ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="form-label">New Password</label>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} name="newPw"
                         value={pwForm.newPw} onChange={handlePwChange}
                         placeholder="At least 8 characters" className="form-input pr-12" />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
                                     hover:text-slate-600 text-sm cursor-pointer bg-transparent border-0">
                    {showNew ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label className="form-label">Confirm New Password</label>
                <input type="password" name="confirm" value={pwForm.confirm}
                       onChange={handlePwChange} placeholder="Re-enter new password"
                       className={`form-input ${pwForm.confirm && pwForm.newPw !== pwForm.confirm ? "error" : ""}`} />
                {pwForm.confirm && pwForm.newPw !== pwForm.confirm && (
                  <span className="text-xs text-red-500 mt-1 block">Passwords do not match</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setPwModal(false)}
                        className="btn-ghost flex-1 justify-center">
                  Cancel
                </button>
                <button type="submit" disabled={pwLoading}
                        className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {pwLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white
                                       rounded-full animate-spin-slow inline-block" />
                      Saving...
                    </>
                  ) : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




