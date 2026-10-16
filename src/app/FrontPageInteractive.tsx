"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Building2,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Compass,
  FileCheck2,
  Search,
  Filter
} from "lucide-react";
import PartnerLogo from "@/components/PartnerLogo";
import ProjectCalculator from "@/components/ProjectCalculator";
import ConsultationModal from "@/components/ConsultationModal";
import YandexMap from "@/components/YandexMap";

interface FrontPageInteractiveProps {
  services: any[];
  projects: any[];
  partners: any[];
  links: any[];
}

export default function FrontPageInteractive({
  services,
  projects,
  partners,
  links
}: FrontPageInteractiveProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState("Документация по планировке территории (ППТ и ПМТ)");

  // Projects filter state
  const [projectCategory, setProjectCategory] = useState("all");

  // Partners filter state
  const [partnerCategory, setPartnerCategory] = useState("all");
  const [partnerSearch, setPartnerSearch] = useState("");

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForModal(serviceName);
    }
    setModalOpen(true);
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (projectCategory === "all") return projects.slice(0, 6);
    return projects.filter(p => p.category.includes(projectCategory)).slice(0, 6);
  }, [projects, projectCategory]);

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchCat = partnerCategory === "all" || p.category === partnerCategory;
      const matchSearch = partnerSearch === "" || p.name.toLowerCase().includes(partnerSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [partners, partnerCategory, partnerSearch]);

  const municipalityCount = partners.filter(p => p.category === "Муниципальные образования").length;
  const businessCount = partners.filter(p => p.category === "Бизнес-партнеры").length;

  return (
    <>
      {/* SECTION: CALCULATOR */}
      <section className="py-16 md:py-20 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-500/30">
              Экспресс-оценка параметров
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2">
              Калькулятор сроков и состава проектирования
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Выберите тип объекта и ориентировочный масштаб, чтобы узнать регламентные сроки разработки, состав обязательных разделов и этапы согласования.
            </p>
          </div>

          <ProjectCalculator onOpenConsultation={handleOpenConsultation} />
        </div>
      </section>

      {/* SECTION: PROJECTS CHRONICLE PREVIEW */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
                Хроника проектов 2023–2024
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Реализованные генеральные планы и ППТ
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                От проектов комплексного развития территорий (Балахна, Новинки) до масштабных логистических хабов (ТЛЦ Шава) и исторических поселений (Арзамас).
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setProjectCategory("all")}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  projectCategory === "all"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Все проекты
              </button>
              <button
                type="button"
                onClick={() => setProjectCategory("КРТ")}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  projectCategory === "КРТ"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Комплексное развитие (КРТ)
              </button>
              <button
                type="button"
                onClick={() => setProjectCategory("Линейные")}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  projectCategory === "Линейные"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Линейные объекты
              </button>
              <button
                type="button"
                onClick={() => setProjectCategory("Генеральные")}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  projectCategory === "Генеральные"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Генпланы и ПЗЗ
              </button>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const tepData = project.tep ? JSON.parse(project.tep) : null;

              return (
                <div
                  key={project.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                        {project.year} год
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          project.status === "Утвержден"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                      <Link href={`/proekty/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {project.excerpt}
                    </p>

                    {/* TEP Preview */}
                    {tepData && (
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px]">
                        {Object.entries(tepData).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-slate-600">
                            <span className="text-slate-400">{key}:</span>
                            <span className="font-semibold text-slate-800">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <Link
                      href={`/proekty/${project.slug}`}
                      className="text-orange-600 hover:text-orange-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Паспорт проекта</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-slate-400">{project.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/proekty"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-slate-300 shadow-sm"
            >
              <span>Смотреть все 12 проектов и архив выполненных работ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: 30+ YEARS EXPERIENCE & TEAM */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Опыт и методология
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                30+ лет лидерства в градостроительстве Нижегородской области
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                ООО «Мастерская генеральных планов» (ООО «МГП») непрерывно работает на рынке градостроительства с 1993 года. За три десятилетия мы сформировали сильную мультидисциплинарную команду, способную решать градостроительные задачи любого уровня сложности.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                    <Users className="w-4 h-4 text-orange-600" />
                    Мультидисциплинарный состав
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Главные архитекторы, градостроители, кадастровые инженеры, ГИС-аналитики, гидротехники, экологи и юристы по земельному праву.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Допуски СРО и НОПРИЗ
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Член СРО «Волжский смотр» (свидетельство № П-175). Руководители проектов включены в Национальный реестр специалистов.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                    <Layers className="w-4 h-4 text-blue-600" />
                    ГИС и современные технологии
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Работа в MapInfo, QGIS, AutoCAD, Civil 3D. Подготовка валидных XML-документов для Росреестра и ГИСОГД.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                    Согласования «под ключ»
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Сопровождение публичных слушаний, общественных обсуждений, согласований в Минграде, Минэкономразвития РФ и ведомствах.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/o-kompanii"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 group"
                >
                  <span>Узнать больше об истории, лицензиях и структуре мастерской</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Visual presentation box */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Стандарты градостроительного института
                  </div>
                  <span className="text-[11px] text-slate-400">г. Нижний Новгород</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">
                        Аудит исходной градостроительной ситуации
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Проверка ограничений по зонам охраны объектов культурного наследия (ОКН), санитарно-защитным зонам (СЗЗ), лесному фонду и водному кодексу до начала проектирования.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">
                        Точная картографическая привязка в МСК-52
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Формирование геодезических координат поворотных точек в официальных системах координат с исключением наложений на смежные участки.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">
                        Защита проекта на градостроительном совете
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Презентация и профессиональная защита проектных решений перед экспертным сообществом, Министерством градостроительной деятельности и органами местного самоуправления.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-300">Нужен совет главного инженера?</div>
                    <div className="text-xs text-slate-400">Обсудите проект по прямой линии</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenConsultation("Консультация с ГАП / ГИП")}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Связаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PARTNERS (41 PARTNERS) */}
      <section className="py-16 md:py-24 bg-slate-50" id="partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
              География сотрудничества
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-3">
              Муниципальные образования и деловые партнеры
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Мастерская генеральных планов сотрудничает с более чем 25 районными и городскими администрациями Нижегородской области, ведущими энергетическими, промышленными и девелоперскими корпорациями РФ.
            </p>
          </div>

          {/* Partner Controls: Category filter & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPartnerCategory("all")}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  partnerCategory === "all"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Все партнеры ({partners.length})
              </button>
              <button
                type="button"
                onClick={() => setPartnerCategory("Муниципальные образования")}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  partnerCategory === "Муниципальные образования"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Муниципальные образования ({municipalityCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setPartnerCategory("Бизнес-партнеры")}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  partnerCategory === "Бизнес-партнеры"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Бизнес и корпорации ({businessCount})</span>
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={partnerSearch}
                onChange={(e) => setPartnerSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Grid of Partners */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredPartners.map((partner) => (
              <PartnerLogo
                key={partner.id}
                name={partner.name}
                logoFile={partner.logoFile}
                category={partner.category}
              />
            ))}
          </div>

          <div className="mt-8 p-4 bg-orange-50/60 rounded-xl border border-orange-200/80 text-xs text-orange-950 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-orange-600 shrink-0" />
              <span>
                Все 41 логотип партнеров и районов интегрированы с поддержкой оригинальных графических файлов в папке <code>/public/partners/</code>.
              </span>
            </div>
            <Link
              href="/o-kompanii"
              className="font-bold text-orange-700 hover:text-orange-900 whitespace-nowrap text-xs"
            >
              Отзывы заказчиков →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: USEFUL RESOURCES & GEOPORTALS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
                База знаний и ссылки
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Реестр полезных сервисов и геопорталов
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Прямой доступ к государственным информационным системам территориального планирования, кадастровым картам и геодезическим конвертерам координат.
              </p>
            </div>

            <Link
              href="/poleznye-resursy"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 shrink-0"
            >
              <span>Открыть полный реестр геопорталов</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-orange-400 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
                  >
                    <span>Перейти на геопортал</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: INTERACTIVE YANDEX MAP & FAST CONTACT FORM */}
      <section className="py-16 md:py-24 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Office coordinates & Yandex Map */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
                  Интерактивная карта
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-1">
                  Офис ООО «МГП» в Нижнем Новгороде
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  ул. Ванеева, д. 34, 4 этаж, офис 406 (остановка «Улица Панина»)
                </p>
              </div>

              {/* Yandex Map component */}
              <YandexMap heightClass="h-[380px] sm:h-[420px]" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-500 mb-1">Телефон 1</div>
                  <a href="tel:+79023082433" className="font-bold text-slate-900 hover:text-orange-600">
                    +7 (902) 308-24-33
                  </a>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-500 mb-1">Телефон 2</div>
                  <a href="tel:+79503513498" className="font-bold text-slate-900 hover:text-orange-600">
                    +7 (950) 351-34-98
                  </a>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-500 mb-1">Телефон 3</div>
                  <a href="tel:+79503513487" className="font-bold text-slate-900 hover:text-orange-600">
                    +7 (950) 351-34-87
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Quick Consultation Form */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Обратная связь
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Задайте вопрос ГАПу / ГИПу
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Оставьте контакты и кадастровый номер для первичного градостроительного заключения
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenConsultation()}
                className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mb-4"
              >
                <span>Заполнить форму расчета проекта</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>Режим приема в проектной мастерской</span>
                </div>
                <p>
                  Понедельник — Пятница: с 08:30 до 17:30 (без перерыва). Суббота и воскресенье — выходные дни.
                </p>
                <p className="pt-1 border-t border-slate-200/80 text-[11px] text-slate-500">
                  Для посещения офиса рекомендуется предварительно согласовать время визита с главным инженером проекта.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedServiceForModal}
      />
    </>
  );
}
