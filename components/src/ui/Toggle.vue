<script setup lang="ts">
import { Toggle } from 'reka-ui';
</script>

<template>
  <Toggle class="toggle">
    <slot />
  </Toggle>
</template>

<style scoped>
.toggle {
  display: flex;
  height: 1.75rem;
  width: 1.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.125rem;
  border: 1px solid var(--sr-color-control-border);
  background-color: white;
  font-size: 1rem;
  line-height: 1rem;
  color: var(--sr-gray-800);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:focus-within {
    box-shadow: 0 0 0 1px var(--sr-gray-300);
  }
  &:hover {
    background-color: var(--sr-gray-100);
  }
  &:focus-visible {
    outline: var(--sr-outline-width) solid var(--sr-outline-color);
  }
  &[data-state='on'] {
    color: white;
    border-color: var(--sr-primary-600);
    background-color: var(--sr-primary-600);
  }
}
</style>
