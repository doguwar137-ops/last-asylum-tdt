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
  FlaskConical,
} from "lucide-react";
import { DUEL_DAYS, ALLIANCE_NAME, DUEL_QUOTA } from "../data/allianceData";
import { DuelDay } from "../types";

interface TodayDirectiveProps {
  selectedDayIndex: number;
  setSelectedDayIndex: (idx: number) => void;
  onOpenRules?: () => void;
}

export const TodayDirective: React.FC<TodayDirectiveProps> = ({
  selectedDayIndex,
  setSelectedDayIndex,
  onOpenRules,
}) => {
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);
  const currentDay: DuelDay = DUEL_DAYS[selectedDayIndex] || DUEL_DAYS[0];

  const handleCopyOrder = () => {
    const text =
      currentDay.exactMailTemplate ||
      `${currentDay.name.toUpperCase()}
${currentDay.phaseName}
Главные задачи: ${currentDay.allowedActions.join(", ")}
Дополнительно: ${currentDay.tips.join(", ")}
Строгий запрет: ${currentDay.forbiddenActions.join(", ")}`;

    navigator.clipboard.writeText(text);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2500);
  };

  const handleCopyOrderChat = () => {
    const text =
      currentDay.shortChatTemplate ||
      `${currentDay.name}: ${currentDay.focus}.`;
    navigator.clipboard.writeText(text);
    setCopiedChat(true);
    setTimeout(() => setCopiedChat(false), 2500);
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              {copiedMail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Скопировано для почты!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Скопировать для почты Альянса</span>
                </>
              )}
            </button>
            <button
              id="copy-order-chat-btn"
              onClick={handleCopyOrderChat}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              {copiedChat ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">В чат скопировано!</span>
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

        {/* Falcon Rules Hero Alert */}
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
                    ПРАВИЛА ЗАДАНИЙ СОКОЛА
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    Соколиная башня
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono flex items-center gap-1 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    🔴 Красный кружок = Выполнено
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mt-1.5 text-slate-900">
                  {currentDay.falconRule.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  {currentDay.falconRule.description}
                </p>

                {/* Clear Explanatory Step Badge for Falcon Mission mechanics */}
                <div className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed ${
                  isFalconClaimDay 
                    ? "bg-emerald-100/70 border-emerald-300 text-emerald-950" 
                    : "bg-amber-50 border-amber-300 text-amber-950"
                }`}>
                  <div className="font-extrabold flex items-center gap-1.5 mb-1.5">
                    {isFalconClaimDay ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>ИНСТРУКЦИЯ СДАЧИ: ЖМЕМ «ЗАБРАТЬ ВСЕ»</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base leading-none">🔴</span>
                        <span>ПОЧЕМУ ВАЖНО ВЫПОЛНЯТЬ, НО НЕ ЗАБИРАТЬ:</span>
                      </>
                    )}
                  </div>
                  {isFalconClaimDay ? (
                    <div className="space-y-1">
                      <p>
                        Заходите в Соколиную башню и жмите кнопку <strong>«Забрать все»</strong> по всем накопленным заданиям с <strong>красными кружками 🔴</strong>! Все накопленные очки мгновенно зачтутся в суточные цели Дуэли Альянсов!
                      </p>
                      <p className="text-emerald-900 font-bold bg-emerald-100/60 p-2 rounded-lg border border-emerald-300">
                        ⚡ <strong>Важное уточнение:</strong> если после сбора в течение дня у вас появляются новые задания в башне — обязательно отправляйте отряды, выполняйте их и сразу забирайте награды весь день до конца суток!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p>
                        <strong>1. Задания ОБЯЗАТЕЛЬНО выполнять:</strong> отправляйте отряды на все задания в башне, не давайте компасам простаивать!
                      </p>
                      <p>
                        <strong>2. Дождитесь КРАСНОГО КРУЖКА 🔴:</strong> появление красного кружка означает, что задание успешно завершено. Оно <strong>НЕ пропадет</strong> и <strong>НЕ сгорит</strong>!
                      </p>
                      <p className="text-rose-800 font-bold">
                        3. Кнопку «Забрать» НЕ трогаем! Держим все готовые миссии на карте башни до дня сдачи (например, до пятницы на фазу войск).
                      </p>
                    </div>
                  )}
                </div>

                {currentDay.falconRule.warning && (
                  <p
                    className={`text-xs font-bold mt-2.5 flex items-center gap-1.5 ${
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
                  <span className="text-rose-600 font-bold mt-0.5">-</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accumulation Mode Block */}
        {currentDay.accumulation && currentDay.accumulation.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
            <div className="font-bold text-amber-800 mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Накопительный режим — Что мы копим сегодня:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-1">
              {currentDay.accumulation.map((item, i) => (
                <div key={i} className="bg-white p-2.5 rounded-lg border border-amber-100 flex flex-col justify-between shadow-3xs">
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
                  <li key={i} className="text-xs text-slate-700 leading-relaxed flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Tech Donation & Server Policy Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-white to-amber-50 border border-sky-300 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 border border-sky-200 mt-0.5 flex-shrink-0">
            <FlaskConical className="w-5 h-5 text-sky-600" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-sky-950">ОБЯЗАТЕЛЬНЫЙ РЕГЛАМЕНТ</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                👍 Взнос строго по рекомендации
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                Дуэль: 2 000 000 очков
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
              Взносы в «Исследование альянса» делаем каждый день строго в технологию со значком «Палец вверх» 👍. 
              Грабим караваны только на чужих серверах с обязательной галочкой защиты! Сжигать соседей запрещено.
            </p>
          </div>
        </div>

        {onOpenRules && (
          <button
            onClick={onOpenRules}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-sky-700 self-stretch sm:self-auto justify-center"
          >
            <span>Правила Альянса</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Strict Cheese Trap Rules Reminder */}
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
              Штурмы запускаем ТОЛЬКО одним слабым героем! В чужие штурмы входим основой. Стоп сразу при капе наград.
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-amber-900 px-2.5 py-1 rounded bg-white border border-amber-200 shadow-2xs">
            Ежедневное участие строго обязательно
          </span>
        </div>
      </div>
    </div>
  );
};
