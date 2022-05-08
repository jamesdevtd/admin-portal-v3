import ContactDetailsProps from './contactDetails';
import SeriesProps from './series';

export interface EventCreationStepProps {
  id: number;
  isEdited: boolean;
  isValidated: boolean;
}

export interface EventProps {
  id: number;
  status: 'draft' | 'published';
  additionalEvents: SeriesProps[];
  contactDetails: ContactDetailsProps[];
  eventEndDate: string; // string($date-time)
  eventName: string;
  eventStartDate: string; // string($date-time)
  eventStartTime: string; // string($date-time)
  eventYear: number;
  facilityAddress: [number, number]; // lat long array
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
  data: any;
};
