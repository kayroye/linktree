'use client';

import { useState, useEffect } from 'react';

interface TickerProps {
  messages: string[]; // Array of messages to cycle through
  /** Characters per second */
  speed?: number;
  /** Number of non-breaking spaces appended after the message */
  spacing?: number;
  /** Seconds to wait after the text exits on the left */
  pause?: number;
  className?: string;
}

export default function Ticker({
  messages,
  speed = 12,
  spacing = 20,
  pause = 2,
  className = '',
}: TickerProps) {
  // Use a deterministic initial index during SSR (0) to avoid hydration mismatches.
  // Randomize after the component mounts on the client.
  const [index, setIndex] = useState(0);

  // After hydration (client-side), choose a random starting index and whenever the messages array changes
  useEffect(() => {
    if (messages.length > 0) {
      setIndex(Math.floor(Math.random() * messages.length));
    }
  }, [messages]);
  const currentMessage = messages[index] ?? '';

  // Preserve spaces with nbsp so the browser doesn't collapse them
  const spacer = '\u00A0'.repeat(spacing);
  const tickerContent = `${currentMessage}${spacer}`;

  // Calculate duration so the visual speed stays constant regardless of the
  // content length. Using monospace font, 1ch is ~1 character width.
  const contentLength = tickerContent.length; // characters
  const distanceInChars = contentLength + 100; // include viewport width
  const travelTime = distanceInChars / speed;
  const totalDuration = travelTime + pause;

  // Handler to change message every completed cycle
  const handleIteration = () => {
    if (messages.length <= 1) return;
    let next = Math.floor(Math.random() * messages.length);
    // Ensure we don't repeat the same message twice in a row if possible
    if (next === index && messages.length > 1) {
      next = (next + 1) % messages.length;
    }
    setIndex(next);
  };

  return (
    <div
      className={`relative overflow-hidden bg-black border-b border-green-500/30 text-green-400 font-mono text-sm py-2 ${className}`}
    >
      <div
        className="whitespace-nowrap inline-block animate-ticker"
        style={{ animationDuration: `${totalDuration}s` }}
        onAnimationIteration={handleIteration}
      >
        <span>{tickerContent}</span>
      </div>
    </div>
  );
} 