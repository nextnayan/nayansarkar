import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-lg md:text-xl font-medium text-accent">Hello, I am</h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-short">
            Nayan Sarkar
          </h1>
          <p className="text-xl md:text-2xl text-secondary max-w-lg mx-auto md:mx-0">
            A passionate <span className="text-foreground font-semibold">Full Stack Web Developer</span> turning ideas into high-quality digital products.
          </p>
          <div className="flex gap-4 justify-center md:justify-start pt-4">
            <a href="#contact" className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25">
              Hire Me
            </a>
            <a href="#projects" className="px-8 py-3 rounded-full border border-secondary/30 hover:border-primary hover:text-primary transition-all">
              View Work
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end relative">
           <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl">
             <Image
               src="/nayan_sarkar.png"
               alt="Nayan Sarkar"
               fill
               sizes="(max-width: 768px) 100vw, 50vw"
               className="object-cover"
               priority
             />
           </div>
           {/* Decorative blob */}
           <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl filter"></div>
        </div>
      </div>
    </section>
  );
}
