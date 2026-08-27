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
  Copy,
  Check,
} from "lucide-react";
import { DUEL_DAYS, ALLIANCE_NAME } from "../data/allianceData";
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
  const [copiedDayMailId, setCopiedDayMailId] = useState<string | null>(null);
  const [copiedDayChatId, setCopiedDayChatId] = useState<string | null>(null);
  const [copiedPlanMail, setCopiedPlanMail] = useState<boolean>(false);
  const [copiedPlanChat, setCopiedPlanChat] = useState<boolean>(false);

  const toggleExpand = (id: string) => {
    setExpandedDay(expandedDay === id ? null : id);
  };

  const handleCopyDay = (day: DuelDay) => {
    const text = `📢 [Dream] БОЕВОЙ ПРИКАЗ: ${day.name.toUpperCase()} (${day.phaseName})
🎯 Главный фокус: ${day.focus}
🦅 ПРАВИЛО СОКОЛА: ${day.falconRule.title} — ${day.falconRule.description}
⛔️ СТРОГИЙ ЗАПРЕТ:
✕ ${day.forbiddenActions.join("\n✕ ")}
📊 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`;

    navigator.clipboard.writeText(text);
    setCopiedDayMailId(day.id);
    setTimeout(() => setCopiedDayMailId(null), 2500);
  };

  const handleCopyDayChat = (day: DuelDay) => {
    const text = day.shortChatTemplate || `[Dream] ${day.name}: ${day.focus}. Норма: минимум 1M очков.`;
    navigator.clipboard.writeText(text);
    setCopiedDayChatId(day.id);
    setTimeout(() => setCopiedDayChatId(null), 2500);
  };

  const handleCopyWeeklyPlan = () => {
    const planText = `📢 [Dream] ПЛАН СБРОСА РЕСУРСОВ НА НЕДЕЛЮ (ДУЭЛЬ):
📅 День 1 (Пн): Технологии & Сокол — Сдача Сокола. Улучшаем технологии и Ворона. Копим сундуки до Ср, опыт до Чт, войска до Пт.
📅 День 2 (Вт): Стройка — Качаем здания, призыв выживших. Отправка только золотых (UR) караванов/миссий. Строительные ускорения — строго в крайнем случае! Сокола копим.
📅 День 3 (Ср): Наука & Сокол — Сдача Сокола со Вт. Научные исследования, свитки, Сундуки Ворона. Нового Сокола копим на Пт!
📅 День 4 (Чт): Герои — Призыв, прокачка уровня/звезд осколками СТРОГО 1-го отряда. Сокола копим на Пт!
📅 День 5 (Пт): Войска & Сокол — Сдача всего накопленного Сокола со Ср/Чт. Тренировка войск, плоды Ворона. Оставьте универсальные ускорения на Сб!
📅 День 6 (Суббота): Лечение & Операции — Лечение, засады UR, караваны врагов. Слив остатков ускорений до нормы 1M. Щит обязательно!
📅 День 7 (Вс): Копилка — СТРОГИЙ стоп по всем тратам! Полный режим сбережения ресурсов и ускорителей на новую неделю.
🛡️ Норматив: минимум 1 000 000 очков в день! ШТАБ [Dream]`;

    navigator.clipboard.writeText(planText);
    setCopiedPlanMail(true);
    setTimeout(() => setCopiedPlanMail(false), 2500);
  };

  const handleCopyWeeklyPlanChat = () => {
    const planText = `[Dream] Неделя: Пн-Тех/Сокол | Вт-Стройка | Ср-Наука/Сокол | Чт-Герои | Пт-Войска/Сокол | Сб-Лечение | Вс-Копилка. Норма минимум 1M в день!`;
    navigator.clipboard.writeText(planText);
    setCopiedPlanChat(true);
    setTimeout(() => setCopiedPlanChat(false), 2500);
  };

  return (
    <div id="weekly-schedule-container" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Недельный Боевой Календарь Дуэли {ALLIANCE_NAME}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Жесткое недельное расписание фаз. Сдача Заданий Сокола в профильные дни: Понедельник, Среда и Пятница. В субботу — лечение войск, засады UR, бесплатные щиты и закрытие норматива.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0 w-full lg:w-auto">
          <button
            onClick={handleCopyWeeklyPlan}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-amber-600"
          >
            {copiedPlanMail ? (
              <>
                <Check className="w-4 h-4 text-white animate-in zoom-in-50 duration-200" />
                <span>План скопирован!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>Скопировать для почты Альянса</span>
              </>
            )}
          </button>
          <button
            onClick={handleCopyWeeklyPlanChat}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-300"
          >
            {copiedPlanChat ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in-50 duration-200" />
                <span className="text-emerald-700">Скопировано в чат!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Скопировать для чата</span>
              </>
            )}
          </button>
          <span className="text-xs font-mono px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold shadow-2xs text-center">
            Норматив: МИНИМУМ 1 000 000 очков
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

                  {/* Accumulation Mode Block */}
                  {day.accumulation && day.accumulation.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                      <div className="font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Накопительный режим — Что мы копим сегодня:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        {day.accumulation.map((item, i) => (
                          <div key={i} className="bg-white/80 p-2.5 rounded-lg border border-amber-100 flex flex-col justify-between shadow-3xs">
                            <div>
                              <span className="font-semibold text-slate-800 block">{item.item}</span>
                              <span className="text-[11px] text-slate-600 mt-0.5 block">{item.description}</span>
                            </div>
                            <div className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md w-fit">
                              <span className="uppercase font-mono text-[9px] text-amber-900 opacity-80">Понадобится:</span>
                              <span>{item.targetDay}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 flex-wrap gap-2">
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Ускорители:</span>{" "}
                      {day.recommendedSpeedups.join(", ")}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyDay(day)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedDayMailId === day.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Скопировано!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Скопировать для почты Альянса</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyDayChat(day)}
                        className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedDayChatId === day.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">В чат скопировано!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Скопировать для чата</span>
                          </>
                        )}
                      </button>
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
