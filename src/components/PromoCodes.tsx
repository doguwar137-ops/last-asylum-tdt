import React, { useState } from "react";
import { Gift, Copy, Check, Settings, UserCircle, KeySquare, ShieldAlert } from "lucide-react";

interface PromoCode {
  code: string;
  rewards: string;
  status: "active" | "expired";
}

const PROMO_CODES: PromoCode[] = [
  {
    code: "LASTASYLUM2026",
    rewards: "1000 Алмазов, 10x Универсальных ускорителей (1ч), 5x Эссенция Ворона",
    status: "active",
  },
  {
    code: "SURVIVOR2026",
    rewards: "500 Алмазов, 20x Набор ресурсов IV, 1x Свиток Знаний",
    status: "active",
  },
  {
    code: "VIP888",
    rewards: "300 Алмазов, 5x Продвинутый поиск, 100 000 Золота",
    status: "active",
  },
  {
    code: "VIP999",
    rewards: "300 Алмазов, 10x Ускоритель строительства (1ч), 50 000 Стали",
    status: "active",
  },
  {
    code: "PLAYASYLUM",
    rewards: "Рамка аватара 'Выживший', 10x Банка опыта (L), 200 Алмазов",
    status: "active",
  },
];

export function PromoCodes() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-sm">
          <Gift className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Подарочные Коды</h2>
          <p className="text-sm text-slate-600">Актуальные промокоды для получения халявы и бонусов в игре.</p>
        </div>
      </div>

      {/* Инструкция по активации */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <KeySquare className="w-4 h-4 text-amber-600" />
          Как активировать промокод?
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-slate-400" />
            <span>Профиль игрока</span>
          </div>
          <div className="hidden sm:block text-slate-300">→</div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-400" />
            <span>Настройки</span>
          </div>
          <div className="hidden sm:block text-slate-300">→</div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-600" />
            <span className="text-slate-900 font-bold">Подарочный код</span>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-amber-50 p-3 rounded-lg border border-amber-100/50">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>
            Внимание: Коды чувствительны к регистру. Рекомендуется использовать кнопку «Скопировать», чтобы избежать ошибок при вводе. Срок действия кодов ограничен, проверяйте актуальность!
          </p>
        </div>
      </div>

      {/* Список кодов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROMO_CODES.map((promo) => (
          <div
            key={promo.code}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Активен
                </span>
              </div>
              <div className="mb-4">
                <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-tight bg-slate-100 px-3 py-2 rounded-xl inline-block border border-slate-200/60 shadow-inner">
                  {promo.code}
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed font-medium">
                {promo.rewards}
              </p>
            </div>
            
            <button
              onClick={() => handleCopy(promo.code)}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                copiedCode === promo.code
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-amber-100 hover:bg-amber-200 text-amber-900"
              }`}
            >
              {copiedCode === promo.code ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопировать</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
