import type { NextPage } from "next";
import { useRouter } from "next/router";
import EventData from "../components/EventData";

const EventPage: NextPage = () => {
  // Dynamically load the tournament data based on the id in the URL
  const router = useRouter();
  const { id } = router.query;
 
  return (
    <>
      {id !== "" ? (
        <EventData id={id as string} />
      ) : (
        <div>Please check your URL!</div>
      )}
    </>
  );
};

export default EventPage;
