import re

with open('src/data/allianceData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

template = """БОЕВОЙ ПРИКАЗ: ВОСКРЕСЕНЬЕ ДЕНЬ 7
Сброс и Режим Полной Копилки
Главные задачи: Полный stop на трату ценных предметов.
Дополнительно: Сбор ресурсов, запуск долгих строек и исследований.
Строгий запрет: Забирать задания Сокола, тратить ускорители!"""

pattern = r'(id:\s*"sunday".*?shortChatTemplate:\s*"[^"]*")'
replacement = r'\1,\n    exactMailTemplate: `' + template + r'`'
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/data/allianceData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

