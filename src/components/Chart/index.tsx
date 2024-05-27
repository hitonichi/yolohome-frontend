'use client';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, scales } from 'chart.js';
import { FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface LineProps {
  id?: string;
  data: any;
  unit: string;
}

const Chart: FC<LineProps> = ({ unit = 'Temperature', data = [] }) => {
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
      },
    },
  };

  // const [rawData, setRawData] = useState<any>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`https://io.adafruit.com/api/v2/bentin345/feeds/pihome-test-temperature/data`);
  //       const data = await response.json();
  //       console.log('rawData:', data);
  //       setRawData(data.reverse());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    );
  }

  const chartData = {
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

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};
export default Chart;
