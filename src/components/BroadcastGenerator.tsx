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
    text: `БОЕВОЙ ПРИКАЗ: ПОНЕДЕЛЬНИК (ДЕНЬ 1) — УЛУЧШЕНИЕ ВОРОНА (АКТИВНОСТЬ)

Качаем Ворона эссенцией и закрываем суточные цели активности.

Задания Сокола: сдаем задания Сокола.

Что делать сегодня (тратить / качать):
Улучшать Ворона эссенцией Ворона
Проводить штурмы
Тратить выносливость и антитоксин
Отправлять отряды на сбор ресурсов
Участвовать в Битве на выживание Ворона

Строго запрещено (копить / не трогать):
Тратить ускорители строительства (копим на вторник)
Тактический совет: Все строительные ускорения строго бережем на День 2!`,
    shortText: `ПН 1: Ворон. Задания Сокола, качаем Ворона эссенцией, штурмы. Тратим выносливость, антитоксин. Ускорители стройки копить на день 2!`,
  },
  {
    id: "tuesday",
    title: "Вторник (День 2: Стройка)",
    text: `БОЕВОЙ ПРИКАЗ: ВТОРНИК (ДЕНЬ 2) — РАЗВИТИЕ ТЕРРИТОРИИ (СТРОИТЕЛЬСТВО)

Достраиваем здания строго после старта фазы — очки дают только за клик по молотку завершения.

Задания Сокола: копим на среду (не забираем).

Что делать сегодня (тратить / качать):
Завершать стройку зданий кликом по молотку
Использовать ускорители строительства
Отправлять караваны и тайные операции
Нанимать выживших

Строго запрещено (копить / не трогать):
Забирать задания Сокола
Тратить ускорители исследований и открывать сундуки Ворона (копим на среду)
Тактический совет: Кнопку завершения построек жмите только после официального старта фазы!`,
    shortText: `ВТ 2: Стройка. Молоток жмем после старта фазы! Шлем караваны, тайные операции, нанимаем выживших. Ускорители науки копить на день 3!`,
  },
  {
    id: "wednesday",
    title: "Среда (День 3: Исследования)",
    text: `БОЕВОЙ ПРИКАЗ: СРЕДА (ДЕНЬ 3) — ТЕХНОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ

Завершаем исследования строго после открытия фазы — нажимаем кнопку завершения только сегодня.

Задания Сокола: сдаем все накопленные задания Сокола.

Что делать сегодня (тратить / качать):
Завершать исследования в институте
Использовать ускорители исследований
Открывать сундуки с высокоуровневым снаряжением Ворона
Тратить свитки обучения

Строго запрещено (копить / не трогать):
Тратить ускорители обучения (копим на пятницу)
Тактический совет: Завершайте науку только после старта фазы ради максимальных очков!`,
    shortText: `СР ДЕНЬ 3: Наука. Кнопку завершения жмем после старта. Сундуки Ворона, Задания Сокола. Ускорители обучения копить на день 5!`,
  },
  {
    id: "thursday",
    title: "Четверг (День 4: Прокачка Героев)",
    text: `БОЕВОЙ ПРИКАЗ: ЧЕТВЕРГ (ДЕНЬ 4) — РОСТ ГЕРОЯ (ПРОКАЧКА)

Качаем героев UR (максимум очков) и SSR. Фокусируемся на улучшении звезд героев только из основного состава.

Задания Сокола: копим на пятницу (не забираем).

Что делать сегодня (тратить / качать):
Качать уровень и навыки героев UR и SSR
Поднимать звездность героев основы и SR
Нанимать героев и тратить антитоксин для апов
Участвовать в Битве на выживание Героев

Строго запрещено (копить / не трогать):
Забирать задания Сокола
Тратить ускорители обучения (копим на пятницу)
Тактический совет: Звезды и опыт вкладываем строго в героев первого ударного отряда!`,
    shortText: `ЧТ ДЕНЬ 4: Герои. Качаем UR и SSR основы. Звезды SR, навыки, найм, антитоксин. Ускорители обучения копить на день 5!`,
  },
  {
    id: "friday",
    title: "Пятница (День 5: Подготовка к Войне)",
    text: `БОЕВОЙ ПРИКАЗ: ПЯТНИЦА (ДЕНЬ 5) — ПОДГОТОВКА К ВОЙНЕ

Главная задача: Тренируем и забираем солдат для максимального набора очков.

Задания Сокола: Финальный массовый сбор! Забираем все накопленные задания.

Что делать сегодня (тратить / качать):
Тренировка и забор солдат максимального ранга
Грабим чужие караваны обязательно ставим галочку Запретить караваны на этом сервере

Строго запрещено (копить / не трогать):
Оставлять войска на стенах без защитного щита на ночь

Тактический совет: На ночь обязательно ставим щит. Если щита нет, убедитесь, что убрали войска со стен!`,
    shortText: `ПТ ДЕНЬ 5: Войска. Тренируем и забираем солдат для очков. Задания Сокола, караваны. Ставим щит, нет щита — убираем войска со стен!`,
  },
  {
    id: "saturday",
    title: "Суббота (День 6: Рейд на Врага)",
    text: `БОЕВОЙ ПРИКАЗ: СУББОТА (ДЕНЬ 6) — РЕЙД НА ВРАГА (АТАКИ НА СЕРВЕР)

Отправляем караваны UR и тайные операции UR на чужие серверы. Побеждаем врагов ради очков.

Задания Сокола: копим на следующую неделю.

Что делать сегодня (тратить / качать):
Отправлять караваны UR и тайные операции UR на чужие серверы
Использовать ускорители строительства, исследований, обучения и лечения
Побеждать врагов и атаковать базы соперников

Строго запрещено (копить / не трогать):
Атаковать союзников своего сервера
Тактический совет: Чем выше ранг уничтоженных войск соперника, тем больше очков получает альянс!`,
    shortText: `СБ ДЕНЬ 6: Рейд. Караваны UR, операции UR. Тратим ускорения, крушим врагов! Щит в ночь с ПТ на СБ, нет щита — убрали войска со стен!`,
  },
  {
    id: "sunday",
    title: "Воскресенье (День 7: Режим Копилки)",
    text: `БОЕВОЙ ПРИКАЗ: ВОСКРЕСЕНЬЕ (ДЕНЬ 7) — РЕЖИМ ПОЛНОЙ КОПИЛКИ

СТОП тратам. Готовим длинные стройки и науку на понедельник.

Задания Сокола: копим на следующую неделю.

Что делать сегодня (тратить / качать):
Сбор ресурсов
Запуск долгих строек и исследований

Строго запрещено (копить / не трогать):
Забирать задания Сокола
Тратить ускорители
Тактический совет: Режим сбережения. Отдыхаем и копим ресурсы.`,
    shortText: `ВС ДЕНЬ 7: Режим копилки! СТОП тратам. Задания Сокола не забираем, ускорители не тратим. Сбор ресурсов, долгие стройки на ПН.`,
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
    title: "Предупреждение за игнор Дуэли",
    text: `ВНИМАНИЕ: ПРОВЕРКА УЧАСТИЯ В ДУЭЛИ!
Участие в ежедневных фазах Дуэли альянсов строго обязательно для каждого бойца!
Те, кто игнорирует дуэль или не закрывает суточные фазы, подлежат исключению (кику) из альянса. Проверьте ваш текущий вклад!`,
    shortText: `ВНИМАНИЕ: Проверка участия в дуэли! Игнор фаз дуэли = кик из Альянса. Закрывайте ежедневные этапы по боевому графику!`,
  },
  {
    id: "weekly_plan",
    title: "План сброса ресурсов на недельку",
    text: `ПЛАН СБРОСА РЕСУРСОВ НА НЕДЕЛЬКУ (ДУЭЛЬ):

День 1 (Пн): Улучшение Ворона (Активность) — Сдача Сокола. Улучшаем Ворона, проводим штурмы. Копим строительные ускорения!
День 2 (Вт): Развитие Территории (Строительство) — Стройка (молоток жмем после старта фазы), караваны, выжившие. Копим ускорители исследований и сундуки Ворона!
День 3 (Ср): Технологические Исследования — Сдача Сокола. Исследования (завершаем после старта), сундуки Ворона. Копим ускорители обучения!
День 4 (Чт): Рост Героя (Прокачка) — Прокачка UR и SSR героев основного состава, антитоксин. Копим ускорители обучения!
День 5 (Пт): Подготовка к Войне — Сдача всего накопленного Сокола. Тренировка войск, чужие караваны (обязательно ставим галочку запрета!). Тренируем и забираем солдат для максимального набора очков.
День 6 (Сб): Рейд на Врага — Караваны UR и операции UR на чужих серверах. Тратим ускорения (стройка, наука, войска, лечение), крушим врагов ради очков.
День 7 (Вс): Копилка — СТРОГИЙ стоп по всем тратам! Полный режим сбережения ресурсов и ускорителей на новую неделю, отдыхаем.

Важное правило на всю неделю: Универсальные ускорения в ноль не сливаем — оставляем стратегический резерв на случай экстренного лечения войск и защиты базы!`,
    shortText: `Неделя: Пн-Ворон | Вт-Стройка | Ср-Наука | Чт-Герои | Пт-Войска | Сб-Рейд | Вс-Копилка. Ежедневное участие обязательно!`,
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
              <span>Готово для рассылки на почту</span>
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
              <span>Готово для отправки в игровой чат</span>
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
