import { useEffect, useReducer, ReactNode } from "react";

import { Post, toastsuccessmsg, toasterrormsg } from "@/ApiHelper";
import { AuthProvider as AuthContext, AuthContextType } from "./context";
import { User } from "@/@types/user";

interface AuthAction {
  type:
    | "INITIALIZE"
    | "LOGIN_REQUEST"
    | "LOGIN_SUCCESS"
    | "LOGIN_ERROR"
    | "LOGOUT"
    | "OTP_SUCCESS"
    | "OTP_ERROR";
  payload?: Partial<AuthContextType>;
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
  pendingToken: null,
  pendingEmail: null,
  login: async () => {},
  logout: async () => {},
  verifyOtp: async () => {},
  resendOtp: async () => {},
};

const reducerHandlers: Record<
  AuthAction["type"],
  (state: AuthContextType, action: AuthAction) => AuthContextType
> = {
  INITIALIZE: (state, action) => ({
    ...state,
    isAuthenticated: action.payload?.isAuthenticated ?? false,
    isInitialized: true,
    user: action.payload?.user ?? null,
  }),
  LOGIN_REQUEST: (state) => ({ ...state, isLoading: true, errorMessage: null }),
  LOGIN_SUCCESS: (state, action) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    errorMessage: null,
    pendingToken: action.payload?.pendingToken ?? null,
    pendingEmail: action.payload?.pendingEmail ?? null,
  }),
  LOGIN_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload?.errorMessage ?? "An error occurred",
    isLoading: false,
  }),
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    pendingToken: null,
    pendingEmail: null,
  }),
  OTP_SUCCESS: (state, action) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    errorMessage: null,
    user: action.payload?.user ?? null,
    pendingToken: null,
  }),
  OTP_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload?.errorMessage ?? "Invalid OTP",
    isLoading: false,
  }),
};

const reducer = (state: AuthContextType, action: AuthAction): AuthContextType => {
  const handler = reducerHandlers[action.type];
  return handler ? handler(state, action) : state;
};

const PENDING_TOKEN_KEY = "pendingToken";
const PENDING_EMAIL_KEY = "pendingEmail";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Refresh / naya tab: localStorage se session restore.
  // Token ki asli validity server check karega (403 -> ApiHelper Logout).
  useEffect(() => {
    try {
      const authToken = window.localStorage.getItem("authToken");
      const userStr = window.localStorage.getItem("user");

      if (authToken && userStr) {
        window.sessionStorage.setItem("authToken", authToken);
        window.sessionStorage.setItem("user", userStr);
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: true, user: JSON.parse(userStr) },
        });
      } else {
        dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null } });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false, user: null } });
    }
  }, []);

  // STEP 1
  const login = async (credentials: { username: string; password: string }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await Post(
        "master/login",
        { email: credentials.username, password: credentials.password },
        false,
      );
      const result = response.data;

      if (result.status !== 200) {
        throw new Error(result.message || "Login failed");
      }

      const token = result.data.token; // pending otpToken
      const email = result.data.email;

      window.sessionStorage.setItem(PENDING_TOKEN_KEY, token);
      window.sessionStorage.setItem(PENDING_EMAIL_KEY, email);

      toastsuccessmsg(result.message);
      dispatch({ type: "LOGIN_SUCCESS", payload: { pendingToken: token, pendingEmail: email } });
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || "Login failed";
      toasterrormsg(message);
      dispatch({ type: "LOGIN_ERROR", payload: { errorMessage: message } });
      throw err;
    }
  };

  // STEP 2
  const verifyOtp = async (otp: string) => {
    const token = state.pendingToken || window.sessionStorage.getItem(PENDING_TOKEN_KEY);

    if (!token) {
      const message = "Session expired. Please login again.";
      dispatch({ type: "OTP_ERROR", payload: { errorMessage: message } });
      throw new Error(message);
    }

    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await Post("master/otp-verification", { token, otp }, false);
      const result = response.data;

      if (result.status !== 200) {
        throw new Error(result.message || "Invalid OTP");
      }

      const user = result.data as User & { token: string };

      // user.token ab naya session token hai
      window.localStorage.setItem("authToken", user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
      window.sessionStorage.setItem("authToken", user.token);
      window.sessionStorage.setItem("user", JSON.stringify(user));
      window.sessionStorage.removeItem(PENDING_TOKEN_KEY);
      window.sessionStorage.removeItem(PENDING_EMAIL_KEY);

      toastsuccessmsg(result.message);
      dispatch({ type: "OTP_SUCCESS", payload: { user } });
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || "OTP verification failed";
      toasterrormsg(message);
      dispatch({ type: "OTP_ERROR", payload: { errorMessage: message } });
      throw err;
    }
  };

  const resendOtp = async () => {
    const token = state.pendingToken || window.sessionStorage.getItem(PENDING_TOKEN_KEY);

    if (!token) {
      toasterrormsg("Session expired. Please login again.");
      return;
    }

    try {
      const response = await Post("master/resend-otp", { token }, false);
      const result = response.data;

      if (result.status !== 200) {
        throw new Error(result.message || "Failed to resend OTP");
      }

      toastsuccessmsg(result.message || "OTP resent successfully");
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || "Failed to resend OTP";
      toasterrormsg(message);
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("user");
    window.sessionStorage.removeItem("authToken");
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("admin");
    window.sessionStorage.removeItem(PENDING_TOKEN_KEY);
    window.sessionStorage.removeItem(PENDING_EMAIL_KEY);
    dispatch({ type: "LOGOUT" });
  };

  if (!children) {
    return null;
  }

  return (
    <AuthContext value={{ ...state, login, logout, verifyOtp, resendOtp }}>
      {children}
    </AuthContext>
  );
}