import ContactDetailsProps from './contactDetails';
import { DivisionProps } from './division';
import { SubscriptionFee } from './subscriptionFee';
import userDetailsProps from './userDetails';

export interface AffiliateProps {
  id: number;
  leagueName: string | null;
  leagueLogo: EventImageProps[];
  primaryPlayingFacilityName: string;
  primaryPlayingFacilityAddressString: string;
  primaryPlayingFacilityAddress: number[]; // lat long array
  maillingName: string | null;
  maillingAddressString: string | null;
  maillingAddress: number[]; // lat long array
  seriesPermission: SeriesPermission[];
  equipmentStatus: string | null;

  affiliateDetails: ContactDetailsProps;
  isBlocked: boolean;
  createdDate: string; // string($date-time)
  createdBy: string;
  affiliateCode: string | null;
  status: string | null; // approve/deny

  contactDetails: ContactDetailsProps[];
  userAccounts: userDetailsProps[];
  subscriptionFee: SubscriptionFee[];
  divisionDetails: DivisionProps[];

  // actual from api
  name: string;
  image: string;
  imageContentType: string;
  leagueManagerUserId: string;
  venueName: string;
  mailingLocation: Location | null;
  venueLocation: Location | null;

  lead: string | null;
  licenseDate: string | null;
  nextGearRenewalDate: string | null;
  payoutAccountId: string | null;
  payoutAccountOnboardingComplete: boolean;
  referral: string | null;
}
export interface SeriesPermission {
  permissionId: number;
  permissionname: string;
}
export interface EventImageProps {
  eventId: number;
  src: string;
}

export interface AffiliateStatementProps {
  id: number;
  paymentDate: string; // date-time
  amount: string;
  event: string;
  eventType: string;
  description: string;
}
export interface Location {
  id: number;
  city: string | null;
  continent: string | null;
  country: string | null;
  latitude: string | null;
  line1: string | null;
  line2: string | null;
  longitude: string | null;
  state: string | null;
}
