<script setup lang="ts">
import { ref } from 'vue';
import { Combobox } from '@smartrobox/ui';

const options = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Honeydew' },
      { name: 'Grapes' },
      { name: 'Watermelon' },
      { name: 'Cantaloupe' },
      { name: 'Pear' },
    ],
  },
  {
    name: 'Vegetable',
    children: [
      { name: 'Cabbage' },
      { name: 'Broccoli' },
      { name: 'Carrots' },
      { name: 'Lettuce' },
      { name: 'Spinach' },
      { name: 'Bok Choy' },
      { name: 'Cauliflower' },
      { name: 'Potatoes' },
    ],
  },
];
const value = ref<string>();
</script>

<template>
  <div class="tw:text-green-700 tw:dark:text-green-400">{{ value }} ({{ typeof value }})</div>
  <div class="tw:mt-2 tw:flex">
    <Combobox
      v-model="value"
      :options="options"
      :placeholder="'Search or select…'"
    />
  </div>
</template>
