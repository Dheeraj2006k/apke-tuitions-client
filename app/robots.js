export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/dashboard"],
    },
    sitemap: "https://www.apketuitions.com/sitemap.xml",
  };
}

