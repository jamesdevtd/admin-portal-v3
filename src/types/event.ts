import ContactDetailsProps from './contactDetails';
import SeriesProps from './series';

export interface EventCreationStepProps {
  id: number;
  isEdited: boolean;
  isValidated: boolean;
}

export interface EventProps {
  // TO DO: we might need more data like owner info, event type, event division etc.
  id: number;
  status: string;
  additionalEvents: SeriesProps[];
  contactDetails: ContactDetailsProps[];
  eventEndDate: string; // string($date-time)
  eventName: string;
  eventStartDate: string; // string($date-time)
  eventStartTime: string; // string($date-time)
  eventYear: number;
  facilityAddress: number[]; // lat long array
  facilityAddressString: string; // String address
  facilityName: string;
  facilityNotes: string;
  registrationEndDate: string; // string($date-time)
  registrationStartDate: string; // string($date-time)
  seriesMonth: number;
}

export interface EventImageProps {
  eventId: number;
  src: string;
}

export interface CroppedImageProps {
  id: number;
  src: string;
}
export interface CropperModalProps {
  imgId: number;
  src: string;
  isOpen: boolean;
  isReCrop: boolean;
}

export type OrderedField = {
  id: number;
  type: 'text' | 'image' | 'video';
  html?: string;
  // TODO: define text, image, & video type data inteface
  data: any;
};

export type ClonedEventProps = {
  id: number;
  isEdited: boolean;
  eventName: string;
  eventStartDate: string; // string($date-time)
  eventEndDate: string; // string($date-time)
  eventStartTime: string; // string($date-time)
  registrationStartDate: string; // string($date-time)
  registrationEndDate: string; // string($date-time)
  facilityAddress: number[]; // lat long array
  facilityAddressString: string; // String address
  facilityName: string;
};
