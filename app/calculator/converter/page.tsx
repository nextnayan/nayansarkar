import UnitConverter from "@/components/calculators/UnitConverter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter | Length and Weight",
  description: "Easily convert meters to feet, kilograms to pounds, and more with our online Unit Converter tool.",
  keywords: ["Unit Converter", "Length Converter", "Weight Converter", "Measurement Tool"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Unit Converter",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any (Web)",
  "description": "Easily convert meters to feet, kilograms to pounds, and more with our online Unit Converter tool.",
  "url": "https://www.nayanbd.com/calculator/converter",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function ConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UnitConverter />
    </>
  );
}