import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../db/client";

export const createContextInner = async () => {
  return { prisma };
};

export const createContext = async (_opts: CreateNextContextOptions) => {
  return await createContextInner();
};

export type Context = inferAsyncReturnType<typeof createContext>;
