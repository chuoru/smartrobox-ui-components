<script setup lang="ts">
import { ContextMenuCheckboxItem } from 'reka-ui';
</script>

<template>
  <ContextMenuCheckboxItem class="context-menu-checkbox-item">
    <slot />
  </ContextMenuCheckboxItem>
</template>

<style scoped>
.context-menu-checkbox-item {
  position: relative;
  display: flex;
  height: 1.5625rem;
  align-items: center;
  border-radius: 3px;
  padding-inline: 0.3125rem;
  padding-left: 1.5625rem;
  font-size: 0.75rem;
  line-height: 1;
  color: var(--sr-gray-700);
  outline: none;
  user-select: none;

  &[data-disabled] {
    pointer-events: none;
    color: var(--sr-gray-300);
  }

  &[data-highlighted] {
    background-color: var(--sr-gray-400);
    color: white;
  }
}
</style>
