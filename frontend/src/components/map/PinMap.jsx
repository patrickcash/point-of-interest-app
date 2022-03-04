import React, {useState} from 'react'
import "./pinMap.css"

import Map, {Marker, Popup} from "react-map-gl";
import { Star } from "@material-ui/icons";

import 'mapbox-gl/dist/mapbox-gl.css';

export default function PinMap() {
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [star, setStar] = useState(0);

  const handleSubmit = async (e) => {

  }

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
    >
        <Marker latitude={37.8} longitude={-122.4} color="red" />
        <Popup
          latitude={37.8}
          longitude={-122.4}
          closeButton={true}
          closeOnClick={false}
          onClose={() => {}}
          anchor="left"
        >
          <div className="popup">
            <label>Place</label>
            <h4 className="place">{title}</h4>
            <label>Review</label>
            <p className="desc">{review}</p>
            <label>Rating</label>
            <div className="stars">
              {Array(star).fill(<Star className="star" />)}
            </div>
            <label>Information</label>
            <span className="username">
              Created by <b>user</b>
            </span>
            <span className="date">today</span>
          </div>
        </Popup>
        <Popup
          latitude={37.8}
          longitude={-100.4}
          closeButton={true}
          closeOnClick={false}
          onClose={() => {}}
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
    </Map>
  )
}
