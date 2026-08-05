// components/home/HeroImage.jsx
// components/home/HeroImage.jsx
export default function HeroImage() {
  return (
    <div className="relative w-full max-w-sm md:max-w-md mx-auto lg:mx-0 mb-8 lg:mb-0">
      <div className="bg-[#1C2B4A] rounded-3xl shadow-lg p-4">
        <div className="bg-[#243554] rounded-2xl aspect-[4/3]" />
      </div>

      <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 w-32 h-16 sm:w-48 sm:h-24 bg-[#F7F5F0] rounded-2xl shadow-xl" />
    </div>
  );
}