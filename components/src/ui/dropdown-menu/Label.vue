<script setup lang="ts">
import { DropdownMenuLabel } from 'reka-ui';
</script>

<template>
  <DropdownMenuLabel class="dropdown-menu-label">
    <slot />
  </DropdownMenuLabel>
</template>

<style scoped>
.dropdown-menu-label {
  padding-left: 1.5625rem;
  font-size: 0.75rem;
  line-height: 1.5625rem;
  font-weight: 700;
  color: var(--sr-success-800);
}
</style>
