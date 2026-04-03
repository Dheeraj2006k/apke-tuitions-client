export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/dashboard"],
    },
    sitemap: "https://apketuitions.com/sitemap.xml",
  };
}
