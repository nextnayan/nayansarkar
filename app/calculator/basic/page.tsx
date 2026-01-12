import BasicCalculator from "@/components/calculators/BasicCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Calculator | Basic Math Tools",
  description: "Perform simple arithmetic calculations online. A clean, simple, and fast calculator for your daily math needs.",
  keywords: ["Online Calculator", "Basic Calculator", "Math Tool", "Standard Calculator"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Standard Calculator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any (Web)",
  "description": "Perform simple arithmetic calculations online. A clean, simple, and fast calculator for your daily math needs.",
  "url": "https://www.nayanbd.com/calculator/basic",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function BasicCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BasicCalculator />
    </>
  );
}