"use client";
import React, { useState } from "react";
import TerminalText from "@/components/TerminalText";
import Link from "next/link";
import Image from "next/image";

const links = [
  {
    title: "Personal Website",
    url: "https://www.kalanroye.com",
    description: "Full portfolio & blog",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    title: "Snapchat",
    url: "https://snapchat.com/add/kayrxye",
    description: "@kayrxye",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="currentColor"
      >
        <title>Snapchat</title>
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
      </svg>
    ),
  },
  {
    title: "Instagram",
    url: "https://instagram.com/kalanroye",
    description: "@kalanroye",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.kalanroye.com",
    description: "Professional network",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    title: "GitHub",
    url: "https://github.com/kayroye",
    description: "Code & Projects",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor">
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function ConnectionsClient() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <div className="mb-8">
        <TerminalText
          typingSpeed={25}
          showCursor={true}
          onComplete={() => setTimeout(() => setShowLinks(true), 500)}
        >
          {`kalan@linktree:~$ ls -la links/`}
        </TerminalText>
      </div>
      {showLinks && (
        <>
          {/* Crux Planner Link */}
          <div className="mb-4">
            <Link
              href="https://www.cruxplanner.ca?utm_source=linktree"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse block p-4 rounded-lg border-2 border-green-500/30 bg-green-950/20 hover:bg-green-950/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Visit Crux Planner - Course planning made simple."
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/crux_logo.png"
                    alt="Crux Planner Logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-green-300 group-hover:text-green-200 transition-colors text-base">
                    Crux Planner
                    <span className="ml-2 text-xs text-green-500 bg-green-950 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="text-sm text-green-500 group-hover:text-green-400 transition-colors">
                    Course planning made simple.
                  </div>
                </div>
                <div className="text-green-500 group-hover:text-green-300 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
            </Link>
          </div>
          {/* Other Links */}
          <div className="space-y-4">
            {links.map((link, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 ease-out translate-y-0 opacity-100"
              >
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group block p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                    border-green-500/30 bg-green-950/20 hover:bg-green-950/40 focus:outline-none focus:ring-2 focus:ring-green-400
                  `}
                  aria-label={`Visit ${link.title} - ${link.description}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon/Logo */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <div className="text-green-400 group-hover:text-green-300 transition-colors" aria-hidden="true">
                        {link.icon}
                      </div>
                    </div>

                    {/* Link Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-green-300 group-hover:text-green-200 transition-colors text-base">
                        {link.title}
                      </div>
                      <div className="text-sm text-green-500 group-hover:text-green-400 transition-colors">
                        {link.description}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="text-green-500 group-hover:text-green-300 group-hover:translate-x-1 transition-all">
                      →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-green-500/20 text-center">
            <div className="text-sm text-green-600 animate-pulse">
              $ connection_established ✓
            </div>
          </div>
        </>
      )}
    </>
  );
}
