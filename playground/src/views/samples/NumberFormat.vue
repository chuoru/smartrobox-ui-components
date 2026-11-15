<script setup lang="ts">
import { useNumberFormat } from '@smartrobox/ui';

const { formatLocaleNumber, formatLocaleNumberWithDigits } = useNumberFormat();

const values = [12, 12345, 12345.6, 12345.6789];
const locales = ['ja', 'en', 'de', 'fr'];
</script>

<template>
  <h1 class="tw:mb-1 tw:text-xl">formatLocaleNumber()</h1>
  <table class="tw:font-mono">
    <thead>
      <tr>
        <th
          v-for="(locale, index) of locales"
          :key="index"
          class="tw:border tw:border-gray-400 tw:px-4 tw:py-1 tw:text-center"
        >
          {{ locale }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(value, index) of values"
        :key="index"
      >
        <td
          v-for="(locale, index) of locales"
          :key="index"
          class="tw:border tw:border-gray-400 tw:px-4 tw:py-1 tw:text-right"
        >
          {{ formatLocaleNumber(value, locale) }}
        </td>
      </tr>
    </tbody>
  </table>

  <h1 class="tw:mt-4 tw:mb-1 tw:text-xl">formatLocaleNumberWithDigits()</h1>
  <table class="tw:font-mono">
    <thead>
      <tr>
        <th
          v-for="(locale, index) of locales"
          :key="index"
          class="tw:border tw:border-gray-400 tw:px-4 tw:py-1 tw:text-center"
        >
          {{ locale }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(value, index) of values"
        :key="index"
      >
        <td
          v-for="(locale, index) of locales"
          :key="index"
          class="tw:border tw:border-gray-400 tw:px-4 tw:py-1 tw:text-right"
        >
          {{ formatLocaleNumberWithDigits(value, locale, 2, false) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
