import React, { useState } from "react";
import {
  ShieldAlert,
  FlaskConical,
  Flame,
  Ban,
  Copy,
  Check,
  ThumbsUp,
  AlertTriangle,
  Target,
  Sparkles,
  Shield,
  Eye,
  Award,
  Crown,
  Compass,
  ShieldCheck,
  CheckSquare,
  Square,
} from "lucide-react";
import { ALLIANCE_NAME, ALLIANCE_LEADERSHIP } from "../data/allianceData";

export const AllianceRules: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [copiedRuleId, setCopiedRuleId] = useState<string | null>(null);
  const [defenseDemoState, setDefenseDemoState] = useState<"on" | "off">("on");

  const [showMemoPreview, setShowMemoPreview] = useState(false);

  const memoText = `ПАМЯТКА БОЙЦА АЛЬЯНСА ${ALLIANCE_NAME}:
1. ВЗНОСЫ В НАУКУ: каждый день! Меню Альянс -> Исследование альянса -> Вносить СТРОГО туда, где значок 👍 (палец вверх).
2. ДУЭЛЬ АЛЬЯНСОВ: норматив минимум 2.000.000 очков в день от каждого! Закрывайте ежедневные этапы по графику.
3. СОКОЛИНАЯ БАШНЯ: ОБЯЗАТЕЛЬНО отправляйте отряды на задания каждый день до появления КРАСНОГО КРУЖКА 🔴 (красный кружок означает, что задание выполнено). Заранее награды НЕ забираем — копим готовые задания до ПЯТНИЦЫ. В пятницу нажимаем «Забрать все», а если в течение всей пятницы появляются еще задания — обязательно их тоже выполняем и сразу забираем весь день ради очков Дуэли Альянсов!
4. КАРАВАНЫ И СЕКРЕТКИ: грабим ТОЛЬКО чужие серверы! Обязательно галочка «Запретить караваны на этом сервере».
5. МИР НА СЕРВЕРЕ: сжигать соседей нашего сервера КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО, даже если они вас ограбили!
6. ЩИТЫ МИРА: всю неделю (с воскресенья по пятницу) щиты НЕ тратим — копим на войну! В субботу (с 05:00 утра субботы до 05:00 воскресенья по МСК) идет рейд вражеских серверов: щит ОБЯЗАТЕЛЕН! Если щита нет — снимайте войска со стен замка!
7. ОБОРОНА ГОРОДА И «ОСАДА НЕЖИТИ»: Перед стартом события ОБЯЗАТЕЛЬНО верните ВСЕ отряды домой (со сбора ресурсов и со штурмов)! В момент начала все войска должны быть на базе. В меню База -> «Подкрепление» -> «Гарнизон» -> «Настроить оборону города» СТАВИМ галочки ✅ «Присоединиться к обороне», чтобы защищать святилище. В обычное время и перед субботней войной галочки ⬜ ОБЯЗАТЕЛЬНО СНИМАЕМ, чтобы враги не перебили всю армию!`;

  const handleCopyNewbieMemo = () => {
    navigator.clipboard.writeText(memoText);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  const handleCopyRule = (title: string, text: string, id: string) => {
    navigator.clipboard.writeText(`${title}\n${text}`);
    setCopiedRuleId(id);
    setTimeout(() => setCopiedRuleId(null), 2500);
  };

  return (
    <div id="alliance-rules-container" className="space-y-6">
      {/* Alliance Hero Banner & Official Leadership */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-6 sm:p-8 border border-amber-500/30 shadow-xl relative overflow-hidden space-y-6">
        {/* Subtle decorative glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Официальные Правила {ALLIANCE_NAME}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 font-mono text-xs font-bold">
                Норматив Дуэли: 2 000 000 очков
              </span>
              <span className="px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold flex items-center gap-1">
                <ThumbsUp className="w-3 h-3 text-sky-400" /> Взносы по рекомендации 👍
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Правила Альянса & Инструкция для Новичков
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Все базовые законы, дисциплина, порядок взносов в исследования, правила грабежей и обороны базы. 
              Соблюдение этих правил гарантирует взрывной рост вашего аккаунта, силу альянса и безопасность вашего места в клане.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto flex-shrink-0">
            <button
              onClick={handleCopyNewbieMemo}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer border border-amber-300/40 hover:scale-[1.02]"
            >
              {copiedMemo ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Памятка новичка скопирована!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  <span>Скопировать памятку для чата</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowMemoPreview((prev) => !prev)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-amber-200 text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>{showMemoPreview ? "Скрыть текст памятки" : "Посмотреть текст памятки"}</span>
            </button>
          </div>
        </div>

        {/* Memo Full Preview Card */}
        {showMemoPreview && (
          <div className="relative z-10 p-5 rounded-2xl bg-slate-950/95 border-2 border-amber-400/40 text-slate-100 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-sm">📋</span>
                <div>
                  <h4 className="font-extrabold text-amber-200 text-sm tracking-wide">
                    Официальный текст памятки бойца {ALLIANCE_NAME}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Готовый понятный текст для копирования в игровой чат или личные сообщения
                  </p>
                </div>
              </div>
              <button
                onClick={handleCopyNewbieMemo}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                {copiedMemo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMemo ? "Скопировано!" : "Скопировать"}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-200 leading-relaxed bg-black/50 p-4 rounded-xl border border-white/10 select-all font-mono">
              {memoText}
            </pre>
          </div>
        )}

        {/* Leadership & Officers Display (Strictly from screenshot) */}
        <div className="relative z-10 pt-5 border-t border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300">
                <Crown className="w-4 h-4 text-amber-400" />
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold text-amber-200 uppercase tracking-wider font-mono">
                Командование Альянса & Должности
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Руководство [tDt] Dream
            </span>
          </div>

          <div className="rounded-2xl bg-slate-950/80 border border-amber-500/20 p-4 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Leader R5 */}
              <div className="flex items-center gap-3 bg-white/5 border border-amber-400/30 px-4 py-2.5 rounded-xl w-full sm:w-auto">
                <span className="px-2 py-1 rounded-md bg-amber-500 text-slate-950 font-black text-xs">
                  {ALLIANCE_LEADERSHIP.leader.rank}
                </span>
                <div>
                  <div className="font-extrabold text-white text-sm font-mono">
                    {ALLIANCE_LEADERSHIP.leader.name}
                  </div>
                  <div className="text-[11px] text-amber-300">Лидер Альянса</div>
                </div>
              </div>

              {/* 4 Officers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full sm:w-auto flex-1">
                {ALLIANCE_LEADERSHIP.officers.map((officer) => (
                  <div
                    key={officer.role}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center"
                  >
                    <div className="text-[11px] font-bold text-amber-300">
                      {officer.role}
                    </div>
                    <div className="text-xs font-mono font-bold text-white mt-0.5">
                      {officer.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "all", label: "Все Правила" },
          { id: "garrison", label: "🛡️ Оборона и Галочки", badge: "ВАЖНО" },
          { id: "falcon", label: "🦅 Соколиная Башня (🔴 Кружок)", badge: "ВАЖНО" },
          { id: "donations", label: "🧪 Взносы в науку (👍)", badge: "ОБЯЗАТЕЛЬНО" },
          { id: "duel", label: "⚔️ Дуэль 2.000.000", badge: "НОРМАТИВ" },
          { id: "caravans", label: "🚫 Грабежи и Сервер", badge: "МИР" },
          { id: "shields", label: "🛡️ Щиты & Рейд СБ", badge: "05:00 МСК" },
          { id: "cheese", label: "🧀 Сырная Ловушка" },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-amber-600 text-white shadow-xs scale-[1.01]"
                  : "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && !isActive && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: Mandatory Daily Tech Donations (Взносы в исследования альянса) */}
      {(activeFilter === "all" || activeFilter === "donations") && (
        <div id="rule-donations" className="rounded-3xl bg-white border-2 border-sky-400 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-sky-100 text-sky-700">
                <FlaskConical className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-200">
                    ПРАВИЛО №1 • СТРОГИЙ ПРИОРИТЕТ
                  </span>
                  <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> ВНОСИТЬ ТОЛЬКО ПО 👍
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Ежедневные Обязательные Взносы в Исследования Альянса
                </h2>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyRule(
                  "ПРАВИЛО АЛЬЯНСА: ВЗНОСЫ В ИССЛЕДОВАНИЯ",
                  "Меню Альянс -> Исследование альянса -> Вносить СТРОГО туда, где стоит значок «Палец вверх» 👍! Сливайте все доступные попытки каждый день!",
                  "tech_copy"
                )
              }
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRuleId === "tech_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>Скопировать правило</span>
            </button>
          </div>

          {/* Text Step-by-Step Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">ШАГ 1</span>
                <span className="text-[10px] text-slate-400 font-mono">Меню Альянса</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Кнопка «Исследование альянса»</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Нажмите на кнопку с синей колбой <strong className="text-slate-800">«Исследование альянса»</strong> в главном меню альянса (рядом с магазином и помощью).
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">ШАГ 2</span>
                <span className="text-[10px] text-rose-600 font-bold">ОБЯЗАТЕЛЬНО</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Ищем значок «Палец вверх» 👍</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                В окне <strong className="text-slate-800">«Технологии альянса»</strong> найдите исследование, отмеченное значком <strong className="text-amber-700">«Палец вверх» 👍</strong>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">ШАГ 3</span>
                <span className="text-[10px] text-emerald-700 font-mono">Ежедневно</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Вносить все попытки</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Вносите <strong className="text-slate-800">СТРОГО в эту технологию</strong> все доступные попытки каждый день!
              </p>
            </div>
          </div>

          {/* Explanation: Why is this so vital? */}
          <div className="rounded-2xl bg-sky-50/70 border border-sky-200 p-4 sm:p-5 space-y-3">
            <h4 className="text-sm font-extrabold text-sky-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              Почему категорически нельзя вносить в случайные ветки наугад?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-white border border-sky-100 space-y-1">
                <strong className="text-rose-700 block">❌ Если каждый вносит куда попало:</strong>
                <p>
                  В альянсе 100 участников. Если все 100 человек хаотично раскидывают взносы по 20 разным технологиям, прогресс распыляется, и ни одна технология не завершится месяцами.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-sky-100 space-y-1">
                <strong className="text-emerald-700 block">✅ Когда все 100 бьют в цель по значку 👍:</strong>
                <p>
                  Руководство альянса выставляет значок 👍 на самую нужную сейчас технологию (скорость стройки, науки, защита складов). Весь клан закрывает её за пару дней, получая колоссальный бафф!
                </p>
              </div>
            </div>
            <div className="text-xs text-sky-900 font-medium bg-sky-100/70 p-2.5 rounded-xl">
              💡 <strong>Совет для новичка:</strong> Попытки взносов восстанавливаются непрерывно. Заходите в раздел технологий в течение дня и прожимайте все доступные взносы!
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Mandatory Alliance Duel (Норматив 2.000.000 очков) */}
      {(activeFilter === "all" || activeFilter === "duel") && (
        <div id="rule-duel" className="rounded-3xl bg-white border-2 border-amber-400 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                    ПРАВИЛО №2 • БОЕВОЙ НОРМАТИВ
                  </span>
                  <span className="text-xs text-rose-600 font-bold">КИК ЗА ИГНОРИРОВАНИЕ</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Обязательное Участие в Дуэли Альянсов: Минимум 2.000.000 Очков в День
                </h2>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyRule(
                  "ПРАВИЛО АЛЬЯНСА: ДУЭЛЬ АЛЬЯНСОВ",
                  "Норматив Дуэли Альянсов: МИНИМУМ 2.000.000 очков в день от каждого бойца! Соблюдайте недельный график сброса ресурсов. Игнорирование дуэли = исключение из Альянса.",
                  "duel_copy"
                )
              }
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRuleId === "duel_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>Скопировать правило</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Дуэль Альянсов — это основа жизни клана {ALLIANCE_NAME}. За победу в суточных фазах и недельной дуэли 
                каждый боец получает <strong className="text-slate-900">сундуки 9-го уровня</strong> с миллионами ресурсов, осколками героев, 
                алмазами и ценнейшими предметами развития.
              </p>
              
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="font-extrabold text-amber-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  Как легко закрывать норматив 2 000 000 очков без доната?
                </div>
                <p className="leading-relaxed">
                  Главный секрет — <strong className="text-amber-950">РЕЖИМ КОПИЛКИ</strong>. Не сливайте ускорители и сундуки когда вздумается! 
                  Тратьте ресурсы строго в их профильные дни:
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] pt-1">
                  <li className="bg-white/80 p-2 rounded-lg border border-amber-200"><strong>ПН:</strong> Задания Сокола + эссенции</li>
                  <li className="bg-white/80 p-2 rounded-lg border border-amber-200"><strong>ВТ:</strong> Стройка (клик по молотку)</li>
                  <li className="bg-white/80 p-2 rounded-lg border border-amber-200"><strong>СР:</strong> Наука + сундуки Ворона</li>
                  <li className="bg-white/80 p-2 rounded-lg border border-amber-200"><strong>ЧТ:</strong> Прокачка героев + звезды</li>
                  <li className="bg-white/80 p-2 rounded-lg border border-amber-200"><strong>ПТ:</strong> Тренировка войск + Сокол</li>
                  <li className="bg-white/80 p-2 rounded-lg border border-amber-200"><strong>СБ:</strong> Рейд, билеты выживших, ускоры</li>
                </ul>
              </div>
            </div>

            {/* Quota Gauge Card */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white p-5 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200">Суточный минимум</span>
                <div className="text-3xl font-black font-mono tracking-tight mt-1">2 000 000</div>
                <div className="text-xs text-amber-100 font-medium">очков каждый день от каждого бойца</div>
              </div>
              <div className="border-t border-amber-400/40 pt-3 mt-4 text-[11px] text-amber-100/90 leading-relaxed">
                ⚠️ Игроки, которые не проявляют активности или системно игнорируют суточные фазы дуэли, подлежат исключению (кику) из альянса.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Caravan Plunder and Server Peace Policy (Грабежи караванов и секреток) */}
      {(activeFilter === "all" || activeFilter === "caravans") && (
        <div id="rule-caravans" className="rounded-3xl bg-white border-2 border-rose-400 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-100 text-rose-700">
                <Ban className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200">
                    ПРАВИЛО №3 • ПОЛИТИКА СЕРВЕРА
                  </span>
                  <span className="text-xs text-rose-600 font-bold">СТРОГИЙ ЗАПРЕТ АТАКИ СОСЕДЕЙ</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Правила Грабежа Караванов и Секреток: Мир на Своем Сервере
                </h2>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyRule(
                  "ПРАВИЛО АЛЬЯНСА: ГРАБЕЖ КАРАВАНОВ И МИР НА СЕРВЕРЕ",
                  "1. СТРОЖАЙШИЙ ЗАПРЕТ трогать караваны/секретки нашего сервера — грабим ТОЛЬКО чужие серверы! 2. На карте жмем иконку каравана (второй значок сверху) -> ОБЯЗАТЕЛЬНО ставим галочку «Запретить караваны на этом сервере». 3. КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО сжигать соседей нашего сервера, даже если они вас ограбили!",
                  "caravan_copy"
                )
              }
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRuleId === "caravan_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>Скопировать правило</span>
            </button>
          </div>

          {/* Text-Only Rules List */}
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">1. Грабим ТОЛЬКО чужие серверы</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Караваны и секретные операции разрешено грабить <strong>исключительно на чужих серверах</strong>. Нападать на караваны игроков нашего сервера строго запрещено!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">2. Обязательная галочка «Запретить караваны на этом сервере»</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Выйдите на карту мира. В левой части экрана найдите вертикальный столбец круглых иконок: нажмите на <strong>иконку каравана (второй значок сверху)</strong>, чтобы открыть окно «Караванная торговля».
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                В открывшемся окне обязательно включите пункт <strong>«Запретить караваны на этом сервере»</strong> (активная зеленая галочка). Без этой галочки в списке случайно окажется соседский караван с нашего сервера. Нападение на соседа вызовет ответный гнев чужого клана и ненужную междоусобицу на сервере. С галочкой вы физически бьете только чужой сервер!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">3. Категорически запрещено сжигать соседей в ответ</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Если сосед с нашего сервера ограбил ваш караван или атаковал — <strong>не нападайте и не сжигайте его базу в ответ!</strong> Междоусобные войны ослабляют весь сервер.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">4. Используйте все 4 попытки грабежа ежедневно</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Каждый день доступно 4 бесплатные попытки грабежа. Обязательно используйте их все — это бесплатные миллионы ресурсов (железо, древесина, золото) и очки в Дуэль Альянсов.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Shield Strategy and Saturday Raid (Режим щитов) */}
      {(activeFilter === "all" || activeFilter === "shields") && (
        <div id="rule-shields" className="rounded-3xl bg-white border-2 border-purple-400 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-100 text-purple-700">
                <ShieldAlert className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                    ПРАВИЛО №4 • БЕЗОПАСНОСТЬ БАЗЫ
                  </span>
                  <span className="text-xs text-purple-700 font-bold">СУББОТА 05:00 - ВОСКРЕСЕНЬЕ 05:00 МСК</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Режим Щитов и Защита Войск в Рейде
                </h2>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyRule(
                  "ПРАВИЛО АЛЬЯНСА: РЕЖИМ ЩИТОВ И РЕЙД",
                  "С воскресенья по пятницу щиты НЕ ставим — экономим и копим их! В субботу с 05:00 до 05:00 воскресенья по МСК идет рейд: щит обязателен на 24 часа. Если щита нет — СНЯТЬ войска со стен!",
                  "shield_copy"
                )
              }
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRuleId === "shield_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>Скопировать правило</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Воскресенье — Пятница</span>
              <h4 className="text-sm font-extrabold text-slate-900">ЩИТЫ НЕ СТАВИТЬ! КОПИМ!</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                В будние дни нападения на базу минимальны. Тратить дефицитные щиты мира впустую строго запрещено — они понадобятся на 24-часовой ад субботней войны.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-700 uppercase">Суббота 05:00 — Воскресенье 05:00 МСК</span>
              <h4 className="text-sm font-extrabold text-rose-950">ЩИТ ОБЯЗАТЕЛЕН НА 24 ЧАСА!</h4>
              <p className="text-xs text-rose-900 leading-relaxed">
                Со всех серверов прилетают вражеские «киты». Базы без щитов сжигаются за секунды! 
                <strong> Если щита нет:</strong> <span className="underline font-bold">НЕМЕДЛЕННО СНЯТЬ ВОЙСКА СО СТЕН</span> (убрать гарнизон: снять все галочки «Присоединиться к обороне»), чтобы враги не перебили ваших солдат в лазаретах!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Defense Squads & Garrison Checkmarks (Защита святилища, Осада нежити vs Война) */}
      {(activeFilter === "all" || activeFilter === "garrison") && (
        <div id="rule-garrison" className="rounded-3xl bg-white border-2 border-indigo-500 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-700">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-300">
                    БОЕВОЙ РЕГЛАМЕНТ • ОБОРОНА ГОРОДА И СВЯТИЛИЩА
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono flex items-center gap-1 shadow-2xs">
                    ✅ ОСАДА НЕЖИТИ: ГАЛОЧКИ СТАВИМ
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono flex items-center gap-1 shadow-2xs">
                    ⬜ СУББОТА / МИР: ГАЛОЧКИ СНИМАЕМ
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Защита Святилища и Гарнизон: Настройка Обороны Города (Галочки)
                </h2>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyRule(
                  "ПРАВИЛО АЛЬЯНСА: ОБОРОНА ГОРОДА И ГАЛОЧКИ",
                  "1. ВЕРНУТЬ ВСЕ ОТРЯДЫ ДОМОЙ: до старта «Осады нежити» обязательно отзовите все войска со сбора ресурсов и из штурмов! Все отряды должны быть на базе!\n2. Как зайти: База на карте -> кнопка «Подкрепление» -> синяя кнопка «Гарнизон» -> меню «Настроить оборону города».\n3. СТАВИМ ГАЛОЧКИ ✅ «Присоединиться к обороне»: ТОЛЬКО во время события «Осада нежити»! Наши отряды защищают и отбивают святилище от волн зомби.\n4. СНИМАЕМ ГАЛОЧКИ ⬜ (пустые квадратики): Во все обычные дни и ОБЯЗАТЕЛЬНО перед субботней войной! Это спасает войска от гибели: если на вас нападет враг, отряды не выйдут на убой на стены, и солдаты останутся живыми!",
                  "garrison_copy"
                )
              }
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRuleId === "garrison_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>Скопировать правило</span>
            </button>
          </div>

          {/* CRITICAL CALLOUT: Squads must be recalled to base before event starts */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-950 space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2 font-black text-sm text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>ГЛАВНОЕ ТРЕБОВАНИЕ: Вернуть все отряды на базу ДО начала «Осады нежити»!</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              Перед стартом события <strong>ОБЯЗАТЕЛЬНО отзовите все свои отряды со сбора ресурсов на карте и из всех штурмов</strong>. 
              Когда начинается Осада нежити, <strong>все отряды должны находиться дома на базе</strong>! 
              Если ваш отряд в этот момент собирает ресурсы или застрял в чужом походе, он физически не сможет занять оборону стен, не защитит святилище, и зомби разорят замок.
            </p>
            <div className="p-2.5 rounded-xl bg-white/90 border border-amber-300 text-xs font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-rose-600 font-extrabold text-sm flex-shrink-0">⚠️ АЛГОРИТМ:</span>
              <span>1. Отзываем все отряды домой ➔ 2. Ставим галочки [✅] во всех отрядах ➔ 3. Защищаем и отбиваем святилище ➔ 4. После окончания события снимаем все галочки [⬜]!</span>
            </div>
          </div>

          {/* Core Contrast: When ON vs When OFF */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-md bg-emerald-600 text-white flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5" /> ГАЛОЧКИ СТАВИМ [✅]
                </span>
                <span className="text-xs font-bold text-emerald-800">СОБЫТИЕ «ОСАДА НЕЖИТИ»</span>
              </div>
              <h4 className="text-sm font-bold text-emerald-950">Защищаем и отбиваем святилище</h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Когда запускается событие <strong>«Осада нежити»</strong> или идет оборона святилища от орд зомби (и все отряды уже вернулись на базу!), 
                мы <strong>ОБЯЗАТЕЛЬНО ставим все 4 галочки</strong> напротив каждого отряда! 
                Наши солдаты выходят на защиту, отбивают атаки нежити, спасают святилище и забирают топовые сундуки наград.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/80 border-2 border-rose-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-md bg-rose-600 text-white flex items-center gap-1.5">
                  <Square className="w-3.5 h-3.5" /> ГАЛОЧКИ СНИМАЕМ [⬜]
                </span>
                <span className="text-xs font-bold text-rose-800">ВОЙНА В СУББОТУ И МИРНЫЕ ДНИ</span>
              </div>
              <h4 className="text-sm font-bold text-rose-950">Спасаем армию от уничтожения</h4>
              <p className="text-xs text-rose-900 leading-relaxed">
                <strong>СНИМАЕМ галочки во всё обычное время и СТРОГО перед Субботой (Войной серверов)!</strong> 
                Если на базу без щита нападет сильный игрок, отряды на стенах будут намертво перебиты, а армия уничтожена. 
                Со <strong>снятыми галочками</strong> отряды не вступают в бой на стенах, враг заберет лишь крохи ресурсов, а <strong>все ваши солдаты останутся живыми</strong>!
              </p>
            </div>
          </div>

          {/* 4 Step Visual Guide */}
          <div>
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-500 mb-3">
              Пошаговая инструкция настройки в игре (по скриншотам):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">ШАГ 1</span>
                <h5 className="text-sm font-bold text-slate-900">Возврат войск и клик по базе</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Обязательно верните все отряды домой (со сбора ресурсов и из штурмов)! Затем нажмите на свой замок на карте мира.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">ШАГ 2</span>
                <h5 className="text-sm font-bold text-slate-900">Кнопка «Подкрепление»</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  В появившемся круговом меню действий нажмите круглую кнопку <strong>«Подкрепление»</strong> (человечек со щитом).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">ШАГ 3</span>
                <h5 className="text-sm font-bold text-slate-900">Синяя кнопка «Гарнизон»</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  В открывшемся окне гарнизона нажмите большую синюю кнопку <strong>«Гарнизон»</strong> в самом низу окна.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">ШАГ 4</span>
                <h5 className="text-sm font-bold text-slate-900">Управление галочками</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  В меню <strong>«Настроить оборону города»</strong> напротив каждого отряда переключайте <strong>«Присоединиться к обороне»</strong>: галочка [✅] для Осады нежити, пусто [⬜] перед субботой!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive In-Game UI Demonstration (Mirroring Screenshots 4 & 5) */}
          <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 space-y-4 shadow-lg border border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                  ИНТЕРАКТИВНЫЙ ТРЕНАЖЕР ЭКРАНА ИГРЫ
                </span>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Окно: «Настроить оборону города»</span>
                </h4>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setDefenseDemoState("on")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    defenseDemoState === "on"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Осада нежити (Все ✅)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDefenseDemoState("off")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    defenseDemoState === "off"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Суббота / Мир (Все ⬜ сняты)</span>
                </button>
              </div>
            </div>

            {/* Squads List matching Screenshots */}
            <div className="space-y-2.5">
              {[
                { num: 1, name: "Отряд 1", power: "8,608,385" },
                { num: 2, name: "Отряд 2", power: "5,847,573" },
                { num: 3, name: "Отряд 3", power: "4,882,753" },
                { num: 4, name: "Отряд 4", power: "4,120,400" },
              ].map((squad) => (
                <div
                  key={squad.num}
                  className={`p-3 sm:p-4 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    defenseDemoState === "on"
                      ? "bg-slate-800/90 border-emerald-500/60"
                      : "bg-slate-800/50 border-slate-700 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700 text-slate-300 font-mono font-bold text-xs flex items-center justify-center">
                      {squad.num}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{squad.name}</span>
                        <span className="text-[11px] font-mono text-amber-400">⚔️ {squad.power}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {defenseDemoState === "on" ? "🟢 В строю на защите стен и святилища" : "💤 Спит в казарме (в бой на стенах не вступает)"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                      Присоединиться к обороне:
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm border transition-all ${
                        defenseDemoState === "on"
                          ? "bg-emerald-500 text-white border-emerald-400 shadow-xs"
                          : "bg-slate-700 text-slate-500 border-slate-600"
                      }`}
                    >
                      {defenseDemoState === "on" ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-300 flex items-center justify-between border-t border-slate-800 font-mono flex-wrap gap-2">
              <span>Отряды обороны города сразятся с противником в порядке 1-4!</span>
              <span className={defenseDemoState === "on" ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {defenseDemoState === "on" ? "🛡️ Оборона активна (Осада нежити)" : "⚠️ Оборона отключена — Войска в безопасности!"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: Cheese Trap & Squad Rules */}
      {(activeFilter === "all" || activeFilter === "cheese") && (
        <div id="rule-cheese" className="rounded-3xl bg-white border-2 border-emerald-400 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700">
                <Flame className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ПРАВИЛО №5 • РЕГЛАМЕНТ ШТУРМОВ
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">СОХРАНЕНИЕ ВОЙСК</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Стратегия «Сырной Ловушки» и Правила Штурмов
                </h2>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyRule(
                  "ПРАВИЛО АЛЬЯНСА: СЫРНАЯ ЛОВУШКА",
                  "1. Штурм запускаем ТОЛЬКО 1 слабым героем (синим/фиолетовым). Основу не ставить! 2. В штурмы соклановцев вступаем ТОЛЬКО 1-м ударным составом. 3. Остановка сразу при капе личных наград.",
                  "cheese_copy"
                )
              }
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRuleId === "cheese_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>Скопировать правило</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-rose-700">1. Запуск штурма</span>
              <h4 className="text-sm font-bold text-slate-900">Только 1 слабый герой</h4>
              <p className="text-xs text-slate-600">
                Запускайте штурм синим или фиолетовым героем 1 уровня. Ни в коем случае не основой — вы займете место урона для соклановцев!
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-700">2. Вход в штурмы</span>
              <h4 className="text-sm font-bold text-slate-900">Только 1-й боевой состав</h4>
              <p className="text-xs text-slate-600">
                Присоединяйтесь к штурмам союзников своим самым сильным отрядом с максимальным уроном для ускорения победы.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-700">3. Лимит наград</span>
              <h4 className="text-sm font-bold text-slate-900">Стоп при капе подарка</h4>
              <p className="text-xs text-slate-600">
                Как только значок подарка показывает, что личные суточные награды получены — прекращайте атаки, чтобы не сливать войска.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: Falcon Tower & Red Circle Mechanics (Соколиная башня и Красный кружок) */}
      {(activeFilter === "all" || activeFilter === "falcon") && (
        <div id="rule-falcon" className="rounded-3xl bg-white border-2 border-emerald-500 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Compass className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ПРАВИЛО №6 • СОКОЛИНАЯ БАШНЯ
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono flex items-center gap-1 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    🔴 КРАСНЫЙ КРУЖОК = ВЫПОЛНЕНО
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Правила Соколиной Башни: Механика Красного Кружка 🔴 и График Сдачи
                </h2>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopyRule(
                  "ПРАВИЛО АЛЬЯНСА: СОКОЛИНАЯ БАШНЯ И КРАСНЫЙ КРУЖОК",
                  "1. ВЫПОЛНЯТЬ ОБЯЗАТЕЛЬНО КАЖДЫЙ ДЕНЬ: отправляем отряды на все задания в башне, не даем компасам сгорать!\n2. КРАСНЫЙ КРУЖОК 🔴 = ГОТОВО: когда задание выполнено, появляется красный кружок. Задание НЕ пропадет и НЕ сгорит со сбросом дня!\n3. В ДНИ НАКОПЛЕНИЯ (Четверг, Вторник): кнопку «Забрать» НЕ трогаем! Держим готовые с красным кружком.\n4. В ДНИ СДАЧИ (Пятница, Среда, Понедельник): заходим в башню и жмем «Забрать все» по всем красным кружкам ради взрыва очков в Дуэли!",
                  "falcon_copy"
                )
              }
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedRuleId === "falcon_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>Скопировать правило</span>
            </button>
          </div>

          {/* Core Confusion Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-black text-sm text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Главная ошибка новичков: в чем разница между «Выполнить» и «Забрать»?</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              Многие соклановцы рассуждают так: <em>«Раз сегодня четверг и очки за Сокола не идут, значит Соколиную башню вообще не трогаем»</em>. 
              <strong> Это грубейшая ошибка!</strong> Если вы не запускаете задания, компасы (энергия) переполняются и пропадают даром, новые задания не появляются, а к пятнице у вас будет пустая башня и 0 очков!
            </p>
            <div className="p-2.5 rounded-xl bg-white/80 border border-amber-300 text-xs font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-rose-600 font-extrabold text-sm">💡 ЗОЛОТОЕ ПРАВИЛО:</span>
              <span>Задания выполняем <strong>КАЖДЫЙ ДЕНЬ</strong> до красного кружка 🔴, а нажимаем «Забрать» — <strong>ТОЛЬКО В ДЕНЬ СДАЧИ (Пятница, Среда, Понедельник)</strong>!</span>
            </div>
          </div>

          {/* 4 Detail Walkthrough Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-mono font-bold text-sky-700 flex items-center gap-1">
                <span>1. ОБЯЗАТЕЛЬНО ВЫПОЛНЯТЬ</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Тратьте компасы каждый день</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Отправляйте отряды на задания всегда, когда есть компасы. Если не выполнять задания, новые не появятся, а энергия сгорит впустую.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-rose-200 space-y-1.5">
              <div className="text-xs font-mono font-bold text-rose-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                <span>2. КРАСНЫЙ КРУЖОК 🔴</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Знак успешного финиша</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Красный кружок означает, что отряд закончил миссию. Задание выполнено и безопасно сохранено на карте. <strong>Оно НЕ пропадет со временем!</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-amber-200 space-y-1.5">
              <div className="text-xs font-mono font-bold text-amber-700 flex items-center gap-1">
                <span>3. В ЧЕТВЕРГ НЕ ЗАБИРАЕМ</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Бережем для Дуэли</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                В четверг идет день Героев. За Сокола очков не дают. Если забрать награду в четверг — вы потеряете сотни тысяч очков дуэли клана.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-emerald-200 space-y-1.5">
              <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
                <span>4. В ПЯТНИЦУ СДАЕМ И КРУТИМ ВЕСЬ ДЕНЬ!</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Забираем всё и продолжаем весь день</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                В пятницу (фаза войск) открываем башню и жмем «Забрать все» (лавина очков дуэли!). <strong>Важно: если после этого в течение всей пятницы появляются новые задания — отправляем отряды, выполняем и сразу забираем награды весь день!</strong> Все очки пойдут в зачет Дуэли.
              </p>
            </div>
          </div>

          {/* Weekly Falcon Cycle Schedule */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 p-4 space-y-2">
            <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-emerald-950 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              Расписание работы с Соколиной Башней по дням недели:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 font-mono text-[11px] pt-1">
              <div className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 shadow-2xs">
                <div className="font-extrabold text-emerald-700">ПН (День 1)</div>
                <div className="text-[10px] mt-0.5 text-slate-600">Сдача Сокола (Забрать все) 🟢</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-rose-300 text-rose-900 shadow-2xs">
                <div className="font-extrabold text-rose-700">ВТ (День 2)</div>
                <div className="text-[10px] mt-0.5 text-slate-600">Выполняем до 🔴, НЕ забираем 🔒</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 shadow-2xs">
                <div className="font-extrabold text-emerald-700">СР (День 3)</div>
                <div className="text-[10px] mt-0.5 text-slate-600">Сдача Сокола (Забрать все) 🟢</div>
              </div>
              <div className="p-2 rounded-xl bg-white border-2 border-rose-500 text-rose-950 shadow-2xs bg-rose-50/50">
                <div className="font-extrabold text-rose-700 flex items-center gap-1">
                  <span>ЧТ (День 4)</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </div>
                <div className="text-[10px] mt-0.5 text-rose-900 font-bold">Выполняем ВСЕ до 🔴, НЕ забираем! Копим на ПТ! 🔒</div>
              </div>
              <div className="p-2 rounded-xl bg-white border-2 border-emerald-500 text-emerald-950 shadow-2xs bg-emerald-50/50">
                <div className="font-extrabold text-emerald-700 flex items-center gap-1">
                  <span>ПТ (День 5)</span>
                  <span className="text-xs">🎉</span>
                </div>
                <div className="text-[10px] mt-0.5 text-emerald-900 font-bold">ФИНАЛЬНЫЙ СБОР! Забираем всё + новые задания крутим и сдаем весь день! 🟢</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-300 text-slate-800 shadow-2xs">
                <div className="font-extrabold text-slate-700">СБ (День 6)</div>
                <div className="text-[10px] mt-0.5 text-slate-600">Рейд / Выполняем до 🔴</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-amber-300 text-amber-900 shadow-2xs">
                <div className="font-extrabold text-amber-700">ВС (День 7)</div>
                <div className="text-[10px] mt-0.5 text-slate-600">Выполняем до 🔴, копим на ПН 🔒</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
