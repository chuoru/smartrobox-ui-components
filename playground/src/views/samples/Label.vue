<script setup lang="ts">
import { ref } from 'vue';
import { Label, Input } from '@smartrobox/ui';

const value = ref<string>('George');
</script>

<template>
  <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-3.75 tw:px-5">
    <Label for="firstName">First name</Label>
    <Input
      v-model="value"
      id="firstName"
      type="text"
    />
    <span class="tw:text-green-700 tw:dark:text-green-400">{{ value }}</span>
  </div>
  <hr class="tw:my-4 tw:border tw:border-gray-300" />
  <div
    v-for="weight of ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'] as const"
    class="tw:mt-3 tw:px-5"
    :key="weight"
  >
    <Label :weight="weight">First name ({{ weight }})</Label>
  </div>
  <div class="tw:flex-2">
    <div>A</div>
    <div>B</div>
    <div>C</div>
  </div>
</template>
