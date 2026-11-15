<script setup lang="ts">
import { ContextMenuRadioItem } from 'reka-ui';
import type { ContextMenuRadioItemProps } from 'reka-ui';

defineProps<ContextMenuRadioItemProps>();
</script>

<template>
  <ContextMenuRadioItem
    v-bind="$props"
    class="context-menu-radio-item"
  >
    <slot />
  </ContextMenuRadioItem>
</template>

<style scoped>
.context-menu-radio-item {
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
