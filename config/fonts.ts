import {
  Fira_Code as FontMono,
  Inter as FontSans,
  DM_Sans,
  Source_Code_Pro,
  Poppins,
} from "next/font/google";

export const bold = DM_Sans({
  weight: ["400", "700", "800", "900"],
});

export const IP = Poppins({
  weight: ["400", "700", "800", "900"],
});

export const code = Source_Code_Pro({
  weight: ["400", "700", "800"],
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
