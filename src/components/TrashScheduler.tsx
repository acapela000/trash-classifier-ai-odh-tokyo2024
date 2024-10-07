'use client'
import React, { useEffect, useState } from "react";
import * as echarts from 'echarts/core';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { CustomSeriesRenderItemReturn } from 'echarts';
import { useLocale, useTranslations } from "next-intl";
import ReactECharts from 'echarts-for-react';
import { CustomChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { Schedule } from "@/db/schema";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { allSchedules } from "@/actions/FetchDb";
import { year } from "drizzle-orm/mysql-core";
import path from "path";
import { data } from "@tensorflow/tfjs";
import { db } from "@/db";


echarts.use(
    [CustomChart, CalendarComponent, SVGRenderer, TooltipComponent]
);

const layouts = [
    [[0, 0]],
    [
        [-0.25, 0],
        [0.25, 0]
    ],
    [
        [0, -0.2],
        [-0.2, 0.2],
        [0.2, 0.2]
    ],
    [
        [-0.25, -0.25],
        [-0.25, 0.25],
        [0.25, -0.25],
        [0.25, 0.25]
    ]
];

const value = [
    'https://thumb.ac-illust.com/b4/b4cfc91f9ac36a6816af594e8a6bc129_t.jpeg',
    'https://img.freepik.com/premium-vector/vector-logo-badge-icon-plastic-waste-reusable-product-sign-design-symbol-sorting-garbages_163983-1816.jpg'
]

const colors = ['#c4332b', '#16B644', '#6862FD', '#FDC763'];

const directWeekLocale: string[] = ['en', 'zh'];

const dateList = [
    ['2024-9-1', '初四'],
    ['2024-9-2', '初五'],
    ['2024-9-3', '初六'],
    ['2024-9-4', '初七'],
    ['2024-9-5', '初八', '小寒'],
    ['2024-9-6', '初九'],
    ['2024-9-7', '初十'],
]

const iconPathList = [
    ['2024-9-6', value[1]],
    ['2024-9-7', value[0]],
]

type Prop = {
    data: Schedule[]
}

// mapping database from "schema.ts" to the calendar chart data format
const dbMapping = (data: Schedule[]) => {
    return data.map((d) => {
        return [
            `2024-${d.month}-${d.day}`, // Add the year to the date
            d.event || 'default' // Ensure there's a value for the event
        ];
    });
};
//     return data.map((d) => {
//         // Assuming you have the year or need a placeholder, you can use "2024" as the year if it's for this year
//         const year = '2024';
//         const month = d.month.toString().padStart(2, '0'); // Ensure two digits for the month
//         const day = d.day.toString().padStart(2, '0');     // Ensure two digits for the day

//         return [
//             `${year}-${month}-${day}`,  // Format as YYYY-MM-DD
//             d.event || 'default'        // Use event or default
//         ];
//     });
// };

// const dbMapping = (data: Schedule[]) => {
//     return data.map((d) => {
//         return [
//             `${d.month}-${d.day}`,
//             d.event || 'default'
//         ]
//     });
// }

export default function TrashScheduler(prop: Prop) {
    console.log(prop.data);
    const c = useTranslations('Calendar');
    const locale = useLocale();
    const [option, setOption] = React.useState({});
    const week = React.useMemo(() => {
        if (directWeekLocale.includes(locale)) {
            return c('nameMap');
        }
        return c('nameMap').split(',');
    }, [c, locale]);

    const date = React.useMemo(() => {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString()}`;
    }, [])

    const fetchData = async () => {
        const schedules: Schedule[] = await allSchedules();
        const mappedData = dbMapping(schedules);

        setOption({
            tooltip: {},
            calendar: [
                {
                    left: 'center',
                    top: 'middle',
                    cellSize: [46, 46],
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
                        nameMap: week
                    },
                }
            ],
            series: [
                // date
                {
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    //dimensions: [undefined, { type: 'ordinal' }],
                    // data: dbMapping(prop.data).map((d) => {
                    //     return [d[0], d[1]];
                    // }, []),
                    data: dbMapping(schedules).map((d) => {
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
                    data: iconPathList,
                    renderItem: function (params: any, api: any) {
                        const cellPoint = api.coord(api.value(0));
                        const cellWidth: number = (params.coordSys as any).cellWidth;
                        const cellHeight: number = (params.coordSys as any).cellHeight;

                        const value = api.value(1) as string;
                        // how many icons do you have in each day for now only 1
                        const events = 1;
                        return {
                            type: 'group',
                            children: (layouts[events - 1] || []).map(function (
                                itemLayout,
                                index
                            ) {

                                return {
                                    type: 'image',
                                    style: {
                                        image: value,
                                        x: -8,
                                        y: -8,
                                        width: 50,
                                        height: 50
                                    },
                                    // type: 'path',
                                    // shape: {
                                    // pathData: value,
                                    // x: -8,
                                    // y: -8,
                                    // width: 16,
                                    // height: 16
                                    // },
                                    position: [
                                        cellPoint[0] +
                                        echarts.number.linearMap(
                                            itemLayout[0],
                                            [-0.5, 0.5],
                                            [-cellWidth / 2, cellWidth / 2]
                                        ),
                                        cellPoint[1] +
                                        echarts.number.linearMap(
                                            itemLayout[1],
                                            [-0.5, 0.5],
                                            [-cellHeight / 2 + 20, cellHeight / 2]
                                        )
                                    ],
                                }
                            })
                        }
                    }
                }
            ],
        });
    };

    React.useEffect(() => {
        fetchData();
    }, [week, locale, date]);

    // Display the calendar chart with canvas-rendered icons and text in the calendar cells instead of SVG path data and text element in the group component 
    return (
        <ReactECharts
            option={option}
            // style={{ height: '800px' }}
            style={{ width: "100%", height: "90vh" }}
            lazyUpdate={true}
        />
    );
}