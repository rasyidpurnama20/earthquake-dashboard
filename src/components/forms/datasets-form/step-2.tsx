"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Skeleton,
} from "@/components/ui";
import { datasetsForm2Schema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DevTool } from "@hookform/devtools";

export const DatasetsFormStep2 = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof datasetsForm2Schema>>({
    resolver: zodResolver(datasetsForm2Schema),
    defaultValues: {
      date: {
        startDate: undefined,
        endDate: undefined,
      },
    },
  });

  function onSubmit(values: z.infer<typeof datasetsForm2Schema>) {
    console.log(values.date);
    setLoading(true);
    // router.push("/dashboard/datasets/add/3");
    setLoading(false);
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <div className="flex w-full rounded-md border">
                    {startDate && endDate ? (
                      <Datepicker
                        {...field}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        startFrom={new Date(startDate)}
                        minDate={new Date(startDate)}
                        maxDate={new Date(endDate)}
                        separator="to"
                      />
                    ) : (
                      <Skeleton className="h-10 w-full" />
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DevTool control={form.control} />

        <div className="flex space-x-2">
          {/* <Button
            loading={loading}
            size="sm"
            variant="outline"
            onClick={() => {
              router.push("/dashboard/datasets/add/1");
            }}
            type="button"
          >
            Back
          </Button> */}
          <Button size="sm" loading={loading} type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
