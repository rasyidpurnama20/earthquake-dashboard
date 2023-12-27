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
import { type datasetsFormUpdateSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authService, datasetsService } from "@/services";
import { useSession } from "next-auth/react";
import {
  type ViewDatasetsResponse,
  type DetailDatasetsResponse,
} from "@/lib/dto";
import Datepicker from "react-tailwindcss-datepicker";
import { IconLoader2 } from "@tabler/icons-react";

type DatasetsFormUpdate2Props = {
  detailsData: DetailDatasetsResponse;
  previewData: ViewDatasetsResponse;
};

export const DatasetsFormUpdate2 = ({
  detailsData,
}: DatasetsFormUpdate2Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof datasetsFormUpdateSchema>>({
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

  async function onSubmit(values: z.infer<typeof datasetsFormUpdateSchema>) {
    setLoading(true);

    try {
      toast({
        title: "Uploading.",
        description: "Please wait a moment..",
      });

      const form = new FormData();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      form.append("name", detailsData.name);
      form.append("type", detailsData.type.toString());
      form.append("cave", detailsData.cave.toString());
      form.append("start_date_selected", values.date?.startDate as string);
      form.append("end_date_selected", values.date?.endDate as string);
      form.append("user", userDetails?.data.id.toString() as string);

      await datasetsService.updateDatasets({
        form: form,
        token: token as string,
        id: detailsData.id.toString(),
      });

      toast({
        title: "Update Success",
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

  const { data: dataRangeUpdate } = useQuery({
    enabled: !!token && !!id,
    queryKey: ["getRangeUpdateData", token, id],
    queryFn: () =>
      datasetsService.getRangeUpdateData({
        id: id as string,
        token: token as string,
      }),
  });

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
                    {dataRangeUpdate?.data?.start_date &&
                    dataRangeUpdate?.data?.end_date ? (
                      <Datepicker
                        {...field}
                        value={field.value as never}
                        onChange={(value) => field.onChange(value)}
                        startFrom={new Date(dataRangeUpdate?.data?.start_date)}
                        minDate={new Date(dataRangeUpdate?.data?.start_date)}
                        maxDate={new Date(dataRangeUpdate?.data?.end_date)}
                        separator="to"
                        disabled={false}
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

        <Button
          size="sm"
          type="submit"
          className="bg-brand-500"
          disabled={loading}
        >
          {loading && <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Next
        </Button>
      </form>
    </Form>
  );
};
