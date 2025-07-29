'use client';

import Ticker from '@/components/Ticker';
import useSWR from 'swr';
import { RecentMusic } from '@/app/actions/music';
import RateLimit from '@/components/rate-limit';
import { useEffect, useState } from 'react';

// Random fallback messages displayed when no recent music is available
const randomMessages = [
  "Have you listened to Jungle? The band? They're genuinely so good, you should give em' a go.",
  "Where do you think is the best pizza place? I'm having trouble deciding. DM me, let's figure it out together (I already know the answer).",
  "wobbleitwiggleitwobbleitwiggleitwobbleitwiggleit wooaaahh, swing! - Travis Scott",
  "Am I cooked? Are we cooked? Time will tell I guess...",
  "Yeah, I built this myself. My mom is so proud of me and says I'm a handsome young man.",
  "I'm doing everything in my power to stay out of 'unc' territory as long as I can.",
  "Go on, click one of the links. You know you wanna. Stop reading this and click one of the links. Seriously. Just click one. Click.",
  "Wonder why they call it a 'link tree' and not a 'link list'. I mean, look at it. Looks like a list to me. Who do I talk to about this?",
  "Fantastic Four was genuinely one of the best movies I've seen in a while. Visually stunning, and the music was great too.",
  "Did you know this ticker will update and show you what I'm listening to right now? It's kinda cool. Took me a while to do though.",
  "You've been reading this thing for quite a while now. Are we bonding rn?",
  "This site is 100% gluten-free, keto-friendly, and powered by ur m-",
  "If you lick your screen right now, you get 20 dollars. Trust me, I coded it in."
];

// Simple fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TickerWrapperProps {
  /** Characters per second */
  speed?: number;
  /** Number of non-breaking spaces appended after the message */
  spacing?: number;
  /** Seconds to wait after the text exits on the left */
  pause?: number;
  className?: string;
}

export default function TickerWrapper({
  speed = 12,
  spacing = 20,
  pause = 2,
  className = '',
}: TickerWrapperProps) {
  // Revalidate every minute and also on window focus to keep things fresh
  const { data, error } = useSWR<RecentMusic>('/api/music/recent', fetcher, {
    refreshInterval: 60 * 1000, // 1 minute
    revalidateOnFocus: true,
  });

  const now = Math.floor(Date.now() / 1000);

  // Determine if something is currently playing (within last 3 minutes)
  const currentTrack = data?.tracks?.find((track) => {
    if (!track.scrobbleDate) return false;
    const scrobbleTime = parseInt(track.scrobbleDate, 10);
    return now - scrobbleTime < 180; // 3 minutes
  });

  // Get user's current date in 'Tuesday, July 29th, 2025' format
  const getCurrentDateString = () => {
    const now = new Date();
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayOfWeek = days[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    // Ordinal suffix
    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    return `${dayOfWeek}, ${month} ${day}${getOrdinal(day)}, ${year}`;
  };

  const trackMessage = currentTrack
    ? `♪ Now Playing - ${currentTrack.name} by ${currentTrack.artist} • View more at media.kalanroye.com • ${getCurrentDateString()}`
    : null;

  const [messages, setMessages] = useState<string[]>(
    trackMessage ? [trackMessage] : randomMessages
  );

  // Switch between track message and fun messages whenever the playing status changes.
  useEffect(() => {
    if (trackMessage) {
      setMessages([trackMessage]);
    } else {
      setMessages(randomMessages);
    }
    // Only run when the track message changes (or becomes null)
  }, [trackMessage]);

  // If we run into an API / rate-limit error, show a friendly message instead of the ticker.
  if (error || (data && 'error' in data)) {
    return <RateLimit />;
  }

  // Changing the key forces the animation to restart *only* when the message set changes,
  // ensuring a smooth transition without mid-scroll content swaps.
  const tickerKey = messages[0] || 'fallback';

  return (
    <Ticker
      key={tickerKey}
      messages={messages}
      speed={speed}
      spacing={spacing}
      pause={pause}
      className={className}
    />
  );
} 