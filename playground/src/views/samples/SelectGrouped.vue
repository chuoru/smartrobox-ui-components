<script setup lang="ts">
import { ref } from 'vue';
import { SelectGrouped, Button } from '@smartrobox/ui';

const sizes = ['sm', 'md', 'lg'] as const;
const value = ref('デイノニクス');
const values = ref<string[]>(new Array(sizes.length));

const options = ref([
  { label: '選択してください。', value: undefined },
  {
    label: '獣脚類', // じゅうきゃくるい
    options: [
      { label: 'ティラノサウルス', value: 'ティラノサウルス' },
      { label: 'ヴェロキラプトル', value: 'ヴェロキラプトル' },
      { label: 'デイノニクス', value: 'デイノニクス' },
    ],
  },
  {
    label: '竜脚類', // りゅうきゃくるい
    options: [
      { label: 'ディプロドクス', value: 'ディプロドクス' },
      { label: 'ソルトサウルス', value: 'ソルトサウルス' },
      { label: 'アパトサウルス', value: 'アパトサウルス' },
    ],
  },
]);
</script>

<template>
  <div class="tw:mb-8">
    <div class="tw:flex tw:flex-col tw:gap-4">
      <div class="tw:flex tw:items-center tw:gap-2">
        <SelectGrouped
          name="test"
          v-model="value"
          :options="options"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-600">{{ value }} ({{ typeof value }})</span>
      </div>

      <div class="tw:flex tw:items-center tw:gap-2">
        <SelectGrouped
          name="test"
          v-model="value"
          :options="options"
          :disabled="true"
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
        <SelectGrouped
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
  </div>
</template>
