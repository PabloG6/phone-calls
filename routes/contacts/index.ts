import { authProcedure, createTRPCRouter } from "@/server/trpc";
import { addContactSchema } from "./schema";
import { contacts } from "@/db/schema";
import parsePhoneNumberFromString from "libphonenumber-js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const contactsRouter = createTRPCRouter({
  list: authProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(contacts)
      .where(eq(contacts.userId, ctx.user!.id));
  }),
  addContact: authProcedure
    .input(addContactSchema)
    .mutation(async ({ ctx, input }) => {
      const e164Format = parsePhoneNumberFromString(input.phoneNumber)?.format(
        "E.164",
      );
      if (!!e164Format) {
        await ctx.db
          .insert(contacts)
          .values({ ...input, userId: ctx.user!.id, e164Rep: e164Format });
        return;
      }

      throw new TRPCError({
        code: "PARSE_ERROR",
        message: "unable to parse received phone number",
      });
    }),
});
