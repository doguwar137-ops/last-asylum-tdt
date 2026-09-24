import React from "react";
import {
  ShieldAlert,
  Flame,
  CheckCircle2,
  XCircle,
  Users,
  Target,
  AlertTriangle,
  Award,
  Sparkles,
  HelpCircle,
  Swords,
  HeartPulse,
  Layers,
} from "lucide-react";
import { ALLIANCE_NAME } from "../data/allianceData";

export const CheeseTrapGuide: React.FC = () => {
  return (
    <div id="cheese-trap-guide-container" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Гайд: Стратегия «Сырной Ловушки» {ALLIANCE_NAME}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Событие «Сырная ловушка» может проходить в любой день недели независимо от фаз Дуэли. Соблюдайте строгие правила участия для максимизации наград альянса и экономии войск.
          </p>
        </div>
      </div>

      {/* 4 Golden Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rule 1: Rally Creation */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Создание сборов: Только слабый герой
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            При запуске сбора на Сырную ловушку отправляйте <strong className="text-rose-700">ТОЛЬКО ОДНОГО слабого героя</strong> (синего или фиолетового качества, 1 уровня) с парой солдат (Т1 или Т2).
          </p>
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>Категорически запрещено запускать сборы основным ударным составом! Вы забьете лимит вместимости сбора для соклановцев.</span>
          </div>
        </div>

        {/* Rule 2: Joining Rallies */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Участие в штурмах: Только основной состав
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Присоединяйтесь к штурмам соклановцев <strong className="text-emerald-700">ТОЛЬКО своим основным боевым составом (1-м ударным отрядом)</strong> с максимальным уроном.
          </p>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Это позволяет нанести максимальный общий урон ловушке и забрать высшие командные ранги.</span>
          </div>
        </div>

        {/* Rule 3: Stopping Condition */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Остановка: Проверка личных наград
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Как только вы забрали максимальные личные награды (проверяется через <strong className="text-slate-900">значок подарка</strong> в интерфейсе события), <strong className="text-rose-700">СРАЗУ прекращайте участие</strong>.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>Не тратьте войска и выносливость впустую после достижения индивидуального капа наград.</span>
          </div>
        </div>

        {/* Rule 4: Positioning & R4 Buff */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-800 font-mono font-bold text-xs">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Позиционирование: Улей и офицеры R4
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Игроки ранга <strong className="text-purple-800">R4 должны стоять рядом с ловушкой</strong>, давая пассивный бонус <strong className="text-emerald-700">+5% к урону</strong> всему альянсу.
          </p>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-2">
            <Users className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
            <span>Перед началом события обязательно возвращайтесь в альянсовый улей для максимального ускорения маршей!</span>
          </div>
        </div>
      </div>

      {/* Deep Dive: Why does rally creation work this way? */}
      <div className="rounded-2xl bg-white border border-amber-200 p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Почему это работает именно так?
              </h3>
              <p className="text-xs text-slate-600">
                Тактический разбор механики создания сборов (ралли) в «Сырной ловушке»
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 w-fit">
            Основа командной тактики
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reason 1: Limit / Capacity */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700 flex-shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="leading-snug">Экономия места для соклановцев (Лимит вместимости сбора)</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Когда вы запускаете сбор (ралли), максимальный объем войск, который может в него поместиться, жестко ограничен вместимостью вашего здания сборов. Если вы отправите туда свой полноценный ударный отряд (многотысячную армию), вы забьете весь лимит своими войсками. Согильдийцы просто не смогут присоединиться к вашему сбору, из-за чего альянс в сумме наберет меньше очков.
            </p>
          </div>

          {/* Reason 2: Weak Hero */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-700 flex-shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="leading-snug">Один слабый герой 1-го уровня</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Синий или фиолетовый герой низкого уровня имеет минимальный параметр лидерства (командования). Он может взять с собой буквально крошечную горстку солдат (например, Т1 или Т2). Таким образом, ваш сбор будет считаться открытым, но внутри него будете только вы с парой солдат, а всё остальное свободное место (99%) достанется вашим союзникам.
            </p>
          </div>

          {/* Reason 3: Maximizing Personal Damage */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 flex-shrink-0">
                <Swords className="w-4 h-4" />
              </div>
              <h4 className="leading-snug">Как набивать личный урон</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Свои сильные (ударные) отряды вы должны тратить не на создание собственных сборов, а на вступление в чужие ралли (особенно к лидерам R4/R5, у которых есть бонусы к урону). Пока ваш слабый герой медленно идет пешком как «организатор» сбора, ваши сильные марши успеют несколько раз быстро сгонять в чужих сборах, нанести колоссальный урон и принести вам максимум личных наград.
            </p>
          </div>

          {/* Reason 4: Minimizing Hospital Losses */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-700 flex-shrink-0">
                <HeartPulse className="w-4 h-4" />
              </div>
              <h4 className="leading-snug">Минимизация потерь</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              В этом событии войска получают ранения. Отправляя сильного героя лидером сбора, вы рискуете забить больницу. Слабый герой с парой солдат минимизирует любые траты на лечение.
            </p>
          </div>
        </div>
      </div>

      {/* Offline Participation Banner */}
      <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base sm:text-lg font-bold text-indigo-900">
            Что делать, если нет возможности участвовать онлайн?
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-indigo-800 leading-relaxed">
          Если вы не можете присутствовать в игре в момент штурма, вы можете настроить офлайн-участие. Это позволит вашему отряду автоматически внести свой вклад в штурм, даже когда вас нет в сети.
        </p>
        
        <div className="bg-white rounded-xl p-4 border border-indigo-100">
          <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Как это сделать:</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            <li>Зайдите в событие на главном экране игры.</li>
            <li>Выберите <strong className="text-slate-900">«Сырную ловушку»</strong>.</li>
            <li>Нажмите кнопку <strong className="text-indigo-700">«Участвовать офлайн»</strong>.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
