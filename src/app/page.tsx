import React from "react";
import Link from "next/link";
import { db } from "@/db";
import { services, projects, partners, usefulLinks } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import {
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Calculator,
  ExternalLink,
  Users,
  Award,
  Layers,
  FileText,
  Phone,
  Mail,
  FolderKanban,
  FileCheck,
  Cpu
} from "lucide-react";
import PartnerLogo from "@/components/PartnerLogo";
import FrontPageInteractive from "./FrontPageInteractive";

export default async function HomePage() {
  const allServices = await db.select().from(services).orderBy(asc(services.sortOrder));
  const allProjects = await db.select().from(projects).orderBy(asc(projects.sortOrder));
  const allPartners = await db.select().from(partners).orderBy(asc(partners.sortOrder));
  const allLinks = await db.select().from(usefulLinks).orderBy(asc(usefulLinks.sortOrder));

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 md:py-24 border-b border-slate-800">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Ambient glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span>30+ лет в градостроительном проектировании • с 1993 года</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Мастерская генеральных планов:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  точность инженерных решений
                </span>{" "}
                для территорий любого масштаба
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                Разработка проектов планировки и межевания территории (ППТ и ПМТ), генеральных планов, правил землепользования и застройки (ПЗЗ), проектов линейных объектов и нормативов МНГП в строгом соответствии со статьями Градостроительного кодекса РФ.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/uslugi"
                  className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2"
                >
                  <span>Каталог градостроительных услуг</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/proekty"
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-200 font-bold text-sm uppercase tracking-wider rounded-xl transition-all border border-slate-700 flex items-center gap-2"
                >
                  <FolderKanban className="w-4 h-4 text-orange-400" />
                  <span>Хроника проектов</span>
                </Link>
              </div>

              {/* Guarantees row */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Допуск СРО Проектировщиков</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% согласований во ФГИС ТП</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Cpu className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>ГИС и XML-схемы для ЕГРН</span>
                </div>
              </div>
            </div>

            {/* Hero Quick Metrics card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
                <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center justify-between">
                  <span>Факты и ключевые показатели</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/60">
                    <div className="text-3xl font-black text-white mb-0.5">30+</div>
                    <div className="text-xs text-slate-400">лет непрерывной проектной практики</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/60">
                    <div className="text-3xl font-black text-orange-500 mb-0.5">540+</div>
                    <div className="text-xs text-slate-400">утвержденных градостроительных проектов</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/60">
                    <div className="text-3xl font-black text-white mb-0.5">27</div>
                    <div className="text-xs text-slate-400">районов Нижегородской области и РФ</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/60">
                    <div className="text-3xl font-black text-emerald-400 mb-0.5">100%</div>
                    <div className="text-xs text-slate-400">юридическая чистота и сопровождение</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-700/50 text-xs text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">Центральный офис:</span> г. Нижний Новгород, ул. Ванеева, 34
                  </div>
                  <Link href="/kontakty" className="text-orange-400 hover:underline font-semibold shrink-0 ml-2">
                    Контакты →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Комплексные направления работы
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Единый каталог градостроительных услуг
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Выполняем полный комплекс инженерно-градостроительных работ: от сбора исходных данных и концептуального мастер-планирования до утверждения на публичных слушаниях и внесения в государственные реестры ГИСОГД и ФГИС ТП.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => (
              <div
                key={service.slug}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-orange-600 bg-orange-100/70 px-2.5 py-0.5 rounded-md">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {service.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                    <Link href={`/uslugi/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="text-[11px] text-slate-500 bg-white group-hover:bg-orange-50/50 p-2.5 rounded-lg border border-slate-200/80 mb-4 transition-colors">
                    <strong className="text-slate-700">Основание:</strong> {service.normBase}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="text-orange-600 hover:text-orange-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Подробнее об услуге</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-slate-400">ГрК РФ</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow"
            >
              <span>Смотреть подробный каталог услуг с составом работ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SECTION (CALCULATOR, PROJECTS, PARTNERS, MAP) */}
      <FrontPageInteractive
        services={allServices}
        projects={allProjects}
        partners={allPartners}
        links={allLinks}
      />
    </div>
  );
}
