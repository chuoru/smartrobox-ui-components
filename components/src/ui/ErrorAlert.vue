<script setup lang="ts">
defineProps<{
  errors: string[];
  arrow?: boolean;
}>();
</script>

<template>
  <div
    v-if="errors.length"
    role="alert"
    class="error-alert"
    :class="{ arrow }"
  >
    <ul>
      <li
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.error-alert {
  position: relative;
  margin-top: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: var(--sr-danger-600);
  background-color: var(--sr-danger-50);
  border: 1px solid var(--sr-danger-500);
  border-radius: var(--sr-form-control-border-radius);

  ul {
    margin: 0;
    padding-left: 1rem;
    list-style: disc;
  }

  &.arrow::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 10px;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--sr-danger-500);
    border-left: 8px solid transparent;
  }
}
</style>
