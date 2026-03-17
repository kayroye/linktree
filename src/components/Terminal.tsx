import React, { ReactNode } from 'react';

interface TerminalProps {
  children: ReactNode;
  title?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function Terminal({ 
  children, 
  title = 'kayroye.com', 
  fullScreen = false, 
  className = '' 
}: TerminalProps) {
  return (
    <div 
      className={`
        bg-black text-green-400 border border-green-500/40 rounded-md overflow-hidden
        font-mono flex flex-col
        shadow-[0_0_0_1px_rgba(74,222,128,0.08),0_8px_32px_rgba(0,0,0,0.8),0_0_40px_rgba(74,222,128,0.06)]
        ${fullScreen ? 'h-screen w-screen' : 'w-full'}
        ${className}
      `}
      style={{ height: fullScreen ? undefined : '80vh' }}
    >
      {/* Terminal Header */}
      <div className="px-4 py-2 bg-black border-b border-green-500/30 flex items-center">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex-1 text-center text-xs font-medium text-green-500/70 tracking-widest">{title}</div>
        <div className="w-[72px]"></div>
      </div>
      
      {/* Terminal Content with subtle CRT scanlines */}
      <div className="flex-1 p-5 overflow-visible flex flex-col min-h-0 terminal-scanlines" style={{ minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
} 