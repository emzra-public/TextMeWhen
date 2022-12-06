import type { NextPage } from "next";
import Head from "next/head";
import EventForm from "../components/EventForm";

// make api requests:
// export default function IndexPage() {
//   const hello = trpc.hello.useQuery({ text: 'client' });
//   if (!hello.data) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div>
//       <p>{hello.data.greeting}</p>
//     </div>
//   );
// }
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TextMeWhen</title>
        <meta
          name="description"
          content="Scheduled Text Delivery and Opt-In Page Hosting"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          TextMeWhen<span className="text-orange-300">...</span>
        </h1>
        <p className="text-2xl text-gray-700">
          Scheduled Text Delivery and Opt-In Page Hosting
        </p>
        <div>
          <EventForm />
        </div>
        <p className="text-gray-700"></p>
      </main>
    </>
  );
};

export default Home;
