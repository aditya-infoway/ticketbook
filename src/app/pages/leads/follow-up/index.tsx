// Local Imports
import { Page } from "@/components/shared/Page";

// ----------------------------------------------------------------------

export default function FollowUp() {
  return (
    <Page title="Follow-up">
      <div className="transition-content px-(--margin-x) pb-8 pt-5 lg:pt-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-50">
          Follow-up
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-300">
          Manage lead follow-ups from this page.
        </p>
      </div>
    </Page>
  );
}
