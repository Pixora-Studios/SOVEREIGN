import localFont from "next/font/local";

export const cabinetGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/cabinet-grotesk-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/cabinet-grotesk-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/cabinet-grotesk-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/cabinet-grotesk-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const inter = localFont({
  src: "../../public/fonts/inter-variable.woff2",
  variable: "--font-inter",
  display: "swap",
});
