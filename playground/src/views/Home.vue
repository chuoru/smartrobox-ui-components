<script setup lang="ts">
import { LinkExternal } from '@smartrobox/ui';
</script>

<template>
  <h1 class="tw:text-lg">External Links</h1>
  <ul class="tw:my-2 tw:ml-5 tw:list-disc">
    <li>
      <LinkExternal to="https://tailwindcss.com/">tailwindcss</LinkExternal>
    </li>
    <li>
      <LinkExternal to="https://heroicons.com/">heroicons</LinkExternal>
    </li>
    <li>
      <LinkExternal to="https://reka-ui.com/">Reka UI</LinkExternal>
    </li>
    <li>
      <LinkExternal to="https://motion.dev/docs/vue">Motion Vue</LinkExternal>
    </li>
  </ul>
</template>
