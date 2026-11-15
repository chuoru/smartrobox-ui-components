<script setup lang="ts">
import { ContextMenuContent } from 'reka-ui';
</script>

<template>
  <ContextMenuContent class="context-menu-content">
    <slot />
  </ContextMenuContent>
</template>

<style scoped>
:deep(.context-menu-content) {
  z-index: 30;
  min-width: 13.75rem;
  border-radius: 0.375rem;
  border: 1px solid var(--sr-gray-300);
  background-color: var(--sr-gray-100);
  padding: 0.3125rem;
  outline: none;
}
</style>
