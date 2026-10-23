import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState } from "react";

import { Page } from "@/components/shared/Page";
import { PaginationSection } from "@/components/shared/table/PaginationSection";
import { SelectedRowsActions } from "@/components/shared/table/SelectedRowsActions";
import { TableSortIcon } from "@/components/shared/table/TableSortIcon";
import { Card, Table, TBody, Td, Th, THead, Tr } from "@/components/ui";
import { useThemeContext } from "@/app/contexts/theme/context";
import { fuzzyFilter } from "@/utils/react-table/fuzzyFilter";
import { columns } from "./columns";
import { emptyLead, initialLeads, Lead } from "./data";
import { LeadDrawer } from "./LeadDrawer";
import { Toolbar } from "./Toolbar";

export default function NewLead() {
  const { cardSkin } = useThemeContext();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const openCreateDrawer = () => {
    setEditingLead(emptyLead());
    setDrawerOpen(true);
  };

  const openEditDrawer = (lead: Lead) => {
    setEditingLead(lead);
    setDrawerOpen(true);
  };

  const handleSaveLead = (lead: Lead) => {
    setLeads((prev) => {
      const exists = prev.some((item) => item.id === lead.id);
      if (exists) {
        return prev.map((item) => (item.id === lead.id ? lead : item));
      }
      return [lead, ...prev];
    });
  };

  const table = useReactTable({
    data: leads,
    columns,
    state: { globalFilter, sorting, rowSelection },
    enableRowSelection: true,
    enableMultiRowSelection: true,
    getRowId: (row) => row.id,
    meta: {
      openEditDrawer,
      deleteRow: (row) => {
        setLeads((prev) => prev.filter((item) => item.id !== row.original.id));
      },
      deleteRows: (rows) => {
        const selectedIds = new Set(rows.map((row) => row.original.id));
        setLeads((prev) => prev.filter((item) => !selectedIds.has(item.id)));
        setRowSelection({});
      },
    },
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Page title="New Lead">
      <div className="transition-content w-full pb-5">
        <Toolbar table={table} onCreateLead={openCreateDrawer} />

        <div className="px-(--margin-x) pt-4">
          <Card className="relative overflow-hidden">
            <SelectedRowsActions table={table} />
            <div className="table-wrapper min-w-full overflow-x-auto">
              <Table hoverable className="w-full text-left rtl:text-right">
                <THead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <Th
                          key={header.id}
                          className="dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg"
                        >
                          {header.column.getCanSort() ? (
                            <div
                              className="flex cursor-pointer items-center gap-3 select-none"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </span>
                              <TableSortIcon
                                sorted={header.column.getIsSorted()}
                              />
                            </div>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </THead>
                <TBody>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <Tr
                        key={row.id}
                        className={clsx(
                          "dark:border-b-dark-500 border-b border-gray-200",
                          row.getIsSelected() &&
                            "bg-primary-500/5 dark:bg-primary-500/10",
                        )}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <Td
                            key={cell.id}
                            className={clsx(
                              "bg-white",
                              cardSkin === "shadow"
                                ? "dark:bg-dark-700"
                                : "dark:bg-dark-900",
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Td>
                        ))}
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td
                        colSpan={columns.length}
                        className="py-10 text-center text-gray-500"
                      >
                        No leads found. Click Create Lead to add one.
                      </Td>
                    </Tr>
                  )}
                </TBody>
              </Table>
            </div>

            {table.getRowModel().rows.length > 0 && (
              <div className="px-4 pb-4 pt-4 sm:px-5">
                <PaginationSection table={table} />
              </div>
            )}
          </Card>
        </div>
      </div>

      <LeadDrawer
        isOpen={drawerOpen}
        close={() => setDrawerOpen(false)}
        lead={editingLead}
        onSave={handleSaveLead}
      />
    </Page>
  );
}
