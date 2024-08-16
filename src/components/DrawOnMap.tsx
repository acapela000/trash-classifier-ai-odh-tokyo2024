'use client'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: marketIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

export default function MapComponent({ lat, long }: { lat: number, long: number }): any {
    const center = [lat, long];

    return (
        <>
            <MapContainer center={center} zoom={34} scrollWheelZoom={true}>
                <Marker position={center}>
                    <Popup>
                        Loren Sium
                    </Popup>
                </Marker>
                <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

                />
            </MapContainer>
        </>

    )
};