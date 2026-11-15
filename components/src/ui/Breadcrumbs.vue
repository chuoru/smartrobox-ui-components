<script setup lang="ts">
import { computed } from 'vue';
import type { Property } from 'csstype';

type BreadcrumbItem = {
  name: string;
  to?: string;
};

const props = withDefaults(
  defineProps<{
    items: BreadcrumbItem[];
    maxLinkWidth?: Property.MaxWidth;
  }>(),
  {
    maxLinkWidth: '12rem',
  },
);

const isReady = computed<boolean>(() => {
  return props.items.slice(0, -1).findIndex((item) => !item.name) === -1;
});
</script>

<template>
  <nav
    v-if="isReady"
    class="breadcrumbs"
  >
    <ul>
      <li
        v-for="(item, index) of props.items"
        :key="`${index}-${item.name}`"
      >
        <router-link
          v-if="item.to"
          :to="item.to"
          class="text-primary hover:text-primary-focus transition-colors"
          :style="{ maxWidth: maxLinkWidth }"
        >
          {{ item.name }}
        </router-link>
        <span
          v-else
          :style="{ maxWidth: maxLinkWidth }"
        >
          {{ item.name }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  font-size: 0.9rem;

  ul {
    display: flex;
  }
  li {
    display: flex;
    min-width: 0;

    a,
    span {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    a {
      color: var(--sr-color-link);
      &:hover {
        opacity: 0.85;
      }
    }
    & + li::before {
      content: '\203A';
      margin-left: 0.4rem;
      margin-right: 0.4rem;
    }
  }
}
</style>
