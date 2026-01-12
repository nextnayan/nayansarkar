import AgeCalculator from "@/components/calculators/AgeCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator | Calculate Your Exact Age",
  description: "Find out your exact age in years, months, and days with our free online Age Calculator tool.",
  keywords: ["Age Calculator", "Date of Birth Calculator", "Online Age Tool"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Age Calculator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any (Web)",
  "description": "Find out your exact age in years, months, and days with our free online Age Calculator tool.",
  "url": "https://www.nayanbd.com/calculator/age",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function AgeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgeCalculator />
    </>
  );
}