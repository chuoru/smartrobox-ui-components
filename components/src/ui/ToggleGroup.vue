<script setup lang="ts">
import { ToggleGroup } from 'reka-ui/namespaced';
import type { FunctionalComponent } from 'vue';
import type { ToggleGroupRootProps, AcceptableValue } from 'reka-ui';

type Item = {
  value: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-object-type
  icon: FunctionalComponent<any, {}, any, {}>;
};

const model = defineModel<AcceptableValue | AcceptableValue[]>();

withDefaults(
  defineProps<
    ToggleGroupRootProps & {
      items: Item[];
      type: 'single' | 'multiple';
    }
  >(),
  {
    items: () => [],
    type: 'single',
  },
);
</script>

<template>
  <ToggleGroup.Root
    v-model="model"
    :type="type"
    class="root"
  >
    <ToggleGroup.Item
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :aria-label="item.label"
      class="item"
    >
      <slot
        name="item"
        :item="item"
      >
        <component
          :is="item.icon"
          class="icon"
        />
      </slot>
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>

<style scoped>
.root {
  display: flex;

  .item {
    display: flex;
    height: 1.75rem;
    width: 1.75rem;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--sr-color-control-border);
    background-color: white;
    font-size: 1rem;
    line-height: 1rem;
    color: var(--sr-gray-800);

    &:first-child {
      border-top-left-radius: 0.125rem;
      border-bottom-left-radius: 0.125rem;
    }
    &:last-child {
      border-top-right-radius: 0.125rem;
      border-bottom-right-radius: 0.125rem;
    }
    &:hover {
      background-color: var(--sr-gray-100);
    }
    &:focus {
      z-index: 10;
    }
    &:focus-visible {
      outline: var(--sr-outline-width) solid var(--sr-outline-color);
    }
    &[data-state='on'] {
      color: white;
      border-color: var(--sr-primary-600);
      background-color: var(--sr-primary-600);
    }

    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
