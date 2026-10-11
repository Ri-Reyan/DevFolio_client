import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-[#00000014] bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-black">
            DevFolio<span className="text-orange-600">.</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <a href="#features" className="hover:text-black transition">
            Features
          </a>
          <a href="#tracks" className="hover:text-black transition">
            Tracks
          </a>
          <a href="#how-it-works" className="hover:text-black transition">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 hover:opacity-75 transition"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-none hover:bg-neutral-800 transition shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
