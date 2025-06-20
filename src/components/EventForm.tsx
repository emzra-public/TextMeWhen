import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function EventForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const eventMutator = trpc.event.createEventData.useMutation();

  const handleEventSubmit = (e: any) => {
    if (name.length > 0 && date.length > 0 && time.length > 0) {
      setNameError("");
      const eventDate = new Date(date + " " + time);

      eventMutator.mutateAsync(
        {
          name: name,
          date: eventDate,
        },
        {
          onSuccess: (data) => {
            setErrorMsg("");
            setSuccessMsg(
              `Your event page has been created! You can find it at https://textmewhen.club/${data.id}`
            );
          },
          onError: () => {
            setSuccessMsg("");
            setErrorMsg("MY DATABASE IS BROKEN BC I HAVENT TOUCHED THIS IN 2 YEARS.");
          },
        }
      );

      setName("");
      setDate("");
      setTime("");
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
      <div className="flex flex-col items-center justify-center">
        <div>
          <label className="block text-sm font-medium text-orange-400">
            Event Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border block w-full border-orange-300 text-orange-400 bg-orange-50"
          ></input>
          {nameError && (
            <p className="mt-2 text-sm text-center text-red-600">{nameError}</p>
          )}
        </div>

        <div className="mt-10 mb-6 flex flex-col items-center justify-center gap-y-6 gap-x-4">
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
              className="block w-full rounded-lg border border-orange-300 bg-orange-50 p-2.5 pl-10 text-orange-400"
              value={date}
              onChange={(e) => setDate(e.target.value as string)}
              required
            ></input>
            {dateError && (
              <p className="mt-2 text-center text-sm text-red-600">{dateError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-400">
              Event Time:
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value as string);
                console.log(e.target.value);
              }}
              required
              className="border block w-full border-orange-300 bg-orange-50 text-orange-400"
            ></input>
            {timeError && (
              <p className="mt-2 text-sm text-center text-red-600">{timeError}</p>
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
        <div>
          {successMsg && (
            <p className="mt-2 text-sm text-center text-green-600">{successMsg}</p>
          )}
          {errorMsg && <p className="mt-2 text-center text-sm text-red-600">{errorMsg}</p>}
        </div>
      </div>
    </>
  );
}
