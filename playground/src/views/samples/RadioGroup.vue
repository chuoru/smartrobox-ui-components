<script setup lang="ts">
import { ref } from 'vue';
import { RadioGroup } from '@smartrobox/ui';

const value = ref('default');
const value2 = ref('default');
const value3 = ref('default');
const options = ref([
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Comfotable',
    value: 'comfotable',
  },
  {
    label: 'Compact',
    value: 'compact',
  },
]);
</script>

<template>
  <RadioGroup
    id="g1"
    v-model="value"
    :options="options"
  />
  <div class="tw:mt-2">
    <span class="tw:text-green-600">{{ value }}</span>
  </div>

  <div class="tw:flex tw:gap-4">
    <div class="tw:my-4">
      <RadioGroup
        id="g2"
        v-model="value2"
        :options="options"
        size="sm"
      />
    </div>
    <div class="tw:my-4">
      <RadioGroup
        id="g3"
        v-model="value3"
        :options="options"
        size="xs"
      />
    </div>
  </div>
</template>
