import { Input } from "@/components/ui/input";
import { useAddress } from "@/contexts/AddressContext";

function Cities() {
  const { state } = useAddress();
  const { selectedStreet } = state;

  return (
    <Input placeholder="City" disabled value={selectedStreet?.city || ""} />
  );
}

export default Cities;
