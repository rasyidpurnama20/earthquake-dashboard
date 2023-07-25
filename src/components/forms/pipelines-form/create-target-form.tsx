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
import { pipelinesService } from "@/services";
import { useSession } from "next-auth/react";
import { type pipelineCreateTargetFormSchema } from "@/lib/validations";
import Datepicker from "react-tailwindcss-datepicker";

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

  async function onSubmit(
    values: z.infer<typeof pipelineCreateTargetFormSchema>
  ) {
    setLoading(true);

    try {
      toast({
        title: "Creating.",
        description: "Please wait a moment..",
      });

      const form = new FormData();

      form.append("date", values.date.startDate);

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
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button loading={loading} size="sm" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};
