import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";

import { Button, Input } from "@/components/ui";
import { Lead } from "./data";

export function Toolbar({
  table,
  onCreateLead,
}: {
  table: Table<Lead>;
  onCreateLead: () => void;
}) {
  return (
    <div className="table-toolbar px-(--margin-x) pt-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="dark:text-dark-50 text-xl font-medium tracking-wide text-gray-800">
          New Lead
        </h2>
        <Button
          color="primary"
          className="h-9 gap-2 rounded-md px-4 text-sm"
          onClick={onCreateLead}
        >
          <PlusIcon className="size-4" />
          <span>Create Lead</span>
        </Button>
      </div>

      <div className="mt-4 max-w-sm">
        <Input
          value={table.getState().globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          prefix={<MagnifyingGlassIcon className="size-4" />}
          classNames={{
            input: "ring-primary-500/50 h-9 text-sm focus:ring-3",
          }}
          placeholder="Search leads..."
        />
      </div>
    </div>
  );
}
