<script setup lang="ts">
import { ref } from 'vue';
import { Editable } from '@smartrobox/ui';

const value = ref('Hello World');
const value2 = ref('Hello World');
</script>

<template>
  <div class="">
    <div class="tw:w-62.5">
      <Editable
        v-model="value"
        placeholder="Enter text..."
        class="tw:flex tw:gap-4"
        auto-resize
      />
      <div class="tw:mt-3">
        <span class="tw:text-green-600">{{ value }} ({{ typeof value }})</span>
      </div>
    </div>
  </div>

  <div class="tw:mt-6">
    <div class="tw:w-62.5">
      <Editable
        v-model="value2"
        placeholder="Enter text..."
        class="tw:flex tw:gap-4"
        auto-resize
        size="40"
      />
      <div class="tw:mt-3">
        <span class="tw:text-green-600">{{ value2 }} ({{ typeof value2 }})</span>
      </div>
    </div>
  </div>
</template>
