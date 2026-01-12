export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nayan Sarkar",
    url: "https://www.nayanbd.com",
    image: "https://www.nayanbd.com/nayan_sarkar.png",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/nayansarkar",
      "https://linkedin.com/in/nayansarkar",
    ],
    knowsAbout: ["React", "Next.js", "Python", "Django", "JavaScript", "TypeScript"],
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nayan Sarkar Tools & Calculators",
    url: "https://www.nayanbd.com/calculator",
    applicationCategory: "UtilitiesApplication",
    description: "A suite of online calculators including EMI, Age, and Unit Converters.",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
    </section>
  );
}
