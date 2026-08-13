// pages/Welcome.jsx
import AuthLayout from "../components/Auth/AuthLayout";
import WelcomeCard from "../components/Auth/WelcomeCard";
import Navbar from "../components/home/Navbar";


export default function Welcome() {
  return (
    <>
    <Navbar />
    <AuthLayout>
      <WelcomeCard />
    </AuthLayout>
    </>
  );
}