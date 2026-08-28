import re

with open('src/data/allianceData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new days based on the user prompt
new_days_str = """
export const DUEL_DAYS: DuelDay[] = [
  {
    id: "monday",
    dayIndex: 0,
    name: "Понедельник (День 1)",
    phaseName: "Улучшение Ворона (Активность)",
    phaseNumber: 1,
    badge: "АКТИВНОСТЬ",
    iconName: "Target",
    focus: "Выполняем Задания Сокола и улучшаем Ворона эссенцией Ворона.",
    falconRule: {
      action: "CLAIM",
      title: "СДАЧА ЗАДАНИЙ СОКОЛА",
      description: "Выполняем Задания Сокола.",
    },
    allowedActions: [
      "Выполняем Задания Сокола",
      "Улучшаем Ворона эссенцией Ворона",
      "Проводим основные атаки митингов"
    ],
    forbiddenActions: [
      "Сохраняем любые ускорители строительства на День 2!"
    ],
    tips: [
      "Тратим выносливость",
      "Используем антитоксин",
      "Собираем ресурсы",
      "Участвуем в Битве на выживание Ворона"
    ],
    recommendedSpeedups: [],
    pointsOpportunities: [],
    accumulation: [],
    shortChatTemplate: "[Dream] День 1: Улучшение Ворона. Задания Сокола и эссенция. Строительные ускоры КОПИМ на День 2!"
  },
  {
    id: "tuesday",
    dayIndex: 1,
    name: "Вторник (День 2)",
    phaseName: "Развитие Территории (Строительство)",
    phaseNumber: 2,
    badge: "СТРОИТЕЛЬСТВО",
    iconName: "Hammer",
    focus: "Достраиваем здания строго после старта фазы.",
    falconRule: {
      action: "HOLD",
      title: "КОПИМ СОКОЛА",
      description: "Не забираем Задания Сокола.",
    },
    allowedActions: [
      "Достраиваем здания строго после старта фазы (очки дают за нажатие на молоток завершения)",
      "Отправляем караваны и тайные операции",
      "Нанимаем выживших"
    ],
    forbiddenActions: [
      "Сохраняем ускорители исследований и сундуки Ворона на День 3!"
    ],
    tips: [
      "Используем ускорители строительства",
      "Поднимаем мощь зданий"
    ],
    recommendedSpeedups: [],
    pointsOpportunities: [],
    accumulation: [],
    shortChatTemplate: "[Dream] День 2: Развитие Территории. Строительство и караваны. Ускорители исследований и сундуки КОПИМ на День 3!"
  },
  {
    id: "wednesday",
    dayIndex: 2,
    name: "Среда (День 3)",
    phaseName: "Технологические Исследования",
    phaseNumber: 3,
    badge: "НАУКА",
    iconName: "FlaskConical",
    focus: "Завершаем исследования строго после открытия фазы.",
    falconRule: {
      action: "CLAIM_PREVIOUS",
      title: "СДАЧА ЗАДАНИЙ СОКОЛА",
      description: "Сдаем накопленные задания Сокола.",
    },
    allowedActions: [
      "Завершаем исследования строго после открытия фазы (нажимаем кнопку завершения только сегодня)",
      "Открываем сундуки с высокоуровневым снаряжением Ворона",
      "Выполняем Задания Сокола"
    ],
    forbiddenActions: [
      "Сохраняем ускорители обучения на День 5!"
    ],
    tips: [
      "Используем ускорители исследований",
      "Поднимаем мощь технологий",
      "Тратим свитки обучения"
    ],
    recommendedSpeedups: [],
    pointsOpportunities: [],
    accumulation: [],
    shortChatTemplate: "[Dream] День 3: Технологические Исследования. Исследования и сундуки Ворона. Ускорители обучения КОПИМ на День 5!"
  },
  {
    id: "thursday",
    dayIndex: 3,
    name: "Четверг (День 4)",
    phaseName: "Рост Героя (Прокачка)",
    phaseNumber: 4,
    badge: "ГЕРОИ",
    iconName: "Star",
    focus: "Качаем UR-героев (максимум очков) и SSR.",
    falconRule: {
      action: "HOLD",
      title: "КОПИМ СОКОЛА",
      description: "Копим задания Сокола.",
    },
    allowedActions: [
      "Качаем UR-героев (максимум очков) и SSR",
      "Фокусируемся на звездах героев строго из основного состава"
    ],
    forbiddenActions: [
      "Сохраняем ускорители обучения на День 5!"
    ],
    tips: [
      "Нанимаем героев",
      "Качаем звездность SR",
      "Используем антитоксин для апов уровня",
      "Улучшаем навыки",
      "Участвуем в Битве на выживание Героев"
    ],
    recommendedSpeedups: [],
    pointsOpportunities: [],
    accumulation: [],
    shortChatTemplate: "[Dream] День 4: Рост Героя. Качаем UR и SSR героев основного состава. Ускорители обучения КОПИМ на День 5!"
  },
  {
    id: "friday",
    dayIndex: 4,
    name: "Пятница (День 5)",
    phaseName: "Подготовка к Войне (Супер-День / Войска)",
    phaseNumber: 5,
    badge: "ВОЙСКА",
    iconName: "Swords",
    focus: "Собираем войска строго после старта фазы.",
    falconRule: {
      action: "CLAIM_ALL",
      title: "СДАЧА ВСЕХ ЗАДАНИЙ СОКОЛА",
      description: "Забираем все накопленные Задания Сокола.",
    },
    allowedActions: [
      "Собираем войска строго после старта фазы",
      "Забираем все накопленные Задания Сокола",
      "Тренируем солдат самого высокого ранга"
    ],
    forbiddenActions: [
      "Не сливаем универсальные ускорители в ноль — оставляем резерв!"
    ],
    tips: [
      "Используем накопленные плоды/эссенции Ворона",
      "Грабим чужие караваны (обязательно ставим галочку «Запретить караваны на этом сервере»)"
    ],
    recommendedSpeedups: [],
    pointsOpportunities: [],
    accumulation: [],
    shortChatTemplate: "[Dream] День 5: Подготовка к Войне. Войска, Сокол, плоды Ворона. Чужие караваны. Универсальные ускоры НЕ СЛИВАЕМ в ноль! МИНИМУМ 1M очков."
  },
  {
    id: "saturday",
    dayIndex: 5,
    name: "Суббота (День 6)",
    phaseName: "Рейд на Врага (Атаки на сервер)",
    phaseNumber: 6,
    badge: "РЕЙД",
    iconName: "Crosshair",
    focus: "Отправляем караваны UR и тайные операции UR на чужие серверы.",
    falconRule: {
      action: "HOLD",
      title: "РЕЖИМ ОЖИДАНИЯ",
      description: "Задания Сокола копим на следующую неделю.",
    },
    allowedActions: [
      "Отправляем караваны UR и тайные операции UR на чужие серверы",
      "Побеждаем врагов (очки зависят от ранга войск соперника)"
    ],
    forbiddenActions: [
      "Не атакуем своих!"
    ],
    tips: [
      "Используем ускорители строительства",
      "Используем ускорители исследований",
      "Используем ускорители обучения и лечения"
    ],
    recommendedSpeedups: [],
    pointsOpportunities: [],
    accumulation: [],
    shortChatTemplate: "[Dream] День 6: Рейд на Врага. Караваны и операции UR на чужих серверах. Используем все виды ускорителей!"
  },
  {
    id: "sunday",
    dayIndex: 6,
    name: "Воскресенье (День 7)",
    phaseName: "Сброс и Режим Полной Копилки",
    phaseNumber: 7,
    badge: "КОПИЛКА",
    iconName: "Lock",
    focus: "Полный stop на трату ценных предметов.",
    falconRule: {
      action: "HOLD",
      title: "РЕЖИМ КОПИЛКИ",
      description: "Задания Сокола копим на следующую неделю.",
    },
    allowedActions: [
      "Сбор ресурсов",
      "Запуск долгих строек и исследований"
    ],
    forbiddenActions: [
      "Забирать задания Сокола",
      "Тратить ускорители"
    ],
    tips: [
      "Готовимся к новой неделе"
    ],
    recommendedSpeedups: [],
    pointsOpportunities: [],
    accumulation: [],
    shortChatTemplate: "[Dream] День 7: Копилка. Полный стоп по тратам!"
  }
];
"""

start_idx = content.find('export const DUEL_DAYS: DuelDay[] = [')
end_idx = content.find('export const FIRST_SQUAD_HEROES', start_idx)

new_content = content[:start_idx] + new_days_str + content[end_idx:]

with open('src/data/allianceData.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated DUEL_DAYS")
