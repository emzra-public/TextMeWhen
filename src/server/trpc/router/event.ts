import { TRPCError } from "@trpc/server";
import { Twilio } from "twilio";
import { z } from "zod";
import { env } from "../../../env/server.mjs";

import { router, publicProcedure } from "../trpc";
// router for event related routes
// input validation is done using zod
// each route determines the input which will then be passed to the mutation/query
export const eventRouter = router({
  createEventData: publicProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.event.create({
        data: {
          name: input.name,
          date: input.date,
        },
      });
    }),
  getEventData: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.event.findUnique({
          where: {
            id: input.id,
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  createNumberData: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
        phoneNumber: z
          .string()
          .length(10, { message: "Phone number must be 10 digits" }),
        datetime: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const eventResult = await ctx.prisma.event.update({
          where: {
            id: input.eventId,
          },
          data: {
            phoneNumbers: {
              push: input.phoneNumber,
            },
          },
        });
        const twilio = new Twilio(
          env.TWILIO_ACCOUNT_SID,
          env.TWILIO_AUTH_TOKEN
        );

        const messagingServiceSid = env.TWILIO_MESSAGING_SERVICE_SID;
        await twilio.messages.create({
          from: messagingServiceSid,
          to: input.phoneNumber,
          body: `${eventResult.name} is happening now!`,
          scheduleType: "fixed",
          sendAt: input.datetime,
        });
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Something went wrong`,
        });
      }
    }),
});
