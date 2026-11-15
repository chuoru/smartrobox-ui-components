<script setup lang="ts">
import { DropdownMenuSubContent } from 'reka-ui';
</script>

<template>
  <DropdownMenuSubContent class="dropdown-menu-sub-content">
    <slot />
  </DropdownMenuSubContent>
</template>

<style scoped>
:deep(.dropdown-menu-sub-content) {
  z-index: 30;
  min-width: 13.75rem;
  border-radius: 0.375rem;
  border: 1px solid var(--sr-gray-300);
  background-color: var(--sr-gray-50);
  padding: 0.3125rem;
  outline: none;
}
</style>
