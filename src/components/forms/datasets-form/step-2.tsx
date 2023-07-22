"use client";

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { datasetsForm2Schema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import { datasetsFormState } from "@/store/datasets-form-store";
import { useRouter } from "next/navigation";
import { cn, formatDate } from "@/utils";
import { IconCalendar } from "@tabler/icons-react";

export const DatasetsFormStep2 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof datasetsForm2Schema>>({
    resolver: zodResolver(datasetsForm2Schema),
    defaultValues: {
      selectedStartDate: datasetsFormState.data.selectedStartDate.get(),
      selectedEndDate: datasetsFormState.data.selectedEndDate.get(),
    },
  });

  function onSubmit(values: z.infer<typeof datasetsForm2Schema>) {
    setLoading(true);
    router.push("/dashboard/datasets/add/3");
    datasetsFormState.step.set(3);
    datasetsFormState.data.set({
      ...datasetsFormState.data.get(),
      selectedStartDate: values.selectedStartDate,
      selectedEndDate: values.selectedEndDate,
    });
    console.log(datasetsFormState.data.get());
    setLoading(false);
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="selectedStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value as unknown as string)
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selectedEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value as unknown as string)
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-2">
          <Button
            loading={loading}
            size="sm"
            variant="outline"
            onClick={() => {
              router.push("/dashboard/datasets/add/1");
              datasetsFormState.step.set(1);
            }}
            type="button"
          >
            Back
          </Button>
          <Button size="sm" loading={loading} type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
