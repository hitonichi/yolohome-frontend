'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  scales,
  ChartData,
} from 'chart.js';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export interface LineProps {
  id?: string;
  data: any;
  unit: string;
  type?: string;
}

const Chart: FC<LineProps> = ({ unit = '', data = [], type = '' }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          callback: () => {
            return null;
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: unit,
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    );
  }

  const chartData: ChartData<'line', any, unknown> = {
    labels: data.map((entry: any) => new Date(entry.created_at).toLocaleString('en-GB', { timeZone: 'UTC' })),
    datasets: [
      {
        label: unit,
        data: data.map((entry: any) => entry.value),
        borderColor: '#79bf18',
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  if (type === 'stepped') {
    chartData.datasets[0].stepped = true;
  }

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};
export default Chart;
