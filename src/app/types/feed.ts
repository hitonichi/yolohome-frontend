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
  feed_id: string;
  value: string;
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
