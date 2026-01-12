import CalculatorTabs from "@/components/CalculatorTabs";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Calculators | Nayan Sarkar",
  description: "A collection of useful online calculators including EMI, Age, Unit Converter, and Basic Calculator.",
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
           <CalculatorTabs />
           {children}
        </div>
      </div>
      <footer className="py-6 bg-zinc-900 text-center border-t border-zinc-800 mt-auto">
         <p className="text-sm text-zinc-500">
           &copy; 2025 Nayan Sarkar. All rights reserved.
         </p>
      </footer>
    </div>
  );
}
