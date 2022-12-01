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
    .query(async ({ ctx, input }) => {
      const twilio = new Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: input.eventId,
        },
      });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }
    }),
});

// form input -> db
// dynamic event page from db
// twilio router from db
// that data -> twilio api (client.messages.create)
