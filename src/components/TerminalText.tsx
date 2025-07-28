'use client';

import { useState, useEffect, ReactNode, useRef, Fragment } from 'react';

interface TerminalTextProps {
  children: string;
  typingSpeed?: number;
  fastTypingSpeed?: number;
  showCursor?: boolean;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TerminalText({ 
  children, 
  typingSpeed = 30,
  fastTypingSpeed = 5,
  showCursor = true,
  delay = 0,
  className = '',
  onComplete
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const hiddenTextRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentSpeedRef = useRef(typingSpeed);
  const wordIndexRef = useRef(0);
  const currentTextRef = useRef('');
  
  // Process text function to handle newlines and &nbsp; tags
  const processText = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex, lineArray) => {
      const processedLine = line.replace(/&nbsp;/g, '\u00A0');
      
      return (
        <Fragment key={lineIndex}>
          {processedLine}
          {lineIndex < lineArray.length - 1 && <br />}
        </Fragment>
      );
    });
  };

  // Helper to start typing interval, only uses refs and arguments
  function runTypingInterval(words: string[], onComplete?: () => void) {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (wordIndexRef.current < words.length) {
        currentTextRef.current += words[wordIndexRef.current];
        setDisplayedText(currentTextRef.current);
        wordIndexRef.current++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTyping(false);
        setHasCompleted(true);
        if (onComplete) onComplete();
      }
    }, currentSpeedRef.current * 2);
  }

  useEffect(() => {
    // Skip if already completed
    if (hasCompleted) return;
    
    // Reset when content changes
    setDisplayedText('');
    currentSpeedRef.current = typingSpeed;
    wordIndexRef.current = 0;
    currentTextRef.current = '';
    
    // Delay before starting typing effect
    const timeout = setTimeout(() => {
      setIsTyping(true);
      const words = children.match(/(\S+|\s+)/g) || [];
      wordIndexRef.current = 0;
      currentTextRef.current = '';
      runTypingInterval(words, onComplete);
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [children, typingSpeed, delay, onComplete, hasCompleted]);

  // Handle interaction events
  const handleInteractionStart = () => {
    if (!hasCompleted && isTyping) {
      setIsInteracting(true);
      currentSpeedRef.current = fastTypingSpeed;
      const words = children.match(/(\S+|\s+)/g) || [];
      runTypingInterval(words, onComplete);
    }
  };

  const handleInteractionEnd = () => {
    if (!hasCompleted && isTyping) {
      setIsInteracting(false);
      currentSpeedRef.current = typingSpeed;
      const words = children.match(/(\S+|\s+)/g) || [];
      runTypingInterval(words, onComplete);
    }
  };

  
  return (
    <div className="relative">
      {/* Hidden element to calculate full height */}
      <div 
        ref={hiddenTextRef}
        className={`font-mono ${className} opacity-0 absolute pointer-events-none whitespace-pre-wrap`}
        aria-hidden="true"
      >
        {processText(children)}
      </div>
      
      {/* Visible typing element */}
      <div 
        className={`font-mono ${className} select-none`}
        style={
          isTyping
            ? { minHeight: hiddenTextRef.current?.offsetHeight || 'auto' }
            : undefined
        }
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onClick={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      >
        {processText(displayedText)}
        {showCursor && isTyping && (
          <span className={`inline-block w-2 h-4 bg-green-400 ml-0.5 ${isInteracting ? 'animate-pulse' : 'animate-pulse'}`}></span>
        )}
      </div>
    </div>
  );
}

// For static text without typing effect
export function StaticTerminalText({ 
  children, 
  className = '',
  showPrompt = false
}: { 
  children: ReactNode;
  className?: string;
  showPrompt?: boolean;
}) {
  // Process text if children is a string
  const processText = (text: string) => {
    // First split by newlines
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex, lineArray) => {
      // Replace &nbsp; with actual non-breaking spaces
      const processedLine = line.replace(/&nbsp;/g, '\u00A0');
      
      return (
        <Fragment key={lineIndex}>
          {processedLine}
          {/* Add line break between lines, but not after the last line */}
          {lineIndex < lineArray.length - 1 && <br />}
        </Fragment>
      );
    });
  };

  const formattedContent = typeof children === 'string' 
    ? processText(children)
    : children;

  return (
    <div className={`font-mono ${className}`}>
      {showPrompt && <span className="text-green-500 mr-2">$</span>}
      {formattedContent}
    </div>
  );
} 