<script setup lang="ts">
import { Primitive } from 'reka-ui';
import type { AsTag } from 'reka-ui';
import type { Component } from 'vue';
import type { ButtonSize, ButtonVariant } from './button';

withDefaults(
  defineProps<{
    as?: AsTag | Component;
    asChild?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    outline?: boolean;
    size?: ButtonSize;
  }>(),
  {
    as: 'button',
    variant: 'default',
    size: 'md',
  },
);
</script>

<template>
  <Primitive
    class="primitive"
    :as="as"
    :as-child="asChild"
    :type="type"
    :class="[variant, size, { outline }]"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
.primitive {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: var(--sr-btn-font-weight);
  letter-spacing: var(--sr-btn-letter-spacing);
  line-height: 1.5;
  border-radius: var(--sr-form-control-border-radius);
  border: 1px solid var(--btn-border, var(--btn-bg));
  color: var(--btn-text);
  background-color: var(--btn-bg);
  box-shadow: var(--sr-btn-shadow);
  transition: all 0.15s ease;

  &:hover {
    box-shadow: var(--sr-btn-shadow-hover);
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: solid var(--sr-outline-width) var(--sr-outline-color);
    outline-offset: 1px;
  }
  &:disabled {
    opacity: 0.65;
    pointer-events: none;
    box-shadow: none;
  }

  &.default {
    --btn-text: var(--sr-btn-default-text);
    --btn-bg: var(--sr-btn-default-bg);
    --btn-border: var(--sr-color-btn-border);
  }
  &.primary {
    --btn-text: var(--sr-btn-primary-text);
    --btn-bg: var(--sr-btn-primary-bg);
  }
  &.secondary {
    --btn-text: var(--sr-btn-secondary-text);
    --btn-bg: var(--sr-btn-secondary-bg);
  }
  &.success {
    --btn-text: var(--sr-btn-success-text);
    --btn-bg: var(--sr-btn-success-bg);
  }
  &.info {
    --btn-text: var(--sr-btn-info-text);
    --btn-bg: var(--sr-btn-info-bg);
  }
  &.warning {
    --btn-text: var(--sr-btn-warning-text);
    --btn-bg: var(--sr-btn-warning-bg);
  }
  &.danger {
    --btn-text: var(--sr-btn-danger-text);
    --btn-bg: var(--sr-btn-danger-bg);
  }

  &.outline {
    color: var(--btn-bg);
    background-color: transparent;
    border-color: var(--btn-bg);
    box-shadow: none;
    &:hover {
      color: var(--btn-text);
      background-color: var(--btn-bg);
    }
  }

  &.link,
  &.none {
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
    &:hover {
      box-shadow: none;
      transform: none;
    }
  }
  &.link {
    color: var(--sr-color-link);
    &:hover {
      opacity: 0.75;
    }
  }
  &.none {
    color: unset;
    font-weight: unset;
    letter-spacing: unset;
    &:hover {
      opacity: 0.85;
    }
  }

  &.\32 xs {
    padding: var(--sr-form-control-py-2xs) var(--sr-form-control-px-2xs);
    font-size: var(--sr-form-control-font-2xs);
  }
  &.xs {
    padding: var(--sr-form-control-py-xs) var(--sr-form-control-px-xs);
    font-size: var(--sr-form-control-font-xs);
  }
  &.sm {
    padding: var(--sr-form-control-py-sm) var(--sr-form-control-px-sm);
    font-size: var(--sr-form-control-font-sm);
  }
  &.md {
    padding: var(--sr-form-control-py-md) var(--sr-form-control-px-md);
    font-size: var(--sr-form-control-font-md);
  }
  &.lg {
    padding: var(--sr-form-control-py-lg) var(--sr-form-control-px-lg);
    font-size: var(--sr-form-control-font-lg);
  }
  &.xl {
    padding: var(--sr-form-control-py-xl) var(--sr-form-control-px-xl);
    font-size: var(--sr-form-control-font-xl);
  }
}
</style>
