"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  FileText,
  Copy,
  Send,
  CheckCircle2,
  FileUp,
  AlertCircle,
  ExternalLink,
  Navigation
} from "lucide-react";
import YandexMap from "@/components/YandexMap";

export default function ContactPageInteractive() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Документация по планировке территории (ППТ и ПМТ)",
    cadastralNumber: "",
    message: "",
    agree152: true
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleCopyRequisites = () => {
    const text = `ООО «Мастерская генеральных планов» (ООО «МГП»)
ИНН: 5262241908
КПП: 526201001
ОГРН: 1095262006120
Адрес: 603105, Нижегородская обл., г. Нижний Новгород, ул. Ванеева, д. 34, офис 406
Телефоны: +7 (902) 308-24-33, +7 (950) 351-34-98, +7 (950) 351-34-87
Email: info@mgp.ooo
СРО: Член Ассоциации проектировщиков «Волжский смотр», рег. номер № П-175`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Укажите ваше имя и контактный телефон");
      return;
    }

    if (!formData.agree152) {
      setErrorMsg("Необходимо дать согласие на обработку персональных данных");
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
      if (!res.ok) throw new Error(data.error || "Ошибка отправки");

      setSubmittedId(data.id);
    } catch (err: any) {
      setErrorMsg(err.message || "Ошибка отправки формы");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contacts, Yandex Map, Requisites */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Адрес офиса</span>
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                603105, г. Нижний Новгород, ул. Ванеева, д. 34
              </div>
              <div className="text-xs text-slate-500">
                4 этаж, офис 406 (Бизнес-центр, ост. «Улица Панина»)
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Режим работы</span>
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                Пн – Пт: 08:30 – 17:30
              </div>
              <div className="text-xs text-slate-500">
                Сб, Вс — выходные дни (по согласованию для ГИПа)
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 sm:col-span-2">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Телефоны отдела проектирования</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-sm font-bold text-slate-900">
                <a href="tel:+79023082433" className="hover:text-orange-600 transition-colors">
                  +7 (902) 308-24-33
                </a>
                <a href="tel:+79503513498" className="hover:text-orange-600 transition-colors">
                  +7 (950) 351-34-98
                </a>
                <a href="tel:+79503513487" className="hover:text-orange-600 transition-colors">
                  +7 (950) 351-34-87
                </a>
              </div>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-600" />
                <span>Электронная почта:</span>
                <a href="mailto:info@mgp.ooo" className="font-semibold text-slate-800 hover:text-orange-600 underline">
                  info@mgp.ooo
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Yandex Map */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">
                Схема проезда и интерактивная карта
              </h3>
              <a
                href="https://yandex.ru/maps/?rtext=~56.314275,44.025539&rtt=auto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
              >
                <span>Маршрут в Яндекс.Картах</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <YandexMap heightClass="h-[400px]" />
          </div>

          {/* Legal Requisites Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Юридические сведения
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Реквизиты организации
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCopyRequisites}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-orange-600" />
                <span>{copied ? "Скопировано!" : "Скопировать"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Полное наименование:</span>
                <span className="font-bold text-slate-800">ООО «Мастерская генеральных планов»</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Сокращенное наименование:</span>
                <span className="font-bold text-slate-800">ООО «МГП»</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">ИНН / КПП:</span>
                <span className="font-bold text-slate-800 font-mono">5262241908 / 526201001</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">ОГРН:</span>
                <span className="font-bold text-slate-800 font-mono">1095262006120</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                <span className="text-slate-400 block mb-0.5">Саморегулируемая организация (СРО):</span>
                <span className="font-bold text-slate-800">Член Ассоциации «Волжский смотр», выписка из реестра № П-175</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feedback Form */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <div className="border-b border-slate-100 pb-4 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Связаться с нами
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Отправить запрос на проектирование
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Прикрепите исходные материалы, и мы подготовим план работ со сметой
              </p>
            </div>

            {submittedId ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Заявка № MGP-{submittedId} зарегистрирована!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mb-6">
                  Главный инженер свяжется с вами в течение рабочего дня.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Отправить еще одно сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ваше имя / Организация <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ФИО или название компании"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Телефон <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="mail@site.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Вид услуги
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value="Документация по планировке территории (ППТ и ПМТ)">ППТ и ПМТ территории</option>
                    <option value="Проект планировки линейного объекта">Проект планировки линейного объекта</option>
                    <option value="Проект межевания территории (ПМТ)">Проект межевания территории (ПМТ)</option>
                    <option value="Генеральный план поселения / округа">Генеральный план поселения / округа</option>
                    <option value="Правила землепользования и застройки (ПЗЗ)">Правила землепользования и застройки (ПЗЗ)</option>
                    <option value="Нормативы градостроительного проектирования (МНГП)">Нормативы градостроительного проектирования</option>
                    <option value="Программы инфраструктуры (ПКР КИ / СИ)">Программы инфраструктуры (ПКР КИ / СИ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Кадастровый номер или ориентир
                  </label>
                  <input
                    type="text"
                    placeholder="Например: 52:24:0010001:12 или Нижегородская обл."
                    value={formData.cadastralNumber}
                    onChange={(e) => setFormData({ ...formData, cadastralNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Сообщение / Задачи проектирования
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Укажите площадь, целевое назначение или требования ТЗ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Прикрепить файл ТЗ / схему
                  </label>
                  <label className="flex items-center justify-center gap-2 p-2.5 border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-xl cursor-pointer bg-slate-50 text-xs text-slate-600 transition-colors">
                    <FileUp className="w-4 h-4 text-orange-600" />
                    <span className="truncate max-w-[220px]">
                      {selectedFileName || "Выбрать файл (PDF, DWG, ZIP)..."}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.dwg,.dxf,.zip,.rar"
                    />
                  </label>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agree152}
                      onChange={(e) => setFormData({ ...formData, agree152: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-orange-600 shrink-0"
                    />
                    <span>
                      Я согласен на обработку персональных данных (152-ФЗ РФ) и принимаю условия{" "}
                      <Link href="/politika-konfidencialnosti" className="text-orange-600 underline">
                        Политики конфиденциальности
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Отправить заявку</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
