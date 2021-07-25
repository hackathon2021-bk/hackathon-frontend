import React from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaChartOptions = {
  chart: {
    type: 'area',
    stack: false, 
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  fill: {
    type: 'gradient',
    gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 150, 150]
      },
  },
  colors: ['#a054e3', '#d98e50'],
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
  if (props.color)
    overide_option.colors[0] = props.color;
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