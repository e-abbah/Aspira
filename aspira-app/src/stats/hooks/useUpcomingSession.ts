import { useEffect, useState } from 'react';
import { UpcomingSession } from '../../types/mentor';
import { getUpcomingSession, joinSession } from '../services/mentorService';

export function useUpcomingSession() {
  const [session, setSession] = useState<UpcomingSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getUpcomingSession().then((data) => {
      if (!cancelled) {
        setSession(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleJoin = async () => {
    if (!session) return;
    const { meetingUrl } = await joinSession(session.id);
    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  return { session, isLoading, join: handleJoin };
}