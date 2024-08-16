'use client';
import React, { useEffect, useState } from 'react';
import { callJpPostApi } from '@/actions/JpPostApi';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { Input, Button } from '@nextui-org/react';



export default function FormInputZipcode({ cf }: any) {
    const [zipcode, setZipcode] = useState((cf.postalCode as string).replace('-', ''));
    const [apiRes, setApiRes] = useState<any>('');
    const [location, setLocation] = useState<any>('');

    useEffect(() => {
        if ('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });

                // convert the latitude and longitude coordinates into a zip code using a geocoding service like Nominatim (which uses OpenStreetMap data)
                const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                fetch(geocodeUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const { address } = data;
                        if (address.postcode) {
                            setZipcode(address.postcode);
                        }
                    })
                    .catch((error) => {
                        console.error('Error converting latitude and longitude to zipcode:', error);
                    });
            });
        }
    }
        , []);

    // Convert latitude and longitude to zipcode using Google Maps Geocoding API
    //             const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;
    //             fetch(geocodeUrl)
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     const results = data.results;
    //                     if (results.length > 0) {
    //                         const addressComponents = results[0].address_components;
    //                         for (let i = 0; i < addressComponents.length; i++) {
    //                             const types = addressComponents[i].types;
    //                             if (types.includes('postal_code')) {
    //                                 const zipcode = addressComponents[i].long_name;
    //                                 setZipcode(zipcode);
    //                                 console.log('ZIPCODE:', zipcode);
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error converting latitude and longitude to zipcode:', error);
    //                 });
    //         });
    //     }
    // }, []);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const res = await callJpPostApi(zipcode);
        console.log(res)
        setApiRes(res[0]);

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label>郵便番号</label>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                        type="text"
                        isInvalid={zipcode.length !== 7}
                        value={zipcode}
                        onValueChange={(value: string) => setZipcode(value)}
                        //className='w-8 border border-emeral-600 rounded-md'
                        placeholder="1230007 (No dash between numbers)"
                    />
                    <Button
                        color="success"
                        // className="text-white color-bg-green-400 hover:bg-green-600 rounded-md"
                        className="justify-center p-2 text-white bg-green-400 hover:bg-green-600 rounded-md" type="submit"
                    >
                        <ArrowUpIcon className="w-4 h-4" />
                    </Button>
                </div>
                {/* {cf.country},
                {cf.city},
                {cf.region},
                {cf.timezone},
                {cf.postalCode},
                {cf.latitude},
                {cf.longitude},
                {cf.metroCode},
                {cf.continent},
                {cf.regionCode} */}

            </form>
            {apiRes && (
                <div>

                    <p>Postal Code: {apiRes.postalCode}</p>
                    <p>Prefecture: {apiRes.city.pref.name}, {apiRes.city.pref.kana}</p>
                    <p>City-Disrtrict: {apiRes.city.name},{apiRes.city.kana} </p>
                    <p>Town: {apiRes.name}, {apiRes.kana}</p>
                </div>
            )}
            <div>
                {location && (
                    <div>
                        <p>Latitude: {location.latitude}</p>
                        <p>Longitude: {location.longitude}</p>
                        {/* <p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span><strong>Open in Google Maps</strong></span>
                            </a>
                        </p> */}
                    </div>
                )}
            </div>
        </>
    )
};

