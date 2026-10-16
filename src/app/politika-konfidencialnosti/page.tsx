import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Политика обработки персональных данных (152-ФЗ) | ООО «МГП»",
  description: "Политика конфиденциальности и соглашение об обработке персональных данных ООО «Мастерская генеральных планов» в соответствии с Федеральным законом № 152-ФЗ РФ.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">Политика конфиденциальности</span>
          </nav>

          <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Федеральный закон № 152-ФЗ РФ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Политика в отношении обработки персональных данных
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            ООО «Мастерская генеральных планов» • Редакция от 15 января 2024 года
          </p>
        </div>
      </section>

      {/* Policy text content */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              1. Общие положения
            </h2>
            <p className="mb-2">
              Настоящая Политика обработки персональных данных (далее — «Политика») определяет порядок сбора, хранения, передачи и защиты информации о физических лицах (далее — «Пользователи»), пользующихся сайтом <strong>mgp.ooo</strong> (далее — «Сайт»), принадлежащим <strong>Обществу с ограниченной ответственностью «Мастерская генеральных планов»</strong> (ООО «МГП», ОГРН 1095262006120, ИНН 5262241908, КПП 526201001, адрес: 603105, г. Нижний Новгород, ул. Ванеева, д. 34, офис 406).
            </p>
            <p>
              Политика разработана в строгом соответствии с Федеральным законом Российской Федерации от 27.07.2006 № 152-ФЗ «О персональных данных» и нормативными актами уполномоченных органов РФ.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              2. Цели обработки персональных данных
            </h2>
            <p className="mb-2">
              ООО «МГП» осуществляет обработку персональных данных Пользователей исключительно в следующих целях:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Обработка входящих запросов, заявок на расчет стоимости градостроительного проектирования (ППТ, ПМТ, генеральные планы, ПЗЗ, линейные объекты);</li>
              <li>Связь с Пользователем, направление коммерческих предложений, предварительных смет и технико-экономических консультаций;</li>
              <li>Заключение, исполнение и сопровождение договоров на разработку градостроительной и проектной документации;</li>
              <li>Исполнение требований законодательства РФ в области градостроительства и саморегулирования (СРО).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              3. Состав обрабатываемых данных
            </h2>
            <p className="mb-2">
              Оператор может обрабатывать следующие персональные данные:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Фамилия, имя, отчество представителя заказчика;</li>
              <li>Контактный номер телефона;</li>
              <li>Адрес электронной почты (e-mail);</li>
              <li>Сведения о принадлежащих или арендуемых земельных участках (кадастровый номер, площадь, местоположение);</li>
              <li>Файлы и технические задания, добровольно прикрепляемые Пользователем к веб-форме.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              4. Принципы и сроки обработки данных
            </h2>
            <p className="mb-2">
              Обработка персональных данных осуществляется с соблюдением принципов законности, соразмерности и конфиденциальности. Персональные данные Пользователей не передаются третьим лицам без их согласия, за исключением случаев, установленных федеральным законодательством РФ.
            </p>
            <p>
              Срок обработки персональных данных ограничивается достижением целей их сбора либо отзывом согласия субъектом персональных данных.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              5. Права субъекта персональных данных
            </h2>
            <p className="mb-2">
              Пользователь имеет право в любой момент отозвать свое согласие на обработку персональных данных, направив письменное заявление оператору по адресу: <strong>603105, г. Нижний Новгород, ул. Ванеева, д. 34, офис 406</strong> или на электронную почту <strong>info@mgp.ooo</strong> с темой «Отзыв согласия на обработку персональных данных».
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Вернуться на главную страницу</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
