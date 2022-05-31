import { AffiliateProps } from "@/types/affiliate";

export const blankAffiliateInfo: AffiliateProps = {
  id: 1,
  leagueLogo: [],
  leagueName: '',
  primaryPlayingFacilityName: '',
  primaryPlayingFacilityAddressString: '',
  primaryPlayingFacilityAddress: [], // lat long array
  seriesPermission: [],
  equipmentStatus: '',

  affiliateDetails: [],
  isBlocked: false,
  createdDate: '', // string($date-time)
  createdBy: '',
  affiliateCode: '',
  status: '', // approve/deny

  contactDetails: [],
  userAccounts: [],
};