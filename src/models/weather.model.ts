interface WeatherProps {
  description: string; // Weather condition within the group
  main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
}

interface CurrentProps {
  clouds: number; // Cloudiness, %
  dt: number; // Current time, Unix, UTC
  feels_like: number; // Temperature. This temperature parameter accounts for the human perception of weather
  humidity: number; //Humidity, %
  pressure: number; // Atmospheric pressure on the sea level, hPa
  sunrise: number; //sunrise time, Unix, UTC
  sunset: number; //sunset time, Unix, UTC
  temp: number; // units=metric => Celsius
  uvi: number; // Current UV index
  visibility: number; // Average visibility, metres. The maximum value of the visibility is 10km
  weather: WeatherProps[];
  wind_deg: number; //Wind direction, degrees (meteorological)
  wind_speed: number; //Wind speed. Wind speed. Units
  snow?: number; //(where available) Precipitation volume, mm
  rain?: number; //(where available) Snow volume, mm
}

interface Temp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

interface FeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

interface DailyProps {
  dt: number; //Time of the forecasted data, Unix, UTC
  sunrise: number; //sunrise time, Unix, UTC
  sunset: number; //sunset time, Unix, UTC
  moonrise: number; //The time of when the moon rises for this day, Unix,
  moonset: number; //The time of when the moon sets for this day, Unix, UTC
  clouds: number; // Cloudiness, %
  humidity: number; //Humidity, %
  pressure: number; // Atmospheric pressure on the sea level, hPa
  snow?: number; //(where available) Precipitation volume, mm
  rain?: number; //(where available) Snow volume, mm
  feels_like: FeelsLike;
  temp: Temp;
  weather: WeatherProps[];
  wind_deg: number; //Wind direction, degrees (meteorological)
  wind_speed: number; //Wind speed. Wind speed. Units
}

export interface HourlyProps {
  dt: number;
  temp: number;
  wind_speed: number;
  pressure: number;
}

export class Weather {
  current?: CurrentProps;
  daily?: DailyProps[];
  hourly?: HourlyProps[];
  timezone: string;

  constructor() {
    this.current = {
      clouds: 0,
      dt: 0,
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      sunrise: 0,
      sunset: 0,
      temp: 0,
      uvi: 0,
      visibility: 0,
      weather: [{ description: '', main: '' }],
      wind_speed: 0,
      wind_deg: 0,
    };
    this.daily = [
      {
        clouds: 0,
        dt: 0,
        feels_like: { day: 0, night: 0, eve: 0, morn: 0 },
        humidity: 0,
        moonrise: 0,
        moonset: 0,
        pressure: 0,
        sunrise: 0,
        sunset: 0,
        temp: { day: 0, min: 0, max: 0, night: 0, eve: 0, morn: 0 },
        weather: [{ description: '', main: '' }],
        wind_deg: 0,
        wind_speed: 0,
      },
    ];
    this.hourly = [
      {
        dt: 0,
        temp: 0,
        wind_speed: 0,
        pressure: 0,
      },
    ];
    this.timezone = '';
  }
}
