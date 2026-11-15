<script setup lang="ts">
import { DropdownMenuSeparator } from 'reka-ui';
</script>

<template>
  <DropdownMenuSeparator class="dropdown-menu-separator">
    <slot />
  </DropdownMenuSeparator>
</template>

<style scoped>
.dropdown-menu-separator {
  margin: 0.3125rem;
  height: 1px;
  background-color: var(--sr-gray-200);
}
</style>
