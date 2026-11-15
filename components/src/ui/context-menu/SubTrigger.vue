<script setup lang="ts">
import { ContextMenuSubTrigger } from 'reka-ui';
</script>

<template>
  <ContextMenuSubTrigger class="context-menu-sub-trigger">
    <slot />
  </ContextMenuSubTrigger>
</template>

<style scoped>
.context-menu-sub-trigger {
  position: relative;
  display: flex;
  height: 1.5625rem;
  width: 100%;
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

  &[data-state='open'] {
    background-color: var(--sr-gray-300);
    color: white;
  }

  &[data-highlighted][data-state='open'] {
    background-color: var(--sr-gray-400);
    color: white;
  }
}
</style>
