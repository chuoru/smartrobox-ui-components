<script setup lang="ts">
import { DropdownMenuArrow } from 'reka-ui';
</script>

<template>
  <DropdownMenuArrow class="dropdown-menu-arrow" />
</template>

<style scoped>
:deep(.dropdown-menu-arrow) {
  margin-top: -1px;
  fill: var(--sr-gray-50);
  stroke: var(--sr-gray-300);
}
</style>
