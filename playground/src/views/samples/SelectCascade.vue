<script setup lang="ts">
import { ref } from 'vue';
import { SelectCascade, Button } from '@smartrobox/ui';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;

const selected = ref<string[]>(new Array(sizes.length));
const selectedTransparent = ref<string>();
const selectedBottom = ref<string>();

const options = ref([
  { label: '選択してください。', value: undefined },
  { label: 'A101', value: 'A101' },
  { label: 'A102', value: 'A102' },
  {
    label: 'category 1',
    options: [
      { label: 'A103', value: 'A103' },
      { label: 'A104', value: 'A104' },
      { label: 'A105', value: 'A105' },
    ],
  },
  {
    label: 'category 2',
    options: [
      { label: 'A200', value: 'A200' },
      { label: 'A201', value: 'A201' },
      { label: 'A202', value: 'A202' },
      {
        label: 'category 2-1',
        options: [
          { label: 'A206', value: 'A206' },
          { label: 'A207', value: 'A207' },
        ],
      },
    ],
  },
  { label: 'A204', value: 'A204' },
]);
</script>

<template>
  <div class="tw:relative tw:h-full tw:w-full">
    <div class="tw:mb-4 tw:flex tw:flex-col tw:border-b tw:border-slate-300 tw:pb-4">
      <h3 class="tw:mb-1">transparent</h3>
      <div class="tw:flex tw:items-center tw:gap-2">
        <SelectCascade
          v-model="selectedTransparent"
          theme="theme-transparent"
          :options="options"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-600">{{ selectedTransparent }}</span>
      </div>

      <h3 class="tw:my-2">dark transparent</h3>
      <div class="tw:flex tw:items-center tw:gap-2 tw:bg-gray-700 tw:py-2">
        <SelectCascade
          v-model="selectedTransparent"
          theme="theme-dark-transparent"
          class="tw:text-gray-100!"
          :options="options"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-600">{{ selectedTransparent }}</span>
      </div>

      <h3 class="tw:mt-2 tw:mb-1">disabled</h3>
      <div class="tw:flex tw:items-center tw:gap-2">
        <SelectCascade
          v-model="selectedTransparent"
          theme="theme-transparent"
          :options="options"
          :disabled="true"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-600">{{ selectedTransparent }}</span>
      </div>
    </div>

    <div
      v-for="(size, index) of sizes"
      class="tw:mb-4 tw:flex tw:flex-col"
      :key="size"
    >
      <div class="tw:flex tw:items-center tw:gap-2">
        <SelectCascade
          v-model="selected[index]"
          :options="options"
          :size="size"
        />
        <Button
          variant="primary"
          :size="size"
        >
          Submit
        </Button>
        <span class="tw:text-green-600">{{ selected[index] }}</span>
      </div>
    </div>

    <div class="tw:absolute tw:bottom-0 tw:left-0">
      <div class="tw:flex tw:flex-row tw:items-center tw:justify-between tw:gap-2">
        <div>
          <SelectCascade
            v-model="selectedBottom"
            :options="options"
            :disabled="false"
            :downward="false"
          />
        </div>
        <div class="tw:text-green-600">{{ selectedBottom }}</div>
      </div>
    </div>
  </div>
</template>
