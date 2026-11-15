<script setup lang="ts">
import { ref } from 'vue';
import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon, BoldIcon, ItalicIcon, StrikethroughIcon } from '@heroicons/vue/24/solid';

import { ToggleGroup } from '@smartrobox/ui';

const items = ref([
  { value: 'left', icon: Bars3BottomLeftIcon },
  { value: 'center', icon: Bars3Icon },
  { value: 'right', icon: Bars3BottomRightIcon },
]);

const items2 = ref([
  { value: 'bold', icon: BoldIcon },
  { value: 'italic', icon: ItalicIcon },
  { value: 'strikethrough', icon: StrikethroughIcon },
]);

const selected = ref('left');
const multiSelected = ref([]);
</script>

<template>
  <div>
    <div class="tw:mb-7">
      <h1 class="tw:my-2 tw:mb-4 tw:border-t tw:border-b">Single Select</h1>
      <ToggleGroup
        v-model="selected"
        type="single"
        :items="items"
      />
      <div class="tw:text-green-600">{{ selected }} ({{ typeof selected }})</div>
    </div>

    <div class="tw:mb-7">
      <h1 class="tw:my-2 tw:mb-4 tw:border-t tw:border-b">Multiple Select</h1>
      <ToggleGroup
        v-model="multiSelected"
        type="multiple"
        :items="items2"
      />
      <div class="tw:text-green-600">{{ multiSelected }} ({{ typeof multiSelected }})</div>
    </div>
  </div>
</template>
