<script setup lang="ts">
import { ContextMenuItemIndicator } from 'reka-ui';
</script>

<template>
  <ContextMenuItemIndicator class="context-menu-item-indicator">
    <slot />
  </ContextMenuItemIndicator>
</template>

<style scoped>
.context-menu-item-indicator {
  position: absolute;
  left: 0;
  display: inline-flex;
  width: 1.5625rem;
  align-items: center;
  justify-content: center;
}
</style>
