import React, { useState } from 'react';
import { TicketPass, EventItem } from '../types';

interface TicketsScreenProps {
  tickets: TicketPass[];
  onSelectEventById: (eventId: string) => void;
  onShowToast: (message: string, icon?: string, isAccent?: boolean) => void;
}

export const TicketsScreen: React.FC<TicketsScreenProps> = ({
  tickets,
  onSelectEventById,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [transferTicket, setTransferTicket] = useState<TicketPass | null>(null);
  const [transferRecipient, setTransferRecipient] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Past mock passes
  const pastPasses = [
    {
      id: 'past-1',
      title: 'Neon Odyssey Summer Edition',
      date: 'Aug 14, 2025',
      venue: 'Public Works SF',
      tier: 'General Admission',
      rated: 5
    },
    {
      id: 'past-2',
      title: 'Solstice Sunset Rooftop',
      date: 'Jul 21, 2025',
      venue: 'The Midway Patio',
      tier: 'VIP Lounge',
      rated: 5
    },
    {
      id: 'past-3',
      title: 'Modular Synthesis Showcase',
      date: 'Jun 05, 2025',
      venue: 'Gray Area Grand Theater',
      tier: 'Early Bird',
      rated: 4
    }
  ];

  const handleTransfer = () => {
    if (!transferRecipient.trim()) {
      onShowToast('Please enter recipient email or phone', 'error', true);
      return;
    }
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      onShowToast(`Pass transferred to ${transferRecipient}!`, 'send');
      setTransferTicket(null);
      setTransferRecipient('');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 gap-5 pt-2 pb-28 relative">
      {/* Header */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00dce6] shadow-[0_0_8px_rgba(0,220,230,0.8)]" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#00dce6]">
              Access & Passes
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#2b2836] text-[#d2bbff] text-xs font-bold border border-[#4a4455]/30">
            {tickets.length} Active
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="font-extrabold text-2xl text-[#e6e0f2] tracking-tight">My Tickets</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Passes synchronized with NFC blockchain', 'sync')}
              className="w-9 h-9 rounded-full bg-[#201e2b] text-[#ccc3d8] hover:text-[#e6e0f2] flex items-center justify-center active:scale-95 transition-all border border-[#4a4455]/30"
              aria-label="Sync passes"
            >
              <span className="material-symbols-outlined text-[19px]">sync</span>
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'upcoming' ? 'past' : 'upcoming')}
              className="w-9 h-9 rounded-full bg-[#201e2b] text-[#ccc3d8] hover:text-[#e6e0f2] flex items-center justify-center active:scale-95 transition-all border border-[#4a4455]/30"
              aria-label="History"
            >
              <span className="material-symbols-outlined text-[19px]">history</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 p-1 bg-[#201e2b] rounded-full border border-[#4a4455]/30 mt-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-[#d2bbff] text-[#3f008e] shadow-md'
                : 'text-[#ccc3d8] hover:text-[#e6e0f2]'
            }`}
          >
            Upcoming ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'past'
                ? 'bg-[#d2bbff] text-[#3f008e] shadow-md'
                : 'text-[#ccc3d8] hover:text-[#e6e0f2]'
            }`}
          >
            Past ({pastPasses.length})
          </button>
        </div>
      </section>

      {/* UPCOMING TAB */}
      {activeTab === 'upcoming' && (
        <section className="flex flex-col gap-5 animate-fadeIn">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="relative flex flex-col rounded-3xl bg-[#201e2b] border border-[#4a4455]/40 shadow-2xl overflow-hidden group"
            >
              {/* Top Banner Artwork */}
              {ticket.bannerImage && (
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={ticket.bannerImage}
                    alt={ticket.eventTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201e2b] via-[#201e2b]/50 to-transparent" />
                </div>
              )}

              <div className="p-5 flex flex-col gap-3">
                {/* Pass Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                        ticket.tierName.includes('VIP')
                          ? 'bg-[#b0003e]/30 text-[#ffb2ba] border border-[#ffb2ba]/30'
                          : 'bg-[#7c3aed]/30 text-[#d2bbff] border border-[#d2bbff]/30'
                      }`}
                    >
                      {ticket.tierName}
                    </span>
                    <span className="text-xs text-[#ccc3d8] font-mono">{ticket.qrCodeId}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#00dce6]">
                    <span className="material-symbols-outlined text-[18px]">nfc</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Tap Gate</span>
                  </div>
                </div>

                {/* Event Name */}
                <div className="flex flex-col">
                  <h2 className="font-extrabold text-lg text-[#e6e0f2] leading-tight group-hover:text-[#d2bbff] transition-colors">
                    {ticket.eventTitle}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#ccc3d8] mt-1">
                    <span className="text-[#ffb2ba] font-bold">{ticket.date}</span>
                    <span>•</span>
                    <span className="truncate">{ticket.venue}</span>
                  </div>
                </div>

                {/* Holographic Perforation Divider */}
                <div className="relative flex items-center justify-center my-1 -mx-5">
                  <div className="w-5 h-5 rounded-full bg-[#14121e] -ml-2.5 shrink-0" />
                  <div className="flex-1 border-b-2 border-dashed border-[#4a4455]/40" />
                  <div className="w-5 h-5 rounded-full bg-[#14121e] -mr-2.5 shrink-0" />
                </div>

                {/* Pass Holder & Barcode Block */}
                <div className="flex flex-col items-center gap-3 py-1">
                  <div className="flex justify-between w-full text-xs text-[#ccc3d8] font-medium">
                    <div>
                      <span className="text-[10px] text-[#958da1] uppercase block">Guest</span>
                      <span className="font-bold text-[#e6e0f2]">{ticket.passHolderName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#958da1] uppercase block">Quantity</span>
                      <span className="font-bold text-[#e6e0f2]">{ticket.quantity}x Access</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#958da1] uppercase block">Gate Entry</span>
                      <span className="font-bold text-[#00dce6]">Gate 2 / West</span>
                    </div>
                  </div>

                  {/* High-Tech Barcode SVG */}
                  <div className="w-full bg-[#363341] p-3 rounded-xl flex flex-col items-center gap-1.5 shadow-inner border border-[#4a4455]/30">
                    <svg className="w-full h-14" viewBox="0 0 280 50">
                      {Array.from({ length: 58 }).map((_, i) => {
                        const widths = [2, 3, 4, 1.5, 5, 2.5, 6, 2];
                        const w = widths[i % widths.length];
                        const x = i * 4.8;
                        const isColored = i % 11 === 0 || i % 17 === 0;
                        return (
                          <rect
                            key={i}
                            x={x}
                            y="2"
                            width={w}
                            height="46"
                            fill={isColored ? '#00dce6' : '#e6e0f2'}
                            rx="1"
                          />
                        );
                      })}
                    </svg>
                    <span className="font-mono text-[10px] text-[#ccc3d8] tracking-[0.3em] font-bold">
                      {ticket.qrCodeId} - {ticket.eventId.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#958da1] text-center">
                    Hold near reader or present at door checkpoint
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#4a4455]/30">
                  <button
                    onClick={() =>
                      onShowToast('Added to Apple / Google Wallet! 📲', 'account_balance_wallet')
                    }
                    className="flex-1 py-2.5 rounded-full bg-[#2b2836] hover:bg-[#363341] text-[#e6e0f2] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#4a4455]/30"
                  >
                    <span className="material-symbols-outlined text-[16px]">wallet</span>
                    <span>Save to Wallet</span>
                  </button>
                  <button
                    onClick={() => setTransferTicket(ticket)}
                    className="px-3.5 py-2.5 rounded-full bg-[#2b2836] hover:bg-[#363341] text-[#ccc3d8] hover:text-[#e6e0f2] text-xs font-bold flex items-center gap-1 transition-colors border border-[#4a4455]/30"
                  >
                    <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                    <span>Transfer</span>
                  </button>
                  <button
                    onClick={() => onSelectEventById(ticket.eventId)}
                    className="px-3.5 py-2.5 rounded-full bg-[#d2bbff] text-[#3f008e] text-xs font-bold hover:opacity-90 active:scale-95 transition-all"
                  >
                    Event Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {tickets.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#201e2b] border border-[#4a4455]/30 text-center gap-2">
              <div className="w-14 h-14 rounded-full bg-[#2b2836] flex items-center justify-center text-[#d2bbff]">
                <span className="material-symbols-outlined text-[32px]">confirmation_number</span>
              </div>
              <h3 className="font-bold text-base text-[#e6e0f2]">No Active Passes</h3>
              <p className="text-xs text-[#ccc3d8]">
                Explore upcoming pulses to reserve your spot.
              </p>
            </div>
          )}
        </section>
      )}

      {/* PAST TAB */}
      {activeTab === 'past' && (
        <section className="flex flex-col gap-3 animate-fadeIn">
          {pastPasses.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-[#1c1a27] border border-[#4a4455]/30 flex items-center justify-between"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#958da1] uppercase font-bold tracking-wider">
                  Attended • {p.date}
                </span>
                <h3 className="font-bold text-sm text-[#e6e0f2] truncate">{p.title}</h3>
                <span className="text-xs text-[#ccc3d8]">{p.venue}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="px-2 py-0.5 rounded-full bg-[#201e2b] text-[#00dce6] text-[10px] font-bold">
                  {p.tier}
                </span>
                <button
                  onClick={() => onShowToast('Thanks for submitting your vibe rating! ⭐', 'star')}
                  className="text-xs text-[#ffb2ba] font-bold hover:underline"
                >
                  Rate Vibe ★★★★★
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Transfer Modal */}
      {transferTicket && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#2b2836] w-full max-w-md rounded-t-3xl p-5 flex flex-col gap-4 shadow-2xl border-t border-[#4a4455]/40 pb-safe">
            <div className="flex items-center justify-between pb-1 border-b border-[#4a4455]/30">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#00dce6] uppercase font-bold tracking-wider">
                  Secure Peer Transfer
                </span>
                <h4 className="text-base font-bold text-[#e6e0f2]">
                  Transfer {transferTicket.eventTitle}
                </h4>
              </div>
              <button
                onClick={() => setTransferTicket(null)}
                className="w-8 h-8 rounded-full bg-[#201e2b] text-[#ccc3d8] flex items-center justify-center hover:text-[#e6e0f2]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs text-[#ccc3d8]">
                Pass transfer generates a one-time cryptographic NFC signature. Once claimed, your
                original QR barcode will be permanently voided.
              </p>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ccc3d8]">
                  Recipient Email or Phone
                </label>
                <input
                  type="text"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  placeholder="e.g. friend@gmail.com or +1 415 555 0192"
                  className="w-full bg-[#201e2b] rounded-xl px-3.5 py-2.5 text-xs text-[#e6e0f2] placeholder:text-[#958da1] border border-[#4a4455]/30 focus:outline-none focus:border-[#d2bbff]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#201e2b] flex items-center justify-between text-xs text-[#ccc3d8]">
                <span>Transfer Quantity</span>
                <span className="font-bold text-[#e6e0f2]">1 Ticket Pass</span>
              </div>

              <button
                onClick={handleTransfer}
                disabled={isTransferring}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#b0003e] text-white font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isTransferring ? (
                  <span>Generating Transfer Link...</span>
                ) : (
                  <span>Send Pass via Secure Pulse Link</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
