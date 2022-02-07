// here the City type is just a string,
// but I declare here in case we'd like to
// restrict it to a known set or enum in the
// future
export type City = string;

// this is a typescript Type created from
// the type definitions in the "simplyRETS.types.ts"
// file. But for brevity, I omitted declaring
// other subtypes in that file and instead just
// listed those properties here as "any"
// I also did not check which types are
// expected to be required vs. optional
// for this example
export type Listing = {
  address: any;
  agent: any;
  agreement: string;
  association: any;
  coAgent: any;
  disclaimer: string;
  favoriteCount: number;
  geo: any;
  internetAddressDisplay: string;
  internetEntireListingDisplay: string;
  leaseTerm: string;
  leaseType: string;
  listDate: string;
  listingId: string;
  listPrice: number;
  mls: any;
  mlsId: number;
  modified: string;
  office: any;
  originalListPrice: string;
  photos: string[];
  privateRemarks: string;
  property: any;
  remarks: string;
  sales: any;
  school: any;
  showingContactName: string;
  showingContactPhone: string;
  showingInstructions: string;
  tax: any;
  terms: string;
  virtualTourUrl: string;
};
