'use client'
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { useEffect } from 'react';

export default function Echart() {
    // Data preparation https://echarts.apache.org/examples/en/editor.html?c=map-bar-morph&lang=ts
    const locations = ['鷺宮3丁目153番4', '大和町1丁目67番15', '江原町3丁目24番8', '上高田4丁目34番3', '本町6丁目58番16'];
    const prices = [480000, 515000, 502000, 508000, 603000];

    useEffect(() => {
        const chart = echarts.init(document.getElementById('chart-container') as HTMLDivElement);

        const barOption: EChartsOption = {
            xAxis: {
                type: 'category',
                data: locations,
                axisLabel: {
                    rotate: 30,
                },
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: prices,
                    type: 'bar',
                    smooth: true,
                    universalTransition: true,
                    animationDurationUpdate: 1000,
                },
            ],
        };

        const lineOption: EChartsOption = {
            xAxis: {
                type: 'category',
                data: locations,
                axisLabel: {
                    rotate: 30,
                },
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: prices,
                    type: 'line',
                    smooth: true,
                    universalTransition: true,
                    animationDurationUpdate: 1000,
                },
            ],
        };

        let currentOption = barOption;
        chart.setOption(barOption);

        setInterval(() => {
            currentOption = currentOption === barOption ? lineOption : barOption;
            chart.setOption(currentOption, true);
        }, 2000);

    }, []);

    return (
        <div>
            <div id="chart-container" style={{ width: 600, height: 400 }} />
        </div>
    );
}
