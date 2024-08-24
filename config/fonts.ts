import {
  Fira_Code as FontMono,
  Inter as FontSans,
  DM_Sans,
  Source_Code_Pro,
  Poppins,
} from "next/font/google";

export const bold = DM_Sans({
  weight: ["400", "700", "800", "900"],
  preload: false,
});

export const IP = Poppins({
  weight: ["400", "700", "800", "900"],
  preload: false,
});

export const code = Source_Code_Pro({
  weight: ["400", "700", "800"],
  preload: false,
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: false,
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  preload: false,
});
