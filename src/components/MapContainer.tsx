import { FunctionComponent, useEffect } from "react";
import React from "react";

import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";

interface MapContainerDisplayProps {
  location: number[];
}

const MapContainerDisplay: FunctionComponent<MapContainerDisplayProps> = ({
  location,
}) => {
  const map = useMap();
  useEffect(() => {}, [map]);
  const position = {
    lat: location[0],
    lng: location[1],
  };
  return (
    <>
      <div className="map-container">
        <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
          <AdvancedMarker position={position} />
        </Map>
      </div>
    </>
  );
};

export default MapContainerDisplay;
