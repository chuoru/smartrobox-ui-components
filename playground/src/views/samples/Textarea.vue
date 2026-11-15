<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '@smartrobox/ui';

const values = ref([undefined, undefined, undefined, undefined]);
</script>

<template>
  <div class="tw:flex tw:w-1/3 tw:flex-col">
    both
    <Textarea
      aria-label="Comment"
      v-model="values[0]"
      style="resize: both"
    />
    <div class="tw:text-green-700 tw:dark:text-green-400">
      {{ values[0] }}
    </div>
  </div>
  <div class="tw:mt-4 tw:flex tw:w-1/3 tw:flex-col">
    horizontal
    <Textarea
      aria-label="Comment"
      v-model="values[1]"
      style="resize: horizontal"
    />
    <div class="tw:text-green-700 tw:dark:text-green-400">
      {{ values[1] }}
    </div>
  </div>
  <div class="tw:mt-4 tw:flex tw:w-1/3 tw:flex-col">
    vertical
    <Textarea
      aria-label="Comment"
      v-model="values[2]"
      style="resize: vertical"
    />
    <div class="tw:text-green-700 tw:dark:text-green-400">
      {{ values[2] }}
    </div>
  </div>
  <div class="tw:mt-4 tw:flex tw:w-1/3 tw:flex-col">
    none
    <Textarea
      aria-label="Comment"
      v-model="values[3]"
      style="resize: none"
    />
    <div class="tw:text-green-700 tw:dark:text-green-400">
      {{ values[3] }}
    </div>
  </div>
</template>
