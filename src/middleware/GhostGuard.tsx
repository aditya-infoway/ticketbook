// Import Dependencies
import { Navigate, useOutlet } from "react-router";

// Local Imports
import { useAuthContext } from "@/app/contexts/auth/context";
import { HOME_PATH, REDIRECT_URL_KEY } from "@/constants/app";
import { SplashScreen } from "@/components/template/SplashScreen";

// ----------------------------------------------------------------------

export default function GhostGuard() {
  const outlet = useOutlet();
  const { isAuthenticated, isInitialized } = useAuthContext();

  // ✅ Fix: template literal se pehle hi null check, string "null" banne se bachao
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get(REDIRECT_URL_KEY);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    if (redirectUrl) {
      return <Navigate to={redirectUrl} />;
    }
    return <Navigate to={HOME_PATH} />;
  }

  return <>{outlet}</>;
}