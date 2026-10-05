import localFont from "next/font/local";
import Frame from "@/components/shell/Frame";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Self-hosted variable fonts (latin subset, from Fontsource) instead of next/font/google:
// Google Fonts sometimes returns extensionless font URLs that break Turbopack
// (vercel/next.js#99114), and local files also make dev/build work offline.
const display = localFont({
  src: "../fonts/SpaceGrotesk-Variable.woff2",
  weight: "300 700",
  variable: "--font-space",
  display: "swap",
});

const mono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  variable: "--font-jet",
  display: "swap",
});

const description = `${profile.role}. ${profile.intro}`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Portfolio 2026`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | Portfolio 2026`,
    description,
    url: "/",
    siteName: `${profile.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Portfolio 2026`,
    description,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e8e5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

// Runs before paint: applies the saved theme (light by default) and skips the loader
// for returning visitors / reduced motion, so neither causes a flash.
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("theme");d.dataset.theme=t==="dark"?"dark":"light";if(sessionStorage.getItem("loader-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.loader="skip"}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Frame>{children}</Frame>
      </body>
    </html>
  );
}
