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
  // queries for event data by id (context of id is passed in automatically)
  // throws an error if the event is not found
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
    // collects the event id, phone number, and datetime
    .input(
      z.object({
        eventId: z.string(),
        phoneNumber: z
          .string()
          .length(10, { message: "Phone number must be 10 digits" }),
        datetime: z.date(),
      })
    )
    // The phone number is saved to the DB under the event ID in context
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
        // Initiating Twilio API with the credentials from the .env file
        const twilio = new Twilio(
          env.TWILIO_ACCOUNT_SID,
          env.TWILIO_AUTH_TOKEN
        );
        // The input is then passed to the Twilio API to send a message to the phone number at the specified time
        const messagingServiceSid = env.TWILIO_MESSAGING_SERVICE_SID;
        await twilio.messages.create({
          from: messagingServiceSid,
          to: input.phoneNumber,
          body: `${eventResult.name} is happening now!`,
          scheduleType: "fixed",
          sendAt: input.datetime,
        });
        // error handling
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Something went wrong`,
        });
      }
    }),
});
