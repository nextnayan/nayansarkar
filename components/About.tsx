import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/3 flex justify-center">
            <Image
              src="/nayan_sarkar.jpg"
              alt="About Nayan"
              width={300}
              height={300}
              className="rounded-2xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300"
            />
          </div>
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-3xl font-bold text-primary">About Me</h2>
            <h3 className="text-2xl font-semibold">Full Stack Developer & Tech Enthusiast</h3>
            <p className="text-secondary leading-relaxed">
              I am Nayan Sarkar, a dedicated Full Stack Web Developer with a strong foundation in both frontend and backend technologies. 
              I love building scalable, responsive, and user-centric web applications. My journey involves navigating through the complex world of web development 
              and mastering tools that help solve real-world problems.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
               <div className="p-4 bg-background rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <h4 className="font-bold mb-1">Frontend</h4>
                  <p className="text-sm text-secondary">React, Next.js, Tailwind, Bootstrap</p>
               </div>
               <div className="p-4 bg-background rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <h4 className="font-bold mb-1">Backend</h4>
                  <p className="text-sm text-secondary">Python, Django, PHP, Laravel, Express.js</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
