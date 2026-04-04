import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getSubjectPage,
  LOCALITY_PAGES,
  SUBJECT_PAGES,
} from "../../../src/content/seo";

export function generateStaticParams() {
  return SUBJECT_PAGES.map((subject) => ({ slug: subject.slug }));
}

export function generateMetadata({ params }) {
  const subject = getSubjectPage(params.slug);

  if (!subject) {
    return {};
  }

  return {
    title: subject.metaTitle,
    description: subject.description,
    alternates: {
      canonical: `https://www.apketuitions.com/subjects/${subject.slug}`,
    },
    openGraph: {
      title: `${subject.name} | Apke Tuitions`,
      description: subject.description,
      url: `https://www.apketuitions.com/subjects/${subject.slug}`,
    },
  };
}

export default function SubjectPage({ params }) {
  const subject = getSubjectPage(params.slug);

  if (!subject) {
    notFound();
  }

  const relatedAreas = subject.relatedAreas
    .map((slug) => LOCALITY_PAGES.find((area) => area.slug === slug))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="px-[7vw] py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <span className="section-tag">Subject Landing Page</span>
          <h1 className="font-poppins font-extrabold text-4xl text-slate-900 mb-4">
            {subject.name}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl mb-8">
            {subject.intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/parent" className="btn-primary">Find a Tutor</Link>
            <Link href="/tutor" className="btn-ghost">Become a Tutor</Link>
          </div>
        </div>
      </section>

      <section className="px-[7vw] py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {subject.highlights.map((highlight) => (
            <div key={highlight} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card">
              <p className="text-sm font-semibold text-orange mb-2">Why students choose this</p>
              <p className="text-slate-700 leading-relaxed">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[7vw] pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-card">
            <h2 className="font-poppins font-bold text-2xl text-slate-900 mb-4">Focus areas</h2>
            <ul className="space-y-3 text-slate-600">
              {subject.focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-card">
            <h2 className="font-poppins font-bold text-2xl text-slate-900 mb-4">Levels covered</h2>
            <ul className="space-y-3 text-slate-600">
              {subject.levels.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-card">
            <h2 className="font-poppins font-bold text-2xl text-slate-900 mb-4">Learning outcomes</h2>
            <ul className="space-y-3 text-slate-600">
              {subject.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-[7vw] pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-brand-dark rounded-3xl p-8 text-white">
            <p className="text-sm uppercase tracking-widest text-orange-light mb-3">Areas we commonly serve</p>
            <div className="space-y-3">
              {relatedAreas.map((area) => (
                <Link key={area.slug} href={`/hyderabad/${area.slug}`} className="block rounded-2xl border border-white/10 px-4 py-3 hover:bg-white/5 transition-colors">
                  {area.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-card">
            <p className="text-sm uppercase tracking-widest text-orange mb-3">Browse more subject pages</p>
            <div className="space-y-3">
              {SUBJECT_PAGES.filter((item) => item.slug !== subject.slug).map((item) => (
                <Link key={item.slug} href={`/subjects/${item.slug}`} className="block rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 hover:border-orange-light transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

