'use client';
import React, { useState, useEffect } from 'react';
import { callJpPostApi } from '@/actions/JpPostApi';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { Input, Button } from '@nextui-org/react';


export default function FormInputZipcode() {
    const [zipcode, setZipcode] = useState('');
    const [apiRes, setApiRes] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const res = await callJpPostApi(zipcode);
        console.log(res)
        setApiRes(res[0]);

    };

    return (
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
                    className="text-white color-bg-green-400 hover:bg-green-600 rounded-md"
                //className="justify-center p-2 text-white bg-green-400 hover:bg-green-600 rounded-md" type="submit"
                >
                    <ArrowUpIcon className="w-4 h-4" />
                </Button>
            </div>
            {apiRes && (
                <div>
                    <p>Postal Code: {apiRes.postalCode}</p>
                    <p>Prefecture: {apiRes.city.pref.name}, {apiRes.city.pref.kana}</p>
                    <p>City-Disrtrict: {apiRes.city.name},{apiRes.city.kana} </p>
                    {/* <p>Town: {apiRes.town.name}, {apiRes.town.kana}</p> */}
                </div>
            )}
        </form>
    )
};

