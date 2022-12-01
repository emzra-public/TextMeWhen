import { NextPage } from "next";
import { useRouter } from "next/router";
import EventData from "../components/EventData";

function isNumber(str: string): boolean {
  if (typeof str !== "string") {
    return false;
  }

  if (str.trim() === "") {
    return false;
  }

  return !Number.isNaN(Number(str));
}

const EventPage: NextPage = () => {
  // Dynamically load the tournament data based on the id in the URL
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {isNumber(id as string) ? (
        <EventData id={Number(id)} />
      ) : (
        <div>Please check your URL!</div>
      )}
    </>
  );
};

export default EventPage;
