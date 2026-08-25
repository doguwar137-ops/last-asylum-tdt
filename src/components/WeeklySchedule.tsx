import React, { useState } from "react";
import {
  Calendar,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Hammer,
  FlaskConical,
  ShieldAlert,
  Swords,
  Compass,
} from "lucide-react";
import { DUEL_DAYS } from "../data/allianceData";
import { DuelDay } from "../types";

interface WeeklyScheduleProps {
  onSelectDay: (idx: number) => void;
}

const getPhaseIcon = (iconName: string) => {
  switch (iconName) {
    case "Compass":
      return <Compass className="w-5 h-5 text-sky-600" />;
    case "Hammer":
      return <Hammer className="w-5 h-5 text-amber-600" />;
    case "FlaskConical":
      return <FlaskConical className="w-5 h-5 text-blue-600" />;
    case "ShieldAlert":
      return <ShieldAlert className="w-5 h-5 text-purple-600" />;
    case "Swords":
      return <Swords className="w-5 h-5 text-rose-600" />;
    case "Sparkles":
      return <Sparkles className="w-5 h-5 text-emerald-600" />;
    case "Lock":
      return <Lock className="w-5 h-5 text-slate-500" />;
    default:
      return <Zap className="w-5 h-5 text-amber-600" />;
  }
};

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  onSelectDay,
}) => {
  const [expandedDay, setExpandedDay] = useState<string | null>("wednesday");

  const toggleExpand = (id: string) => {
    setExpandedDay(expandedDay === id ? null : id);
  };

  return (
    <div id="weekly-schedule-container" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Недельный Боевой Календарь Дуэли [tDt]
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Жесткое недельное расписание фаз. Сдача Заданий Сокола в профильные дни: Понедельник, Среда и Пятница. В четверг в 19:30 МСК — Битва с Крысой. В субботу — лечение войск, засады UR, бесплатные щиты и закрытие норматива.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold shadow-2xs">
            Норматив: 1 000 000 очков на сегодня (суточный)
          </span>
        </div>
      </div>

      {/* 7 Days Grid / Accordion */}
      <div className="space-y-3">
        {DUEL_DAYS.map((day: DuelDay, idx: number) => {
          const isExpanded = expandedDay === day.id;
          const isClaimDay =
            day.falconRule.action === "CLAIM" ||
            day.falconRule.action === "CLAIM_PREVIOUS" ||
            day.falconRule.action === "CLAIM_ALL";

          return (
            <div
              key={day.id}
              id={`schedule-card-${day.id}`}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "bg-white border-amber-400 shadow-xs"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              {/* Header row */}
              <div
                onClick={() => toggleExpand(day.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0">
                    {getPhaseIcon(day.iconName)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-amber-700">
                        ДЕНЬ {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {day.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        {day.badge}
                      </span>
                      {day.id === "thursday" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300 font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3 text-rose-600" /> 19:30 Крыса
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 truncate max-w-xl">
                      {day.focus}
                    </p>
                  </div>
                </div>

                {/* Right Badges & Toggle */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Falcon status badge */}
                  <span
                    className={`hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-bold font-mono ${
                      isClaimDay
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                        : "bg-rose-50 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {isClaimDay ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> СДАЧА СОКОЛА
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" /> СОКОЛ В КОПИЛКЕ
                      </>
                    )}
                  </span>

                  <button
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                    aria-label="Toggle details"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-amber-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-4">
                  {/* Falcon rule banner */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                      isClaimDay
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-2">
                      {isClaimDay ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Lock className="w-4 h-4 text-rose-600" />
                      )}
                      <span>ПРАВИЛО СОКОЛА: {day.falconRule.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-700">
                      {day.falconRule.description}
                    </p>
                  </div>

                  {/* Allowed / Forbidden grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                      <div className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Разрешено и рекомендуется:
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        {day.allowedActions.map((act, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-rose-200 shadow-2xs">
                      <div className="font-bold text-rose-800 mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Строго запрещено / Копим:
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        {day.forbiddenActions.map((act, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">✕</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 flex-wrap gap-2">
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Ускорители:</span>{" "}
                      {day.recommendedSpeedups.join(", ")}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectDay(idx)}
                        className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-2xs"
                      >
                        Перейти в директиву дня
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
