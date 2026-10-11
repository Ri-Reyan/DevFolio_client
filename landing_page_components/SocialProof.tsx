export default function SocialProof() {
  return (
    <section className="py-12 md:py-16 border-b border-[#00000014] bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-mono tracking-widest text-neutral-400 uppercase mb-8">
          Built for developers aiming at top-tier engineering teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="font-bold text-lg md:text-xl tracking-tighter">
            ⚡ Next.js
          </span>
          <span className="font-bold text-lg md:text-xl tracking-tighter">
            🐳 Docker
          </span>
          <span className="font-bold text-lg md:text-xl tracking-tighter">
            ▲ Vercel
          </span>
          <span className="font-bold text-lg md:text-xl tracking-tighter">
            🐘 PostgreSQL
          </span>
          <span className="font-bold text-lg md:text-xl tracking-tighter">
            prisma
          </span>
        </div>
      </div>
    </section>
  );
}
