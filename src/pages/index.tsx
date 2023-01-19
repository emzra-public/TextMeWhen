import type { NextPage } from "next";
import Head from "next/head";
import EventForm from "../components/EventForm";
import Notif from "../components/Notif";

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

      <div className="grid-template-columns-1fr3fr grid gap-2">
    
        <main className="container mx-auto flex flex-col items-center justify-center p-10">
          <h1 className="text-6xl font-extrabold leading-normal text-gray-700 sm:text-[5rem]">
            TextMeWhen<span className="text-orange-300">...</span>
          </h1>
          <p className="mb-2 text-xl text-gray-700 sm:text-2xl">
            Scheduled Text Delivery and Opt-In Page Hosting
          </p>
          <p className="text-m sm:text-l mb-5 italic text-gray-700">
            Version 1.0: Supports events min. 1hr & max. 7 days in future.
          </p>

          <div>
            <EventForm />
          </div>
          <p className="text-gray-700"></p>
        </main>
   
      </div>
      <Notif />
    </>
  );
};

export default Home;
