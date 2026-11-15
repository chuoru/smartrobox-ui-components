<script setup lang="ts">
import { DropdownMenuItemIndicator } from 'reka-ui';
</script>

<template>
  <DropdownMenuItemIndicator class="dropdown-menu-item-indicator">
    <slot />
  </DropdownMenuItemIndicator>
</template>

<style scoped>
.dropdown-menu-item-indicator {
  position: absolute;
  left: 0;
  display: inline-flex;
  width: 1.5625rem;
  align-items: center;
  justify-content: center;
}
</style>
