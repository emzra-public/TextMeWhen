import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function EventForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const eventMutator = trpc.event.createEventData.useMutation();

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0 && date.length > 0 && time.length > 0) {
      setNameError("");
      eventMutator.mutateAsync({
        name: name,
        date: date,
        time: time,
      });
      console.log(name);
    } else if (name.length === 0) {
      setNameError("Please enter a name for your event");
    } else if (date.length === 0) {
      setDateError("Please enter a date for your event");
    } else if (time.length === 0) {
      setTimeError("Please enter a time for your event");
    }
  };
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Event Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        {nameError && <p className="mt-2 text-sm text-red-600">{nameError}</p>}
      </div>

      <div className="mt-6 mb-6 flex flex-col items-center justify-center gap-y-6 gap-x-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="date"
            className="text-white-900 block w-full rounded-lg border border-orange-300 bg-orange-50 p-2.5 pl-10 sm:text-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          {dateError && (
            <p className="mt-2 text-sm text-red-600">{dateError}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Time:
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          ></input>
          {timeError && (
            <p className="mt-2 text-sm text-red-600">{timeError}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-orange-300 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleEventSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
