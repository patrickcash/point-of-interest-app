import React from 'react'

import Map from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';

export default function PinMap() {
  

  return (
    <Map
      initialViewState={{
        latitude: 39.8,
        longitude: -98.5,
        zoom: 4
      }}
      style={{width: "100%", height: "100%"}}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
    </Map>
  )
}
