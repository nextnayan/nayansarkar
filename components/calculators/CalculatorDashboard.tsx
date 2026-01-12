"use client";

import Link from "next/link";

export default function CalculatorDashboard() {
  const tools = [
    {
      name: "BPS Loan Eligibility",
      description: "Calculate BPS loan eligibility based on salary and liabilities.",
      href: "/calculator/bps",
      color: "bg-red-500",
    },
    {
      name: "Standard Calculator",
      description: "Perform basic arithmetic calculations.",
      href: "/calculator/basic",
      color: "bg-blue-500",
    },
    {
      name: "EMI Calculator",
      description: "Calculate accurate monthly loan installments.",
      href: "/calculator/emi",
      color: "bg-green-500",
    },
    {
      name: "Age Calculator",
      description: "Find out your exact age in years, months, and days.",
      href: "/calculator/age",
      color: "bg-purple-500",
    },
    {
      name: "Unit Converter",
      description: "Convert length and weight measurements instantly.",
      href: "/calculator/converter",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Calculator Tools</h1>
      <p className="text-secondary mb-12">Select a tool to get started with your calculations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {tools.map((tool) => (
          <Link 
            key={tool.name} 
            href={tool.href}
            className="group p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-xl transition-all text-left"
          >
            <div className={`w-12 h-12 ${tool.color} rounded-2xl mb-4 flex items-center justify-center text-white text-xl font-bold`}>
               {tool.name[0]}
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h2>
            <p className="text-sm text-secondary">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
