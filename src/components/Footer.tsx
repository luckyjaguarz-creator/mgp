"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Download,
  ArrowUp,
  FileCode2
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const copyRequisites = () => {
    const requisites = `ООО «Мастерская генеральных планов» (ООО «МГП»)
ИНН: 5262241908
КПП: 526201001
ОГРН: 1095262006120
Юридический и фактический адрес: 603105, Нижегородская обл., г. Нижний Новгород, ул. Ванеева, д. 34, офис 406
Телефоны: +7 (902) 308-24-33, +7 (950) 351-34-98, +7 (950) 351-34-87
Email: info@mgp.ooo
Сайт: mgp.ooo
СРО: Член Ассоциации проектировщиков «Волжский смотр», рег. номер в реестре членов СРО № П-175`;

    navigator.clipboard.writeText(requisites).then(() => {
      alert("Реквизиты ООО «МГП» скопированы в буфер обмена!");
    });
  };

  return (
    <>
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                  <Compass className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white tracking-tight">
                    ООО «МГП»
                  </div>
                  <div className="text-xs font-semibold text-slate-300">
                    Мастерская генеральных планов
                  </div>
                  <div className="text-[10px] text-orange-400 font-medium">
                    Градостроительное проектирование с 1993 г.
                  </div>
                </div>
              </Link>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Профессиональная разработка генеральных планов, правил землепользования и застройки (ПЗЗ), документации по планировке территории (ППТ и ПМТ), проектов линейных объектов и нормативов градостроительного проектирования в Нижегородской области и регионах РФ.
              </p>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5 max-w-sm">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Член СРО Проектировщиков</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Свидетельство о допуске к работам по подготовке архитектурно-градостроительной документации № П-175. Специалисты включены в Национальный реестр НОПРИЗ.
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={copyRequisites}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-orange-400" />
                  <span>Скопировать реквизиты</span>
                </button>

                <Link
                  href="/wordpress-theme"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-orange-950/60 text-orange-300 hover:text-orange-200 text-xs rounded-lg transition-colors border border-orange-500/30 flex items-center gap-1.5"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>WP тема mgp-theme</span>
                </Link>
              </div>
            </div>

            {/* Services navigation */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
                Градостроительные услуги
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/uslugi/dokumentaciya-po-planirovke-territorii" className="hover:text-orange-400 transition-colors">
                    ППТ и ПМТ территории
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/proekt-planirovki-linejnogo-obekta" className="hover:text-orange-400 transition-colors">
                    Проекты линейных объектов
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/proekt-mezhevaniya-territorii" className="hover:text-orange-400 transition-colors">
                    Проекты межевания (ПМТ)
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/generalnyj-plan-rodovyh-pomestij" className="hover:text-orange-400 transition-colors">
                    Родовые поместья 1-2 га
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/generalnyj-plan" className="hover:text-orange-400 transition-colors">
                    Генеральный план поселения
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/pravila-zemlepolzovaniya-i-zastrojki" className="hover:text-orange-400 transition-colors">
                    ПЗЗ и градзонирование
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/normativy-gradostroitelnogo-proektirovaniya" className="hover:text-orange-400 transition-colors">
                    Нормативы МНГП и РНГП
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/programma-razvitiya-kommunalnoj-infrastruktury" className="hover:text-orange-400 transition-colors">
                    ПКР коммунальной инфр.
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/programma-razvitiya-socialnoj-infrastruktury" className="hover:text-orange-400 transition-colors">
                    ПКР социальной инфр.
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sections & Links */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
                Разделы сайта
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/o-kompanii" className="hover:text-orange-400 transition-colors">
                    О компании (30+ лет опыта)
                  </Link>
                </li>
                <li>
                  <Link href="/proekty" className="hover:text-orange-400 transition-colors">
                    Хроника проектов 2023–2024
                  </Link>
                </li>
                <li>
                  <Link href="/poleznye-resursy" className="hover:text-orange-400 transition-colors">
                    Реестр геопорталов и ФГИС ТП
                  </Link>
                </li>
                <li>
                  <Link href="/kontakty" className="hover:text-orange-400 transition-colors">
                    Контакты и реквизиты
                  </Link>
                </li>
                <li>
                  <Link href="/politika-konfidencialnosti" className="hover:text-orange-400 transition-colors">
                    Политика конфиденциальности (152-ФЗ)
                  </Link>
                </li>
                <li>
                  <Link href="/wordpress-theme" className="hover:text-orange-400 transition-colors text-orange-400 font-semibold">
                    Скачать WordPress тему (ТЗ)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacts & CTA */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
                Контакты офиса
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-snug">
                    603105, г. Нижний Новгород, ул. Ванеева, д. 34, офис 406
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-slate-400">
                    Пн–Пт 08:30 – 17:30 (МСК)
                  </span>
                </div>

                <div className="pt-1 space-y-1 font-semibold text-slate-200">
                  <a href="tel:+79023082433" className="block hover:text-orange-400 transition-colors">
                    +7 (902) 308-24-33
                  </a>
                  <a href="tel:+79503513498" className="block hover:text-orange-400 transition-colors">
                    +7 (950) 351-34-98
                  </a>
                  <a href="tel:+79503513487" className="block hover:text-orange-400 transition-colors">
                    +7 (950) 351-34-87
                  </a>
                </div>

                <a
                  href="mailto:info@mgp.ooo"
                  className="block text-orange-400 hover:text-orange-300 font-medium"
                >
                  info@mgp.ooo
                </a>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="w-full py-2.5 px-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md text-center cursor-pointer"
                  >
                    Заказать консультацию ГИПа
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 1993–2025 ООО «Мастерская генеральных планов» (ООО «МГП»). ОГРН 1095262006120, ИНН 5262241908. Все права защищены.
            </div>

            <div className="flex items-center gap-6">
              <Link href="/politika-konfidencialnosti" className="hover:text-slate-300 underline">
                Согласие на обработку данных (152-ФЗ)
              </Link>
              <button
                type="button"
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                aria-label="Наверх"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
