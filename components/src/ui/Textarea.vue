<script setup lang="ts">
const model = defineModel<string | undefined>();
</script>

<template>
  <textarea
    v-model="model"
    class="root"
  />
</template>

<style scoped>
.root {
  border: 1px solid var(--sr-color-control-border);
  border-radius: var(--sr-form-control-border-radius);
  transition: all 0.15s ease-in-out;
  padding: var(--sr-form-control-py-sm) calc(var(--sr-form-control-font-sm) / 2);

  &:focus {
    outline: var(--sr-outline-width) solid var(--sr-outline-color);
    outline-offset: -1px;
    border-color: var(--sr-color-control-focus);
    box-shadow: 3px 4px 8px rgb(120 190 65 / 10%);
  }
}
</style>
