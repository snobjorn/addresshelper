import { useAddress } from "@/contexts/AddressContext";

function SavedAddresses() {
  const { state } = useAddress();
  const { savedAddresses } = state;

  return (
    <div className="flex flex-col gap-2">
      {savedAddresses.length > 0 &&
        savedAddresses.map((address, index) => (
          <div
            className="flex flex-row gap-2 container mx-auto items-center rounded-md p-2 border-3 border-solid border-green-300"
            key={index}
          >
            <div className="flex flex-row gap-2">
              <p>{address.streetName}</p>
              <p>{address.streetNumber}</p>
              <p>{address.city}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SavedAddresses;
