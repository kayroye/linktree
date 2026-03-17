import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-green-500/30 py-4 px-6 mt-auto">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center text-green-500/70 font-mono text-xs">
        <div className="mb-2 md:mb-0">
          © {currentYear} Kalan Roye. All rights reserved.
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="https://www.kalanroye.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors px-2"
          >
            Main Site
          </Link>
          <span className="text-green-700/60">•</span>
          <Link
            href="https://blog.kalanroye.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors px-2"
          >
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
} 