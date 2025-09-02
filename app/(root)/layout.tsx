import Navbar from "../components/Navbar";
import SplashScreen from "../components/SplashScreen";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen />
      <Navbar />
      {children}
    </>
  );
}
