import React from "react";
import Link from "next/link";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
  FolderKanban,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import ProjectsCatalogInteractive from "./ProjectsCatalogInteractive";

export const metadata = {
  title: "Хроника градостроительных проектов | ООО «МГП»",
  description: "Портфолио выполненных проектов ООО «Мастерская генеральных планов»: проекты КРТ (Балахна, Новинки), линейные объекты (ТЛЦ Шава), генеральные планы (Арзамас) и ПЗЗ.",
};

export default async function ProjectsPage() {
  const allProjects = await db.select().from(projects).orderBy(asc(projects.sortOrder));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">Проекты</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Хроника проектов и градостроительных решений
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Архив и актуальные работы ООО «Мастерская генеральных планов» за 2023–2024 гг. Комплексное развитие незастроенных территорий, логистические центры, генеральные планы исторических городов и линейные магистрали.
          </p>
        </div>
      </section>

      {/* Interactive Catalog */}
      <ProjectsCatalogInteractive projects={allProjects} />
    </div>
  );
}
