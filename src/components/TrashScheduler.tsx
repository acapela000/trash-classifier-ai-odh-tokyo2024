'use client'
import React, { useEffect, useState } from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { allSchedules } from "@/actions/FetchDb";


echarts.use(
    [CustomChart, CalendarComponent, SVGRenderer, TooltipComponent]
);

const config = {
    tooltip: {},
    calendar: [
        {
            left: 'center',
            top: 'middle',
            cellSize: [70, 70],
            yearLabel: { show: false },
            orient: 'vertical',
            dayLabel: {
                firstDay: 1,
            },
            monthLabel: {
                show: false
            },
            range: '2024-07'
        }
    ],
    series: {
        type: 'custom',
        coordinateSystem: 'calendar',
        dimensions: [undefined, { type: 'ordinal' }],
        data: [],
        renderItem: function (params: any, api: any) { return; }
    }
};

export default function TrashScheduler() {
    const [option, setOption] = useState(config);
    // interact with the database

    useEffect(() => {
        // get only schedules of a particular location
        const fetchData = async () => {
            const schedules: any[] = await allSchedules();
            console.log(schedules);
            // map data from db to match the object in echarts
            const chartData = schedules.map((schedule) => [schedule.week_day, schedule.day]);

            setOption({
                ...config,
                series: [{
                    ...config.series,
                    data: chartData
                }] as any
            }),
                console.log(option);
        }
        fetchData();
    }, []);

    return (
        // display the schedule, location
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: '100vh', width: '100%' }}
        />
    );
}
