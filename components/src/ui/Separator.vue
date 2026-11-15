<script setup lang="ts">
import { Separator } from 'reka-ui/namespaced';
</script>

<template>
  <Separator class="separator" />
</template>

<style scoped>
.separator {
  background-color: var(--sr-color-border);

  &[data-orientation='horizontal'] {
    height: 1px;
    width: 100%;
  }
  &[data-orientation='vertical'] {
    height: 100%;
    width: 1px;
  }
}
</style>
