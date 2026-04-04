import { LOCALITY_PAGES, SUBJECT_PAGES } from "../src/content/seo";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: "https://www.apketuitions.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.apketuitions.com/parent",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.apketuitions.com/tutor",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.apketuitions.com/hyderabad",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.apketuitions.com/subjects",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...LOCALITY_PAGES.map((area) => ({
      url: `https://www.apketuitions.com/hyderabad/${area.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    })),
    ...SUBJECT_PAGES.map((subject) => ({
      url: `https://www.apketuitions.com/subjects/${subject.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    })),
  ];
}

