import { icon } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import styles from './LeafletMap.module.scss';

type MapProps = {
  coordinates: number[];
  style: { [key: string]: string };
  colorFiltered?: boolean
}

const LeafletMap = ({ coordinates, style, colorFiltered }: MapProps) => {

  const [map, setMap] = useState<any>({});

  const iconImg = icon({
    iconUrl: '../images/marker-icon.png',
    iconSize: [20, 30],
  });

  useEffect(() => {
    // TODO: potental map state modifiers here
  }, [map]);

  return (
    <div className={`${styles.leafletMap} ${colorFiltered && styles['filtered']}`}>
      <MapContainer
        center={[coordinates[0], coordinates[1]]}
        zoom={14}
        scrollWheelZoom={true}
        style={style}
        whenReady={() => setMap}
        doubleClickZoom={false}
        dragging={true}
        closePopupOnClick={false}
        zoomControl={false}
        trackResize={false}
        touchZoom={false}
      >
        <TileLayer
          attribution=''
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker icon={iconImg} position={[coordinates[0], coordinates[1]]}></Marker>
      </MapContainer>
    </div>
  )
};

export default LeafletMap;
