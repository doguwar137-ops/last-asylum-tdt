import React, { useState } from "react";
import {
  Users,
  Shield,
  Swords,
  Sparkles,
  AlertOctagon,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
} from "lucide-react";
import { FIRST_SQUAD_HEROES, ALLIANCE_NAME } from "../data/allianceData";
import { HeroInfo } from "../types";

export const HeroTactics: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<HeroInfo>(FIRST_SQUAD_HEROES[0]);

  return (
    <div id="hero-tactics-container" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Swords className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Тактика Отрядов и Героев {ALLIANCE_NAME}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            100% инвестиций — в Главный Ударный Отряд. Количество слотов марша растет с уровнем базы, но все боевые ресурсы, опыт и экипировка UR идут строго в один ударный кулак. Остальные отряды — сборщики ресурсов.
          </p>
        </div>
      </div>

      {/* Myth Buster Alert Card */}
      <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 sm:p-5 text-slate-800 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-rose-200 text-rose-800 flex-shrink-0">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-200/80 text-rose-900 border border-rose-300 uppercase font-mono">
              РАЗРУШЕНИЕ ОПАСНОГО МИФА
            </span>
            <h3 className="text-sm sm:text-base font-bold text-rose-900 mt-1">
              Миф: «Снятие и повторное надевание экипировки дает очки в Дуэль» — ЛОЖЬ!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
              Не тратьте время на снятие и переодевание шмоток во время дуэли! Игра начисляет очки <strong className="text-amber-800 font-bold">только за реальное повышение уровня героев, звездности (осколков) и ковку/улучшение качества снаряжения в кузнице</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 1st Strike Squad Showcase */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-amber-700 tracking-wider">
              ГЛАВНАЯ УДАРНАЯ СИЛА {ALLIANCE_NAME}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Первый Ударный Отряд: Полный Состав
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 font-mono font-bold">
            5/5 Героев
          </span>
        </div>

        {/* Hero selection cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {FIRST_SQUAD_HEROES.map((hero) => {
            const isSelected = selectedHero.id === hero.id;
            return (
              <button
                key={hero.id}
                id={`hero-card-${hero.id}`}
                onClick={() => setSelectedHero(hero)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-amber-50 border-amber-400 shadow-xs scale-[1.01]"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80"
                }`}
              >
                <div
                  className={`w-full h-20 rounded-xl bg-gradient-to-br ${hero.avatarBg} p-2 flex flex-col justify-between mb-2.5 relative overflow-hidden shadow-2xs`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-black/60 text-amber-300">
                      #{hero.priorityScore}
                    </span>
                    {hero.urEquipment && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-900 font-bold">
                        UR
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-white drop-shadow">
                    {hero.name.split(" ")[0]}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 truncate">
                  {hero.name}
                </div>
                <div className="text-[11px] text-amber-800 font-semibold truncate mt-0.5">
                  {hero.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Hero Detailed View */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {selectedHero.name}
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-mono">
                  Позиция: {selectedHero.position}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                  Приоритет #{selectedHero.priorityScore}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {selectedHero.elementOrType} • {selectedHero.role}
              </p>
            </div>

            {selectedHero.urEquipment && (
              <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-xs text-amber-900 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{selectedHero.urEquipment}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h5 className="font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" /> Ключевые навыки:
              </h5>
              <ul className="space-y-1.5 text-slate-700">
                {selectedHero.keySkills.map((sk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>{sk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" /> Фокус снаряжения & Тактика:
              </h5>
              <p className="text-slate-700 leading-relaxed mb-2">
                {selectedHero.gearFocus}
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed shadow-2xs">
                <strong className="text-amber-800">Штабная заметка: </strong>
                {selectedHero.tacticalNote}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Squad Doctrine: Single Main Strike Squad Rule */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase font-bold text-slate-500">
              ДОКТРИНА ОТРЯДОВ И МАРШЕЙ
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Доктрина Ударного Кулака: 1 Главный Отряд + Марши-Сборщики
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Количество слотов марша в игре увеличивается по мере развития штаба. Однако ключевой боевой принцип гласит: <strong className="text-slate-900">все дефицитные ресурсы, опыт и топовое снаряжение UR вкладываются строго в один главный ударный состав</strong>. Все остальные отряды служат чисто рабочими «мулами» для сбора ресурсов на глобальной карте.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <div className="font-bold text-rose-700 mb-1 flex items-center gap-1">
              <XCircle className="w-4 h-4 text-rose-600" /> 0% Банок опыта в мулов
            </div>
            <p className="text-slate-600 leading-relaxed">
              Любая банка опыта или осколок, потраченные на вспомогательные отряды сбора — это прямой урон вашему главному отряду и распыление боевой мощи.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <div className="font-bold text-rose-700 mb-1 flex items-center gap-1">
              <XCircle className="w-4 h-4 text-rose-600" /> Без редкой экипировки
            </div>
            <p className="text-slate-600 leading-relaxed">
              Золотое правило: «Один боевой слот — один герой». Вкладываем 100% пыли и золота в выбранную деталь UR до макс. уровня, не распыляясь на слабые сеты.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-emerald-200 shadow-2xs">
            <div className="font-bold text-emerald-700 mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Назначение: Сбор ресурсов
            </div>
            <p className="text-slate-700 leading-relaxed">
              Все свободные марши непрерывно отправляются на плитки сбора еды, топлива и железа на карте для снабжения базы ресурсами.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
