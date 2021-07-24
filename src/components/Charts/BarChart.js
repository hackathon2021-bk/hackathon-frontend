import React from "react";
import dynamic from 'next/dynamic';
// import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const getChartOption = (title) => {
  let BarChartOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return Math.round(val * 100) / 100;
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ["#304758"]
      }
    },

    xaxis: {
      // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      title: {
        text: title,
      },
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return Math.round(val);
        }
      }

    },
    title: {
      text: title,
      floating: true,
      offsetY: 330,
      align: 'left',
      position: 'top',
      style: {
        color: '#444',
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: false,
      offsetY: -25,
      offsetX: -5
    }
  };
  return BarChartOptions;
}

export const BarChart = (props) => {
  return (
    <div id="chart">
      <ReactApexChart options={getChartOption(props.data[0].name)} series={props.data} type="bar" height={350} />
    </div>
  );
}