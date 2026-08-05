// components/home/Hero.jsx
import { ArrowRight } from "lucide-react";

// components/home/Hero.jsx
export default function Hero() {
  return (
    <div className="max-w-lg text-center lg:text-left">
      <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-[#F7F5F0]">
        From Aspiration to Achievements
      </h1>
      <p className="text-[#8A93A6] mb-8 text-sm md:text-base">
         Lorem ipsum dolor sit amet consectetur. Enim nisi nibh cursus dictumst
        ornare lectus tellus consequat. Lorem ipsum dolor sit amet consectetur.
        Enim nisi nibh cursus dictumst ornare lectus tellus consequat.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#E0A63C] text-[#121D33] text-sm font-semibold">
          Take the Aspira Compass <ArrowRight size={16} />
        </button>
        <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#1C2B4A] text-[#F7F5F0] text-sm font-medium">
          View Success Stories
        </button>
      </div>
    </div>
  );
}