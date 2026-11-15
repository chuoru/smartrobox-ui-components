<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@smartrobox/ui';

const state = ref(false);
const state2 = ref(false);
const state3 = ref(false);
</script>

<template>
  <div class="tw:flex tw:items-center tw:gap-2">
    <Switch
      id="admin-mode"
      v-model="state"
    />

    <label
      class="tw:pl-2 tw:text-sm tw:leading-none tw:select-none"
      for="admin-mode"
    >
      Admin
    </label>
    <span class="tw:text-green-700 tw:dark:text-green-400">{{ state }} ({{ typeof state }})</span>
  </div>

  <div class="tw:mt-4 tw:flex tw:items-center tw:gap-2">
    <Switch
      id="admin-mode2"
      v-model="state2"
      size="sm"
    />

    <label
      class="tw:pl-2 tw:text-sm tw:leading-none tw:select-none"
      for="admin-mode2"
    >
      sm
    </label>
    <span class="tw:text-green-700 tw:dark:text-green-400">{{ state2 }} ({{ typeof state3 }})</span>
  </div>

  <div class="tw:mt-4 tw:flex tw:items-center tw:gap-2">
    <Switch
      id="admin-mode3"
      v-model="state3"
      size="xs"
    />

    <label
      class="tw:pl-2 tw:text-sm tw:leading-none tw:select-none"
      for="admin-mode3"
    >
      xs
    </label>
    <span class="tw:text-green-700 tw:dark:text-green-400">{{ state3 }} ({{ typeof state3 }})</span>
  </div>
</template>
