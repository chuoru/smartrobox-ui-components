<script setup lang="ts">
import { SAMPLES, toPascalCase } from '@/router';
</script>

<template>
  <nav
    aria-label="Samples"
    class="tw:h-full tw:bg-slate-100 tw:py-1 tw:dark:bg-slate-900"
  >
    <ul class="tw:h-full tw:overflow-y-scroll tw:pb-8">
      <li
        v-for="sample in SAMPLES"
        :key="sample"
        class="tw:border-b tw:border-slate-200 tw:dark:border-slate-800"
      >
        <router-link
          :to="`/samples/${sample}`"
          class="tw:block tw:px-2 tw:hover:bg-gray-200 tw:dark:hover:bg-slate-500"
          exact-active-class="tw:bg-gray-600 tw:text-gray-50 tw:hover:bg-gray-500"
        >
          {{ toPascalCase(sample) }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
