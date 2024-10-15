'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { Avatar, AvatarGroup } from '@nextui-org/react';

import { cn } from '@/lib/utils';
import { GetTrashIcon, TrashClassification } from '@/lib/calendar';
import ExpandedCard from './ExpendedCard';

type Props = {
  day: Date;
  today: Date;
  firstDayOfMonth: Date;
  trash: TrashClassification[];
};

export function Card({ day, today, firstDayOfMonth, trash }: Props) {
  const [maxTrash, setMaxTrash] = React.useState<number>(4);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1200) setMaxTrash(4);
      else if (width > 1180) setMaxTrash(2);
      else setMaxTrash(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // don't add fetchData here otherwise it will be called infinitely

  return (
    <ExpandedCard trash={trash} day={day}>
      <motion.div
        className={cn({
          'card expanded m-1': true,
          'cursor-pointer': trash.length > 0,
        })}
        layoutId='expandable-card'
      >
        <div
          className={cn({
            'm-1 h-fit min-h-full rounded-md bg-zinc-50 p-1 md:p-2': true,
            'bg-zinc-200': isSameDay(day, today),
            'text-white': isSameDay(day, today),
            'text-gray-300': !isSameMonth(day, firstDayOfMonth),
            'text-gray-700': isSameMonth(day, firstDayOfMonth),
          })}
        >
          <div className='relative left-0 top-0 h-8 w-8 items-center justify-center rounded-full text-center text-tiny'>
            {format(day, 'd')}
          </div>
          <div
            className={cn({
              'm-auto h-full items-center justify-center': true,
              'w-fit': trash.length == 1,
              'opacity-35': !isSameMonth(day, firstDayOfMonth),
              'opacity-100': isSameMonth(day, firstDayOfMonth),
            })}
          >
            <AvatarGroup max={maxTrash}>
              {trash.map((type: TrashClassification, index: number) => (
                <Avatar
                  key={index}
                  classNames={{
                    base: cn({
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
                    }),
                  }}
                  showFallback
                  fallback={GetTrashIcon(type)}
                />
              ))}
            </AvatarGroup>
          </div>
        </div>
      </motion.div>
    </ExpandedCard>
  );
}
