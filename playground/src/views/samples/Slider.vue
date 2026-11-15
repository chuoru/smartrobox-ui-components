<script setup lang="ts">
import { ref } from 'vue';
import { Slider, SliderRange } from '@smartrobox/ui';

const value = ref(50);
const values = ref([20, 80]);
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div>
      <Slider
        v-model="value"
        :max="100"
        :step="1"
        class="tw:w-48"
      />
      <span class="tw:text-green-600">{{ value }} ({{ typeof value }})</span>
    </div>

    <div>
      <SliderRange
        v-model="values"
        :max="100"
        :step="1"
        class="tw:w-48"
      />
      <span class="tw:text-green-600">{{ values }} ({{ typeof values }})</span>
    </div>
  </div>
</template>
