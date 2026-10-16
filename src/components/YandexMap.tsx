"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, ExternalLink, Phone, Building2 } from "lucide-react";

interface YandexMapProps {
  heightClass?: string;
}

export default function YandexMap({ heightClass = "h-[450px]" }: YandexMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Check if ymaps is already loaded
    if (typeof window !== "undefined" && (window as any).ymaps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      initMap();
    };

    script.onerror = () => {
      setScriptError(true);
    };

    document.head.appendChild(script);

    return () => {
      // cleanup if needed
    };
  }, []);

  const initMap = () => {
    const ymaps = (window as any).ymaps;
    if (!ymaps) return;

    ymaps.ready(() => {
      if (!mapContainerRef.current) return;
      // Clear container in case of re-render
      mapContainerRef.current.innerHTML = "";

      const officeCoords = [56.314275, 44.025539];

      const map = new ymaps.Map(mapContainerRef.current, {
        center: officeCoords,
        zoom: 16,
        controls: ["zoomControl", "fullscreenControl", "typeSelector"]
      });

      const placemark = new ymaps.Placemark(
        officeCoords,
        {
          balloonContentHeader: "<strong>ООО «Мастерская генеральных планов»</strong>",
          balloonContentBody: `
            <div style="font-size:13px; line-height:1.4; color:#1E293B;">
              <p style="margin:4px 0;"><strong>Адрес:</strong> г. Нижний Новгород, ул. Ванеева, д. 34, офис 406</p>
              <p style="margin:4px 0;"><strong>Режим работы:</strong> Пн–Пт 08:30–17:30</p>
              <p style="margin:4px 0;"><strong>Телефоны:</strong> +7 (902) 308-24-33, +7 (950) 351-34-98</p>
            </div>
          `,
          balloonContentFooter: "<span style='color:#EA580C; font-size:12px; font-weight:600;'>Градостроительное проектирование</span>",
          hintContent: "ООО «МГП» — офис 406"
        },
        {
          preset: "islands#orangeDotIconWithCaption",
          iconColor: "#EA580C"
        }
      );

      map.geoObjects.add(placemark);
      map.behaviors.disable("scrollZoom"); // avoid hijacking page scroll
      setMapLoaded(true);
    });
  };

  const yandexMapsUrl = "https://yandex.ru/maps/?rtext=~56.314275,44.025539&rtt=auto";

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100`}>
      {/* Container where Yandex map will mount */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Fallback or overlay card if script failed or while loading */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6 animate-bounce" />
          </div>
          <h4 className="text-base font-bold text-slate-800 mb-1">
            г. Нижний Новгород, ул. Ванеева, д. 34, офис 406
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mb-4">
            ООО «Мастерская генеральных планов» (Бизнес-центр, ост. «Улица Панина»)
          </p>
          <a
            href={yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl shadow transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Построить маршрут на Яндекс.Картах</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating Info Badge in bottom-left */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg max-w-xs text-slate-800 pointer-events-auto hidden sm:block">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-600"></div>
          <span className="text-xs font-bold text-slate-900">Центральный офис ООО «МГП»</span>
        </div>
        <p className="text-xs text-slate-600 leading-snug mb-2">
          г. Нижний Новгород, ул. Ванеева, д. 34, 4 этаж, оф. 406
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-700">
          <a
            href="tel:+79023082433"
            className="text-orange-600 font-semibold hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" /> +7 902 308-24-33
          </a>
          <span className="text-slate-300">•</span>
          <a
            href={yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-600 flex items-center gap-0.5"
          >
            Маршрут <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
