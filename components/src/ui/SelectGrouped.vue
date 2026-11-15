<script setup lang="ts">
import type { OptionHTMLAttributes } from 'vue';
import ChevronDown from '../icons/ChevronDown.vue';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    options: (OptionHTMLAttributes & { label: string; options?: (OptionHTMLAttributes & { label: string })[] })[];
    size?: 'sm' | 'md' | 'lg';
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
  <span
    :class="['select-wrapper', $attrs.class, { disabled }]"
    :style="$attrs.style"
  >
    <select
      v-bind="{ ...$attrs, class: undefined, style: undefined }"
      v-model="model"
      :class="[size, { disabled }]"
      :disabled="disabled"
    >
      <template
        v-for="[index, option] in options.entries()"
        :key="index"
      >
        <optgroup
          v-if="option.options"
          :label="option.label"
        >
          <option
            v-for="option2 of option.options"
            :key="option2.value"
            :value="option2.value"
            :disabled="option2.disabled"
            :selected="option2.selected"
          >
            {{ option2.label }}
          </option>
        </optgroup>
        <option
          v-else
          :value="option.value"
          :disabled="option.disabled"
          :selected="option.selected"
        >
          {{ option.label }}
        </option>
      </template>
    </select>
    <ChevronDown class="chevron" />
  </span>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  display: inline-block;

  &.disabled {
    opacity: 0.55;
    pointer-events: none;
  }
  &:not(.disabled):hover {
    opacity: 0.85;
  }
}

.chevron {
  position: absolute;
  top: 50%;
  right: 0.625rem;
  width: 0.7rem;
  height: 0.7rem;
  transform: translateY(-50%);
  pointer-events: none;
}

select {
  width: 100%;
  cursor: pointer;
  appearance: none;
  border: 1px solid var(--sr-color-control-border);
  border-radius: var(--sr-form-control-border-radius);

  &:focus-visible {
    outline: var(--sr-outline-width) solid var(--sr-outline-color);
    outline-offset: -1px;
  }

  option {
    color: var(--sr-color-select-option);
  }
  optgroup {
    color: var(--sr-color-select-option);
    font-weight: 600;
  }

  &.disabled {
    background-color: var(--sr-color-disabled-form-bg);
  }
  &.sm {
    padding: var(--sr-form-control-py-sm) calc(var(--sr-form-control-font-sm) * 0.75 + 1rem)
      var(--sr-form-control-py-sm) calc(var(--sr-form-control-font-sm) * 0.75);
    font-size: var(--sr-form-control-font-sm);
  }
  &.md {
    padding: var(--sr-form-control-py-md) calc(var(--sr-form-control-font-md) * 0.75 + 1rem)
      var(--sr-form-control-py-md) calc(var(--sr-form-control-font-md) * 0.75);
    font-size: var(--sr-form-control-font-md);
  }
  &.lg {
    padding: var(--sr-form-control-py-xl) calc(var(--sr-form-control-font-xl) * 0.75 + 1rem)
      var(--sr-form-control-py-xl) calc(var(--sr-form-control-font-xl) * 0.75);
    font-size: var(--sr-form-control-font-lg);
  }
}
</style>
