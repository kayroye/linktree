"use client";

import React from "react";
import Link from "next/link";
import Terminal from "@/components/Terminal";
import TerminalText, { StaticTerminalText } from "@/components/TerminalText";
import Footer from "@/components/Footer";

export default function RateLimit() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-400">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Terminal title="ERROR 429 - RATE LIMIT EXCEEDED" fullScreen={false}>
          <div className="p-4 space-y-6">
            <TerminalText typingSpeed={20}>
              $ system.request --resource=&quot;/api/endpoint&quot;
            </TerminalText>
            <StaticTerminalText className="text-red-500 mt-4">
              Error: Too many requests. You have exceeded the allowed rate limit for this resource.
            </StaticTerminalText>
            <div className="mt-8 border-t border-green-500/30 pt-4">
              <StaticTerminalText showPrompt={true} className="mb-4">
                Running diagnostics...
              </StaticTerminalText>
              <div className="space-y-2 ml-4">
                <StaticTerminalText>
                  <span className="text-yellow-400">→ Possible causes:</span>
                </StaticTerminalText>
                <ul className="list-disc ml-8 space-y-1 text-green-300">
                  <li>You made too many requests in a short period</li>
                  <li>Automated scripts or bots triggered the limit</li>
                  <li>Shared IP address with other users</li>
                </ul>
              </div>
              <div className="mt-6 space-y-2 ml-4">
                <StaticTerminalText>
                  <span className="text-yellow-400">→ Suggested actions:</span>
                </StaticTerminalText>
                <ul className="list-disc ml-8 space-y-1 text-green-300">
                  <li>Wait a minute and try again</li>
                  <li>Reduce the frequency of your requests</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <Link
                href="/"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 px-4 rounded border border-green-500/40 transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">$</span> cd /home
              </Link>
              <Link
                href="/projects"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 px-4 rounded border border-green-500/40 transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">$</span> cd /projects
              </Link>
              <Link
                href="/blog"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 px-4 rounded border border-green-500/40 transition-colors inline-flex items-center justify-center"
              >
                <span className="mr-2">$</span> cd /blog
              </Link>
            </div>
          </div>
        </Terminal>
      </main>
      <Footer />
    </div>
  );
} 