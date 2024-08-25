"use client";
import React from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { CalendarComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { range } from "@tensorflow/tfjs";

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
    const [option, setOption] = React.useState(config);
    //get current year/month
    // const now = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
    // range = now;

    return (
        <ReactEChartsCore
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            style={{ width: "100%", height: "90vh" }}
        />
    );
}
