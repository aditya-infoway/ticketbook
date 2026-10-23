import { Navigate, RouteObject } from "react-router";

import AuthGuard from "@/middleware/AuthGuard";
import { DynamicLayout } from "../layouts/DynamicLayout";
import { AppLayout } from "../layouts/AppLayout";

/**
 * Protected routes configuration
 * These routes require authentication to access
 * Uses AuthGuard middleware to verify user authentication
 */
const protectedRoutes: RouteObject = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards/home" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/home/crm-analytics")
                ).default,
              }),
            },
          ],
        },
        {
          path: "registration",
          children: [
            {
              index: true,
              element: <Navigate to="/registration/new" replace />,
            },
            {
              path: "new",
              lazy: async () => ({
                Component: (await import("@/app/pages/registration/list"))
                  .default,
              }),
            },
            {
              path: "create",
              lazy: async () => ({
                Component: (await import("@/app/pages/registration/create"))
                  .default,
              }),
            },
            {
              path: "expired",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/registration/expired")
                ).default,
              }),
            },
          ],
        },
        {
          path: "leads",
          children: [
            {
              index: true,
              element: <Navigate to="/leads/new" replace />,
            },
            {
              path: "new",
              lazy: async () => ({
                Component: (await import("@/app/pages/leads/new")).default,
              }),
            },
            {
              path: "today-schedule",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/leads/today-schedule")
                ).default,
              }),
            },
            {
              path: "follow-up",
              lazy: async () => ({
                Component: (await import("@/app/pages/leads/follow-up")).default,
              }),
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("@/app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/General")
                ).default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
