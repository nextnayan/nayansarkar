export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Technologies</h2>
            <p className="text-secondary">My technical toolkit for building modern applications</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Python", "Django", "JavaScript", "React", "Next.js", 
              "Express.js", "PHP", "Laravel", "Tailwind CSS", "Bootstrap 5", 
              "Excel", "Word", "PowerPoint", "MySQL", "MongoDB"
            ].map((skill) => (
              <div key={skill} className="group p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all text-center">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
