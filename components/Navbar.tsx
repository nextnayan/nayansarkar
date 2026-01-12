import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10 dark:border-black/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-primary">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/20">
            <Image 
              src="/nayan_sarkar.png" 
              alt="Nayan" 
              fill 
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span>Nayan Sarkar</span>
        </Link>
        <ul className="hidden md:flex gap-4 text-sm font-medium text-secondary">
          <li><Link href="/#home" className="px-4 py-2 rounded-full border border-blue-400/50 dark:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300">Home</Link></li>
          <li><Link href="/#about" className="px-4 py-2 rounded-full border border-blue-400/50 dark:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300">About</Link></li>
          <li><Link href="/#skills" className="px-4 py-2 rounded-full border border-blue-400/50 dark:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300">Skills</Link></li>
          <li><Link href="/calculator" className="px-4 py-2 rounded-full border border-blue-400/50 dark:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300">Calculator</Link></li>
          <li><Link href="/#contact" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300">Contact</Link></li>
          <li className="ml-2"><ThemeToggle /></li>
        </ul>
      </div>
    </nav>
  );
}
