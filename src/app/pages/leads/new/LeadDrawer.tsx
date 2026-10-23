import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Controller, useForm } from "react-hook-form";
import { Fragment } from "react";

import { DatePicker } from "@/components/shared/form/Datepicker";
import { Listbox } from "@/components/shared/form/StyledListbox";
import { Button, Input, Textarea } from "@/components/ui";
import { businessTypes } from "@/app/pages/registration/constants";
import { Lead, leadStatusOptions } from "./data";

interface LeadDrawerProps {
  isOpen: boolean;
  close: () => void;
  lead: Lead | null;
  onSave: (lead: Lead) => void;
}

export function LeadDrawer({ isOpen, close, lead, onSave }: LeadDrawerProps) {
  const isEdit = Boolean(lead?.id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Lead>({
    values: lead || undefined,
  });

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = (data: Lead) => {
    onSave({
      ...data,
      id: lead?.id || `lead-${Date.now()}`,
    });
    handleClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={handleClose}>
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/40"
        />

        <TransitionChild
          as={DialogPanel}
          enter="ease-out transform-gpu transition-transform duration-200"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in transform-gpu transition-transform duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-md transform-gpu flex-col bg-white transition-transform duration-200"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-dark-500 sm:px-5">
            <h3 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
              {isEdit ? "Edit Lead" : "Create Lead"}
            </h3>
            <Button
              onClick={handleClose}
              variant="flat"
              isIcon
              className="size-6 rounded-full"
            >
              <XMarkIcon className="size-4.5" />
            </Button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex grow flex-col overflow-hidden"
          >
            <div className="hide-scrollbar grow space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
              <Input
                {...register("companyName", { required: "Company name is required" })}
                label="Company Name"
                placeholder="Enter company name"
                error={errors.companyName?.message}
              />
              <Input
                {...register("number", { required: "Number is required" })}
                label="Number"
                type="tel"
                placeholder="Enter contact number"
                error={errors.number?.message}
              />
              <Controller
                control={control}
                name="businessType"
                rules={{ required: "Business type is required" }}
                render={({ field: { value, onChange, ...rest } }) => (
                  <Listbox
                    data={businessTypes}
                    value={businessTypes.find((item) => item.label === value) || null}
                    onChange={(item) => onChange(item.label)}
                    label="Business Type"
                    placeholder="Select business type"
                    displayField="label"
                    error={errors.businessType?.message}
                    {...rest}
                  />
                )}
              />
              <Textarea
                {...register("address", { required: "Address is required" })}
                label="Address"
                placeholder="Enter address"
                rows={3}
                error={errors.address?.message}
              />
              <Controller
                control={control}
                name="leadStatus"
                rules={{ required: "Lead status is required" }}
                render={({ field: { value, onChange, ...rest } }) => (
                  <Listbox
                    data={leadStatusOptions.map((item) => ({
                      id: item.value,
                      label: item.label,
                    }))}
                    value={
                      leadStatusOptions
                        .map((item) => ({ id: item.value, label: item.label }))
                        .find((item) => item.id === value) || null
                    }
                    onChange={(item) => onChange(item.id)}
                    label="Lead Status"
                    placeholder="Select lead status"
                    displayField="label"
                    error={errors.leadStatus?.message}
                    {...rest}
                  />
                )}
              />
              <Textarea
                {...register("requirement", { required: "Requirement is required" })}
                label="Requirement"
                placeholder="Enter requirement"
                rows={3}
                error={errors.requirement?.message}
              />
              <Controller
                control={control}
                name="demoScheduleDate"
                rules={{ required: "Demo schedule date is required" }}
                render={({ field: { value, onChange, ...rest } }) => (
                  <DatePicker
                    value={value || ""}
                    onChange={(_, dateStr) => onChange(dateStr)}
                    options={{ dateFormat: "Y-m-d" }}
                    label="Demo Schedule Date"
                    placeholder="Select date"
                    error={errors.demoScheduleDate?.message}
                    {...rest}
                  />
                )}
              />
             <Controller
  control={control}
  name="demoScheduleTime"
  rules={{ required: "Demo schedule time is required" }}
  render={({ field: { value, onChange, ...rest } }) => (
    <DatePicker
      value={value || ""}
      onChange={(_, dateStr) => onChange(dateStr)}
      options={{
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
      }}
      label="Demo Schedule Time"
      placeholder="Select time"
      error={errors.demoScheduleTime?.message}
      {...rest}
    />
  )}
/>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-4 py-4 dark:border-dark-500 sm:px-5">
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {isEdit ? "Update Lead" : "Add Lead"}
              </Button>
            </div>
          </form>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
