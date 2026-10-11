import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 lg:py-20 border-t border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Top Main Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-neutral-900">
          <div>
            <span className="text-2xl font-bold tracking-tight">
              DevFolio<span className="text-orange-500">.</span>
            </span>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-sm font-light leading-relaxed">
              Prove your skills through AST analysis, telemetry, and automated
              AI scoring. Don't just claim them.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono text-neutral-400">
            <a href="#features" className="hover:text-white transition">
              // FEATURES
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              // PIPELINE
            </a>
            <a href="#faqs" className="hover:text-white transition">
              // FAQ MATRIX
            </a>
            <a href="#pricing" className="hover:text-white transition">
              // PRICING
            </a>
          </div>
        </div>

        {/* Bottom Status & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM STATUS: ALL ENGINES OPERATIONAL</span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <span className="text-neutral-600">© 2026 DevFolio.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
