import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Address() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 container mx-auto">
        {/* Search for Street in API */}
        <Input placeholder="Street" />
        {/* Get list of streets numbers from API */}
        <Input placeholder="Street Number" />
        {/* Get list of cities from Street API */}
        <Input placeholder="City" />
        <Input placeholder="Zip" />
        {/* Get list of floors from API */}
        <Input placeholder="Floor" />
        {/* Get list of households on floor from API */}
        <Input placeholder="Household" />
        <Button>Lookup Address</Button>
      </div>
      <div className="flex flex-row gap-2 w-auto mx-auto">
        <Button className="w-auto mx-auto">Add Another Address</Button>
        <Button className="w-auto mx-auto" variant="destructive">
          Reset Form
        </Button>
      </div>
    </div>
  );
}

export default Address;
