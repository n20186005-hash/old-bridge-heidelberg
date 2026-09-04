import { getLocale, getMessages } from 'next-intl/server';

// Coordinates of the Old Bridge Heidelberg.
const LAT = 49.4141;
const LON = 8.7095;

const API_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
  '&timezone=Europe%2FBerlin&forecast_days=5';

type ConditionKey =
  | 'condClear'
  | 'condPartlyCloudy'
  | 'condCloudy'
  | 'condFog'
  | 'condDrizzle'
  | 'condRain'
  | 'condFreezing'
  | 'condSnow'
  | 'condShowers'
  | 'condSnowShowers'
  | 'condThunderstorm';

const CODE_TO_CONDITION: Record<number, ConditionKey> = {
  0: 'condClear',
  1: 'condPartlyCloudy',
  2: 'condPartlyCloudy',
  3: 'condCloudy',
  45: 'condFog',
  48: 'condFog',
  51: 'condDrizzle',
  53: 'condDrizzle',
  55: 'condDrizzle',
  56: 'condFreezing',
  57: 'condFreezing',
  61: 'condRain',
  63: 'condRain',
  65: 'condRain',
  66: 'condFreezing',
  67: 'condFreezing',
  71: 'condSnow',
  73: 'condSnow',
  75: 'condSnow',
  77: 'condSnow',
  80: 'condShowers',
  81: 'condShowers',
  82: 'condShowers',
  85: 'condSnowShowers',
  86: 'condSnowShowers',
  95: 'condThunderstorm',
  96: 'condThunderstorm',
  99: 'condThunderstorm',
};

function conditionFromCode(code: number | undefined): ConditionKey {
  return CODE_TO_CONDITION[code ?? 3] || 'condCloudy';
}

function WeatherIcon({ condition }: { condition: ConditionKey }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const cloudPath = <path d="M7 18h10a4 4 0 0 0 .8-7.9A5.5 5.5 0 0 0 7.4 8 4.5 4.5 0 0 0 7 18z" />;

  switch (condition) {
    case 'condClear':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
        </svg>
      );
    case 'condPartlyCloudy':
      return (
        <svg {...props}>
          <circle cx="8.5" cy="8" r="3.5" />
          <path d="M8.5 1.5V3M1.5 8H3M4 3.5l1 1" />
          <path d="M7 17h10a4 4 0 0 0 .8-7.9A5 5 0 0 0 6.9 9.2 4.4 4.4 0 0 0 7 17z" />
        </svg>
      );
    case 'condCloudy':
    case 'condFog':
    case 'condDrizzle':
    case 'condRain':
    case 'condFreezing':
    case 'condSnow':
    case 'condShowers':
    case 'condSnowShowers':
      return (
        <svg {...props}>
          {cloudPath}
          {condition === 'condCloudy' && null}
          {condition === 'condFog' && <path d="M6 21h9M8 18.5h7" />}
          {(condition === 'condDrizzle' || condition === 'condShowers') && <path d="M8 21c0-1.5-1-2-1-3M13 21c0-1.5-1-2-1-3M18 21c0-1.5-1-2-1-3" />}
          {condition === 'condRain' && <path d="M8 21.5v-2M13 21.5v-2M18 21.5v-2" />}
          {condition === 'condFreezing' && (
            <>
              <path d="M10 20.5c0-1.4-.9-1.9-.9-2.9M15 20.5c0-1.4-.9-1.9-.9-2.9" />
              <path d="M10 16.5v2M15 16.5v2" strokeWidth={1.2} opacity={0.6} />
            </>
          )}
          {(condition === 'condSnow' || condition === 'condSnowShowers') && (
            <>
              <path d="M8 21.5l1-1M13 21.5l1-1M18 21.5l1-1M8 19.5l1 1M13 19.5l1 1M18 19.5l1 1" />
            </>
          )}
        </svg>
      );
    case 'condThunderstorm':
      return (
        <svg {...props}>
          {cloudPath}
          <path d="M12 19l-2.5 4.5 3.5-1-1.5 4 5.5-6.5H13l2.5-1z" />
        </svg>
      );
    default:
      return <svg {...props}>{cloudPath}</svg>;
  }
}

export default async function WeatherSection() {
  let payload: any = null;
  try {
    const res = await fetch(API_URL, { next: { revalidate: 1800 } });
    if (res.ok) {
      const json = await res.json();
      if (json?.current && json?.daily) {
        payload = json;
      }
    }
  } catch {
    payload = null;
  }
  if (!payload) {
    return null;
  }

  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);
  const w = (messages as any)?.weather || {};

  const dateLocale = locale === 'zh' ? 'zh-CN' : locale === 'de' ? 'de-DE' : 'en-GB';
  const current = payload.current;
  const daily = payload.daily;

  const currentCondition = conditionFromCode(current.weather_code);
  const meta = [
    { label: w.feels, value: `${Math.round(current.apparent_temperature)}°` },
    { label: w.humidity, value: `${Math.round(current.relative_humidity_2m)}%` },
    { label: w.wind, value: `${Math.round(current.wind_speed_10m)} km/h` },
  ];

  return (
    <section id="weather" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {w.title}
        </h2>
        <p className="text-base sm:text-lg mb-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          {w.subtitle}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Current conditions */}
          <div
            className="rounded-2xl p-6 sm:p-8 lg:col-span-2"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
              {w.now}
            </p>
            <div className="flex items-center gap-5">
              <span style={{ color: 'var(--accent)' }}>
                <WeatherIcon condition={currentCondition} />
              </span>
              <p className="font-display font-bold leading-none" style={{ color: 'var(--text-primary)', fontSize: '3.4rem' }}>
                {Math.round(current.temperature_2m)}°
              </p>
            </div>
            <p className="font-display text-xl font-semibold mt-3" style={{ color: 'var(--text-primary)' }}>
              {w[currentCondition]}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg px-2 py-3 text-center"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>
                    {m.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5-day forecast */}
          <div
            className="rounded-2xl p-6 sm:p-8 lg:col-span-3"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--accent)' }}>
              {w.forecast}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {daily.time.slice(0, 5).map((date: string, i: number) => {
                const cond = conditionFromCode(daily.weather_code[i]);
                const pop = daily.precipitation_probability_max?.[i];
                const label =
                  i === 0
                    ? w.today
                    : new Date(`${date}T12:00:00`).toLocaleDateString(dateLocale, { weekday: 'short' });
                return (
                  <div
                    key={date}
                    className="rounded-xl px-2 py-4 text-center flex flex-col items-center gap-2"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </p>
                    <span style={{ color: 'var(--accent)' }}>
                      <WeatherIcon condition={cond} />
                    </span>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(daily.temperature_2m_max[i])}°
                      <span className="font-medium ml-1.5" style={{ color: 'var(--text-muted)' }}>
                        {Math.round(daily.temperature_2m_min[i])}°
                      </span>
                    </p>
                    {typeof pop === 'number' && (
                      <p className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
                          <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z" />
                        </svg>
                        {pop}%
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
