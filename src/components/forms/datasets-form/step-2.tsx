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
  useToast,
} from "@/components/ui";
import { datasetsForm2Schema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DevTool } from "@hookform/devtools";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { datasetsService } from "@/services";
import { DetailDatasetsResponse } from "@/lib/dto";

export const DatasetsFormStep2 = ({
  data,
  startDate,
  endDate,
}: {
  data: DetailDatasetsResponse;
  startDate: string;
  endDate: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const datasetsId = searchParams.get("datasetsId");

  const form = useForm<z.infer<typeof datasetsForm2Schema>>({
    // resolver: zodResolver(datasetsForm2Schema),
    defaultValues: {
      date: {
        startDate: undefined,
        endDate: undefined,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof datasetsForm2Schema>) {
    console.log(values.date);
    setLoading(true);

    try {
      toast({
        title: "Uploading.",
        description: "Please wait a moment..",
      });

      const form = new FormData();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      form.append("start_date_selected", values.date.startDate);
      form.append("end_date_selected", values.date.endDate);
      form.append("cave", data.cave.toString());
      form.append("type", data.type.toString());
      form.append("name", data.name);

      const res = await datasetsService.updateDatasets({
        form: form,
        token: token as string,
        id: datasetsId as string,
      });

      console.log(res, "res update");

      toast({
        title: "Datasets Update Success",
        description: "File has been updated.",
      });
      router.push(`/dashboard/datasets/`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
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
