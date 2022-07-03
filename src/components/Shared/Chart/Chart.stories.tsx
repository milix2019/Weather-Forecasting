import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Charts } from './Chart';

export default {
  title: 'Shared components/Charts',
  component: Charts,
} as ComponentMeta<typeof Charts>;

const Template: ComponentStory<typeof Charts> = (args) => <Charts {...args} />;

export const LineChart = Template.bind({});
LineChart.args = {
  series: [
    {
      name: 'High - 2013',
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: 'Low - 2013',
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ],
  options: {
    chart: {
      id: 'chart',
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true, // to hide/show config on top
      },
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
      floating: true,
      offsetY: 5,
      // offsetX: -5,
    },
  },
  chartType: 'line',
};
