import React, { useState } from "react";
import { Search, BookOpen, Lightbulb, Copy, Check } from "lucide-react";

const QUIZ_QUESTIONS = [
  { q: "Как повысить мощность отряда после неудачной экспедиции?", a: "Оба варианта" },
  { q: "Что ограничивает уровень навыков героя?", a: "Звездный рейтинг героя" },
  { q: "Какой интервал между двумя ежедневными получениями энергии?", a: "4 часа" },
  { q: "Какие способы не повышают мощь отряда после поражения?", a: "Нанять выживших" },
  { q: "За что отвечает слот Каравана?", a: "Численность отряда" },
  { q: "Какая еженедельная тема Дуэли альянсов по понедельникам?", a: "Усиление ворона" },
  { q: "Что из перечисленного можно получить путем повышения?", a: "Усиление клиники" },
  { q: "Каково основное применение посоха чумного доктора?", a: "Удерживать дистанцию от пациентов" },
  { q: "Какова вероятность получения SSR-награды в найме героев?", a: "0.17" },
  { q: "Что произойдет с зараженными без своевременного лечения?", a: "Скверна" },
  { q: "Какой из перечисленных героев относится к качеству UR?", a: "Селия" },
  { q: "Артура (танк) следует размещать в тылу строя", a: "Неверно" },
  { q: "Количество солдат не ограничено.", a: "Неверно" },
  { q: "Для чего нужно противоядие?", a: "Улучшение и усиление героя" },
  { q: "Как можно получить медные монеты?", a: "Сбор в святилище" },
  { q: "В какие дни событие Дуэль альянсов не проводится?", a: "Воскресенье" },
  { q: "Какова роль Ворона в игре?", a: "Все перечисленное" },
  { q: "Какова цель пожертвования Мышиной приманки в событии «Сырная ловушка»?", a: "Повышает урон игрока" },
  { q: "Какой особый наряд носили в Средние века для предотвращения Скверны?", a: "Одеяние Чумного доктора" },
  { q: "Против героев какой фракции Чернокнижники наиболее эффективны?", a: "Воин" },
  { q: "Как воинам передается скверна?", a: "Укус блохи" },
  { q: "На каком VIP-уровне открывается быстрое испытание в Битве экспедиции?", a: "8" },
  { q: "Какой класс у Шэдоу в игре?", a: "Танк" },
  { q: "Кто стоит за атаками черных крыс на город?", a: "Черный маг" },
  { q: "Кто виноват в тяжелом ранении и заражении Селии?", a: "Крысиный король" },
  { q: "Где производится игровое Противоядие?", a: "Мастерская противоядий" },
  { q: "Сколько часов длится каждая Битва на выживание в игре?", a: "4 часа" },
  { q: "Сколько минут длится Гонка за эликсиром?", a: "30 минут" },
  { q: "На каком VIP-уровне открывается суперрежим Секретных операций?", a: "12" },
  { q: "Какая еженедельная тема Дуэли альянсов по средам?", a: "Изучение технологии" },
  { q: "Сколько секретных операций может одновременно выполнить каждая экспедиционная очередь?", a: "4" },
  { q: "Каковы преимущества высокого уровня казармы?", a: "Увеличить лимит солдат" },
  { q: "Какой цвет редкости снаряжения дает наибольший прирост к мощи героя?", a: "UR" },
  { q: "Что является доказательством статуса мэра в игре?", a: "Перстень-перчатка" },
  { q: "Какие награды Заданий может улучшить выжившая Фрея?", a: "Задание сокола" },
  { q: "Для чего нужны Реликвии?", a: "Оба варианта" },
  { q: "Что ограничивает максимальный уровень героя?", a: "Уровень святилища" },
  { q: "Какие усиления не открываются с повышением VIP-уровня?", a: "Улучшение характеристик солдат" },
  { q: "Для чего используются предметы из Ткацкой мастерской?", a: "Создание снаряжения" },
  { q: "Против героев какой фракции сильны воины?", a: "Рейнджер" },
  { q: "Какое снаряжение производит Камень снаряжения?", a: "Плавильный цех" },
  { q: "Как подбирать героев для максимального урона при формировании строя героев?", a: "5 участников из одной фракции" },
  { q: "К какой фракции принадлежит Марлена?", a: "Воин" },
  { q: "На каком VIP-уровне открывается автоотправка для Секретных операций?", a: "6" },
  { q: "Какие бонусы могут дать союзники по альянсу?", a: "Оба варианта" },
  { q: "Что делать при нехватке ресурсов для улучшения построек/технологий?", a: "Все перечисленное" },
  { q: "Занимает ли Тайная операция ячейку похода?", a: "Нет" },
  { q: "Изучение технологии Дуэли альянсов повышает очки, получаемые в Дуэли альянсов", a: "Верно" },
  { q: "Какая еженедельная тема Дуэли альянсов по четвергам?", a: "Усиление героев" },
  { q: "Как улучшить награды, получаемые в Лагере исследователя?", a: "Проходить больше этапов" }
];

export function QuizCheatSheet() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (q: string, a: string, index: number) => {
    const text = `❓ Вопрос: ${q}\n✅ Ответ: ${a}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredQuestions = QUIZ_QUESTIONS.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Шпаргалка по викторине
            </h2>
            <p className="text-sm text-slate-600">
              База правильных ответов на вопросы игровой викторины (нажмите на иконку копирования, чтобы поделиться в чате)
            </p>
          </div>
        </div>
        
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск вопроса или ответа..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between relative group"
            >
              <div className="mb-4 pr-6">
                <h3 className="text-sm font-bold text-slate-800 leading-snug">
                  {item.q}
                </h3>
              </div>
              <button
                onClick={() => handleCopy(item.q, item.a, index)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                title="Скопировать для чата"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 mt-auto flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-0.5 block">
                    Правильный ответ
                  </span>
                  <span className="text-sm font-semibold text-purple-900 leading-tight">
                    {item.a}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 flex flex-col items-center gap-3">
            <Search className="w-8 h-8 text-slate-300" />
            <p>Вопросов по вашему запросу не найдено.</p>
          </div>
        )}
      </div>
    </div>
  );
}
