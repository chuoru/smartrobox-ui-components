<script setup lang="ts">
import { ref } from 'vue';
import { ErrorAlert, Input } from '@smartrobox/ui';

const ip = ref('192.168.0');
const errors = ['IP address is invalid.', 'Port must be between 1 and 65535.'];
</script>

<template>
  <div class="tw:flex tw:max-w-md tw:flex-col tw:gap-8">
    <ErrorAlert :errors="errors" />

    <div>
      <Input
        v-model="ip"
        class="tw:w-full"
      />
      <ErrorAlert
        arrow
        :errors="['IP address is invalid.']"
      />
    </div>

    <ErrorAlert :errors="[]" />
  </div>
</template>
