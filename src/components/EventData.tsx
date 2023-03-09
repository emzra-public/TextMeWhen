import { trpc } from "../utils/trpc";
import { PhoneNumberInput } from "./PhoneNumberInput";

// Passes through id from the URL 
function EventData({ id }: { id: string }) {
  // Dynamically load the event data based on the id 
  const { data: event, isLoading } = trpc.event.getEventData.useQuery(
    { id },
    // Don't refetch when the window is re-focused 
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );
  // Show a loading indicator while the data is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Show an error message if the event is not found
  if (!event) {
    return <div>Not found!</div>;
  }
// Render the event data
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="mt-2 flex flex-row justify-center text-lg text-gray-700">
        Attending {event.name}?
      </h2>

      <p className="flex flex-row justify-center text-sm italic text-gray-600">
        Date: {event.date.toLocaleDateString()}
      </p>
      <p className="mb-2 flex flex-row justify-center text-sm italic text-gray-600">
        Time: {event.date.toLocaleTimeString()}
      </p>
      <p className="flex flex-row justify-center text-sm text-gray-600">
        Get a text reminder when the event starts!
      </p>
      <div className="flex flex-row justify-center">
        <PhoneNumberInput event={event} />
      </div>
    </section>
  );
}

export default EventData;
