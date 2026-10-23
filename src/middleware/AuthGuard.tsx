// Import Dependencies
import { Navigate, useLocation, useOutlet } from "react-router";

// Local Imports
import { useAuthContext } from "@/app/contexts/auth/context";
import { GHOST_ENTRY_PATH, REDIRECT_URL_KEY } from "@/constants/app";
import { SplashScreen } from "@/components/template/SplashScreen"; // apna actual loader component daalo

// ----------------------------------------------------------------------

export default function AuthGuard() {
  const outlet = useOutlet();
  const { isAuthenticated, isInitialized } = useAuthContext();
  const location = useLocation();

  // Jab tak init() complete nahi hota (token check ho raha hai), kuch decide mat karo
  if (!isInitialized) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`${GHOST_ENTRY_PATH}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  return <>{outlet}</>;
}