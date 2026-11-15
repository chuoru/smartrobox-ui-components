<script setup lang="ts">
import { ref } from 'vue';
import { HoverCard } from '@smartrobox/ui';

const value = ref(false);
</script>

<template>
  <div class="tw:mb-4 tw:text-green-600">{{ value }} ({{ typeof value }})</div>
  <HoverCard v-model:open="value">
    <template #trigger>
      <img
        class="tw:block tw:h-11.25 tw:w-11.25 tw:rounded-full tw:border-slate-500 tw:dark:border"
        src="/smartrobox-logo.svg"
      />
    </template>

    <div class="tw:flex tw:flex-col tw:gap-1.75">
      <img
        class="tw:block tw:h-15 tw:w-15 tw:rounded-full"
        src="/smartrobox-logo.svg"
        alt="Unovue"
      />
      <div class="tw:flex tw:flex-col tw:gap-3.75">
        <div>
          <div class="tw:text-mauve12 tw:m-0 tw:text-sm tw:leading-normal tw:font-medium">Unovue</div>
          <div class="tw:text-mauve10 tw:m-0 tw:text-sm tw:leading-normal">@unovue</div>
        </div>
        <div class="tw:text-mauve12 tw:m-0 tw:text-sm tw:leading-normal">
          Components, icons, colors, and templates for building high-quality, accessible UI. Free and open-source.
        </div>
        <div class="tw:flex tw:gap-3.75">
          <div class="tw:flex tw:gap-1.25">
            <div class="tw:text-mauve12 tw:m-0 tw:text-sm tw:leading-normal tw:font-medium">0</div>
            <div class="tw:text-mauve10 tw:m-0 tw:text-sm tw:leading-normal">Following</div>
          </div>
          <div class="tw:flex tw:gap-1.25">
            <div class="tw:text-mauve12 tw:m-0 tw:text-sm tw:leading-normal tw:font-medium">2,900</div>
            <div class="tw:text-mauve10 tw:m-0 tw:text-sm tw:leading-normal">Followers</div>
          </div>
        </div>
      </div>
    </div>
  </HoverCard>
</template>
