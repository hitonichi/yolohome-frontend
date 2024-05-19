import { Label } from '@/components/ui/label';

const SENSORS = [
  {
    name: 'Temperature',
    type: 'temperature',
    value: 25,
  },
  {
    name: 'Humidity',
    type: 'humidity',
    value: 50,
  },
  {
    name: 'Light',
    type: 'light',
    value: 100,
  },
  {
    name: 'Temperature',
    type: 'temperature',
    value: 25,
  },
  {
    name: 'Humidity',
    type: 'humidity',
    value: 50,
  },
  {
    name: 'Light',
    type: 'light',
    value: 100,
  },
];

const DashboardSensors = () => {
  return (
    <div className="h-full flex flex-col gap-2 overflow-y-scroll no-scrollbar">
      {SENSORS.map((sensor, id) => (
        <div className="bg-white shadow rounded p-2 flex items-center justify-between" key={id}>
          <Label className="font-bold">{sensor.name}</Label>
          <p className="text-primary text-3xl font-bold">{sensor.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSensors;
