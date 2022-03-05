import React, {useEffect, useRef, useState} from 'react'
import "./pinMap.css"
import 'mapbox-gl/dist/mapbox-gl.css';

import axios from "axios";
import Map from "react-map-gl";
import Pin from '../pin/Pin';
import NewPin from '../pin/NewPin';

export default function PinMap() {
  const mapRef = useRef(null);
  const [pins, setPins] = useState([]);
  const [currentUsername, setCurrentUsername] = useState("patrick");
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [star, setStar] = useState(0);

  const handleMarkerClick = (id, lat, long) => {
    mapRef.current.flyTo({center: [long, lat]});
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    setNewPlace({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      review,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const pins = await axios.get("/pins");
        setPins(pins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  useEffect(() => {
    if (mapRef?.current){
      mapRef.current.on('dblclick', (e) => {
        handleAddClick(e)
      });
    } 
  });

  return (
      <Map
        initialViewState={{
          latitude: 39.8,
          longitude: -98.5,
          zoom: 4
        }}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        ref={mapRef} 
      >
        {pins.map(pin => <Pin {...{pin, currentPlaceId, currentUsername, handleMarkerClick, setCurrentPlaceId}}/>)}
        {newPlace && <NewPin {...{newPlace, setNewPlace, setTitle, setReview, setStar, handleSubmit}}/>}
      </Map>
    );
}
