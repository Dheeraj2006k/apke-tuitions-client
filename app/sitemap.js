import { LOCALITY_PAGES, SUBJECT_PAGES } from "../src/content/seo";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: "https://apketuitions.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://apketuitions.com/parent",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://apketuitions.com/tutor",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://apketuitions.com/hyderabad",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://apketuitions.com/subjects",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...LOCALITY_PAGES.map((area) => ({
      url: `https://apketuitions.com/hyderabad/${area.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    })),
    ...SUBJECT_PAGES.map((subject) => ({
      url: `https://apketuitions.com/subjects/${subject.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    })),
  ];
}
