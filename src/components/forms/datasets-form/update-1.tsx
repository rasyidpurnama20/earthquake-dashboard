"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useToast,
} from "@/components/ui";
import { datasetsFormUpdateSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import DropzoneInput from "../../ui/dropzone-input";
import { useRouter } from "next/navigation";
import { authService, datasetsService } from "@/services";
import { useSession } from "next-auth/react";
import { type DetailDatasetsResponse } from "@/lib/dto";
import { useQuery } from "@tanstack/react-query";

type DatasetsFormUpdate1Props = {
  detailsData: DetailDatasetsResponse;
};

export const DatasetsFormUpdate1 = ({
  detailsData,
}: DatasetsFormUpdate1Props) => {
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
      form.append("file", values.file[0] as Blob);
      form.append("name", detailsData.name);
      form.append("type", detailsData.type.toString());
      form.append("cave", detailsData.cave.toString());
      form.append("user", userDetails?.data.id.toString() as string);

      const res = await datasetsService.updateDatasets({
        form: form,
        token: token as string,
        id: detailsData.id.toString(),
      });

      toast({
        title: "Update Success",
        description: "File has been update.",
      });
      router.push(`/dashboard/datasets/update/${res.data.id}/2`);
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
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DropzoneInput
                    {...field}
                    id="file"
                    label="Datasets File"
                    accept={{ "text/csv": [".csv"] }}
                    helperText="You can upload file with .csv extension."
                  />
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
