<script setup lang="ts">
import { ref } from 'vue';
import { SelectTimeZone } from '@smartrobox/ui';

const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const offsetMinutes = -new Date().getTimezoneOffset();
const sign = offsetMinutes >= 0 ? '+' : '-';
const absMinutes = Math.abs(offsetMinutes);
const browserTimeZoneOffset = `${sign}${String(Math.floor(absMinutes / 60)).padStart(2, '0')}:${String(absMinutes % 60).padStart(2, '0')}`;
const timezone = ref(resolvedTimeZone);
</script>

<template>
  <div>
    <SelectTimeZone v-model="timezone" />
    <span class="tw:ml-4 tw:text-green-600">{{ timezone }} ({{ browserTimeZoneOffset }})</span>
  </div>
</template>
