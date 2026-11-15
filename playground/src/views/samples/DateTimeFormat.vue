<script setup lang="ts">
import { ref } from 'vue';
import { dateShortFormat, datetimeShortFormat } from '@smartrobox/ui';
const value = ref(new Date());
const locales = ['ja', 'en'];
</script>

<template>
  <div>
    <table>
      <thead>
        <tr class="tw:border-b tw:border-gray-400">
          <th>function</th>
          <template
            v-for="locale in locales"
            :key="locale"
          >
            <th>{{ locale }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr class="tw:border-b tw:border-gray-400">
          <th class="tw:px-6 tw:py-2">(raw string)</th>
          <template
            v-for="locale in locales"
            :key="locale"
          >
            <td class="tw:px-6 tw:py-2">{{ dateShortFormat(value, locale) }}</td>
          </template>
        </tr>
        <tr class="tw:border-b tw:border-gray-400">
          <th class="tw:px-6 tw:py-2">datetimeShortFormat()</th>
          <template
            v-for="locale in locales"
            :key="locale"
          >
            <td class="tw:px-6 tw:py-2">{{ datetimeShortFormat(value, locale) }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>

  <div></div>
</template>
