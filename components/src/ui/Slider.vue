<script setup lang="ts">
import { computed } from 'vue';
import { Slider } from 'reka-ui/namespaced';

const props = defineProps<{
  modelValue: number;
  label: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const model = computed({
  get: () => [props.modelValue],
  set: (values: number[]) => {
    emit('update:modelValue', values[0]);
  },
});
</script>

<template>
  <Slider.Root
    v-model="model"
    class="root"
  >
    <Slider.Track class="track">
      <Slider.Range class="range" />
    </Slider.Track>
    <Slider.Thumb
      class="thumb"
      :aria-label="label"
    />
  </Slider.Root>
</template>

<style scoped>
.root {
  position: relative;
  display: flex;
  height: 1.25rem;
  touch-action: none;
  align-items: center;
  user-select: none;

  .track {
    position: relative;
    height: 0.5rem;
    flex-grow: 1;
    border-radius: 9999px;
    background-color: var(--sr-gray-200);

    .range {
      position: absolute;
      height: 100%;
      border-radius: 9999px;
      background-color: var(--sr-color-success);
    }
  }
  .thumb {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    border: 1px solid var(--sr-color-control-border);
    background-color: var(--sr-gray-50);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background-color: var(--sr-gray-100);
    }
    &:focus-visible {
      outline: var(--sr-outline-width) solid var(--sr-outline-color);
    }
  }
}
</style>
