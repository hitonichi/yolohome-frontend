export type FeedInfo = {
  id: number;
  created_at: string;
  key: string;
  name: string;
  description: string;
  last_value: string | null;
  last_value_at: string | null;
  [k: string]: any;
};

export type FeedData = {
  id: string;
  value: string;
  feed_id: string;
  feed_key: string;
  created_at: string;
};

export enum FeedSensorUnit {
  temperature = '°C',
  humidity = '%',
  lux = 'lux',
}

export type FeedSensorUnitKeys = keyof typeof FeedSensorUnit;

export enum FeedType {
  temperature = 'Temperature Sensor',
  humidity = 'Humidity Sensor',
  lux = 'Light Sensor',
  fan = 'Fan',
  light = 'Light Switch',
}

export type FeedTypeKeys = keyof typeof FeedType;

export const FAN_POWERS = [
  {
    label: 'OFF',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: 'MAX',
    value: 5,
  },
];
