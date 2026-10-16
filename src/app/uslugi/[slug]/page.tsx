import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  FileCheck2,
  Phone,
  HelpCircle,
  Layers,
  ChevronRight,
  Download
} from "lucide-react";
import SingleServiceInteractive from "./SingleServiceInteractive";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [service] = await db.select().from(services).where(eq(services.slug, slug));
  if (!service) {
    return { title: "Услуга не найдена | ООО «МГП»" };
  }

  return {
    title: `${service.title} | ООО «МГП» Нижний Новгород`,
    description: service.shortDescription,
  };
}

export default async function SingleServicePage({ params }: Props) {
  const { slug } = await params;
  const [service] = await db.select().from(services).where(eq(services.slug, slug));

  if (!service) {
    notFound();
  }

  const allServices = await db.select().from(services);
  const otherServices = allServices.filter(s => s.slug !== slug).slice(0, 4);

  const stages: { step: number; title: string; text: string }[] = JSON.parse(service.stages);
  const results: string[] = JSON.parse(service.results);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header for Service */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/uslugi" className="hover:text-white transition-colors">Каталог услуг</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium truncate max-w-sm">{service.shortTitle || service.title}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{service.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {service.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
            {service.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Регламентный срок: <strong>{service.duration}</strong></span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Допуск СРО: <strong>№ П-175</strong></span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Согласование: <strong>ГИСОГД и ФГИС ТП</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Left Column: Description, Stages, Deliverables */}
          <div className="lg:col-span-8 space-y-10">
            {/* Normative legal foundation box */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
                <FileCheck2 className="w-4 h-4" />
                <span>Нормативно-правовая база</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Законодательное обоснование и регламенты
              </h2>
              <div className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-xl text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mb-4">
                {service.normBase}
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Step-by-step Execution Stages */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
                <Layers className="w-4 h-4" />
                <span>Регламент выполнения</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Пошаговые этапы разработки и согласования проекта
              </h2>

              <div className="space-y-6">
                {stages.map((stage) => (
                  <div key={stage.step} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-xl bg-orange-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-md">
                      0{stage.step}
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-sm font-bold text-slate-900">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {stage.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Deliverables */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Результат для заказчика</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Что входит в комплект передаваемой документации:
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((res, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other related services */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                Другие градостроительные услуги мастерской:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherServices.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/uslugi/${other.slug}`}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200/80 hover:border-orange-400 transition-all text-xs flex items-center justify-between group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-orange-600">
                      {other.shortTitle || other.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Order Form */}
          <div className="lg:col-span-4 sticky top-24">
            <SingleServiceInteractive serviceTitle={service.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
