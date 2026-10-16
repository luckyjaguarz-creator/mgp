"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Compass,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Send
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

interface NavItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
  badge?: string;
  items?: { title: string; href: string }[];
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navLinks: NavItem[] = [
    { title: "Главная", href: "/" },
    {
      title: "Услуги",
      href: "/uslugi",
      hasDropdown: true,
      items: [
        { title: "Документация по планировке территории (ППТ и ПМТ)", href: "/uslugi/dokumentaciya-po-planirovke-territorii" },
        { title: "Проект планировки линейного объекта", href: "/uslugi/proekt-planirovki-linejnogo-obekta" },
        { title: "Проект межевания территории (ПМТ)", href: "/uslugi/proekt-mezhevaniya-territorii" },
        { title: "Генеральный план родовых поместий (1-2 га)", href: "/uslugi/generalnyj-plan-rodovyh-pomestij" },
        { title: "Генеральный план муниципального образования", href: "/uslugi/generalnyj-plan" },
        { title: "Нормативы градостроительного проектирования (МНГП)", href: "/uslugi/normativy-gradostroitelnogo-proektirovaniya" },
        { title: "Правила землепользования и застройки (ПЗЗ)", href: "/uslugi/pravila-zemlepolzovaniya-i-zastrojki" },
        { title: "Программа коммунальной инфраструктуры (ПКР КИ)", href: "/uslugi/programma-razvitiya-kommunalnoj-infrastruktury" },
        { title: "Программа социальной инфраструктуры (ПКР СИ)", href: "/uslugi/programma-razvitiya-socialnoj-infrastruktury" },
      ]
    },
    { title: "О компании", href: "/o-kompanii" },
    { title: "Проекты", href: "/proekty" },
    { title: "Полезные ресурсы", href: "/poleznye-resursy" },
    { title: "Контакты", href: "/kontakty" },
  ];

  return (
    <>
      {/* Top info bar */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>г. Нижний Новгород, ул. Ванеева, д. 34, офис 406</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Пн–Пт 08:30 – 17:30</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Член СРО Проектировщиков • 30+ лет опыта</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <a
                href="tel:+79023082433"
                className="hover:text-orange-400 transition-colors font-medium flex items-center gap-1 text-slate-200"
              >
                <Phone className="w-3 h-3 text-orange-500" />
                +7 902 308-24-33
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="tel:+79503513498"
                className="hover:text-orange-400 transition-colors font-medium text-slate-200"
              >
                +7 950 351-34-98
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="tel:+79503513487"
                className="hover:text-orange-400 transition-colors font-medium text-slate-200"
              >
                +7 950 351-34-87
              </a>
            </div>
            <a
              href="mailto:info@mgp.ooo"
              className="hover:text-orange-400 transition-colors flex items-center gap-1 text-slate-300"
            >
              <Mail className="w-3 h-3 text-orange-500" />
              info@mgp.ooo
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md border border-slate-800 group-hover:bg-orange-600 transition-colors duration-200">
                <Compass className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                    ООО «МГП»
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">
                    mgp.ooo
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-700 tracking-tight">
                  Мастерская генеральных планов
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:block">
                  Градостроительное проектирование с 1993 года
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.title}
                      className="relative"
                      onMouseEnter={() => setServicesDropdown(true)}
                      onMouseLeave={() => setServicesDropdown(false)}
                    >
                      <Link
                        href={link.href}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                          isActive
                            ? "text-orange-600 bg-orange-50"
                            : "text-slate-700 hover:text-orange-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{link.title}</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </Link>

                      {/* Dropdown Menu */}
                      {servicesDropdown && (
                        <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 py-3 z-50 animate-fadeIn">
                          <div className="px-3 pb-2 mb-1 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Все градостроительные услуги
                          </div>
                          {link.items?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setServicesDropdown(false)}
                              className="block px-3 py-2 text-xs font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50/60 rounded-lg transition-colors leading-tight"
                            >
                              {item.title}
                            </Link>
                          ))}
                          <div className="pt-2 mt-2 border-t border-slate-100 px-3">
                            <Link
                              href="/uslugi"
                              onClick={() => setServicesDropdown(false)}
                              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center justify-between"
                            >
                              <span>Открыть весь каталог</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative flex items-center gap-1.5 ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-slate-700 hover:text-orange-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.title}</span>
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action */}
            <div className="hidden md:flex items-center gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-orange-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Заказать расчет</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-3 py-2 bg-orange-600 text-white text-xs font-bold rounded-lg md:hidden"
              >
                Расчет
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                aria-label="Меню"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn max-h-[80vh] overflow-y-auto">
            <div className="p-3 bg-slate-50 rounded-xl mb-3 border border-slate-200 text-xs">
              <div className="font-bold text-slate-800 mb-1">ООО «Мастерская генеральных планов»</div>
              <div className="text-slate-500 mb-2">г. Нижний Новгород, ул. Ванеева, д. 34, оф. 406</div>
              <div className="flex flex-col gap-1 font-semibold text-slate-700">
                <a href="tel:+79023082433" className="text-orange-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> +7 902 308-24-33
                </a>
                <a href="tel:+79503513498" className="text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> +7 950 351-34-98
                </a>
              </div>
            </div>

            {navLinks.map((link) => (
              <div key={link.title}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-lg ${
                    pathname === link.href ? "bg-orange-50 text-orange-600" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.title}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 pr-1 py-1 space-y-1">
                    {link.items?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2.5 py-1.5 text-xs text-slate-600 hover:text-orange-600 rounded"
                      >
                        • {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full py-3 bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow text-center"
              >
                Оставить заявку на проектирование
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Consultation Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
