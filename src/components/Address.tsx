import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { ChevronsUpDownIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { getStreetCollections } from "@/services/apiStreetCollections";

// Type for street results from API
interface StreetResult {
  countryCode: string;
  city: string;
  streetName: string;
  streetIds: number[];
  isAliasMatch: string;
}

interface ApiResponse {
  streets: StreetResult[];
}

const streets = [
  {
    value: "demo-street",
    label: "Demo Street",
  },
  {
    value: "demo-street-2",
    label: "Demo Street 2",
  },
  {
    value: "demo-street-3",
    label: "Demo Street 3",
  },
  {
    value: "demo-street-4",
    label: "Demo Street 4",
  },
  {
    value: "demo-street-5",
    label: "Demo Street 5",
  },
];

const streetNumbers = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
];

function Address() {
  // States for street search
  const [streetOpen, setStreetOpen] = React.useState(false);
  const [streetValue, setStreetValue] = React.useState("");
  const [streetSearchValue, setStreetSearchValue] = React.useState("");
  const [streetResults, setStreetResults] = React.useState<StreetResult[]>([]);
  const [isLoadingStreets, setIsLoadingStreets] = React.useState(false);

  // States for street number search
  const [streetNumberOpen, setStreetNumberOpen] = React.useState(false);
  const [streetNumberValue, setStreetNumberValue] = React.useState("");

  // Search function for streets
  const searchStreets = React.useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      setStreetResults([]);
      return;
    }

    setIsLoadingStreets(true);
    try {
      const data = (await getStreetCollections(searchTerm)) as ApiResponse;
      if (data && data.streets && Array.isArray(data.streets)) {
        setStreetResults(data.streets.slice(0, 20)); // Limit to first 20 results
      } else {
        setStreetResults([]);
      }
    } catch (error) {
      console.error("Error searching streets:", error);
      setStreetResults([]);
    } finally {
      setIsLoadingStreets(false);
    }
  }, []);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchStreets(streetSearchValue);
    }, 300); // Wait to not overload the API

    return () => clearTimeout(timeoutId);
  }, [streetSearchValue, searchStreets]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 container mx-auto">
        {/* Search for Street in API */}
        <Popover open={streetOpen} onOpenChange={setStreetOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={streetOpen}
              className="w-[200px] justify-between"
            >
              {streetValue
                ? streets.find((street) => street.value === streetValue)?.label
                : "Street Name"}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search street..."
                value={streetSearchValue}
                onValueChange={setStreetSearchValue}
              />
              <CommandList>
                <CommandEmpty>
                  {isLoadingStreets ? "Searching..." : "No streets found."}
                </CommandEmpty>
                <CommandGroup>
                  {streetResults.map((street, index) => (
                    <CommandItem
                      key={index}
                      value={`${street.streetName} - ${street.city}`}
                      onSelect={(currentValue) => {
                        setStreetValue(currentValue);
                        setStreetSearchValue("");
                        setStreetOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          streetValue ===
                            `${street.streetName} - ${street.city}`
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{street.streetName}</span>
                        <span className="text-sm text-gray-500">
                          {street.city}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Get list of streets numbers from API */}
        <Popover open={streetNumberOpen} onOpenChange={setStreetNumberOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={streetNumberOpen}
              className="w-[200px] justify-between"
            >
              {streetNumberValue
                ? streetNumbers.find(
                    (streetNumber) => streetNumber.value === streetNumberValue
                  )?.label
                : "Street Number"}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Select street number..." />
              <CommandList>
                <CommandEmpty>No street numbers found.</CommandEmpty>
                <CommandGroup>
                  {streetNumbers.map((streetNumber) => (
                    <CommandItem
                      key={streetNumber.value}
                      value={streetNumber.value}
                      onSelect={(currentValue) => {
                        setStreetNumberValue(
                          currentValue === streetNumberValue ? "" : currentValue
                        );
                        setStreetNumberOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          streetNumberValue === streetNumber.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {streetNumber.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Get list of cities from Street API */}
        <Input placeholder="City" disabled value={streetValue?.city} />
        <Input placeholder="Zip" disabled />
        {/* Get list of floors from API */}
        <Input placeholder="Floor" />
        {/* Get list of households on floor from API */}
        <Input placeholder="Household" />
      </div>

      <div className="flex flex-row gap-2 w-auto mx-auto" hidden>
        <Button className="w-auto mx-auto">Add Another Address</Button>
        <Button className="w-auto mx-auto" variant="destructive">
          Reset Form
        </Button>
      </div>
    </div>
  );
}

export default Address;
