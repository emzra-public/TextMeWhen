# TextMeWhen

Scheduled Text Delivery by Opt-In, Custom Opt-In Page for each event pushed by user.

## Tech Stack

- [React.js](https://reactjs.org/)
- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [HeadlessUI](https://headlessui.com/)
- [Zod](https://zod.dev/)

### Other

- [Twilio API](https://www.twilio.com/docs)
- [Vercel](https://vercel.com)
- [Railway](https://railway.app)

### App Flow
- https://imgur.com/a/DoddxiQ

## Team 
Lead Dev: EmalineG

### From EmalineG:

Version 1.0 schedules texts to send at the time of event and only supports events at least 1 hour and at max 7 days in the future. Message sent reads, "[event name] is happening at [event time]!"

Upcoming Features: Custom messages, reminder text in advance of event, more than 1 scheduled message, user accounts to manage attendee list & replies, rollbar error logging, WhatsApp integration.

Thank you to the CTRLSHIFTCOLLAB community for your encouragement with this project and allowing me to brainstorm ideas with you. A special thanks to Cloud#6969, Prath#9580, lilintech#1668, and kai_11#4616.

## Version Updates

Version 1.1 - Changed dynamic URLs to randomized numbers instead of incrementing value; Replaced time variable in text message to "now" for universality in regard to time zones; Removed excess padding on sides for mobile to improve UI/UX; Reformatted text content for mobile to improve UI/UX.
