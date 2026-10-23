import { ColumnDef } from "@tanstack/react-table";

import { ExpiredRegistration } from "./data";
import { DateCell, TextCell } from "./rows";

export const columns: ColumnDef<ExpiredRegistration>[] = [
  {
    id: "companyName",
    accessorKey: "companyName",
    header: "Company Name",
    cell: TextCell,
  },
  {
    id: "contactNo",
    accessorKey: "contactNo",
    header: "Contact No.",
    cell: TextCell,
  },
  {
    id: "gmailId",
    accessorKey: "gmailId",
    header: "Gmail ID",
    cell: TextCell,
  },
  {
    id: "state",
    accessorKey: "state",
    header: "State",
    cell: TextCell,
  },
  {
    id: "city",
    accessorKey: "city",
    header: "City",
    cell: TextCell,
  },
  {
    id: "registrationDate",
    accessorKey: "registrationDate",
    header: "Registration Date",
    cell: DateCell,
  },
  {
    id: "expiredDate",
    accessorKey: "expiredDate",
    header: "Expired Date",
    cell: DateCell,
  },
];
