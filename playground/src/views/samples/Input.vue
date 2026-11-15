<script setup lang="ts">
import { ref } from 'vue';
import { Input, Button } from '@smartrobox/ui';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

const value = ref('');
const numberValue = ref<number>();
const values = ref<string[]>(new Array(sizes.length));
</script>

<template>
  <div class="tw:mb-8">
    <div class="tw:flex tw:flex-col tw:gap-4">
      <div class="tw:flex tw:items-center tw:gap-2">
        <Input
          aria-label="Text"
          name="test"
          v-model="value"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-700 tw:dark:text-green-400">{{ value }} ({{ typeof value }})</span>
      </div>

      <div class="tw:flex tw:items-center tw:gap-2">
        <Input
          aria-label="Text (disabled)"
          name="test"
          v-model="value"
          :disabled="true"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-700 tw:dark:text-green-400">{{ value }} ({{ typeof value }})</span>
      </div>

      <div class="tw:flex tw:items-center tw:gap-2">
        <Input
          aria-label="Number"
          name="test"
          type="number"
          class="tw:w-28"
          v-model.number="numberValue"
        />
        <Button variant="primary">Submit</Button>
        <span class="tw:text-green-700 tw:dark:text-green-400">{{ numberValue }} ({{ typeof numberValue }})</span>
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
        <Input
          :aria-label="`Text (${size})`"
          v-model="values[index]"
          name="test"
          :size="size"
        />
        <Button
          variant="primary"
          :size="size"
        >
          Submit
        </Button>
        <span class="tw:text-green-700 tw:dark:text-green-400">{{ values[index] }}</span>
      </div>
    </div>
  </div>
</template>
