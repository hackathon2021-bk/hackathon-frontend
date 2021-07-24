import React from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const getChartOption = (title) => {
  let LineChartOptions = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: title,
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
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
    yaxis: {
      title: {
        text: title,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return Math.round(val);
        }
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
  return LineChartOptions;
}
export const LineChart = (props) => {
  const chartOptions = getChartOption(props.title);
  // console.log(props.data[0].name);
  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={props.data} type="line" height={350} />
    </div>
  );
}