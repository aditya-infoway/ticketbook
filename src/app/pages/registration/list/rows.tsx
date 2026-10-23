import { Getter } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Highlight } from "@/components/shared/Highlight";
import { ensureString } from "@/utils/ensureString";

export function TextCell({
  getValue,
  table,
}: {
  getValue: Getter<string>;
  table: { getState: () => { globalFilter?: string } };
}) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const value = getValue();

  return (
    <span className="dark:text-dark-100 whitespace-nowrap text-gray-800">
      <Highlight query={globalQuery}>{value || "—"}</Highlight>
    </span>
  );
}

export function DateCell({ getValue }: { getValue: Getter<string> }) {
  const value = getValue();

  if (!value) {
    return <span className="text-gray-400">—</span>;
  }

  return (
    <span className="dark:text-dark-100 whitespace-nowrap font-medium text-gray-800">
      {dayjs(value).format("DD MMM YYYY")}
    </span>
  );
}
