import { OrderedField } from '@/types/event';

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
