import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Trash2,
  Copy,
  Check,
  Flame,
  Shield,
  Bot,
  User,
  Loader2,
  HelpCircle,
} from "lucide-react";
import Markdown from "react-markdown";
import { ChatMessage } from "../types";
import { ALLIANCE_NAME } from "../data/allianceData";

interface AiAdvisorChatProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

const PRESET_TACTICAL_QUESTIONS = [
  "Что делать сегодня в Дуэли?",
  "Почему нельзя сдавать Сокола сразу?",
  "Как правильно запускать Сырную Ловушку?",
  "Как качать героев и звезды?",
  "Как легко набрать 1 000 000 очков?",
  "В чем смысл 'голого' 2-го отряда?",
];

export const AiAdvisorChat: React.FC<AiAdvisorChatProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: `Приветствую, боец альянса **${ALLIANCE_NAME}**!\n\nЯ твой официальный виртуальный помощник и верховный стратег по **Last Asylum: Plague**.\n\nЗадавай любые вопросы по:\n- 🎯 **Дуэли Альянсов** и недельному графику\n- 🦅 **Заданиям Сокола** (протокол накопления)\n- ⚔️ Прокачке **героев** (Марлена, Зоя, Харпер, Артур, Даскал) и экипировки\n- 🧀 **Сырной ловушке**, правилам магазинов и набору **1 000 000 очков**\n\nКакой у тебя боевой вопрос?`,
      timestamp: "Штаб",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.role === "user" || m.role === "model")
        .map((m) => ({ role: m.role, text: m.text }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "Связь со штабом устойчивая. Продолжайте выполнение боевой задачи!";

      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        role: "model",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        role: "model",
        text: `⚠️ Ошибка связи с сервером штаба. Напоминаю базовый приказ: держите Задания Сокола на среду/пятницу и соблюдайте правила Сырной Ловушки!`,
        timestamp: "Сбой",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        text: `Штаб ${ALLIANCE_NAME} на связи. Журнал очищен. Задавайте вопросы по тактике!`,
        timestamp: "Штаб",
      },
    ]);
  };

  return (
    <div id="ai-advisor-chat-container" className="space-y-4 flex flex-col h-[760px] max-h-[85vh]">
      {/* Chat Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-xs flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                ИИ-Стратег Альянса {ALLIANCE_NAME}
              </h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono font-bold">
                ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Генерал штаба • Знание всех правил, фаз и тактик
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors border border-slate-200"
          title="Очистить историю"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Preset Quick Question Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-shrink-0">
        {PRESET_TACTICAL_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-amber-800 border border-slate-200 text-xs transition-colors flex items-center gap-1.5 shadow-2xs font-medium"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 space-y-4 shadow-xs">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser
                    ? "bg-amber-600 text-white"
                    : "bg-slate-100 border border-slate-200 text-amber-700"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed border relative group ${
                  isUser
                    ? "bg-amber-600 text-white border-amber-600 rounded-tr-none shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-800 rounded-tl-none shadow-2xs"
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-3 text-[10px] font-mono mb-1 ${
                    isUser ? "text-amber-100" : "text-slate-400"
                  }`}
                >
                  <span>{isUser ? "Вы (Боец tDt)" : "Штабной Стратег"}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`prose prose-xs max-w-none ${
                    isUser
                      ? "text-white prose-invert"
                      : "text-slate-800 prose-slate"
                  }`}
                >
                  <Markdown>{msg.text}</Markdown>
                </div>

                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-opacity"
                    title="Скопировать"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 mr-auto">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-amber-600">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-slate-50 border border-slate-200 p-3.5 text-xs text-amber-900 font-medium flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>Штаб рассчитывает боевые коэффициенты...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex-shrink-0"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Спросите стратега (например: как правильно запускать Сырную Ловушку?)..."
          disabled={isLoading}
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Отправить</span>
        </button>
      </form>
    </div>
  );
};
