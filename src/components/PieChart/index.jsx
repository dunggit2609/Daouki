import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

PieChart.propTypes = {

};

function PieChart(props) {
  const { data, label } = props
  return (
    <div>
      <Pie data={{
        labels: label,
        datasets: [
          {
            label: '# of Votes',
            data: data,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',

              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',

              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',

            ],
            borderWidth: 1,
          },
        ],
      }}
        options={{

          plugins: {
            datalabels: {
              display: true,
              color: "black",
              formatter: (value) => value ? `${value} %` : '',
              anchor: "center",
              align: "center",
              font: {
                size: 8
              }
            }
          },
        }}
      />
    </div>
  );
}

export default PieChart;