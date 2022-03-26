import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: '',
        },
        datalabels: {
            display: true,
            color: "white",
            formatter: (value) => value ? value : '' ,
            anchor: "center",
            align: "center"
          }
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};


export const dataTemplate = [
    {
        label: 'Dataset 1',
        data: [],
        backgroundColor: 'rgb(75, 192, 192)',
    },
    {
        label: 'Dataset 2',
        data: [],
        backgroundColor: 'rgb(53, 162, 235)',
    },
    {
        label: 'Dataset 3',
        data: [],
        backgroundColor: '#f9f4be',
    },
    {
        label: 'Dataset 3',
        data: [],
        backgroundColor: 'rgb(255, 99, 132)',
    },
];

export function StackedBarChart(props) {
    const { data, labels, datasetLabel } = props
    const renderData = dataTemplate.map((d, index) => {
        return { ...d, data: data[index] ? data[index] : [], label: datasetLabel ? datasetLabel[index] : '' }
    })

    return <Bar options={options} data={{ datasets: renderData ? renderData : [], labels: labels ? labels : [] }} />;
}
