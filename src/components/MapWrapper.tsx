'use client';
import React, { useState } from 'react';
import MapComponent from '@/components/DrawOnMap';
import FormInputZipcode from '@/components/FormInputZipcode';

interface Props {
  cf?: any;
}

export default function MapWrapper({ cf }: Props) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });

  return (
    <>
      <FormInputZipcode cf={cf} setLocation={setLocation} location={location} />
      <MapComponent lat={location.latitude} long={location.longitude} />
    </>
  );
}
