import { env } from "../../../env/server.mjs";
import { router, publicProcedure } from "../trpc";
import { Twilio } from "twilio";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const twilioRouter = router({
  schedule: publicProcedure
    .input(
      z.object({
        eventId: z.number(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Initialize the event and sendWhen variables with default values
        let event = null;
        let sendWhen = null;

        // Query the event from the database
        event = await prisma.event.findUnique({
          where: {
            id: input.eventId,
          },
        });

        // Set the sendWhen variable to the current date/time
        sendWhen = event?.date;

        // Create a new instance of the Twilio class
        const twilio = new Twilio(
          env.TWILIO_ACCOUNT_SID,
          env.TWILIO_AUTH_TOKEN
        );

        // Send the reminder message using the Twilio API
        const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
        return twilio.messages.create({
          from: messagingServiceSid,
          to: input.phoneNumber,
          body: `${event?.name} is happening at ${event?.date}`,
          scheduleType: "fixed",
          sendAt: sendWhen.toISOString(),
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }
    }),
});

// that data -> twilio api (client.messages.create)
