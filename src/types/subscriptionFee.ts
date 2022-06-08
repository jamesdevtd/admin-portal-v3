import UserDetails from "./userDetails";

export interface SubscriptionFee {
  id: number;
  feeAmount: string;
  country: string;
  state: string;
  validFrom: string; //date
  validTo: string | null; //date
  createdBy: UserDetails;
  createdDate: string; //date
  changedBy: UserDetails;
  changedDate: string; //date
}