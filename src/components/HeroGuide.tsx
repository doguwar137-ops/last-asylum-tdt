import React from "react";
import { Star, ShieldAlert, Crosshair, Users, AlertTriangle, Zap, Shield, Heart } from "lucide-react";

export const HeroGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Star className="w-6 h-6 text-amber-600" />
          </div>
          Гид по героям Last Asylum: Plague
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-slate-800">1. «Качать в самую первую очередь!»</h3>
          </div>
          <p className="text-xs text-slate-500 italic">Это основа основ, без них в серьезных боях делать нечего.</p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Артур (Танк):</strong> Самый главный танк в игре. Дает мощнейшие щиты и спасает всю команду. <span className="text-amber-700 font-bold">Качаем первым до 6 звезд!</span>
              </div>
            </li>
            <li className="flex gap-3 text-sm">
              <Zap className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Марлена (Боец / Урон):</strong> Самый сильный урон в игре. Клинки сносят врагов на раз. <span className="text-amber-700 font-bold">Качаем сразу после Артура.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Tier 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Star className="w-5 h-5 text-indigo-500 fill-indigo-500" />
            <h3 className="font-bold text-slate-800">2. «Отличные бойцы»</h3>
          </div>
          <p className="text-xs text-slate-500 italic">Очень сильные персонажи, которые составят костяк вашего отряда следом за главными.</p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <Shield className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Брайан (Танк):</strong> Возвращает врагам огромную часть урона и защищает команду.
              </div>
            </li>
            <li className="flex gap-3 text-sm">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Белла (Танк):</strong> Лучшая помощница, если пока нет Артура. Отлично режет урон от монстров. <em className="text-slate-500">(Важно: после получения Артура не убирайте её, она идеальный второй танк!)</em>
              </div>
            </li>
            <li className="flex gap-3 text-sm">
              <Zap className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Гренвальд (Боец):</strong> Бьет по монстрам с колоссальной силой. Главный урон в PvE.
              </div>
            </li>
            <li className="flex gap-3 text-sm">
              <Crosshair className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Гриффит (Танк дальнего боя):</strong> Незаменим в рейдах на чудовищ, снижает получаемый урон.
              </div>
            </li>
          </ul>
        </div>

        {/* Tier 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Crosshair className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800">3. «Узкие специалисты»</h3>
          </div>
          <p className="text-xs text-slate-500 italic">Качать под конкретные задачи.</p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div><strong className="text-slate-900">Стеллар (Лекарь):</strong> Единственный нормальный целитель в игре + воскрешает после своей смерти.</div>
            </li>
            <li className="flex gap-3 text-sm">
              <Zap className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <div><strong className="text-slate-900">Бестар (Боец):</strong> Специалист по ядам и кровотечению (хорош для затяжных боев).</div>
            </li>
            <li className="flex gap-3 text-sm">
              <Zap className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div><strong className="text-slate-900">Клэр (Боец):</strong> Отлично расправляется с одиночными боссами.</div>
            </li>
            <li className="flex gap-3 text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div><strong className="text-slate-900">Хастар (Контроль):</strong> Нужен только тем, кто упорно играет на арене (PvP) ради оглушений.</div>
            </li>
          </ul>
        </div>

        {/* Tier 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Users className="w-5 h-5 text-slate-500" />
            <h3 className="font-bold text-slate-800">4. «Стартовые и вспомогательные»</h3>
          </div>
          <p className="text-xs text-slate-500 italic">Правило для 3-го и 4-го отрядов.</p>
          <div className="text-sm text-slate-700 space-y-2">
            <p><strong>Эш, Дурант, Робин, Уильям, Кафа</strong> и другие простые бойцы.</p>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-2 space-y-2">
              <p className="font-bold text-amber-900 flex items-center gap-1"><Star className="w-4 h-4" /> ВАЖНО:</p>
              <p className="text-amber-800 text-xs">Когда открываются дополнительные марши (для сбора ресурсов), пяти главных героев не хватит. Сюда можно ставить этих слабых бойцов, НО:</p>
              <ul className="space-y-1 text-xs text-amber-900">
                <li className="flex gap-1.5"><span className="text-rose-600 font-bold">❌</span> Ни в коем случае не тратьте на них редкие камни возвышения (осколки на звёзды)!</li>
                <li className="flex gap-1.5"><span className="text-emerald-600 font-bold">✔️</span> Поднимите им базовый уровень просто чтобы они не умирали при сборе, а все ценные ресурсы берегите только для основы.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Squads */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Рекомендуемые составы отрядов</h3>
          </div>
          <ul className="space-y-3">
            <li className="text-sm">
              <strong className="text-slate-900 block mb-1">Универсальный / Против Крысиного короля:</strong>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-700">
                Артур + Марлена + Гренвальд + Гриффит (или Белла) + Стеллар
              </div>
            </li>
            <li className="text-sm">
              <strong className="text-slate-900 block mb-1">Для затяжных боев (Рекламация):</strong>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-700">
                Артур + Гриффит + Бестар + Марлена/Гренвальд + Стеллар
              </div>
            </li>
            <li className="text-sm">
              <strong className="text-slate-900 block mb-1">Для PvP (Войны альянсов):</strong>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-700">
                Артур + Марлена + Хастар + Брайан + Клэр/Стеллар
              </div>
            </li>
          </ul>
        </div>

        {/* Common Mistakes */}
        <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-rose-200 pb-3">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-rose-900">Главные ошибки новичков</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-rose-900 block">Распыление ресурсов:</strong>
                <span className="text-rose-800">Не пытайтесь качать 10–15 героев сразу. Фокусируйтесь строго на первой пятерке.</span>
              </div>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-rose-900 block">Игнорирование защиты от монстров:</strong>
                <span className="text-rose-800">Герои вроде Беллы и Гриффита критически важны для PvE благодаря снижению урона по вашей армии.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
