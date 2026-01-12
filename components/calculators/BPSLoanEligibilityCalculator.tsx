"use client";
import React, { useState, useMemo, useCallback } from 'react';

// --- SVG Icons (inlined to avoid dependency) ---
const Briefcase = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const Plus = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5v14"/>
    <path d="M5 12h14"/>
  </svg>
);

const Trash2 = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// --- Type Definitions ---
interface Liability {
    id: string | number;
    bankName: string;
    loanType: string;
    limit: string | number;
    outstanding: string | number;
    emi: string | number;
    isTakeover?: boolean;
    isTopUp?: boolean;
}

// --- Utility Functions ---
const calculateEmi = (pv: number, r: number, n: number, m: number = 12): number => {
  if (!pv || !r || !n) return 0;
  let i = r / 100 / m;
  if (i === 0) return pv / (n * m);
  return Math.round((pv * i) / (1 - Math.pow(1 + i, -(n * m))));
};

const formatNum = (num: number | string): string => (typeof num === 'number' ? num.toLocaleString('en-IN') : (num || '-'));

// --- Constants ---
const OTHER_BANK_LOAN_TYPES = ['PL', 'HBL', 'OD', 'CARD', 'OTHER'];
const CBBL_LOAN_TYPES = ['PL', 'HBL', 'OD', 'CARD', 'BPS', 'GPF', 'AGRI-BP', 'OTHER'];

// --- Sub-Components ---
interface LiabilityRowProps {
  item: Liability;
  onChange: (id: string | number, field: string, value: string | boolean) => void;
  onRemove: (id: string | number) => void;
  isCbbl: boolean;
  loanTypes: string[];
}

const LiabilityRow: React.FC<LiabilityRowProps> = React.memo(({ item, onChange, onRemove, isCbbl, loanTypes }) => {
  return (
    <div className="bg-slate-50 dark:bg-zinc-800/50 p-px rounded mb-px text-xs animate-fade-in flex items-center gap-px border border-blue-100 dark:border-zinc-700">
      <input 
        type="text" 
        placeholder="Bank" 
        className="px-0.5 py-0.5 border rounded w-14 flex-grow min-w-[50px] bg-white dark:bg-zinc-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-zinc-600 focus:outline-none focus:border-blue-400" 
        value={item.bankName} 
        onChange={(e) => onChange(item.id, 'bankName', e.target.value)} 
      />
      <select 
        className="px-0.5 py-0.5 border rounded w-16 bg-white dark:bg-zinc-700 shrink-0 text-[10px] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-zinc-600 focus:outline-none focus:border-blue-400" 
        value={item.loanType} 
        onChange={(e) => onChange(item.id, 'loanType', e.target.value)}
      >
        {loanTypes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <input 
        type="number" 
        placeholder="Lim" 
        className="px-0.5 py-0.5 border rounded w-20 shrink-0 text-right bg-white dark:bg-zinc-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-zinc-600 focus:outline-none focus:border-blue-400" 
        value={item.limit} 
        onChange={(e) => onChange(item.id, 'limit', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Out" 
        className="px-0.5 py-0.5 border rounded w-20 shrink-0 text-right bg-white dark:bg-zinc-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-zinc-600 focus:outline-none focus:border-blue-400" 
        value={item.outstanding} 
        onChange={(e) => onChange(item.id, 'outstanding', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="EMI" 
        className={`px-0.5 py-0.5 border rounded w-20 shrink-0 text-right font-semibold focus:outline-none focus:border-blue-400 border-slate-200 dark:border-zinc-600 ${item.loanType === 'CARD' ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-slate-500' : 'bg-white dark:bg-zinc-700 text-slate-700 dark:text-slate-200'}`} 
        value={item.emi} 
        onChange={(e) => onChange(item.id, 'emi', e.target.value)} 
        readOnly={item.loanType === 'CARD'} 
      />
      <div className="w-14 flex items-center justify-between shrink-0 pl-1">
         <div className="flex flex-col items-center leading-none">
            <input 
              type="checkbox" 
              id={`check-${item.id}`} 
              checked={!!(isCbbl ? item.isTopUp : item.isTakeover)} 
              onChange={(e) => onChange(item.id, isCbbl ? 'isTopUp' : 'isTakeover', e.target.checked)} 
              className="w-3 h-3 text-blue-600 rounded cursor-pointer mb-0.5" 
            />
            <label htmlFor={`check-${item.id}`} className={`font-medium cursor-pointer text-[9px] ${isCbbl && item.isTopUp || !isCbbl && item.isTakeover ? 'text-green-600 dark:text-green-500' : 'text-slate-400 dark:text-slate-500'}`}>{isCbbl ? 'TopUp' : 'Take'}</label>
         </div>
         <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 p-1">
           <Trash2 size={14} />
         </button>
      </div>
    </div>
  );
});
LiabilityRow.displayName = 'LiabilityRow';


// --- Main Calculator Component ---
const BPSLoanEligibilityCalculator = () => {
  const [salary, setSalary] = useState('');
  const [bpsRate, setBpsRate] = useState(13.75);
  
  const [otherLiabilities, setOtherLiabilities] = useState<Liability[]>([
    { id: 'init_other', bankName: '', loanType: 'PL', limit: '', outstanding: '', emi: '', isTakeover: false }
  ]);
  const [cbblLiabilities, setCbblLiabilities] = useState<Liability[]>([
    { id: 'init_cbbl', bankName: '', loanType: 'PL', limit: '', outstanding: '', emi: '', isTopUp: false }
  ]);

  // --- Actions ---
  const addLiability = useCallback((isCbbl: boolean) => {
    const newItem: Omit<Liability, 'isTakeover' | 'isTopUp'> & { isTakeover?: boolean, isTopUp?: boolean } = { 
      id: Date.now(), 
      bankName: '', 
      loanType: 'PL', 
      limit: '', 
      outstanding: '', 
      emi: '',
    };
    if (isCbbl) {
        newItem.isTopUp = false;
        setCbblLiabilities(prev => [...prev, newItem as Liability]);
    } else {
        newItem.isTakeover = false;
        setOtherLiabilities(prev => [...prev, newItem as Liability]);
    }
  }, []);

  const updateLiability = useCallback((isCbbl: boolean, id: string | number, field: string, value: string | number | boolean) => {
    const updater = (liabilities: Liability[]): Liability[] => 
      liabilities.map(item => {
        if (item.id !== id) return item;
      
        const updatedItem = { ...item, [field]: value };
        
        if (updatedItem.loanType === 'CARD') {
          if (isCbbl) {
            updatedItem.emi = '';
          } else {
            const limit = parseFloat(String(updatedItem.limit)) || 0;
            const outstanding = parseFloat(String(updatedItem.outstanding)) || 0;
            updatedItem.emi = Math.round(Math.max(limit * 0.03, outstanding * 0.05));
          }
        }
        return updatedItem;
      });

    if (isCbbl) setCbblLiabilities(updater);
    else setOtherLiabilities(updater);
  }, []);

  const removeLiability = useCallback((isCbbl: boolean, id: string | number) => {
    if (isCbbl) setCbblLiabilities(prev => prev.filter(i => i.id !== id));
    else setOtherLiabilities(prev => prev.filter(i => i.id !== id));
  }, []);

  const resetForm = useCallback(() => {
    setSalary('');
    setBpsRate(13.75);
    setOtherLiabilities([{ id: Date.now(), bankName: '', loanType: 'PL', limit: '', outstanding: '', emi: '', isTakeover: false }]);
    setCbblLiabilities([{ id: Date.now() + 1, bankName: '', loanType: 'PL', limit: '', outstanding: '', emi: '', isTopUp: false }]);
  }, []);

  // --- Derived State (Calculations) ---
  const { subTotalOther, subTotalCbbl, totalStats } = useMemo(() => {
    const calculateTotals = (list: Liability[], isCbbl: boolean) => {
      let limit = 0, outstanding = 0, emi = 0, liabilityEmi = 0;
      
      list.forEach(item => {
        const iLimit = parseFloat(String(item.limit)) || 0;
        const iOut = parseFloat(String(item.outstanding)) || 0;
        const iEmi = parseFloat(String(item.emi)) || 0;
        const isExcluded = isCbbl ? item.isTopUp : item.isTakeover;

        limit += iLimit;
        outstanding += iOut;
        emi += iEmi;

        if (!isExcluded) {
          if (!isCbbl || item.loanType !== 'CARD') {
            liabilityEmi += iEmi;
          }
        }
      });
      return { limit, outstanding, emi, liabilityEmi };
    };

    const other = calculateTotals(otherLiabilities, false);
    const cbbl = calculateTotals(cbblLiabilities, true);

    return {
      subTotalOther: other,
      subTotalCbbl: cbbl,
      totalStats: {
        limit: other.limit + cbbl.limit,
        outstanding: other.outstanding + cbbl.outstanding,
        emi: other.emi + cbbl.emi,
        liability: other.liabilityEmi + cbbl.liabilityEmi
      }
    };
  }, [otherLiabilities, cbblLiabilities]);

  const { upToEmi, tableData } = useMemo(() => {
    const sal = parseFloat(salary) || 0;
    const rate = bpsRate || 0;
    
    if (sal <= 0 || rate <= 0) return { upToEmi: 0, tableData: [] };

    const emiAbility = Math.floor(Math.abs(sal) * 0.6);
    const calculatedUpToEmi = emiAbility - totalStats.liability;
    
    const rows: {tenor: number, amount: string|number, emi: number}[] = [];
    for (let i = 1; i <= 10; i++) {
      const emiPerLakh = calculateEmi(100000, rate, i);
      let loanAmt = 0;
      if (emiPerLakh > 0) {
        const rawLoan = (calculatedUpToEmi / emiPerLakh) * 100000;
        loanAmt = Math.floor(rawLoan / 1000) * 1000;
      }

      let displayAmt: string | number = loanAmt;
      if (loanAmt < 49999) displayAmt = "Not eligible";
      else if (loanAmt > 2000000) displayAmt = 2000000;

      rows.push({
        tenor: i,
        amount: displayAmt,
        emi: (typeof displayAmt === 'number') ? calculateEmi(displayAmt, rate, i) : 0
      });
    }

    return { upToEmi: calculatedUpToEmi, tableData: rows };
  }, [salary, bpsRate, totalStats.liability]);

  const handleOtherChange = useCallback((id: string | number, f: string, v: string | boolean) => updateLiability(false, id, f, v), [updateLiability]);
  const handleCbblChange = useCallback((id: string | number, f: string, v: string | boolean) => updateLiability(true, id, f, v), [updateLiability]);
  const handleOtherRemove = useCallback((id: string | number) => removeLiability(false, id), [removeLiability]);
  const handleCbblRemove = useCallback((id: string | number) => removeLiability(true, id), [removeLiability]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-3 max-w-2xl mx-auto border-t-4 border-blue-500 dark:border-blue-800 animate-fade-in">
      <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-2">
        <Briefcase className="text-blue-600 dark:text-blue-400" size={20} /> BPS Loan Eligibility
      </h2>
      
      <div className="flex items-center gap-2 mb-3">
        <label className="text-red-500 dark:text-red-400 text-xs font-medium">Present interest rate (%):</label>
        <input 
          type="number" 
          value={bpsRate} 
          onChange={(e) => setBpsRate(Number(e.target.value))} 
          className="w-16 px-1 py-0.5 text-xs border bg-white dark:bg-zinc-800 border-red-300 dark:border-red-500/50 rounded focus:ring-1 focus:ring-red-500 focus:outline-none text-red-600 dark:text-red-400 font-bold" 
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-0.5">Gross Salary</label>
        <input 
          type="number"
          inputMode="decimal"
          value={salary} 
          onChange={(e) => setSalary(e.target.value)} 
          placeholder="Gross Salary" 
          className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none text-gray-900 dark:text-gray-100" 
        />
      </div>
      
      {/* CBBL Liabilities */}
      <div className="mb-1">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">CBBL Liabilities</label>
          <button onClick={() => addLiability(true)} className="flex items-center gap-1 text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700 px-2 py-0.5 rounded">
            <Plus size={10} /> Add
          </button>
        </div>
        {cbblLiabilities.map(item => (
          <LiabilityRow 
            key={item.id} 
            item={item} 
            onChange={handleCbblChange} 
            onRemove={handleCbblRemove} 
            isCbbl={true} 
            loanTypes={CBBL_LOAN_TYPES} 
          />
        ))}
        {/* Subtotal Row */}
        <div className="flex items-center gap-px px-0 mb-2 text-xs">
           <div className="flex-grow min-w-[50px] text-right font-bold text-slate-400 dark:text-slate-500 pr-2">Total</div>
           <div className="w-16 shrink-0"></div>
           <div className="w-20 shrink-0 font-bold text-slate-600 dark:text-slate-300 text-right bg-slate-50 dark:bg-zinc-800 rounded py-0.5 px-1 border border-slate-200 dark:border-zinc-700">
             {formatNum(subTotalCbbl.limit)}
           </div>
           <div className="w-20 shrink-0 font-bold text-slate-600 dark:text-slate-300 text-right bg-slate-50 dark:bg-zinc-800 rounded py-0.5 px-1 border border-slate-200 dark:border-zinc-700">
             {formatNum(subTotalCbbl.outstanding)}
           </div>
           <div className="w-20 shrink-0 font-bold text-slate-700 dark:text-slate-200 text-right bg-slate-50 dark:bg-zinc-800 rounded py-0.5 px-1 border border-slate-200 dark:border-zinc-700">
             {formatNum(subTotalCbbl.emi)}
           </div>
           <div className="w-14 shrink-0"></div>
        </div>
      </div>

      {/* Other Bank Liabilities */}
      <div className="mb-1">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Other Bank Liabilities</label>
          <button onClick={() => addLiability(false)} className="flex items-center gap-1 text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700 px-2 py-0.5 rounded">
            <Plus size={10} /> Add
          </button>
        </div>
        {otherLiabilities.map(item => (
          <LiabilityRow 
            key={item.id} 
            item={item} 
            onChange={handleOtherChange} 
            onRemove={handleOtherRemove} 
            isCbbl={false} 
            loanTypes={OTHER_BANK_LOAN_TYPES} 
          />
        ))}
        {/* Subtotal Row */}
        <div className="flex items-center gap-px px-0 mb-2 text-xs">
           <div className="flex-grow min-w-[50px] text-right font-bold text-slate-400 dark:text-slate-500 pr-2">Total</div>
           <div className="w-16 shrink-0"></div> 
           <div className="w-20 shrink-0 font-bold text-slate-600 dark:text-slate-300 text-right bg-slate-50 dark:bg-zinc-800 rounded py-0.5 px-1 border border-slate-200 dark:border-zinc-700">
             {formatNum(subTotalOther.limit)}
           </div>
           <div className="w-20 shrink-0 font-bold text-slate-600 dark:text-slate-300 text-right bg-slate-50 dark:bg-zinc-800 rounded py-0.5 px-1 border border-slate-200 dark:border-zinc-700">
             {formatNum(subTotalOther.outstanding)}
           </div>
           <div className="w-20 shrink-0 font-bold text-slate-700 dark:text-slate-200 text-right bg-slate-50 dark:bg-zinc-800 rounded py-0.5 px-1 border border-slate-200 dark:border-zinc-700">
             {formatNum(subTotalOther.emi)}
           </div>
           <div className="w-14 shrink-0"></div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-white dark:bg-zinc-900/50 p-1 rounded-lg mb-4 text-xs border border-blue-200 dark:border-zinc-700 shadow-sm flex items-center gap-1">
         <div className="flex-grow min-w-[60px] pl-2 flex items-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight mr-1.5">Available EMI:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-500 text-sm">{formatNum(upToEmi)}</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 ml-0.5 font-medium">BDT</span>
         </div>
         <div className="w-16 shrink-0"></div> 
         <div className="w-20 shrink-0 flex flex-col justify-center bg-slate-50 dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700 py-1 px-1">
            <span className="text-[7px] text-slate-400 dark:text-slate-500 uppercase leading-none text-right mb-0.5">Total Limit</span>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-right leading-none">{formatNum(totalStats.limit)}</span>
         </div>
         <div className="w-20 shrink-0 flex flex-col justify-center bg-slate-50 dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700 py-1 px-1">
            <span className="text-[7px] text-slate-400 dark:text-slate-500 uppercase leading-none text-right mb-0.5">Total Out</span>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-right leading-none">{formatNum(totalStats.outstanding)}</span>
         </div>
         <div className="w-20 shrink-0 flex flex-col justify-center bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-500/30 py-1 px-1">
            <span className="text-[7px] text-red-400 dark:text-red-500 uppercase leading-none text-right mb-0.5">Total EMI</span>
            <span className="font-bold text-red-600 dark:text-red-400 text-right leading-none">{formatNum(totalStats.emi)}</span>
         </div>
         <div className="w-14 shrink-0 flex justify-center">
           <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">Total</span>
         </div> 
      </div>

      {/* Result Table */}
      {tableData.length > 0 && (
        <div className="overflow-hidden rounded-xl border dark:border-zinc-700 shadow-md mb-4">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <tr>
                <th className="px-2 py-1.5 font-semibold tracking-wide border-b border-blue-800 text-center">Tenor</th>
                <th className="px-2 py-1.5 font-semibold tracking-wide border-b border-blue-800 text-right">Max Loan</th>
                <th className="px-2 py-1.5 font-semibold tracking-wide border-b border-blue-800 text-right">Monthly EMI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 dark:divide-zinc-800">
              {tableData.map((row, idx) => (
                <tr key={idx} className={`transition-colors hover:bg-blue-100/50 dark:hover:bg-zinc-800/50 ${idx % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-blue-50/30 dark:bg-zinc-800/30'}`}>
                  <td className="px-2 py-1 font-medium text-slate-700 dark:text-slate-300 text-center">{row.tenor} Years</td>
                  <td className="px-2 py-1 text-right font-semibold text-slate-700 dark:text-slate-200">
                    {typeof row.amount === 'number' ? formatNum(row.amount) : (
                      <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 rounded-full text-[10px] font-bold border border-red-200 dark:border-red-500/30">
                        {row.amount}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-1 text-right text-slate-600 dark:text-slate-400 font-medium">
                    {formatNum(row.emi)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <button 
        onClick={resetForm} 
        className="px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded hover:bg-slate-300 w-full dark:bg-zinc-700 dark:text-slate-200 dark:hover:bg-zinc-600"
      >
        Reset Form
      </button>
    </div>
  );
};

export default BPSLoanEligibilityCalculator;
