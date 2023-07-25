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
import { datasetsFormUpdateSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { datasetsService } from "@/services";
import { useSession } from "next-auth/react";
import {
  type ViewDatasetsResponse,
  type DetailDatasetsResponse,
} from "@/lib/dto";
import Datepicker from "react-tailwindcss-datepicker";

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
  const { toast } = useToast();
  const form = useForm<z.infer<typeof datasetsFormUpdateSchema>>({
    resolver: zodResolver(datasetsFormUpdateSchema),
    defaultValues: {
      file: undefined,
      date: {
        startDate: detailsData?.start_date,
        endDate: detailsData?.end_date,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof datasetsFormUpdateSchema>) {
    setLoading(true);

    try {
      toast({
        title: "Uploading.",
        description: "Please wait a moment..",
      });

      const form = new FormData();
      console.log(values.file);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      form.append("name", detailsData.name);
      form.append("type", detailsData.type.toString());
      form.append("cave", detailsData.cave.toString());
      form.append("start_date_selected", values.date?.startDate as string);
      form.append("end_date_selected", values.date?.endDate as string);

      const res = await datasetsService.updateDatasets({
        form: form,
        token: token as string,
        id: detailsData.id.toString(),
      });

      toast({
        title: "Update Success",
        description: "File has been updateed.",
      });
      router.push(`/dashboard/datasets/add/2?datasetsId=${res.data.id}`);
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
                    {detailsData?.start_date && detailsData?.end_date ? (
                      <Datepicker
                        {...field}
                        value={field.value as never}
                        onChange={(value) => field.onChange(value)}
                        startFrom={new Date(detailsData?.start_date)}
                        minDate={new Date(detailsData?.start_date)}
                        maxDate={new Date(detailsData?.end_date)}
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

        <Button loading={loading} size="sm" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
};
