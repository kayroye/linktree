
import React from "react";

import Terminal from "@/components/Terminal";
import ConnectionsClient from "../components/ConnectionsClient";

// This is a server component. The intro and links are rendered in ConnectionsClient (client component).
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Terminal title="linktree | Kalan Roye" className="shadow-2xl">
          <div className="space-y-6">
            {/* Intro & Links Section (Client) */}
            <ConnectionsClient />
          </div>
        </Terminal>
      </div>
    </div>
  );
}
    