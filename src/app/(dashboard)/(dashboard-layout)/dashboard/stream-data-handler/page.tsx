"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button, Switch } from "@/components/ui";

const StreamDataHandlerFormSchema = z.object({
  period: z.boolean({
    required_error: "Please select data period.",
  }),
});

export default function StreamDataHandler() {
  const form = useForm<z.infer<typeof StreamDataHandlerFormSchema>>({
    resolver: zodResolver(StreamDataHandlerFormSchema),
    defaultValues: {
      period: false,
    },
  });

  function onSubmit(data: z.infer<typeof StreamDataHandlerFormSchema>) {
    toast("Data period successfully set", {
      description: data.period,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <div className="flex flex-col space-y-3 p-4 pl-0">
      <div className="sticky top-4 z-10 flex h-16 items-center justify-between rounded-lg border bg-white/50 p-6 pr-4 backdrop-blur-2xl transition-all duration-150 ease-in-out">
        <span className="font-heading text-xl font-medium">
          Stream Data Handler
        </span>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        <Form {...form}>
          <form
            onSubmit={() => form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Time period</FormLabel>
                    <FormDescription>
                      Time period will be used to set the interval of the
                      prediction result in the report.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-sm font-medium">Hourly</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm font-medium">Daily</span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size="sm" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
