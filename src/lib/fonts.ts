import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";

export const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
export const serif = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
});
