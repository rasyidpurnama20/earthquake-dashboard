"use client";

import { DataTable } from "@/components";
import { pipelinesColumns } from "@/components/tables/pipelines";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // Skeleton
} from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { pipelinesService } from "@/services";
import { IconPlus } from "@tabler/icons-react";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

export default function Pipeline() {
  // const { data: sessionData } = useSession();
  // const token = sessionData?.user?.accessToken;

  // const {
  //   data: dataPipelines,
  //   isLoading: isLoadingPipelines,
  //   isError: isErrorPipelines,
  // } = useQuery({
  //   enabled: !!token,
  //   queryKey: ["getPipelines", token],
  //   queryFn: () =>
  //     pipelinesService.getPipelines({
  //       token: token as string,
  //     }),
  // });

  return (
    <div className="relative flex flex-col space-y-3 p-4 pl-0">
      <div className="sticky top-4 z-10 flex h-16 items-center justify-between rounded-lg border bg-white/50 p-6 pr-4 backdrop-blur-2xl transition-all duration-150 ease-in-out">
        <span className="font-heading text-xl font-medium">Pipeline</span>

        <div className="flex items-center">
          {/* <Link href="/dashboard/pipeline/create/area">
            <Button size="sm" className="flex gap-2 rounded-r-none">
              <IconPlus size={16} /> Create Area
            </Button>
          </Link> */}
          <CreateAreaDialog />
          <CreateModelDialog />
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Area</span>
          </div>
          {/* {isLoadingMucking ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorMucking ? (
            <div className="flex h-12 w-full rounded-md border p-4 text-destructive">
              <IconAlertTriangle size={20} stroke={1.5} />
              <p className="text-sm">Error</p>
            </div>
          ) : ( */}
          <DataTable
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            columns={pipelinesColumns}
            data={[]}
          />
          {/* )} */}
        </div>
      </div>
      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        <div>
          <div className="mb-4">
            <span className="text-sm font-medium">Model</span>
          </div>
          {/* {isLoadingMucking ? (
            <Skeleton className="h-12 w-full" />
          ) : isErrorMucking ? (
            <div className="flex h-12 w-full rounded-md border p-4 text-destructive">
              <IconAlertTriangle size={20} stroke={1.5} />
              <p className="text-sm">Error</p>
            </div>
          ) : ( */}
          <DataTable
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            columns={pipelinesColumns}
            data={[]}
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

const CreateAreaDialogFormSchema = z.object({
  area_name: z.string({
    required_error: "Please input area name.",
  }),
  area_cave: z.string({
    required_error: "Please select area cave.",
  }),
});

const CreateAreaDialog = () => {
  const form = useForm<z.infer<typeof CreateAreaDialogFormSchema>>({
    resolver: zodResolver(CreateAreaDialogFormSchema),
  });

  function onSubmit(data: z.infer<typeof CreateAreaDialogFormSchema>) {
    toast("Data successfully created", {
      description: data.area_name + " has been created.",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="flex gap-2 rounded-r-none">
          <IconPlus size={16} /> Create Area
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Area</DialogTitle>
          <DialogDescription>
            Create new cave by using this dialog
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="area_name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="text-right">
                      Area Name
                    </Label>
                    <Input
                      onChange={field.onChange}
                      value={field.value}
                      id="name"
                      className="col-span-3"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area_cave"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex w-full flex-grow items-center ">
                      Cave
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cave" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dmlz">DMLZ</SelectItem>
                        <SelectItem value="gbc">GBC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CreateModelDialog = () => {
  const form = useForm<z.infer<typeof CreateAreaDialogFormSchema>>({
    resolver: zodResolver(CreateAreaDialogFormSchema),
  });

  function onSubmit(data: z.infer<typeof CreateAreaDialogFormSchema>) {
    toast("Data successfully created", {
      description: data.area_name + " has been created.",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="flex gap-2 rounded-l-none">
          <IconPlus size={16} /> Create Model
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Model</DialogTitle>
          <DialogDescription>
            Create new cave by using this dialog
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="area_name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="text-right">
                      Area Name
                    </Label>
                    <Input
                      onChange={field.onChange}
                      value={field.value}
                      id="name"
                      className="col-span-3"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area_cave"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex w-full flex-grow items-center ">
                      Cave
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cave" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dmlz">DMLZ</SelectItem>
                        <SelectItem value="gbc">GBC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
