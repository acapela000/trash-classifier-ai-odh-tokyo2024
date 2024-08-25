'use client'
import ReactECharts from 'echarts-for-react';
import React from "react";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';


echarts.use(
    [LineChart, BarChart, GridComponent, SVGRenderer, TooltipComponent]
);

const config = {
    tooltip: {},
    xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
            rotate: 30,
        },
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#a7f3d0' },
                    { offset: 0.5, color: '#6ee7b7' },
                    { offset: 1, color: '#34d399' }
                ])
            },
            data: [],
            size: 0.5,
            smooth: true,
            universalTransition: true,
            animationDurationUpdate: 1000,
        },
        {
            type: 'line',
            itemStyle: {
                color: '#047857',
            },
            data: [],
            size: 10,
            smooth: true,
            universalTransition: true,
            animationDurationUpdate: 1000,
        },
    ]
};

export default function Echart() {
    // Data preparation https://echarts.apache.org/examples/en/editor.html?c=map-bar-morph&lang=ts
    // const locations = ['鷺宮3丁目153番4', '大和町1丁目67番15', '江原町3丁目24番8', '上高田4丁目34番3', '本町6丁目58番16'];
    // const points: any = [480000, 515000, 502000, 508000, 603000];
    const points: any = [480, 515, 502, 508, 603];

    const [option, setOption] = React.useState(config);

    React.useEffect(() => {
        setOption({
            ...config,
            series: [
                {
                    ...config.series[0],
                    data: points,
                },
                {
                    ...config.series[1],
                    data: points,
                },
            ]
        });
    }, []);

    // let currentOption = barOption;

    // setInterval(() => {
    //     currentOption = currentOption === barOption ? lineOption : barOption;
    // }, 2000);

    return (
        <div style={{ padding: '20px' }}>
            <h3>The chart display the points you gather for carbon credit</h3>
            <ReactEChartsCore
                echarts={echarts}
                option={option}
                lazyUpdate={true}
                style={{ width: "100%", height: "70vh" }}
            />
        </div>
    );
}
