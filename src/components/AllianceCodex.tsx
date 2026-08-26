import React, { useState } from "react";
import {
  ShieldAlert,
  AlertOctagon,
  Ban,
  PiggyBank,
  CheckCircle2,
  Users,
  Clock,
  Flame,
  Check,
  Shield,
  Activity,
  Copy,
} from "lucide-react";
import { ALLIANCE_RULES, ALLIANCE_NAME, DUEL_QUOTA } from "../data/allianceData";

export const AllianceCodex: React.FC = () => {
  const [copiedRuleId, setCopiedRuleId] = useState<string | null>(null);
  const [readinessChecks, setReadinessChecks] = useState<Record<string, boolean>>({
    quota_understood: true,
    falcon_lock: true,
    cheese_trap: false,
    naked_squad: false,
    rat_timer: false,
    caravan_safe: false,
    help_limits: false,
  });

  const handleCopyRule = (rule: any) => {
    const text = `📢 [Dream] ПРАВИЛО АЛЬЯНСА: ${rule.title.toUpperCase()} (${rule.badge})
🎯 Суть: ${rule.summary}
ℹ️ Подробности: ${rule.details}`;
    navigator.clipboard.writeText(text);
    setCopiedRuleId(rule.id);
    setTimeout(() => setCopiedRuleId(null), 2500);
  };

  const toggleCheck = (key: string) => {
    setReadinessChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(readinessChecks).filter(Boolean).length;
  const totalCount = Object.keys(readinessChecks).length;

  return (
    <div id="alliance-codex-container" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Кодекс и Дисциплина Альянса {ALLIANCE_NAME}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Законы выживания и доминирования в Last Asylum: Plague. Соблюдение этих правил гарантирует победу альянса и безопасность вашего места в клане.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold shadow-2xs">
          <Flame className="w-4 h-4 text-rose-600" />
          КИК ЗА ИГНОРИРОВАНИЕ
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALLIANCE_RULES.map((rule) => {
          return (
            <div
              key={rule.id}
              className={`rounded-2xl border p-5 transition-all shadow-2xs ${
                rule.severity === "CRITICAL"
                  ? "bg-white border-rose-300 hover:border-rose-400"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md tracking-wide ${
                    rule.severity === "CRITICAL"
                      ? "bg-rose-100 text-rose-800 border border-rose-200"
                      : "bg-amber-100 text-amber-900 border border-amber-200"
                  }`}
                >
                  {rule.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-bold">
                  {ALLIANCE_NAME}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                {rule.title}
              </h3>
              <p className="text-xs text-amber-800 font-semibold mt-1">
                {rule.summary}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed border-t border-slate-100 pt-2 mb-4">
                {rule.details}
              </p>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleCopyRule(rule)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  {copiedRuleId === rule.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Скопировать для чата</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disciplinary Compliance Checklist */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" />
              <span>Личный чек-лист готовности бойца [tDt]</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Отметьте пункты, которые вы подтверждаете и строго соблюдаете
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-2xs">
            Готовность: {completedCount}/{totalCount}
          </span>
        </div>

        <div className="space-y-2.5">
          <label
            onClick={() => toggleCheck("quota_understood")}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer text-xs transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                readinessChecks.quota_understood
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "bg-white border-slate-300 text-transparent"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 font-medium">
              Я обязуюсь закрывать <strong className="text-amber-800 font-bold">суточный норматив МИНИМУМ 1 000 000 очков</strong> в текущей Дуэли Альянсов.
            </span>
          </label>

          <label
            onClick={() => toggleCheck("falcon_lock")}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer text-xs transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                readinessChecks.falcon_lock
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "bg-white border-slate-300 text-transparent"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 font-medium">
              Я никогда не нажимаю на красный кружок завершенного задания Сокола сразу: первую партию сдаю в СРЕДУ (Наука), вторую — в ПЯТНИЦУ (Войска).
            </span>
          </label>

          <label
            onClick={() => toggleCheck("cheese_trap")}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer text-xs transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                readinessChecks.cheese_trap
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "bg-white border-slate-300 text-transparent"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 font-medium">
              Я соблюдаю правила Сырной Ловушки: создаю сборы одним слабым героем, захожу основой в штурмы соклановцев и останавливаюсь при капе наград.
            </span>
          </label>

          <label
            onClick={() => toggleCheck("naked_squad")}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer text-xs transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                readinessChecks.naked_squad
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "bg-white border-slate-300 text-transparent"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 font-medium">
              Я держу 100% фокус ресурсов на 1-м ударном отряде, а остальные слоты маршей использую только для сбора ресурсов на карте.
            </span>
          </label>

          <label
            onClick={() => toggleCheck("rat_timer")}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer text-xs transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                readinessChecks.rat_timer
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "bg-white border-slate-300 text-transparent"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 font-medium">
              Я помню про общий сбор на Битву с Крысой и буду следить за расписанием, объявленным лидерами альянса.
            </span>
          </label>

          <label
            onClick={() => toggleCheck("caravan_safe")}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer text-xs transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                readinessChecks.caravan_safe
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "bg-white border-slate-300 text-transparent"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 font-medium">
              Я обязуюсь грабить караваны только на других серверах и поставил галочку <strong className="text-amber-800 font-bold">«Запретить караваны на этом сервере»</strong>.
            </span>
          </label>

          <label
            onClick={() => toggleCheck("help_limits")}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer text-xs transition-colors"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                readinessChecks.help_limits
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "bg-white border-slate-300 text-transparent"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800 font-medium">
              Я буду помогать согильдийцам и ходить в штурмы даже при исчерпанном лимите наград, чтобы приносить очки дуэли альянсу.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
