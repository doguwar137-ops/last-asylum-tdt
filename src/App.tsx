/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Shield,
  Calendar,
  Swords,
  CheckCircle2,
  Calculator,
  ShieldAlert,
  Radio,
  Flame,
  Gift,
} from "lucide-react";
import { Header } from "./components/Header";
import { TodayDirective } from "./components/TodayDirective";
import { WeeklySchedule } from "./components/WeeklySchedule";
import { HeroTactics } from "./components/HeroTactics";
import { FalconSimulator } from "./components/FalconSimulator";
import { DuelCalculator } from "./components/DuelCalculator";
import { AllianceCodex } from "./components/AllianceCodex";
import { BroadcastGenerator } from "./components/BroadcastGenerator";
import { CheeseTrapGuide } from "./components/CheeseTrapGuide";
import { PromoCodes } from "./components/PromoCodes";
import { ALLIANCE_NAME, GAME_TITLE } from "./data/allianceData";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("today");
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
    { id: "heroes", label: "Отряды и Герои", icon: Swords },
    { id: "cheese-trap", label: "Сырная Ловушка", icon: Flame, badge: "ГАЙД" },
    { id: "falcon", label: "Тренажер Сокола", icon: CheckCircle2, highlight: true },
    { id: "calculator", label: "Калькулятор 1М", icon: Calculator },
    { id: "codex", label: "Кодекс & Дисциплина", icon: ShieldAlert, badge: "КИК" },
    { id: "promo", label: "Промокоды", icon: Gift, badge: "ХАЛЯВА" },
    { id: "broadcast", label: "Штабные Приказы", icon: Radio },
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
          />
        )}

        {currentTab === "schedule" && (
          <WeeklySchedule
            onSelectDay={(idx) => {
              setSelectedDayIndex(idx);
              setCurrentTab("today");
            }}
          />
        )}

        {currentTab === "heroes" && (
          <HeroTactics />
        )}

        {currentTab === "cheese-trap" && (
          <CheeseTrapGuide />
        )}

        {currentTab === "falcon" && <FalconSimulator />}

        {currentTab === "calculator" && (
          <DuelCalculator />
        )}

        {currentTab === "codex" && <AllianceCodex />}

        {currentTab === "promo" && <PromoCodes />}

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
