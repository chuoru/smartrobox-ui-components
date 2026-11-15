<script setup lang="ts">
import { computed } from 'vue';
import { Label } from 'reka-ui';
import type { LabelProps } from 'reka-ui';

const props = defineProps<
  LabelProps & {
    weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  }
>();

const labelProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { weight, ...rest } = props;
  return rest;
});
</script>

<template>
  <Label
    v-bind="labelProps"
    :class="weight || 'normal'"
  >
    <slot />
  </Label>
</template>

<style scoped>
label {
  color: var(--sr-color-text);

  &.thin {
    font-weight: 100;
  }
  &.extralight {
    font-weight: 200;
  }
  &.light {
    font-weight: 300;
  }
  &.normal {
    font-weight: 400;
  }
  &.medium {
    font-weight: 500;
  }
  &.semibold {
    font-weight: 600;
  }
  &.bold {
    font-weight: 700;
  }
  &.extrabold {
    font-weight: 800;
  }
}
</style>
