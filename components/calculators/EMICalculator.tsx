"use client";

import React, { useState, useEffect } from 'react';

// --- SVG Icons (inlined to avoid dependency) ---
const Calculator = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="8" x2="16" y1="10" y2="10"/><line x1="8" x2="16" y1="14" y2="14"/><line x1="8" x2="16" y1="18" y2="18"/><line x1="12" x2="12" y1="6" y2="18"/></svg>
);

const RefreshCcw = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);

const Sparkles = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.9 3.8-3.8 1.9 3.8 1.9L12 14.4l1.9-3.8 3.8-1.9-3.8-1.9L12 3zM22 12l-1.9 3.8-3.8 1.9 3.8 1.9L22 22l1.9-3.8 3.8-1.9-3.8-1.9L22 12zM3 12l-1.9 3.8-3.8 1.9 3.8 1.9L3 22l1.9-3.8 3.8-1.9-3.8-1.9L3 12z"/></svg>
);

// --- API Call to our backend ---
const callGemini = async (prompt) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.text || "দুঃখিত, কোনো পরামর্শ পাওয়া যায়নি।";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "পরামর্শ লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
  }
};

// --- Utility Functions ---
const calculateEmi = (pv, r, n, m = 12) => {
  if (!pv || !r || !n) return 0;
  let i = r / 100 / m;
  if (i === 0) return pv / (n * m);
  const emiValue = (pv * i) / (1 - Math.pow(1 + i, -(n * m)));
  return Math.round(emiValue);
};

// --- AI Advisor Component ---
const AIAdvisor = ({ contextData, type }) => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    setAdvice('');
    let prompt = `Act as a financial advisor for a user in Bangladesh. The user is looking at a loan. Give 3 short, actionable financial tips in simple Bengali, using relevant emojis. Keep each tip to one sentence. The user's loan details are: ${contextData}.`;

    const result = await callGemini(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="mt-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-zinc-800/50 dark:to-zinc-800/70 border border-violet-200 dark:border-zinc-700 rounded-lg p-3 shadow-sm">
      <h3 className="text-violet-800 dark:text-violet-300 font-bold flex items-center gap-2 mb-2 text-sm">
        <Sparkles className="text-violet-500 dark:text-violet-400" size={16} />
        AI Financial Advisor
      </h3>
      {!advice && !loading && (
        <div className="text-center">
          <button onClick={handleGetAdvice} className="inline-flex items-center gap-1 px-3 py-1 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white text-xs rounded-full shadow-sm transition-colors">
            <Sparkles size={12} /> পরামর্শ দেখুন
          </button>
        </div>
      )}
      {loading && <div className="text-center text-xs text-violet-600 dark:text-violet-400 animate-pulse">পরামর্শ তৈরি হচ্ছে...</div>}
      {advice && (
        <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-violet-100 dark:border-zinc-700 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans">
          {advice}
        </div>
      )}
    </div>
  );
};
AIAdvisor.displayName = 'AIAdvisor';

// --- EMI Calculator Component ---
const EMICalculator = () => {
  const [values, setValues] = useState({ amount: '', tenor: 5, yearTimes: 12, rate: 14.50 });
  const [result, setResult] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const adjustValue = (field, delta) => {
    setValues(prev => {
      let current = parseFloat(prev[field]) || 0;
      let newValue = current + delta;
      if (field === 'tenor') { if (newValue < 1) newValue = 1; if (newValue > 30) newValue = 30; }
      if (field === 'rate') { if (newValue < 0) newValue = 0; newValue = Math.round(newValue * 100) / 100; }
      return { ...prev, [field]: newValue };
    });
  };

  const handleReset = () => {
    setValues({ amount: '', tenor: 5, yearTimes: 12, rate: 14.50 });
    setResult(0);
  };

  const getContextString = () => {
    return `Loan Amount: ${values.amount || 0}, Interest Rate: ${values.rate}%, Tenor: ${values.tenor} years, Installments per year: ${values.yearTimes}, Calculated Monthly EMI: ${result}`;
  };

  useEffect(() => {
    const amount = parseFloat(values.amount) || 0;
    const rate = parseFloat(values.rate) || 0;
    const tenor = parseInt(values.tenor) || 0;
    const yearTimes = parseInt(values.yearTimes) || 12;
    if (amount && rate && tenor) setResult(calculateEmi(amount, rate, tenor, yearTimes));
    else setResult(0);
  }, [values]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-3 max-w-lg mx-auto border-t-4 border-yellow-400 dark:border-yellow-500 animate-fade-in">
      <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <Calculator className="text-yellow-500 dark:text-yellow-400" size={20} /> General EMI Calculator
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-0.5">Loan Amount</label>
          <input type="number" name="amount" value={values.amount} onChange={handleChange} placeholder="Enter Amount" className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded focus:ring-1 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:outline-none text-gray-900 dark:text-gray-100" />
        </div>
        
        <div className="flex gap-4 items-start">
            <div className="flex-grow">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Tenor (Years)</label>
                <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => adjustValue('tenor', -1)} className="w-9 h-9 flex items-center justify-center bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/50 dark:hover:bg-rose-900/80 text-rose-600 dark:text-rose-400 rounded-lg font-bold text-lg transition-colors shadow-sm">-</button>
                    <input type="number" name="tenor" min="1" max="30" value={values.tenor} onChange={handleChange} className="flex-grow w-full px-1 py-1.5 text-lg font-semibold bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg text-center focus:ring-1 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:outline-none h-9 text-gray-900 dark:text-gray-100" />
                    <button onClick={() => adjustValue('tenor', 1)} className="w-9 h-9 flex items-center justify-center bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:hover:bg-emerald-900/80 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold text-lg transition-colors shadow-sm">+</button>
                </div>
                <input type="range" name="tenor" min="1" max="30" value={values.tenor || 1} onChange={handleChange} className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-yellow-400 dark:accent-yellow-500 block" />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium"><span>1Y</span><span>30Y</span></div>
            </div>
            
            <div className="w-28 shrink-0">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Installments</label>
                <select name="yearTimes" value={values.yearTimes} onChange={handleChange} className="w-full px-2 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg focus:outline-none h-9 focus:ring-1 focus:ring-yellow-400 dark:focus:ring-yellow-500 text-gray-900 dark:text-gray-100">
                  <option value="12">12 (Monthly)</option><option value="6">6 (Semi-Annual)</option><option value="4">4 (Quarterly)</option><option value="1">1 (Yearly)</option>
                </select>
            </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Interest Rate (%)</label>
          <div className="flex items-center gap-2 mb-2">
                <button onClick={() => adjustValue('rate', -0.25)} className="w-9 h-9 flex items-center justify-center bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/50 dark:hover:bg-rose-900/80 text-rose-600 dark:text-rose-400 rounded-lg font-bold text-lg transition-colors shadow-sm">-</button>
                <input type="number" name="rate" value={values.rate} onChange={handleChange} className="flex-grow px-3 py-1.5 text-lg font-semibold bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg text-center focus:ring-1 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:outline-none h-9 text-gray-900 dark:text-gray-100" />
                <button onClick={() => adjustValue('rate', 0.25)} className="w-9 h-9 flex items-center justify-center bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:hover:bg-emerald-900/80 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold text-lg transition-colors shadow-sm">+</button>
            </div>
            <input type="range" name="rate" min="1" max="25" step="0.25" value={values.rate || 1} onChange={handleChange} className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-yellow-400 dark:accent-yellow-500" />
             <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium"><span>1%</span><span>13%</span><span>25%</span></div>
        </div>
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-0.5">Monthly EMI Amount:</label>
          <div className="w-full px-3 py-3 bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg text-2xl font-bold text-slate-800 dark:text-slate-100 text-center shadow-inner">{result.toLocaleString('en-IN')} BDT</div>
        </div>
        <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 mt-3 px-3 py-2 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-slate-900 text-sm font-bold rounded-lg transition-colors shadow-sm"><RefreshCcw size={16} /> Reset Calculator</button>
        {(parseFloat(values.amount) > 0) && <AIAdvisor contextData={getContextString()} type="emi" />}
      </div>
    </div>
  );
};

export default EMICalculator;