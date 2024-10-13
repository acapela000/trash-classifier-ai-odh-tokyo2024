'use client';
import React from 'react';
import * as echarts from 'echarts/core';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { useLocale, useTranslations } from 'next-intl';
import ReactECharts from 'echarts-for-react';
import { CustomChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { Schedule } from '@/db/schema';
import { allSchedules } from '@/actions/FetchDb';
import { IconsOnDate, RenderItem } from '@/lib/calendar';
import { DateFormat } from '@/lib/mapping';

echarts.use([CustomChart, CalendarComponent, SVGRenderer, TooltipComponent]);

const directWeekLocale: string[] = ['en', 'zh'];

type Prop = {
  data: Schedule[];
};

export default function TrashScheduler(prop: Prop) {
  const c = useTranslations('Calendar');
  const locale = useLocale();

  const [option, setOption] = React.useState({});
  const [cellSize, setCellSize] = React.useState([100, 100]);
  const [iconSize, setIconSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: 18, height: 18 });

  const week = React.useMemo(() => {
    if (directWeekLocale.includes(locale)) {
      return c('nameMap');
    }
    return c('nameMap').split(',');
  }, [c, locale]);

  const date = React.useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString()}`;
  }, []);

  const fetchData = React.useCallback(async () => {
    const schedules: Schedule[] = await allSchedules();

    setOption({
      tooltip: {},
      calendar: [
        {
          left: 'center',
          top: 'middle',
          cellSize: cellSize,
          yearLabel: {
            show: true,
            formatter: date.replaceAll('-', '/'),
            position: 'top',
            fontSize: 550,
            margin: 70,
            color: 'green',
            fontStyle: 'sans-serif',
            fontWeight: 'bold',
          },
          orient: 'vertical',
          monthLabel: { show: false },
          range: date,
          dayLabel: {
            firstDay: locale == 'en' ? 0 : 1,
            nameMap: week,
          },
        },
      ],
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'calendar',
          data: DateFormat(schedules).map((d) => {
            return [d[0], d[1]];
          }, []),
          symbolSize: 0,
          silence: true,
          label: {
            show: true,
            formatter: function (params: any) {
              const d = echarts.number.parseDate(params.value[0]);
              return d.getDate();
            },
            fontSize: 8,
          },
        },
        // TODO: Icons + tooltip
        // 1 create mock list of icons
        // 2 use those icons in the custom type (if not work switch to scatter)
        {
          type: 'custom',
          coordinateSystem: 'calendar',
          dimensions: [undefined, { type: 'ordinal' }],
          data: IconsOnDate,
          renderItem: function (params: any, api: any) {
            return RenderItem(params, api, echarts, iconSize);
          },
        },
      ],
    });
  }, [locale, week, date, cellSize, iconSize]);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setCellSize([46, 100]);
        setIconSize({ width: 8, height: 8 });
      } else if (width <= 750) {
        setCellSize([70, 70]);
        setIconSize({ width: 14, height: 14 });
      } else if (width > 750) {
        setCellSize([100, 100]);
        setIconSize({ width: 22, height: 22 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    fetchData();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // don't add fetchData here otherwise it will be called infinitely

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: '90vh' }}
      lazyUpdate={true}
    />
  );
}
