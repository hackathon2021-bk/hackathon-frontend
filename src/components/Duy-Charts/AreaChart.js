import React from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    colors: ['#e3a334'],
    title: {
      text: 'Fundamental Analysis of Stocks',
      align: 'left'
    },
    subtitle: {
    //   text: 'Price Movements',
      align: 'left'
    },
    labels: [],
    xaxis: {
      type: 'int',
    },
    yaxis: {
      opposite: true,
      formatter: function (val) {
        return Math.floor(val);
      }
    },
    legend: {
      horizontalAlign: 'left'
    }
  };

export const AreaChart = (props) => {
  let overide_option = JSON.parse(JSON.stringify(AreaChartOptions));;
  overide_option.title.text = props.title;
//   overide_option.xaxis.title.text = props.xtitle;
  overide_option.labels = props.categories;
//   overide_option.yaxis.title.text = props.ytitle;
//   overide_option.yaxis.labels.formatter = AreaChartOptions.yaxis.labels.formatter;
//   overide_option.dataLabels.formatter = AreaChartOptions.dataLabels.formatter;

  return (
    <div id="chart">
      <ReactApexChart options={props.options || overide_option} series={props.data} type="area" height={350} />
    </div>
  );
}