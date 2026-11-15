<script setup lang="ts">
import { Separator } from '@smartrobox/ui';
</script>

<template>
  <div class="tw:mx-3.75 tw:w-full tw:max-w-75">
    <div class="tw:text-sm tw:leading-5 tw:font-semibold tw:text-stone-700 tw:dark:text-white">Reka UI</div>
    <div class="tw:text-sm tw:leading-5 tw:text-stone-700 tw:dark:text-white">An open-source UI component library.</div>
    <Separator class="tw:my-3.75" />
    <div class="tw:flex tw:h-5 tw:items-center">
      <div class="tw:text-sm tw:leading-5 tw:text-stone-700 tw:dark:text-white">Blog</div>
      <Separator
        class="tw:mx-3.75"
        decorative
        orientation="vertical"
      />
      <div class="tw:text-sm tw:leading-5 tw:text-stone-700 tw:dark:text-white">Docs</div>
      <Separator
        class="tw:mx-3.75"
        decorative
        orientation="vertical"
      />
      <div class="tw:text-sm tw:leading-5 tw:text-stone-700 tw:dark:text-white">Source</div>
    </div>
  </div>
</template>
