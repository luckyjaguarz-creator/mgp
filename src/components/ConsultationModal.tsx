"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, FileUp, AlertCircle, Phone, Lock } from "lucide-react";
import Link from "next/link";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  initialService = "Документация по планировке территории (ППТ и ПМТ)"
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: initialService,
    cadastralNumber: "",
    message: "",
    agree152: true
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Пожалуйста, заполните обязательные поля: имя и контактный телефон.");
      return;
    }

    if (!formData.agree152) {
      setErrorMsg("Необходимо дать согласие на обработку персональных данных (152-ФЗ).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fileName: selectedFileName || null
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ошибка отправки формы");
      }

      setSubmittedId(data.id);
    } catch (err: any) {
      setErrorMsg(err.message || "Не удалось отправить заявку. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      serviceType: initialService,
      cadastralNumber: "",
      message: "",
      agree152: true
    });
    setSelectedFileName("");
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header strip */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              <h3 className="text-lg font-bold">Заявка на проектирование и расчет стоимости</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              ООО «Мастерская генеральных планов» • г. Нижний Новгород
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {submittedId ? (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Заявка № MGP-{submittedId} успешно принята!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Главный инженер проекта (ГИП) ООО «МГП» свяжется с вами по указанному телефону для уточнения деталей, исходных данных и расчета сроков выполнения.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-w-md mx-auto mb-6 text-left">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Прямые телефоны отдела проектирования:
                </div>
                <div className="flex flex-col gap-1 text-sm font-medium text-slate-800">
                  <a href="tel:+79023082433" className="hover:text-orange-600 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-600" /> +7 (902) 308-24-33
                  </a>
                  <a href="tel:+79503513498" className="hover:text-orange-600 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-600" /> +7 (950) 351-34-98
                  </a>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm transition-colors"
              >
                Закрыть окно
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Ваше имя / Организация <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Иван Иванов или ООО «Заказчик»"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Телефон для связи <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email (для сметы и КП)
                  </label>
                  <input
                    type="email"
                    placeholder="mail@company.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Вид градостроительной услуги
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all text-slate-800"
                  >
                    <option value="Документация по планировке территории (ППТ и ПМТ)">Документация по планировке территории (ППТ и ПМТ)</option>
                    <option value="Проект планировки линейного объекта">Проект планировки линейного объекта</option>
                    <option value="Проект межевания территории (ПМТ)">Проект межевания территории (ПМТ)</option>
                    <option value="Генеральный план родовых поместий и экопоселений">Генеральный план родовых поместий и экопоселений</option>
                    <option value="Генеральный план муниципального образования">Генеральный план муниципального образования</option>
                    <option value="Нормативы градостроительного проектирования (МНГП/РНГП)">Нормативы градостроительного проектирования (МНГП/РНГП)</option>
                    <option value="Правила землепользования и застройки (ПЗЗ)">Правила землепользования и застройки (ПЗЗ)</option>
                    <option value="Программа развития коммунальной инфраструктуры (ПКР КИ)">Программа развития коммунальной инфраструктуры (ПКР КИ)</option>
                    <option value="Программа развития социальной инфраструктуры (ПКР СИ)">Программа развития социальной инфраструктуры (ПКР СИ)</option>
                    <option value="Другая градостроительная задача">Другая градостроительная задача</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Кадастровый номер, локация или площадь объекта
                </label>
                <input
                  type="text"
                  placeholder="Например: 52:24:0010001:12 или г. Балахна, участок 15 га"
                  value={formData.cadastralNumber}
                  onChange={(e) => setFormData({ ...formData, cadastralNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Краткое описание задачи / примечания
                </label>
                <textarea
                  rows={3}
                  placeholder="Опишите цель проектирования (подключение сетей, жилая застройка, перевод земель, размещение склада и т.д.)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Прикрепить ТЗ, выписку ЕГРН или ситуационный план (PDF, DWG, ZIP)
                </label>
                <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-orange-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-orange-50/30 transition-all text-xs text-slate-600">
                  <FileUp className="w-4 h-4 text-orange-600" />
                  <span>
                    {selectedFileName ? (
                      <strong className="text-slate-800">{selectedFileName}</strong>
                    ) : (
                      "Выберите файл на компьютере (до 25 МБ)"
                    )}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.dwg,.dxf,.zip,.rar,.jpg,.png"
                  />
                </label>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agree152}
                    onChange={(e) => setFormData({ ...formData, agree152: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 shrink-0"
                  />
                  <span>
                    Я даю согласие на обработку персональных данных в соответствии с требованиями Федерального закона РФ № 152-ФЗ «О персональных данных» и принимаю условия{" "}
                    <Link
                      href="/politika-konfidencialnosti"
                      target="_blank"
                      className="text-orange-600 underline hover:text-orange-700"
                    >
                      Политики конфиденциальности
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Конфиденциальность гарантируется</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>Отправить заявку</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
