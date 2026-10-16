"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Search,
  Filter,
  Layers,
  Database,
  Globe,
  Compass,
  FileText,
  Calculator,
  ArrowRight
} from "lucide-react";

interface UsefulLinksInteractiveProps {
  links: any[];
}

export default function UsefulLinksInteractive({ links }: UsefulLinksInteractiveProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Все ресурсы" },
    { id: "Государственные системы", label: "Государственные системы (ФГИС/ГИСОГД)" },
    { id: "Кадастровые карты", label: "Кадастровые карты и геопорталы" },
    { id: "Инструменты инженера", label: "Инструменты инженера и конвертеры" },
    { id: "Нормативно-правовая база", label: "Нормативно-правовая база" },
  ];

  const filteredLinks = useMemo(() => {
    return links.filter((l) => {
      const matchCat = selectedCategory === "all" || l.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.badge && l.badge.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [links, selectedCategory, searchQuery]);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search and Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Поиск по реестру..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Grid of Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredLinks.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  {item.category}
                </span>
                {item.badge && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                    {item.badge}
                  </span>
                )}
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
                {item.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {item.isExternal ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Открыть сервис</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href={item.url}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Перейти</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[140px]">
                {item.url.replace(/^https?:\/\//, "")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Engineer Knowledge Box: Coordinate Systems info */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
          <Calculator className="w-4 h-4" />
          <span>Справка инженера-градостроителя</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          Местная система координат Нижегородской области (МСК-52)
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl mb-4">
          Вся проектная и градостроительная документация на территории Нижегородской области подлежит обязательному выполнению в системе координат <strong>МСК-52 (Зона 1 или Зона 2)</strong>, основанной на эллипсоиде Красовского (СК-95 / СК-42). При сопоставлении с публичными картами (Яндекс, Google, OSM) требуется трансформация в WGS-84 (EPSG:4326 / EPSG:3857) с применением 7 параметров датума ГОСТ 32453-2017.
        </p>
        <div className="text-xs text-slate-400">
          Специалисты ООО «МГП» обеспечивают строгий геометрический контроль и проверку отсутствия координатных смещений при загрузке слоев во ФГИС ТП и ГИСОГД.
        </div>
      </div>
    </section>
  );
}
