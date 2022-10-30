import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [eventId, setEventId] = useState(1);
  const phoneNumberMutator = trpc.event.createNumberData.useMutation();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneNumberSubmit = (e) => {
    if (phoneNumber.length === 10) {
      console.log("phoneNumber", phoneNumber);
      setPhoneNumberError("");
      phoneNumberMutator.mutate({
        phoneNumber: phoneNumber,
        eventId: eventId,
      });
      console.log(phoneNumber);
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
          onChange={handlePhoneNumberChange}
          className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="+1 (555) 987-6543"
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
    </div>
  );
}
