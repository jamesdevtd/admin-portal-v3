import { AffiliateProps } from '@/types/affiliate';
import ContactDetails from '@/types/contactDetails';
import UserDetails from '@/types/userDetails';

const contactDetails: ContactDetails[] = [
  {
    id: 1,
    firstName: 'Jimmy',
    lastName: 'Cricket',
    email: 'thecricketlives@gmail.com',
    phone: '+1 (555) 123 4567',
  },
  {
    id: 2,
    firstName: 'Jimmy 2',
    lastName: 'Cricket',
    email: 'thecricketlives2@gmail.com',
    phone: '+1 (555) 123 4567',
  },
];
const userDetails: UserDetails[] = [
  {
    id: 1,
    firstName: 'Jimmy',
    lastName: 'Cricket',
    role: 'League Manager',
    email: 'thecricketlives@gmail.com',
    phone: '+1 (555) 123 4567',
  },
];

export const blankAffiliateInfo: AffiliateProps = {
  id: 1,
  leagueLogo: [],
  leagueName: '',
  primaryPlayingFacilityName: '',
  primaryPlayingFacilityAddressString: '',
  primaryPlayingFacilityAddress: [], // lat long array
  maillingName: '',
  maillingAddressString: '',
  maillingAddress: [], // lat long array
  seriesPermission: [],
  equipmentStatus: '',

  affiliateDetails: [],
  isBlocked: false,
  createdDate: '', // string($date-time)
  createdBy: '',
  affiliateCode: '',
  status: '', // approve/deny

  contactDetails: contactDetails,
  userAccounts: userDetails,
};
