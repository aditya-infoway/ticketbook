import { ColorType } from "@/constants/app";

export interface Lead {
  id: string;
  companyName: string;
  number: string;
  businessType: string;
  address: string;
  leadStatus: string;
  requirement: string;
  demoScheduleDate: string;
  demoScheduleTime: string;
}

export const leadStatusOptions: {
  value: string;
  label: string;
  color: ColorType;
}[] = [
  { value: "new", label: "New", color: "info" },
  { value: "contacted", label: "Contacted", color: "warning" },
  { value: "qualified", label: "Qualified", color: "primary" },
  { value: "demo-scheduled", label: "Demo Scheduled", color: "success" },
  { value: "won", label: "Won", color: "success" },
  { value: "lost", label: "Lost", color: "error" },
];

export const initialLeads: Lead[] = [
  {
    id: "lead-1",
    companyName: "Amaar Industries",
    number: "9876543210",
    businessType: "Manufacturing",
    address: "Pune, Maharashtra",
    leadStatus: "demo-scheduled",
    requirement: "ERP for production planning",
    demoScheduleDate: "2026-06-15",
    demoScheduleTime: "10:30",
  },
  {
    id: "lead-2",
    companyName: "Bright Retail Hub",
    number: "9123456780",
    businessType: "Retail",
    address: "Ahmedabad, Gujarat",
    leadStatus: "contacted",
    requirement: "Inventory and billing module",
    demoScheduleDate: "2026-06-18",
    demoScheduleTime: "14:00",
  },
  {
    id: "lead-3",
    companyName: "Nova Tech Solutions",
    number: "9988776655",
    businessType: "Technology",
    address: "Bengaluru, Karnataka",
    leadStatus: "new",
    requirement: "Lead and CRM integration",
    demoScheduleDate: "2026-06-20",
    demoScheduleTime: "11:00",
  },
];

export const emptyLead = (): Lead => ({
  id: "",
  companyName: "",
  number: "",
  businessType: "",
  address: "",
  leadStatus: "new",
  requirement: "",
  demoScheduleDate: "",
  demoScheduleTime: "",
});
