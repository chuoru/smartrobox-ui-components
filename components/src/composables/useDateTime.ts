import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import localizedFormatPlugin from 'dayjs/plugin/localizedFormat';
import advancedFormatPlugin from 'dayjs/plugin/advancedFormat';

// The `z` token retrieves the abbreviation internally using
// the `timeZoneName: ‘short’` option of `Intl.DateTimeFormat`.
// Since the results from `Intl` may vary depending on the environment,
// we implement our own conversion for frequently used time zones.
//
// For time zones that observe DST, `standard`/`daylight` hold the two
// abbreviations and the correct one is picked by comparing the date's
// UTC offset against the zone's standard-time offset (the smaller of
// the two offsets observed across the year).

type TzAbbr = string | { standard: string; daylight: string };

const TZ_ABBR_MAP: Record<string, TzAbbr> = {
  'Pacific/Honolulu': 'HST',
  'America/Anchorage': { standard: 'AKST', daylight: 'AKDT' },
  'America/Los_Angeles': { standard: 'PST', daylight: 'PDT' },
  'America/Denver': { standard: 'MST', daylight: 'MDT' },
  'America/Chicago': { standard: 'CST', daylight: 'CDT' },
  'America/New_York': { standard: 'EST', daylight: 'EDT' },
  'America/Sao_Paulo': 'BRT',
  'Atlantic/Azores': 'AZOT',
  'Europe/London': { standard: 'GMT', daylight: 'BST' },
  'Europe/Paris': { standard: 'CET', daylight: 'CEST' },
  'Europe/Helsinki': { standard: 'EET', daylight: 'EEST' },
  'Africa/Nairobi': 'EAT',
  'Asia/Dubai': 'GST',
  'Asia/Karachi': 'PKT',
  'Asia/Kolkata': 'IST',
  'Asia/Dhaka': 'BST',
  'Asia/Bangkok': 'ICT',
  'Asia/Shanghai': 'CST',
  'Asia/Tokyo': 'JST',
  'Australia/Sydney': { standard: 'AEST', daylight: 'AEDT' },
  'Pacific/Auckland': { standard: 'NZST', daylight: 'NZDT' },
};

const resolveTzAbbr = (date: dayjs.Dayjs, timezone: string): string | undefined => {
  const abbr = TZ_ABBR_MAP[timezone];

  if (!abbr) {
    return undefined;
  } else if (typeof abbr === 'string') {
    return abbr;
  } else {
    const year = date.year();
    const janOffset = dayjs.utc(`${year}-01-01T00:00:00Z`).tz(timezone).utcOffset();
    const julOffset = dayjs.utc(`${year}-07-01T00:00:00Z`).tz(timezone).utcOffset();
    const standardOffset = Math.min(janOffset, julOffset);
    return date.utcOffset() === standardOffset ? abbr.standard : abbr.daylight;
  }
};

export const useDateTime = (locale: 'en' | 'ja', timezone: string, showTimeZone: boolean = false) => {
  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);
  dayjs.extend(localizedFormatPlugin);
  dayjs.extend(advancedFormatPlugin);
  dayjs.locale(locale);
  dayjs.tz.setDefault(timezone);

  const formatDateEnd = (iso8604: string) => {
    const dateOnly = iso8604.slice(0, 10);
    const date = dayjs.tz(dateOnly, timezone).endOf('day');

    if (showTimeZone) {
      const abbr = resolveTzAbbr(date, timezone);
      return `${date.format('L')} ${abbr || 'UTC'}`;
    } else {
      return date.format('L');
    }
  };

  const formatDateTime = (iso8604: string) => {
    const date = dayjs(iso8604).tz(timezone);

    if (showTimeZone) {
      const abbr = resolveTzAbbr(date, timezone);
      return abbr ? `${date.format('L LTS')} ${abbr}` : date.format('L LTS z');
    } else {
      return date.format('L LTS');
    }
  };

  return {
    formatDateTime,
    formatDateEnd,
  };
};
