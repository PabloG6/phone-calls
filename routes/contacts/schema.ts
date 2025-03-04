import { z } from "zod";

export const addContactSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
});
export type AddContactSchema = z.infer<typeof addContactSchema>;
