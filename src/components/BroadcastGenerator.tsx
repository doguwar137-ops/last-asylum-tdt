import React, { useState } from "react";
import {
  Radio,
  Copy,
  Check,
  MessageSquare,
  ShieldAlert,
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
    shortText: `[Dream] ПН: Технологии & Ворон. Сокол сдаем СЕГОДНЯ. Сундуки/опыт КОПИМ! Норма: минимум 1M очков.`,
  },
  {
    id: "tuesday",
    title: "Вторник (Стройка)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ВТОРНИК (Фаза 2 — Стройка)
🔨 Строим здания, призываем выживших и отправляем ТОЛЬКО золотые UR караваны и секретные операции!
⚡️ Ускорения строительства используем только в САМОМ КРАЙНЕМ СЛУЧАЕ! Бережем ресурсы на критические этапы!
💡 Тактика экономии: Короткие постройки закрываем бесплатно за счет помощи альянса. Крутим чужие караваны UR!
⚠️ ВАЖНО: Никогда не нажимайте на красный кружок завершенного задания Сокола сразу! Копим выполненные миссии на СРЕДУ!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
    shortText: `[Dream] ВТ: Стройка, призыв. UR караваны. Ускорения — в исключительных случаях! Сокол копим. Норма: минимум 1M очков.`,
  },
  {
    id: "wednesday",
    title: "Среда (Наука + Сокол)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: СРЕДА (Фаза 3 — Исследования)
🔬 Тратим научные ускорения, свитки знаний и Сундуки Ворона!
🔴 ВНИМАНИЕ: СЕЙЧАС кликаем на красный кружок и забираем 1-ю партию накопленных Заданий Сокола! Новые задания копим на пятницу.
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
    shortText: `[Dream] СР: Наука & Сундуки Ворона. Сдаем накопленный Сокол за ВТ! Новый Сокол копим. Норма: минимум 1M очков.`,
  },
  {
    id: "thursday",
    title: "Четверг (Развитие героев)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ЧЕТВЕРГ (Фаза 4 — Развитие Героев)
🎟️ Тратим накопленные билеты/крутки призыва для призыва новых героев!
⭐ Повышаем звездность осколками и качаем навыки СТРОГО у 1-го (основного) отряда!
⚡️ Вливаем банки опыта СТРОГО in героев своего главного ударного состава!
⚠️ Задания Сокола не трогаем — красный кружок держим до пятницы!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
    shortText: `[Dream] ЧТ: Призыв & прокачка Героев 1 отряда. Сокол копим на завтра! Норма: минимум 1M очков.`,
  },
  {
    id: "friday",
    title: "Пятница (Войска + Сокол 2)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ПЯТНИЦА (Фаза 5 — Войска и Усиление)
🔥 ЗАБИРАЕМ 2-Ю ПАРТИЮ ЗАДАНИЙ СОКОЛА! Кликаем по красному кружку всех накопленных миссий! Крутим чужие караваны, активируем эссенции Ворона, обучаем бойцов по схеме TZ->TY->TX!
📊 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)! Проверьте свой счет!`,
    shortText: `[Dream] ПТ: Тренируем топовые войска, жмем плоды Ворона. Сдаем весь накопленный Сокол! Норма: минимум 1M очков.`,
  },
  {
    id: "saturday",
    title: "Суббота (Лечение & Засады UR)",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: СУББОТА (Фаза 6 — Лечение & Операции)
🩹 Лечим войска, проводим засады UR и грабим чужие караваны UR!
🛡 ВАЖНО: Обязательно активируйте БЕСПЛАТНЫЕ щиты из малого замка!
⚡️ Сливаем оставшиеся универсальные ускорители для добора очков!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!`,
    shortText: `[Dream] СБ: Лечение, засады UR, караваны врагов. Купол/щит обязательно! Норма: минимум 1M очков.`,
  },
  {
    id: "sunday",
    title: "Воскресенье (Копилка)",
    text: `📢 [Dream] РЕЖИМ КОПИЛКИ: ВОСКРЕСЕНЬЕ (Подготовка)
🛡 Полный стоп на трату ускоров и сундуков. Фармим ресурсы обычной энергией. Готовимся к понедельнику!`,
    shortText: `[Dream] ВС: Полная копилка! СТОП тратам. Готовим длинные стройки/науку на ПН. Режим сбережения. Норма: минимум 1M очков.`,
  },
  {
    id: "cheese_trap_alert",
    title: "🧀 Правила Сырной Ловушки",
    text: `📢 [Dream] БОЕВОЙ ПРИКАЗ: ПРАВИЛА СЫРНОЙ ЛОВУШКИ!
🧀 Запуск сборов: СТРОГО одним слабым героем (синим/фиолетовым)! Основу не ставить!
⚔️ Вход в штурмы: Вступаем ТОЛЬКО своим основным ударным составом!
🛑 Остановка: Как только забрали лимит личных наград — СРАЗУ СТОП, войска бережем!
📍 Игрокам R4: держаться рядом с ловушкой (+5% к урону альянса).`,
    shortText: `[Dream] Сырная Ловушка: сбор СТРОГО 1 слабым героем! Заходим основой. Взяли награды - СТОП! R4 рядом с ловушкой.`,
  },
  {
    id: "quota_warning",
    title: "⚠️ Предупреждение о Кике (<1M)",
    text: `⚠️ [Dream] ВНИМАНИЕ: ПРОВЕРКА НОРМАТИВА ДУЭЛИ!
🎯 Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!
Те, кто игнорирует дуэль или не закрывает суточный норматив, подлежат исключению (кику) из альянса. Проверьте ваш текущий счет!`,
    shortText: `[Dream] Проверка суточного норматива дуэли (минимум 1М очков). Кто не закрывает - подлежит кику из Альянса!`,
  },
];

export const BroadcastGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(PRESET_BROADCASTS[0]);
  const [broadcastText, setBroadcastText] = useState(PRESET_BROADCASTS[0].text);
  const [shortBroadcastText, setShortBroadcastText] = useState(PRESET_BROADCASTS[0].shortText);
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);

  const handleSelectTemplate = (tpl: typeof PRESET_BROADCASTS[0]) => {
    setSelectedTemplate(tpl);
    setBroadcastText(tpl.text);
    setShortBroadcastText(tpl.shortText);
  };

  const handleCopyMail = () => {
    navigator.clipboard.writeText(broadcastText);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2500);
  };

  const handleCopyChat = () => {
    navigator.clipboard.writeText(shortBroadcastText);
    setCopiedChat(true);
    setTimeout(() => setCopiedChat(false), 2500);
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0 w-full md:w-auto">
          <button
            onClick={handleCopyMail}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer border border-amber-600"
          >
            {copiedMail ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Приказ скопирован!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>Скопировать для почты Альянса</span>
              </>
            )}
          </button>
          <button
            onClick={handleCopyChat}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors shadow-xs cursor-pointer border border-slate-300"
          >
            {copiedChat ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">В чат скопировано!</span>
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
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-amber-50 border-amber-400 text-amber-950 shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{tpl.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor and AI Customizer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mail Version Editor */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Полный приказ (для почты Альянса, редактируемый):
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Символов: {broadcastText.length}
                </span>
              </div>

              <textarea
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                rows={6}
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 leading-relaxed resize-none shadow-inner"
              />
            </div>

            {/* Footer Mail */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Готово для рассылки на почту [Dream]</span>
              <button
                onClick={handleCopyMail}
                className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedMail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать для почты Альянса</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Chat Version Editor */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Ультракороткий приказ (для чата, до 132 симв.):
                </span>
                <span className={`text-xs font-mono font-bold ${shortBroadcastText.length > 132 ? "text-rose-600" : "text-emerald-600"}`}>
                  {shortBroadcastText.length} / 132 симв.
                </span>
              </div>

              <textarea
                value={shortBroadcastText}
                onChange={(e) => setShortBroadcastText(e.target.value)}
                rows={3}
                className={`w-full p-4 rounded-xl bg-slate-50 border text-xs sm:text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none leading-relaxed resize-none shadow-inner ${
                  shortBroadcastText.length > 132 ? "border-rose-300 focus:border-rose-500 bg-rose-50/10" : "border-slate-200 focus:border-amber-500"
                }`}
              />
              {shortBroadcastText.length > 132 && (
                <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 mt-1">
                  <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
                  Внимание: Текст превышает лимит чата в 132 символа! Сократите перед отправкой.
                </p>
              )}
            </div>

            {/* Footer Chat */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Готово для отправки в игровой чат [Dream]</span>
              <button
                onClick={handleCopyChat}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedChat ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать для чата</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
