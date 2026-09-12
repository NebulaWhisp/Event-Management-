import React, { useState } from 'react';
import { EventItem, ScreenType } from '../types';

interface ProfileScreenProps {
  events: EventItem[];
  savedEventIds: string[];
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string, icon?: string, isAccent?: boolean) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  events,
  savedEventIds,
  onSelectEvent,
  onNavigate,
  onShowToast
}) => {
  const [name, setName] = useState('Maya Lin');
  const [handle, setHandle] = useState('@mayapulse');
  const [bio, setBio] = useState(
    'Sound architect & digital culture enthusiast. Always searching for the next low-frequency subterranean room.'
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const savedEvents = events.filter((e) => savedEventIds.includes(e.id));

  const handleSaveBio = () => {
    setIsEditingBio(false);
    onShowToast('Profile bio updated!', 'check_circle');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 gap-6 pt-2 pb-28 relative">
      {/* Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#7c3aed]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* User Hero Identity */}
      <section className="flex flex-col items-center text-center gap-3 pt-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#00dce6] via-[#d2bbff] to-[#ffb2ba] shadow-[0_0_24px_rgba(0,220,230,0.4)]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHQeGhtv7znBc0JnZ27VXNFMwBcony2UQ1q7xdesEacZbpoLHG-dvfkyiABOU8cr1PdiBY22Vv71Ifhy45tF34b-AZ_v5G0c13BpRIaJQegXVXF0IdYJAZQ-OZ4Bc_JNoJw2sGD1AgDcxKmSZyepo8jeQzWhMqcFA0B-NEmVtUnAzKIHhQ4EJSU4qyVbeA1nGwkNZcwBAs_cyrkBFBkl7WiKWR41JDLjEzt4ICJ_9ewmTeu5I2bwOE"
              alt="Maya Lin"
              className="w-full h-full object-cover rounded-full bg-[#1c1a27]"
            />
          </div>
          <span className="absolute bottom-0 right-1 px-2 py-0.5 rounded-full bg-[#007278] text-[#86f7ff] text-[10px] font-extrabold shadow-md border border-[#00dce6]/40">
            PRO
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <h1 className="font-black text-xl text-[#e6e0f2] tracking-tight">{name}</h1>
            <span
              className="material-symbols-outlined text-[#00dce6] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <span className="text-xs text-[#00dce6] font-semibold">{handle} • San Francisco, CA</span>
          <p className="text-xs text-[#ccc3d8] max-w-xs mt-1.5 leading-relaxed">{bio}</p>
        </div>

        <button
          onClick={() => setIsEditingBio(true)}
          className="px-4 py-1.5 rounded-full bg-[#2b2836] text-[#e6e0f2] text-xs font-semibold hover:bg-[#363341] border border-[#4a4455]/30 transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[15px]">edit</span>
          <span>Edit Profile</span>
        </button>
      </section>

      {/* Stats Ribbon Bento */}
      <section className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#1c1a27] border border-[#4a4455]/30 shadow-lg text-center">
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-lg text-[#d2bbff]">28</span>
          <span className="text-[10px] text-[#ccc3d8]">Events Attended</span>
        </div>
        <div className="flex flex-col items-center border-x border-[#4a4455]/30">
          <span className="font-extrabold text-lg text-[#ffb2ba]">14</span>
          <span className="text-[10px] text-[#ccc3d8]">Following</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-lg text-[#00dce6]">892</span>
          <span className="text-[10px] text-[#ccc3d8]">Pulse Aura</span>
        </div>
      </section>

      {/* Saved Bookmarks Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[18px] text-[#ffb2ba]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bookmark
            </span>
            <h2 className="font-bold text-sm text-[#e6e0f2]">Saved Vibes ({savedEvents.length})</h2>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-bold text-[#d2bbff] hover:underline"
          >
            Explore More
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {savedEvents.map((e) => (
            <div
              key={e.id}
              onClick={() => onSelectEvent(e)}
              className="p-3 rounded-xl bg-[#201e2b] border border-[#4a4455]/30 flex items-center justify-between cursor-pointer hover:bg-[#2b2836] transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={e.imageUrl}
                  alt={e.title}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <h3 className="text-xs font-bold text-[#e6e0f2] truncate group-hover:text-[#d2bbff]">
                    {e.title}
                  </h3>
                  <span className="text-[11px] text-[#ccc3d8] truncate">
                    {e.venue} • {e.date}
                  </span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#d2bbff] shrink-0 ml-2">
                {e.priceLabel || `$${e.price}`}
              </span>
            </div>
          ))}

          {savedEvents.length === 0 && (
            <div className="p-4 rounded-xl bg-[#201e2b] border border-[#4a4455]/20 text-center text-xs text-[#ccc3d8]">
              No saved vibes yet. Click the heart or bookmark icon on any event!
            </div>
          )}
        </div>
      </section>

      {/* Preferences & Toggles */}
      <section className="flex flex-col gap-2.5">
        <h2 className="font-bold text-sm text-[#e6e0f2]">Preferences</h2>
        <div className="flex flex-col rounded-2xl bg-[#1c1a27] border border-[#4a4455]/30 overflow-hidden divide-y divide-[#4a4455]/30">
          {/* Notifications */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00dce6] text-[20px]">
                notifications_active
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e6e0f2]">Drop Notifications</span>
                <span className="text-[10px] text-[#ccc3d8]">
                  Alerts for secret rooms & early access
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setNotificationsEnabled(!notificationsEnabled);
                onShowToast(
                  !notificationsEnabled
                    ? 'Drop notifications enabled 🔔'
                    : 'Drop notifications paused',
                  'notifications'
                );
              }}
              className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                notificationsEnabled ? 'bg-[#00dce6] justify-end' : 'bg-[#363341] justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#14121e] shadow-sm" />
            </button>
          </div>

          {/* Location */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ffb2ba] text-[20px]">
                near_me
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#e6e0f2]">Nearby Radar (SF)</span>
                <span className="text-[10px] text-[#ccc3d8]">
                  Prioritize venues within 10 miles
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setLocationEnabled(!locationEnabled);
                onShowToast(
                  !locationEnabled ? 'Location radar active' : 'Location radar disabled',
                  'near_me'
                );
              }}
              className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                locationEnabled ? 'bg-[#00dce6] justify-end' : 'bg-[#363341] justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#14121e] shadow-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* Creator Studio Prompt */}
      <section
        onClick={() => onNavigate('create')}
        className="p-4 rounded-2xl bg-gradient-to-r from-[#7c3aed]/20 via-[#2b2836] to-[#b0003e]/20 border border-[#4a4455]/40 flex items-center justify-between cursor-pointer hover:border-[#d2bbff] transition-all shadow-md group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7c3aed] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#e6e0f2]">Want to host a set or summit?</span>
            <span className="text-[11px] text-[#ccc3d8]">Open Creator Studio & publish in mins</span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#d2bbff] group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </section>

      {/* App Version */}
      <div className="text-center text-[11px] text-[#958da1] pt-2">
        EventPulse SF v2.4 • Connected to Live SF Network
      </div>

      {/* Edit Bio Modal */}
      {isEditingBio && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-[#2b2836] w-full max-w-md rounded-t-3xl p-5 flex flex-col gap-4 shadow-2xl border-t border-[#4a4455]/40 pb-safe">
            <div className="flex items-center justify-between pb-1 border-b border-[#4a4455]/30">
              <h3 className="text-base font-bold text-[#e6e0f2]">Edit Profile</h3>
              <button
                onClick={() => setIsEditingBio(false)}
                className="w-8 h-8 rounded-full bg-[#201e2b] text-[#ccc3d8] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#ccc3d8]">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#201e2b] rounded-xl px-3.5 py-2.5 text-xs text-[#e6e0f2] border border-[#4a4455]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#ccc3d8]">Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="bg-[#201e2b] rounded-xl px-3.5 py-2.5 text-xs text-[#e6e0f2] border border-[#4a4455]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#ccc3d8]">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-[#201e2b] rounded-xl p-3 text-xs text-[#e6e0f2] border border-[#4a4455]/30 resize-none"
                />
              </div>

              <button
                onClick={handleSaveBio}
                className="w-full py-3 rounded-full bg-[#d2bbff] text-[#3f008e] text-xs font-black shadow-md mt-1"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
