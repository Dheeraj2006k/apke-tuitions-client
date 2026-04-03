import Link from "next/link";

import { LOCALITY_PAGES } from "../../src/content/seo";

export const metadata = {
  title: "Home Tutor Areas in Hyderabad",
  description:
    "Explore the Hyderabad localities where Apke Tuitions offers home tutors, including Kukatpally, Madhapur, Gachibowli, Banjara Hills, and Secunderabad.",
  alternates: {
    canonical: "https://apketuitions.com/hyderabad",
  },
  openGraph: {
    title: "Hyderabad Areas We Serve | Apke Tuitions",
    url: "https://apketuitions.com/hyderabad",
  },
};

export default function HyderabadHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-[7vw] py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="section-tag">Hyderabad Coverage</span>
          <h1 className="font-poppins font-extrabold text-4xl text-slate-900 mb-4">
            Home Tutor Coverage Across Hyderabad
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Browse our location-focused tutor pages for major Hyderabad areas.
            Each page is written for local parents looking for verified
            one-on-one tutors with flexible timings and free demo options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {LOCALITY_PAGES.map((area) => (
            <Link
              key={area.slug}
              href={`/hyderabad/${area.slug}`}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card hover:-translate-y-1 transition-transform duration-200"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">
                Local Landing Page
              </p>
              <h2 className="font-poppins font-bold text-2xl text-slate-900 mb-3">
                {area.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {area.description}
              </p>
              <p className="text-sm text-slate-700 font-medium">
                Landmarks: {area.landmarks.join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
