import React from 'react'
import "./pin.css"

import {Marker, Popup} from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";

export default function Pin(props) {
  const {pin, currentPlaceId, currentUsername, handleMarkerClick, setCurrentPlaceId} = props;
  return (
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
            <p className="review">{pin.review}</p>
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
  )
}
