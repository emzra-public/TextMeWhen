import { Event } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export function PhoneNumberInput({ event }: { event: Event }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const phoneNumberMutator = trpc.event.createNumberData.useMutation();

  const handlePhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  };

  const handlePhoneNumberSubmit = () => {
    if (phoneNumber.length === 10 && !isNaN(Number(phoneNumber))) {
      console.log("phoneNumber", phoneNumber);
      setPhoneNumberError("");

      phoneNumberMutator.mutate(
        {
          phoneNumber,
          eventId: event.id,
          datetime: event.date,
        },

        {
          onSuccess: () => {
            setErrorMsg("");
            setSuccessMsg(`Your phone number has been added to the event!`);
          },
          onError: (error) => {
            setSuccessMsg("");
            setErrorMsg(
              "Error: If event is happening in less than 1 hr or is more than 7 days away, you can't add your number."
            );
          },
        }
      );
      setPhoneNumber("");
      console.log(phoneNumber, event.date);
    } else {
      setPhoneNumberError("Please enter a valid phone number");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>US</option>
          </select>
        </div>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="block w-full rounded-md border border-orange-300 bg-orange-50 pl-16 text-orange-400 focus:border-orange-400 focus:ring-orange-500 sm:text-sm"
          placeholder="5559876543"
        />
      </div>
      <div>
        <p className="mt-2 text-sm text-red-600">{phoneNumberError}</p>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-orange-300 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handlePhoneNumberSubmit}
      >
        Submit
      </button>
      <div>
        {successMsg ? (
          <p className="mt-2 text-sm text-green-600">{successMsg}</p>
        ) : null}
        {errorMsg ? (
          <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
        ) : null}
      </div>
    </div>
  );
}

export default PhoneNumberInput;
