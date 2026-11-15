<script setup lang="ts">
import ArrowUpRightFromSqure from '../icons/ArrowUpRightFromSquare.vue';

defineProps<{
  to: string;
}>();
</script>

<template>
  <a
    :href="to"
    target="_blank"
    rel="noreferrer noopener"
    class="link"
  >
    <slot />
    <ArrowUpRightFromSqure
      class="icon"
      aria-hidden="true"
    />
  </a>
</template>

<style scoped>
.link {
  display: inline-flex;
  align-items: center;
  padding-right: 0.125rem;
  color: var(--sr-color-link);

  &:hover {
    opacity: 0.75;
  }

  .icon {
    margin-left: 0.375rem;
    width: 0.75rem;
    height: 0.75rem;
    color: var(--sr-color-text-light);
  }
}
</style>
