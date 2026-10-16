import React from "react";
import Link from "next/link";
import {
  Compass,
  Award,
  ShieldCheck,
  Users,
  Layers,
  CheckCircle2,
  Calendar,
  Building2,
  FileCheck2,
  Phone,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export const metadata = {
  title: "О компании | ООО «Мастерская генеральных планов» (МГП)",
  description: "30+ лет опыта градостроительного проектирования в Нижегородской области и РФ. Комплексный подход, членство в СРО, мультидисциплинарная команда архитекторов и инженеров.",
};

export default function AboutPage() {
  const milestones = [
    { year: "1993", title: "Основание проектного бюро", desc: "Формирование инициативной группы градостроителей и архитекторов Нижегородской области в период становления нового земельного законодательства РФ." },
    { year: "2004", title: "Внедрение ГИС-технологий", desc: "Переход на сквозное цифровое картографирование в MapInfo и AutoCAD, разработка первых комплексных схем территориального планирования районов." },
    { year: "2009", title: "Регистрация ООО «МГП»", desc: "Официальное учреждение юридического лица ООО «Мастерская генеральных планов», вступление в СРО проектировщиков и расширение портфеля коммерческих заказов." },
    { year: "2018", title: "Федеральная интеграция во ФГИС ТП", desc: "100% переход на требования Приказа Минэкономразвития РФ № 10, успешное прохождение федеральных экспертиз генеральных планов." },
    { year: "2024", title: "Лидерство в проектах КРТ", desc: "Разработка проектов комплексного развития территорий (Балахна, Новинки), крупных транспортно-логистических узлов (ТЛЦ Шава) и мастер-планов туристских кластеров." },
  ];

  const teamDisciplines = [
    { title: "Главные инженеры и архитекторы проектов (ГИП / ГАП)", count: "6 ведущих специалистов", desc: "Члены Национального реестра специалистов (НОПРИЗ) со стажем более 20 лет." },
    { title: "Градостроители и инженеры генплана", count: "8 проектировщиков", desc: "Разработка функционального зонирования, балансов территорий, расчет нормативных показателей." },
    { title: "ГИС-аналитики и картографы", count: "5 специалистов", desc: "Формирование векторных слоев MapInfo, QGIS, пространственный анализ ЗОУИТ и ограничений." },
    { title: "Кадастровые инженеры и геодезисты", count: "4 специалиста", desc: "Проекты межевания, формирование XML-схем для ЕГРН, увязка с данными Росреестра." },
    { title: "Инженеры транспортной и инженерной инфраструктуры", count: "5 инженеров", desc: "Трассирование магистральных сетей, ПКР коммунальной и социальной инфраструктуры." },
    { title: "Юристы в сфере градостроительного и земельного права", count: "3 эксперта", desc: "Правовое сопровождение публичных слушаний, снятие разногласий с органами государственной власти." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">О компании</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>История мастерской и стандарты качества</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight max-w-4xl">
            ООО «Мастерская генеральных планов»: градостроительный опыт трех десятилетий
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Мы объединяем фундаментальные традиции отечественной градостроительной школы и передовые геоинформационные технологии, создавая документы пространственного развития, которые определяют облик городов и районов на десятилетия вперед.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-white">30+ лет</div>
              <div className="text-xs text-slate-400">непрерывной практики</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-orange-400">540+</div>
              <div className="text-xs text-slate-400">утвержденных проектов</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-emerald-400">№ П-175</div>
              <div className="text-xs text-slate-400">свидетельство СРО</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-xs text-slate-400">согласований во ФГИС ТП</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Principles */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Наш подход
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Ключевые принципы градостроительного проектирования
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Каждый наш проект базируется на трех неразрывных составляющих: юридическая безупречность, инженерная обоснованность и экономическая реализуемость.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-orange-500 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 border border-orange-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Юридическая чистота
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Строгое соблюдение Градостроительного кодекса РФ, Земельного кодекса РФ, Водного и Лесного кодексов. Исключение наложений на зоны с особыми условиями использования территорий (ЗОУИТ) и реестровых ошибок.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-orange-500 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-200">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Комплексность изысканий
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Глубокий анализ транспортных потоков, резервов мощностей коммунальных сетей, баланса зеленых зон и доступности объектов образования и здравоохранения по местным нормативам градостроительного проектирования.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:border-orange-500 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Сопровождение до утверждения
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Мы не бросаем проект после сдачи чертежей. Специалисты мастерской лично представляют документацию на градостроительных советах, защищают на общественных обсуждениях и курируют согласование в Минграде.
            </p>
          </div>
        </div>
      </section>

      {/* Multidisciplinary Team */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Кадровый потенциал
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Мультидисциплинарный состав специалистов
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Специфика градостроительства требует одновременной работы специалистов из различных отраслей знаний. В структуре мастерской функционируют специализированные отделы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamDisciplines.map((team, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
              >
                <div className="text-xs font-bold text-orange-600 mb-1">{team.count}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                  {team.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {team.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Хроника развития
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            30 лет в истории градостроительства
          </h2>
        </div>

        <div className="relative border-l-2 border-orange-400 ml-4 md:ml-32 space-y-8 pl-6 md:pl-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-orange-600 group-hover:scale-125 transition-transform"></div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs max-w-2xl">
                <span className="text-xs font-black text-orange-600 uppercase tracking-wider">
                  {m.year} год
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5 mb-1">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SRO & Licenses Banner */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Официальный допуск к проектным работам</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Член Ассоциации проектировщиков «Волжский смотр» (№ П-175)
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              ООО «МГП» имеет право на подготовку проектной и градостроительной документации в отношении особо опасных, технически сложных и уникальных объектов капитального строительства.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/kontakty"
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow"
            >
              Связаться с руководством
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
