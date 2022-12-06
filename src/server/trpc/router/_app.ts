import { router } from "../trpc";
import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  event: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
