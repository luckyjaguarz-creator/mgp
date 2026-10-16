import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ООО «МГП» — Мастерская генеральных планов | Градостроительное проектирование в Нижнем Новгороде",
  description: "Комплексное градостроительное проектирование: ППТ, ПМТ, генеральные планы, ПЗЗ, линейные объекты, нормативы МНГП. Член СРО, 30+ лет опыта. Нижний Новгород, ул. Ванеева, 34.",
  keywords: "мастерская генеральных планов, ООО МГП, ппт нижний новгород, пмт, генеральный план, пзз, градостроительное проектирование, мнгп, ванеева 34",
  icons: {
    icon: [
      { url: "/cropped-vs2-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: "/cropped-vs2-32x32.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/cropped-vs2-32x32.png" sizes="32x32" type="image/png" />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
