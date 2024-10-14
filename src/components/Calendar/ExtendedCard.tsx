'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  GetTrashColor,
  GetTrashIcon,
  TrashClassification,
} from '@/lib/calendar';

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
      className='card expanded m-1'
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
            'flex h-full flex-row flex-wrap items-center justify-center gap-1':
              true,
            'opacity-35': !isSameMonth(day, firstDayOfMonth),
            'opacity-100': isSameMonth(day, firstDayOfMonth),
          })}
        >
          {trash.map((type: TrashClassification, index: number) => (
            <div
              key={index}
              className={cn({
                'rounded-full p-1': true,
                ...GetTrashColor(type),
              })}
            >
              {GetTrashIcon(type)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
