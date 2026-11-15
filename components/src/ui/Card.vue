<script setup lang="ts">
withDefaults(
  defineProps<{
    shadow?: boolean;
    hover?: boolean;
    noBody?: boolean;
  }>(),
  {
    shadow: true,
  },
);
</script>

<template>
  <div
    class="card"
    :class="{ shadow, hover }"
  >
    <slot name="image" />
    <div
      v-if="$slots.header"
      class="header"
    >
      <slot name="header" />
    </div>
    <slot v-if="noBody" />
    <div
      v-else
      class="body"
    >
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: var(--sr-color-text);
  background-color: var(--sr-color-bg);
  border: 1px solid rgb(0 0 0 / 5%);
  border-radius: 0.375rem;
  transition: all 0.15s ease;

  &.shadow {
    box-shadow: var(--sr-card-shadow);
  }
  &.hover:hover {
    transform: translateY(-20px);
  }

  .header {
    padding: 1.25rem 1.5rem;
    color: var(--sr-color-heading);
    border-bottom: 1px solid rgb(0 0 0 / 5%);
    &:first-child {
      border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
    }
  }
  .body {
    flex: 1 1 auto;
    padding: 1.5rem;
  }
  .footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid rgb(0 0 0 / 5%);
  }
}
</style>
