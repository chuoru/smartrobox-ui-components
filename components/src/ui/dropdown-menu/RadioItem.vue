<script setup lang="ts">
import { DropdownMenuRadioItem } from 'reka-ui';
import type { DropdownMenuRadioItemProps } from 'reka-ui';

defineProps<DropdownMenuRadioItemProps>();
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="$props"
    class="dropdown-menu-radio-item"
  >
    <slot />
  </DropdownMenuRadioItem>
</template>

<style scoped>
.dropdown-menu-radio-item {
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
