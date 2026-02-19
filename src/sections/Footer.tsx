import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold gradient-text">HD</span>
            <span className="text-white/40">|</span>
            <span className="text-white/60 text-sm">Hritik Dalvi</span>
          </div>

          {/* Tagline */}
          <p className="text-white/40 text-sm text-center">
            Data Scientist · ML Engineer · Systems Architect
          </p>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>© {currentYear}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-magenta fill-magenta" /> in Kentucky
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
