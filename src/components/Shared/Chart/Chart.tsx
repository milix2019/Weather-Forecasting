import React from 'react';
import Chart from 'react-apexcharts';

export interface ChartProps {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chartType: 'line' | 'area';
}

export const Charts = ({ options, series, chartType }: ChartProps): JSX.Element => {
  return <Chart options={options} series={series} type={chartType} width="100%" height="250" />;
};
