"use client";

import React, { useState } from "react";
import { Calculator, Clock, FileCheck2, ArrowRight, ShieldCheck, MapPin, Check } from "lucide-react";

interface ProjectCalculatorProps {
  onOpenConsultation: (serviceTitle: string) => void;
}

export default function ProjectCalculator({ onOpenConsultation }: ProjectCalculatorProps) {
  const [serviceType, setServiceType] = useState("ppt");
  const [scale, setScale] = useState("medium");
  const [urgency, setUrgency] = useState("standard");
  const [cadastralNum, setCadastralNum] = useState("");

  const serviceOptions: Record<string, {
    title: string;
    scales: { id: string; label: string; duration: string; priceText: string }[];
    deliverables: string[];
    normative: string;
  }> = {
    ppt: {
      title: "Документация по планировке территории (ППТ и ПМТ)",
      scales: [
        { id: "small", label: "До 5 га (локальный квартал)", duration: "45–60 раб. дней", priceText: "по смете СБЦП" },
        { id: "medium", label: "5 – 25 га (микрорайон)", duration: "60–90 раб. дней", priceText: "индивидуальный расчет" },
        { id: "large", label: "Свыше 25 га (территория КРТ)", duration: "90–120 раб. дней", priceText: "по ТЗ заказчика" },
      ],
      deliverables: [
        "Чертеж красных линий и зон размещения ОКС (DWG/PDF)",
        "Проект межевания с каталогом координат поворотных точек",
        "Том материалов по обоснованию с расчетом соцкультбыта",
        "Сопровождение в Минграде до выпуска распоряжения"
      ],
      normative: "Статьи 41–46 Градостроительного кодекса РФ"
    },
    linear: {
      title: "Проект планировки линейного объекта",
      scales: [
        { id: "small", label: "До 3 км (внутрипоселковые сети)", duration: "35–50 раб. дней", priceText: "по смете СБЦП" },
        { id: "medium", label: "3 – 10 км (межпоселковый газопровод, ЛЭП)", duration: "50–75 раб. дней", priceText: "индивидуальный расчет" },
        { id: "large", label: "Свыше 10 км (магистральные трассы)", duration: "75–110 раб. дней", priceText: "по ТЗ заказчика" },
      ],
      deliverables: [
        "Границы полосы отвода с каталогами координат в МСК-52",
        "Схемы пересечения с коммуникациями, дорогами и лесным фондом",
        "Обоснование установления публичных сервитутов",
        "Согласования с балансодержателями сетей и ведомствами"
      ],
      normative: "Постановление Правительства РФ № 564, ст. 45 ГрК РФ"
    },
    pzz: {
      title: "Правила землепользования и застройки (ПЗЗ)",
      scales: [
        { id: "small", label: "Внесение точечных изменений в регламент", duration: "30–45 раб. дней", priceText: "по смете СБЦП" },
        { id: "medium", label: "Один населенный пункт / сельсовет", duration: "45–60 раб. дней", priceText: "индивидуальный расчет" },
        { id: "large", label: "Весь муниципальный округ целиком", duration: "60–90 раб. дней", priceText: "по ТЗ заказчика" },
      ],
      deliverables: [
        "Карта градостроительного зонирования в ГИС",
        "Градостроительные регламенты по видам разрешенного использования",
        "Карта зон с особыми условиями использования (ЗОУИТ)",
        "XML-схемы территориальных зон для передачи в Росреестр"
      ],
      normative: "Статьи 30–35 Градостроительного кодекса РФ"
    },
    genplan: {
      title: "Генеральный план поселения / городского округа",
      scales: [
        { id: "small", label: "Сельское поселение (до 5 тыс. чел.)", duration: "60–90 раб. дней", priceText: "по смете СБЦП" },
        { id: "medium", label: "Муниципальный округ (до 30 тыс. чел.)", duration: "90–120 раб. дней", priceText: "индивидуальный расчет" },
        { id: "large", label: "Городской округ / агломерация", duration: "120–180 раб. дней", priceText: "по ТЗ заказчика" },
      ],
      deliverables: [
        "Положение о территориальном планировании",
        "Карта функциональных зон и планируемых объектов",
        "Карта границ населенных пунктов в МСК-52",
        "Загрузка и сопровождение согласований во ФГИС ТП"
      ],
      normative: "Статьи 23–25 Градостроительного кодекса РФ"
    },
    mngp: {
      title: "Нормативы градостроительного проектирования (МНГП)",
      scales: [
        { id: "small", label: "Актуализация действующих показателей", duration: "25–35 раб. дней", priceText: "по смете СБЦП" },
        { id: "medium", label: "Разработка полного пакета МНГП округа", duration: "45–60 раб. дней", priceText: "индивидуальный расчет" },
        { id: "large", label: "МНГП с математической моделью доступности", duration: "60–80 раб. дней", priceText: "по ТЗ заказчика" },
      ],
      deliverables: [
        "Свод расчетных показателей минимальной обеспеченности",
        "Методические материалы по обоснованию расчетов",
        "Правила применения нормативов при подготовке ППТ и ПЗЗ",
        "Регистрация нормативов во ФГИС ТП Минэкономразвития РФ"
      ],
      normative: "Статьи 29.1–29.4 Градостроительного кодекса РФ"
    }
  };

  const currentConfig = serviceOptions[serviceType] || serviceOptions.ppt;
  const currentScale = currentConfig.scales.find(s => s.id === scale) || currentConfig.scales[0];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Decorative blueprint grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Calculator className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Интерактивный расчет параметров градостроительного проекта
              </h3>
              <p className="text-xs text-slate-400">
                Калькулятор ориентировочных сроков, состава работ и согласований по методикам Минстроя РФ
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Методика СБЦП-2024
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                1. Выберите тип градостроительной задачи:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(serviceOptions).map(([key, opt]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setServiceType(key);
                      setScale("medium");
                    }}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                      serviceType === key
                        ? "bg-orange-600 text-white border-orange-500 shadow-md"
                        : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="font-semibold mb-0.5">{opt.title}</div>
                    <div className={`text-[11px] truncate ${serviceType === key ? "text-orange-100" : "text-slate-400"}`}>
                      {opt.normative}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                2. Масштаб территории или объекта:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentConfig.scales.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScale(s.id)}
                    className={`p-3 rounded-xl border text-xs text-center transition-all ${
                      scale === s.id
                        ? "bg-white text-slate-900 border-white font-bold shadow-md"
                        : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div>{s.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Кадастровый номер или район
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Например: 52:24:... или Кстово"
                    value={cadastralNum}
                    onChange={(e) => setCadastralNum(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Режим согласования
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="standard">Стандартный регламентный срок</option>
                  <option value="priority">Приоритетное ускоренное проектирование</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-slate-800/90 rounded-xl p-5 border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
                Расчетные параметры проекта
              </div>
              <h4 className="text-base font-bold text-white mb-4 leading-snug">
                {currentConfig.title}
              </h4>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>Срок разработки</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {currentScale.duration}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Статус допуска</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-400">
                    СРО № П-175
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-2 font-medium">
                Состав передаваемых материалов заказчику:
              </div>
              <ul className="space-y-1.5 mb-6 text-xs text-slate-300">
                {currentConfig.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onOpenConsultation(`${currentConfig.title} (${currentScale.label})`)}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Заказать официальный расчет и смету</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Бесплатная консультация главного инженера проекта в день обращения
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
