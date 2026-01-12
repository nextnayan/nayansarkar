"use client";

import { useState } from "react";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const handleNumber = (num: string) => {
    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
    setExpression(expression + num);
  };

  const handleOperator = (op: string) => {
    setExpression(expression + op);
    setDisplay("0");
  };

  const calculate = () => {
    try {
      // Note: eval is used for simplicity in this demo. 
      // In production, use a math parser library.
      // eslint-disable-next-line no-eval
      const result = eval(expression); 
      setDisplay(String(result));
      setExpression(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Standard Calculator</h1>
      
      <div className="mb-4 bg-zinc-100 dark:bg-black p-4 rounded-xl text-right overflow-hidden">
        <div className="text-xs text-secondary h-4">{expression || "0"}</div>
        <div className="text-3xl font-mono font-bold truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className="col-span-2 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg font-bold hover:bg-red-200 transition">AC</button>
        <button onClick={() => handleOperator("/")} className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-bold hover:bg-zinc-200 transition">÷</button>
        <button onClick={() => handleOperator("*")} className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-bold hover:bg-zinc-200 transition">×</button>

        <button onClick={() => handleNumber("7")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">7</button>
        <button onClick={() => handleNumber("8")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">8</button>
        <button onClick={() => handleNumber("9")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">9</button>
        <button onClick={() => handleOperator("-")} className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-bold hover:bg-zinc-200 transition">-</button>

        <button onClick={() => handleNumber("4")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">4</button>
        <button onClick={() => handleNumber("5")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">5</button>
        <button onClick={() => handleNumber("6")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">6</button>
        <button onClick={() => handleOperator("+")} className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-bold hover:bg-zinc-200 transition">+</button>

        <button onClick={() => handleNumber("1")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">1</button>
        <button onClick={() => handleNumber("2")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">2</button>
        <button onClick={() => handleNumber("3")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">3</button>
        <button onClick={calculate} className="row-span-2 p-4 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition flex items-center justify-center">=</button>

        <button onClick={() => handleNumber("0")} className="col-span-2 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">0</button>
        <button onClick={() => handleNumber(".")} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-bold hover:bg-zinc-50 transition">.</button>
      </div>
    </div>
  );
}
