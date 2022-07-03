import React, { CSSProperties, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actionCreators/weatherActionCreator';
import { State } from '../../redux/reducers/index';
import { Dropdown } from '../../components/Shared/Dropdown';
import { Charts, ChartProps } from '../../components/Shared/Chart/Chart';
import { getRequest } from '../../helper/apiHandler';
import { Option, GroupedOption } from '../../components/Shared/Dropdown/SimpleDropdown/Dropdown';

// initial chart data
const chartData: ChartProps = {
  series: [],
  options: {
    chart: {
      id: 'chart',
      // height: 100,
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
        show: false, // to hide/show config on top
      },
    },
    colors: ['#77B6EA', 'red', 'green'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    // title: {
    //   text: 'Average High & Low Temperature',
    //   align: 'left',
    // },
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
      categories: [],
      // title: {
      //   text: 'Month',
      // },
    },
    yaxis: {
      // title: {
      //   text: 'Temperature',
      // },
      min: 5,
      max: 100,
      show: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      floating: true,
      offsetY: 0,
      // offsetX: -5,
    },
  },
  chartType: 'area',
};

// dropdown css setting
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

// to change from Fahren to Cels
type Unit = 'metric' | 'imperial';

// Global Variable for LocalStorage
const localStorageDefaultKey = 'selected';

const Dashboard = (): JSX.Element => {
  // Redux setting hooks
  const dispatch = useDispatch();

  const { getWeatherByLocation } = React.useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );

  // Redux State - get data from state
  const { current, timezone, daily, hourly } = useSelector((state: State) => state.weather);

  const [unit, setUnit] = useState<Unit>('metric');
  const [chart, setChart] = useState<ChartProps>(chartData);
  const [cities, setCities] = useState<GroupedOption[]>();
  const [selectedCity, setSelectedCity] = useState<Option>({
    label: 'Netherlands',
    value: 'Netherlands',
    abbr: 'NL',
    lat: 52.5,
    lon: 5.75,
  });

  useEffect(() => {
    getWeatherByLocation(selectedCity.lat, selectedCity.lon, 'metric');
    getCitiesData();
  }, [getWeatherByLocation]);

  // prepChart data
  useEffect(() => {
    chartDataPrep();
  }, [hourly]);

  // toggle the unit to change wind & temp
  const handleUnit = (unit: Unit) => {
    setUnit(unit);
    getWeatherByLocation(selectedCity.lat, selectedCity.lon, unit);
  };

  // Get the name of the week
  const convertUCTLocal = (time?: number) => {
    const days: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const d = new Date(time * 1000).getDay();
    return days[d];
  };

  // round the number
  const roundNumber = (numb: number): number => {
    return numb && Math.round(numb);
  };

  // prepare chart data
  const chartDataPrep = () => {
    // Making 3 dataSet
    const ArrayTemp: number[] = [];
    const ArrayWind: number[] = [];
    // const ArrayPressure: number[] = [];
    const ArrayXaxis: number[] = [];

    interface Series {
      name: string;
      data: number[];
    }

    const series: Series[] = [];

    for (let index = 0; index < hourly.length; index++) {
      if (index % 2 == 0) {
        // to get daily row
        const hr = hourly[index];

        // to add to their array respectively
        ArrayTemp.push(hr.temp);
        ArrayWind.push(hr.wind_speed);
        // ArrayPressure.push(hr.pressure);
        // date prep
        const dateConve = new Date(hr.dt * 1000).getDay();
        ArrayXaxis.push(dateConve);
      }
    }

    ['Temp', 'Wind'].map((d) => {
      series.push({
        name: d,
        data: d === 'Temp' ? ArrayTemp : ArrayWind,
      });
    });

    setChart({
      ...chart,
      series: series,
      options: {
        ...chart.options,
        xaxis: {
          categories: [],
        },
      },
    });
  };

  // get Dropdown Data
  const getCitiesData = () => {
    getRequest(`https://countriesnow.space/api/v0.1/countries/positions`, (res) => {
      if (res.success) {
        const { data } = res;
        const tempData: Option[] = [];

        Array.isArray(data) &&
          data.map((d: { [key: string]: string | number }) => {
            tempData.push({
              label: d.name as string,
              value: d.name as string,
              lat: d.lat as number,
              lon: d.long as number,
              abbr: d.iso2 as string,
            });
          });

        const groupedOptions: GroupedOption[] = [
          {
            label: 'LocalStorage',
            options:
              readLocalStorage(localStorageDefaultKey) === null
                ? []
                : readLocalStorage(localStorageDefaultKey),
          },
          {
            label: 'Cities',
            options: tempData,
          },
        ];

        setCities(groupedOptions);
      } else {
        console.log('error', res.message);
      }
    });
  };

  // Write to LocalStorage
  const writeToLocalStorage = (value: Option, key?: string) => {
    let array: Option[] = readLocalStorage(key) ? readLocalStorage(key) : [];
    array = [
      ...array,
      {
        label: value?.label,
        value: value?.value,
        lon: value?.lon,
        lat: value?.lat,
        abbr: value?.abbr,
      },
    ];
    localStorage.setItem(key ?? localStorageDefaultKey, JSON.stringify(array));
  };

  // read existing data from localStorage
  const readLocalStorage = (key?: string) => {
    return JSON.parse(localStorage.getItem(key ?? localStorageDefaultKey));
  };

  const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card--header">
          <Dropdown
            name="city"
            onChange={(_, value: Option) => {
              setSelectedCity(value);
              getWeatherByLocation(value?.lat, value?.lon, unit);
              writeToLocalStorage(value, localStorageDefaultKey);
            }}
            isMulti={false}
            options={cities}
            value={selectedCity}
            formatGroupLabel={formatGroupLabel}
          />
        </div>
        {!!timezone ? (
          <>
            <div className="card--current">
              <div className="current--left">
                <div>
                  <img
                    src={require(`../../assets/weather/${
                      !!current.weather[0].main.toLowerCase()
                        ? current.weather[0].main.toLowerCase()
                        : 'clear'
                    }.png`)}
                    alt="icon"
                  />
                </div>
                <div className="temprature">{roundNumber(current.temp)}</div>
                <div className="toggle--FahrenCels">
                  <div
                    onClick={() => handleUnit('metric')}
                    className={`celsius ${unit === 'metric' ? 'active' : ''}`}
                  >
                    °C
                  </div>
                  <div
                    onClick={() => handleUnit('imperial')}
                    className={`fahren ${unit === 'imperial' ? 'active' : ''}`}
                  >
                    °F
                  </div>
                </div>
                <div className="temp--info">
                  <span>Cloudiness: {current.clouds}%</span>
                  <span>Humidity: {current.humidity}%</span>
                  <span>
                    Wind: {current.wind_speed} {unit === 'imperial' ? 'Miles/Hour' : 'Meter/Sec'}
                  </span>
                </div>
              </div>
              <div className="current-right">
                <div className="city--name">{timezone}</div>
                <div className="city--date">{convertUCTLocal(current.dt)}</div>
                <div className="city--condition">{current.weather[0].description}</div>
              </div>
            </div>
            <div className="card--condition">
              <Charts chartType={chart.chartType} options={chart.options} series={chart.series} />
            </div>
            <div className="card--daily">
              {daily.map((d, idx) => (
                <div key={idx} className="daily--item">
                  <div className="item-title">{convertUCTLocal(d.dt)}</div>
                  <div className="item--img">
                    {/* TODO: Make ICON components with dynamic name */}
                    <img
                      src={require(`../../assets/weather/${
                        !!d.weather[0].main.toLowerCase()
                          ? d.weather[0].main.toLowerCase()
                          : 'clear'
                      }.png`)}
                      alt="img"
                    />
                  </div>
                  <div className="item--range">{`${roundNumber(d.temp.min)}-${roundNumber(
                    d.temp.max
                  )}`}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="custom-spinner" />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
