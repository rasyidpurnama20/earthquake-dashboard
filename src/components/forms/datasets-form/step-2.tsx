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
import { useForm } from "react-hook-form";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { authService, datasetsService } from "@/services";

import { type datasetsForm2Schema } from "@/lib/validations";
import type * as z from "zod";
import { type DetailDatasetsResponse } from "@/lib/dto";
import { useQuery } from "@tanstack/react-query";
import { IconLoader2 } from "@tabler/icons-react";

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
  const token = sessionData?.user?.accessToken;
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

  const { data: userDetails } = useQuery({
    enabled: !!token,
    queryKey: ["getUserDetails", token],
    queryFn: () =>
      authService.getUserDetail({
        token: token as string,
      }),
  });

  const date = form.getValues("date");

  async function onSubmit(values: z.infer<typeof datasetsForm2Schema>) {
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
      form.append("user", userDetails?.data.id.toString() as string);

      await datasetsService.updateDatasets({
        form: form,
        token: token as string,
        id: datasetsId as string,
      });

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

        <div className="flex space-x-2">
          <Button
            size="sm"
            type="submit"
            className="bg-brand-500"
            disabled={loading || (!date.endDate && !date.startDate)}
          >
            {loading && <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
