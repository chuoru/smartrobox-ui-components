<script setup lang="ts">
import { Switch } from 'reka-ui/namespaced';

withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md';
    label?: string;
  }>(),
  {
    size: 'md',
  },
);
</script>

<template>
  <Switch.Root
    class="root"
    :class="size"
    :aria-label="label"
  >
    <Switch.Thumb
      class="thumb"
      :class="size"
    >
      <slot />
    </Switch.Thumb>
  </Switch.Root>
</template>

<style scoped>
.root {
  position: relative;
  display: flex;
  height: 1.25rem;
  width: 2rem;
  border-radius: 9999px;
  border: 1px solid var(--sr-color-control-border);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  cursor: pointer;

  &.xs {
    height: 1rem;
    width: 1.6rem;
  }
  &.sm {
    height: 1.125rem;
    width: 1.8rem;
  }
  &:focus-visible {
    outline: var(--sr-outline-width) solid var(--sr-outline-color);
  }
  &[data-state='checked'] {
    background-color: var(--sr-color-control-checked);
  }
  &[data-state='unchecked'] {
    background-color: var(--sr-color-unchecked-switch-bg);
  }

  .thumb {
    margin-block: auto;
    display: flex;
    width: 0.875rem;
    height: 0.875rem;
    transform: translateX(0.125rem);
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid var(--sr-color-switch-thumb);
    background-color: var(--sr-color-switch-thumb);
    font-size: 0.75rem;

    &.xs {
      width: 0.65rem;
      height: 0.65rem;
    }
    &.sm {
      width: 0.75rem;
      height: 0.75rem;
    }
    &[data-state='checked'] {
      transform: translateX(100%);
      border-color: var(--sr-color-control-checked-fg);
      background-color: var(--sr-color-control-checked-fg);
    }
  }
}
</style>
