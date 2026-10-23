import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const leads: NavigationTree = {
  ...baseNavigationObj["leads"],
  childs: [
    {
      id: "leads.new",
      type: "item",
      path: "/leads/new",
      title: "New Lead",
      transKey: "nav.leads.new",
      icon: "leads.new",
    },
    {
      id: "leads.todaySchedule",
      type: "item",
      path: "/leads/today-schedule",
      title: "Today's Schedule",
      transKey: "nav.leads.todaySchedule",
      icon: "leads.todaySchedule",
    },
    {
      id: "leads.followUp",
      type: "item",
      path: "/leads/follow-up",
      title: "Follow-up",
      transKey: "nav.leads.followUp",
      icon: "leads.followUp",
    },
  ],
};
