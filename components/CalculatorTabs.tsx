"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CalculatorTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", href: "/calculator" },
    { name: "BPS", href: "/calculator/bps" },
    { name: "Standard", href: "/calculator/basic" },
    { name: "EMI", href: "/calculator/emi" },
    { name: "Age", href: "/calculator/age" },
    { name: "Converter", href: "/calculator/converter" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-5 py-2 text-sm font-medium rounded-full border transition-all ${
              isActive
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-primary text-secondary hover:text-primary"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
