// Local Imports
import { Page } from "@/components/shared/Page";

// ----------------------------------------------------------------------

export default function TodaySchedule() {
  return (
    <Page title="Today's Schedule">
      <div className="transition-content px-(--margin-x) pb-8 pt-5 lg:pt-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-50">
          Today&apos;s Schedule
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-300">
          View today&apos;s scheduled leads and appointments.
        </p>
      </div>
    </Page>
  );
}
