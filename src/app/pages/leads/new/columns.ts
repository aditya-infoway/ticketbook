import { ColumnDef } from "@tanstack/react-table";

import {
  SelectCell,
  SelectHeader,
} from "@/components/shared/table/SelectCheckbox";
import { RowActions } from "./RowActions";
import { Lead } from "./data";
import { DateTimeCell, LeadStatusCell, TextCell } from "./rows";

export const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: SelectHeader,
    cell: SelectCell,
    enableSorting: false,
  },
  {
    id: "companyName",
    accessorKey: "companyName",
    header: "Company Name",
    cell: TextCell,
  },
  {
    id: "number",
    accessorKey: "number",
    header: "Number",
    cell: TextCell,
  },
  {
    id: "businessType",
    accessorKey: "businessType",
    header: "Business Type",
    cell: TextCell,
  },
  {
    id: "address",
    accessorKey: "address",
    header: "Address",
    cell: TextCell,
  },
  {
    id: "leadStatus",
    accessorKey: "leadStatus",
    header: "Lead Status",
    cell: LeadStatusCell,
  },
  {
    id: "requirement",
    accessorKey: "requirement",
    header: "Requirement",
    cell: TextCell,
  },
  {
    id: "demoSchedule",
    accessorFn: (row) => row.demoScheduleDate,
    header: "Demo Schedule",
    cell: DateTimeCell,
  },
  {
    id: "actions",
    header: "Actions",
    cell: RowActions,
  },
];
