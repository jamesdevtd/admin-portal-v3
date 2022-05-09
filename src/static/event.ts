import { EventProps, OrderedField } from '@/types/event';

export const startingEventCreationSteps = [
  {
    id: 1,
    isEdited: false,
    isValidated: false,
  },
  {
    id: 2,
    isEdited: false,
    isValidated: false,
  },
  {
    id: 3,
    isEdited: false,
    isValidated: false,
  },
  {
    id: 4,
    isEdited: true,
    isValidated: false,
  },
  {
    id: 5,
    isEdited: false,
    isValidated: false,
  },
];

export const startingEventData = {
  additionalEvents: [{}],
  contactDetails: [{}],
  eventEndDate: null,
  eventName: null,
  eventStartDate: null,
  eventStartTime: null,
  eventYear: null,
  facilityAddress: null,
  facilityAddressString: '',
  facilityName: null,
  facilityNotes: '',
  registrationEndDate: null,
  registrationStartDate: null,
  seriesMonth: null,
};

export const startingOrderedFields: OrderedField[] = [
  {
    id: 1,
    type: 'text',
    data: {} as any,
  },
];

export const sampleBasicInfo = {
  id: 1,
  status: 'draft',
  additionalEvents: [
    {
      month: 10,
      name: 'Series 10 - October',
    },
    {
      month: 9,
      name: 'Series 9 - September',
    },
  ],
  contactDetails: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'affiliate@test.com',
      phone: '',
      id: 1,
    },
  ],
  eventEndDate: '2022-09-12T16:00:00.000Z',
  eventName: 'NY Sevens',
  eventStartDate: '2022-08-03T16:00:00.000Z',
  eventStartTime: '2022-08-03T17:15:00.000Z',
  eventYear: 2022,
  facilityAddress: [35.9642609, -115.1518127],
  facilityAddressString: '12300 Bermuda Rd, Henderson, NV 89044, USA',
  facilityName: "Randall's Island Manhattan, NY",
  facilityNotes: 'Bring your jackets!',
  registrationEndDate: '2022-08-02T16:00:00.000Z',
  registrationStartDate: '2022-05-11T16:00:00.000Z',
  seriesMonth: 8,
};

export const blankBasicInfo: EventProps = {
  id: 1,
  status: '',
  additionalEvents: [],
  contactDetails: [],
  eventEndDate: '',
  eventName: '',
  eventStartDate: '',
  eventStartTime: '',
  eventYear: 0,
  facilityAddress: [],
  facilityAddressString: '',
  facilityName: '',
  facilityNotes: '',
  registrationEndDate: '',
  registrationStartDate: '',
  seriesMonth: 0,
};
