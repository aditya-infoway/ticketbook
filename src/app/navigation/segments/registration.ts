import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const registration: NavigationTree = {
  ...baseNavigationObj["registration"],
  childs: [
    {
      id: "registration.new",
      type: "item",
      path: "/registration/new",
      title: "New Registration",
      transKey: "nav.registration.new",
      icon: "registration.new",
    },
    {
      id: "registration.expired",
      type: "item",
      path: "/registration/expired",
      title: "Expired Registrations",
      transKey: "nav.registration.expired",
      icon: "registration.expired",
    },
  ],
};
