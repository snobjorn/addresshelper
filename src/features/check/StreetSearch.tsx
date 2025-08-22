import React from "react";

import { getStreetCollections } from "@/services/apiStreetCollections";
import type { ApiResponse } from "@/types/address";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useAddress } from "@/contexts/AddressContext";

function StreetSearch() {
  const { state, dispatch } = useAddress();

  const {
    streetOpen,
    streetSearchValue,
    streetResults,
    selectedStreet,
    isLoadingStreets,
  } = state;

  // Search function for streets
  const searchStreets = React.useCallback(
    async (searchTerm: string) => {
      if (searchTerm.length < 3) {
        dispatch({ type: "setStreetResults", payload: [] });
        return;
      }

      dispatch({ type: "setLoadingStreets", payload: true });
      try {
        const data = (await getStreetCollections(searchTerm)) as ApiResponse;
        if (data && data.streets && Array.isArray(data.streets)) {
          dispatch({
            type: "setStreetResults",
            payload: data.streets.slice(0, 20),
          });
        } else {
          dispatch({ type: "setStreetResults", payload: [] });
        }
      } catch (error) {
        console.error("Error searching streets:", error);
        dispatch({ type: "setStreetResults", payload: [] });
      } finally {
        dispatch({ type: "setLoadingStreets", payload: false });
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchStreets(streetSearchValue);
    }, 300); // Wait to not overload the API

    return () => clearTimeout(timeoutId);
  }, [streetSearchValue, searchStreets]);

  return (
    <Popover
      open={streetOpen}
      onOpenChange={(open) =>
        dispatch({ type: "setStreetOpen", payload: open })
      }
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={streetOpen}
          className="w-[400px] justify-between"
        >
          {selectedStreet?.streetName || "Street Name"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder="Search street..."
            value={streetSearchValue}
            onValueChange={(value) =>
              dispatch({ type: "setStreetSearchValue", payload: value })
            }
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
                    dispatch({
                      type: "setSelectedStreet",
                      payload: street,
                    });
                    dispatch({
                      type: "setStreetSearchValue",
                      payload: "",
                    });
                    dispatch({ type: "setStreetOpen", payload: false });
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStreet?.streetName === street.streetName &&
                        selectedStreet?.city === street.city
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{street.streetName}</span>
                    <span className="text-sm text-gray-500">{street.city}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StreetSearch;
