'use client'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import React, { useEffect, useState } from 'react';
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

// Used to recenter the map to new coordinates
const MapRecenter = ({ lat, lng, zoomLevel }: { lat: number, lng: number, zoomLevel: number }) => {
    const map = useMap();

    useEffect(() => {
        // Fly to that coordinates and set new zoom level
        map.flyTo([lat, lng], zoomLevel);
    }, [lat, lng]);
    return null;
};

export default function MapComponent({ lat, long }: { lat: any, long: any }): React.ReactNode {
    // const [location, setLocation] = useState({ latitude: null, longitude: null });
    const tileLayers = [
        {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: 'ArcGIS World Imagery',
        },
        {
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: 'OpenStreetMap',
        },
        // {
        //     url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Aerosol/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
        //     attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        //     bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
        //     minZoom: 1,
        //     maxZoom: 6,
        //     format: 'png',
        //     time: '',
        //     tilematrixset: 'GoogleMapsCompatible_Level',
        //     opacity: 0.75,
        // }
    ];
    const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [20, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <section className='mb-16 w-full h-fit'>
            {lat != 0 && long != 0 && (
                <MapContainer center={[lat, long]} zoom={17} scrollWheelZoom={true} className='z-0 w-0 h-0 mt-4 mb-8'>
                    {/* <Marker position={[latitude, longitude]} icon={greenIcon}>
                    <Popup>
                        Loren Sium
                    </Popup>
                </Marker> */}
                    <MapRecenter lat={lat} lng={long} zoomLevel={17} />
                    <Marker position={[lat, long]} icon={greenIcon}>
                        <Popup>
                            Current location
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
                        // bounds={layer.bounds}
                        // minZoom={layer.minZoom}
                        // maxZoom={layer.maxZoom}
                        // format={layer.format}
                        // time={layer.time}
                        // tilematrixset={layer.tilematrixset}
                        // opacity={layer.opacity}
                        />
                    ))}
                </MapContainer >)}
        </section >

    )
};