// // pages/Login.jsx
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import LoginForm from "../components/login/LoginForm";

// export default function Login() {
//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F5F0]">
//       {/* Left image panel — hidden on mobile */}
//       <div className="hidden lg:block lg:w-1/2 bg-[#8A93A6]" />

//       {/* Right form panel */}
//       <div className="w-full lg:w-1/2 flex flex-col px-6 md:px-16 py-10">
//         <Link to="/" className="flex items-center gap-2 text-sm text-[#121D33] mb-8 w-fit">
//           <span className="w-8 h-8 rounded-full border border-[#121D33]/20 flex items-center justify-center">
//             <ArrowLeft size={16} />
//           </span>
//           Back to Home
//         </Link>

//         <div className="flex-1 flex items-center justify-center">
//           <LoginForm />
//         </div>
//       </div>
//     </div>
//   );
// };
// pages/Login.jsx
import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import Navbar from "../components/home/Navbar";

export default function Login() {
  return (
    <>
    <Navbar />
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
    </>
     
  );
}