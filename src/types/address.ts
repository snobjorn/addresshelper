// Type for street results from API
export interface StreetResult {
  countryCode: string;
  city: string;
  streetName: string;
  streetIds: number[];
  isAliasMatch: string;
}

// Type for street number results from API
export interface StreetNumberResult {
  streetNo: string;
  entrance: string;
  addressId: string;
  [key: string]: unknown;
}

// Type for Saved Addresses
export interface SavedAddress {
  streetName?: string;
  streetNumber?: string;
  city?: string;
}

// API Response interfaces
export interface ApiResponse {
  streets: StreetResult[];
}

export interface StreetNumbersApiResponse {
  streetNumbers: StreetNumberResult[];
}
