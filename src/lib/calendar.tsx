import React, { useState } from 'react';
import { format } from 'date-fns';

import { BoxIcon } from '@/icons/BoxIcon';
import { PlasticBagIcon } from '@/icons/PlasticBagIcon';
import { PetBottleIcon } from '@/icons/PetBottleIcon';
import { CanIcon } from '@/icons/CanIcon';
import { WineGlassIcon } from '@/icons/WineGlassIcon';
import { AppleIcon } from '@/icons/AppleIcon';

export enum TrashClassification {
  PLASTIC = 0,
  PET = 1,
  GLASS = 2,
  CARDBOARD = 3,
  RAW_TRASH = 4,
  CAN = 5,
}

export function GetTrashColor(type: TrashClassification) {
  return {
    'bg-purple-200 text-purple-700':
      type === TrashClassification.PLASTIC ||
      type === TrashClassification.RAW_TRASH,
    'bg-green-200 text-green-700': type === TrashClassification.PET,
    'bg-red-200 text-red-700': type === TrashClassification.GLASS,
    'bg-amber-200 text-amber-700': type === TrashClassification.CARDBOARD,
    'bg-blue-200 text-blue-700': type === TrashClassification.CAN,
  };
}

export function GetTrashIcon(trash: TrashClassification): React.ReactNode {
  switch (trash) {
    case TrashClassification.PLASTIC:
      return <PlasticBagIcon />;
    case TrashClassification.PET:
      return <PetBottleIcon />;
    case TrashClassification.GLASS:
      return <WineGlassIcon />;
    case TrashClassification.CARDBOARD:
      return <BoxIcon />;
    case TrashClassification.RAW_TRASH:
      return <AppleIcon />;
    case TrashClassification.CAN:
      return <CanIcon />;
    default:
      return <AppleIcon />;
  }
}

export function usePrevious<T>(value: T) {
  const [tuple, setTuple] = useState<[T | null, T]>([null, value]);

  if (tuple[1] !== value) {
    setTuple([tuple[1], value]);
  }

  return tuple[0] || value;
}

// START MOCK DATA
// Icons per day
const MockIconList: [string, TrashClassification[]][] = [
  ['2024-10-6', [TrashClassification.PLASTIC, TrashClassification.PET]],
  ['2024-10-7', [TrashClassification.GLASS]],
  ['2024-10-20', [TrashClassification.CARDBOARD]],
  [
    '2024-10-30',
    [
      TrashClassification.RAW_TRASH,
      TrashClassification.CAN,
      TrashClassification.CARDBOARD,
      TrashClassification.PET,
    ],
  ],
  ['2024-10-24', [TrashClassification.PLASTIC, TrashClassification.PET]],
];

export function GetMockTrash(day: Date): TrashClassification[] {
  const key: string = format(day, 'yyyy-MM-d');
  const trash = MockIconList.find((t) => t[0] === key);

  return (trash && trash[1]) ?? [];
}
// END MOCK DATA
