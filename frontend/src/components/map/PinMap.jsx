import React, {useEffect, useRef, useState} from 'react'
import "./pinMap.css"
import 'mapbox-gl/dist/mapbox-gl.css';

import axios from "axios";
import Map, {Marker, Popup} from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";

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
        {pins.map(pin => (
          <>
            <Marker key={"marker"+pin._id} latitude={pin.lat} longitude={pin.long} >
              <Room
                key={"room"+pin._id}
                style={{color: currentUsername === pin.username ? "red" : "blue", cursor: "pointer"}}
                onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
              />
            </Marker>
            {pin._id === currentPlaceId && (
              <Popup
                key={"popup"+pin._id} 
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="popup">
                  <label>Place</label>
                  <h4 className="place">{pin.title}</h4>
                  <label>Review</label>
                  <p className="desc">{pin.review}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(pin.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{pin.username}</b>
                  </span>
                  <span className="date">{format(pin.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
            >
              <Room
                style={{color: "red", cursor: "pointer"}}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div className="popup">
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Review</label>
                  <textarea
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
      </Map>
    );
}
