/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Shield,
  Calendar,
  CheckCircle2,
  Calculator,
  ShieldAlert,
  Radio,
  Flame,
  BookOpen,
  Ticket,
  Star,
} from "lucide-react";
import { Header } from "./components/Header";
import { TodayDirective } from "./components/TodayDirective";
import { WeeklySchedule } from "./components/WeeklySchedule";
import { HeroGuide } from "./components/HeroGuide";
import { AllianceCodex } from "./components/AllianceCodex";
import { BroadcastGenerator } from "./components/BroadcastGenerator";
import { CheeseTrapGuide } from "./components/CheeseTrapGuide";
import { QuizCheatSheet } from "./components/QuizCheatSheet";
import { PromoCodesModule } from "./components/PromoCodesModule";
import { ALLIANCE_NAME, GAME_TITLE } from "./data/allianceData";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("today");
  const [promoCodes, setPromoCodes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("dream_promo_codes");
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem("dream_promo_codes", JSON.stringify(promoCodes));
  }, [promoCodes]);

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const msk = new Date(utc + 3600000 * 3);
    const day = msk.getDay();
    return day === 0 ? 6 : day - 1;
  });

  const navTabs = [
    { id: "today", label: "Директива Дня", icon: Shield, badge: "СЕГОДНЯ" },
    { id: "schedule", label: "Календарь (7 Дней)", icon: Calendar },
    { id: "broadcast", label: "Штабные Приказы", icon: Radio },
    { id: "hero-guide", label: "Гайд по Героям", icon: Star, badge: "ТОП" },
    { id: "cheese-trap", label: "Сырная Ловушка", icon: Flame, badge: "ГАЙД" },
    { id: "promo", label: "Промокоды", icon: Ticket },
    { id: "codex", label: "Кодекс & Дисциплина", icon: ShieldAlert, badge: "КИК" },
    { id: "quiz", label: "Викторина", icon: BookOpen, badge: "ОТВЕТЫ" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
      {/* Top App Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedDayIndex={selectedDayIndex}
        setSelectedDayIndex={setSelectedDayIndex}
      />

      {/* Navigation Sub-Bar */}
      <div className="border-b border-slate-200 bg-white/95 sticky top-[61px] z-40 backdrop-blur-md shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            id="alliance-nav-tabs"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none"
          >
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`nav-btn-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? "bg-amber-600 text-white shadow-xs scale-[1.01]"
                      : "bg-slate-100/70 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && !isActive && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-slate-200 text-slate-700 border border-slate-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentTab === "today" && (
          <TodayDirective
            selectedDayIndex={selectedDayIndex}
            setSelectedDayIndex={setSelectedDayIndex}
            onOpenCalculator={() => setCurrentTab("calculator")}
            promoCodes={promoCodes}
          />
        )}

        {currentTab === "schedule" && (
          <WeeklySchedule
            onSelectDay={(idx) => {
              setSelectedDayIndex(idx);
              setCurrentTab("today");
            }}
            promoCodes={promoCodes}
          />
        )}

        {currentTab === "promo" && (
          <PromoCodesModule promoCodes={promoCodes} setPromoCodes={setPromoCodes} />
        )}

        {currentTab === "hero-guide" && (
          <HeroGuide />
        )}

        {currentTab === "cheese-trap" && (
          <CheeseTrapGuide />
        )}

        {currentTab === "codex" && <AllianceCodex />}
        
        {currentTab === "quiz" && <QuizCheatSheet />}

        {currentTab === "broadcast" && <BroadcastGenerator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Альянс {ALLIANCE_NAME} • {GAME_TITLE} • Официальный Штабной Стратег
          </span>
          <span className="text-slate-600">
            Норматив Дуэли: <strong className="text-amber-700">МИНИМУМ 1 000 000 очков на сегодня (суточный)</strong> • Строго по гайдам
          </span>
        </div>
      </footer>
    </div>
  );
}
