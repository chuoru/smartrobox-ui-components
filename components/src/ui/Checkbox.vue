<script setup lang="ts">
import { MinusIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { Checkbox } from 'reka-ui/namespaced';
import type { CheckboxRootProps, CheckboxCheckedState } from 'reka-ui';

withDefaults(defineProps<CheckboxRootProps & { label?: string; value?: string; size?: 'xs' | 'sm' | 'md' }>(), {
  size: 'md',
});
const model = defineModel<CheckboxCheckedState>();
</script>

<template>
  <label>
    <Checkbox.Root
      v-model="model"
      class="checkbox"
      :class="size"
      :value="value"
      :disabled="disabled"
    >
      <Checkbox.Indicator
        class="indicator"
        force-mount
      >
        <MinusIcon
          v-if="model === 'indeterminate'"
          class="icon"
        />
        <CheckIcon
          v-else
          class="icon"
        />
      </Checkbox.Indicator>
    </Checkbox.Root>
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
label {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  &:has([disabled]) span {
    color: var(--sr-color-text-light);
  }
}
.checkbox {
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  justify-content: center;
  align-items: center;
  border-radius: var(--sr-form-control-border-radius);
  border: 1px solid var(--sr-gray-300);
  background-color: white;

  &.xs {
    width: 1rem;
    height: 1rem;
  }
  &.sm {
    width: 1.125rem;
    height: 1.125rem;
  }
  .indicator {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: var(--sr-form-control-border-radius);
    visibility: hidden;
    &[data-state='checked'],
    &[data-state='indeterminate'] {
      visibility: visible;
    }
  }
  .icon {
    color: var(--sr-gray-800);
    width: 16px;
    height: 16px;
    stroke-width: 1.5;
    stroke: var(--sr-gray-500);
  }

  &:hover {
    background-color: var(--sr-gray-100);
  }
  &[data-state='checked'],
  &[data-state='indeterminate'] {
    border-color: var(--sr-primary-500);
    background-color: var(--sr-primary-500);
    .icon {
      color: white;
      stroke: white;
    }
  }
  &:focus-visible {
    outline: solid var(--sr-outline-width) var(--sr-outline-color);
  }
  &:disabled {
    background-color: white;
    pointer-events: none;
  }
}
</style>
