import React, { useState } from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  selectedEventTitle?: string;
  onBack?: () => void;
  savedCount?: number;
  unreadNotifications?: number;
  onNotificationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  selectedEventTitle,
  onBack,
  unreadNotifications = 2
}) => {
  const [city, setCity] = useState('San Francisco, CA');
  const [showCityPicker, setShowCityPicker] = useState(false);

  const cities = ['San Francisco, CA', 'Oakland, CA', 'San Jose, CA', 'Berkeley, CA'];

  const isSubPage = selectedEventTitle !== undefined;

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#14121e]/85 backdrop-blur-xl border-b border-[#4a4455]/20 shadow-[0_1px_12px_rgba(0,0,0,0.25)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {isSubPage ? (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#ccc3d8] hover:text-[#e6e0f2] hover:bg-[#201e2b] transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1XY90sr0yW17_6P1KpS8hawkNVq_x9KO58wAHt5em-myVARsH5MzkiOUcuWtGEfHcp-w9A4U5dgN-IH6ntC4qqeeWJPSpwaOvCwMQUjhZw0wvALnqv0D9T1_vUotUFeqjjrhd-YPnIWFfRXsghoqDHZdpztZM-BM3qrtIrNdJBtKOiGGdv-YnpkK6zKEjA3XjEZIIeqhPaLtQDMRSvGO5_92jjqPDf71nzOf3SD3T3iQ-Zg0IKhRePMG4U"
              alt="EventPulse Brand Logo"
              className="h-8 w-8 object-contain shrink-0"
            />
          </div>

          <div className="flex flex-col min-w-0">
            {isSubPage ? (
              <h1 className="font-semibold text-[17px] text-[#e6e0f2] tracking-tight truncate leading-tight">
                {selectedEventTitle}
              </h1>
            ) : (
              <>
                <span className="font-bold text-[18px] text-[#e6e0f2] tracking-tight truncate leading-none">
                  EventPulse
                </span>
                <div className="relative">
                  <button
                    onClick={() => setShowCityPicker(!showCityPicker)}
                    className="flex items-center gap-1 mt-0.5 text-[#00dce6] text-xs font-semibold hover:opacity-80 transition-opacity"
                  >
                    <span className="truncate max-w-[130px]">{city}</span>
                    <span className="material-symbols-outlined text-[14px] leading-none shrink-0">
                      expand_more
                    </span>
                  </button>

                  {showCityPicker && (
                    <div className="absolute top-6 left-0 z-50 w-44 py-1.5 rounded-xl bg-[#2b2836] shadow-2xl border border-[#4a4455]/40 backdrop-blur-xl">
                      {cities.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setCity(c);
                            setShowCityPicker(false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs font-semibold hover:bg-[#363341] transition-colors flex items-center justify-between ${
                            c === city ? 'text-[#00dce6]' : 'text-[#e6e0f2]'
                          }`}
                        >
                          <span>{c}</span>
                          {c === city && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onNavigate('profile')}
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#ccc3d8] hover:text-[#e6e0f2] hover:bg-[#201e2b] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ffb2ba] ring-2 ring-[#14121e] shadow-[0_0_8px_rgba(255,178,186,0.8)] animate-pulse" />
            )}
          </button>

          <button
            onClick={() => onNavigate('profile')}
            aria-label="Attendee Profile"
            className={`w-10 h-10 flex items-center justify-center p-0.5 rounded-full ring-1 transition-all ${
              currentScreen === 'profile'
                ? 'ring-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.4)]'
                : 'ring-[#4a4455]/60 hover:ring-[#d2bbff]'
            }`}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAP6AseSfw61UalRuF5LB1O_00mZNV-AHvXhz8d1oOq2_HfkY286jDGZK_HfCmkmzcjOEkLmjF0QKKhLPO-2i95ntOCgym_PXxosE_Vr_1T_RYVF6Q5Vr7e3MnjZTJqthiJGDd1975rN7_x0eIp3ZsFDkWv9wOLmQGbewrTSAegylTxgk0iWA0copSHrxvEktZdXXR3Y2N6p6HXEOmImgF4owO0P6qGcqoRW2AhcH0CO2CQPLfrh_P"
              alt="Maya Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
