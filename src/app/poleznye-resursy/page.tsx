import React from "react";
import Link from "next/link";
import { db } from "@/db";
import { usefulLinks } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
  Compass,
  ExternalLink,
  ChevronRight,
  Search,
  Layers,
  Database,
  Globe,
  FileCheck2,
  Cpu
} from "lucide-react";
import UsefulLinksInteractive from "./UsefulLinksInteractive";

export const metadata = {
  title: "Полезные ресурсы и геопорталы | ООО «МГП»",
  description: "Реестр государственных градостроительных систем: ФГИС ТП, ГИСОГД Нижегородской области, Публичная кадастровая карта, конвертеры координат МСК-52.",
};

export default async function UsefulLinksPage() {
  const allLinks = await db.select().from(usefulLinks).orderBy(asc(usefulLinks.sortOrder));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">Полезные ресурсы</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Реестр полезных сервисов и геопорталов
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Официальные государственные информационные системы территориального планирования, публичные кадастровые порталы, картографические сервисы и специализированные инструменты для инженеров-градостроителей.
          </p>
        </div>
      </section>

      {/* Interactive Links Registry */}
      <UsefulLinksInteractive links={allLinks} />
    </div>
  );
}
