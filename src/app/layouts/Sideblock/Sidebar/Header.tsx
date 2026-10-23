// Import Dependencies
import { Link } from "react-router";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { APP_FAVICON } from "@/constants/app";
import { Button } from "@/components/ui";
import { useSidebarContext } from "@/app/contexts/sidebar/context";

// ----------------------------------------------------------------------

export function Header() {
  const { close } = useSidebarContext();
  return (
    // Added relative positioning (already there) and kept padding
    <header className="relative flex h-[61px] shrink-0 items-center justify-between ltr:pl-6 ltr:pr-3 rtl:pl-3 rtl:pr-6">
      
      {/* Changed justify-start to justify-center and removed pt-3 for better vertical centering */}
      <div className="flex w-full items-center justify-center gap-4">
        <Link to="/">
          <img
            src={APP_FAVICON}
            alt="Autobook ERP"
            // Increased size from h-10 to h-14
            className="h-14 w-auto object-contain"
          />
        </Link>
      </div>
      
      {/* Added absolute positioning so it doesn't push the logo off-center on mobile */}
      <div className="absolute right-3 pt-0 xl:hidden">
        <Button
          onClick={close}
          variant="flat"
          isIcon
          className="size-6 rounded-full"
        >
          <ChevronLeftIcon className="size-5 rtl:rotate-180" />
        </Button>
      </div>
    </header>
  );
}