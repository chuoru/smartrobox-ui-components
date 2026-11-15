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
  border: 1px solid var(--sr-gray-300);
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
    outline: 2px solid var(--sr-primary-400);
  }
  &[data-state='on'] {
    background-color: var(--sr-gray-300);
  }
}
</style>
