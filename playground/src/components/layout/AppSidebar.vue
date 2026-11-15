<script setup lang="ts">
import { SAMPLES, toPascalCase } from '@/router';
</script>

<template>
  <div class="tw:h-full tw:bg-slate-100 tw:py-1 tw:dark:bg-slate-900">
    <ul class="tw:h-full tw:overflow-y-scroll tw:pb-8">
      <router-link
        v-for="sample in SAMPLES"
        :key="sample"
        :to="`/samples/${sample}`"
        v-slot="{ isActive }"
      >
        <li
          :key="sample"
          :class="[
            'tw:border-b tw:border-slate-200 tw:px-2 tw:hover:bg-gray-200 tw:dark:border-slate-800 tw:dark:hover:bg-slate-500',
            { 'tw:bg-gray-600 tw:text-gray-50 tw:hover:bg-gray-500': isActive },
          ]"
        >
          {{ toPascalCase(sample) }}
        </li>
      </router-link>
    </ul>
  </div>
</template>
