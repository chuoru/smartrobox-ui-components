<script setup lang="ts">
import { ref } from 'vue';
import { useDateTime } from '@smartrobox/ui';

const dates = ['2026-01-29T09:35:58.265+09:00', '2026-08-20T00:15:00Z'];
const zones = [
  'Pacific/Honolulu',
  'America/Anchorage',
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York',
  'America/Sao_Paulo',
  'Atlantic/Azores',
  'UTC',
  'Europe/London',
  'Europe/Paris',
  'Europe/Helsinki',
  'Africa/Nairobi',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Dhaka',
  'Asia/Bangkok',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Pacific/Auckland',
];

const datesAmerica = ['2026-03-07', '2026-03-08', '2026-10-31', '2026-11-01'];
const zonesAmerica = [
  'America/Anchorage',
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York',
  'America/Sao_Paulo',
];
const datesEurope = ['2026-03-28', '2026-03-29', '2026-10-24', '2026-10-25'];
const zonesEurope = ['Europe/London', 'Europe/Paris', 'Europe/Helsinki'];

const timezones = ref([
  Intl.DateTimeFormat().resolvedOptions().timeZone,
  'UTC',
  'Asia/Tokyo',
  'Europe/London',
  'America/New_York',
]);

const formatDateEnd = (date: string, ...args: Parameters<typeof useDateTime>) => {
  const dateTime = useDateTime(args[0], args[1], true);
  return dateTime.formatDateEnd(date);
};

const formatDateTime = (date: string, ...args: Parameters<typeof useDateTime>) => {
  const dateTime = useDateTime(args[0], args[1], true);
  return dateTime.formatDateTime(date);
};
</script>

<template>
  <div
    v-for="date of dates"
    :key="date"
  >
    <h1 class="tw:mt-2 tw:text-lg">{{ date }}</h1>
    <table>
      <thead class="tw:border tw:border-slate-600">
        <tr>
          <th rowspan="2">timezone</th>
          <th colspan="2">ja</th>
          <th colspan="2">en</th>
        </tr>
        <tr>
          <th class="tw:mx-">date</th>
          <th class="tw:mx-">datetime</th>
          <th class="tw:mx-">date</th>
          <th class="tw:mx-">datetime</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="tz of timezones"
          :key="tz"
          class="tw:border tw:border-slate-600"
        >
          <td class="tw:px-2 tw:py-2">{{ tz }}</td>
          <td class="tw:px-2 tw:py-2">{{ formatDateEnd(date, 'ja', tz) }}</td>
          <td class="tw:px-2 tw:py-2">{{ formatDateTime(date, 'ja', tz) }}</td>
          <td class="tw:px-2 tw:py-2">{{ formatDateEnd(date, 'en', tz) }}</td>
          <td class="tw:px-2 tw:py-2">{{ formatDateTime(date, 'en', tz) }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="tw:mt-4">
    <h1 class="tw:mt-2 tw:text-lg">formatDateEnd</h1>
    <table>
      <thead class="tw:border tw:border-slate-600">
        <tr>
          <th>timezone</th>
          <th
            v-for="date of dates"
            :key="date"
          >
            {{ date.slice(0, 10) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="zone of zones"
          class="tw:border tw:border-slate-600"
          :key="zone"
        >
          <td class="tw:p-2">{{ zone }}</td>
          <td
            v-for="date of dates"
            class="tw:p-2"
            :key="date"
          >
            {{ formatDateEnd(date, 'ja', zone) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="tw:mt-4">
    <h1 class="tw:mt-2 tw:text-lg">Timezone Abbreviation Names (supports standard/daylight)</h1>
    <table
      v-for="[dates, zones] of [
        [datesAmerica, zonesAmerica],
        [datesEurope, zonesEurope],
      ]"
      class="tw:mb-4"
      :key="`${dates}_${zones}`"
    >
      <thead class="tw:border tw:border-slate-600">
        <tr>
          <th>timezone</th>
          <th
            v-for="date of dates"
            :key="date"
          >
            {{ date }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="zone of zones"
          class="tw:border tw:border-slate-600"
          :key="zone"
        >
          <td class="tw:p-2">{{ zone }}</td>
          <td
            v-for="date of dates"
            class="tw:p-2"
            :key="date"
          >
            {{ formatDateEnd(date, 'ja', zone) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
