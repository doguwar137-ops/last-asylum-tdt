import React, { useState } from "react";
import {
  CheckCircle2,
  Lock,
  AlertTriangle,
  Flame,
  ArrowRight,
  RefreshCw,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export const FalconSimulator: React.FC = () => {
  const [accumulatedMissions, setAccumulatedMissions] = useState(6);
  const [selectedDay, setSelectedDay] = useState<"monday" | "tuesday" | "wednesday" | "thursday" | "friday">("monday");
  const [claimedScore, setClaimedScore] = useState<number | null>(null);
  const [mistakeWarning, setMistakeWarning] = useState<string | null>(null);

  const handleSimulateClaim = () => {
    if (selectedDay === "tuesday" || selectedDay === "thursday") {
      // Mistake! Claiming on non-profile day
      const basePoints = accumulatedMissions * 5000;
      setClaimedScore(basePoints);
      setMistakeWarning(
        `🚨 ГРУБЕЙШАЯ ОШИБКА! Вы нажали на красный кружок уведомления в ${
          selectedDay === "tuesday" ? "Вторник" : "Четверг"
        }! Вы получили всего ${basePoints.toLocaleString()} очков вместо ${ (accumulatedMissions * 75000).toLocaleString() } очков! Вы потеряли ${(accumulatedMissions * 70000).toLocaleString()} очков дуэли!`
      );
    } else {
      // Perfect profile day! Monday, Wednesday, Friday
      const profileMultiplier = selectedDay === "monday" ? 70000 : selectedDay === "wednesday" ? 75000 : 85000;
      const total = accumulatedMissions * profileMultiplier;
      setClaimedScore(total);
      setMistakeWarning(null);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const resetSimulator = () => {
    setClaimedScore(null);
    setMistakeWarning(null);
  };

  return (
    <div id="falcon-simulator-container" className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[11px] shadow-xs ring-2 ring-rose-200 animate-pulse">
              ●
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Интерактивный Тренажер: Задания Сокола
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Никогда не нажимайте на красный кружок завершенного задания Сокола сразу после завершения! Миссия никуда не исчезнет. Копим выполненные миссии: первую партию сдаем в СРЕДУ (Фаза науки), вторую партию сдаем в ПЯТНИЦУ (Фаза войск).
          </p>
        </div>

        <button
          onClick={resetSimulator}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-colors shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Сбросить симуляцию</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Шаг 1: Настройка условий симуляции</span>
          </h3>

          {/* Mission Count Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-600 font-medium">Накоплено готовых заданий в диспетчерской:</span>
              <span className="font-mono font-bold text-amber-700 text-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                {accumulatedMissions} миссий (с красным кружком)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={accumulatedMissions}
              onChange={(e) => {
                setAccumulatedMissions(Number(e.target.value));
                setClaimedScore(null);
                setMistakeWarning(null);
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>1 задание</span>
              <span>6 заданий (норма)</span>
              <span>12 заданий (максимум)</span>
            </div>
          </div>

          {/* Choose Day */}
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-2">
              Шаг 2: В какой день недели вы нажимаете на красный кружок (уведомление о завершении)?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => {
                  setSelectedDay("monday");
                  setClaimedScore(null);
                  setMistakeWarning(null);
                }}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  selectedDay === "monday"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Пн (День 1)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800 font-bold">
                    ПРОФИЛЬ
                  </span>
                </div>
                <div className="text-[11px] font-normal text-slate-500">
                  Очки первого дня
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedDay("tuesday");
                  setClaimedScore(null);
                  setMistakeWarning(null);
                }}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  selectedDay === "tuesday"
                    ? "bg-rose-50 border-rose-400 text-rose-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Вт (Стройка)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-200 text-rose-800 font-bold">
                    ОШИБКА
                  </span>
                </div>
                <div className="text-[11px] font-normal text-slate-500">
                  Копим на среду
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedDay("wednesday");
                  setClaimedScore(null);
                  setMistakeWarning(null);
                }}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  selectedDay === "wednesday"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Ср (Наука)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800 font-bold">
                    ПРОФИЛЬ 1
                  </span>
                </div>
                <div className="text-[11px] font-normal text-slate-500">
                  Сдача 1-й партии
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedDay("thursday");
                  setClaimedScore(null);
                  setMistakeWarning(null);
                }}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  selectedDay === "thursday"
                    ? "bg-rose-50 border-rose-400 text-rose-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Чт (Герои)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-200 text-rose-800 font-bold">
                    ОШИБКА
                  </span>
                </div>
                <div className="text-[11px] font-normal text-slate-500">
                  Копим на пятницу
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedDay("friday");
                  setClaimedScore(null);
                  setMistakeWarning(null);
                }}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all sm:col-span-2 ${
                  selectedDay === "friday"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Пятница (Войска)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800 font-bold">
                    ПРОФИЛЬ 2
                  </span>
                </div>
                <div className="text-[11px] font-normal text-slate-500">
                  Сдача 2-й партии (супер-очки)
                </div>
              </button>
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            id="simulate-claim-btn"
            onClick={handleSimulateClaim}
            className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
              ●
            </span>
            <span>Нажать красный кружок (Сдать задания)</span>
          </button>
        </div>

        {/* Visual Outcome Display */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-2xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <span className="text-xs font-mono uppercase font-bold text-slate-500">
                Результат в Таблице Дуэли
              </span>
              <span className="text-xs text-amber-700 font-mono font-bold">
                Норматив: 1 000 000 очков
              </span>
            </div>

            {claimedScore === null ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center text-slate-400">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
                    ●
                  </span>
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Выберите день сдачи и нажмите кнопку слева, чтобы увидеть, сколько очков вы получите или потеряете при нажатии на красный кружок.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs text-slate-500 font-mono">
                    НАЧИСЛЕНО ОЧКОВ ДУЭЛИ
                  </div>
                  <div
                    className={`text-3xl sm:text-4xl font-extrabold font-mono mt-1 ${
                      mistakeWarning ? "text-rose-600" : "text-emerald-600"
                    }`}
                  >
                    +{claimedScore.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-medium">
                    {mistakeWarning
                      ? "❌ Слив заданий вне профильного дня"
                      : "✅ Зачет по высшему профильному тарифу"}
                  </div>
                </div>

                {mistakeWarning ? (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-rose-800">
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>{mistakeWarning}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Никогда не нажимайте на красный кружок завершенного задания Сокола сразу после завершения! Миссия никуда не исчезнет. Копим выполненные миссии: первую партию сдаем в СРЕДУ (Фаза науки), вторую партию сдаем в ПЯТНИЦУ (Фаза войск).
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>ИДЕАЛЬНАЯ ШТАБНАЯ ТАКТИКА!</span>
                    </div>
                    <p className="text-slate-700">
                      Сдав накопленные задания сегодня, вы закрыли{" "}
                      <strong className="text-amber-800 font-mono">
                        {Math.min(100, Math.round((claimedScore / 1_000_000) * 100))}%
                      </strong>{" "}
                      суточного норматива дуэли (1M очков)!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick takeaway bar */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-medium flex items-center justify-between">
            <span>Среда = Партия 1 (Наука)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span>Пятница = Партия 2 (Войска)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
