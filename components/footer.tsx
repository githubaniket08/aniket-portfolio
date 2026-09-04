"use client";

import { Github, Linkedin, Instagram } from "@/components/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto border-t border-white/[0.07] bg-black/30 backdrop-blur-sm">
      <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Understated Copyright & Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted/50 font-body font-light">
            © {currentYear} Aniket Patil
          </p>
          <span className="hidden sm:inline text-border/40">·</span>
          <a
            href="mailto:iamaniketpatil08@gmail.com"
            className="text-[11px] tracking-[0.14em] uppercase text-muted/50 hover:text-accent-soft transition-colors font-body font-light"
          >
            iamaniketpatil08@gmail.com
          </a>
        </div>

        {/* Right: Muted Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/githubaniket08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/50 hover:text-accent-soft transition-colors p-1"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/aniket0804/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/50 hover:text-accent-soft transition-colors p-1"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.instagram.com/aniiiket08/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/50 hover:text-accent-soft transition-colors p-1"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
