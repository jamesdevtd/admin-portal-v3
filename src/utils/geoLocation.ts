import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';

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
