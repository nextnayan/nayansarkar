"use client";

import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setAge({ years, months, days });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Age Calculator</h1>
      <p className="text-center text-secondary mb-8">Determine your precise age in years, months, and days.</p>

      <div className="space-y-6">
        <div>
           <label className="block text-sm font-medium mb-1">Date of Birth</label>
           <input
             type="date"
             value={dob}
             onChange={(e) => setDob(e.target.value)}
             className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
           />
        </div>
        <button 
          onClick={calculateAge}
          className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Calculate Age
        </button>
      </div>

      {age && (
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2">
           <div className="flex justify-center gap-8">
              <div>
                <span className="block text-3xl font-bold text-green-600 dark:text-green-400">{age.years}</span>
                <span className="text-xs uppercase tracking-wider text-secondary">Years</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-green-600 dark:text-green-400">{age.months}</span>
                <span className="text-xs uppercase tracking-wider text-secondary">Months</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-green-600 dark:text-green-400">{age.days}</span>
                <span className="text-xs uppercase tracking-wider text-secondary">Days</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
