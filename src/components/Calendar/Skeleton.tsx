'use client';
import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isSameYear,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { GetMockTrash, usePrevious } from '@/lib/calendar';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Card } from './Card';
import { getLocale } from '@/lib/utils';

const variants = {
  enter: ({ direction, width }: { direction: number; width: number }) => {
    return {
      x: direction * width,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: ({ direction, width }: { direction: number; width: number }) => {
    return {
      zIndex: 0,
      x: direction * -width,
      opacity: 0,
    };
  },
};

export function Calendar() {
  const locale = useLocale();
  const c = useTranslations('Calendar');

  const [ref, bounds] = useMeasure();
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMyyyy'));
  const prevMonth = usePrevious(currentMonth);

  const direction = prevMonth < currentMonth ? 1 : -1;

  const firstDayOfMonth = startOfMonth(
    parse(currentMonth, 'MMyyyy', new Date())
  );

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayOfMonth),
      end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });
  }, [firstDayOfMonth]);

  const showToday = useMemo(() => {
    return (
      !isSameMonth(today, parse(currentMonth, 'MMyyyy', new Date())) ||
      !isSameYear(today, parse(currentMonth, 'MMyyyy', new Date()))
    );
  }, [today, currentMonth]);

  return (
    <div className='flex h-screen w-full items-center justify-center md:px-24'>
      <div className='w-full rounded-lg border bg-white p-2 shadow md:p-4'>
        <div className='mb-1 flex items-center overflow-hidden px-2'>
          <div className='-gap-2 flex flex-col'>
            <button
              className='text-gray-500'
              onClick={() => {
                setCurrentMonth(
                  format(
                    addMonths(parse(currentMonth, 'MMyyyy', new Date()), 1),
                    'MMyyyy'
                  )
                );
              }}
            >
              <ChevronUpIcon className='h-[24px] w-[24px]' />
            </button>
            <button
              className='text-gray-500'
              onClick={() => {
                setCurrentMonth(
                  format(
                    addMonths(parse(currentMonth, 'MMyyyy', new Date()), -1),
                    'MMyyyy'
                  )
                );
              }}
            >
              <ChevronDownIcon className='h-[24px] w-[24px]' />
            </button>
          </div>

          <h1 className='flex-1 p-2 text-3xl font-bold capitalize md:p-4'>
            {format(
              parse(currentMonth, 'MMyyyy', new Date()),
              'MMMM',
              getLocale(locale)
            )}
            <span className='text-zinc-300'>
              {format(
                parse(currentMonth, 'MMyyyy', new Date()),
                ' yyyy',
                getLocale(locale)
              )}
            </span>
          </h1>

          <AnimatePresence>
            {showToday && (
              <motion.button
                initial={{ y: -30 }}
                animate={{
                  y: 0,
                }}
                exit={{ y: -30 }}
                className='mr-2 rounded-md border px-2 text-sm text-gray-600 hover:bg-gray-100'
                onClick={() => {
                  setCurrentMonth(format(today, 'MMyyyy'));
                }}
              >
                Today
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          className='relative overflow-hidden'
          initial={false}
          animate={{
            height: bounds.height + 40,
          }}
          style={{
            height: bounds.height + 40,
          }}
        >
          <div className='grid grid-cols-7 place-content-center text-center'>
            {c('week-days')
              .split(',')
              .map((day) => (
                <div className='p-2' key={day}>
                  <span className='text-gray-500'>{day}</span>
                </div>
              ))}
          </div>
          <AnimatePresence
            initial={false}
            custom={{
              direction,
              width: bounds.width,
            }}
          >
            <motion.div
              ref={ref}
              variants={variants}
              custom={{ direction, width: bounds.width }}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: {
                  type: 'spring',
                  bounce: 0.3,
                },
                opacity: { duration: 0.2 },
              }}
              className='absolute left-0 right-0 grid grid-cols-7 place-content-center'
              key={currentMonth}
            >
              {days.map((day, index) => (
                <Card
                  key={index}
                  day={day}
                  today={today}
                  firstDayOfMonth={firstDayOfMonth}
                  trash={GetMockTrash(day)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
