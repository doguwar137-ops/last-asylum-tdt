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
  Activity,
  Copy,
  MessageSquare,
} from "lucide-react";
import { ALLIANCE_RULES, ALLIANCE_NAME, DUEL_QUOTA } from "../data/allianceData";

export const AllianceCodex: React.FC = () => {
  const [copiedMailRuleId, setCopiedMailRuleId] = useState<string | null>(null);
  const [copiedChatRuleId, setCopiedChatRuleId] = useState<string | null>(null);

  const handleCopyMailRule = (rule: any) => {
    const text = `ПРАВИЛО АЛЬЯНСА: ${rule.title.toUpperCase()} (${rule.badge})
Суть: ${rule.summary}
Подробности: ${rule.details}`;
    navigator.clipboard.writeText(text);
    setCopiedMailRuleId(rule.id);
    setTimeout(() => setCopiedMailRuleId(null), 2500);
  };

  const handleCopyChatRule = (rule: any) => {
    if (rule.shortText) {
      navigator.clipboard.writeText(rule.shortText);
      setCopiedChatRuleId(rule.id);
      setTimeout(() => setCopiedChatRuleId(null), 2500);
    }
  };

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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0 w-full md:w-auto">
          <div className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold shadow-2xs">
            <Flame className="w-4 h-4 text-rose-600" />
            КИК ЗА ИГНОРИРОВАНИЕ
          </div>
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
              <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-2 mt-auto pt-2">
                <button
                  onClick={() => handleCopyMailRule(rule)}
                  className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  {copiedMailRuleId === rule.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Скопировано (почта)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Для почты альянса</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleCopyChatRule(rule)}
                  className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  {copiedChatRuleId === rule.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Скопировано (чат)</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Для чата</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
