<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
  }>(),
  {
    size: 'md',
    disabled: false,
  },
);
const model = defineModel();
</script>

<template>
  <input
    v-model="model"
    :class="size"
    :disabled="disabled"
  />
</template>

<style scoped>
input {
  color: var(--sr-color-text);
  border-radius: var(--sr-form-control-border-radius);
  border: 1px solid var(--sr-color-control-border);
  background-color: var(--sr-color-bg);
  transition: all 0.15s ease-in-out;

  &:focus {
    outline: var(--sr-outline-width) solid var(--sr-outline-color);
    outline-offset: -1px;
    border-color: var(--sr-color-control-focus);
    box-shadow: 3px 4px 8px rgb(120 190 65 / 10%);
  }

  &::placeholder {
    color: var(--sr-color-placeholder);
  }

  /* background-color can't override the browser's autofill background,
     so fake it with an inset box-shadow and keep text/caret colors normal */
  &:autofill {
    box-shadow: 0 0 0 1000px var(--sr-color-bg) inset;
    -webkit-text-fill-color: var(--sr-color-text);
    caret-color: var(--sr-color-text);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    color: var(--sr-gray-500);
  }

  &.sm {
    padding: var(--sr-form-control-py-sm) calc(var(--sr-form-control-font-sm) / 2);
    font-size: var(--sr-form-control-font-sm);
  }
  &.md {
    padding: var(--sr-form-control-py-md) calc(var(--sr-form-control-font-md) / 2);
    font-size: var(--sr-form-control-font-md);
  }
  &.lg {
    padding: var(--sr-form-control-py-lg) calc(var(--sr-form-control-font-lg) / 2);
    font-size: var(--sr-form-control-font-lg);
  }
  &.xl {
    padding: var(--sr-form-control-py-xl) calc(var(--sr-form-control-font-xl) / 2);
    font-size: var(--sr-form-control-font-xl);
  }
}
</style>
