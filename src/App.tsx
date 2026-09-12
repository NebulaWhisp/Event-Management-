import React, { useState } from 'react';
import { ScreenType, EventItem, TicketPass, ActiveHostedEvent, ToastNotification } from './types';
import { INITIAL_EVENTS, INITIAL_USER_TICKETS, INITIAL_HOSTED_EVENTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreScreen } from './components/ExploreScreen';
import { EventsScreen } from './components/EventsScreen';
import { EventDetailScreen } from './components/EventDetailScreen';
import { CreatorStudioScreen } from './components/CreatorStudioScreen';
import { TicketsScreen } from './components/TicketsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ToastContainer } from './components/Toast';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('explore');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [openBookingImmediately, setOpenBookingImmediately] = useState(false);

  // Core persisted mock states
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['subterranean', 'prism']);
  const [userTickets, setUserTickets] = useState<TicketPass[]>(INITIAL_USER_TICKETS);
  const [hostedEvents, setHostedEvents] = useState<ActiveHostedEvent[]>(INITIAL_HOSTED_EVENTS);

  // Global settings
  const [selectedCity, setSelectedCity] = useState('SF Bay Area');
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Toast helper
  const showToast = (message: string, icon?: string, isAccent?: boolean) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, icon, isAccent }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Event selection -> goes to detail screen
  const handleSelectEvent = (event: EventItem, openBooking = false) => {
    setSelectedEvent(event);
    setOpenBookingImmediately(openBooking);
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEventById = (eventId: string) => {
    const found = events.find((e) => e.id === eventId);
    if (found) {
      handleSelectEvent(found);
    } else {
      showToast('Event not found in live cache', 'error', true);
    }
  };

  // Toggle bookmark / saved event
  const handleToggleSave = (eventId: string) => {
    setSavedEventIds((prev) => {
      const exists = prev.includes(eventId);
      const next = exists ? prev.filter((id) => id !== eventId) : [...prev, eventId];
      showToast(
        exists ? 'Removed from saved vibes' : 'Saved to your vibes! 💜',
        exists ? 'bookmark_remove' : 'bookmark_added'
      );
      return next;
    });
  };

  // Add booked pass
  const handleBookSuccess = (newPass: TicketPass) => {
    setUserTickets((prev) => [newPass, ...prev]);
  };

  // Hosted events management
  const handleAddHostedEvent = (newEvent: ActiveHostedEvent) => {
    setHostedEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateHostedEvent = (updated: ActiveHostedEvent) => {
    setHostedEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleDeleteHostedEvent = (id: string) => {
    setHostedEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#14121e] text-[#e6e0f2] flex flex-col font-sans selection:bg-[#d2bbff] selection:text-[#3f008e] relative overflow-x-hidden">
      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Top Header (Adapts when viewing Detail Screen) */}
      <Header
        currentScreen={currentScreen}
        selectedCity={selectedCity}
        onCityChange={(city) => {
          setSelectedCity(city);
          showToast(`Switched radar location to ${city}`, 'location_on');
        }}
        unreadCount={unreadNotifications}
        onClearNotifications={() => setUnreadNotifications(0)}
        onNavigate={setCurrentScreen}
        onBack={() => {
          setCurrentScreen('explore');
          setOpenBookingImmediately(false);
        }}
        detailTitle={selectedEvent?.title}
        onShowToast={showToast}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {currentScreen === 'explore' && (
          <ExploreScreen
            events={events}
            onSelectEvent={(evt) => handleSelectEvent(evt, false)}
            onNavigate={setCurrentScreen}
            savedEventIds={savedEventIds}
            onToggleSave={handleToggleSave}
            onShowToast={showToast}
            onQuickBook={(evt) => handleSelectEvent(evt, true)}
          />
        )}

        {currentScreen === 'events' && (
          <EventsScreen
            events={events}
            onSelectEvent={(evt) => handleSelectEvent(evt, false)}
            savedEventIds={savedEventIds}
            onToggleSave={handleToggleSave}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'detail' && selectedEvent && (
          <EventDetailScreen
            event={selectedEvent}
            onBack={() => {
              setCurrentScreen('explore');
              setOpenBookingImmediately(false);
            }}
            isSaved={savedEventIds.includes(selectedEvent.id)}
            onToggleSave={handleToggleSave}
            onBookSuccess={handleBookSuccess}
            onShowToast={showToast}
            initialOpenBooking={openBookingImmediately}
          />
        )}

        {currentScreen === 'create' && (
          <CreatorStudioScreen
            hostedEvents={hostedEvents}
            onAddHostedEvent={handleAddHostedEvent}
            onUpdateHostedEvent={handleUpdateHostedEvent}
            onDeleteHostedEvent={handleDeleteHostedEvent}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'tickets' && (
          <TicketsScreen
            tickets={userTickets}
            onSelectEventById={handleSelectEventById}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            events={events}
            savedEventIds={savedEventIds}
            onSelectEvent={(evt) => handleSelectEvent(evt, false)}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Hidden when on Detail Screen) */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        ticketsCount={userTickets.length}
      />
    </div>
  );
}

export default App;
