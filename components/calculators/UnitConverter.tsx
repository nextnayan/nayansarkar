"use client";

import { useState } from "react";

export default function UnitConverter() {
    const [inputValue, setInputValue] = useState<number | "">("");
    const [type, setType] = useState<"length" | "weight">("length");
    const [convertedValue, setConvertedValue] = useState<number | null>(null);

    const convert = () => {
        if(inputValue !== "") {
            const val = Number(inputValue);
            if (type === "length") {
                // Meters to Feet
                setConvertedValue(val * 3.28084);
            } else {
                // Kg to Pounds
                setConvertedValue(val * 2.20462);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Unit Converter</h1>
      <p className="text-center text-secondary mb-8">Convert between Length and Weight units easily.</p>

      <div className="space-y-6">
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <button 
                onClick={() => { setType("length"); setConvertedValue(null); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${type === "length" ? "bg-white dark:bg-black shadow" : "text-secondary hover:text-primary"}`}
            >
                Length (m → ft)
            </button>
            <button 
                onClick={() => { setType("weight"); setConvertedValue(null); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${type === "weight" ? "bg-white dark:bg-black shadow" : "text-secondary hover:text-primary"}`}
            >
                Weight (kg → lbs)
            </button>
        </div>
        <div>
           <label className="block text-sm font-medium mb-1">Enter Value ({type === "length" ? "Meters" : "Kilograms"})</label>
           <input
             type="number"
             value={inputValue}
             onChange={(e) => setInputValue(Number(e.target.value))}
             placeholder="Enter value"
             className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
           />
        </div>
        <button 
          onClick={convert}
          className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Convert
        </button>
      </div>

      {convertedValue !== null && (
        <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2">
           <p className="text-sm text-secondary mb-1">Result</p>
           <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
               {convertedValue.toFixed(2)} {type === "length" ? "ft" : "lbs"}
           </p>
        </div>
      )}
    </div>
    );
}
