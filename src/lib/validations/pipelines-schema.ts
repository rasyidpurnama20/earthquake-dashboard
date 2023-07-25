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
