import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-xl font-bold tracking-tight">
            DevFolio<span className="text-orange-500">.</span>
          </span>
          <p className="text-xs text-neutral-400 mt-1">
            Prove your skills, don't just claim them.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <Link href="/terms" className="hover:text-white transition">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <span className="text-neutral-600">© 2026 DevFolio</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
