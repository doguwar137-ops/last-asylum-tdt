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
} from "lucide-react";
import { ALLIANCE_NAME } from "../data/allianceData";

interface CheeseTrapGuideProps {
  onOpenAiChat?: (prompt: string) => void;
}

export const CheeseTrapGuide: React.FC<CheeseTrapGuideProps> = ({ onOpenAiChat }) => {
  return (
    <div id="cheese-trap-guide-container" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Гайд: Стратегия «Сырной Ловушки» [{ALLIANCE_NAME}]
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Событие «Сырная ловушка» может проходить в любой день недели независимо от фаз Дуэли. Соблюдайте строгий протокол участия для максимизации наград альянса и экономии войск.
          </p>
        </div>

        {onOpenAiChat && (
          <button
            onClick={() =>
              onOpenAiChat(
                "Как правильно участвовать в Сырной ловушке по регламенту альянса? Напомни правила создания и входа в ралли."
              )
            }
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Спросить тактика про Ловушку</span>
          </button>
        )}
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
              Создание ралли: Только слабый герой
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            При запуске ралли на Сырную ловушку отправляйте <strong className="text-rose-700">ТОЛЬКО ОДНОГО слабого героя</strong> (синего или фиолетового качества, 1 уровня).
          </p>
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>Категорически запрещено запускать ралли основным ударным составом! Вы блокируете слот вместимости для соклановцев.</span>
          </div>
        </div>

        {/* Rule 2: Joining Rallies */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Участие в ралли: Только основной состав
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Присоединяйтесь к чужим ралли соклановцев <strong className="text-emerald-700">ТОЛЬКО своим основным боевым составом (1-й ударный отряд)</strong> с максимальным уроном.
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
    </div>
  );
};
