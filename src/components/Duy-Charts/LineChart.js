import React from "react";
import dynamic from 'next/dynamic';
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
      colors: ["#304758", "#50d982"]
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
    // text: 'Monthly Inflation in Argentina, 2002',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444'
    }
  }
};

// series: [
//   {
//     name: "High - 2013",
//     data: [28, 29, 33, 36, 32, 32, 33]
//   },
//   {
//     name: "Low - 2013",
//     data: [12, 11, 14, 18, 17, 13, 13]
//   }
// ],
const LineChartOptions = {
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
  colors: ['#4fc26e', '#50b9d9'],
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  title: {
    text: 'Average High & Low Temperature',
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    title: {
      text: 'Month'
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
      colors: ["#179639"]
    }
  },
  yaxis: {
    title: {
      text: 'Temperature'
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
export const LineChart = (props) => {
  let overide_option = JSON.parse(JSON.stringify(LineChartOptions));;
  overide_option.title.text = props.title;
  overide_option.xaxis.title.text = props.xtitle;
  overide_option.xaxis.categories = props.categories;
  overide_option.yaxis.title.text = props.ytitle;
  overide_option.yaxis.labels.formatter = BarChartOptions.yaxis.labels.formatter;
  overide_option.dataLabels.formatter = BarChartOptions.dataLabels.formatter;

  if (props.color) {
    overide_option.colors[0] = props.color;
    overide_option.dataLabels.style.colors[0] = props.color;
  }
  if (props.colors) {
    overide_option.colors = props.colors;
  }
  if (props.labels !== undefined) {
    console.log('GO HERE');
    overide_option.dataLabels = {enabled: props.labels};
  }

  return (
    <div id="chart">
      <ReactApexChart options={props.options || overide_option} series={props.data} type="line" height={350} />
    </div>
  );
}