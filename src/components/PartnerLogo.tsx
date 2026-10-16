"use client";

import React, { useState } from "react";
import { Building2, Shield, Landmark } from "lucide-react";

interface PartnerLogoProps {
  name: string;
  logoFile: string;
  category: string;
  className?: string;
}

export default function PartnerLogo({ name, logoFile, category, className = "" }: PartnerLogoProps) {
  const [imageError, setImageError] = useState(false);

  // Encode file name safely for URL
  const encodedFile = encodeURIComponent(logoFile);
  const srcPath = `/partners/${encodedFile}`;

  const isMunicipality = category === "Муниципальные образования";

  // Clean short label for display
  const cleanName = name
    .replace(/^Администрация\s+/i, "")
    .replace(/^городского округа город\s+/i, "г.о. г. ")
    .replace(/^ПАО\s+/i, "")
    .replace(/^АО\s+/i, "")
    .replace(/^ООО\s+/i, "")
    .replace(/^АК\s+/i, "")
    .replace(/^Группа компаний\s+/i, "ГК ")
    .replace(/^Строительная компания\s+/i, "СК ");

  if (imageError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-3 text-center rounded-lg border border-slate-200 bg-white hover:border-orange-400 hover:shadow-sm transition-all duration-200 ${className}`}
        title={name}
      >
        <div
          className={`w-11 h-11 mb-2 rounded-full flex items-center justify-center font-bold text-sm ${
            isMunicipality
              ? "bg-amber-50 text-amber-800 border border-amber-200"
              : "bg-slate-100 text-slate-800 border border-slate-300"
          }`}
        >
          {isMunicipality ? (
            <Shield className="w-5 h-5 text-amber-700" />
          ) : (
            <Building2 className="w-5 h-5 text-slate-700" />
          )}
        </div>
        <span className="text-xs font-medium text-slate-800 line-clamp-2 leading-tight">
          {cleanName}
        </span>
        <span className="text-[10px] text-slate-400 mt-0.5 truncate max-w-full">
          {logoFile}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-3 text-center rounded-lg border border-slate-200 bg-white hover:border-orange-400 hover:shadow-md transition-all duration-200 group ${className}`}
      title={name}
    >
      <div className="w-full h-14 flex items-center justify-center overflow-hidden mb-1.5">
        <img
          src={srcPath}
          alt={name}
          onError={() => setImageError(true)}
          className="max-h-12 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      <span className="text-xs font-medium text-slate-800 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
        {cleanName}
      </span>
      <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">
        {isMunicipality ? "Муниципалитет" : "Партнер"}
      </span>
    </div>
  );
}
