import { starterDivisions } from './division';

import { AffiliateProps, AffiliateStatementProps } from '@/types/affiliate';
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

  affiliateDetails: {
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  isBlocked: false,
  createdDate: '', // string($date-time)
  createdBy: '',
  affiliateCode: '',
  status: '', // approve/deny

  contactDetails: contactDetails,
  userAccounts: userDetails,
  subscriptionFee: subscriptionFee,
  divisionDetails: starterDivisions,

  name: "",
  image: "",
  imageContentType: "",
  leagueManagerUserId: "",
  venueName: "",
  mailingLocation: null,
  venueLocation: null,

  lead: null,
  licenseDate: null,
  nextGearRenewalDate: null,
  payoutAccountId: null,
  payoutAccountOnboardingComplete: false,
  referral: null,
};

export const staticStatements: AffiliateStatementProps[] = [
  {
    id: 1,
    paymentDate: '1654843422', // date-time
    amount: '50.00',
    event: 'NY Sevens',
    eventType: 'open',
    description: 'Adult Mens Competitive, Youth Mixed U12',
  },
  {
    id: 2,
    paymentDate: '1654843422', // date-time
    amount: '50.00',
    event: 'NY Sevens',
    eventType: 'pro',
    description: 'Player fee for Open Series 2',
  },
  {
    id: 3,
    paymentDate: '1654843422', // date-time
    amount: '50.00',
    event: 'Thanksgiving Throwdown',
    eventType: 'open',
    description: 'Player fee for Open Series 3',
  },
  {
    id: 4,
    paymentDate: '1654843422', // date-time
    amount: '50.00',
    event: 'NY Sevens',
    eventType: 'pro',
    description: 'Player fee for Open Series 4',
  },
  {
    id: 5,
    paymentDate: '1654843422', // date-time
    amount: '50.00',
    event: 'St Patties Tournament',
    eventType: 'open',
    description: 'Player fee for Open Series 5',
  }
];