import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getLocalityPage,
  LOCALITY_PAGES,
  SUBJECT_PAGES,
} from "../../../src/content/seo";

export function generateStaticParams() {
  return LOCALITY_PAGES.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }) {
  const area = getLocalityPage(params.slug);

  if (!area) {
    return {};
  }

  return {
    title: area.metaTitle,
    description: area.description,
    alternates: {
      canonical: `https://apketuitions.com/hyderabad/${area.slug}`,
    },
    openGraph: {
      title: `${area.title} | Apke Tuitions`,
      description: area.description,
      url: `https://apketuitions.com/hyderabad/${area.slug}`,
    },
  };
}

export default function LocalityPage({ params }) {
  const area = getLocalityPage(params.slug);

  if (!area) {
    notFound();
  }

  const relatedSubjects = area.relatedSubjects
    .map((slug) => SUBJECT_PAGES.find((subject) => subject.slug === slug))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="px-[7vw] py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <span className="section-tag">Local Landing Page</span>
          <h1 className="font-poppins font-extrabold text-4xl text-slate-900 mb-4">
            {area.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl mb-8">
            {area.intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/parent" className="btn-primary">
              Request a Tutor
            </Link>
            <Link href="/tutor" className="btn-ghost">
              Register as a Tutor
            </Link>
          </div>
        </div>
      </section>

      <section className="px-[7vw] py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {area.highlights.map((highlight) => (
            <div key={highlight} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card">
              <p className="text-sm font-semibold text-orange mb-2">What we offer</p>
              <p className="text-slate-700 leading-relaxed">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[7vw] pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-card">
            <h2 className="font-poppins font-bold text-2xl text-slate-900 mb-4">
              Common tutoring needs in {area.name}
            </h2>
            <ul className="space-y-3 text-slate-600">
              {area.needs.map((need) => (
                <li key={need} className="leading-relaxed">{need}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-card">
            <h2 className="font-poppins font-bold text-2xl text-slate-900 mb-4">
              Nearby landmarks and coverage
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              We commonly arrange tutors for families near these {area.name} landmarks and neighbouring pockets.
            </p>
            <div className="flex flex-wrap gap-3">
              {area.landmarks.map((landmark) => (
                <span key={landmark} className="px-3 py-2 rounded-full bg-orange-dim text-orange text-sm font-medium">
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[7vw] pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-brand-dark rounded-3xl p-8 text-white">
            <p className="text-sm uppercase tracking-widest text-orange-light mb-3">
              Related subject pages
            </p>
            <div className="space-y-3">
              {relatedSubjects.map((subject) => (
                <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="block rounded-2xl border border-white/10 px-4 py-3 hover:bg-white/5 transition-colors">
                  {subject.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-card">
            <p className="text-sm uppercase tracking-widest text-orange mb-3">Nearby areas</p>
            <div className="space-y-3">
              {area.nearbyAreas.map((slug) => {
                const nearby = getLocalityPage(slug);
                if (!nearby) return null;

                return (
                  <Link key={slug} href={`/hyderabad/${slug}`} className="block rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 hover:border-orange-light transition-colors">
                    {nearby.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
