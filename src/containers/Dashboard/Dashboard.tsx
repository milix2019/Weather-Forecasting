import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actionCreators/weatherActionCreator';
import { State } from '../../redux/reducers/index';
import { AsyncDropdown } from '../../components/Shared/Dropdown';
import { promiseOptions } from '../../components/Shared/Dropdown/AsyncDropdown/AsyncDropdown.stories';
import { Charts, ChartProps } from '../../components/Shared/Chart/Chart';

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

type Unit = 'metric' | 'imperial';

const Dashboard = (): JSX.Element => {
  // const history = useNavigate();
  // Redux setting hooks
  const dispatch = useDispatch();

  const { getWeatherByLocation } = React.useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
  // Redux State - get data from state
  const { current, timezone, daily, hourly } = useSelector((state: State) => state.weather);
  console.log(current, timezone, daily, 'kkk', hourly);

  useEffect(() => {
    getWeatherByLocation(3.139, 101.6869, 'metric');
  }, [getWeatherByLocation]);

  useEffect(() => {
    chartDataPrep();
  }, [hourly]);

  const [unit, setUnit] = useState<Unit>('metric');
  const [chart, setChart] = useState<ChartProps>(chartData);

  // toggle the unit to change wind & temp
  const handleUnit = (unit: Unit) => {
    setUnit(unit);
    getWeatherByLocation(3.139, 101.6869, unit);
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
        // data: d === 'Temp' ? ArrayTemp : d === 'Wind' ? ArrayWind : ArrayPressure,
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
    console.log(chart, series);
  };

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card--header">
          <AsyncDropdown
            name="city"
            onChange={(name, value) => console.log(name, value)}
            isMulti={false}
            promiseOptions={promiseOptions}
            defaultOptions={true}
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
