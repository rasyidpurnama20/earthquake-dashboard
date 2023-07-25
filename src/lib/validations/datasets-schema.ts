import * as z from "zod";

export const datasetsFormUpdateSchema = z.object({
  name: z.string().min(2, { message: "Please input valid name" }).optional(),
  type: z
    .string({ required_error: "Please select valid datasets type" })
    .optional(),
  cave: z
    .string({ required_error: "Please select valid cave area" })
    .optional(),
  file: z
    .any()
    .refine(
      (data) => {
        if (data) {
          return true;
        }
        return false;
      },
      { message: "Please input valid datasets file" }
    )
    .optional(),
  date: z
    .object(
      {
        startDate: z
          .string({ required_error: "Start date is required" })
          .datetime({ message: "Please input valid date" })
          .optional(),
        endDate: z
          .string({ required_error: "End date is required" })
          .datetime({ message: "Please input valid date" })
          .optional(),
      },
      { required_error: "Please input valid date" }
    )
    .optional(),
});

export const datasetsForm1Schema = z.object({
  name: z.string().min(2, { message: "Please input valid name" }),
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
