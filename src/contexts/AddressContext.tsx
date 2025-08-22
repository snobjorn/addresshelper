import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type {
  StreetResult,
  StreetNumberResult,
  SavedAddress,
} from "@/types/address";

// State interface
interface AddressState {
  // Street search state
  streetSearchValue: string;
  streetResults: StreetResult[];
  selectedStreet: StreetResult | null;
  isLoadingStreets: boolean;

  // Street number state
  streetNumberResults: StreetNumberResult[];
  selectedStreetNumber: string;
  isLoadingStreetNumbers: boolean;

  // Saved addresses state
  savedAddresses: SavedAddress[];

  // UI state for street and street number popovers
  streetOpen: boolean;
  streetNumberOpen: boolean;
}

// Action types
type AddressAction =
  | { type: "setStreetSearchValue"; payload: string }
  | { type: "setStreetResults"; payload: StreetResult[] }
  | { type: "setSelectedStreet"; payload: StreetResult | null }
  | { type: "setLoadingStreets"; payload: boolean }
  | { type: "setStreetNumberResults"; payload: StreetNumberResult[] }
  | { type: "setSelectedStreetNumber"; payload: string }
  | { type: "setLoadingStreetNumbers"; payload: boolean }
  | { type: "addSavedAddress"; payload: SavedAddress }
  | { type: "resetSavedAddresses" }
  | { type: "setStreetOpen"; payload: boolean }
  | { type: "setStreetNumberOpen"; payload: boolean }
  | { type: "resetForm" };

// Context type
interface AddressContextType {
  state: AddressState;
  dispatch: React.Dispatch<AddressAction>;
}

// Initial state
const initialState: AddressState = {
  streetSearchValue: "",
  streetResults: [],
  selectedStreet: null,
  isLoadingStreets: false,
  streetNumberResults: [],
  selectedStreetNumber: "",
  isLoadingStreetNumbers: false,
  savedAddresses: [],
  streetOpen: false,
  streetNumberOpen: false,
};

// Reducer function
function addressReducer(
  state: AddressState,
  action: AddressAction
): AddressState {
  switch (action.type) {
    case "setStreetSearchValue":
      return { ...state, streetSearchValue: action.payload };

    case "setStreetResults":
      return { ...state, streetResults: action.payload };

    case "setSelectedStreet":
      return { ...state, selectedStreet: action.payload };

    case "setLoadingStreets":
      return { ...state, isLoadingStreets: action.payload };

    case "setStreetNumberResults":
      return { ...state, streetNumberResults: action.payload };

    case "setSelectedStreetNumber":
      return { ...state, selectedStreetNumber: action.payload };

    case "setLoadingStreetNumbers":
      return { ...state, isLoadingStreetNumbers: action.payload };

    case "addSavedAddress":
      return {
        ...state,
        savedAddresses: [...state.savedAddresses, action.payload],
        selectedStreet: null,
        selectedStreetNumber: "",
        streetSearchValue: "",
        streetOpen: false,
        streetNumberOpen: false,
      };

    case "resetSavedAddresses":
      return { ...state, savedAddresses: [] };

    case "setStreetOpen":
      return { ...state, streetOpen: action.payload };

    case "setStreetNumberOpen":
      return { ...state, streetNumberOpen: action.payload };

    case "resetForm":
      return {
        ...state,
        selectedStreet: null,
        selectedStreetNumber: "",
        streetSearchValue: "",
        streetResults: [],
        streetNumberResults: [],
        streetOpen: false,
        streetNumberOpen: false,
      };

    default:
      return state;
  }
}

// Create context
const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Provider component
function AddressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
}

// Custom hook to use the context
function useAddress() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
}

export { AddressProvider, useAddress };
