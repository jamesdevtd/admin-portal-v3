import ContactDetailsProps from './contactDetails';

export interface AffiliateProps {
  id: number;
  leagueName: string;
  leagueLogo: EventImageProps[];
  primaryPlayingFacilityName: string;
  primaryPlayingFacilityAddressString: string;
  primaryPlayingFacilityAddress: number[]; // lat long array
  seriesPermission: SeriesPermission[];
  equipmentStatus: string;

  affiliateDetails: ContactDetailsProps[];
  isBlocked: boolean;
  createdDate: string; // string($date-time)
  createdBy: string;
  affiliateCode: string;
  status: string; // approve/deny

  contactDetails: ContactDetailsProps[];
  userAccounts: ContactDetailsProps[];
}
export interface SeriesPermission {
  permissionId: number;
  permissionname: string;
}
export interface EventImageProps {
  eventId: number;
  src: string;
}