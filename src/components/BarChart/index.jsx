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
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);


function BarChart(props) {
    const { data, label } = props
    return (
        <Bar
            data={{
                labels: label,
                datasets: [
                    {
                        label: "Amount (assignments)",
                        data: data,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',

                    }
                ]
            }}
            options={{
                legend: { display: true },
              
                responsive: true,
                scales: {
                  
                },
                plugins: {
                    datalabels: {
                      display: true,
                      color: "black",
                      formatter: (value) => value ? value : '' ,
                      anchor: "end",
                      offset: -20,
                      align: "start",
                      
                    }
                  },

            }}
        />
    );
}

export default BarChart;