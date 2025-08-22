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
import { getStreetNumbersForCollection } from "@/services/apiStreetNumbersForCollection";

// Type for street results from API
interface StreetResult {
  countryCode: string;
  city: string;
  streetName: string;
  streetIds: number[];
  isAliasMatch: string;
}

interface StreetNumberResult {
  streetNo: string;
  entrance: string;
  addressId: string;
  [key: string]: unknown;
}

interface ApiResponse {
  streets: StreetResult[];
}

interface StreetNumbersApiResponse {
  streetNumbers: StreetNumberResult[];
}

function Address() {
  // States for street search
  const [streetOpen, setStreetOpen] = React.useState(false);
  const [streetValue, setStreetValue] = React.useState<StreetResult | null>(
    null
  );
  const [streetSearchValue, setStreetSearchValue] = React.useState("");
  const [streetResults, setStreetResults] = React.useState<StreetResult[]>([]);
  const [isLoadingStreets, setIsLoadingStreets] = React.useState(false);

  // States for street number search
  const [streetNumberOpen, setStreetNumberOpen] = React.useState(false);
  const [streetNumberValue, setStreetNumberValue] = React.useState("");
  const [streetNumberResults, setStreetNumberResults] = React.useState<
    StreetNumberResult[]
  >([]);
  const [isLoadingStreetNumbers, setIsLoadingStreetNumbers] =
    React.useState(false);

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

  // Search for street numbers. Limit is 100 (instead of default 30 from API).
  const searchStreetNumbers = React.useCallback(async (streetId: number) => {
    if (streetId) {
      const data = (await getStreetNumbersForCollection(
        streetId,
        100
      )) as StreetNumbersApiResponse;
      if (data && data.streetNumbers && Array.isArray(data.streetNumbers)) {
        setStreetNumberResults(data.streetNumbers);
      }
    }
  }, []);

  React.useEffect(() => {
    if (streetValue) {
      searchStreetNumbers(streetValue.streetIds[0]);
    }
  }, [streetValue, searchStreetNumbers]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 container mx-auto items-center">
        {/* Search for Street in API */}
        <Popover open={streetOpen} onOpenChange={setStreetOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={streetOpen}
              className="w-[400px] justify-between"
            >
              {streetValue?.streetName || "Street Name"}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
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
                      onSelect={() => {
                        setStreetValue(street);
                        setStreetSearchValue("");
                        setStreetOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          streetValue?.streetName === street.streetName &&
                            streetValue?.city === street.city
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

        {/* Get list of streets numbers from API, only if street is selected, when clicking the button */}
        <Popover open={streetNumberOpen} onOpenChange={setStreetNumberOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={streetNumberOpen}
              className="w-[200px] justify-between"
              disabled={!streetValue}
            >
              {streetNumberValue || "Street Number"}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Select street number..."
                value={streetNumberValue}
                onValueChange={setStreetNumberValue}
              />
              <CommandList>
                <CommandEmpty>
                  {isLoadingStreetNumbers
                    ? "Searching..."
                    : "No street numbers found."}
                </CommandEmpty>
                <CommandGroup>
                  {streetNumberResults
                    .filter(
                      (streetNumber, index, self) =>
                        index ===
                        self.findIndex(
                          (s) => s.streetNo === streetNumber.streetNo
                        )
                    )
                    .sort((a, b) => Number(a.streetNo) - Number(b.streetNo))
                    .map((streetNumber) => (
                      <CommandItem
                        key={streetNumber.addressId}
                        value={streetNumber.addressId}
                        onSelect={() => {
                          setStreetNumberValue(
                            streetNumber.entrance
                              ? String(streetNumber.streetNo) +
                                  " " +
                                  streetNumber.entrance
                              : String(streetNumber.streetNo)
                          );
                          setStreetNumberOpen(false);
                        }}
                      >
                        {String(streetNumber.streetNo)} {streetNumber?.entrance}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Get list of cities from Street API */}
        <Input placeholder="City" disabled value={streetValue?.city || ""} />

        {/* Get list of floors from API */}
        <Input
          placeholder="Floor"
          className="w-50 bg-[repeating-linear-gradient(45deg,#808080,#808080_10px,transparent_10px,transparent_20px)]"
          disabled
        />
        {/* Get list of households on floor from API */}
        <Input
          placeholder="Household"
          className="w-50 bg-[repeating-linear-gradient(45deg,#808080,#808080_10px,transparent_10px,transparent_20px)]"
          disabled
        />
        {streetValue && streetNumberValue && (
          <div className="bg-green-300 text-green-900 p-2 rounded-full flex items-center justify-center flex flex-row gap-2">
            <CheckIcon className="h-10 w-10" /> <span>Address is valid</span>
          </div>
        )}
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
