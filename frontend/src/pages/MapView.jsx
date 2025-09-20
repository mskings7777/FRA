import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

export default function MapView({ state, district, village }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/map-data", { params: { state, district, village }})
      .then(res => setMarkers(res.data));
  }, [state, district, village]);

  return (
    <MapContainer center={[23.25, 77.41]} zoom={6} style={{height:"500px", width:"100%"}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {markers.map((m, i) => (
        <Marker key={i} position={[m.lat, m.lon]}>
          <Popup>
            <b>Patta ID:</b> {m.patta_id}<br/>
            <b>Holder:</b> {m.holder}<br/>
            <b>Status:</b> {m.status}<br/>
            <b>Priority:</b> {m.priority}<br/>
            <b>Scheme:</b> {m.scheme}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
