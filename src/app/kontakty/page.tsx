import React from "react";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  FileText,
  Copy,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import YandexMap from "@/components/YandexMap";
import ContactPageInteractive from "./ContactPageInteractive";

export const metadata = {
  title: "Контакты и реквизиты | ООО «МГП» Нижний Новгород",
  description: "Контакты проектной мастерской ООО «МГП»: г. Нижний Новгород, ул. Ванеева, 34, офис 406. Телефоны +7 902 308-24-33, +7 950 351-34-98. Карта проезда и реквизиты.",
};

export default function ContactsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">Контакты</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Контакты и реквизиты компании
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Центральный офис ООО «Мастерская генеральных планов» расположен в Советском районе Нижнего Новгорода. Ждем вас для обсуждения градостроительных проектов и консультирования.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <ContactPageInteractive />
    </div>
  );
}
