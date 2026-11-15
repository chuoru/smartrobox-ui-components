<script setup lang="ts">
import { ContextMenuLabel } from 'reka-ui';
</script>

<template>
  <ContextMenuLabel class="context-menu-label">
    <slot />
  </ContextMenuLabel>
</template>

<style scoped>
.context-menu-label {
  padding-left: 1.5625rem;
  font-size: 0.75rem;
  line-height: 1.5625rem;
  font-weight: 700;
  color: var(--sr-success-800);
}
</style>
