import React, { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  Copy,
  Check,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
  Info,
} from "lucide-react";
import { DUEL_DAYS, ALLIANCE_NAME, DUEL_QUOTA } from "../data/allianceData";
import { DuelDay } from "../types";

interface TodayDirectiveProps {
  selectedDayIndex: number;
  setSelectedDayIndex: (idx: number) => void;
  onOpenCalculator: () => void;
}

export const TodayDirective: React.FC<TodayDirectiveProps> = ({
  selectedDayIndex,
  setSelectedDayIndex,
  onOpenCalculator,
}) => {
  const [copied, setCopied] = useState(false);
  const currentDay: DuelDay = DUEL_DAYS[selectedDayIndex] || DUEL_DAYS[0];

  const handleCopyOrder = () => {
    const text = `📢 [tDt] БОЕВОЙ ПРИКАЗ: ${currentDay.name.toUpperCase()} (${currentDay.phaseName})
🎯 Главный фокус: ${currentDay.focus}
🦅 ЗАДАНИЯ СОКОЛА: ${currentDay.falconRule.title} — ${currentDay.falconRule.description}
⛔️ СТРОГИЙ ЗАПРЕТ: ${currentDay.forbiddenActions[0] || "Слив ресурсов не по фазе"}
📊 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isFalconClaimDay =
    currentDay.falconRule.action === "CLAIM" ||
    currentDay.falconRule.action === "CLAIM_PREVIOUS" ||
    currentDay.falconRule.action === "CLAIM_ALL";

  return (
    <div id="today-directive-container" className="space-y-6">
      {/* Day Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {DUEL_DAYS.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={day.id}
              id={`day-tab-${day.id}`}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isSelected
                  ? "bg-amber-600 text-white shadow-xs scale-[1.01]"
                  : "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs"
              }`}
            >
              <span className="opacity-70">Д{idx + 1}</span>
              <span>{day.name}</span>
              {day.id === "thursday" && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Крыса 19:30" />
              )}
              {day.id === "monday" || day.id === "wednesday" || day.id === "friday" ? (
                <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                  Сокол
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Main Tactical Directive Card */}
      <div className="relative rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xs overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono tracking-wide">
                ФАЗА {currentDay.phaseNumber} ИЗ 7
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                {currentDay.badge}
              </span>
              {currentDay.id === "thursday" && (
                <span className="px-2.5 py-1 rounded-md bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-600" /> БИТВА С КРЫСОЙ В 19:30 МСК
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentDay.name}: {currentDay.phaseName}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              {currentDay.focus}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="copy-order-btn"
              onClick={handleCopyOrder}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Приказ скопирован!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Скопировать для чата</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Falcon Protocol Hero Alert */}
        <div className="mt-5">
          <div
            className={`rounded-xl p-4 sm:p-5 border transition-all ${
              isFalconClaimDay
                ? "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-2xs"
                : "bg-rose-50 border-rose-200 text-rose-900 shadow-2xs"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-2.5 rounded-lg flex-shrink-0 ${
                  isFalconClaimDay ? "bg-emerald-200 text-emerald-800" : "bg-rose-200 text-rose-800"
                }`}
              >
                {isFalconClaimDay ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                ) : (
                  <Lock className="w-6 h-6 text-rose-700" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide font-mono ${
                      isFalconClaimDay
                        ? "bg-emerald-200/80 text-emerald-900 border border-emerald-300"
                        : "bg-rose-200/80 text-rose-900 border border-rose-300"
                    }`}
                  >
                    ПРОТОКОЛ ДИСПЕТЧЕРСКОЙ
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    Задания Сокола
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mt-1 text-slate-900">
                  {currentDay.falconRule.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">
                  {currentDay.falconRule.description}
                </p>
                {currentDay.falconRule.warning && (
                  <p
                    className={`text-xs font-bold mt-2 flex items-center gap-1.5 ${
                      isFalconClaimDay ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    {currentDay.falconRule.warning}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Grid: Allowed vs Forbidden Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Allowed Actions */}
          <div className="rounded-xl bg-slate-50 border border-emerald-200 p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Что ДЕЛАТЬ сегодня (Тратить / Качать):
              </h4>
            </div>
            <ul className="space-y-2">
              {currentDay.allowedActions.map((action, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-slate-700 flex items-start gap-2"
                >
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Forbidden Actions */}
          <div className="rounded-xl bg-slate-50 border border-rose-200 p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                СТРОГО ЗАПРЕЩЕНО (Копить / Не трогать):
              </h4>
            </div>
            <ul className="space-y-2">
              {currentDay.forbiddenActions.map((action, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-slate-700 flex items-start gap-2"
                >
                  <span className="text-rose-600 font-bold mt-0.5">✕</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Points Opportunities & Pro Tips */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl bg-slate-50 border border-slate-200 p-4 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-3">
              <Zap className="w-4 h-4 text-amber-600" />
              Где брать очки сегодня:
            </h4>
            <div className="space-y-2.5">
              {currentDay.pointsOpportunities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        item.priority === "CRITICAL"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : item.priority === "HIGH"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {item.priority === "CRITICAL" ? "ТОП" : item.priority}
                    </span>
                    <span className="text-slate-800 font-medium">{item.activity}</span>
                  </div>
                  <span className="font-mono font-bold text-amber-700">
                    {item.pointsEstimate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between shadow-2xs">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-3">
                <Info className="w-4 h-4 text-slate-500" />
                Тактический совет:
              </h4>
              <ul className="space-y-2">
                {currentDay.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-slate-700 leading-relaxed">
                    💡 {tip}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onOpenCalculator}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-amber-800 hover:text-amber-900 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition-colors shadow-2xs"
            >
              <span>Калькулятор нормы (1М)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Strict Cheese Trap Protocol Reminder */}
      <div className="rounded-xl bg-gradient-to-r from-amber-50 via-white to-orange-50 border border-amber-200 p-4 flex items-center justify-between gap-4 flex-wrap shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100 border border-amber-200">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">
              БОЕВОЙ РЕГЛАМЕНТ: Стратегия Сырной Ловушки
            </h4>
            <p className="text-xs text-slate-600">
              Ралли запускаем ТОЛЬКО одним слабым героем! В чужие ралли входим основой. Стоп сразу при капе наград.
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-amber-900 px-2.5 py-1 rounded bg-white border border-amber-200 shadow-2xs">
            Норматив: МИНИМУМ 1 000 000 очков на сегодня (суточный)
          </span>
        </div>
      </div>
    </div>
  );
};
