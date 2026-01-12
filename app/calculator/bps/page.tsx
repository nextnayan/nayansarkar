import BPSLoanEligibilityCalculator from "@/components/calculators/BPSLoanEligibilityCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BPS Loan Eligibility Calculator",
  description: "Calculate your BPS (Banker's Professional Scheme) loan eligibility based on your salary and existing liabilities. A specialized tool for banking professionals.",
  keywords: ["BPS Loan Calculator", "Loan Eligibility", "Finance Tool", "Banking Calculator", "BPS"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "BPS Loan Eligibility Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Any (Web)",
  "description": "Calculate your BPS (Banker's Professional Scheme) loan eligibility based on your salary and existing liabilities. A specialized tool for banking professionals.",
  "url": "https://www.nayanbd.com/calculator/bps",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function BPSLoanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BPSLoanEligibilityCalculator />
    </>
  );
}