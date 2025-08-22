import { useAddress } from "@/contexts/AddressContext";

import ActionButtons from "./ActionButtons";
import Floors from "./Floors";
import Household from "./Household";
import Cities from "./Cities";
import StreetSearch from "./StreetSearch";
import StreetNumberSearch from "./StreetNumberSearch";
import ValidationStatus from "./ValidationStatus";
import SavedAddresses from "./SavedAddresses";

function Address() {
  const { state } = useAddress();
  const { selectedStreet, selectedStreetNumber } = state;

  return (
    <div className="flex flex-col gap-2">
      <SavedAddresses />

      {/* Mark with border if street and street number are selected and validated*/}
      <div
        className={`flex flex-row gap-2 container mx-auto items-center rounded-md p-2 border-3 ${
          selectedStreet && selectedStreetNumber
            ? "border-solid border-green-300"
            : "border-dashed border-gray-300 "
        }`}
      >
        <StreetSearch />
        <StreetNumberSearch />
        <Cities />
        <Floors />
        <Household />
        <ValidationStatus />
      </div>

      <ActionButtons />
    </div>
  );
}

export default Address;
