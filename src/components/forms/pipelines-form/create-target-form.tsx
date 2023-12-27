"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
} from "@/components/ui";

import { useForm } from "react-hook-form";
import type * as z from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authService, pipelinesService } from "@/services";
import { useSession } from "next-auth/react";
import { type pipelineCreateTargetFormSchema } from "@/lib/validations";
import Datepicker from "react-tailwindcss-datepicker";
import { useQuery } from "@tanstack/react-query";
import { IconLoader2 } from "@tabler/icons-react";

export const PipelineCreateTargetForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const router = useRouter();
  const { toast } = useToast();
  const { id } = useParams();
  const form = useForm<z.infer<typeof pipelineCreateTargetFormSchema>>({
    defaultValues: {
      date: undefined,
    },
  });

  const { data: detailPipeline } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelineById", token],
    queryFn: () =>
      pipelinesService.getPipelinesById({
        token: token as string,
        id: id as string,
      }),
  });

  const { data: userDetails } = useQuery({
    enabled: !!token,
    queryKey: ["getUserDetails", token],
    queryFn: () =>
      authService.getUserDetail({
        token: token as string,
      }),
  });

  async function onSubmit(
    values: z.infer<typeof pipelineCreateTargetFormSchema>,
  ) {
    setLoading(true);

    try {
      toast({
        title: "Creating.",
        description: "Please wait a moment..",
      });

      const form = new FormData();

      form.append("date", values.date.startDate);
      form.append("user", userDetails?.data.id.toString() as string);

      await pipelinesService.createPredictionTarget({
        id: id as string,
        form: form,
        token: token as string,
      });

      toast({
        title: "Create Success",
        description: "Prediction target has been created.",
      });
      router.push(`/dashboard/magnitude-prediction/${id as string}/target`);
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

  const originStartDate = new Date(
    detailPipeline?.data.c_.start_date as string,
  );
  const updatedStartDate = new Date(
    new Date(originStartDate.setDate(originStartDate.getDate() + 30)),
  );

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
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <div className="flex w-full rounded-md border">
                    <Datepicker
                      {...field}
                      useRange={false}
                      asSingle={true}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      startFrom={
                        new Date(detailPipeline?.data.c_.end_date as string)
                      }
                      minDate={updatedStartDate}
                      maxDate={
                        new Date(detailPipeline?.data.c_.end_date as string)
                      }
                    />
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
