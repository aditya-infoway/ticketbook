import { TbPalette, TbUsers } from "react-icons/tb";
import {
  ArrowLeftStartOnRectangleIcon,
  CalendarDaysIcon,
  ClockIcon,
  DocumentPlusIcon,
  HomeIcon,
  PhoneArrowUpRightIcon,
  UserIcon as HiUserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { ElementType } from "react";

import DashboardsIcon from "@/assets/dualicons/dashboards.svg?react";
import FormsIcon from "@/assets/dualicons/forms.svg?react";
import SettingIcon from "@/assets/dualicons/setting.svg?react";

export const navigationIcons: Record<string, ElementType> = {
  dashboards: DashboardsIcon,
  registration: FormsIcon,
  leads: TbUsers,
  logout: ArrowLeftStartOnRectangleIcon,
  "dashboards.home": HomeIcon,
  "registration.new": DocumentPlusIcon,
  "registration.expired": ClockIcon,
  "leads.new": UserPlusIcon,
  "leads.todaySchedule": CalendarDaysIcon,
  "leads.followUp": PhoneArrowUpRightIcon,
  settings: SettingIcon,
  "settings.general": HiUserIcon,
  "settings.appearance": TbPalette,
};
