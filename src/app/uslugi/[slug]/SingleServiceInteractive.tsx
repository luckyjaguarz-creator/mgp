"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, FileUp, Phone, Lock, ShieldCheck } from "lucide-react";

interface SingleServiceInteractiveProps {
  serviceTitle: string;
}

export default function SingleServiceInteractive({ serviceTitle }: SingleServiceInteractiveProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cadastralNumber: "",
    message: "",
    agree152: true
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Укажите контактное лицо и телефон");
      return;
    }

    if (!formData.agree152) {
      setErrorMsg("Необходимо согласие на обработку персональных данных");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceType: serviceTitle,
          fileName: selectedFileName || null
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка отправки");

      setSubmittedId(data.id);
    } catch (err: any) {
      setErrorMsg(err.message || "Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
          Заявка на расчет
        </span>
        <h3 className="text-base font-bold text-slate-900 mt-2">
          Заказать расчет проекта
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Получите предварительную смету и состав работ от главного инженера проекта
        </p>
      </div>

      {submittedId ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            Заявка № MGP-{submittedId} принята!
          </h4>
          <p className="text-xs text-slate-600 mb-4">
            Мы свяжемся с вами в течение 2 рабочих часов для уточнения параметров объекта.
          </p>
          <button
            onClick={() => setSubmittedId(null)}
            className="text-xs text-orange-600 font-semibold hover:underline"
          >
            Отправить еще одну заявку
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {errorMsg && (
            <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ваше имя / Компания <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Имя или название организации"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Телефон для связи <span className="text-orange-600">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Кадастровый номер или площадь
            </label>
            <input
              type="text"
              placeholder="Например: 52:24:0010001:12 или 15 га"
              value={formData.cadastralNumber}
              onChange={(e) => setFormData({ ...formData, cadastralNumber: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Прикрепить материалы (выписка, ТЗ)
            </label>
            <label className="flex items-center justify-center gap-2 p-2 border border-dashed border-slate-300 hover:border-orange-500 rounded-xl cursor-pointer bg-slate-50 text-[11px] text-slate-600">
              <FileUp className="w-3.5 h-3.5 text-orange-600" />
              <span className="truncate max-w-[200px]">
                {selectedFileName || "Выбрать файл..."}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.dwg,.zip,.rar"
              />
            </label>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 text-[10px] text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agree152}
                onChange={(e) => setFormData({ ...formData, agree152: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-orange-600 shrink-0"
              />
              <span>
                Согласен на обработку персональных данных по 152-ФЗ РФ.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Отправить на расчет</span>
          </button>
        </form>
      )}

      <div className="pt-4 border-t border-slate-100 text-xs space-y-2">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <Phone className="w-3.5 h-3.5 text-orange-600" />
          <span>Прямой телефон проектного отдела:</span>
        </div>
        <a
          href="tel:+79023082433"
          className="block text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
        >
          +7 (902) 308-24-33
        </a>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>СРО «Волжский смотр» № П-175</span>
        </div>
      </div>
    </div>
  );
}
