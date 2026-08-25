import React, { useState, useEffect, useMemo } from "react";
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Flame,
  RotateCcw,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CALCULATOR_CATEGORIES, DUEL_QUOTA, ALLIANCE_NAME } from "../data/allianceData";

export const DuelCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    CALCULATOR_CATEGORIES.forEach((cat) => {
      initial[cat.id] = cat.defaultVal;
    });
    return initial;
  });

  const [hasCelebrated, setHasCelebrated] = useState(false);

  const totalPoints = useMemo(() => {
    return CALCULATOR_CATEGORIES.reduce((acc, cat) => {
      const val = inputs[cat.id] || 0;
      return acc + val * cat.pointsPerUnit;
    }, 0);
  }, [inputs]);

  const percentage = Math.min(150, Math.round((totalPoints / DUEL_QUOTA) * 100));
  const isGoalReached = totalPoints >= DUEL_QUOTA;

  useEffect(() => {
    if (isGoalReached && !hasCelebrated) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setHasCelebrated(true);
    } else if (!isGoalReached && hasCelebrated) {
      setHasCelebrated(false);
    }
  }, [isGoalReached, hasCelebrated]);

  const handleInputChange = (id: string, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [id]: Math.max(0, value),
    }));
  };

  const applyPreset = (preset: "minimum" | "zero" | "elite") => {
    const updated: Record<string, number> = {};
    if (preset === "zero") {
      CALCULATOR_CATEGORIES.forEach((cat) => (updated[cat.id] = 0));
    } else if (preset === "minimum") {
      CALCULATOR_CATEGORIES.forEach((cat) => (updated[cat.id] = cat.defaultVal));
    } else if (preset === "elite") {
      CALCULATOR_CATEGORIES.forEach((cat) => (updated[cat.id] = Math.round(cat.defaultVal * 2)));
    }
    setInputs(updated);
  };

  return (
    <div id="duel-calculator-container" className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Калькулятор Очков Дуэли [tDt]
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Рассчитайте ваши очки за неделю. Жесткий норматив альянса — минимум{" "}
            <strong className="text-amber-700 font-mono font-bold">МИНИМУМ 1 000 000 очков</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => applyPreset("minimum")}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 transition-colors shadow-2xs"
          >
            Базовый план (1M+)
          </button>
          <button
            onClick={() => applyPreset("elite")}
            className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-colors shadow-2xs"
          >
            Элита (2M+)
          </button>
          <button
            onClick={() => applyPreset("zero")}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-300 transition-colors shadow-2xs"
            title="Сбросить все"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress & Milestone Banner */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 transition-all shadow-2xs ${
          isGoalReached
            ? "bg-emerald-50/70 border-emerald-300"
            : "bg-rose-50/70 border-rose-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
              ИТОГОВЫЙ ПРОГНОЗ ОЧКОВ
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span
                className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                  isGoalReached ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {totalPoints.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-slate-600 font-medium">
                из {DUEL_QUOTA.toLocaleString()} очков ({percentage}%)
              </span>
            </div>
          </div>

          <div>
            {isGoalReached ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <div>
                  <div>ЛИМИТ {ALLIANCE_NAME} ВЫПОЛНЕН!</div>
                  <div className="text-[11px] text-emerald-800 font-normal">
                    Исключение не грозит. Отличная боевая работа!
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold flex items-center gap-2.5 shadow-2xs">
                <AlertTriangle className="w-5 h-5 text-rose-700 flex-shrink-0" />
                <div>
                  <div>НЕДОБОР: {(DUEL_QUOTA - totalPoints).toLocaleString()} ОЧКОВ</div>
                  <div className="text-[11px] text-rose-800 font-normal">
                    Внимание: Риск исключения из альянса!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3.5 p-0.5 border border-slate-300 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isGoalReached
                ? "bg-gradient-to-r from-amber-500 to-emerald-500"
                : "bg-gradient-to-r from-rose-500 to-amber-500"
            }`}
            style={{ width: `${Math.min(100, (totalPoints / DUEL_QUOTA) * 100)}%` }}
          />
        </div>

        {/* Milestone marks */}
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 font-medium">
          <span>0 (Старт)</span>
          <span>500k (Половина)</span>
          <span className="text-amber-700 font-bold">1 000 000 (Минимальный порог [tDt])</span>
          <span className="text-emerald-700 font-bold">1.5M+ (Топ)</span>
        </div>
      </div>

      {/* Input Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CALCULATOR_CATEGORIES.map((cat) => {
          const count = inputs[cat.id] || 0;
          const points = count * cat.pointsPerUnit;

          return (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {cat.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    +{cat.pointsPerUnit.toLocaleString()} очков / {cat.unit}
                  </div>
                </div>
                <div className="text-right flex-shrink-0 font-mono text-xs font-bold text-amber-700">
                  +{points.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={count}
                  onChange={(e) => handleInputChange(cat.id, Number(e.target.value))}
                  className="w-24 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-mono font-bold text-slate-900 text-center focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-slate-600">{cat.unit}</span>

                <div className="flex items-center gap-1 ml-auto">
                  <button
                    onClick={() => handleInputChange(cat.id, Math.max(0, count - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleInputChange(cat.id, count + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
