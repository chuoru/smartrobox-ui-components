<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { PopoverNative, RadioGroup } from '@smartrobox/ui';

const data = ref([
  { tw: 'tw:top-0 tw:left-0', placement: 'bottom-right' as const },
  {
    tw: 'tw:top-20 tw:left-0',
    placement: 'bottom-right' as const,
    marginLeft: '-0.5rem',
    marginTop: '-0.5rem',
  },
  { tw: 'tw:top-0 tw:right-0', placement: 'bottom-left' as const },
  {
    tw: 'tw:top-20 tw:right-0',
    placement: 'bottom-left' as const,
    marginRight: '-0.5rem',
    marginTop: '-0.5rem',
  },
  { tw: 'tw:bottom-0 tw:right-0', placement: 'top-left' as const },
  {
    tw: 'tw:bottom-20 tw:right-0',
    placement: 'top-left' as const,
    marginRight: '-0.5rem',
    marginBottom: '-0.5rem',
  },
  { tw: 'tw:bottom-0 tw:left-0', placement: 'top-right' as const },
  {
    tw: 'tw:bottom-20 tw:left-0',
    placement: 'top-right' as const,
    marginLeft: '-0.5rem',
    marginBottom: '-0.5rem',
  },
]);
const isOpen = ref<boolean[]>(Array(data.value.length).fill(false));
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
const value = ref<string>();

const handleToggle = (index: number, event: ToggleEvent) => {
  isOpen.value[index] = event.newState === 'open';
};
</script>

<template>
  <div class="tw:relative tw:h-full">
    <div
      v-for="(elem, index) of data"
      :key="elem.placement"
      :class="elem.tw"
      class="tw:absolute"
    >
      <div>
        <div class="tw:mb-2 tw:text-green-700 tw:dark:text-green-400">{{ isOpen[index] }}</div>
      </div>

      <PopoverNative
        :trigger-label="`Open ${elem.placement} popover`"
        :placement="elem.placement"
        :margin-top="elem.marginTop ?? 0"
        :margin-right="elem.marginRight ?? 0"
        :margin-bottom="elem.marginBottom ?? 0"
        :margin-left="elem.marginLeft ?? 0"
        @toggle="handleToggle(index, $event)"
      >
        <template #trigger>
          <div class="button tw:cursor-pointer tw:rounded-full tw:border tw:border-gray-300 tw:p-1">
            <PlusIcon class="tw:size-5" />
          </div>
        </template>
        <div>
          <h1>{{ elem.placement }}</h1>
          <div class="tw:mt-4">
            <RadioGroup
              v-model="value"
              size="sm"
              :options="options"
            />
          </div>
        </div>
      </PopoverNative>
    </div>
  </div>
</template>
