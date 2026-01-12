export default function Footer() {
  return (
    <footer id="contact" className="py-12 bg-zinc-950 text-white border-t border-white/10">
        <div className="container mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl font-bold">Let's Work Together</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Have a project in mind? Reach out and let's create something amazing.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Email</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
          <p className="text-sm text-zinc-600 pt-8">
            &copy; {new Date().getFullYear()} Nayan Sarkar. All rights reserved.
          </p>
        </div>
      </footer>
  );
}
