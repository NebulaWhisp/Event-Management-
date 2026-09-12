import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  ticketCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  ticketCount = 1
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe pointer-events-none">
      <div className="max-w-md mx-auto px-4 pb-3 pt-1">
        <div className="pointer-events-auto h-16 px-2 rounded-full bg-[#2b2836]/85 backdrop-blur-2xl border border-[#4a4455]/30 shadow-[0_8px_32px_-4px_rgba(108,60,233,0.45)] flex items-center justify-between gap-1">
          {/* 1. Explore */}
          <button
            onClick={() => onNavigate('explore')}
            aria-label="Explore"
            className={`flex-1 h-12 flex flex-col items-center justify-center transition-all ${
              currentScreen === 'explore'
                ? 'text-[#00dce6] font-semibold scale-105'
                : 'text-[#ccc3d8] hover:text-[#e6e0f2]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                currentScreen === 'explore' ? 'fill' : ''
              }`}
            >
              explore
            </span>
            <span className="text-[11px] mt-0.5 tracking-tight">Explore</span>
          </button>

          {/* 2. Events */}
          <button
            onClick={() => onNavigate('events')}
            aria-label="Events"
            className={`flex-1 h-12 flex flex-col items-center justify-center transition-all ${
              currentScreen === 'events'
                ? 'text-[#00dce6] font-semibold scale-105'
                : 'text-[#ccc3d8] hover:text-[#e6e0f2]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                currentScreen === 'events' ? 'fill' : ''
              }`}
            >
              calendar_today
            </span>
            <span className="text-[11px] mt-0.5 tracking-tight">Events</span>
          </button>

          {/* 3. Center Create Floating Button */}
          <div className="flex items-center justify-center px-1">
            <button
              onClick={() => onNavigate('create')}
              aria-label="Create Event"
              className={`w-12 h-12 -mt-5 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#b0003e] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,75,114,0.45)] hover:scale-110 active:scale-95 transition-all ${
                currentScreen === 'create' ? 'ring-2 ring-[#00dce6]' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[26px]">add</span>
            </button>
          </div>

          {/* 4. Tickets */}
          <button
            onClick={() => onNavigate('tickets')}
            aria-label="Tickets"
            className={`flex-1 h-12 flex flex-col items-center justify-center relative transition-all ${
              currentScreen === 'tickets'
                ? 'text-[#00dce6] font-semibold scale-105'
                : 'text-[#ccc3d8] hover:text-[#e6e0f2]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                currentScreen === 'tickets' ? 'fill' : ''
              }`}
            >
              confirmation_number
            </span>
            <span className="text-[11px] mt-0.5 tracking-tight">Tickets</span>
            {ticketCount > 0 && (
              <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#7c3aed] text-white text-[9px] font-bold flex items-center justify-center">
                {ticketCount}
              </span>
            )}
          </button>

          {/* 5. Profile */}
          <button
            onClick={() => onNavigate('profile')}
            aria-label="Profile"
            className={`flex-1 h-12 flex flex-col items-center justify-center transition-all ${
              currentScreen === 'profile'
                ? 'text-[#00dce6] font-semibold scale-105'
                : 'text-[#ccc3d8] hover:text-[#e6e0f2]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                currentScreen === 'profile' ? 'fill' : ''
              }`}
            >
              person
            </span>
            <span className="text-[11px] mt-0.5 tracking-tight">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
