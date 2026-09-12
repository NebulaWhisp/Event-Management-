import React, { useState } from 'react';
import { EventItem, TicketPass } from '../types';

interface EventDetailScreenProps {
  event: EventItem;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onBookSuccess: (pass: TicketPass) => void;
  onShowToast: (message: string, icon?: string, isAccent?: boolean) => void;
  initialOpenBooking?: boolean;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  event,
  onBack,
  isSaved,
  onToggleSave,
  onBookSuccess,
  onShowToast,
  initialOpenBooking = false
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'artists' | 'venue'>('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(initialOpenBooking);

  // Booking Modal State
  const [selectedTier, setSelectedTier] = useState<'ga' | 'vip'>('ga');
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isReserving, setIsReserving] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdPass, setCreatedPass] = useState<TicketPass | null>(null);

  const gaPrice = event.price || 65;
  const vipPrice = Math.round(gaPrice * 2.15);
  const currentUnitPrice = selectedTier === 'ga' ? gaPrice : vipPrice;
  const platformFee = 4.5;
  const subtotal = currentUnitPrice * quantity;
  const discountAmount = subtotal * discountPercent;
  const totalPayable = subtotal - discountAmount + platformFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PULSE20') {
      setDiscountPercent(0.2);
      onShowToast("Code 'PULSE20' Applied (20% OFF)", 'check_circle');
    } else {
      onShowToast("Invalid promo code. Use 'PULSE20'", 'error', true);
    }
  };

  const handleConfirmReservation = () => {
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      const newPass: TicketPass = {
        id: `ticket-${Date.now().toString().slice(-6)}`,
        eventId: event.id,
        eventTitle: event.title,
        venue: event.venue,
        date: event.date,
        time: event.time,
        tierName: selectedTier === 'ga' ? 'General Admission' : 'VIP Backstage Pass',
        unitPrice: currentUnitPrice,
        quantity,
        totalPaid: totalPayable,
        qrCodeId: `#EP-${Math.floor(10000 + Math.random() * 90000)}`,
        passHolderName: 'Maya Lin',
        status: 'active',
        purchasedAt: new Date().toISOString().slice(0, 10),
        bannerImage: event.imageUrl
      };
      setCreatedPass(newPass);
      setBookingSuccess(true);
      onBookSuccess(newPass);
      onShowToast('Reservation confirmed! Pass encrypted.', 'verified');
    }, 1200);
  };

  const details = event.fullDetails || {
    attendingCount: 482,
    friendCount: 18,
    friendNames: 'Kaelen, Maya, David + 15 others',
    milestones: [
      { time: '07:00 PM', title: 'Doors & Spatial Audio Gallery', description: 'Ambient welcome sets', color: '#00dce6' },
      { time: '09:30 PM', title: 'Keynote & AI Synthesis Duet', description: 'Live human-machine algorithmic rhythm battle', color: '#d2bbff' },
      { time: '12:00 AM', title: 'Peak Live Set & Laser Dome', description: 'Immersive 360° laser projection dome showcase', color: '#ffb2ba' }
    ],
    schedule: [
      { time: '19:00 - 20:30', artist: 'Kaelen Voss', role: 'Live Modular', desc: 'Generative ambient textures and custom patch experiments', color: '#00dce6' },
      { time: '20:45 - 21:45', artist: 'Dr. Aris Thorne', role: 'Keynote', desc: 'Next-gen latent space audio models', color: '#d2bbff' },
      { time: '22:00 - 01:00', artist: 'CYBERECHO vs SORA', role: 'Live Set', desc: 'High-octane B2B neural synth bassline set', color: '#ffb2ba' }
    ],
    artists: [
      { name: 'Elena Cruz', role: 'Latent Audio Lead', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB79s6sNERxC4iGf2k4vDEX1mwV6BeCI3FP9k8xOiEUytrHqYHFngIteCQUBN9pxawLdg3xKQmFF_ELepX8H7xIvNFDI_c6O84t1-EFbe8qkMcOTliozi2EUyS8hsEdyj1c1muLexr1aJuD21aJC5uJcoTb8aYMh-L2yUHQRq8pUrXuneqZV7iHHFvnx9VYv0AgC67JXRrh5uEWQ8bI92LMz5N6C_jQ1K0M9szwJlVIT5ICCzmozesj' },
      { name: 'Marcus Vance', role: 'Spatial Visualist', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkEdM-kShiluMZUzR-Fs8R41s9RuizT7QtLCLrducrkCmTZM-lgeO-PwbJLZro7CZFpjWVw0apCcnKywTudJuO3RNuo6huoMMxXFom8B1Og5p42t_-eSCqzYN5nFsLurm3VzR8lbQU_frmTs1V1K_bQkPLyazC3Tj-Wl8OnoWh8pxgWUFCI9miAVmlJt65QxSnsW5kfaqc6llIXefdAUKhWb1V6iVexE-kb3Ev_iMMmIqucjTGjDYI' }
    ],
    faq: [
      { q: 'Is entry 21+ only?', a: 'Yes, valid government ID is strictly required at check-in.' },
      { q: 'Will tickets be sold at the door?', a: 'Due to fire capacity limitations, tickets are online reservation only.' }
    ]
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto relative pb-32">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7c3aed]/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-72 right-0 w-80 h-80 bg-[#b0003e]/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Hero Visual Frame */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#0f0d19]">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14121e] via-[#14121e]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14121e]/60 via-transparent to-[#14121e]/30" />

        {/* Floating Quick Action Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={() => onToggleSave(event.id)}
            aria-label="Favorite event"
            className={`w-10 h-10 rounded-full bg-[#363341]/85 backdrop-blur-md flex items-center justify-center active:scale-95 transition-all shadow-md ${
              isSaved ? 'text-[#ffb2ba]' : 'text-[#e6e0f2] hover:text-[#ffb2ba]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${isSaved ? 'fill' : ''}`}
              style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Live Attendance Counter Badge on Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 bg-[#2b2836]/90 backdrop-blur-xl px-3 py-1.5 rounded-full shadow-lg border border-[#4a4455]/40">
            <span className="w-2 h-2 rounded-full bg-[#ffb2ba] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#ffb2ba] -ml-4" />
            <span className="text-[11px] text-[#e6e0f2] tracking-wide uppercase font-bold">
              Live Pulse: {details.attendingCount} attending
            </span>
          </div>

          <div className="flex items-center -space-x-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHQeGhtv7znBc0JnZ27VXNFMwBcony2UQ1q7xdesEacZbpoLHG-dvfkyiABOU8cr1PdiBY22Vv71Ifhy45tF34b-AZ_v5G0c13BpRIaJQegXVXF0IdYJAZQ-OZ4Bc_JNoJw2sGD1AgDcxKmSZyepo8jeQzWhMqcFA0B-NEmVtUnAzKIHhQ4EJSU4qyVbeA1nGwkNZcwBAs_cyrkBFBkl7WiKWR41JDLjEzt4ICJ_9ewmTeu5I2bwOE"
              alt="Avatar 1"
              className="w-7 h-7 rounded-full object-cover shadow-sm ring-1 ring-[#201e2b]"
            />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Pu4zv5SM8rExvgEESUtTfcogIZEFIJ-28xbVcNZw4g9HLRU-0c1WysasT_pg_AF1Cv5Kz5lF8Fm9G72vKrnMIT1JZ5OH_HqEaBySKB0a6bjV19L_C_rPf7dkcAT1_XeT8Yux-Q8uXwF7NI-OoDq8RMH6asjRwscDYiij9l-F1krRw6s4avjHox8mZaA1W6yj55uVhmq13-tHEA6rUGGA-_maPXMPCgPyg37Rg9a02cLn6G7FUrY0"
              alt="Avatar 2"
              className="w-7 h-7 rounded-full object-cover shadow-sm ring-1 ring-[#201e2b]"
            />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC2PVL86x_LX79t7WL8ez36Gdb_fnMR3TDwsALCxYGx1-aZkNSIcxUZrsZEdZY20hH_dNIlwfiKZiia2MrqdM1MCa3CHxk5h11GyrEaYCDnc59g-EHFMnB0RVnVJkWp0HZ-GMe3zSdL7mZp2YCnTtGDKBld4aKyMg5itFjDTQyjccA-9Hyw0kNFwbkFfW6YJ5JrQVcprKMa_HZCEMexTwumqXSXESCVNt8Qmhw6t6rnnMEcglyMecj"
              alt="Avatar 3"
              className="w-7 h-7 rounded-full object-cover shadow-sm ring-1 ring-[#201e2b]"
            />
            <span className="w-7 h-7 rounded-full bg-[#d2bbff] text-[#3f008e] text-[10px] flex items-center justify-center font-bold ring-1 ring-[#201e2b]">
              +15
            </span>
          </div>
        </div>
      </div>

      {/* Main Info Section */}
      <div className="px-4 flex flex-col gap-4 pt-3">
        {/* Category & Verified Tag */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-[#7c3aed]/25 text-[#d2bbff] text-[11px] font-bold uppercase tracking-wider border border-[#7c3aed]/30">
            {event.categoryLabel}
          </span>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2b2836] text-[#ccc3d8] text-[11px] font-semibold">
            <span
              className="material-symbols-outlined text-[14px] text-[#00dce6]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span>{event.organizer.name}</span>
            <span className="text-[#00dce6] font-bold ml-0.5">★ 4.9</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-extrabold text-2xl text-[#e6e0f2] tracking-tight leading-snug">
          {event.title}
        </h1>

        {/* Meta Details Bento Grid */}
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1c1a27] border border-[#4a4455]/30 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/30 flex items-center justify-center text-[#d2bbff] shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#e6e0f2] truncate">{event.date}</span>
              <span className="text-xs text-[#ccc3d8] truncate">{event.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1c1a27] border border-[#4a4455]/30 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#b0003e]/30 flex items-center justify-center text-[#ffb2ba] shrink-0">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-[#e6e0f2] truncate">{event.venue}</span>
              <span className="text-xs text-[#ccc3d8] truncate">{event.location}</span>
            </div>
            <button
              onClick={() => setActiveTab('venue')}
              className="text-xs text-[#00dce6] font-bold px-2 py-1 rounded-lg hover:bg-[#201e2b] transition-colors"
            >
              Map
            </button>
          </div>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="flex gap-2 border-b border-[#4a4455]/30 pb-2 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'schedule', label: 'Schedule & Lineup' },
            { id: 'artists', label: 'Artists & Keynotes' },
            { id: 'venue', label: 'Venue & FAQ' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#d2bbff] text-[#3f008e] shadow-sm font-bold'
                    : 'bg-[#2b2836] text-[#ccc3d8] hover:text-[#e6e0f2]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* The Experience */}
            <div className="flex flex-col gap-1.5">
              <h2 className="font-bold text-base text-[#e6e0f2]">The Experience</h2>
              <p className="text-xs sm:text-sm text-[#ccc3d8] leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Friends Activity Ribbon */}
            <div className="p-3.5 rounded-xl bg-[#201e2b] border border-[#4a4455]/30 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#007278]/40 text-[#00dce6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#e6e0f2]">
                    {details.friendCount} Mutual Friends Going
                  </span>
                  <span className="text-[11px] text-[#ccc3d8]">{details.friendNames}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#ccc3d8] text-[18px]">
                chevron_right
              </span>
            </div>

            {/* Key Milestones Timeline */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-[#e6e0f2]">Key Milestones</h3>
                <span className="text-xs text-[#d2bbff] font-bold">3 Stages • 8 Hours</span>
              </div>
              <div className="flex flex-col gap-2">
                {details.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#1c1a27] border border-[#4a4455]/20 flex items-start gap-3"
                  >
                    <span
                      className="text-xs font-extrabold mt-0.5 min-w-[64px]"
                      style={{ color: m.color }}
                    >
                      {m.time}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#e6e0f2]">{m.title}</span>
                      <span className="text-[11px] text-[#ccc3d8] mt-0.5">{m.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer Profile Card */}
            <div className="p-4 rounded-xl bg-[#2b2836] border border-[#4a4455]/30 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <img
                  src={
                    event.organizer.avatar ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCZeW1c-dHNMu9taunPAyg9BABbPTqW5ayV1-Y0-VF2sDGq0SXp196obIlu5PuvWONSLmkHIVSlHH4uQEyfZq1tE9PoEbjBLVvO4lUG_ZPIjfg1TACL83zh15cCJ59H6yR31LkDRkcFnZMT-__dswm5EiNZt0Wkr_5siWtZTQYrgKnccPNybZC3XPwTHLS_aZgT5XYBQwbNvX68MQucLwg9J5GHzOkHkrGl-A3l5nnqEmC_XF6s__ij'
                  }
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#7c3aed]/30"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#e6e0f2]">
                      {event.organizer.name}
                    </span>
                    <span
                      className="material-symbols-outlined text-[15px] text-[#00dce6]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <span className="text-xs text-[#ccc3d8]">
                    {event.organizer.pastEvents || 42} Past Events •{' '}
                    {event.organizer.followers || '18.4k'} Followers
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  onShowToast(
                    isFollowing
                      ? `Unfollowed ${event.organizer.name}`
                      : `You are now following ${event.organizer.name}!`,
                    'verified'
                  );
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isFollowing
                    ? 'bg-[#00dce6] text-[#00373a]'
                    : 'bg-[#363341] text-[#e6e0f2] hover:bg-[#d2bbff] hover:text-[#3f008e]'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-[#e6e0f2]">Stage Timeline</h2>
              <span className="text-xs text-[#00dce6] font-bold bg-[#201e2b] px-2.5 py-1 rounded-full border border-[#4a4455]/30">
                Stage 1 • Main Dome
              </span>
            </div>
            <div className="flex flex-col gap-2.5 relative pl-4 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#4a4455]/40">
              {details.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col p-3 rounded-xl bg-[#1c1a27] border border-[#4a4455]/20 shadow-sm"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full absolute -left-[19px] top-4 shadow-[0_0_8px]"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-[#e6e0f2]">{item.artist}</span>
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: item.color }}
                    >
                      {item.time}
                    </span>
                  </div>
                  <span className="text-xs text-[#d2bbff] font-semibold mt-0.5">
                    {item.role}
                  </span>
                  <span className="text-[11px] text-[#ccc3d8] mt-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ARTISTS */}
        {activeTab === 'artists' && (
          <div className="flex flex-col gap-3 animate-fadeIn">
            <h2 className="font-bold text-base text-[#e6e0f2]">Featured Artists & Minds</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {details.artists.map((artist, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#201e2b] border border-[#4a4455]/30 flex flex-col items-center text-center gap-2"
                >
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-[#7c3aed]/20"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#e6e0f2]">{artist.name}</span>
                    <span className="text-[11px] text-[#00dce6] font-medium">{artist.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VENUE & FAQ */}
        {activeTab === 'venue' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-base text-[#e6e0f2]">Venue Location</h2>
              <div
                className="w-full h-44 bg-cover bg-center rounded-xl overflow-hidden shadow-md flex items-end p-3 relative border border-[#4a4455]/30"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2mMJIZaqhqH18QkwIewkkCMl4ar8-lbLA56XhA7MSjMnHje37my1jM5tQDRPKLsD_sNyGtqtiUc-88JpUYVXFhKgmno-Ik6-f5E38wIMjP4upO21e513V0kby0c792RzuGykh15slGEzn4-oIk8FoHsoQQUWrESOcPfLm_c-Rg6CL2Xj2xa9JML4lXXUsbALN4NxHov8-tgj9vqwqwwPyhm2Hy2z-ohB_gB3ln5RUkS4q-mtpSoxT')"
                }}
              >
                <div className="bg-[#14121e]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[#e6e0f2] text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                  <span className="material-symbols-outlined text-[16px] text-[#00dce6]">
                    near_me
                  </span>
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-sm text-[#e6e0f2]">Frequently Asked</h3>
              {details.faq.map((f, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#1c1a27] border border-[#4a4455]/30 flex flex-col gap-1"
                >
                  <span className="text-xs font-bold text-[#e6e0f2]">{f.q}</span>
                  <span className="text-[11px] text-[#ccc3d8]">{f.a}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0f0d19]/90 backdrop-blur-2xl border-t border-[#4a4455]/30 px-4 py-3 pb-safe shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#ccc3d8] uppercase tracking-wider font-semibold">
              Current Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#d2bbff]">
                {event.isFree ? 'Free' : `$${currentUnitPrice}`}
              </span>
              <span className="text-xs text-[#ccc3d8]">/ ticket</span>
            </div>
          </div>

          <button
            onClick={() => {
              setBookingSuccess(false);
              setIsBookingOpen(true);
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#b0003e] text-white text-sm font-bold shadow-[0_4px_24px_rgba(124,58,237,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>{event.isFree ? 'RSVP Spot' : 'Get Tickets'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* BOOKING MODAL SHEET (OVERLAY) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            onClick={() => setIsBookingOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />
          <div className="relative z-10 w-full max-w-md max-h-[85vh] overflow-y-auto bg-[#2b2836] rounded-t-3xl p-5 flex flex-col gap-4 shadow-2xl border-t border-[#4a4455]/40 pb-safe">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-1 border-b border-[#4a4455]/30">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#00dce6] font-bold uppercase tracking-wider">
                  Checkout
                </span>
                <h2 className="font-extrabold text-lg text-[#e6e0f2]">
                  {bookingSuccess ? 'Pass Issued' : 'Select Experience'}
                </h2>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="w-8 h-8 rounded-full bg-[#201e2b] text-[#ccc3d8] hover:text-[#e6e0f2] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {!bookingSuccess ? (
              /* STEP 1: TICKET SELECTION & CHECKOUT FORM */
              <div className="flex flex-col gap-4">
                {/* Tiers */}
                <div className="flex flex-col gap-2">
                  <label
                    onClick={() => setSelectedTier('ga')}
                    className={`flex items-center justify-between p-3.5 rounded-xl bg-[#201e2b] cursor-pointer transition-all border-2 ${
                      selectedTier === 'ga'
                        ? 'border-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.2)]'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tier"
                        checked={selectedTier === 'ga'}
                        onChange={() => setSelectedTier('ga')}
                        className="mt-1 accent-[#d2bbff]"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#e6e0f2]">
                            General Admission
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#7c3aed]/20 text-[#d2bbff] text-[10px] font-semibold">
                            Popular
                          </span>
                        </div>
                        <span className="text-xs text-[#ccc3d8]">
                          Full venue access, 3 stages & live jam sessions
                        </span>
                      </div>
                    </div>
                    <span className="text-base font-extrabold text-[#e6e0f2]">
                      {event.isFree ? 'Free' : `$${gaPrice}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setSelectedTier('vip')}
                    className={`flex items-center justify-between p-3.5 rounded-xl bg-[#201e2b] cursor-pointer transition-all border-2 ${
                      selectedTier === 'vip'
                        ? 'border-[#d2bbff] shadow-[0_0_12px_rgba(210,187,255,0.2)]'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tier"
                        checked={selectedTier === 'vip'}
                        onChange={() => setSelectedTier('vip')}
                        className="mt-1 accent-[#d2bbff]"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#e6e0f2]">
                            VIP Backstage Pass
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#b0003e]/20 text-[#ffb2ba] text-[10px] font-semibold">
                            Ultra VIP
                          </span>
                        </div>
                        <span className="text-xs text-[#ccc3d8]">
                          Express lane, artist lounge & open synthesis lab
                        </span>
                      </div>
                    </div>
                    <span className="text-base font-extrabold text-[#e6e0f2]">${vipPrice}</span>
                  </label>

                  {/* Sold Out Tier */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#201e2b]/40 opacity-50 cursor-not-allowed border-2 border-transparent">
                    <div className="flex items-start gap-3">
                      <input type="radio" disabled className="mt-1" />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-[#ccc3d8] line-through">
                            Early Bird Pass
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad6] text-[10px] font-semibold">
                            Sold Out
                          </span>
                        </div>
                        <span className="text-xs text-[#ccc3d8]">Tier ended on Oct 30</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#ccc3d8] line-through">$45</span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="p-3.5 rounded-xl bg-[#201e2b] flex items-center justify-between border border-[#4a4455]/30">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#e6e0f2]">Pass Quantity</span>
                    <span className="text-xs text-[#ccc3d8]">Max 4 passes per guest</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#363341] px-3 py-1.5 rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full bg-[#201e2b] flex items-center justify-center text-[#e6e0f2] hover:text-[#d2bbff] active:scale-90 transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="text-base font-extrabold text-[#e6e0f2] min-w-[18px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(4, quantity + 1))}
                      className="w-7 h-7 rounded-full bg-[#201e2b] flex items-center justify-center text-[#e6e0f2] hover:text-[#d2bbff] active:scale-90 transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#ccc3d8] uppercase font-bold tracking-wider">
                    Promo / Creator Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Try 'PULSE20'"
                      className="flex-1 bg-[#201e2b] px-3.5 py-2.5 rounded-xl text-[#e6e0f2] placeholder:text-[#958da1] text-xs uppercase tracking-wider border border-[#4a4455]/30 focus:outline-none focus:border-[#d2bbff]"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 rounded-xl bg-[#363341] text-[#e6e0f2] text-xs font-bold hover:bg-[#d2bbff] hover:text-[#3f008e] transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex items-center gap-1 text-[#00dce6] text-xs font-bold mt-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Code 'PULSE20' Applied (20% OFF)</span>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown Bento */}
                <div className="p-3.5 rounded-xl bg-[#1c1a27] border border-[#4a4455]/30 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between text-[#ccc3d8]">
                    <span>
                      Subtotal ({quantity}x {selectedTier === 'ga' ? 'GA' : 'VIP'})
                    </span>
                    <span className="text-[#e6e0f2] font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#00dce6] font-semibold">
                      <span>Discount (20%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#ccc3d8]">
                    <span>Platform & Processing Fee</span>
                    <span className="text-[#e6e0f2] font-semibold">${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-[#4a4455]/40 my-1" />
                  <div className="flex justify-between text-sm font-extrabold text-[#e6e0f2]">
                    <span>Total Payable</span>
                    <span className="text-[#d2bbff] text-base font-black">
                      ${totalPayable.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Confirm CTA */}
                <button
                  onClick={handleConfirmReservation}
                  disabled={isReserving}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#b0003e] text-white font-extrabold text-sm shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  {isReserving ? (
                    <>
                      <span>Encrypting Pass...</span>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <span>Confirm & Reserve</span>
                  )}
                </button>
              </div>
            ) : (
              /* STEP 2: CONFIRMATION / DIGITAL PASS */
              <div className="flex flex-col gap-4 items-center py-2 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-[#007278]/30 text-[#00dce6] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <div className="text-center">
                  <h3 className="font-extrabold text-xl text-[#e6e0f2]">You're In!</h3>
                  <p className="text-xs text-[#ccc3d8] mt-0.5">
                    Your pass has been generated and encrypted.
                  </p>
                </div>

                {/* Digital Ticket Card */}
                <div className="w-full p-4 rounded-2xl bg-[#201e2b] border border-[#4a4455]/40 flex flex-col gap-3 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#7c3aed]/20 text-[#d2bbff] text-[10px] font-bold uppercase">
                        {createdPass?.tierName || 'General Admission'}
                      </span>
                      <span className="text-[11px] text-[#ccc3d8]">
                        ID: {createdPass?.qrCodeId || '#NH-89240'}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#00dce6] text-[20px]">nfc</span>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="font-bold text-sm text-[#e6e0f2]">{event.title}</h4>
                    <span className="text-xs text-[#ccc3d8]">
                      {event.venue} • {event.date}
                    </span>
                  </div>

                  {/* Stylized QR Code */}
                  <div className="flex items-center justify-center p-4 bg-[#363341] rounded-xl">
                    <div className="p-3 bg-white rounded-xl shadow-inner flex flex-col items-center">
                      <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
                        <rect x="5" y="5" width="28" height="28" rx="4" fill="#0A0814" />
                        <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
                        <rect x="13" y="13" width="12" height="12" rx="1" fill="#0A0814" />
                        <rect x="67" y="5" width="28" height="28" rx="4" fill="#0A0814" />
                        <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
                        <rect x="75" y="13" width="12" height="12" rx="1" fill="#0A0814" />
                        <rect x="5" y="67" width="28" height="28" rx="4" fill="#0A0814" />
                        <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFFFF" />
                        <rect x="13" y="75" width="12" height="12" rx="1" fill="#0A0814" />
                        {/* QR Pixels */}
                        <rect x="38" y="10" width="8" height="8" fill="#7C3AED" />
                        <rect x="50" y="10" width="8" height="8" fill="#0A0814" />
                        <rect x="38" y="24" width="6" height="6" fill="#0A0814" />
                        <rect x="50" y="24" width="8" height="8" fill="#00DCE6" />
                        <rect x="10" y="38" width="8" height="8" fill="#0A0814" />
                        <rect x="24" y="38" width="8" height="8" fill="#0A0814" />
                        <rect x="38" y="38" width="12" height="12" fill="#7C3AED" />
                        <rect x="56" y="38" width="8" height="8" fill="#0A0814" />
                        <rect x="70" y="38" width="8" height="8" fill="#0A0814" />
                        <rect x="84" y="38" width="8" height="8" fill="#FF4B72" />
                        <rect x="38" y="54" width="8" height="8" fill="#0A0814" />
                        <rect x="50" y="54" width="12" height="12" fill="#0A0814" />
                        <rect x="70" y="54" width="8" height="8" fill="#0A0814" />
                        <rect x="38" y="72" width="12" height="12" fill="#00DCE6" />
                        <rect x="56" y="72" width="8" height="8" fill="#0A0814" />
                        <rect x="72" y="72" width="18" height="18" fill="#7C3AED" />
                      </svg>
                      <span className="text-[9px] text-[#14121e] tracking-widest font-black mt-1">
                        SCAN AT GATE 2
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#ccc3d8]">
                    <span>Pass Holder: Maya Lin</span>
                    <span>{quantity}x Standard Entry</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full flex gap-2">
                  <button
                    onClick={() => onShowToast('Pass saved to Apple/Google Wallet! 📲', 'wallet')}
                    className="flex-1 py-3 rounded-full bg-[#363341] text-[#e6e0f2] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#4a4455] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">wallet</span>
                    <span>Add to Wallet</span>
                  </button>
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="flex-1 py-3 rounded-full bg-[#d2bbff] text-[#3f008e] text-xs font-bold hover:opacity-90 transition-colors"
                  >
                    View in Tickets
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
