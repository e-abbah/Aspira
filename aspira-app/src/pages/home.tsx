// pages/Home.jsx
import Hero from "../components/home/hero";
import HeroImage from "../components/home/heroImage";
// import Features from "../components/home/Features";       (later)
// import HowItWorks from "../components/home/HowItWorks";   (later)
// import Mentors from "../components/home/Mentors";         (later)

// export default function Home() {
//   return (
//     <div className="bg-[#121D33] min-h-screen">
//       <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-10 py-12 md:py-20 gap-5 lg:gap-5">
//         <Hero />
//         <HeroImage />
//       </div>

//       {/* <Features /> */}
//       {/* <HowItWorks /> */}
//       {/* <Mentors /> */}
//     </div>
//   );
// }
// pages/Home.jsx
export default function Home() {
  return (
    <div className="bg-[#121D33] min-h-screen">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center px-4 md:px-10 pt-16 md:pt-20 pb-12 md:pb-20 gap-5">
        <Hero />
        <HeroImage />
      </div>

      {/* <Features /> */}
      {/* <HowItWorks /> */}
      {/* <Mentors /> */}
    </div>
  );
}
// pages/Home.jsx
// export default function Home() {
//   return (
//     <div className="bg-[#121D33] min-h-screen">
//       <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center px-4 md:px-10 pt-16 md:pt-20 pb-12 md:pb-20 gap-5">
//         <Hero />
//         <HeroImage />
//       </div>

//       {/* <Features /> */}
//       {/* <HowItWorks /> */}
//       {/* <Mentors /> */}
//     </div>
//   );
// }