<template>
  <div class="context-menu-item-suffix">
    <slot />
  </div>
</template>

<style scoped>
.context-menu-item-suffix {
  left: 1.25rem;
  margin-left: auto;
  color: var(--sr-gray-700);

  :where([data-disabled]) & {
    color: var(--sr-gray-300);
  }

  :where([data-highlighted]) & {
    color: white;
  }
}
</style>
