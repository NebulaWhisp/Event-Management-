import React, { useState, useEffect } from 'react';
import { EventItem, ScreenType } from '../types';

interface ExploreScreenProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (screen: ScreenType) => void;
  savedEventIds: string[];
  onToggleSave: (eventId: string) => void;
  onShowToast: (message: string, icon?: string, isAccent?: boolean) => void;
  onQuickBook: (event: EventItem) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  events,
  onSelectEvent,
  onNavigate,
  savedEventIds,
  onToggleSave,
  onShowToast,
  onQuickBook
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Countdown timer for featured drop
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 38,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredEvent = events.find((e) => e.id === 'chromesthesia') || events[0];

  const categories = [
    { id: 'all', label: 'All Vibes' },
    { id: 'trending', label: '🔥 Trending' },
    { id: 'music', label: '🎵 Music & Rave' },
    { id: 'tech', label: '💻 Tech & AI' },
    { id: 'arts', label: '🎨 Arts & Cinema' },
    { id: 'social', label: '🍸 Social & Mixers' }
  ];

  const filteredEvents = events.filter((e) => {
    if (e.id === 'chromesthesia') return false; // Shown in hero
    const matchesSearch =
      searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'trending') return e.isHot;
    if (activeCategory === 'music') return e.category === 'music' || e.category === 'nightlife';
    if (activeCategory === 'tech') return e.category === 'tech' || e.category === 'startup';
    if (activeCategory === 'arts') return e.category === 'arts' || e.category === 'film';
    if (activeCategory === 'social') return e.category === 'social' || e.category === 'nightlife';
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 gap-6 pt-2 pb-28">
      {/* 1. Dynamic Greeting & Context Header */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#00dce6] animate-ping" />
            <span className="text-[11px] font-bold text-[#00dce6] uppercase tracking-wider">
              Live • SF Pulse
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2b2836] border border-[#4a4455]/30">
            <span
              className="material-symbols-outlined text-[15px] text-[#ffb2ba] fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="text-xs font-semibold text-[#e6e0f2]">32 Friends Out</span>
          </div>
        </div>

        <div className="flex flex-col mt-1">
          <h1 className="font-extrabold text-2xl sm:text-[28px] text-[#e6e0f2] tracking-tight leading-snug">
            Hey Maya,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2bbff] via-[#ffb2ba] to-[#00dce6]">
              find your next pulse ✨
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#ccc3d8] mt-0.5">
            Handcrafted lineups & hidden rooms curated for your sound.
          </p>
        </div>

        {/* Search Input & Quick Chips */}
        <div className="relative mt-2">
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3.5 text-[#ccc3d8]/70 text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Artists, secret venues, afterhours..."
              className="w-full h-12 pl-11 pr-11 rounded-full bg-[#201e2b] text-[#e6e0f2] placeholder:text-[#ccc3d8]/50 text-sm shadow-md border border-[#4a4455]/30 focus:outline-none focus:border-[#d2bbff] focus:bg-[#2b2836] transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 w-7 h-7 rounded-full bg-[#363341] flex items-center justify-center text-[#ccc3d8] hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('events')}
                aria-label="Toggle filters"
                className="absolute right-2 w-8 h-8 rounded-full bg-[#3a3745]/80 flex items-center justify-center text-[#e6e0f2] hover:text-[#00dce6] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            )}
          </div>

          {/* Quick Chips Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none -mx-4 px-4 mt-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-[#d2bbff] text-[#3f008e] shadow-[0_2px_12px_rgba(210,187,255,0.35)]'
                      : 'bg-[#201e2b] text-[#ccc3d8] hover:text-[#e6e0f2] border border-[#4a4455]/30'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Live Featured Event Hero Card with Countdown */}
      {featuredEvent && (
        <section
          onClick={() => onSelectEvent(featuredEvent)}
          className="group relative w-full rounded-2xl overflow-hidden shadow-[0_12px_36px_-6px_rgba(124,58,237,0.35)] bg-[#201e2b] border border-[#4a4455]/30 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
        >
          <div className="relative w-full h-80">
            <img
              src={featuredEvent.imageUrl}
              alt={featuredEvent.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d19] via-[#0f0d19]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/25 via-transparent to-[#b0003e]/20 mix-blend-screen" />

            {/* Top Overlay Tags */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b0003e]/90 text-[#ffbcc3] shadow-md backdrop-blur-md border border-[#ffb2ba]/30">
                <span className="w-2 h-2 rounded-full bg-[#ffb2ba] animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Spotlight Drop</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#363341]/85 text-[#eaddff] backdrop-blur-md border border-[#4a4455]/40">
                <span className="material-symbols-outlined text-[15px]">local_activity</span>
                <span className="text-xs font-bold">Tier 1 • $49</span>
              </div>
            </div>

            {/* Bottom Content Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1.5 z-10">
              {/* Countdown Ticker */}
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00dce6] text-[18px]">timer</span>
                <span className="text-xs font-bold text-[#00dce6] tracking-wider uppercase">
                  Starts in {String(timeLeft.days).padStart(2, '0')}d{' '}
                  {String(timeLeft.hours).padStart(2, '0')}h{' '}
                  {String(timeLeft.minutes).padStart(2, '0')}m{' '}
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>

              <h2 className="font-bold text-lg sm:text-xl text-[#e6e0f2] leading-tight group-hover:text-[#d2bbff] transition-colors">
                {featuredEvent.title}
              </h2>

              <div className="flex items-center gap-2 text-[#ccc3d8] text-xs">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#ffb2ba]">
                    calendar_month
                  </span>
                  <span>{featuredEvent.date}</span>
                </div>
                <span className="text-[#958da1]">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#00dce6]">
                    location_on
                  </span>
                  <span className="truncate">{featuredEvent.venue}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-[#201e2b]">
                    VR
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#b0003e] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-[#201e2b]">
                    AX
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#007278] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-[#201e2b]">
                    +18
                  </div>
                  <span className="ml-3 text-xs text-[#ccc3d8] font-medium">Going</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBook(featuredEvent);
                  }}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#b0003e] hover:opacity-95 active:scale-95 transition-all shadow-[0_4px_18px_rgba(255,75,114,0.4)] flex items-center gap-1.5"
                >
                  <span>Quick Book</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Live Pulse Stats Ticker */}
      <section className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#2b2836]/60 backdrop-blur-xl border border-[#4a4455]/30 shadow-lg">
        <div className="flex flex-col items-center justify-center p-1 text-center">
          <span className="font-extrabold text-xl text-[#d2bbff]">18.4k</span>
          <span className="text-[11px] text-[#ccc3d8] mt-0.5">Attendees Out</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1 text-center border-x border-[#4a4455]/30">
          <span className="font-extrabold text-xl text-[#ffb2ba]">340+</span>
          <span className="text-[11px] text-[#ccc3d8] mt-0.5">Active Venues</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1 text-center">
          <span className="font-extrabold text-xl text-[#00dce6]">99.2%</span>
          <span className="text-[11px] text-[#ccc3d8] mt-0.5">Vibe Rating</span>
        </div>
      </section>

      {/* 4. Browse by Category Horizontal Hub ("Pulse Clusters") */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#d2bbff]">interests</span>
            <h2 className="font-bold text-[16px] text-[#e6e0f2]">Pulse Clusters</h2>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-[#d2bbff] hover:text-[#00dce6] transition-colors flex items-center"
          >
            See All 14
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          <div
            onClick={() => {
              setActiveCategory('tech');
              onShowToast('Viewing Tech & AI events', 'bolt');
            }}
            className="shrink-0 w-40 p-3.5 rounded-2xl bg-[#201e2b] border border-[#4a4455]/30 flex flex-col justify-between hover:bg-[#2b2836] transition-all cursor-pointer shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#d2bbff]/10 text-[#d2bbff] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(210,187,255,0.25)]">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs text-[#e6e0f2]">Tech & AI</h3>
              <p className="text-[11px] text-[#ccc3d8]">42 events live</p>
            </div>
          </div>

          <div
            onClick={() => {
              setActiveCategory('music');
              onShowToast('Viewing Electronic & Live events', 'graphic_eq');
            }}
            className="shrink-0 w-40 p-3.5 rounded-2xl bg-[#201e2b] border border-[#4a4455]/30 flex flex-col justify-between hover:bg-[#2b2836] transition-all cursor-pointer shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffb2ba]/15 text-[#ffb2ba] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(255,178,186,0.25)]">
              <span className="material-symbols-outlined text-[22px]">graphic_eq</span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs text-[#e6e0f2]">Electronic & Live</h3>
              <p className="text-[11px] text-[#ccc3d8]">28 events live</p>
            </div>
          </div>

          <div
            onClick={() => {
              setActiveCategory('arts');
              onShowToast('Viewing Design & Creative events', 'palette');
            }}
            className="shrink-0 w-40 p-3.5 rounded-2xl bg-[#201e2b] border border-[#4a4455]/30 flex flex-col justify-between hover:bg-[#2b2836] transition-all cursor-pointer shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00dce6]/15 text-[#00dce6] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(0,220,230,0.25)]">
              <span className="material-symbols-outlined text-[22px]">palette</span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs text-[#e6e0f2]">Design & Creative</h3>
              <p className="text-[11px] text-[#ccc3d8]">19 events live</p>
            </div>
          </div>

          <div
            onClick={() => {
              setActiveCategory('tech');
              onShowToast('Viewing Startup Summits', 'rocket_launch');
            }}
            className="shrink-0 w-40 p-3.5 rounded-2xl bg-[#201e2b] border border-[#4a4455]/30 flex flex-col justify-between hover:bg-[#2b2836] transition-all cursor-pointer shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 text-[#eaddff] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(124,58,237,0.25)]">
              <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs text-[#e6e0f2]">Startup Summits</h3>
              <p className="text-[11px] text-[#ccc3d8]">15 events live</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Happening This Weekend Feed */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#ffb2ba]">
              celebration
            </span>
            <h2 className="font-bold text-[16px] text-[#e6e0f2]">Happening This Weekend</h2>
          </div>
          <span className="text-[11px] text-[#ccc3d8]">Fri - Sun Picks</span>
        </div>

        {/* Event List */}
        <div className="flex flex-col gap-4">
          {filteredEvents.map((evt) => {
            const isSaved = savedEventIds.includes(evt.id);
            return (
              <article
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="flex flex-col rounded-2xl bg-[#201e2b] border border-[#4a4455]/30 overflow-hidden shadow-md transition-all duration-300 hover:shadow-[0_8px_28px_rgba(108,60,233,0.25)] cursor-pointer group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201e2b] via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#363341]/90 text-[#00dce6] text-[11px] font-bold backdrop-blur-md border border-[#4a4455]/40">
                      {evt.categoryLabel}
                    </span>
                  </div>

                  {/* Heart Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(evt.id);
                    }}
                    aria-label="Save to bookmarks"
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-[#363341]/85 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform shadow-md ${
                      isSaved ? 'text-[#ffb2ba]' : 'text-[#ccc3d8] hover:text-[#ffb2ba]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isSaved ? 'fill' : ''
                      }`}
                      style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Seat Meter Badge */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between bg-[#0f0d19]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-1.5 text-[#ffb2ba]">
                      <span className="material-symbols-outlined text-[15px] animate-pulse">
                        local_fire_department
                      </span>
                      <span className="text-[11px] font-bold">{evt.capacityText}</span>
                    </div>
                    <div className="w-20 h-1.5 rounded-full bg-[#363341] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ffb2ba] to-[#b0003e]"
                        style={{ width: `${evt.capacityPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#2b2836] text-[#d2bbff]">
                        {evt.date}
                      </span>
                      <span className="text-xs text-[#ccc3d8]">{evt.time}</span>
                    </div>
                    <span className="text-base font-bold text-[#e6e0f2]">
                      {evt.priceLabel || (evt.isFree ? 'Free' : `$${evt.price}`)}
                    </span>
                  </div>

                  <h3 className="font-bold text-[15px] text-[#e6e0f2] leading-snug group-hover:text-[#d2bbff] transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-1 text-[#ccc3d8] text-xs">
                    <span className="material-symbols-outlined text-[15px] text-[#00dce6] shrink-0">
                      near_me
                    </span>
                    <span className="truncate">{evt.venue}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#4a4455]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#7c3aed] text-white text-[10px] flex items-center justify-center font-bold">
                        {evt.organizer.initials || evt.organizer.name.slice(0, 1)}
                      </div>
                      <span className="text-xs text-[#e6e0f2] font-medium">
                        {evt.organizer.name}
                      </span>
                      {evt.organizer.verified && (
                        <span
                          className="material-symbols-outlined text-[#00dce6] text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(evt);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#363341] text-[#d2bbff] hover:bg-[#d2bbff] hover:text-[#3f008e] active:scale-95 transition-all text-xs font-bold"
                    >
                      {evt.isFree ? 'Claim Spot' : evt.price === 28 ? 'Reserve $28' : 'Get Pass'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-[#201e2b] border border-[#4a4455]/30">
              <div className="w-14 h-14 rounded-full bg-[#2b2836] flex items-center justify-center text-[#d2bbff] mb-2">
                <span className="material-symbols-outlined text-[28px]">nightlife</span>
              </div>
              <h3 className="font-bold text-base text-[#e6e0f2]">No pulses found</h3>
              <p className="text-xs text-[#ccc3d8] max-w-xs mt-1">
                Try searching for another vibe like "Rave", "Tech", or clear filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 rounded-full bg-[#d2bbff] text-[#3f008e] font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Community Micro-Banner */}
      <section className="p-4 rounded-2xl bg-gradient-to-br from-[#201e2b] via-[#2b2836] to-[#201e2b] border border-[#4a4455]/30 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#007278]/30 text-[#00dce6] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#e6e0f2] truncate">
              Host an Underground Set?
            </span>
            <span className="text-[11px] text-[#ccc3d8] truncate">
              Publish in under 2 mins & sell tickets
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('create')}
          className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#00dce6]/10 text-[#00dce6] text-xs font-bold hover:bg-[#00dce6] hover:text-[#00373a] transition-all"
        >
          Create
        </button>
      </section>
    </div>
  );
};
