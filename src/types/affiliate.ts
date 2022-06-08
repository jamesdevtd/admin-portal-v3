import ContactDetailsProps from './contactDetails';
import { DivisionProps } from './division';
import { SubscriptionFee } from './subscriptionFee';
import userDetailsProps from './userDetails';

export interface AffiliateProps {
  id: number;
  leagueName: string;
  leagueLogo: EventImageProps[];
  primaryPlayingFacilityName: string;
  primaryPlayingFacilityAddressString: string;
  primaryPlayingFacilityAddress: number[]; // lat long array
  maillingName: string;
  maillingAddressString: string;
  maillingAddress: number[]; // lat long array
  seriesPermission: SeriesPermission[];
  equipmentStatus: string;

  affiliateDetails: ContactDetailsProps[];
  isBlocked: boolean;
  createdDate: string; // string($date-time)
  createdBy: string;
  affiliateCode: string;
  status: string; // approve/deny

  contactDetails: ContactDetailsProps[];
  userAccounts: userDetailsProps[];
  subscriptionFee: SubscriptionFee[];
  divisionDetails: DivisionProps[];
}
export interface SeriesPermission {
  permissionId: number;
  permissionname: string;
}
export interface EventImageProps {
  eventId: number;
  src: string;
}
