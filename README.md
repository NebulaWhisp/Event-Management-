# EventPulse 🎟️✨

**EventPulse** is a mobile-first event discovery, ticketing, and creator platform tailored for nightlife, tech summits, live concerts, and underground cultural gatherings. Built with modern React, TypeScript, and a cybernetic dark aesthetic, it delivers a fluid experience for attendees discovering the city's pulse and creators hosting their next drop.

---

## 🌟 Key Features & Architecture

### 1. Explore Feed (Home)
- **Live City Radar & Pulse Status**: Real-time city selector (SF Bay Area, NYC, Austin, Berlin) with active friend turnout metrics.
- **Featured Live Drop**: Spotlight hero countdown banner with ticking timer, tier pricing, and instant 1-tap checkout.
- **Pulse Bento Ticker**: High-density statistics tracking attendees out, active venues, and overall vibe rating.
- **Pulse Clusters**: Horizontally scrolling category cards (Tech & AI, Electronic & Live, Design & Creative, Startup Summits).
- **Happening This Weekend**: Interactive feed featuring live seat counters, capacity progress bars, verified badges, and quick-save bookmarking.

### 2. Events Directory & Discovery
- **Parametric Search**: Instant keyword filtering across event titles, venues, artists, and descriptions.
- **Display Modes**: Toggle seamlessly between detailed card view and high-density 2-column grid view.
- **Filter Sheet Drawer**: Interactive slide-up modal with:
  - Distance radius slider (1–50 miles)
  - Price brackets (*Any*, *Free Only*, *Under $50*)
  - Verified organizer filter
- **Quick Vibe Chips**: Instant pill toggles for weekend events, free admission, and category sorting.

### 3. Event Detail & Instant Booking Flow
- **Immersive Visual Header**: Dynamic image display with attendee avatar clusters, status badges, and bookmarking.
- **Bento Logistics Matrix**: Organized date/time and venue access information with interactive Google Maps navigation links.
- **4-Tab Deep-Dive**:
  - **Overview**: In-depth description and event highlights.
  - **Schedule**: Timeline lineup with start times and stage allocations.
  - **Lineup**: Featured artist and keynote speaker bios with social handles.
  - **Venue & FAQ**: Age restrictions, dress code, door policy, and accessibility details.
- **Interactive Checkout Modal**:
  - Multi-tier pass selection (General Admission, VIP Backstage)
  - Ticket quantity steppers with automated price recalculation
  - Promo code engine with discount application (e.g. `PULSE20` for 20% off)
  - Instant digital pass issuance with scannable QR code and gate assignments

### 4. Tickets & Access Passes (Digital Wallet)
- **Holographic Perforated Pass Design**: Styled ticket cards with authentic notch cutouts, security watermarks, and high-density SVG barcodes.
- **Interactive QR Verification**: Modal pass view with scannable gate QR, admission token, and gate instructions.
- **Pass Management**: Filter between upcoming active reservations and past attended events with feedback rating.
- **Peer Transfer Engine**: Send tickets to friends via email or phone with real-time transfer confirmation.
- **Wallet Export**: One-tap simulation to save passes directly to Apple Wallet or Google Wallet.

### 5. Creator Studio (Organizer Suite)
- **Operations Dashboard**: Real-time revenue telemetry tracking total earnings, ticket volume, event views, and live hosting count.
- **4-Step Event Creation Wizard**:
  - *Step 1: Basics* (Title, category, tag line, description)
  - *Step 2: Logistics* (Date, time, venue name, address)
  - *Step 3: Ticketing* (Pricing model, tier name, pass capacity)
  - *Step 4: Media & Preview* (Cover image selection with live card preview)
- **Publishing & Confetti Engine**: Instant event publishing with canvas celebratory burst and immediate integration into the discovery feed.
- **Event Lifecycle Controls**: Toggle events between Live and Draft states, edit details, or remove listings.
- **Guestlist Check-In Modal**: Search and monitor registered attendees with 1-click door check-in status.

### 6. User Profile & Preferences
- **Aura & Identity**: Profile header with tier badge, member since date, and interactive edit bio modal.
- **Saved Vibes**: Curated drawer of bookmarked events for fast retrieval.
- **Quick Links**: Access past purchase receipts, notification settings, and help center FAQs.

---

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 (native `@tailwindcss/vite` integration)
- **Icons**: Lucide React
- **Animations & Transitions**: Motion (`motion/react`)
- **Build Tooling**: Vite 6

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository and install dependencies
npm install
```

### Development Server

```bash
# Start Vite development server on port 3000
npm run dev
```

The application will be accessible at `http://localhost:3000` (or `http://0.0.0.0:3000`).

### Production Build

```bash
# Build production client bundle
npm run build

# Preview production build locally
npm run preview
```

### Code Quality & Validation

```bash
# Run TypeScript compilation check
npm run lint
```

---

## 🎨 Color Palette & Design Tokens

| Token | Hex | Role |
|---|---|---|
| Background Canvas | `#14121e` | Deep ambient cyber violet |
| Elevated Cards | `#201c2d` | Container and sheet surface |
| Card Border | `#35304b` | High-contrast structural dividers |
| Primary Accent | `#d2bbff` | Glowing electric lavender |
| Accent Hover | `#bca0f5` | Interactive button states |
| Neon Green | `#46e8b4` | Live tags, confirmed status, and tickets |
| Text Primary | `#f4f0ff` | High-contrast readable typography |
| Text Muted | `#9b93b8` | Meta labels and secondary timestamps |

---

## 📄 License
MIT License. Created for Google AI Studio.
