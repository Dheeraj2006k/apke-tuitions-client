import { DM_Sans, Poppins } from "next/font/google";

import "../src/index.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.apketuitions.com"),
  title: {
    default: "Apke Tuitions | Home Tutors in Hyderabad",
    template: "%s | Apke Tuitions",
  },
  description:
    "Find verified home tutors in Hyderabad for Classes 1-12. CBSE, ICSE & State Board. Free demo class. Call +91 76719 58601.",
  keywords: [
    "home tuitions Hyderabad",
    "tutor near me",
    "CBSE tutor Hyderabad",
    "ICSE tutor",
    "maths tutor Hyderabad",
    "online tuition Hyderabad",
    "apke tuitions",
  ],
  authors: [{ name: "Apke Tuitions" }],
  alternates: {
    canonical: "https://www.apketuitions.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Apke Tuitions",
    title: "Apke Tuitions | Best Home Tutors in Hyderabad",
    description:
      "Verified home tutors for Classes 1-12 in Hyderabad. Free demo class. CBSE, ICSE & State Board covered.",
    url: "https://www.apketuitions.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apke Tuitions | Best Home Tutors in Hyderabad",
    description:
      "Verified home tutors for Classes 1-12 in Hyderabad. Free demo class.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "8wRDNx1QsepwiFGkj7wFLJHG4k3sqrGwkyNK98oQ_LM",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Apke Tuitions",
  description:
    "Home tuition service in Hyderabad providing verified tutors for Classes 1-12. CBSE, ICSE and State Board.",
  url: "https://www.apketuitions.com",
  telephone: "+917671958601",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "17.3850",
    longitude: "78.4867",
  },
  openingHours: "Mo-Su 08:00-20:00",
  priceRange: "INR",
  serviceArea: {
    "@type": "City",
    name: "Hyderabad",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Apke Tuitions",
  url: "https://www.apketuitions.com",
  logo: "https://www.apketuitions.com/favicon.ico",
  telephone: "+917671958601",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
