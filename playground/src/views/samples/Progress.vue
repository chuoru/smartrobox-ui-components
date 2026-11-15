<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Progress } from '@smartrobox/ui';

const value = ref(10);
const timer = ref();

onMounted(() => {
  timer.value = setInterval(() => {
    if (value.value === 100) {
      value.value = 10;
    } else {
      value.value += 30;
    }
  }, 2000);
});

onBeforeUnmount(() => {
  clearTimeout(timer.value);
});
</script>

<template>
  <Progress
    v-model="value"
    class="tw:w-80"
  />
  <span class="tw:text-green-600">{{ value }} ({{ typeof value }})</span>
</template>
