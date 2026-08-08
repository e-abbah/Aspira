import { Compass, ArrowRight } from 'lucide-react';

const WelcomeAssessmentCard = ({ userName = 'Alex', studentCount = '12,000' }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#F7F5F0] border border-[#121D33]/10 flex items-center justify-center">
          <Compass className="w-5 h-5 text-[#121D33]" strokeWidth={2} />
        </div>
        <span className="text-xl font-serif font-bold text-[#121D33]">
          Aspiria
        </span>
      </div>

      {/* Placeholder illustration */}
      <div className="w-full aspect-square bg-[#F7F5F0] rounded-xl mb-8" />

      {/* Heading */}
      <h1 className="text-2xl font-serif font-bold text-[#121D33] mb-1">
        Welcome to Aspiria, {userName}!
      </h1>
      <p className="text-base font-semibold text-[#121D33] mb-4">
        Your account has been successfully created
      </p>

      <p className="text-sm text-[#8A93A6] leading-relaxed mb-6">
        Unlock your personalized academic roadmap and discover the best
        path for your future. The Compass™ Assessment is the first step
        toward your success.
      </p>

      {/* Primary CTA */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-[#121D33] hover:bg-[#1C2B4A] text-white font-medium text-sm rounded-lg py-3 px-4 transition-colors"
      >
        Take the Aspiria Compass™ Assessment
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Skip link */}
      <div className="text-center mt-4 mb-8">
        <button
          type="button"
          className="text-sm text-[#121D33] underline underline-offset-2 hover:text-[#1C2B4A] transition-colors"
        >
          Skip assessment
        </button>
      </div>

      {/* Social proof */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex -space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#E0A63C] border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-[#8A93A6] border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-[#E0A63C] border-2 border-white" />
        </div>
        <p className="text-xs text-[#8A93A6]">
          Join over {studentCount} students finding their path today.
        </p>
      </div>
    </div>
  );
};

export default WelcomeAssessmentCard;