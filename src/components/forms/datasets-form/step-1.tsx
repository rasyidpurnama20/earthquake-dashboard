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
} from "@/components/ui";
import { datasetsForm1Schema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import DropzoneInput from "../../ui/dropzone-input";
import { datasetsFormState } from "@/store/datasets-form-store";
import { useRouter } from "next/navigation";

export const DatasetsFormStep1 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof datasetsForm1Schema>>({
    resolver: zodResolver(datasetsForm1Schema),
    defaultValues: {
      fileName: datasetsFormState.data.fileName.get(),
      type: datasetsFormState.data.type.get(),
      cave: datasetsFormState.data.cave.get(),
      file: datasetsFormState.data.file.get(),
    },
  });

  function onSubmit(values: z.infer<typeof datasetsForm1Schema>) {
    setLoading(true);
    router.push("/dashboard/datasets/add/2");
    datasetsFormState.step.set(2);
    datasetsFormState.data.set({
      ...datasetsFormState.data.get(),
      fileName: values.fileName,
      type: values.type,
      cave: values.cave,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      file: values.file,
    });
    console.log(datasetsFormState.data.get());
    setLoading(false);
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fileName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input datasets file name"
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
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      <SelectItem value="gbc">GBC</SelectItem>
                      <SelectItem value="dmlz">DMLZ</SelectItem>
                    </SelectContent>
                  </Select>
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
                    label="File Datasets"
                    validation={{ required: "Photo must be filled" }}
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
