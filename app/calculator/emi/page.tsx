import EMICalculator from "@/components/calculators/EMICalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI EMI Calculator | Smart Loan Advisor",
  description: "Calculate your loan EMI and get free, personalized financial advice with our new AI-powered EMI Calculator. Make smarter financial decisions.",
  keywords: ["AI EMI Calculator", "EMI Calculator", "Loan Advisor", "Finance Tool", "Smart Calculator", "Gemini"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AI Powered EMI Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Any (Web)",
  "description": "Calculate your loan EMI and get free, personalized financial advice with our new AI-powered EMI Calculator. Make smarter financial decisions.",
  "url": "https://www.nayanbd.com/calculator/emi",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "EMI Calculation",
    "AI Financial Advice",
    "Loan Amortization"
  ]
};

export default function EMICalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EMICalculator />
    </>
  );
}
