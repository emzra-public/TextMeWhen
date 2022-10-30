import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  getAllEvents: publicProcedure
    .input(
      z.object({
         text: z.string().nullish() 
        }).nullish()
      )
    .query(({ input }) => {
      // operation to run 
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  createEventData: publicProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.string(),
        time: z.string(),
      })
    )
    .mutation( async ({ input, ctx }) => {
      // Operation to run 
      ctx.prisma.event.create({
        data: {
          name: input.name,
          date: input.date,
          time: input.time,
        },
      })
    }
  ),
  createNumberData: publicProcedure
    .input(
      z.object({
        eventId: z.number(),
        phoneNumber: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      // Operation to run 
      // add phone number to phoneNumbers array in event 
      ctx.prisma.event.update({
        where: {
          id: input.eventId,
        },
        data: {
          phoneNumbers: {
            push: input.phoneNumber,
          },
        },
      })
      console.log("phone number added to event")
    }
  ),
});
