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

      <div className="grid-template-columns-1fr grid">
    
        <main className="container mx-auto flex flex-col items-center justify-center pt-10">
          <Image src="/tmw-logo.png" alt="TextMeWhen Logo" width={100} height={100} />
          <h1 className="text-6xl font-extrabold leading-normal text-gray-700 sm:text-[4rem]">
            TextMeWhen<span className="text-orange-300">...</span>
          </h1>
          <p className="mb-2 text-xl text-gray-700 text-center sm:text-xl">
            Scheduled Text Delivery and Opt-In Page Hosting
          </p>
          <p className="text-m text-center sm:text-l mb-5 italic text-gray-700">
          Supports events min. 1hr & max. 7 days in future.
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
