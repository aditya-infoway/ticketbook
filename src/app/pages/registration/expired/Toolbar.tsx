import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui";
import { ExpiredRegistration } from "./data";

export function Toolbar({ table }: { table: Table<ExpiredRegistration> }) {
  return (
    <div className="table-toolbar px-(--margin-x) pt-4">
      <h2 className="dark:text-dark-50 text-xl font-medium tracking-wide text-gray-800">
        Expired Registrations
      </h2>

      <div className="mt-4 max-w-sm">
        <Input
          value={table.getState().globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          prefix={<MagnifyingGlassIcon className="size-4" />}
          classNames={{
            input: "ring-primary-500/50 h-9 text-sm focus:ring-3",
          }}
          placeholder="Search expired registrations..."
        />
      </div>
    </div>
  );
}
