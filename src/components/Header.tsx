import React, { useState, useEffect } from "react";
import { Shield, Clock, AlertTriangle, Radio, Flame, Sparkles } from "lucide-react";
import { ALLIANCE_NAME, DUEL_DAYS } from "../data/allianceData";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedDayIndex: number;
  setSelectedDayIndex: (idx: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedDayIndex,
  setSelectedDayIndex,
}) => {
  const [mskTime, setMskTime] = useState("");
  const [currentDayNumber, setCurrentDayNumber] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Moscow is UTC+3
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const msk = new Date(utc + 3600000 * 3);
      
      const hours = String(msk.getHours()).padStart(2, "0");
      const minutes = String(msk.getMinutes()).padStart(2, "0");
      const seconds = String(msk.getSeconds()).padStart(2, "0");
      setMskTime(`${hours}:${minutes}:${seconds} МСК`);

      // JS getDay(): 0 = Sun, 1 = Mon, ..., 6 = Sat
      // Our array: 0 = Mon, ..., 5 = Sat, 6 = Sun
      const day = msk.getDay();
      const mappedIndex = day === 0 ? 6 : day - 1;
      setCurrentDayNumber(mappedIndex);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeDay = DUEL_DAYS[currentDayNumber] || DUEL_DAYS[0];

  return (
    <header id="alliance-header" className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-0.5 shadow-xs flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-amber-900 font-mono">
                  {ALLIANCE_NAME}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-bold tracking-wide flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-600" /> ШТАБ СТРАТЕГА
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Last Asylum: Plague • Дуэль Альянсов
              </p>
            </div>
          </div>

          {/* Mobile Clock */}
          <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{mskTime || "12:00:00 МСК"}</span>
          </div>
        </div>

        {/* Live Battle Phase Widget */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div
            id="current-phase-pill"
            onClick={() => {
              setSelectedDayIndex(currentDayNumber);
              setCurrentTab("today");
            }}
            className="cursor-pointer group flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all shadow-2xs"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                СЕГОДНЯ: {activeDay.name}
              </div>
              <div className="text-xs font-bold text-amber-800 group-hover:text-amber-900">
                {activeDay.badge}
              </div>
            </div>
          </div>

          {/* Desktop Clock & Falcon alert */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{mskTime || "12:00:00 МСК"}</span>
            </div>

            <button
              id="ai-quick-btn"
              onClick={() => setCurrentTab("ai-chat")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              ИИ-Советник
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
