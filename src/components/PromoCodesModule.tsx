import React, { useState } from "react";
import { Ticket, Plus, Trash2, Gift, AlertCircle, Copy, Check } from "lucide-react";

interface PromoCodesModuleProps {
  promoCodes: string[];
  setPromoCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PromoCodesModule: React.FC<PromoCodesModuleProps> = ({
  promoCodes,
  setPromoCodes,
}) => {
  const [newCode, setNewCode] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAddCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = newCode.trim().toUpperCase();
    if (code && !promoCodes.includes(code)) {
      setPromoCodes((prev) => [...prev, code]);
      setNewCode("");
    }
  };

  const handleRemoveCode = (codeToRemove: string) => {
    setPromoCodes((prev) => prev.filter((c) => c !== codeToRemove));
  };

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Ticket className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Управление Промокодами
          </h2>
        </div>
        <p className="text-slate-600 text-sm">
          Добавляйте активные промокоды для участников альянса. Добавленные коды будут автоматически
          отображаться в Директиве Дня и Календаре, чтобы игроки не забыли их активировать.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">
          Добавить новый промокод
        </h3>
        <form onSubmit={handleAddCode} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="Введите промокод (например, DREAM2024)"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700 font-mono uppercase placeholder:normal-case placeholder:font-sans"
          />
          <button
            type="submit"
            disabled={!newCode.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить</span>
          </button>
        </form>
      </div>

      {/* Codes List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex justify-between items-center">
          <span>Активные Промокоды ({promoCodes.length})</span>
        </h3>
        
        {promoCodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <Gift className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium text-sm">Нет активных промокодов</p>
            <p className="text-xs mt-1">Добавьте промокод выше, чтобы он появился в расписании</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {promoCodes.map((code, index) => (
              <div
                key={code}
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl group hover:border-amber-300 hover:bg-amber-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-md border border-slate-200 shadow-xs">
                    <Ticket className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="font-mono font-bold text-slate-700">{code}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(code, index)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Скопировать"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRemoveCode(code)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Удалить промокод"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Tip */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Как это работает:</strong> Добавленные здесь промокоды будут видны всем участникам 
          на главном экране «Директива Дня» и в «Календаре». Когда коды устареют, просто удалите их отсюда, 
          чтобы они исчезли из расписания.
        </p>
      </div>
    </div>
  );
};
