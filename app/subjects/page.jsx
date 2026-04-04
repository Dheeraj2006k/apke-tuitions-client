import Link from "next/link";

import { SUBJECT_PAGES } from "../../src/content/seo";

export const metadata = {
  title: "Subject Tutors in Hyderabad",
  description:
    "Explore subject-specific tutor pages for maths, science, English, physics, and chemistry in Hyderabad.",
  alternates: {
    canonical: "https://www.apketuitions.com/subjects",
  },
  openGraph: {
    title: "Subject Tutor Pages | Apke Tuitions",
    url: "https://www.apketuitions.com/subjects",
  },
};

export default function SubjectsHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-[7vw] py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="section-tag">Subject Pages</span>
          <h1 className="font-poppins font-extrabold text-4xl text-slate-900 mb-4">
            Subject-Wise Tutors in Hyderabad
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Browse tutor pages focused on the subjects parents search for most
            often in Hyderabad, including maths, science, English, physics, and
            chemistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SUBJECT_PAGES.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card hover:-translate-y-1 transition-transform duration-200"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">
                Subject Landing Page
              </p>
              <h2 className="font-poppins font-bold text-2xl text-slate-900 mb-3">
                {subject.name}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {subject.description}
              </p>
              <p className="text-sm text-slate-700 font-medium">
                Focus: {subject.focusAreas.slice(0, 3).join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

