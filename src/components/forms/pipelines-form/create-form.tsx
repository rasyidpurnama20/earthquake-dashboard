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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { datasetsService, pipelinesService } from "@/services";
import { useSession } from "next-auth/react";
import { pipelineCreateFormSchema } from "@/lib/validations";
import { useQuery } from "@tanstack/react-query";

export const PipelineCreateForm = ({}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof pipelineCreateFormSchema>>({
    resolver: zodResolver(pipelineCreateFormSchema),
    defaultValues: {
      name: undefined,
      cave: undefined,
      area: undefined,
      model: undefined,
      task: undefined,
      b: undefined,
      c: undefined,
      m: undefined,
    },
    mode: "onChange",
  });
  const cave = form.getValues("cave");
  const watchCave = form.watch("cave");

  const { data: dataMucking } = useQuery({
    enabled: !!token && !!cave,
    queryKey: ["getDatasetsM", token, cave, watchCave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave,
        type: "1",
      }),
  });
  const { data: dataBlasting } = useQuery({
    enabled: !!token && !!cave,
    queryKey: ["getDatasetsB", token, cave, watchCave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave,
        type: "2",
      }),
  });
  const { data: dataCatalog } = useQuery({
    enabled: !!token && !!cave,
    queryKey: ["getDatasetsC", token, cave, watchCave],
    queryFn: () =>
      datasetsService.getDatasets({
        token: token as string,
        cave: cave,
        type: "3",
      }),
  });

  async function onSubmit(values: z.infer<typeof pipelineCreateFormSchema>) {
    setLoading(true);

    try {
      toast({
        title: "Creating.",
        description: "Please wait a moment..",
      });

      const form = new FormData();

      form.append("name", values.name);
      form.append("cave", values.cave);
      form.append("area", values.area);
      form.append("model", values.model);
      form.append("task", values.task);
      form.append("m", values.m);
      form.append("b", values.b);
      form.append("c", values.c);

      await pipelinesService.createPrediction({
        form: form,
        token: token as string,
      });

      toast({
        title: "Create Success",
        description: "Prediction has been created.",
      });
      router.push(`/dashboard/magnitude-prediction`);
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
                      <SelectValue placeholder="Select Cave" />
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prediction Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input Prediction Name"
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
            name="m"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mucking Dataset</FormLabel>
                <FormControl>
                  <Select
                    disabled={cave === undefined}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Mucking Dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataMucking && dataMucking?.data?.results.length > 0 ? (
                        dataMucking?.data.results.map((dataset) => (
                          <SelectItem
                            value={dataset.id.toString()}
                            key={dataset.id}
                          >
                            {dataset.name}
                          </SelectItem>
                        ))
                      ) : (
                        <span className="text-sm">No Mucking Dataset</span>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="b"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blasting Dataset</FormLabel>
                <FormControl>
                  <Select
                    disabled={cave === undefined}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Blasting Dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataBlasting &&
                      dataBlasting?.data?.results.length > 0 ? (
                        dataBlasting?.data.results.map((dataset) => (
                          <SelectItem
                            value={dataset.id.toString()}
                            key={dataset.id}
                          >
                            {dataset.name}
                          </SelectItem>
                        ))
                      ) : (
                        <span className="text-sm">No Blasting Dataset</span>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="c"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catalog Dataset</FormLabel>
                <FormControl>
                  <Select
                    disabled={cave === undefined}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Catalog Dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataCatalog && dataCatalog?.data?.results.length > 0 ? (
                        dataCatalog?.data.results.map((dataset) => (
                          <SelectItem
                            value={dataset.id.toString()}
                            key={dataset.id}
                          >
                            {dataset.name}
                          </SelectItem>
                        ))
                      ) : (
                        <span className="text-sm">No Catalog Dataset</span>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Prediction Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Prediction Task" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Hourly</SelectItem>
                      <SelectItem value="2">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Prediction Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Bayesian LSTM</SelectItem>
                    </SelectContent>
                  </Select>
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
