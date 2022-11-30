import { trpc } from "../utils/trpc";
import { PhoneNumberInput } from "./PhoneNumberInput";

function EventData({ id }: { id: number }) {
  const { data: event, isLoading } = trpc.event.getEventData.useQuery(
    { id },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!event) {
    return <div>Not found!</div>;
  }

  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="flex flex-row justify-center text-lg text-gray-700">
        Attending {event.name}?
      </h2>
      <p className="flex flex-row justify-center text-sm text-gray-600">
        {event.date} at {event.time}
      </p>
      <div className="flex flex-row justify-center">
        <PhoneNumberInput eventId={event.id}></PhoneNumberInput>
      </div>
    </section>
  );
}

export default EventData;
