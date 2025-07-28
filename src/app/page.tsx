import Terminal from "@/components/Terminal";
import ConnectionsClient from "../components/ConnectionsClient";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Terminal title="linktree | Kalan Roye" className="shadow-2xl">
          <div className="space-y-6">
            <ConnectionsClient />
          </div>
        </Terminal>
      </div>
    </div>
  );
}
    