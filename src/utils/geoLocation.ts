import { LatLngTuple } from 'leaflet';
import Geocode from 'react-geocode';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';

import { googleApiKey } from '@/static/geolocation';

export const handleLocationInput = async (address: string, placeId: string) => {
  const results = await geocodeByAddress(address);
  console.log('results: ', results);
  const latLng = await getLatLng(results[0]);
  console.log('latLng: ', latLng);
  const [place] = await geocodeByPlaceId(placeId);
  console.log('[place]: ', place);
  const { long_name: postalCode = '' } =
    place.address_components.find((c) => c.types.includes('postal_code')) || {};
  console.log('postalCode', postalCode);

  return results;
};

export const handleGetAddressByLatLng = async (val: LatLngTuple) => {
  let address = '';
  Geocode.setApiKey(googleApiKey);
  await Geocode.fromLatLng(val[0].toString(), val[1].toString()).then(
    (response: any) => {
      console.log('response.results: ', response.results);
      address = response.results[0].formatted_address;
    },
    (error: any) => {
      console.error(error);
    }
  );
  return address;
};
