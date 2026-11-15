<script setup lang="ts">
import { ref } from 'vue';
import { DateRangePicker, Label } from '@smartrobox/ui';
import type { DateRange } from '@smartrobox/ui';

const dateRange = ref<DateRange>();
const dateRange2 = ref<DateRange>();
</script>

<template>
  <div class="tw:flex tw:w-68 tw:flex-col tw:gap-1">
    <Label for="date-range-ja">ja locale</Label>
    <DateRangePicker
      v-model="dateRange"
      id="date-range-ja"
      locale="ja"
    />
    <span class="tw:text-green-600">{{ dateRange }}</span>
  </div>

  <div class="tw:mt-4 tw:flex tw:w-68 tw:flex-col tw:gap-1">
    <Label for="date-range-en">en locale</Label>
    <DateRangePicker
      v-model="dateRange2"
      id="date-range-en"
      locale="en"
    />
    <span class="tw:text-green-600">{{ dateRange2 }}</span>
  </div>
</template>
