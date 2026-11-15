<script setup lang="ts">
import { computed } from 'vue';
import SelectGrouped from './SelectGrouped.vue';

const MAJOR_TIMEZONES = [
  {
    label: 'Pacific',
    options: [
      { label: 'HST (Pacific/Honolulu, UTC-10)', value: 'Pacific/Honolulu' },
      { label: 'AKST (America/Anchorage, UTC-9)', value: 'America/Anchorage' },
      { label: 'PST/PDT (America/Los_Angeles, UTC-8/-7)', value: 'America/Los_Angeles' },
      { label: 'MST/MDT (America/Denver, UTC-7/-6)', value: 'America/Denver' },
      { label: 'CST/CDT (America/Chicago, UTC-6/-5)', value: 'America/Chicago' },
      { label: 'EST/EDT (America/New_York, UTC-5/-4)', value: 'America/New_York' },
      { label: 'BRT (America/Sao_Paulo, UTC-3)', value: 'America/Sao_Paulo' },
    ],
  },
  {
    label: 'Europe / Africa',
    options: [
      { label: 'AZOT (Atlantic/Azores, UTC-1)', value: 'Atlantic/Azores' },
      { label: 'UTC (UTC+0)', value: 'UTC' },
      { label: 'GMT/BST (Europe/London, UTC+0/+1)', value: 'Europe/London' },
      { label: 'CET/CEST (Europe/Paris, UTC+1/+2)', value: 'Europe/Paris' },
      { label: 'EET/EEST (Europe/Helsinki, UTC+2/+3)', value: 'Europe/Helsinki' },
      { label: 'EAT (Africa/Nairobi, UTC+3)', value: 'Africa/Nairobi' },
    ],
  },
  {
    label: 'Asia / Oceania',
    options: [
      { label: 'GST (Asia/Dubai, UTC+4)', value: 'Asia/Dubai' },
      { label: 'PKT (Asia/Karachi, UTC+5)', value: 'Asia/Karachi' },
      { label: 'IST (Asia/Kolkata, UTC+5:30)', value: 'Asia/Kolkata' },
      { label: 'BST (Asia/Dhaka, UTC+6)', value: 'Asia/Dhaka' },
      { label: 'ICT (Asia/Bangkok, UTC+7)', value: 'Asia/Bangkok' },
      { label: 'CST (Asia/Shanghai, UTC+8)', value: 'Asia/Shanghai' },
      { label: 'JST (Asia/Tokyo, UTC+9)', value: 'Asia/Tokyo' },
      { label: 'AEST/AEDT (Australia/Sydney, UTC+10/+11)', value: 'Australia/Sydney' },
      { label: 'NZST/NZDT (Pacific/Auckland, UTC+12/+13)', value: 'Pacific/Auckland' },
    ],
  },
];

const model = defineModel();
const timezoneOptions = computed(() => MAJOR_TIMEZONES);
</script>

<template>
  <SelectGrouped
    v-model="model"
    :options="timezoneOptions"
  />
</template>
