import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const dashboards: NavigationTree = {
  ...baseNavigationObj["dashboards"],
  type: "root",
  childs: [
    {
      id: "dashboards.home",
      type: "item",
      path: "/dashboards/home",
      title: "Home",
      transKey: "nav.dashboards.home",
      icon: "dashboards.home",
    },
  ],
};