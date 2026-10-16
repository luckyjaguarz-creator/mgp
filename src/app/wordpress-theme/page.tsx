import React from "react";
import Link from "next/link";
import {
  FileCode2,
  Download,
  FolderArchive,
  CheckCircle2,
  Server,
  Image,
  Layers,
  ArrowRight,
  ShieldCheck,
  Terminal,
  ChevronRight
} from "lucide-react";

export const metadata = {
  title: "Архитектура кастомной темы WordPress (mgp-theme) | ООО «МГП»",
  description: "Техническая документация кастомной темы WordPress mgp-theme: CPT, ACF поля, структура файлов, скачать архив темы и инструкции по бесплатному хостингу.",
};

export default function WordPressThemePage() {
  const themeFiles = [
    { file: "style.css", desc: "Метаданные темы (Theme Name, Version 1.0, Author, Text Domain) и базовые стили" },
    { file: "functions.php", desc: "Регистрация CPT (services, projects, partners, useful_links), таксономий, меню и AJAX" },
    { file: "header.php", desc: "Шапка сайта: логотип МГП, телефоны, навигация, CTA кнопка заявки" },
    { file: "footer.php", desc: "Подвал: реквизиты ООО «МГП», копирайт, ссылки на 152-ФЗ, модальное окно" },
    { file: "front-page.php", desc: "Шаблон главной страницы: hero, цифры 30+ лет, сетка услуг, проекты, партнеры, Яндекс.Карта" },
    { file: "page-about.php", desc: "Шаблон страницы «О компании» (мультидисциплинарный состав, допуски СРО)" },
    { file: "page-contacts.php", desc: "Шаблон «Контакты»: Яндекс.Карта API v2.1, реквизиты, форма обратной связи" },
    { file: "page-links.php", desc: "Шаблон «Полезные ресурсы»: реестр ФГИС ТП, ГИСОГД НО, конвертеры МСК-52" },
    { file: "archive-services.php", desc: "Архивный шаблон единого каталога всех градостроительных услуг" },
    { file: "single-services.php", desc: "Посадочная страница конкретной услуги (состав работ, ГрК РФ, форма расчета)" },
    { file: "archive-projects.php", desc: "Архив проектов и хроники 2023–2024 гг." },
    { file: "single-projects.php", desc: "Детальная страница проекта с блоком ТЭП и картографической привязкой" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">Тема WordPress</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-3">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Кастомная тема WordPress без конструкторов (Чистый PHP)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Тема WordPress «mgp-theme» по Техническому заданию
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
            Полный комплект файлов темы в каталоге <code>/wp-content/themes/mgp-theme/</code> с зарегистрированными CPT, таксономиями, отключением неиспользуемых стилей Gutenberg, интеграцией Яндекс.Карт и формы по 152-ФЗ.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/downloads/mgp-theme.zip"
              download
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Скачать архив темы mgp-theme.zip</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. File Structure */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
            <FolderArchive className="w-4 h-4" />
            <span>Структура темы WordPress</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Каталог: /wp-content/themes/mgp-theme/
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {themeFiles.map((tf) => (
              <div
                key={tf.file}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
              >
                <code className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold shrink-0">
                  {tf.file}
                </code>
                <span className="text-slate-600 leading-snug">{tf.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Custom Post Types (CPT) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            <Layers className="w-4 h-4" />
            <span>Архитектура данных WordPress</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Зарегистрированные Custom Post Types & Таксономии
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-orange-600 uppercase">CPT 1</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1 mb-1">services (Услуги)</h3>
              <p className="text-slate-600 leading-snug">
                Поля ACF: нормативная база ГрК РФ, пошаговые этапы работ, состав передаваемых материалов, регламентный срок.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-orange-600 uppercase">CPT 2</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1 mb-1">projects (Проекты)</h3>
              <p className="text-slate-600 leading-snug">
                Поля ACF: год проекта, локация / муниципальный округ, статус («Утвержден», «В работе»), таблица ТЭП.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-orange-600 uppercase">CPT 3</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1 mb-1">partners (Партнеры)</h3>
              <p className="text-slate-600 leading-snug">
                Таксономия <code>partner_category</code> («Муниципальные образования» и «Бизнес-партнеры»). Логотип, сайт, описание.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-orange-600 uppercase">CPT 4</span>
              <h3 className="font-bold text-slate-900 text-sm mt-1 mb-1">useful_links (Ресурсы)</h3>
              <p className="text-slate-600 leading-snug">
                Таксономия <code>link_category</code> (Государственные системы, Кадастровые карты, Инструменты инженера).
              </p>
            </div>
          </div>
        </div>

        {/* 3. Image placement guide for user's files */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            <Image className="w-4 h-4" />
            <span>Инструкция по размещению файлов</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Где размещать логотипы партнеров и favicon
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">
                1. Иконка Favicon (cropped-vs2-32x32.png):
              </div>
              <p className="text-slate-600">
                Поместите файл в корневую папку <code>/public/cropped-vs2-32x32.png</code> (для текущего проекта) либо в папку темы <code>/wp-content/themes/mgp-theme/images/cropped-vs2-32x32.png</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">
                2. Все 41 файл логотипов партнеров и районов:
              </div>
              <p className="text-slate-600 mb-2">
                В структуре текущего проекта скопируйте все 41 файл напрямую в папку:
              </p>
              <div className="p-2.5 bg-slate-900 text-orange-400 font-mono text-xs rounded-lg mb-2">
                /public/partners/
              </div>
              <p className="text-slate-600 text-xs">
                Пример путей: <code>/public/partners/Ардатовский.png</code>, <code>/public/partners/лукоил.png</code>, <code>/public/partners/Балахнинский.jpg</code> и т.д. Компонент автоматически подхватит оригинальные изображения с сохранением масштаба.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Free Hosting recommendations */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
            <Server className="w-4 h-4" />
            <span>Развертывание сайта (Хостинг)</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">
            3 варианта бесплатного хостинга для проекта (с серверами в РФ)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-3xl leading-relaxed">
            Подробный анализ бесплатных тарифов, подходящих для российского сегмента, работы с доменами .RU/.РФ/.OOO и соответствия 152-ФЗ:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white">1. Beget (Бегет)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Серверы в РФ 🇷🇺</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Бесплатный тариф:</strong> Тариф «Бесплатный хостинг» (Free) от одного из ведущих российских хостинг-провайдеров.
              </p>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• Серверы в Санкт-Петербурге / Москве</li>
                <li>• 1 сайт, 1 база MySQL/PostgreSQL, 1 ГБ SSD</li>
                <li>• Установка WordPress в 1 клик через панель</li>
                <li>• Бесплатный SSL-сертификат Let's Encrypt</li>
                <li>• Полное соответствие требованиям 152-ФЗ РФ</li>
              </ul>
              <div className="pt-2 text-orange-400 font-semibold">
                Идеально для размещения WordPress темы
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white">2. Sprinthost / Timeweb</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Серверы в РФ 🇷🇺</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Бесплатный период / Социальный тариф:</strong> Бесплатный хостинг для социальных проектов и тестовый период до 30 дней с пролонгацией.
              </p>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• Высокоскоростные дата-центры в РФ (Tier III)</li>
                <li>• Поддержка PHP 7.4–8.3, базы данных</li>
                <li>• Быстрый отклик TTFB в Нижегородской области</li>
                <li>• Круглосуточная русскоязычная техподдержка</li>
              </ul>
              <div className="pt-2 text-orange-400 font-semibold">
                Высокая надежность и низкий пинг по России
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white">3. Amvera Cloud / Render</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">Cloud & Next.js</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Amvera Cloud (РФ) / Render Free:</strong> Российская облачная платформа Amvera (дата-центр в РФ) предоставляет стартовый грант и бесплатный уровень для веб-приложений.
              </p>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• Идеально для развертывания Next.js + PostgreSQL</li>
                <li>• Автоматический деплой из Git-репозитория</li>
                <li>• Встроенный бесплатный SSL и мониторинг</li>
                <li>• Не блокируется в зоне RU</li>
              </ul>
              <div className="pt-2 text-orange-400 font-semibold">
                Идеально для запуска Next.js версии
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
