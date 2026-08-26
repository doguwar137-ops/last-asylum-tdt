import React, { useState } from "react";
import {
  Radio,
  Copy,
  Check,
  Sparkles,
  Flame,
  Send,
  MessageSquare,
  ShieldAlert,
  Loader2,
  FileText,
} from "lucide-react";
import { ALLIANCE_NAME } from "../data/allianceData";

const PRESET_BROADCASTS = [
  {
    id: "monday",
    title: "Понедельник (Технологии & Сокол)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ПОНЕДЕЛЬНИК (Фаза 1: Технологии, Ворон & Сокол)
🎯 Главный фокус: Исследование технологий, улучшение Ворона (плоды, эссенция), квесты «Сокол», выносливость, сбор ресурсов на плитках.
🦅 ЗАДАНИЯ СОКОЛА: Выполнять и сдавать — забирайте выполненные миссии Сокола в понедельник для получения очков дуэли первого дня.
⛔️ СТРОГИЙ ЗАПРЕТ: Открывать сундуки и плоды Ворона (строго НЕ открываем, копим до среды!)
📊 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
  },
  {
    id: "tuesday",
    title: "Вторник (Стройка)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ВТОРНИК (Фаза 2 — Стройка)
🔨 Строительные ускорители и ресурсы, которые мы копили всю неделю, тратим сегодня!
💡 Тактика экономии: Короткие постройки пускаем и закрываем бесплатно за счет помощи альянса. Долгие здания достраиваем накопленными ускорителями! Крутим чужие UR-караваны!
⚠️ ВАЖНО: Никогда не нажимайте на красный кружок завершенного задания Сокола сразу! Копим выполненные миссии на СРЕДУ!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
  },
  {
    id: "wednesday",
    title: "Среда (Наука + Сокол)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: СРЕДА (Фаза 3 — Исследования)
🔬 Тратим научные ускорения, свитки знаний и Сундуки Ворона!
🔴 ВНИМАНИЕ: СЕЙЧАС кликаем на красный кружок и забираем 1-ю партию накопленных Заданий Сокола! Новые задания копим на пятницу.
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
  },
  {
    id: "thursday",
    title: "Четверг (Развитие героев)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ЧЕТВЕРГ (Фаза 4 — Развитие Героев)
⚡️ Вливаем банки опыта, осколки и навыки СТРОГО в главный ударный состав!
⚠️ Задания Сокола не трогаем — красный кружок держим до пятницы!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
  },
  {
    id: "friday",
    title: "Пятница (Войска + Сокол 2)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ПЯТНИЦА (Фаза 5 — Войска и Усиление)
🔥 ЗАБИРАЕМ 2-Ю ПАРТИЮ ЗАДАНИЙ СОКОЛА! Кликаем по красному кружку всех накопленных миссий! Крутим чужие караваны, активируем эссенции Ворона, обучаем бойцов по схеме TZ->TY->TX!
📊 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)! Проверьте свой счет!`,
  },
  {
    id: "saturday",
    title: "Суббота (Лечение & Засады UR)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: СУББОТА (Фаза 6 — Лечение & Операции)
🩹 Лечим войска, проводим засады UR и грабим чужие караваны UR!
🛡 ВАЖНО: Обязательно активируйте БЕСПЛАТНЫЕ щиты из малого замка!
⚡️ Сливаем оставшиеся универсальные ускорители для добора очков!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
  },
  {
    id: "sunday",
    title: "Воскресенье (Копилка)",
    text: `📢 [Dream] РЕЖИМ КОПИЛКИ: ВОСКРЕСЕНЬЕ (Подготовка)
🛡 Полный стоп на трату ускоров и сундуков. Фармим ресурсы обычной энергией. Готовимся к понедельнику!`,
  },
  {
    id: "cheese_trap_alert",
    title: "🧀 Правила Сырной Ловушки",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ПРАВИЛА СЫРНОЙ ЛОВУШКИ!
🧀 Запуск сборов: СТРОГО одним слабым героем (синим/фиолетовым)! Основу не ставить!
⚔️ Вход в штурмы: Вступаем ТОЛЬКО своим основным ударным составом!
🛑 Остановка: Как только забрали лимит личных наград — СРАЗУ СТОП, войска бережем!
📍 Игрокам R4: держаться рядом с ловушкой (+5% к урону альянса).`,
  },
  {
    id: "quota_warning",
    title: "⚠️ Предупреждение о Кике (<1M)",
    text: `⚠️ [Dream] ВНИМАНИЕ: ПРОВЕРКА НОРМАТИВА ДУЭЛИ!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!
Те, кто игнорирует дуэль или не закрывает суточный норматив, подлежат исключению (кику) из альянса. Проверьте ваш текущий счет!`,
  },
];

export const BroadcastGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(PRESET_BROADCASTS[0]);
  const [broadcastText, setBroadcastText] = useState(PRESET_BROADCASTS[0].text);
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (tpl: typeof PRESET_BROADCASTS[0]) => {
    setSelectedTemplate(tpl);
    setBroadcastText(tpl.text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(broadcastText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="broadcast-generator-container" className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Штабной Генератор Приказов {ALLIANCE_NAME}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Инструмент для офицеров и лидеров: готовые форматированные объявления для вставки в игровой чат, Telegram или Discord в один клик.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Скопировано в буфер!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-white" />
              <span>Скопировать приказ</span>
            </>
          )}
        </button>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates Selector */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 space-y-2 shadow-xs">
          <h3 className="text-xs font-mono font-bold uppercase text-slate-500 mb-3 tracking-wider">
            Шаблоны по дням и событиям:
          </h3>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {PRESET_BROADCASTS.map((tpl) => {
              const isSelected = selectedTemplate.id === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-amber-50 border-amber-400 text-amber-950 shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{tpl.title}</span>
                  {tpl.id === "skverna_ban" && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200 font-mono">
                      АЛЕРТ
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor and AI Customizer */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                Текст боевого приказа (редактируемый):
              </span>
              <span className="text-xs font-mono text-slate-400">
                Символов: {broadcastText.length}
              </span>
            </div>

            <textarea
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              rows={8}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 leading-relaxed resize-none shadow-inner"
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Готово для отправки в игровой чат [Dream]</span>
              <button
                onClick={handleCopy}
                className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Быстрое копирование</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
