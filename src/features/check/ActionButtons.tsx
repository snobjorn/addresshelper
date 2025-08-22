import { Button } from "@/components/ui/button";
import { useAddress } from "@/contexts/AddressContext";

function ActionButtons() {
  const { state, dispatch } = useAddress();

  const { selectedStreet, selectedStreetNumber } = state;

  // Handle add address
  const handleAddAddress = () => {
    dispatch({
      type: "addSavedAddress",
      payload: {
        streetName: selectedStreet?.streetName,
        streetNumber: selectedStreetNumber,
        city: selectedStreet?.city,
      },
    });
  };

  // Handle reset form
  const handleResetForm = () => dispatch({ type: "resetSavedAddresses" });

  return (
    <div className="flex flex-row gap-2 w-auto mx-auto">
      <Button
        className="w-auto mx-auto"
        onClick={handleAddAddress}
        disabled={!selectedStreet || !selectedStreetNumber}
      >
        Check Another Address
      </Button>
      <Button
        className="w-auto mx-auto"
        variant="destructive"
        onClick={handleResetForm}
      >
        Reset Form
      </Button>
    </div>
  );
}

export default ActionButtons;
