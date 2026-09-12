import { EventItem, ActiveHostedEvent, TicketPass } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'chromesthesia',
    title: 'Chromesthesia: Cybernetic Neon Odyssey',
    category: 'nightlife',
    categoryLabel: 'Spotlight Drop',
    badge: 'Tier 1 • $49',
    date: 'Oct 24, 2025',
    time: '9:00 PM - 3:00 AM',
    venue: 'The Midway, SF',
    location: '900 Marin St, San Francisco, CA',
    distance: '2.1 mi',
    price: 49,
    priceLabel: '$49',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5i5R3OnkFG2s4L3MuUKySJEjFJZZKvYJVzGUTG6HPSK5RJfexRmeBJ4V5KT4Dz5A2a19zLK3nU8plABH8oi39yUWGGHzdSDSHv5z6Cjj2mY2ipj1kglc5SkML9m97JFq07I8OStThZozqcUEzWWKeXVgGtsBotTDu_wI0Gqm9344lT5ZVHiKseu5LxpdcJiYrczGbZojOVu6QXe6MQGGijUKQFpD54ZPnScSWbj3U9uvKSvMLSgUD',
    imageAlt: 'Futuristic cyber rave with intense neon purple and cyan lasers beaming across thousands of dancing concert attendees.',
    capacityText: 'Tier 1 • 88% Sold',
    capacityPercent: 88,
    isVerified: true,
    isWeekend: true,
    isHot: true,
    organizer: {
      name: 'Midway SF',
      initials: 'M',
      verified: true,
      followers: '32.1k',
      pastEvents: 58
    },
    description: 'A 360-degree audiovisual spectacle syncing cybernetic synthesizer modulations with live responsive laser geometry.',
    fullDetails: {
      attendingCount: 720,
      friendCount: 24,
      friendNames: 'Maya, Lucas, Kai + 21 others',
      milestones: [
        { time: '09:00 PM', title: 'Sonic Initiation & Cyber Ambient', description: 'Immersive soundscapes in Main Hangar', color: '#00dce6' },
        { time: '11:30 PM', title: 'Chromesthesia Keynote Set', description: 'Real-time neural laser performance', color: '#d2bbff' },
        { time: '01:30 AM', title: 'Sub-Bass Frequency Rave', description: 'Peak multi-sensory overdrive until 3am', color: '#ffb2ba' }
      ],
      schedule: [
        { time: '21:00 - 23:00', artist: 'Synaptic Flux', role: 'Ambient Lead', desc: 'Warmup hardware synth experiment', color: '#00dce6' },
        { time: '23:00 - 01:30', artist: 'Neon Odyssey Crew', role: 'Headliner', desc: 'Holographic laser projection battle', color: '#d2bbff' },
        { time: '01:30 - 03:00', artist: 'SubZero', role: 'Late Night Closer', desc: 'Heavy industrial hypnotic bass', color: '#ffb2ba' }
      ],
      artists: [
        { name: 'Synaptic Flux', role: 'Audio Architect', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB79s6sNERxC4iGf2k4vDEX1mwV6BeCI3FP9k8xOiEUytrHqYHFngIteCQUBN9pxawLdg3xKQmFF_ELepX8H7xIvNFDI_c6O84t1-EFbe8qkMcOTliozi2EUyS8hsEdyj1c1muLexr1aJuD21aJC5uJcoTb8aYMh-L2yUHQRq8pUrXuneqZV7iHHFvnx9VYv0AgC67JXRrh5uEWQ8bI92LMz5N6C_jQ1K0M9szwJlVIT5ICCzmozesj' },
        { name: 'Kaelen Voss', role: 'Modular Specialist', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkEdM-kShiluMZUzR-Fs8R41s9RuizT7QtLCLrducrkCmTZM-lgeO-PwbJLZro7CZFpjWVw0apCcnKywTudJuO3RNuo6huoMMxXFom8B1Og5p42t_-eSCqzYN5nFsLurm3VzR8lbQU_frmTs1V1K_bQkPLyazC3Tj-Wl8OnoWh8pxgWUFCI9miAVmlJt65QxSnsW5kfaqc6llIXefdAUKhWb1V6iVexE-kb3Ev_iMMmIqucjTGjDYI' }
      ],
      faq: [
        { q: 'Is there a coat check available?', a: 'Yes, full secure coat check is open from doors until close.' },
        { q: 'What is the dress code?', a: 'Futuristic, cyberpunk, or rave attire encouraged.' }
      ]
    }
  },
  {
    id: 'neon-horizon',
    title: 'Neon Horizon: Future of AI & Synthesis 2025',
    category: 'tech',
    categoryLabel: 'AI Art & Synth Expo',
    badge: 'Spotlight',
    date: 'Saturday, Nov 15, 2025',
    time: '7:00 PM – 2:30 AM PST • Doors at 6:00 PM',
    venue: 'Fort Mason Center',
    location: 'Gallery 308 & Pier 2, San Francisco, CA',
    distance: '1.6 mi',
    price: 65,
    priceLabel: '$65',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk6TpBMyu-DSogX4ixdLB0VXjiBxUlg4UAiuFPmI8IBGdHqpvUJeSJIWr5GuO_tN1egZGpcowevOgKBU0NbM9v4D0dg4qlrj3MdyqN64tbR8bnx6pku0Q9d20ym5PyyAs6m2IfpDsquhmmOVCefEFwriF6h_F1NJllLg_qBEoozcldM2vUMFs3oYuyGc967TOiZlZlQsW9PQPWMyTwnFNRbALiu7FvwJ13hlzWsa5AfXACbPtv9GF7',
    imageAlt: 'Futuristic cybernetic concert hall with neon holographic projections, ambient purple and cyan volumetric laser beams.',
    capacityText: 'Fast Selling • Last 18 Passes',
    capacityPercent: 91,
    isVerified: true,
    isWeekend: true,
    isHot: true,
    organizer: {
      name: 'Pulse Labs',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZeW1c-dHNMu9taunPAyg9BABbPTqW5ayV1-Y0-VF2sDGq0SXp196obIlu5PuvWONSLmkHIVSlHH4uQEyfZq1tE9PoEbjBLVvO4lUG_ZPIjfg1TACL83zh15cCJ59H6yR31LkDRkcFnZMT-__dswm5EiNZt0Wkr_5siWtZTQYrgKnccPNybZC3XPwTHLS_aZgT5XYBQwbNvX68MQucLwg9J5GHzOkHkrGl-A3l5nnqEmC_XF6s__ij',
      verified: true,
      followers: '18.4k',
      pastEvents: 42
    },
    description: 'Step into a multisensory odyssey where real-time neural audio generators meet world-class electronic producers and spatial visualists. Featuring 3 parallel stages, interactive bio-reactive LED domes, and spontaneous collaborative jams powered by generative intelligence.',
    fullDetails: {
      attendingCount: 482,
      friendCount: 18,
      friendNames: 'Kaelen, Maya, David + 15 others',
      milestones: [
        { time: '07:00 PM', title: 'Doors & Spatial Audio Gallery', description: 'Ambient welcome sets by NeuralHarmonics in Pier 2', color: '#00dce6' },
        { time: '09:30 PM', title: 'Keynote & AI Synthesis Duet', description: 'Live human-machine algorithmic rhythm battle', color: '#d2bbff' },
        { time: '12:00 AM', title: 'Neon Horizon Peak Live Set', description: 'Immersive 360° laser projection dome showcase', color: '#ffb2ba' }
      ],
      schedule: [
        { time: '19:00 - 20:30', artist: 'Kaelen Voss', role: 'Live Modular', desc: 'Generative ambient textures and custom patch experiments', color: '#00dce6' },
        { time: '20:45 - 21:45', artist: 'Dr. Aris Thorne', role: 'Keynote', desc: 'Next-gen latent space audio models and human artistic agency', color: '#d2bbff' },
        { time: '22:00 - 01:00', artist: 'CYBERECHO vs SORA', role: 'Live Set', desc: 'High-octane B2B neural synth bassline set with dynamic visual canvas', color: '#ffb2ba' }
      ],
      artists: [
        { name: 'Elena Cruz', role: 'Latent Audio Lead', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB79s6sNERxC4iGf2k4vDEX1mwV6BeCI3FP9k8xOiEUytrHqYHFngIteCQUBN9pxawLdg3xKQmFF_ELepX8H7xIvNFDI_c6O84t1-EFbe8qkMcOTliozi2EUyS8hsEdyj1c1muLexr1aJuD21aJC5uJcoTb8aYMh-L2yUHQRq8pUrXuneqZV7iHHFvnx9VYv0AgC67JXRrh5uEWQ8bI92LMz5N6C_jQ1K0M9szwJlVIT5ICCzmozesj' },
        { name: 'Marcus Vance', role: 'Spatial Visualist', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkEdM-kShiluMZUzR-Fs8R41s9RuizT7QtLCLrducrkCmTZM-lgeO-PwbJLZro7CZFpjWVw0apCcnKywTudJuO3RNuo6huoMMxXFom8B1Og5p42t_-eSCqzYN5nFsLurm3VzR8lbQU_frmTs1V1K_bQkPLyazC3Tj-Wl8OnoWh8pxgWUFCI9miAVmlJt65QxSnsW5kfaqc6llIXefdAUKhWb1V6iVexE-kb3Ev_iMMmIqucjTGjDYI' }
      ],
      faq: [
        { q: 'Is entry 21+ only?', a: 'Yes, valid government ID is strictly required at check-in.' },
        { q: 'Will tickets be sold at the door?', a: 'Due to fire capacity limitations, tickets are online reservation only.' }
      ]
    }
  },
  {
    id: 'subterranean',
    title: 'Subterranean Frequency: Underground Techno Night',
    category: 'music',
    categoryLabel: 'Warehouse Rave',
    date: 'Fri, Oct 17',
    time: '10:00 PM - Late',
    venue: 'Public Works (Loft Stage)',
    location: '161 Erie St, Mission SF',
    distance: '0.9 mi',
    price: 35,
    priceLabel: '$35',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghKKqInDa3tmBZj_6fp3BMNaPqPNyqXVzOZMMjqX78spUQjRwkSRoB3D-p7TteMF7LJVbRFtWokI8ngEQPNsqtzey0ARkf2hKBLWZf1B04Q3zi6UG-TkOb0BrZMNN5o1i0L6fvnK5lSQustHeMjatqJWQ3YJc47J0tF-WVr2ZEEkFOGz6G5B81c4YNYvUOGd-H_SiJC6L1dD24dls372dfcs05_pKOQYuXaFCFIuNecVruXGGA04g',
    imageAlt: 'Deep warehouse rave in San Francisco with purple and cyan ambient glow, DJ silhouette against towering LED screen walls.',
    capacityText: 'Only 4 tickets left!',
    capacityPercent: 92,
    isVerified: true,
    isWeekend: true,
    isHot: true,
    organizer: {
      name: 'Klanghaus Collective',
      initials: 'K',
      verified: true,
      followers: '14.2k',
      pastEvents: 29
    },
    description: 'Raw analog rhythm, bone-rattling Funktion-One sound, and uncompromising Berlin-style underground electronics in the Mission.',
    fullDetails: {
      attendingCount: 310,
      friendCount: 12,
      friendNames: 'David, Sophia, Ryan + 9 others',
      milestones: [
        { time: '10:00 PM', title: 'Modular Warmup Session', description: 'Loft stage ambient immersion', color: '#00dce6' },
        { time: '12:00 AM', title: 'Klanghaus Main Showcase', description: 'High tempo analog hardware live', color: '#d2bbff' },
        { time: '02:30 AM', title: 'Afterhours Secret Vault', description: 'Private room unlock for wristband holders', color: '#ffb2ba' }
      ],
      schedule: [
        { time: '22:00 - 00:00', artist: 'Anika Ohm', role: 'Live Synth', desc: 'Deep modular minimal techno', color: '#00dce6' },
        { time: '00:00 - 02:30', artist: 'Klanghaus Resident', role: 'Main Act', desc: 'Peak warehouse industrial flow', color: '#d2bbff' }
      ],
      artists: [
        { name: 'Anika Ohm', role: 'Analog Specialist', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB79s6sNERxC4iGf2k4vDEX1mwV6BeCI3FP9k8xOiEUytrHqYHFngIteCQUBN9pxawLdg3xKQmFF_ELepX8H7xIvNFDI_c6O84t1-EFbe8qkMcOTliozi2EUyS8hsEdyj1c1muLexr1aJuD21aJC5uJcoTb8aYMh-L2yUHQRq8pUrXuneqZV7iHHFvnx9VYv0AgC67JXRrh5uEWQ8bI92LMz5N6C_jQ1K0M9szwJlVIT5ICCzmozesj' }
      ],
      faq: [
        { q: 'Is re-entry permitted?', a: 'Re-entry is allowed with stamp until 2am.' }
      ]
    }
  },
  {
    id: 'autonomous-minds',
    title: 'Autonomous Minds: GenAI Showcase & Mix',
    category: 'tech',
    categoryLabel: 'AI & Founders',
    date: 'Sat, Oct 18',
    time: '6:30 PM - 10:00 PM',
    venue: 'SHACK15 Ferry Building',
    location: '1 Ferry Bldg Suite 201, SF',
    distance: '1.2 mi',
    price: 0,
    isFree: true,
    priceLabel: 'Free',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlr4iRmJK9yOFkg21QFq58s6l04H2NS9tpIFQIc9F_rnMrBh2YEBtdF7FPsbdadNbV7QXeq5P5VNMYNLJ1xDJ5W1xKHVIbzzU991h2qP0Z-caP-WCzWs4Ai5M3XazmMCDfVzsNkPO2y2pOw8PFiVo1mhALjiBI_Mmi55NjI_q_iZ7AJHXITAF6d5nI6t8z1QKvnqd4WS_WGu6Imqf165bb-pyGMoN7lIG5XlKmecGlWXh85aFTsIo',
    imageAlt: 'Modern high-tech AI demo night in a sleek San Francisco loft gallery, futuristic holographic projections glowing in cyan and purple.',
    capacityText: '142 Founders Rsvp\'d • Free',
    capacityPercent: 71,
    isVerified: true,
    isWeekend: true,
    organizer: {
      name: 'Silicon Horizon',
      initials: 'S',
      verified: true,
      followers: '21.5k',
      pastEvents: 34
    },
    description: 'An exclusive gathering of top generative intelligence researchers, multimodal founders, and creative AI practitioners at the iconic Ferry Building.',
    fullDetails: {
      attendingCount: 142,
      friendCount: 8,
      friendNames: 'Maya, Alex, Liam + 5 others',
      milestones: [
        { time: '06:30 PM', title: 'Founders Mixer & Cocktails', description: 'Curated networking at panoramic Bay view lounge', color: '#00dce6' },
        { time: '07:30 PM', title: 'Lightning Lightning Demos (5 mins each)', description: '8 breakthrough autonomous agent startups', color: '#d2bbff' },
        { time: '08:45 PM', title: 'Open Floor & Collaborative Jam', description: 'Connecting builders with seed angels & talent', color: '#ffb2ba' }
      ],
      schedule: [
        { time: '18:30 - 19:30', artist: 'Silicon Horizon Host', role: 'Welcome', desc: 'Registration & pass scan', color: '#00dce6' },
        { time: '19:30 - 20:45', artist: 'Founders Roster', role: 'Demos', desc: 'Live agent interaction showcase', color: '#d2bbff' }
      ],
      artists: [],
      faq: [
        { q: 'Is the event strictly limited?', a: 'Yes, approval or RSVP confirmation is required at check-in.' }
      ]
    }
  },
  {
    id: 'prism-spectrum',
    title: 'Prism Spectrum: Sensory Light & Natural Wine',
    category: 'arts',
    categoryLabel: 'Interactive Art',
    date: 'Sun, Oct 19',
    time: '4:00 PM - 9:00 PM',
    venue: 'Minnesota Street Project',
    location: '1275 Minnesota St, Dogpatch SF',
    distance: '2.4 mi',
    price: 28,
    priceLabel: '$28',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlVJByxyik784ZIA1062P30QU7XwpLlz0Q3lIN7ARq3pXdym1koAJ4qrGCoWfc_uV7weX3pPhgQBtycXhW7K9t0_zd6x45dmBnLZSXajDCHoS0oUTQUGhJtWm4MwZ1jj5o-EhwLW6wZ0vMsMg6wOPePq7bGJ8XiA9e_ECvH_1eNdyyO40WQMQY5cFbY1F_eK6zXPaBi_QoRWBkThlf53P_AabrJAyPcnlSZ38WNUGT-T5NkMp4PkL1',
    imageAlt: 'Immersive digital art gallery exhibition in San Francisco with dynamic color gradient floor projections.',
    capacityText: '12 slots remaining',
    capacityPercent: 75,
    isVerified: true,
    isWeekend: true,
    organizer: {
      name: 'Prism Project',
      initials: 'P',
      verified: true,
      followers: '8.9k',
      pastEvents: 16
    },
    description: 'Immersive luminescent mirrors and sensory sound pavilions paired with biodynamic low-intervention natural wines in the Dogpatch arts enclave.',
    fullDetails: {
      attendingCount: 95,
      friendCount: 5,
      friendNames: 'Maya, Chloe, Julian + 2 others',
      milestones: [
        { time: '04:00 PM', title: 'Wine Pouring & Sound Walk', description: 'Four curated orange & pet-nat tastings', color: '#00dce6' },
        { time: '06:00 PM', title: 'Luminescent Light Shift', description: 'Visual sculptures react to ambient humidity and room audio', color: '#d2bbff' }
      ],
      schedule: [],
      artists: [],
      faq: [
        { q: 'Are wine tastings included in ticket?', a: 'Yes, 4 flight tastings are complimentary with admission.' }
      ]
    }
  },
  {
    id: 'tech-con-2025',
    title: 'Tech Con 2025: Quantum AI',
    category: 'tech',
    categoryLabel: 'Tech & AI',
    date: 'Oct 18, 9:00 AM',
    time: '9:00 AM - 5:30 PM',
    venue: 'Moscone Center',
    location: '747 Howard St, SF',
    distance: '0.8 mi',
    price: 189,
    priceLabel: '$189',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUucTPqLi1Susk-MDBtCTKLoqFSwz9g1aqPrJ4I7176oHgs5n84go7aqh7zAUL2hNzH6-cRoiw3eV7J6kr9cUUeQXE99uh_c_2DSihpr1oeL05EpgrCbg9xNa4U0fqy6K2A1o8RiZE7VKa9fndipX_GiEFfsAMJdh8-51exwpkd5e9hplPYWb8cNsZnBTRZjjk3eBZgwYH0NCxJMEy40RD15LBsLhN1Wqhu2Fr0BQaKEfGK94o_fkO',
    imageAlt: 'Futuristic tech auditorium with volumetric neon violet and laser cyan stage lights, a massive holographic 3D backdrop.',
    capacityText: 'Fast Selling • 14 seats remaining',
    capacityPercent: 88,
    isVerified: true,
    isWeekend: false,
    organizer: {
      name: 'Quantum Nexus',
      initials: 'Q',
      verified: true,
      followers: '45k',
      pastEvents: 60
    },
    description: 'The premier annual summit on quantum algorithms and neural architecture breakthroughs.'
  },
  {
    id: 'cyberpulse-rave',
    title: 'CyberPulse Neon Rave: SubZero',
    category: 'nightlife',
    categoryLabel: 'Nightlife',
    date: 'Sat, 10:30 PM',
    time: '10:30 PM - 4:00 AM',
    venue: 'The Great Northern',
    location: '119 Utah St, SF',
    distance: '1.4 mi',
    price: 35,
    priceLabel: '$35',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs5PRLt1Zzf61IC20z8XkCvNGSdTjCGNiTcbro4nII2cur1uWJh4f7n2pYOR1FsvEZcPEekbNEExH3kpuJTq1l_0jFQWMdSmy-0UaxSTOA-g6llChRMo-kmMzY3sQOJFLAhlnl68JzC6Sw0mLGqwS5pHbZM5QAF9r96umIEqR6YNRj9ucocJQkYb7nYIfdS_yplNYd5egCsyOWOKZ7K3j7fpsCA2sVcHkfz2RXm5Ty3pp3AVPr6Bob',
    imageAlt: 'Euphoric underground techno rave with deep ultraviolet strobes, neon magenta laser beams.',
    capacityText: 'Entry Demand • Tier 1: 94% Sold',
    capacityPercent: 94,
    isVerified: true,
    isWeekend: true,
    isHot: true,
    organizer: {
      name: 'SubZero SF',
      initials: 'S',
      verified: true,
      followers: '19.8k',
      pastEvents: 33
    },
    description: 'SubZero brings heavy modular synths and sensory strobe arrays to Great Northern.'
  },
  {
    id: 'founders-pitch-night',
    title: 'Founders Pitch Night: Demo Stage',
    category: 'startup',
    categoryLabel: 'Startup',
    date: 'Thu, 6:00 PM',
    time: '6:00 PM - 9:00 PM',
    venue: 'Canopy Jackson Square',
    location: '595 Pacific Ave, SF',
    distance: '0.4 mi',
    price: 0,
    isFree: true,
    priceLabel: 'Free',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw97iDBz5oQfRvJPz1Z_53NdyMM2woUSXNRV9HRiAg7Zzl5wjeiR59UgdH6omYt2-cVRm1Ebq7YCwr2zNYNLuI-m1RbYcuUMd7Xm5qoonAF-kC4nfWbdRic1VNG34246LK7iS5r3tSl02DIGBreE-ODwwlmDGJyNlBP537VOWMZXXHJvwXnspRXwnkKchoj-BH3WGgJ5-ePm4Sczhha_iHeXer-pOQppHxvKSotKI99mswD0rTz5IX',
    imageAlt: 'Modern warehouse loft with warm ambient string lights and soft violet neon backdrops, startup founders pitching.',
    capacityText: 'RSVP Status • 42 Spots Left',
    capacityPercent: 58,
    isVerified: true,
    isWeekend: false,
    organizer: {
      name: 'VenturePulse',
      initials: 'V',
      verified: true,
      followers: '12k',
      pastEvents: 22
    },
    description: 'Watch 10 top pre-seed founders pitch to Tier-1 venture partners.'
  },
  {
    id: 'neon-art-gala',
    title: 'Neon Art Gala: Luminarium',
    category: 'arts',
    categoryLabel: 'Visual Arts',
    date: 'Fri, 7:30 PM',
    time: '7:30 PM - 11:30 PM',
    venue: 'SFMOMA Atrium',
    location: '151 3rd St, SF',
    distance: '1.1 mi',
    price: 65,
    priceLabel: '$65',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ8BSkdMqLbwdDwLI4vb3Bbx2fb6BgECzYN7WCs1FPVK86ytOm6ALGD5qLVvofWZ5gWzZZtDWIB5lr4xpSENJJ_22zWdnqQQrqJwoq2qxIPQW1VNvAmYh3FmYOrPMmObtqFSZJIszsiZfk1HmCATd1ORpwqKxuT2FGDexo0lJFUNdxr2HJt-gK1UwXwbTM9L8Zpm4ATJyeum1w-_JRMSgSeRIMI1OXZn_aE3hJ_prXzyExZp35Uh1',
    imageAlt: 'Immersive interactive digital art installation exhibition with glowing fiber optic tendrils.',
    capacityText: 'Limited Entry • 28% left',
    capacityPercent: 72,
    isVerified: false,
    isWeekend: true,
    organizer: {
      name: 'Luminarium Arts',
      initials: 'L',
      verified: false,
      followers: '7.4k',
      pastEvents: 11
    },
    description: 'An enchanting night of luminescent light sculptures and live ambient synthesizers inside SFMOMA.'
  },
  {
    id: 'indie-premiere',
    title: 'Indie Premiere: Chromatic Dreams',
    category: 'film',
    categoryLabel: 'Premiere',
    date: 'Sun, 5:00 PM',
    time: '5:00 PM - 8:30 PM',
    venue: 'Roxie Theater, Mission',
    location: '3117 16th St, SF',
    distance: '2.3 mi',
    price: 20,
    priceLabel: '$20',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkGxt5tXB7OAJimkwMrV9CD7qXpVMBhIPgzLF9eYw9zLnbbEcrlBg-IkmU9cLHduBTCQHPPEXobRi1dcvSJN6ai3Y52YDlEFFafpi1ND67vusrOs8MKIKyZET6I2-8cZk6eWZ-APKAhPEkSMn-KAITv6QAS5-gYo8T7wv70LB1Auy5mw29LEh0HKkGRZRBSKboLz0OqQ5cxKhBjUNvkNkksdp2ZZqVQhXMKxGqqzgrJuEZAxka9O18',
    imageAlt: 'Historic art deco cinema theater marquee glowing warm amber and ruby red at dusk.',
    capacityText: 'Theater Seats • Almost Full (8 seats)',
    capacityPercent: 92,
    isVerified: true,
    isWeekend: true,
    organizer: {
      name: 'Roxie Cinema',
      initials: 'R',
      verified: true,
      followers: '28k',
      pastEvents: 140
    },
    description: 'World premiere of the neon-noir sci-fi psychological thriller Chromatic Dreams with director Q&A.'
  },
  {
    id: 'deep-bass-warehouse',
    title: 'Deep Bass Warehouse Session',
    category: 'nightlife',
    categoryLabel: 'Bass Live',
    date: 'Sat, Midnight',
    time: '12:00 AM - 5:00 AM',
    venue: 'Midway Complex',
    location: '900 Marin St, SF',
    distance: '3.1 mi',
    price: 25,
    priceLabel: '$25',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTZmgVj-qJjirtDLxDn1smMmRpkMY42i9gSkJgFVRyFHNyp2XtNQQehxcU9ZFEdDCghWmoMGOiEn_QFqB53JLQ6cKQyXVrhylznzTHeOa6ySNinXdIQ-4vnCNlVTLVkhEK8CuRWmw5ESPiBdgHyyejyTViKGRyIMlt0nR9reTkeLGEBwbv0uIUpwZFJTGGIxQza4E9-SFLVuvKylHldQpm9qjzzolql7piSWs4osQqdtXrPs7LW65i',
    imageAlt: 'Raw industrial brick warehouse venue filled with hazy purple and cyan backlights.',
    capacityText: 'Door Access • Available',
    capacityPercent: 45,
    isVerified: false,
    isWeekend: true,
    organizer: {
      name: 'Bass Faction',
      initials: 'B',
      verified: false,
      followers: '9.2k',
      pastEvents: 18
    },
    description: 'Heavy bass music with massive subwoofer wall arrays.'
  },
  {
    id: 'open-source-summit',
    title: 'Open Source Community Summit',
    category: 'tech',
    categoryLabel: 'Code',
    date: 'Wed, 1:00 PM',
    time: '1:00 PM - 7:00 PM',
    venue: 'GitHub HQ, Brannan St',
    location: '88 Colin P Kelly Jr St, SF',
    distance: '1.8 mi',
    price: 0,
    isFree: true,
    priceLabel: 'Free',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxgYJUXiHJZ1W2fiaeoUvDCdZKvNtlHC9Zjf4PcrkJvnpzPeARCGxYVIFOcFjw_zEwqu9jCYy-kFVWD128GWHvNverctDYBtXpirm620Rk_J3u88VOVJ8o4nyF25Fq2w1kFTpAfsKgyhz6exGFCUyxLOt9wQkDEyl61EDqIgc6p55K9K3c90Y1C9PkXvY-noRQMJIBMr1OWkhsJBDpjNjuvz9AdmyLi7SdXbevuuHHAgbFTK4XmKB7',
    imageAlt: 'Spacious sunlit tech co-working campus atrium with leafy indoor plants, software developers collaborating.',
    capacityText: 'Registration • Open Registration',
    capacityPercent: 35,
    isVerified: true,
    isWeekend: false,
    organizer: {
      name: 'OpenSF',
      initials: 'O',
      verified: true,
      followers: '15k',
      pastEvents: 25
    },
    description: 'Collaborate with maintainers of premier open source tooling and AI frameworks.'
  },
  {
    id: 'rooftop-sunset-vip',
    title: 'Rooftop Sunset Sessions VIP',
    category: 'nightlife',
    categoryLabel: 'VIP Exclusive',
    date: 'Sun, 4:00 PM',
    time: '4:00 PM - 10:00 PM',
    venue: "Charmaine's Rooftop",
    location: '1100 Market St, SF',
    distance: '1.2 mi',
    price: 120,
    priceLabel: '$120 VIP',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2HlYY6clx1Odtq-e5-1DwZFhRS8trcT8661VMsauXxJ5fCRGSR4Icw0eWUW8YXBu-OLywOnyzryNjZoKgHnBLlDAIvZ3ordPRfnRPh88kAfMWUooqQborQbOJg4E-SU0flu6Bbxm6a_MM9SVIWe58zudv2HoAcR551cEoPOy-EJv7Q7ja-_rm2oapJ-7bo7s3DO4cna4Tbo_KVNAJOHxz2kEAXV767-OqkiLoZOyFWfk8cpoFitU',
    imageAlt: "Chic panoramic rooftop bar overlooking San Francisco skyline during golden hour twilight.",
    capacityText: 'VIP Capacity • Last 5 Passes',
    capacityPercent: 96,
    isVerified: true,
    isWeekend: true,
    organizer: {
      name: 'Sky Bar SF',
      initials: 'S',
      verified: true,
      followers: '24k',
      pastEvents: 50
    },
    description: 'Curated cocktails, panoramic city views, and sunset melodic house sets.'
  }
];

export const INITIAL_HOSTED_EVENTS: ActiveHostedEvent[] = [
  {
    id: 'event-hosted-1',
    title: 'SF Tech Pulse Summit',
    venue: 'Palace of Fine Arts, San Francisco',
    date: 'Oct 29 • 9:00 AM',
    time: '9:00 AM',
    rsvps: 142,
    capacity: 150,
    isLive: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhcvQtiE5V4db7sfWSiF-B7EdMM3_EO_s4m6ZRVLeyN1-YYPZYLdfXGFiobrm_3nfq5jGNTfIIicvnzOROxCKdR6yUj5-g5UdTZlO7J_zh5j92TruNfCBvMWVgl3bmtRLzQ5V0-Uq4zaA1asmcxuyN9eCJHuBJe2cB8bKZdzvJ511Wz05QIMPyu8aO1xkmqHtYFeKCAijf-wIegaEoiiTjXpa7SDX1h52hQvCbLnFGYmfkJzd2mF_S',
    attendeesList: [
      { name: 'Aria Lennox', tier: 'VIP Tier', passId: '#4802', status: 'Checked In', initials: 'AL' },
      { name: 'Marcus Ray', tier: 'Early Bird', passId: '#4803', status: 'Registered', initials: 'MR' },
      { name: 'Elena Chen', tier: 'Backstage VIP', passId: '#4804', status: 'Checked In', initials: 'EC' },
      { name: 'David Zhao', tier: 'General', passId: '#4805', status: 'Registered', initials: 'DZ' }
    ]
  },
  {
    id: 'event-hosted-2',
    title: 'Synthwave Rooftop Party',
    venue: 'Skyline Lounge, Oakland',
    date: 'Nov 04 • 8:00 PM',
    time: '8:00 PM',
    rsvps: 106,
    capacity: 150,
    isLive: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCZcWWZsJuuXwZDTud6NHdtEk9cuZqfM6CJLifkhBJo6bE8uD74fcsKRDYs0lOkcXlz1N0nRKNAKy-VVTRcU6zW-8f5tsMNhtkuKsemKhXhInao0qZJrd6gJPlLrWj-X5JhcxMGN4eNfngVm9FdBqYVPvnAJGdhbjtoPowk8lcJb-elErsSDZBVUZjdA8Ly8QBQzar_Bjxk08pJXy7aojdMyb_hqh2iH0PZNN6-VFoNSyjHBwXei6O',
    attendeesList: [
      { name: 'Maya Lin', tier: 'VIP Lounge', passId: '#5101', status: 'Checked In', initials: 'ML' },
      { name: 'Julian Vance', tier: 'General Entry', passId: '#5102', status: 'Registered', initials: 'JV' },
      { name: 'Sora Tanaka', tier: 'VIP Lounge', passId: '#5103', status: 'Checked In', initials: 'ST' }
    ]
  }
];

export const INITIAL_USER_TICKETS: TicketPass[] = [
  {
    id: 'ticket-nh-89240',
    eventId: 'neon-horizon',
    eventTitle: 'Neon Horizon: Future of AI & Synthesis 2025',
    venue: 'Fort Mason Center, SF • Gallery 308',
    date: 'Sat, Nov 15, 2025',
    time: '7:00 PM PST',
    tierName: 'General Admission',
    unitPrice: 65,
    quantity: 1,
    totalPaid: 69.50,
    qrCodeId: '#NH-89240',
    passHolderName: 'Maya Lin',
    status: 'active',
    purchasedAt: '2025-10-12',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk6TpBMyu-DSogX4ixdLB0VXjiBxUlg4UAiuFPmI8IBGdHqpvUJeSJIWr5GuO_tN1egZGpcowevOgKBU0NbM9v4D0dg4qlrj3MdyqN64tbR8bnx6pku0Q9d20ym5PyyAs6m2IfpDsquhmmOVCefEFwriF6h_F1NJllLg_qBEoozcldM2vUMFs3oYuyGc967TOiZlZlQsW9PQPWMyTwnFNRbALiu7FvwJ13hlzWsa5AfXACbPtv9GF7'
  }
];
