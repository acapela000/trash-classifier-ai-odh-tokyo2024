'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { GetTrashIcon, TrashClassification } from '@/lib/calendar';

type Props = {
  day: Date;
  today: Date;
  firstDayOfMonth: Date;
  trash: TrashClassification[];
};

export function ExpandedCard({ day, today, firstDayOfMonth, trash }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const collapseDate = () => {
    setIsExpanded(false);
    // onCollapse();
  };

  return (
    <motion.div
      className={cn({
        'card expanded m-1': true,
        'cursor-pointer': trash.length > 0,
      })}
      layoutId='expandable-card'
      onClick={collapseDate}
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
            // 'flex h-full columns-2 flex-row flex-wrap items-center justify-center gap-1':
            // true,
            'md:-gap-x-3 grid h-full grid-cols-2 items-center justify-center gap-y-3':
              true,
            'opacity-35': !isSameMonth(day, firstDayOfMonth),
            'opacity-100': isSameMonth(day, firstDayOfMonth),
          })}
        >
          {trash.map((type: TrashClassification, index: number) => (
            <div
              key={index}
              className='items-center justify-center text-center'
            >
              <div
                className={cn({
                  'm-auto h-fit w-fit rounded-full p-1': true,
                  'bg-purple-200 text-purple-700':
                    type === TrashClassification.PLASTIC ||
                    type === TrashClassification.RAW_TRASH,
                  'bg-green-200 text-green-700':
                    type === TrashClassification.PET,
                  'bg-red-200 text-red-700': type === TrashClassification.GLASS,
                  'bg-amber-200 text-amber-700':
                    type === TrashClassification.CARDBOARD,
                  'bg-blue-200 text-blue-700': type === TrashClassification.CAN,
                })}
              >
                {GetTrashIcon(type)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
