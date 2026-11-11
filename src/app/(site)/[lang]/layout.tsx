import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { sans, serif } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMG, LOCALES, SITE_NAME, isLang } from "@/lib/content";
import { getSiteData } from "@/lib/site";
import { SITE_URL, alternates } from "@/lib/paths";
import "../../globals.css";

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#102B46", colorScheme: "dark", viewportFit: "cover" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { d } = await getSiteData(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s – ${SITE_NAME}` },
    description: d.footer.tag,
    alternates: alternates(lang),
    icons: { icon: IMG.logo },
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
  const site = await getSiteData(lang);
  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#main">
          {lang === "vi" ? "Bỏ qua đến nội dung" : "Skip to content"}
        </a>
        <Header lang={lang} nav={site.d.nav} />
        <main id="main">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
