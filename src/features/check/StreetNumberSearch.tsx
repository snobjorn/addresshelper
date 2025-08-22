import React from "react";

import { getStreetNumbersForCollection } from "@/services/apiStreetNumbersForCollection";
import type { StreetNumbersApiResponse } from "@/types/address";

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
import { ChevronsUpDownIcon } from "lucide-react";
import { useAddress } from "@/contexts/AddressContext";

function StreetNumberSearch() {
  const { state, dispatch } = useAddress();

  const {
    streetNumberOpen,
    selectedStreetNumber,
    streetNumberResults,
    selectedStreet,
  } = state;

  // Search for street numbers. Limit is 100 (instead of default 30 from API).
  const searchStreetNumbers = React.useCallback(
    async (streetId: number) => {
      if (streetId) {
        const data = (await getStreetNumbersForCollection(
          streetId,
          100
        )) as StreetNumbersApiResponse;
        if (data && data.streetNumbers && Array.isArray(data.streetNumbers)) {
          dispatch({
            type: "setStreetNumberResults",
            payload: data.streetNumbers,
          });
        }
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (selectedStreet) {
      searchStreetNumbers(selectedStreet.streetIds[0]);
    }
  }, [selectedStreet, searchStreetNumbers]);

  {
    /* Get list of streets numbers from API, only if street is selected, when clicking the button */
  }
  return (
    <Popover
      open={streetNumberOpen}
      onOpenChange={(open) =>
        dispatch({ type: "setStreetNumberOpen", payload: open })
      }
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={streetNumberOpen}
          className="w-[200px] justify-between"
          disabled={!selectedStreet}
        >
          {selectedStreetNumber || "Street Number"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Select street number..."
            value={selectedStreetNumber}
            onValueChange={(value) =>
              dispatch({
                type: "setSelectedStreetNumber",
                payload: value,
              })
            }
          />
          <CommandList>
            <CommandEmpty>No street numbers found.</CommandEmpty>
            <CommandGroup>
              {streetNumberResults
                .filter(
                  (streetNumber, index, self) =>
                    index ===
                    self.findIndex((s) => s.streetNo === streetNumber.streetNo)
                )
                .sort((a, b) => Number(a.streetNo) - Number(b.streetNo))
                .map((streetNumber) => (
                  <CommandItem
                    key={streetNumber.addressId}
                    value={streetNumber.addressId}
                    onSelect={() => {
                      const value = streetNumber.entrance
                        ? String(streetNumber.streetNo) +
                          " " +
                          streetNumber.entrance
                        : String(streetNumber.streetNo);
                      dispatch({
                        type: "setSelectedStreetNumber",
                        payload: value,
                      });
                      dispatch({
                        type: "setStreetNumberOpen",
                        payload: false,
                      });
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
  );
}

export default StreetNumberSearch;
