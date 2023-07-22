import * as z from "zod";

export const datasetsForm1Schema = z.object({
  fileName: z.string().min(2, { message: "Please input valid name" }),
  type: z.string({ required_error: "Please select valid datasets type" }),
  cave: z.string({ required_error: "Please select valid cave area" }),
  file: z.any().refine(
    (data) => {
      if (data) {
        return true;
      }
      return false;
    },
    { message: "Please input valid datasets file" }
  ),
});

export const datasetsForm2Schema = z.object({
  selectedStartDate: z.date({
    required_error: "Start date is required",
  }),
  selectedEndDate: z.date({ required_error: "End date is required" }),
});
