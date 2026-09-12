import React, { useState } from 'react';
import { EventItem } from '../types';

interface EventsScreenProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  savedEventIds: string[];
  onToggleSave: (eventId: string) => void;
  onShowToast: (message: string, icon?: string, isAccent?: boolean) => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({
  events,
  onSelectEvent,
  savedEventIds,
  onToggleSave,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [activeTag, setActiveTag] = useState<'all' | 'free' | 'weekend' | 'verified'>('all');
  const [priceFilter, setPriceFilter] = useState<'any' | 'free' | 'under50'>('any');
  const [radiusMiles, setRadiusMiles] = useState(10);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter application
  const filteredEvents = events.filter((evt) => {
    const term = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !term ||
      evt.title.toLowerCase().includes(term) ||
      evt.category.toLowerCase().includes(term) ||
      evt.venue.toLowerCase().includes(term);

    if (!matchesSearch) return false;

    // Quick tag filters
    if (activeTag === 'free' && evt.price > 0 && !evt.isFree) return false;
    if (activeTag === 'weekend' && !evt.isWeekend) return false;
    if (activeTag === 'verified' && !evt.isVerified) return false;

    // Drawer filters
    if (priceFilter === 'free' && evt.price > 0 && !evt.isFree) return false;
    if (priceFilter === 'under50' && evt.price >= 50) return false;
    if (verifiedOnly && !evt.isVerified) return false;

    return true;
  });

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      onShowToast('All nearby events are up to date', 'done_all');
    }, 600);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTag('all');
    setPriceFilter('any');
    setRadiusMiles(10);
    setVerifiedOnly(false);
    onShowToast('Default view restored', 'check_circle');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 gap-4 pt-2 pb-28">
      {/* Search Bar & View Toggle */}
      <div className="flex flex-col gap-2.5 pt-1">
        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#d2bbff]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artists, venues, vibes..."
            className="w-full h-12 pl-10 pr-20 rounded-full bg-[#2b2836] text-[#e6e0f2] placeholder:text-[#958da1] text-sm border border-[#4a4455]/30 focus:outline-none focus:border-[#d2bbff] focus:bg-[#363341] transition-all shadow-sm"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#ccc3d8] hover:text-[#e6e0f2] active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsGridView(!isGridView);
                onShowToast(
                  isGridView ? 'Switched to Standard View' : 'Switched to Compact Grid',
                  isGridView ? 'view_agenda' : 'grid_view'
                );
              }}
              aria-label="Toggle layout view"
              className="w-9 h-9 rounded-full bg-[#363341] text-[#d2bbff] flex items-center justify-center active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[19px]">
                {isGridView ? 'view_agenda' : 'grid_view'}
              </span>
            </button>
          </div>
        </div>

        {/* Active Filters Row & Drawer Trigger */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="shrink-0 h-9 px-3.5 rounded-full bg-[#7c3aed] text-[#ede0ff] text-xs font-semibold flex items-center gap-1.5 active:scale-95 shadow-[0_2px_12px_rgba(124,58,237,0.35)] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Filters</span>
            <span className="w-5 h-5 rounded-full bg-[#ffb2ba] text-[#400011] text-[10px] flex items-center justify-center font-bold">
              3
            </span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="shrink-0 h-9 px-3 rounded-full bg-[#201e2b] text-[#e6e0f2] text-xs font-semibold flex items-center gap-1 border border-[#4a4455]/30 hover:bg-[#2b2836] active:scale-95 transition-all"
          >
            <span className="text-[#00dce6] material-symbols-outlined text-[15px]">
              calendar_month
            </span>
            <span>All Dates</span>
            <span className="material-symbols-outlined text-[14px] text-[#958da1]">
              expand_more
            </span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="shrink-0 h-9 px-3 rounded-full bg-[#201e2b] text-[#e6e0f2] text-xs font-semibold flex items-center gap-1 border border-[#4a4455]/30 hover:bg-[#2b2836] active:scale-95 transition-all"
          >
            <span className="text-[#ffb2ba] material-symbols-outlined text-[15px]">
              payments
            </span>
            <span>
              {priceFilter === 'any' ? 'Price: Any' : priceFilter === 'free' ? 'Free Only' : '< $50'}
            </span>
            <span className="material-symbols-outlined text-[14px] text-[#958da1]">
              expand_more
            </span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="shrink-0 h-9 px-3 rounded-full bg-[#201e2b] text-[#e6e0f2] text-xs font-semibold flex items-center gap-1 border border-[#4a4455]/30 hover:bg-[#2b2836] active:scale-95 transition-all"
          >
            <span className="text-[#00dce6] material-symbols-outlined text-[15px]">
              near_me
            </span>
            <span>Nearby ({radiusMiles}mi)</span>
            <span className="material-symbols-outlined text-[14px] text-[#958da1]">
              expand_more
            </span>
          </button>
        </div>

        {/* Quick Toggle Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            onClick={() => setActiveTag('all')}
            className={`shrink-0 h-7 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all select-none ${
              activeTag === 'all'
                ? 'bg-[#d2bbff] text-[#3f008e] font-bold shadow-sm'
                : 'bg-[#1c1a27] text-[#ccc3d8] border border-[#4a4455]/30'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
            <span>All Events</span>
          </button>

          <button
            onClick={() => setActiveTag(activeTag === 'free' ? 'all' : 'free')}
            className={`shrink-0 h-7 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all select-none ${
              activeTag === 'free'
                ? 'bg-[#d2bbff] text-[#3f008e] font-bold shadow-sm'
                : 'bg-[#1c1a27] text-[#ccc3d8] border border-[#4a4455]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] text-[#00dce6]">sell</span>
            <span>Free Only</span>
          </button>

          <button
            onClick={() => setActiveTag(activeTag === 'weekend' ? 'all' : 'weekend')}
            className={`shrink-0 h-7 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all select-none ${
              activeTag === 'weekend'
                ? 'bg-[#d2bbff] text-[#3f008e] font-bold shadow-sm'
                : 'bg-[#1c1a27] text-[#ccc3d8] border border-[#4a4455]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] text-[#ffb2ba]">weekend</span>
            <span>This Weekend</span>
          </button>

          <button
            onClick={() => setActiveTag(activeTag === 'verified' ? 'all' : 'verified')}
            className={`shrink-0 h-7 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all select-none ${
              activeTag === 'verified'
                ? 'bg-[#d2bbff] text-[#3f008e] font-bold shadow-sm'
                : 'bg-[#1c1a27] text-[#ccc3d8] border border-[#4a4455]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] text-[#00dce6]">verified</span>
            <span>Verified Organizers</span>
          </button>
        </div>
      </div>

      {/* Live Results Counter Bar */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl text-[#e6e0f2] tracking-tight">Explore</span>
          <span className="h-5 px-2 rounded-full bg-[#363341] text-[#d2bbff] text-[11px] font-bold flex items-center justify-center">
            {filteredEvents.length} live
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#ccc3d8] text-xs">
          <span className="w-2 h-2 rounded-full bg-[#00dce6] animate-pulse shadow-[0_0_8px_rgba(0,220,230,0.8)]" />
          <span>Live in SF</span>
        </div>
      </div>

      {/* Events Container (Dynamic List or Grid) */}
      <div
        className={
          isGridView
            ? 'grid grid-cols-2 gap-3 transition-all duration-300'
            : 'flex flex-col gap-4 transition-all duration-300'
        }
      >
        {filteredEvents.map((card) => {
          const isSaved = savedEventIds.includes(card.id);
          return (
            <article
              key={card.id}
              onClick={() => onSelectEvent(card)}
              className="group relative flex flex-col rounded-xl bg-[#1c1a27] border border-[#4a4455]/30 overflow-hidden shadow-md transition-all hover:bg-[#201e2b] cursor-pointer"
            >
              <div className={`relative w-full overflow-hidden ${isGridView ? 'h-32' : 'h-44'}`}>
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a27] via-transparent to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="h-6 px-2.5 rounded-full bg-[#7c3aed] text-white text-[11px] font-bold flex items-center gap-1 backdrop-blur-md shadow-sm">
                    {card.categoryLabel}
                  </span>
                  {card.isVerified && (
                    <span className="h-6 px-1.5 rounded-full bg-[#14121e]/80 backdrop-blur-md text-[#00dce6] text-[11px] flex items-center">
                      <span
                        className="material-symbols-outlined text-[13px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </span>
                  )}
                  {card.isHot && !isGridView && (
                    <span className="h-6 px-2 rounded-full bg-[#14121e]/80 backdrop-blur-md text-[#ffb2ba] text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2ba] animate-ping" />
                      HOT
                    </span>
                  )}
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(card.id);
                  }}
                  aria-label="Save event"
                  className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#14121e]/70 backdrop-blur-md flex items-center justify-center active:scale-90 transition-all ${
                    isSaved ? 'text-[#ffb2ba]' : 'text-[#e6e0f2] hover:text-[#ffb2ba]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${isSaved ? 'fill' : ''}`}
                    style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    bookmark
                  </span>
                </button>

                {/* Bottom Bar on Image */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="h-6 px-2 rounded-md bg-[#14121e]/90 backdrop-blur-md text-[#ffb2ba] text-[11px] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                    <span className="truncate max-w-[90px]">{card.date}</span>
                  </span>
                  <span
                    className={`h-6 px-2.5 rounded-md text-[12px] font-extrabold flex items-center ${
                      card.isFree
                        ? 'bg-[#007278] text-[#86f7ff]'
                        : 'bg-[#b0003e] text-[#ffbcc3]'
                    }`}
                  >
                    {card.priceLabel || (card.isFree ? 'FREE' : `$${card.price}`)}
                  </span>
                </div>
              </div>

              <div className="p-3 flex flex-col gap-1.5">
                <h3 className="font-bold text-sm text-[#e6e0f2] truncate group-hover:text-[#d2bbff] transition-colors">
                  {card.title}
                </h3>
                <div className="flex items-center gap-1 text-[#ccc3d8] text-xs">
                  <span className="material-symbols-outlined text-[14px] text-[#00dce6] shrink-0">
                    location_on
                  </span>
                  <span className="truncate">{card.venue}</span>
                  <span className="text-[#958da1]">•</span>
                  <span className="text-[#00dce6] font-semibold shrink-0">{card.distance}</span>
                </div>

                {/* Capacity Bar */}
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex justify-between text-[11px] text-[#ccc3d8]">
                    <span className="truncate">{card.capacityText.split('•')[0] || 'Availability'}</span>
                    <span className="text-[#ffb2ba] font-semibold shrink-0">
                      {card.capacityText.split('•')[1] || `${card.capacityPercent}%`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#363341] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7c3aed] to-[#ffb2ba] rounded-full"
                      style={{ width: `${card.capacityPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center gap-2 bg-[#1c1a27] border border-[#4a4455]/30 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-[#2b2836] flex items-center justify-center text-[#d2bbff]">
            <span className="material-symbols-outlined text-[32px]">event_busy</span>
          </div>
          <h4 className="font-bold text-base text-[#e6e0f2]">No pulses found</h4>
          <p className="text-xs text-[#ccc3d8] max-w-xs">
            Try switching filters or search for something else in the Bay Area.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 h-9 px-4 rounded-full bg-[#d2bbff] text-[#3f008e] text-xs font-bold active:scale-95 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {filteredEvents.length > 0 && (
        <div className="flex flex-col items-center justify-center pt-2 pb-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="w-full max-w-xs h-12 rounded-full bg-[#2b2836] hover:bg-[#363341] text-[#e6e0f2] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all border border-[#4a4455]/30 shadow-sm group"
          >
            <span
              className={`material-symbols-outlined text-[18px] text-[#00dce6] ${
                isLoadingMore ? 'animate-spin' : 'group-hover:rotate-180'
              } transition-transform duration-500`}
            >
              sync
            </span>
            <span>{isLoadingMore ? 'Scanning Venues...' : 'Discover More Events'}</span>
          </button>
        </div>
      )}

      {/* Filter Bottom Drawer Modal Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />
          <div className="relative z-10 w-full max-w-md bg-[#2b2836] rounded-t-3xl p-5 flex flex-col gap-4 shadow-2xl border-t border-[#4a4455]/40 max-h-[85vh] overflow-y-auto">
            {/* Header Handle */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-1 rounded-full bg-[#4a4455]" />
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg text-[#e6e0f2]">Filter Events</span>
                  <span className="h-5 px-2 rounded-full bg-[#7c3aed] text-white text-[11px] font-bold flex items-center">
                    SF Bay Area
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#201e2b] text-[#ccc3d8] hover:text-[#e6e0f2] flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Distance Slider */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#201e2b] border border-[#4a4455]/30">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-[#e6e0f2]">Distance Radius</span>
                <span className="text-[#00dce6] font-bold">{radiusMiles} miles</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={radiusMiles}
                onChange={(e) => setRadiusMiles(Number(e.target.value))}
                className="w-full accent-[#00dce6] cursor-pointer bg-[#363341] rounded-lg h-2"
              />
              <div className="flex justify-between text-[10px] text-[#958da1]">
                <span>Walking (&lt;1 mi)</span>
                <span>Metro Bay (25 mi)</span>
                <span>50 mi</span>
              </div>
            </div>

            {/* Ticket Price Filter */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#201e2b] border border-[#4a4455]/30">
              <span className="text-xs font-semibold text-[#e6e0f2]">Ticket Price</span>
              <div className="grid grid-cols-3 gap-2">
                {(['any', 'free', 'under50'] as const).map((p) => {
                  const labels = { any: 'Any Price', free: 'Free Only', under50: '< $50' };
                  const isSelected = priceFilter === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setPriceFilter(p)}
                      className={`h-9 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#d2bbff] text-[#3f008e] shadow-sm font-bold'
                          : 'bg-[#363341] text-[#ccc3d8] hover:text-[#e6e0f2]'
                      }`}
                    >
                      {labels[p]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verified Organizers Switch */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#201e2b] border border-[#4a4455]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00dce6] text-[20px]">
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#e6e0f2] leading-tight">
                    Verified Organizers Only
                  </span>
                  <span className="text-[10px] text-[#ccc3d8]">Curated pulse authenticity</span>
                </div>
              </div>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                  verifiedOnly ? 'bg-[#00dce6] justify-end' : 'bg-[#4a4455] justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            {/* Drawer Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setPriceFilter('any');
                  setRadiusMiles(10);
                  setVerifiedOnly(false);
                  onShowToast('Filters reset', 'refresh');
                }}
                className="flex-1 h-11 rounded-full bg-[#363341] text-[#e6e0f2] text-xs font-bold active:scale-95 transition-transform"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  onShowToast('Filters applied', 'tune');
                }}
                className="flex-1 h-11 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#b0003e] text-white text-xs font-bold shadow-[0_4px_18px_rgba(255,75,114,0.35)] active:scale-95 transition-transform"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
