import type { Metadata } from "next";
import { Inter, Indie_Flower } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://parthmittal.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parth Mittal — Software Developer",
    template: "%s | Parth Mittal",
  },
  description:
    "Member of Technical Staff at Oracle. 12× hackathon winner. Builder of Khoj, Echo, and open-source tools.",
  keywords: [
    "Parth Mittal",
    "Software Developer",
    "Oracle",
    "Hackathon",
    "NITK",
    "Portfolio",
  ],
  authors: [{ name: "Parth Mittal", url: siteUrl }],
  creator: "Parth Mittal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Parth Mittal",
    title: "Parth Mittal — Software Developer",
    description:
      "Member of Technical Staff at Oracle. 12× hackathon winner. Builder of Khoj, Echo, and open-source tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Mittal — Software Developer",
    description:
      "Member of Technical Staff at Oracle. 12× hackathon winner.",
    creator: "@mittalparth_",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Parth Mittal",
  jobTitle: "Member of Technical Staff",
  worksFor: {
    "@type": "Organization",
    name: "Oracle",
    url: "https://www.oracle.com",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "National Institute of Technology Karnataka",
      url: "https://www.nitk.ac.in/",
    },
  ],
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/mittal-parth",
    "https://github.com/mittal-parth",
    "https://www.twitter.com/mittalparth_",
  ],
  image: `${siteUrl}/assets/profile-pic.jpg`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${indieFlower.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
