"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/components/ui";
import { datasetsForm1Schema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import DropzoneInput from "../../ui/dropzone-input";
import { useRouter } from "next/navigation";
import { datasetsService } from "@/services";
import { useSession } from "next-auth/react";

export const DatasetsFormStep1 = ({}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof datasetsForm1Schema>>({
    resolver: zodResolver(datasetsForm1Schema),
    defaultValues: {
      name: "",
      type: undefined,
      cave: undefined,
      file: "",
    },
  });

  async function onSubmit(values: z.infer<typeof datasetsForm1Schema>) {
    setLoading(true);

    try {
      toast({
        title: "Uploading.",
        description: "Please wait a moment..",
      });

      const form = new FormData();
      console.log(values.file);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      form.append("file", values.file[0] as Blob);
      form.append("name", values.name);
      form.append("type", values.type);
      form.append("cave", values.cave);

      const res = await datasetsService.uploadDatasets({
        form: form,
        token: token as string,
      });

      toast({
        title: "Upload Success",
        description: "File has been uploaded.",
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
            name="cave"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cave</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Cave Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">DMLZ</SelectItem>
                      <SelectItem value="2">GBC</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Datasets Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">M</SelectItem>
                      <SelectItem value="2">B</SelectItem>
                      <SelectItem value="3">C</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Datasets Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input datasets name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
