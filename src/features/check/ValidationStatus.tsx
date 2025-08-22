import { CheckIcon, LoaderIcon } from "lucide-react";
import { useAddress } from "@/contexts/AddressContext";

function ValidationStatus() {
  const { state } = useAddress();
  const { selectedStreet, selectedStreetNumber } = state;

  return selectedStreet && selectedStreetNumber ? (
    <div className="bg-green-300 text-green-900 p-1 rounded-full">
      <span className="sr-only">Address is valid</span>
      <CheckIcon className="" />
    </div>
  ) : (
    <div className=" text-gray-600 p-1 rounded-full ">
      <span className="sr-only">Not validated</span>
      <LoaderIcon className="animate-spin" />
    </div>
  );
}

export default ValidationStatus;
