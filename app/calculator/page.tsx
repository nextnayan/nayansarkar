import CalculatorDashboard from "@/components/calculators/CalculatorDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Calculators & Tools | Nayan Sarkar",
  description: "Access a suite of free online tools: EMI Calculator, Age Calculator, Unit Converter, and more.",
  keywords: ["Calculators", "Online Tools", "Free Utilities", "Web Tools"],
};

export default function CalculatorPage() {
  return <CalculatorDashboard />;
}
