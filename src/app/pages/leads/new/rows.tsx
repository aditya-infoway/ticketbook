import { Getter } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Badge } from "@/components/ui";
import { Highlight } from "@/components/shared/Highlight";
import { ensureString } from "@/utils/ensureString";
import { leadStatusOptions } from "./data";

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
    <span className="dark:text-dark-100 text-gray-800">
      <Highlight query={globalQuery}>{value}</Highlight>
    </span>
  );
}

export function LeadStatusCell({ getValue }: { getValue: Getter<string> }) {
  const status = leadStatusOptions.find((item) => item.value === getValue());

  return (
    <Badge color={status?.color || "neutral"} variant="soft">
      {status?.label || getValue()}
    </Badge>
  );
}

export function DateTimeCell({
  row,
}: {
  row: { original: { demoScheduleDate: string; demoScheduleTime: string } };
}) {
  const { demoScheduleDate, demoScheduleTime } = row.original;

  if (!demoScheduleDate) {
    return <span className="text-gray-400">—</span>;
  }

  return (
    <div>
      <p className="font-medium">
        {dayjs(demoScheduleDate).format("DD MMM YYYY")}
      </p>
      {demoScheduleTime && (
        <p className="dark:text-dark-300 mt-0.5 text-xs text-gray-400">
          {demoScheduleTime}
        </p>
      )}
    </div>
  );
}
