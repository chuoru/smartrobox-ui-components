<script setup lang="ts">
import type { OptionHTMLAttributes } from 'vue';
import ChevronDown from '../icons/ChevronDown.vue';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    options: (OptionHTMLAttributes & { label: string })[];
    size?: 'xs' | 'sm' | 'md' | 'lg';
    multiple?: boolean;
    disabled?: boolean;
  }>(),
  {
    size: 'md',
    multiple: false,
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
      :class="[size, { single: !multiple }, { disabled }]"
      :multiple="multiple"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :selected="option.selected"
      >
        {{ option.label }}
      </option>
    </select>
    <ChevronDown
      v-if="!multiple"
      class="chevron"
    />
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
    opacity: 0.75;
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
  border: 1px solid var(--sr-color-border);
  border-radius: var(--sr-form-control-border-radius);

  &.disabled {
    background-color: var(--sr-color-disabled-form-bg);
  }

  &.single {
    option {
      /* This option is only enabled in the Blink engine (Chrome, Edge) and is ignored in the Gecko engine (Firefox). The same applies to the 'option' element inside SelectGrouped.vue. */
      color: var(--sr-color-select-option);
    }
  }

  &.xs {
    padding: var(--sr-form-control-py-xs) calc(var(--sr-form-control-font-xs) * 0.75 + 1rem)
      var(--sr-form-control-py-xs) calc(var(--sr-form-control-font-xs) * 0.75);
    font-size: var(--sr-form-control-font-xs);
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
