import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  FolderKanban,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  Layers,
  Send
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
  if (!project) return { title: "Проект не найден | ООО «МГП»" };

  return {
    title: `${project.title} | ООО «МГП» Проекты`,
    description: project.excerpt,
  };
}

export default async function SingleProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug));

  if (!project) notFound();

  const tepData = project.tep ? JSON.parse(project.tep) : {};
  const allProjects = await db.select().from(projects);
  const otherProjects = allProjects.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/proekty" className="hover:text-white transition-colors">Проекты</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium truncate max-w-sm">{project.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold">
              {project.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                project.status === "Утвержден"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              }`}
            >
              {project.status}
            </span>
            <span className="text-xs text-slate-400">
              {project.year} год разработки
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight max-w-4xl">
            {project.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Описание и задачи проекта
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1 mb-4">
                  Градостроительные решения и специфика территории
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {project.excerpt}
                </p>
              </div>

              {/* TEP Table */}
              {Object.keys(tepData).length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-orange-600" />
                    Технико-экономические показатели объекта (ТЭП)
                  </h3>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200 text-xs">
                    {Object.entries(tepData).map(([key, val]) => (
                      <div key={key} className="p-3 sm:px-4 flex justify-between items-center">
                        <span className="font-medium text-slate-600">{key}</span>
                        <span className="font-bold text-slate-900 text-right">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Projects */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Другие проекты мастерской:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherProjects.map((op) => (
                  <Link
                    key={op.slug}
                    href={`/proekty/${op.slug}`}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-400 transition-all text-xs flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-orange-600 mb-1">{op.year} г.</div>
                      <div className="font-bold text-slate-900 group-hover:text-orange-600 line-clamp-2 mb-2">
                        {op.title}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span>Смотреть</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order similar project */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Аналогичные объекты
              </span>
              <h3 className="text-lg font-bold text-white">
                Требуется разработка подобного проекта?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Специалисты ООО «МГП» проведут аудит земельного участка, проверят градостроительные ограничения и подготовят коммерческое предложение со сметой.
              </p>

              <Link
                href="/kontakty"
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-2"
              >
                <span>Обсудить задачу с ГИПом</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-3 border-t border-slate-800 text-xs space-y-1 text-slate-400">
                <div>Прямая линия: <strong>+7 (902) 308-24-33</strong></div>
                <div>Электронная почта: <strong>info@mgp.ooo</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
