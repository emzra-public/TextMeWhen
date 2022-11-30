import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const twilioRouter = router({
  hello: publicProcedure
    .query(() => {
      // const number = '+19499223891'
      // const message = 'Hello from Twilio!'
      const result = fetch('https://su23x43w4abmhyznvmqaiuakam0muocc.lambda-url.us-west-2.on.aws', )
        // {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ number:number, message:message }),
        //   }
        // )
      return result
    }),

});
