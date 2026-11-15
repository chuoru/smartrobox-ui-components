<script setup lang="ts">
import { ref } from 'vue';
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date';
import { DatePicker, Label, SelectTimeZone } from '@smartrobox/ui';
import type { Ref } from 'vue';

const date = ref(today(getLocalTimeZone())) as Ref<CalendarDate>;
const zone = ref('Asia/Tokyo');
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-1 tw:w-40">
    <Label
      for="date"
      class="tw:text-green-600"
    >
      {{ date }}
    </Label>

    <div class="tw:flex tw:gap-4 tw:w-120">
      <div class="tw:w-38">
        <DatePicker
          v-model="date"
          :closeOnSelect="true"
          id="date"
          locale="ja"
        />
      </div>
      <SelectTimeZone v-model="zone" />
    </div>
  </div>
</template>
