import React from "react";
import dynamic from 'next/dynamic';
// import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChartOptions = {
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
    enabled: true,
    formatter: function (val) {
      return Math.round(val * 100) / 100;
    },
    offsetY: -20,
    style: {
      fontSize: '10px',
      colors: ["#304758"]
    }
  },
  colors: ['#e88d84'],
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    position: 'top',
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
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      formatter: function (val) {
        return Math.floor(val);
      }
    }

  },
  title: {
    text: 'Monthly Inflation in Argentina, 2002',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444'
    }
  }
};

export function BarChart (props) {
  let overide_option = JSON.parse(JSON.stringify(BarChartOptions));;
  overide_option.title.text = props.title;
  overide_option.xaxis.categories = props.categories;
  overide_option.yaxis.labels.formatter = BarChartOptions.yaxis.labels.formatter;
  overide_option.dataLabels.formatter = BarChartOptions.dataLabels.formatter;
  if (props.color)
  {
    overide_option.colors[0] = props.color;
  }
  return (
    <div id="chart">
      <ReactApexChart options={props.option || overide_option} series={props.data} type="bar" height={350} />
    </div>
  );
}