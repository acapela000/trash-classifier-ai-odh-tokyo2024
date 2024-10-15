'use client';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

import { TrashClassification } from '@/lib/calendar';
import { cn } from '@/lib/utils';
import { GetTrashIcon, GetTrashName } from '@/lib/calendar';

type Props = {
  children: React.ReactNode;
  trash: TrashClassification[];
  day: Date;
};

export default function ExpandedCard({ trash, children, day }: Props) {
  const t = useTranslations('ClassifierModels');

  return (
    <Popover backdrop='opaque' placement='bottom'>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className='p-3'>
            <h3
              className='text-center text-xl font-bold text-zinc-300'
              {...titleProps}
            >
              {format(day, 'd')}
            </h3>
            <div className='flex flex-col flex-wrap gap-2'>
              {trash.map((type: TrashClassification, index: number) => (
                <div
                  key={index}
                  className='flex-raw justify-left flex flex-nowrap items-center gap-2 text-left'
                >
                  <div
                    className={cn({
                      'h-fit w-fit columns-auto rounded-full p-1': true,
                      'bg-purple-200 text-purple-700':
                        type === TrashClassification.PLASTIC ||
                        type === TrashClassification.RAW_TRASH,
                      'bg-green-200 text-green-700':
                        type === TrashClassification.PET,
                      'bg-red-200 text-red-700':
                        type === TrashClassification.GLASS,
                      'bg-amber-200 text-amber-700':
                        type === TrashClassification.CARDBOARD,
                      'bg-blue-200 text-blue-700':
                        type === TrashClassification.CAN,
                    })}
                  >
                    {GetTrashIcon(type)}
                  </div>
                  <div className='font-bold'>{GetTrashName(type, t)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
