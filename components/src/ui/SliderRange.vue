<script setup lang="ts">
import { Slider } from 'reka-ui/namespaced';
</script>

<template>
  <Slider.Root class="slider-root">
    <Slider.Track class="slider-track">
      <Slider.Range class="slider-range" />
    </Slider.Track>
    <Slider.Thumb class="slider-thumb slider-thumb--first" />
    <Slider.Thumb class="slider-thumb slider-thumb--second" />
  </Slider.Root>
</template>

<style scoped>
.slider-root {
  position: relative;
  display: flex;
  height: 1.25rem;
  touch-action: none;
  align-items: center;
  user-select: none;
}

.slider-track {
  position: relative;
  height: 0.5rem;
  flex-grow: 1;
  border-radius: 9999px;
  background-color: var(--sr-gray-200);
}

.slider-range {
  position: absolute;
  height: 100%;
  border-radius: 9999px;
  background-color: var(--sr-primary-600);
}

.slider-thumb {
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  border: 1px solid var(--sr-gray-200);
  background-color: var(--sr-gray-50);
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);

  &:focus {
    outline: none;
  }
}

.slider-thumb--first {
  &:hover {
    background-color: var(--sr-gray-200);
  }
}

.slider-thumb--second {
  &:hover {
    background-color: var(--sr-gray-100);
  }

  &:focus-visible {
    outline: 2px solid var(--sr-primary-400);
  }
}
</style>
