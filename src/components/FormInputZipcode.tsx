'use client';
import React, { useEffect, useState } from 'react';
import { callJpPostApi } from '@/actions/JpPostApi';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { Input, Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

interface Props {
    cf?: any,
    setLocation: any,
    location: { latitude: number, longitude: number },
}

export default function FormInputZipcode({ cf, setLocation, location }: Props) {
    const [zipcode, setZipcode] = useState((cf?.postalCode as string).replace('-', '') ?? '');
    const [apiRes, setApiRes] = useState<any>('');
    // const [location, setLocation] = useState<any>('');
    // const [location, setLocation] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });

    useEffect(() => {
        if ('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords
                setLocation({ latitude: latitude, longitude: longitude });

                // convert the latitude and longitude coordinates into a zip code using a geocoding service like Nominatim (which uses OpenStreetMap data)
                const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                fetch(geocodeUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const { address } = data;
                        if (address.postcode) {
                            setZipcode((address.postcode as string).replace('-', ''));
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

        // TODO: Extract latitude and longitude from the response
        // Current api from JP Post doesnt return the lat and long
        // const newLatitude = res[0].latitude;
        // const newLongitude = res[0].longitude;

        // setLocation({ latitude: newLatitude, longitude: newLongitude });
    };

    const f = useTranslations('FormInputZipcode');

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label>{f('label')}</label>
                <div className="flex w-full mb-6 gap-4">
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

                    <p>{f('postalCode')}: {apiRes.postalCode}</p>
                    <p>{f('pref')}: {apiRes.city.pref.name}, {apiRes.city.pref.kana}</p>
                    <p>{f('city-district')}: {apiRes.city.name},{apiRes.city.kana} </p>
                    <p>{f('town')}: {apiRes.name}, {apiRes.kana}</p>
                </div>
            )}
            <div>
                {location && (
                    <div>
                        {/* <p>Latitude: {location.latitude}</p>
                        <p>Longitude: {location.latitude}</p> */}
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

