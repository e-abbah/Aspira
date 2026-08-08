import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

interface CircularProgressProps {
  percent?: number;
  size?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percent = 35,
  size = 64,
}) => {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={4}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E0A63C"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="600"
      >
        {percent}%
      </text>
    </svg>
  );
};

interface Task {
  id: number;
  label: string;
  done: boolean;
}

const todayTasks: Task[] = [
  { id: 1, label: 'Complete your Aspiria Compass™ Assessment', done: true },
  { id: 2, label: 'Review your personalized roadmap', done: true },
  { id: 3, label: 'Upload CV', done: false },
  { id: 4, label: 'Register for IELTS', done: false },
  { id: 5, label: 'Find scholarships for MPH Canada', done: false },
];

interface Opportunity {
  id: number;
  tag: string;
  match: string;
  title: string;
  subtitle: string;
  deadline: string;
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    tag: 'Scholarship',
    match: '94% match',
    title: 'Vanier Canada Graduate Scholarships',
    subtitle: 'Scholarship · $50,000/year',
    deadline: 'Deadline: Aug 15, 2025',
  },
  {
    id: 2,
    tag: 'Fellowship',
    match: '94% match',
    title: 'University of Alberta MPH Programme',
    subtitle: 'Graduate Programme · Full funding available',
    deadline: 'Deadline: Sep 1, 2025',
  },
  {
    id: 3,
    tag: 'Competition',
    match: '94% match',
    title: 'Commonwealth Scholarship',
    subtitle: 'Scholarship · Full tuition + living',
    deadline: 'Deadline: Sep 1, 2025',
  },
];

export interface DashboardPageProps {
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const completedCount = todayTasks.filter((t) => t.done).length;

  return (
    <DashboardLayout //activeItem="dashboard" //
    onLogout={onLogout}>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#121D33]">
          Good morning, Bryan 👋
        </h1>
        <p className="text-sm text-[#8A93A6] mt-1">Monday, 7 July 2025</p>
      </div>

      {/* Goal card */}
      <div className="bg-[#121D33] rounded-2xl p-6 mb-6 flex items-center gap-5">
        <CircularProgress percent={35} />
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wide text-[#E0A63C] font-semibold mb-1">
            Your Goal
          </p>
          <h2 className="text-white text-lg font-serif font-bold mb-1 truncate">
            MPH in Canada — Your Journey
          </h2>
          <p className="text-white/50 text-sm mb-3">
            Master of Public Health · University of Alberta · 2026 intake
          </p>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[#E0A63C] rounded-full" style={{ width: '35%' }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5">
          <div className="w-8 h-8 rounded-full bg-[#F7F5F0] mb-3" />
          <p className="text-2xl font-serif font-bold text-[#121D33]">
            {completedCount}/{todayTasks.length}
          </p>
          <p className="text-sm text-[#121D33] font-medium mt-1">Task Completed</p>
          <p className="text-xs text-[#8A93A6]">Today's plan</p>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="w-8 h-8 rounded-full bg-[#F7F5F0] mb-3" />
          <p className="text-2xl font-serif font-bold text-[#121D33]">2</p>
          <p className="text-sm text-[#121D33] font-medium mt-1">Mentorship session</p>
          <p className="text-xs text-[#8A93A6]">This month</p>
        </div>
      </div>

      {/* Today's tasks */}
      <div className="bg-white rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif font-bold text-[#121D33]">
            Today's Tasks
          </h3>
          <span className="text-xs font-medium text-[#8A93A6] bg-[#F7F5F0] px-2.5 py-1 rounded-full">
            {completedCount}/{todayTasks.length} done
          </span>
        </div>
        <ul className="space-y-3">
          {todayTasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3">
              {task.done ? (
                <CheckCircle2 className="w-5 h-5 text-[#E0A63C] shrink-0" strokeWidth={2} />
              ) : (
                <Circle className="w-5 h-5 text-[#8A93A6]/40 shrink-0" strokeWidth={2} />
              )}
              <span
                className={`text-sm ${
                  task.done ? 'text-[#8A93A6] line-through' : 'text-[#121D33]'
                }`}
              >
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming session */}
      <div className="bg-[#F0EEE8] rounded-2xl p-6 mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#8A93A6] font-semibold mb-3">
            Upcoming Session
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0A63C] flex items-center justify-center text-[#121D33] text-sm font-semibold">
              AO
            </div>
            <div>
              <p className="text-sm font-semibold text-[#121D33]">Dr. Amaka Osei</p>
              <p className="text-xs text-[#8A93A6]">Medicine & Life Sciences</p>
              <p className="text-xs text-[#8A93A6]">Tomorrow · 3:00 PM · 45 min</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="bg-[#121D33] hover:bg-[#1C2B4A] text-white text-sm font-medium rounded-lg px-5 py-2.5 transition-colors"
        >
          Join Session
        </button>
      </div>

      {/* Matched opportunities */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif font-bold text-[#121D33]">
            Matched Opportunities
          </h3>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-[#121D33] font-medium hover:text-[#E0A63C] transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map((op) => (
            <div key={op.id} className="bg-white rounded-2xl p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8A93A6] bg-[#F7F5F0] px-2 py-1 rounded-full">
                  {op.tag}
                </span>
                <span className="text-xs font-semibold text-[#121D33] bg-[#E0A63C]/20 px-2 py-1 rounded-full">
                  {op.match}
                </span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#121D33] mb-1 leading-snug">
                {op.title}
              </h4>
              <p className="text-xs text-[#8A93A6] mb-1">{op.subtitle}</p>
              <p className="text-xs text-[#8A93A6] mb-4">{op.deadline}</p>
              <button
                type="button"
                className="mt-auto w-full border border-[#121D33]/15 hover:bg-[#121D33] hover:text-white text-[#121D33] text-sm font-medium rounded-lg py-2.5 transition-colors"
              >
                View & Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Next step banner */}
      <div className="bg-[#121D33] rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#E0A63C] font-semibold mb-1">
            Next Step
          </p>
          <p className="text-white text-base font-serif font-bold">
            Draft your statement of purpose
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-white font-medium hover:text-[#E0A63C] transition-colors"
        >
          View My Journey <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;