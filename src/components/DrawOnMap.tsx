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

export default function MapComponent({ lat, long }: { lat: any, long: any }): any {
    const center: [number, number] = [lat, long];
    const tileLayers = [
        {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: 'ArcGIS World Imagery',
        },
        {
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: 'OpenStreetMap',
        },
        {
            url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Aerosol/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 6,
            format: 'png',
            time: '',
            tilematrixset: 'GoogleMapsCompatible_Level',
            opacity: 0.75,
        }
    ];

    return (
        <>
            <MapContainer center={center} zoom={34} scrollWheelZoom={true}>
                <Marker position={center}>
                    <Popup>
                        Loren Sium
                    </Popup>
                </Marker>
                <Marker style="color: green" position={[36.5395968, 136.5835776]}>
                    <Popup>
                        Loren Sium
                    </Popup>
                </Marker>
                {/* <TileLayer
                    //url1='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    url1='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Aerosol/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}"
                    attribution='Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
                    bounds={[[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]]}
                    minZoom={1}
                    maxZoom={6}
                    format='png'
                    time=''
                    tilematrixset='GoogleMapsCompatible_Level'
                    opacity={0.75}
                /> */}
                {tileLayers.map((layer, index) => (
                    <TileLayer
                        key={index}
                        url={layer.url}
                        attribution={layer.attribution}
                        bounds={layer.bounds}
                        minZoom={layer.minZoom}
                        maxZoom={layer.maxZoom}
                        format={layer.format}
                        time={layer.time}
                        tilematrixset={layer.tilematrixset}
                        opacity={layer.opacity}
                    />
                ))}
            </MapContainer>
        </>

    )
};