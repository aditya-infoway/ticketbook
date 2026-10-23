import { ColumnDef } from "@tanstack/react-table";

import {
  SelectCell,
  SelectHeader,
} from "@/components/shared/table/SelectCheckbox";
import { Registration } from "./data";
import { DateCell, TextCell } from "./rows";
import { RowActions } from "./RowActions";

export const columns: ColumnDef<Registration>[] = [
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
    id: "companyAddress",
    accessorKey: "companyAddress",
    header: "Address",
    cell: TextCell,
  },
  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    header: "Contact No.",
    cell: TextCell,
  },
  {
    id: "ownerName",
    accessorKey: "ownerName",
    header: "Owner Name",
    cell: TextCell,
  },
  {
    id: "ownerContactNumber",
    accessorKey: "ownerContactNumber",
    header: "Owner Contact",
    cell: TextCell,
  },
  {
    id: "ownerEmail",
    accessorKey: "ownerEmail",
    header: "Owner Email",
    cell: TextCell,
  },
  {
    id: "country",
    accessorKey: "country",
    header: "Country",
    cell: TextCell,
  },
  {
    id: "state",
    accessorKey: "state",
    header: "State",
    cell: TextCell,
  },
  {
    id: "district",
    accessorKey: "district",
    header: "District",
    cell: TextCell,
  },
  {
    id: "taluka",
    accessorKey: "taluka",
    header: "Taluka",
    cell: TextCell,
  },
  {
    id: "registrationDate",
    accessorKey: "registrationDate",
    header: "Registration Date",
    cell: DateCell,
  },
  {
    id: "expiryDate",
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: DateCell,
  },
  {
    id: "businessType",
    accessorKey: "businessType",
    header: "Business Type",
    cell: TextCell,
  },
  {
    id: "employeeSize",
    accessorKey: "employeeSize",
    header: "Employee Size",
    cell: TextCell,
  },
  {
    id: "companyEmail",
    accessorKey: "companyEmail",
    header: "Company Email",
    cell: TextCell,
  },
  {
    id: "actions",
    header: "Actions",
    cell: RowActions,
    enableSorting: false,
  },
];
