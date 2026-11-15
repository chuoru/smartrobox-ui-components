<script setup lang="ts">
import { DropdownMenuContent } from 'reka-ui';
</script>

<template>
  <DropdownMenuContent class="dropdown-menu-content">
    <slot />
  </DropdownMenuContent>
</template>

<style scoped>
:deep(.dropdown-menu-content) {
  z-index: 30;
  min-width: 13.75rem;
  border-radius: 0.375rem;
  border: 1px solid var(--sr-gray-300);
  background-color: var(--sr-gray-50);
  padding: 0.3125rem;
  outline: none;
}
</style>
