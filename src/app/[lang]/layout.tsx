import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LOCALES, SITE_NAME, isLang, t } from "@/lib/content";
import { SITE_URL, alternates } from "@/lib/paths";
import "../globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
});

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#0B1D26", colorScheme: "dark", viewportFit: "cover" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = t(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s – ${SITE_NAME}` },
    description: d.footer.tag,
    alternates: alternates(lang),
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      images: [{ url: "/img/offshore.jpg", width: 1122, height: 732 }],
    },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#main">
          {lang === "vi" ? "Bỏ qua đến nội dung" : "Skip to content"}
        </a>
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
