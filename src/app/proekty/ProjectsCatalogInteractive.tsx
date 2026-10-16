"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FolderKanban,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Filter
} from "lucide-react";

interface ProjectsCatalogInteractiveProps {
  projects: any[];
}

export default function ProjectsCatalogInteractive({ projects }: ProjectsCatalogInteractiveProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Все категории" },
    { id: "Комплексное развитие", label: "КРТ и жилая застройка" },
    { id: "Линейные", label: "Линейные и логистика" },
    { id: "Генеральные", label: "Генпланы и ПЗЗ" },
    { id: "Мастер-планы", label: "Общественные пространства" },
    { id: "Землеустройство", label: "Межевание и ОЭЗ" },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.category.includes(selectedCategory);

      const matchStatus =
        selectedStatus === "all" || p.status === selectedStatus;

      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchStatus && matchSearch;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-xs font-semibold w-full md:w-auto">
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
              placeholder="Поиск по названию или району..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Status switch */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold">Статус проекта:</span>
          <button
            type="button"
            onClick={() => setSelectedStatus("all")}
            className={`px-2.5 py-1 rounded-lg ${
              selectedStatus === "all" ? "bg-orange-100 text-orange-800 font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Все
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("Утвержден")}
            className={`px-2.5 py-1 rounded-lg ${
              selectedStatus === "Утвержден" ? "bg-emerald-100 text-emerald-800 font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Утвержден
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("В работе")}
            className={`px-2.5 py-1 rounded-lg ${
              selectedStatus === "В работе" ? "bg-amber-100 text-amber-800 font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            В работе
          </button>
          <span className="ml-auto text-slate-400 text-[11px]">
            Найдено: <strong>{filteredProjects.length}</strong>
          </span>
        </div>
      </div>

      {/* Projects Grid */}
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
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded border border-orange-100">
                    {project.year} год
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      project.status === "Утвержден"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
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

                {tepData && (
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px] mb-2">
                    <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                      Технико-экономические показатели:
                    </div>
                    {Object.entries(tepData).slice(0, 3).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center text-slate-600">
                        <span className="text-slate-400">{key}:</span>
                        <span className="font-semibold text-slate-800">{String(val)}</span>
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
                  <span>Подробнее о проекте</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-400">{project.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
