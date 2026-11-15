<script setup lang="ts">
import { ContextMenuSeparator } from 'reka-ui';
</script>

<template>
  <ContextMenuSeparator class="context-menu-separator">
    <slot />
  </ContextMenuSeparator>
</template>

<style scoped>
.context-menu-separator {
  margin: 0.3125rem;
  height: 1px;
  background-color: var(--sr-gray-200);
}
</style>
