<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui';

const model = defineModel<number>({ default: 0 });
</script>

<template>
  <ProgressRoot class="root">
    <ProgressIndicator
      class="indicator"
      :style="`transform: translateX(-${100 - model}%)`"
    />
  </ProgressRoot>
</template>

<style scoped>
.root {
  position: relative;
  height: 0.75rem;
  overflow: hidden;
  border-radius: 9999px;
  border: 1px solid var(--sr-color-border);
  background-color: var(--sr-color-bg-dlg);

  .indicator {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 9999px;
    background-color: var(--sr-success-600);
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(
        -45deg,
        rgb(255 255 255 / 20%),
        transparent 25%,
        transparent 50%,
        rgb(255 255 255 / 20%),
        rgb(255 255 255 / 20%),
        transparent 75%,
        transparent
      );
      background-size: 30px 30px;
      animation: progress 1s linear infinite;
    }
  }
}

@keyframes progress {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 30px 0;
  }
}
</style>
