import React, { useState } from "react";
import { Copy, Check, Radio, Send, ShieldAlert, Sparkles, FileText, MessageSquare } from "lucide-react";
import { DUEL_DAYS, ALLIANCE_NAME } from "../data/allianceData";

interface BroadcastPreset {
  id: string;
  title: string;
  text: string;
  shortText: string;
}

const PRESET_BROADCASTS: BroadcastPreset[] = [
  {
    id: "monday",
    title: "Понедельник (День 1: Ворон & Активность)",
    text: `БОЕВОЙ ПРИКАЗ: ПОНЕДЕЛЬНИК ДЕНЬ 1
Улучшение Ворона Активность
Главные задачи: Выполняем Задания Сокола и улучшаем Ворона эссенцией Ворона ради максимума очков. Проводим штурмы.
Дополнительно: Тратим выносливость, используем антитоксин, отправляем отряды на сбор. Участвуем в Битве на выживание Ворона.
Строгий запрет: Сохраняем любые ускорители строительства на День 2!`,
    shortText: `Задания Сокола, качаем Ворона эссенцией, проводим штурмы. Тратим выносливость, антитоксин. Ускорители стройки копить на день 2!`,
  },
  {
    id: "tuesday",
    title: "Вторник (День 2: Стройка)",
    text: `БОЕВОЙ ПРИКАЗ: ВТОРНИК ДЕНЬ 2
Развитие Территории Строительство
Главные задачи: Достраиваем здания строго после старта фазы — очки дают за нажатие на молоток завершения, а не когда таймер дошел до нуля. Отправляем караваны и тайные операции, нанимаем выживших.
Дополнительно: Используем ускорители строительства и поднимаем мощь зданий.
Строгий запрет: Сохраняем ускорители исследований и сундуки Ворона на День 3!`,
    shortText: `Молоток завершения жмем после старта фазы! Шлем караваны, тайные операции, выживших. Ускорители исследований копить на день 3!`,
  },
  {
    id: "wednesday",
    title: "Среда (День 3: Исследования)",
    text: `БОЕВОЙ ПРИКАЗ: СРЕДА ДЕНЬ 3
Технологические Исследования
Главные задачи: Завершаем исследования строго после открытия фазы — нажимаем кнопку завершения только сегодня. Открываем сундуки с высокоуровневым снаряжением Ворона, выполняем Задания Сокола.
Дополнительно: Используем ускорители исследований, поднимаем мощь технологий, тратим свитки обучения.
Строгий запрет: Сохраняем ускорители обучения на День 5!`,
    shortText: `Завершение науки жмем после старта фазы. Открываем сундуки Ворона, делаем Задания Сокола. Ускорители обучения копить на день 5!`,
  },
  {
    id: "thursday",
    title: "Четверг (День 4: Прокачка Героев)",
    text: `БОЕВОЙ ПРИКАЗ: ЧЕТВЕРГ ДЕНЬ 4
Рост Героя Прокачка
Главные задачи: Качаем героев UR максимум очков и SSR. Фокусируемся на улучшении звезд героев только из основного состава.
Дополнительно: Нанимаем героев, качаем звездность SR, используем антитоксин для апов, улучшаем навыки. Участвуем в Битве на выживание Героев.
Строгий запрет: Сохраняем ускорители обучения на День 5!`,
    shortText: `Качаем UR и SSR героев основы. Нанимаем героев, поднимаем звездность SR, качаем навыки. Ускорители обучения копить на день 5!`,
  },
  {
    id: "friday",
    title: "Пятница (День 5: Войска)",
    text: `БОЕВОЙ ПРИКАЗ: ПЯТНИЦА ДЕНЬ 5
Подготовка к Войне Супер День Войска
Главная задача: Собираем войска строго после старта фазы.
Задания Сокола: Финальный массовый сбор! Забираем все накопленные задания.
Активности дня: Используем плоды и эссенции Ворона, грабим чужие караваны обязательно ставим галочку Запретить караваны на этом сервере.
Строгий запрет: Не сливаем универсальные ускорители в ноль — оставляем резерв!`,
    shortText: `Собираем войска после старта. Сдаем Задания Сокола. Плоды/эссенция Ворона, грабим караваны (галочка Запретить караваны на сервере!).`,
  },
  {
    id: "saturday",
    title: "Суббота (День 6: Рейд на Врага)",
    text: `БОЕВОЙ ПРИКАЗ: СУББОТА ДЕНЬ 6
Рейд на Врага Атаки на сервер
Главные задачи: Отправляем караваны UR и тайные операции UR на чужие серверы.
Дополнительно: Используем ускорители строительства, исследований, обучения и лечения. Побеждаем врагов чем выше ранг уничтоженных войск соперника, тем больше очков.`,
    shortText: `Караваны UR и тайные операции UR на чужие серверы. Тратим ускорители (стройка, наука, войска, лечение). Крушим врагов ради очков!`,
  },
  {
    id: "sunday",
    title: "Воскресенье (День 7: Режим Копилки)",
    text: `БОЕВОЙ ПРИКАЗ: ВОСКРЕСЕНЬЕ ДЕНЬ 7
Сброс и Режим Полной Копилки
Главные задачи: Полный stop на трату ценных предметов.
Дополнительно: Сбор ресурсов, запуск долгих строек и исследований.
Строгий запрет: Забирать задания Сокола, тратить ускорители!`,
    shortText: `День 7: Копилка. Полный стоп по всем тратам! Запуск долгих строек и исследований на новую неделю.`,
  },
  {
    id: "cheese_trap_alert",
    title: "Правила Сырной Ловушки",
    text: `БОЕВОЙ ПРИКАЗ: ПРАВИЛА СЫРНОЙ ЛОВУШКИ!
Запуск сборов: СТРОГО одним слабым героем (синим/фиолетовым)! Основу не ставить!
Вход в штурмы: Вступаем ТОЛЬКО своим основным ударным составом!
Остановка: Как только забрали лимит личных наград - СРАЗУ СТОП, войска бережем!
Игрокам R4: держаться рядом с ловушкой (+5% к урону альянса).
Офлайн-участие: Если нет в игре во время штурма, жмите в событии «Участвовать офлайн».`,
    shortText: `ЛОВУШКА: Сбор слабым героем! Участвуем только основным. Стоп при капе наград! Нет онлайн? Жми в событии «Участвовать офлайн».`,
  },
  {
    id: "quota_warning",
    title: "Предупреждение о Кике (<1M)",
    text: `ВНИМАНИЕ: ПРОВЕРКА НОРМАТИВА ДУЭЛИ!
Норматив дуэли: МИНИМУМ 1 000 000 очков на сегодня (суточный)!
Те, кто игнорирует дуэль или не закрывает суточный норматив, подлежат исключению (кику) из альянса. Проверьте ваш текущий счет!`,
    shortText: `Проверка суточного норматива дуэли (минимум 1М очков). Кто не закрывает - подлежит кику из Альянса!`,
  }
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
