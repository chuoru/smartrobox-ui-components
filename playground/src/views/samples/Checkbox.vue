<script setup lang="ts">
import { ref } from 'vue';
import { Button, Checkbox, CheckboxGroup } from '@smartrobox/ui';

const checked1 = ref(false);
const checked2 = ref<boolean | 'indeterminate'>(false);
const checked3 = ref<string[]>([]);
</script>

<template>
  <div>
    <Checkbox
      v-model="checked1"
      label="md"
    />
    <div class="tw:flex tw:items-center tw:gap-4">
      <span class="tw:select-none">true / false</span>
      <span class="tw:text-green-700 tw:dark:text-green-400">{{ checked1 }}</span>
    </div>

    <Checkbox
      v-model="checked1"
      label="sm"
      size="sm"
    />
    <div class="tw:flex tw:items-center tw:gap-4">
      <span class="tw:select-none">true / false</span>
      <span class="tw:text-green-700 tw:dark:text-green-400">{{ checked1 }}</span>
    </div>

    <Checkbox
      v-model="checked1"
      label="xs"
      size="xs"
    />
    <div class="tw:flex tw:items-center tw:gap-4">
      <span class="tw:select-none">true / false</span>
      <span class="tw:text-green-700 tw:dark:text-green-400">{{ checked1 }}</span>
    </div>

    <hr class="tw:my-4 tw:border-slate-200" />

    <Checkbox
      v-model="checked2"
      label="Any Text"
    />
    <div class="tw:flex tw:items-center tw:gap-4">
      <span class="tw:select-none">true / false / intedeterminate</span>
      <Button
        variant="primary"
        size="sm"
        @click="() => (checked2 === 'indeterminate' ? (checked2 = false) : (checked2 = 'indeterminate'))"
      >
        Toggle Indeterminate
      </Button>
      <span class="tw:text-green-700 tw:dark:text-green-400">{{ checked2 }}</span>
    </div>

    <hr class="tw:my-4 tw:border-slate-200" />

    <CheckboxGroup v-model="checked3">
      <label
        v-for="value of ['apple', 'orange', 'banana']"
        :key="value"
        class="[&>.checkbox]:tw:hover:bg-neutral-100 tw:flex tw:flex-row tw:items-center tw:gap-3"
      >
        <Checkbox
          :value="value"
          :label="value"
        />
        <span class="tw:select-none">{{ value }}</span>
      </label>
    </CheckboxGroup>
    <span class="tw:text-green-700 tw:dark:text-green-400">{{ checked3 }}</span>
  </div>
</template>
