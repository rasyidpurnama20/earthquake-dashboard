import * as z from "zod";

export const pipelineCreateFormSchema = z.object({
  name: z.string().min(2, { message: "Please input valid name" }),
  cave: z.string({ required_error: "Please select valid cave area" }),
  type: z.string({ required_error: "Please select valid type" }),
  area: z.string({ required_error: "Please select valid area" }),
  task: z.string({ required_error: "Please select valid task" }),
  model: z.string({ required_error: "Please select valid model" }),
  b: z.string({ required_error: "Please select valid b datasets" }),
  c: z.string({ required_error: "Please select valid c datasets" }),
  m: z.string({ required_error: "Please select valid m datasets" }),
  status: z.string({ required_error: "Please select valid status" }),
});

export const pipelineCreateTargetFormSchema = z.object({
  date: z.object(
    {
      startDate: z
        .string({ required_error: "Start date is required" })
        .datetime({ message: "Please input valid date" }),
      endDate: z
        .string({ required_error: "End date is required" })
        .datetime({ message: "Please input valid date" }),
    },
    { required_error: "Please input valid date" }
  ),
});
