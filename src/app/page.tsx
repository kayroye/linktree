import Terminal from "@/components/Terminal";
import TickerWrapper from "@/components/TickerWrapper";
import ConnectionsClient from "../components/ConnectionsClient";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      <TickerWrapper speed={15} spacing={50} pause={1} />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <Terminal title="linktree | Kalan Roye" className="shadow-2xl">
            <div className="flex flex-col flex-1 min-h-0 space-y-6">
              <ConnectionsClient />
            </div>
          </Terminal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
    