import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  createEventData: publicProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.string(),
        time: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.event.create({
        data: {
          name: input.name,
          date: input.date,
          time: input.time,
        },
      });
    }),
  getEventData: publicProcedure
    .input(
      z.object({
        id: z.number(),
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
        eventId: z.number(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.event.update({
          where: {
            id: input.eventId,
          },
          data: {
            phoneNumbers: {
              push: input.phoneNumber,
            },
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
