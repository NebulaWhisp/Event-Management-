import React, { useState, useRef, useEffect } from 'react';
import { ActiveHostedEvent } from '../types';

interface CreatorStudioScreenProps {
  hostedEvents: ActiveHostedEvent[];
  onAddHostedEvent: (event: ActiveHostedEvent) => void;
  onUpdateHostedEvent: (event: ActiveHostedEvent) => void;
  onDeleteHostedEvent: (id: string) => void;
  onShowToast: (message: string, icon?: string, isAccent?: boolean) => void;
}

export const CreatorStudioScreen: React.FC<CreatorStudioScreenProps> = ({
  hostedEvents,
  onAddHostedEvent,
  onUpdateHostedEvent,
  onDeleteHostedEvent,
  onShowToast
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form states
  const [title, setTitle] = useState('Neon Horizon Midnight Rave');
  const [category, setCategory] = useState('Nightlife');
  const [tags, setTags] = useState('Cyberpunk, Synth, Underground');
  const [description, setDescription] = useState(
    'Immerse yourself in neon visualizers, modular synth frequencies, and multi-sensory laser art under the night skyline.'
  );
  const [experienceType, setExperienceType] = useState<'inperson' | 'virtual'>('inperson');
  const [eventDate, setEventDate] = useState('Sat, Nov 18');
  const [eventTime, setEventTime] = useState('10:00 PM');
  const [venueLocation, setVenueLocation] = useState('The Substation, 450 Mission St, San Francisco');
  const [ticketModel, setTicketModel] = useState<'paid' | 'free'>('paid');
  const [tier1Price, setTier1Price] = useState(35);
  const [tier1Capacity, setTier1Capacity] = useState(150);
  const [tier2Price, setTier2Price] = useState(95);
  const [tier2Capacity, setTier2Capacity] = useState(50);
  const [customTiers, setCustomTiers] = useState<{ id: string; name: string; price: number; capacity: number }[]>([]);

  // Selected attendee modal
  const [attendeeModalEvent, setAttendeeModalEvent] = useState<ActiveHostedEvent | null>(null);

  // Confetti Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const runConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#d2bbff', '#00dce6', '#ffb2ba', '#7c3aed', '#ffffff'];
    const particles = Array.from({ length: 65 }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 18,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10,
      alpha: 1
    }));

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.rotation += p.rSpeed;
        p.alpha -= 0.015;

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      frame++;
      if (active && frame < 120) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    render();
  };

  const handlePublish = () => {
    runConfetti();
    const newHostedEvent: ActiveHostedEvent = {
      id: `hosted-${Date.now()}`,
      title: title.trim() || 'Untitled Phenomenon',
      venue: venueLocation.trim() || 'San Francisco, CA',
      date: `${eventDate} • ${eventTime}`,
      time: eventTime,
      rsvps: 0,
      capacity: tier1Capacity + tier2Capacity,
      isLive: true,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA-hWEoEi9TTwFW7eLMQNI6om_9MLwgkpPOSfFjgtmwPGAq9d1gmDMYPf_p1O3qlWhPyEpkJlGvoBpjpvr2M5KmNFdH4RACCVfV2GizZ9CmrlzojUskSj2jAXGOCFCDXhgkLtg2Nz6V_1uAZN80WHBxan9keMiYUlKeZlODgMRm-e9oaKi95jrdQ1dWm9MVVMy9pbpOX-o7FR069AQIbQm7V4IelPpssp5k7899fOXNAjrY2jVviA02',
      attendeesList: []
    };

    onAddHostedEvent(newHostedEvent);
    onShowToast(`"${newHostedEvent.title}" published live to Discover feed!`, 'rocket_launch');
    setCurrentStep(1);
  };

  const handleEdit = (evt: ActiveHostedEvent) => {
    setTitle(evt.title);
    setVenueLocation(evt.venue);
    setCurrentStep(1);
    onShowToast(`Editing "${evt.title}" in wizard`, 'edit');
  };

  const categories = ['Nightlife', 'Tech Summit', 'Music Concert', 'Exhibition'];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 gap-6 pt-2 pb-28 relative">
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Atmospheric glow */}
      <div className="absolute -top-12 -left-20 w-72 h-72 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 -right-24 w-80 h-80 rounded-full bg-[#ffb2ba]/10 blur-3xl pointer-events-none -z-10" />

      {/* Studio Header & Stats Bento */}
      <section className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#00dce6] shadow-[0_0_8px_rgba(0,220,230,0.8)]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#00dce6]">
                Live Operations
              </span>
            </div>
            <h2 className="font-extrabold text-xl text-[#e6e0f2] tracking-tight">
              Creator Studio
            </h2>
          </div>

          <button
            onClick={() => onShowToast('Creator Insights is synchronizing live analytics', 'tune')}
            className="px-3 py-1.5 rounded-full bg-[#2b2836] text-[#ccc3d8] hover:text-[#e6e0f2] flex items-center gap-1 transition-all border border-[#4a4455]/30 text-xs font-semibold shadow-sm"
          >
            <span className="material-symbols-outlined text-[17px]">tune</span>
            <span>Insights</span>
          </button>
        </div>

        {/* Stats Matrix Bento Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Total Revenue */}
          <div className="bg-[#1c1a27] border border-[#4a4455]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between text-[#ccc3d8]">
              <span className="text-xs font-medium">Total Revenue</span>
              <span className="material-symbols-outlined text-[#d2bbff] text-[20px]">
                payments
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-bold text-[#e6e0f2]">$14,850</span>
              <span className="text-[11px] text-[#00dce6] flex items-center font-bold">
                <span className="material-symbols-outlined text-[13px]">arrow_upward</span>18%
              </span>
            </div>
          </div>

          {/* Tickets Sold */}
          <div className="bg-[#1c1a27] border border-[#4a4455]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between text-[#ccc3d8]">
              <span className="text-xs font-medium">Tickets Sold</span>
              <span className="material-symbols-outlined text-[#ffb2ba] text-[20px]">
                confirmation_number
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-xl font-bold text-[#e6e0f2]">
                248<span className="text-xs text-[#ccc3d8]">/300</span>
              </span>
              <span className="text-xs text-[#d2bbff] font-bold ml-1">82%</span>
            </div>
          </div>

          {/* Views */}
          <div className="bg-[#1c1a27] border border-[#4a4455]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-[#ccc3d8]">
              <span className="text-xs font-medium">Page Views</span>
              <span className="material-symbols-outlined text-[#00dce6] text-[20px]">
                visibility
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-bold text-[#e6e0f2]">1.8k</span>
              <span className="text-xs text-[#00dce6] font-bold">+240</span>
            </div>
          </div>

          {/* Active Events */}
          <div className="bg-[#1c1a27] border border-[#4a4455]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-[#ccc3d8]">
              <span className="text-xs font-medium">Live Hosted</span>
              <span className="material-symbols-outlined text-[#d2bbff] text-[20px]">hub</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-bold text-[#e6e0f2]">
                {hostedEvents.length + 1}
              </span>
              <span className="text-xs text-[#ccc3d8]">Published</span>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Wizard Container */}
      <section className="bg-[#1c1a27] border border-[#4a4455]/30 rounded-2xl p-4 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-white font-bold">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </div>
            <h3 className="text-sm font-bold text-[#e6e0f2]">Create Event</h3>
          </div>
          <span className="text-xs text-[#d2bbff] font-semibold">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* Stepper Tracker */}
        <div className="flex items-center justify-between gap-1.5 w-full">
          {[
            { step: 1, label: 'Basics' },
            { step: 2, label: 'Logistics' },
            { step: 3, label: 'Tickets' },
            { step: 4, label: 'Preview' }
          ].map((item) => (
            <div
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
            >
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                  currentStep >= item.step ? 'bg-[#d2bbff]' : 'bg-[#363341]'
                }`}
              />
              <span
                className={`text-[10px] font-semibold ${
                  currentStep >= item.step ? 'text-[#e6e0f2]' : 'text-[#958da1]'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Forms */}
        <div className="w-full pt-1">
          {/* STEP 1: Basics */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ccc3d8]">Event Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Electric Mirage Night"
                  className="w-full bg-[#201e2b] rounded-xl px-3 py-2.5 text-[#e6e0f2] placeholder:text-[#958da1] text-xs border border-[#4a4455]/30 focus:outline-none focus:border-[#d2bbff]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ccc3d8]">Primary Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        category === c
                          ? 'bg-[#d2bbff] text-[#3f008e] shadow-sm font-bold'
                          : 'bg-[#2b2836] text-[#ccc3d8] hover:text-[#e6e0f2] border border-[#4a4455]/30'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ccc3d8]">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. Cyberpunk, Synth, Underground"
                  className="w-full bg-[#201e2b] rounded-xl px-3 py-2.5 text-[#e6e0f2] placeholder:text-[#958da1] text-xs border border-[#4a4455]/30 focus:outline-none focus:border-[#d2bbff]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ccc3d8]">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell attendees what makes your experience unmissable..."
                  className="w-full bg-[#201e2b] rounded-xl p-3 text-[#e6e0f2] placeholder:text-[#958da1] text-xs border border-[#4a4455]/30 focus:outline-none focus:border-[#d2bbff] resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Logistics */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between p-2 bg-[#201e2b] rounded-xl border border-[#4a4455]/30">
                <span className="text-xs font-semibold text-[#e6e0f2] pl-1">
                  Experience Type
                </span>
                <div className="flex gap-1 p-0.5 bg-[#363341] rounded-full">
                  <button
                    type="button"
                    onClick={() => setExperienceType('inperson')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      experienceType === 'inperson'
                        ? 'bg-[#d2bbff] text-[#3f008e] shadow-sm'
                        : 'text-[#ccc3d8]'
                    }`}
                  >
                    In-Person
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperienceType('virtual')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      experienceType === 'virtual'
                        ? 'bg-[#d2bbff] text-[#3f008e] shadow-sm'
                        : 'text-[#ccc3d8]'
                    }`}
                  >
                    Virtual
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#ccc3d8]">Date</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#201e2b] rounded-xl px-3 py-2 text-[#e6e0f2] text-xs border border-[#4a4455]/30 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#ccc3d8]">Start Time</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-[#201e2b] rounded-xl px-3 py-2 text-[#e6e0f2] text-xs border border-[#4a4455]/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ccc3d8]">Venue Location</label>
                <div className="relative">
                  <input
                    type="text"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    className="w-full bg-[#201e2b] rounded-xl pl-9 pr-3 py-2.5 text-[#e6e0f2] text-xs border border-[#4a4455]/30 focus:outline-none"
                  />
                  <span className="material-symbols-outlined text-[#00dce6] absolute left-2.5 top-2.5 text-[18px]">
                    location_on
                  </span>
                </div>
              </div>

              {/* Venue Map Snippet */}
              <div
                className="w-full h-24 bg-cover bg-center rounded-xl relative overflow-hidden shadow-inner flex items-end p-2 border border-[#4a4455]/30"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2mMJIZaqhqH18QkwIewkkCMl4ar8-lbLA56XhA7MSjMnHje37my1jM5tQDRPKLsD_sNyGtqtiUc-88JpUYVXFhKgmno-Ik6-f5E38wIMjP4upO21e513V0kby0c792RzuGykh15slGEzn4-oIk8FoHsoQQUWrESOcPfLm_c-Rg6CL2Xj2xa9JML4lXXUsbALN4NxHov8-tgj9vqwqwwPyhm2Hy2z-ohB_gB3ln5RUkS4q-mtpSoxT')"
                }}
              >
                <div className="bg-[#14121e]/85 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1 border border-white/10">
                  <span className="material-symbols-outlined text-[#00dce6] text-[14px]">
                    my_location
                  </span>
                  <span className="text-[11px] text-[#e6e0f2] font-semibold truncate">
                    {venueLocation.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Tickets */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between p-2 bg-[#201e2b] rounded-xl border border-[#4a4455]/30">
                <span className="text-xs font-semibold text-[#e6e0f2] pl-1">
                  Ticketing Model
                </span>
                <div className="flex gap-1 p-0.5 bg-[#363341] rounded-full">
                  <button
                    type="button"
                    onClick={() => setTicketModel('paid')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      ticketModel === 'paid'
                        ? 'bg-[#d2bbff] text-[#3f008e] shadow-sm'
                        : 'text-[#ccc3d8]'
                    }`}
                  >
                    Paid Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => setTicketModel('free')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      ticketModel === 'free'
                        ? 'bg-[#d2bbff] text-[#3f008e] shadow-sm'
                        : 'text-[#ccc3d8]'
                    }`}
                  >
                    Free RSVP
                  </button>
                </div>
              </div>

              {/* Tiers List */}
              <div className="flex flex-col gap-2">
                <div className="p-3 bg-[#201e2b] rounded-xl flex flex-col gap-2 border border-[#4a4455]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#d2bbff]">
                      Tier 1: Early Bird
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#363341] text-[#00dce6] text-[10px] font-bold">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#ccc3d8]">Price ($)</label>
                      <input
                        type="number"
                        value={ticketModel === 'free' ? 0 : tier1Price}
                        disabled={ticketModel === 'free'}
                        onChange={(e) => setTier1Price(Number(e.target.value))}
                        className="w-full bg-[#2b2836] rounded px-2 py-1 text-xs text-[#e6e0f2] border border-[#4a4455]/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#ccc3d8]">Capacity</label>
                      <input
                        type="number"
                        value={tier1Capacity}
                        onChange={(e) => setTier1Capacity(Number(e.target.value))}
                        className="w-full bg-[#2b2836] rounded px-2 py-1 text-xs text-[#e6e0f2] border border-[#4a4455]/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#201e2b] rounded-xl flex flex-col gap-2 border border-[#4a4455]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ffb2ba]">
                      Tier 2: VIP Stage Lounge
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#363341] text-[#ffb2ba] text-[10px] font-bold">
                      Exclusive
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#ccc3d8]">Price ($)</label>
                      <input
                        type="number"
                        value={ticketModel === 'free' ? 0 : tier2Price}
                        disabled={ticketModel === 'free'}
                        onChange={(e) => setTier2Price(Number(e.target.value))}
                        className="w-full bg-[#2b2836] rounded px-2 py-1 text-xs text-[#e6e0f2] border border-[#4a4455]/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#ccc3d8]">Capacity</label>
                      <input
                        type="number"
                        value={tier2Capacity}
                        onChange={(e) => setTier2Capacity(Number(e.target.value))}
                        className="w-full bg-[#2b2836] rounded px-2 py-1 text-xs text-[#e6e0f2] border border-[#4a4455]/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {customTiers.map((ct) => (
                  <div
                    key={ct.id}
                    className="p-3 bg-[#201e2b] rounded-xl flex flex-col gap-2 border border-[#4a4455]/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00dce6]">{ct.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCustomTiers(customTiers.filter((item) => item.id !== ct.id))
                        }
                        className="text-[#ffb4ab] text-xs font-bold"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-[#ccc3d8]">Price ($)</label>
                        <input
                          type="number"
                          value={ct.price}
                          readOnly
                          className="w-full bg-[#2b2836] rounded px-2 py-1 text-xs text-[#e6e0f2]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#ccc3d8]">Capacity</label>
                        <input
                          type="number"
                          value={ct.capacity}
                          readOnly
                          className="w-full bg-[#2b2836] rounded px-2 py-1 text-xs text-[#e6e0f2]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  const newTier = {
                    id: `tier-${Date.now()}`,
                    name: 'Backstage Passes',
                    price: 150,
                    capacity: 25
                  };
                  setCustomTiers([...customTiers, newTier]);
                  onShowToast('Custom Tier Pass added', 'add');
                }}
                className="w-full py-2 rounded-xl bg-[#201e2b] hover:bg-[#2b2836] text-[#ccc3d8] hover:text-[#e6e0f2] flex items-center justify-center gap-1 text-xs font-semibold transition-colors border border-[#4a4455]/30"
              >
                <span className="material-symbols-outlined text-[17px]">add</span>
                <span>Add Tier Pass</span>
              </button>
            </div>
          )}

          {/* STEP 4: Media & Preview */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ccc3d8]">
                  Event Visual Artwork
                </label>
                <div className="h-28 w-full rounded-xl bg-[#201e2b] relative overflow-hidden flex flex-col items-center justify-center p-3 text-center border border-[#4a4455]/30 group">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_yv6MhqELLd37EJZzsB5224bQQtccpvlDuotZlVM_ZowW7QsyaXtdbDI8qDutM0oxEsROabMNHHs76pdg_HMEARUgya8oRdt0TB4y1-0UrgCGgQArU50DjqidmJ7WR2K1Rsj6ve3ZbmutKrzQz0_TaruXihFc9EzTRJlgvl116FPSPkQCvuSOofJRTC3l2oGmx48K6pWwp8KQppoisRoSLiui6gbtsvaszkpxarLQg9SwUX3oofdC"
                    alt="Event Artwork"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#14121e]/90 text-[#d2bbff] text-xs font-semibold flex items-center gap-1 shadow-md border border-white/10">
                      <span className="material-symbols-outlined text-[15px]">image</span>
                      <span>Artwork Ready</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Card Preview */}
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#ccc3d8] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#00dce6] text-[16px]">
                      preview
                    </span>
                    <span>Attendee Feed Live Card</span>
                  </span>
                  <span className="text-[11px] text-[#00dce6] font-bold">Real-time sync</span>
                </div>

                <div className="bg-[#201e2b] rounded-xl overflow-hidden shadow-2xl relative border border-[#4a4455]/40">
                  <div className="relative w-full h-36">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-hWEoEi9TTwFW7eLMQNI6om_9MLwgkpPOSfFjgtmwPGAq9d1gmDMYPf_p1O3qlWhPyEpkJlGvoBpjpvr2M5KmNFdH4RACCVfV2GizZ9CmrlzojUskSj2jAXGOCFCDXhgkLtg2Nz6V_1uAZN80WHBxan9keMiYUlKeZlODgMRm-e9oaKi95jrdQ1dWm9MVVMy9pbpOX-o7FR069AQIbQm7V4IelPpssp5k7899fOXNAjrY2jVviA02"
                      alt="Live Card"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#7c3aed]/85 backdrop-blur-md text-white text-[10px] font-bold">
                        {category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#b0003e]/90 text-white text-[10px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2ba] animate-pulse" />
                        Selling Fast
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-[#14121e]/85 backdrop-blur-md text-[#e6e0f2] px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-white/10">
                      <span className="material-symbols-outlined text-[#d2bbff] text-[13px]">
                        bookmark
                      </span>
                      <span>84</span>
                    </div>
                  </div>

                  <div className="p-3 flex flex-col gap-1 bg-[#201e2b]">
                    <h4 className="font-bold text-sm text-[#e6e0f2] truncate">
                      {title || 'Untitled Phenomenon'}
                    </h4>
                    <p className="text-xs text-[#ccc3d8] line-clamp-2">{description}</p>
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#4a4455]/30">
                      <div className="flex items-center gap-1 text-[#ccc3d8]">
                        <span className="material-symbols-outlined text-[15px] text-[#00dce6]">
                          calendar_today
                        </span>
                        <span className="text-[11px]">{eventDate}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] text-[#ccc3d8]">From</span>
                        <span className="text-sm font-extrabold text-[#d2bbff]">
                          {ticketModel === 'free' ? 'Free' : `$${tier1Price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Action Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#4a4455]/30">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className={`px-4 py-1.5 rounded-full bg-[#201e2b] text-xs font-semibold transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-[#958da1]'
                : 'text-[#e6e0f2] hover:bg-[#2b2836]'
            }`}
          >
            Back
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-5 py-2 rounded-full bg-[#d2bbff] text-[#3f008e] text-xs font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Next Step</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="px-5 py-2 rounded-full bg-[#ffb2ba] text-[#400011] text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Publish Event</span>
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            </button>
          )}
        </div>
      </section>

      {/* Active Hosted Events Manager Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00dce6] text-[20px]">
              event_available
            </span>
            <h3 className="text-sm font-bold text-[#e6e0f2]">Manage Active Events</h3>
          </div>
          <span className="text-[11px] text-[#ccc3d8]">Simulated Live Database</span>
        </div>

        {/* Events List */}
        <div className="flex flex-col gap-3">
          {hostedEvents.map((item) => (
            <article
              key={item.id}
              className="bg-[#1c1a27] border border-[#4a4455]/30 rounded-xl p-3 shadow-md flex flex-col gap-3 transition-all"
            >
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-xs text-[#e6e0f2] truncate">{item.title}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        item.isLive
                          ? 'bg-[#007278] text-[#86f7ff]'
                          : 'bg-[#363341] text-[#ccc3d8]'
                      }`}
                    >
                      {item.isLive ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-[#ccc3d8] truncate">{item.venue}</p>
                  <div className="flex items-center justify-between text-[#ccc3d8] text-[11px]">
                    <span>{item.date}</span>
                    <span className="text-[#d2bbff] font-bold">
                      {item.rsvps}/{item.capacity} RSVPs
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 bg-[#201e2b] rounded-lg px-3 py-1.5 border border-[#4a4455]/20">
                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-[#ccc3d8]">Live</label>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...item, isLive: !item.isLive };
                      onUpdateHostedEvent(updated);
                      onShowToast(
                        updated.isLive
                          ? `"${item.title}" is now Live!`
                          : `"${item.title}" switched to Draft.`,
                        'toggle_on'
                      );
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                      item.isLive ? 'bg-[#00dce6] justify-end' : 'bg-[#363341] justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#14121e] shadow-sm" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAttendeeModalEvent(item)}
                    className="px-2.5 py-1 rounded-full bg-[#2b2836] text-[#e6e0f2] text-xs hover:bg-[#363341] flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#00dce6]">
                      group
                    </span>
                    <span>Attendees</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="p-1 rounded-full text-[#ccc3d8] hover:text-[#e6e0f2] hover:bg-[#2b2836] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Remove "${item.title}"?`)) {
                        onDeleteHostedEvent(item.id);
                        onShowToast(`Removed "${item.title}"`, 'delete', true);
                      }
                    }}
                    className="p-1 rounded-full text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Attendees Guestlist Modal */}
      {attendeeModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end justify-center p-0 transition-opacity">
          <div className="bg-[#2b2836] w-full max-w-md rounded-t-3xl p-5 flex flex-col gap-4 max-h-[75vh] shadow-2xl overflow-y-auto border-t border-[#4a4455]/40 pb-safe">
            <div className="flex items-center justify-between pb-1 border-b border-[#4a4455]/30">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#00dce6] uppercase font-bold tracking-wider">
                  Confirmed Guestlist
                </span>
                <h4 className="text-base font-bold text-[#e6e0f2]">
                  {attendeeModalEvent.title} ({attendeeModalEvent.rsvps} RSVPs)
                </h4>
              </div>
              <button
                onClick={() => setAttendeeModalEvent(null)}
                className="w-8 h-8 rounded-full bg-[#201e2b] text-[#ccc3d8] flex items-center justify-center hover:text-[#e6e0f2]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {attendeeModalEvent.attendeesList.length > 0 ? (
                attendeeModalEvent.attendeesList.map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-[#201e2b] rounded-xl border border-[#4a4455]/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold text-xs">
                        {att.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#e6e0f2]">{att.name}</span>
                        <span className="text-[10px] text-[#ccc3d8]">
                          {att.tier} • Pass {att.passId}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        att.status === 'Checked In'
                          ? 'bg-[#007278]/40 text-[#00dce6]'
                          : 'bg-[#363341] text-[#ccc3d8]'
                      }`}
                    >
                      {att.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#ccc3d8]">
                  No attendees checked in yet for this session.
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setAttendeeModalEvent(null)}
              className="w-full py-2.5 rounded-full bg-[#363341] text-[#e6e0f2] text-xs font-bold mt-1"
            >
              Close Guestlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
