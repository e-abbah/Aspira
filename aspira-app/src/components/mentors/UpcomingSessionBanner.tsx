import { Calendar, Clock, Video } from 'lucide-react';
import { UpcomingSession } from '../../types/mentor';
import { formatSessionTime } from '../../stats/utils/date';

interface UpcomingSessionBannerProps {
  session: UpcomingSession;
  onJoin: () => void;
}

export function UpcomingSessionBanner({ session, onJoin }: UpcomingSessionBannerProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[#121D33] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 shrink-0 rounded-full bg-white/10" />
        <div>
          <p className="text-xs font-medium text-[#E0A63C]">Upcoming Session</p>
          <h3 className="text-base font-semibold">{session.mentorName}</h3>
          <p className="text-sm text-white/60">{session.mentorTitle}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatSessionTime(session.scheduledFor)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {session.durationMinutes} mins
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onJoin}
        className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-[#121D33] hover:bg-white/90"
      >
        <Video className="h-4 w-4" />
        Join
      </button>
    </div>
  );
}