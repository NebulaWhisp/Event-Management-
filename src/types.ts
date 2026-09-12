export type ScreenType = 'explore' | 'events' | 'create' | 'tickets' | 'profile';

export interface EventItem {
  id: string;
  title: string;
  category: 'music' | 'tech' | 'nightlife' | 'arts' | 'social' | 'startup' | 'film';
  categoryLabel: string;
  badge?: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  distance: string;
  price: number;
  isFree?: boolean;
  priceLabel?: string;
  imageUrl: string;
  imageAlt?: string;
  capacityText: string;
  capacityPercent: number;
  capacityType?: string;
  isVerified?: boolean;
  isWeekend?: boolean;
  isHot?: boolean;
  organizer: {
    name: string;
    avatar?: string;
    initials?: string;
    verified: boolean;
    followers?: string;
    pastEvents?: number;
  };
  description?: string;
  fullDetails?: {
    attendingCount: number;
    friendCount: number;
    friendNames: string;
    milestones: { time: string; title: string; description: string; color: string }[];
    schedule: { time: string; artist: string; role: string; desc: string; color: string }[];
    artists: { name: string; role: string; avatar: string }[];
    faq: { q: string; a: string }[];
  };
}

export interface TicketPass {
  id: string;
  eventId: string;
  eventTitle: string;
  venue: string;
  date: string;
  time: string;
  tierName: string;
  unitPrice: number;
  quantity: number;
  totalPaid: number;
  qrCodeId: string;
  passHolderName: string;
  status: 'active' | 'used' | 'cancelled';
  purchasedAt: string;
  bannerImage: string;
}

export interface CreatorStats {
  totalRevenue: number;
  revenueTrend: number;
  ticketsSold: number;
  totalTickets: number;
  pageViews: string;
  pageViewsDelta: string;
  liveHosted: number;
}

export interface ActiveHostedEvent {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  rsvps: number;
  capacity: number;
  isLive: boolean;
  imageUrl: string;
  attendeesList: { name: string; tier: string; passId: string; status: string; initials: string }[];
}

export interface ToastNotification {
  id: string;
  message: string;
  icon?: string;
  isAccent?: boolean;
}
