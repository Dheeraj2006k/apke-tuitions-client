import Home from "../src/views/Home";
import { SEO_FAQS } from "../src/content/seo";

export const metadata = {
  title: "Best Home Tutors in Hyderabad | CBSE, ICSE and State Board",
  description:
    "Connect with verified home tutors in Hyderabad for Classes 1-12. One-on-one coaching for CBSE, ICSE and State Board. Free demo class. Call +91 76719 58601.",
  openGraph: {
    title: "Apke Tuitions | Best Home Tutors in Hyderabad",
    description: "Verified home tutors for Classes 1-12. Free demo class.",
    url: "https://apketuitions.com",
  },
  alternates: {
    canonical: "https://apketuitions.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SEO_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Page() {
  return (
    <>
      <Home />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
