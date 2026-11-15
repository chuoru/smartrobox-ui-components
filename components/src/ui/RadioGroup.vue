<script setup lang="ts">
import { RadioGroup } from 'reka-ui/namespaced';
import type { RadioGroupRootProps, RadioGroupItemProps, AcceptableValue } from 'reka-ui';

const model = defineModel<AcceptableValue>();

withDefaults(
  defineProps<
    RadioGroupRootProps & {
      options: {
        label: string;
        value: RadioGroupItemProps['value'];
      }[];
      id?: string;
      size?: 'xs' | 'sm' | 'md';
    }
  >(),
  { id: '', size: 'md' },
);
</script>

<template>
  <RadioGroup.Root
    v-model="model"
    class="root"
    :disabled="disabled"
  >
    <div
      v-for="[index, option] of options.entries()"
      :key="`${id}_${index}_${option.value}`"
      class="row"
    >
      <RadioGroup.Item
        :id="`${id}_${index}_${option.value}`"
        :value="option.value"
        :class="size"
        class="item"
      >
        <RadioGroup.Indicator class="indicator">
          <div class="dot" />
        </RadioGroup.Indicator>
      </RadioGroup.Item>
      <label :for="`${id}_${index}_${option.value}`">
        {{ option.label }}
      </label>
    </div>
  </RadioGroup.Root>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  .row {
    display: flex;
    align-items: center;
  }
  &.sm {
    width: 1rem;
    height: 1rem;
  }
  .item {
    width: 1.125rem;
    height: 1.125rem;
    cursor: default;
    border-radius: 9999px;
    border: 1px solid var(--sr-color-border);
    background-color: var(--sr-color-bg);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &.sm {
      width: 1rem;
      height: 1rem;
    }

    &.xs {
      width: 0.875rem;
      height: 0.875rem;
    }

    &:hover {
      background-color: var(--sr-color-border);
    }
    &:focus-visible {
      outline: var(--sr-outline-width) solid var(--sr-outline-color);
    }
    &[data-state='checked'] {
      border-color: var(--sr-primary-500);
    }
    .indicator {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;

      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background-color: var(--sr-primary-500);
      }
    }
  }
  label {
    padding-left: 0.5rem;
    line-height: 1;
  }
}
</style>
