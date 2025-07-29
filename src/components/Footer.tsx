'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-green-500/30 py-3 px-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-green-500/70 font-mono text-xs">
        <div className="mb-2 md:mb-0">
          © {currentYear} Kalan Roye. All rights reserved.
        </div>
        
        <div className="flex space-x-4">
        <Link 
            href="https://www.kalanroye.com" 
            className="hover:text-green-400 transition-colors"
          >
            Main Site
          </Link>
          <Link 
              href="https://blog.kalanroye.com" 
              className="hover:text-green-400 transition-colors"
            >
              Blog
            </Link>
        </div>
      </div>
    </footer>
  );
} 