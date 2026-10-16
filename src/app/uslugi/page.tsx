import React from "react";
import Link from "next/link";
import { db } from "@/db";
import { services } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";
import UslugiCatalogInteractive from "./UslugiCatalogInteractive";

export const metadata = {
  title: "Каталог градостроительных услуг | ООО «МГП» Нижний Новгород",
  description: "Полный перечень градостроительных услуг: ППТ и ПМТ, генеральные планы, ПЗЗ, линейные объекты, нормативы МНГП, программы комплексного развития ПКР КИ и СИ.",
};

export default async function UslugiPage() {
  const allServices = await db.select().from(services).orderBy(asc(services.sortOrder));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-orange-400 font-medium">Услуги</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Единый каталог градостроительных услуг
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Проектирование любой градостроительной документации в соответствии со статьями Градостроительного кодекса РФ, национальными стандартами и региональными нормативами градостроительного проектирования Нижегородской области.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              СРО «Волжский смотр» № П-175
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Сроки разработки от 30 рабочих дней
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              100% сопровождение до утверждения
            </span>
          </div>
        </div>
      </section>

      {/* Catalog & Filter */}
      <UslugiCatalogInteractive services={allServices} />

      {/* FAQ on Urban Planning */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Вопросы и ответы
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Частые вопросы о согласовании градостроительной документации
            </h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                Чем проект планировки территории (ППТ) отличается от проекта межевания (ПМТ)?
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                ППТ определяет общую структуру территории, красные линии, параметры будущих зданий, дорог и инженерных сетей. ПМТ определяет точные границы земельных участков (существующих и образуемых), сервитутов и отступов. Как правило, для комплексного освоения они разрабатываются единым комплектом (ДПТ).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                Кто утверждает градостроительную документацию в Нижегородской области?
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                В Нижегородской области полномочия в сфере градостроительства перераспределены: утверждение генеральных планов, ПЗЗ и документации по планировке территории осуществляется Министерством градостроительной деятельности и развития агломераций Нижегородской области (Минград НО).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                Нужно ли проходить публичные слушания или общественные обсуждения?
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Да, по большинству видов документации (генпланы, ПЗЗ, ППТ) проведение общественных обсуждений или публичных слушаний предусмотрено статьями 5.1 и 28 Градостроительного кодекса РФ. Специалисты ООО «МГП» полностью готовят экспозиционные материалы, презентации и сопровождают защиту на слушаниях.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                В каком формате передается готовая документация?
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Заказчик получает утвержденную документацию на бумажных носителях (сброшюрованные тома со штампами), а также полный электронный комплект: векторные слои в форматах DWG/DXF и GIS (MapInfo TAB, Shapefile), материалы в PDF, а также структурированные XML-схемы для передачи в Росреестр и ФГИС ТП.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
