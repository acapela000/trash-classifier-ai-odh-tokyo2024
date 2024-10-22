'use client';
import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

export default function AccordionComponent() {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const ac = useTranslations('Events');

  return (
    <Accordion>
      <AccordionItem
        key='1'
        aria-label={ac('event')}
        subtitle={ac('eventContent')}
        title={ac('event')}
      >
        <ul className='list-disc'>
          <li>
            <u>
              <a href='https://www.marathon.tokyo/en/about/sustainability/pdf/2024-en.pdf'>
                {ac('event1')}
              </a>
            </u>
          </li>
          <li>
            {ac('event2')}
            <u>
              <a href='https://globe.u-tokyo.ac.jp/en/news/news_240406.html'></a>
            </u>
          </li>
          <li>
            {ac('event3')}
            <u>
              <a href='https://www.jetro.go.jp/en/database/j-messe/tradefair/detail/132660'></a>
            </u>
          </li>
          <li>
            {ac('event4')}
            <u>
              <a href='https://activo.jp/tokyo/trash_pick_up'></a>
            </u>
          </li>
          <li>
            {ac('event5')}
            <u>
              <a href='https://www.greenbird.jp/schedule'></a>
            </u>
          </li>
          <li>
            {ac('event-more')}
            <u>
              <a href='https://all62.jp/alltokyoaction/index.html'></a>
            </u>
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem key='2' aria-label='FQA' subtitle={ac('qa')} title='FQA'>
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key='3'
        aria-label={ac('help-feedback')}
        subtitle={<span>{ac('help-feedback-content')}</span>}
        title={ac('help-feedback')}
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
