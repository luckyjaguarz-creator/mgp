"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Send,
  FileCheck2
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

interface UslugiCatalogInteractiveProps {
  services: any[];
}

export default function UslugiCatalogInteractive({ services }: UslugiCatalogInteractiveProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState("");

  const categories = [
    { id: "all", label: "Все услуги" },
    { id: "Градостроительное проектирование", label: "Планировка территорий" },
    { id: "Инженерная и транспортная инфраструктура", label: "Линейные объекты" },
    { id: "Землеустройство и кадастр", label: "Межевание" },
    { id: "Стратегическое планирование", label: "Генпланы" },
    { id: "Градостроительное регулирование", label: "ПЗЗ и МНГП" },
    { id: "Инженерное обеспечение", label: "Коммунальная и соц. сфера" },
  ];

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchCat =
        selectedCategory === "all" ||
        s.category.includes(selectedCategory) ||
        (selectedCategory === "Градостроительное регулирование" && (s.slug.includes("pzz") || s.slug.includes("normativy"))) ||
        (selectedCategory === "Инженерное обеспечение" && (s.slug.includes("kommunalnoj") || s.slug.includes("socialnoj")));

      const matchSearch =
        searchQuery === "" ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const handleOrder = (serviceTitle: string) => {
    setModalService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <>
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls: Filter and Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Поиск по услугам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const stages = JSON.parse(service.stages);
            const results = JSON.parse(service.results);

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-orange-500 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                      № 0{service.sortOrder}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      {service.duration}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
                    <Link href={`/uslugi/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 text-xs space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Нормативная база:
                    </div>
                    <div className="text-slate-600 text-[11px] leading-tight">
                      {service.normBase}
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 font-semibold mb-2">
                    Что получает заказчик:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-500 mb-6">
                    {results.slice(0, 2).map((res: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5 line-clamp-2">
                        <span className="text-orange-500 shrink-0 font-bold">•</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleOrder(service.title)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-orange-600 text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Заказать расчет
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={modalService}
      />
    </>
  );
}
