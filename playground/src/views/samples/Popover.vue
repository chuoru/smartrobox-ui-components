<script setup lang="ts">
import { ref } from 'vue';
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid';
import { Select, Popover, Label, Input } from '@smartrobox/ui';

type Align = 'start' | 'center' | 'end';
type Side = 'top' | 'right' | 'bottom' | 'left';

const ALIGN_OPTIONS: { label: string; value: Align }[] = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
];

const SIDE_OPTIONS: { label: string; value?: Side }[] = [
  { label: '(undefined)', value: undefined },
  { label: 'top', value: 'top' },
  { label: 'right', value: 'right' },
  { label: 'bottom', value: 'bottom' },
  { label: 'left', value: 'left' },
];

const open = ref(false);
const align = ref<Align>('center');
const side = ref<Side>('left');
</script>

<template>
  <div class="tw:mt-4 tw:flex tw:items-center">
    <Popover
      v-model:open="open"
      :align="align"
      :side="side"
      :zIndex="999"
    >
      <template #trigger>
        <div class="tw:rounded-full tw:border tw:border-gray-300 tw:p-1">
          <AdjustmentsHorizontalIcon class="tw:size-5" />
        </div>
      </template>

      <div class="tw:flex tw:flex-col tw:gap-2.5">
        <p class="tw:mb-2 tw:font-semibold">Dimensions</p>
        <fieldset class="tw:flex tw:items-center tw:gap-3">
          <Label
            for="width"
            class="tw:w-18 tw:text-right"
            >Width</Label
          >
          <Input
            id="width"
            size="sm"
            class="tw:w-full"
          />
        </fieldset>
        <fieldset class="tw:flex tw:items-center tw:gap-3">
          <Label
            for="height"
            class="tw:w-18 tw:text-right"
            >Height</Label
          >
          <Input
            id="heigth"
            size="sm"
            class="tw:w-full"
          />
        </fieldset>
        <fieldset class="tw:flex tw:items-center tw:gap-3">
          <Label
            for="width"
            class="tw:w-18 tw:text-right"
            >Width</Label
          >
          <Input
            id="width"
            size="sm"
            class="tw:w-full"
          />
        </fieldset>
        <fieldset class="tw:flex tw:items-center tw:gap-3">
          <Label
            for="height"
            class="tw:w-18 tw:text-right"
            >Height</Label
          >
          <Input
            id="heigth"
            size="sm"
            class="tw:w-full"
          />
        </fieldset>
      </div>
    </Popover>
    <span class="tw:ml-4 tw:text-green-600">{{ open }} ({{ typeof open }})</span>
  </div>

  <div class="tw:mt-4 tw:flex tw:gap-4">
    <div>
      align:
      <Select
        v-model="align"
        :options="ALIGN_OPTIONS"
      />
    </div>
    <div>
      side:
      <Select
        v-model="side"
        :options="SIDE_OPTIONS"
      />
    </div>
  </div>
</template>
