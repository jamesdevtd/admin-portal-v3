import { starterDivisions } from './division';

import { AffiliateProps } from '@/types/affiliate';
import ContactDetails from '@/types/contactDetails';
import { SubscriptionFee } from '@/types/subscriptionFee';
import UserDetails from '@/types/userDetails';

export const contactDetails: ContactDetails[] = [
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
export const userDetails: UserDetails[] = [
  {
    id: 1,
    firstName: 'Jimmy',
    lastName: 'Cricket',
    role: 'League Manager',
    email: 'thecricketlives@gmail.com',
    phone: '+1 (555) 123 4567',
  },
];

export const subscriptionFee: SubscriptionFee[] = [
  {
    id: 1,
    feeAmount: '60',
    country: 'United States',
    state: 'NY',
    validFrom: '2022-08-03T16:00:00.000Z', //date
    validTo: null, //date
    createdBy: {
      id: 1,
      firstName: 'Jimmy',
      lastName: 'Cricket',
      role: 'League Manager',
      email: 'thecricketlives@gmail.com',
      phone: '+1 (555) 123 4567',
    },
    createdDate: '2022-08-03T16:00:00.000Z', //date
    changedBy: {
      id: 1,
      firstName: 'Jimmy',
      lastName: 'Cricket',
      role: 'League Manager',
      email: 'thecricketlives@gmail.com',
      phone: '+1 (555) 123 4567',
    },
    changedDate: '2022-08-03T16:00:00.000Z', //date
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
  subscriptionFee: subscriptionFee,
  divisionDetails: starterDivisions,
};
