import React from 'react'
import "./newPin.css"

import {Marker, Popup} from "react-map-gl";
import { Room } from "@material-ui/icons";

export default function NewPin(props) {
  const {newPlace, setNewPlace, setTitle, setReview, setStar, handleSubmit} = props;
  return (
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
  )
}
