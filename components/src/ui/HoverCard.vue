<script setup lang="ts">
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui';
</script>

<template>
  <HoverCardRoot>
    <HoverCardTrigger class="trigger">
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="content"
        :side-offset="5"
      >
        <slot />

        <HoverCardArrow
          class="arrow"
          :width="12"
          :height="6"
        />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>

<style scoped>
.trigger {
  display: inline-block;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  outline: none;
}

:deep(.content) {
  z-index: 10;
  width: 18.75rem;
  border-radius: 0.25rem;
  border: 1px solid var(--sr-gray-300);
  background-color: var(--sr-gray-50);
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  .arrow {
    margin-top: -1px;
    fill: var(--sr-gray-50);
    stroke: var(--sr-gray-300);
  }
}
</style>
