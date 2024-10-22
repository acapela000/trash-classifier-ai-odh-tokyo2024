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

export function GetTrashName(
  trash: TrashClassification,
  t: (key: string) => string
): string {
  switch (trash) {
    case TrashClassification.PLASTIC:
      return t('plastic');
    case TrashClassification.PET:
      return t('petbottle');
    case TrashClassification.GLASS:
      return t('glass');
    case TrashClassification.CARDBOARD:
      return t('carton-paper');
    case TrashClassification.RAW_TRASH:
      return t('raw-trash');
    case TrashClassification.CAN:
      return t('can');
    default:
      return '';
  }
}

// START MOCK DATA
// Icons per day
const MockIconList: [string, TrashClassification[]][] = [
  ['2024-08-31', [TrashClassification.CAN, TrashClassification.PET]],
  ['2024-09-9', [TrashClassification.PLASTIC, TrashClassification.PET]],
  ['2024-09-15', [TrashClassification.RAW_TRASH]],
  ['2024-09-26', [TrashClassification.CARDBOARD]],
  ['2024-09-30', [TrashClassification.GLASS, TrashClassification.PET]],
  ['2024-10-18', [TrashClassification.CAN, TrashClassification.PLASTIC]],
  ['2024-10-6', [TrashClassification.CAN, TrashClassification.PET]],

  ['2024-10-7', [TrashClassification.CARDBOARD]],
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
