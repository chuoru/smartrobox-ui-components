<script setup lang="ts">
import { ref } from 'vue';
import { Select, Button } from '@smartrobox/ui';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const value = ref('Pineapple');
const values = ref<string[]>(new Array(sizes.length));

const options = ref([
  { label: '選択してください。', value: undefined },
  { label: 'Apple', value: 'Apple' },
  { label: 'Banana', value: 'Banana' },
  { label: 'Blueberry', value: 'Blueberry' },
  { label: 'Grapes', value: 'Grapes' },
  { label: 'Pineapple', value: 'Pineapple' },
]);
const multiValues = ref<string[]>([]);
</script>

<template>
  <div class="tw:mb-8">
    <div class="tw:flex tw:flex-col tw:gap-4">
      <div class="tw:flex tw:items-center tw:gap-2">
        <Select
          name="test"
          v-model="value"
          :options="options"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-600">{{ value }} ({{ typeof value }})</span>
      </div>

      <div class="tw:flex tw:items-center tw:gap-2">
        <Select
          name="test"
          v-model="value"
          :options="options"
          :disabled="true"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-600">{{ value }} ({{ typeof value }})</span>
      </div>

      <div class="tw:flex tw:items-center tw:gap-2 tw:bg-gray-900 tw:py-3 tw:text-gray-100 tw:opacity-85">
        <Select
          name="test"
          v-model="value"
          :options="options"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-600">{{ value }} ({{ typeof value }})</span>
      </div>
    </div>
  </div>

  <div>
    <div
      v-for="[index, size] of sizes.entries()"
      class="tw:mb-4 tw:flex tw:flex-col"
      :key="size"
    >
      <div class="tw:flex tw:items-center tw:gap-2">
        <Select
          name="test"
          v-model="values[index]"
          :options="options"
          :size="size"
        />
        <Button
          variant="primary"
          :size="size"
        >
          Submit
        </Button>
        <span class="tw:text-green-600">{{ values[index] }}</span>
      </div>
    </div>

    <div>
      <div class="tw:flex tw:items-center tw:gap-2">
        <Select
          name="test"
          v-model="multiValues"
          :options="options"
          :multiple="true"
        />
      </div>
    </div>
  </div>
</template>
