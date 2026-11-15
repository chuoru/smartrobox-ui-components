<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/vue/24/solid';
import { Pagination } from 'reka-ui/namespaced';
import type { PaginationRootProps } from 'reka-ui';

const page = defineModel<number>('page');
defineProps<PaginationRootProps>();
</script>

<template>
  <Pagination.Root
    v-bind="$props"
    v-model:page="page"
  >
    <Pagination.List
      v-slot="{ items }"
      class="list"
    >
      <Pagination.First class="nav-btn">
        <ChevronDoubleLeftIcon class="nav-icon" />
      </Pagination.First>

      <Pagination.Prev class="nav-btn prev">
        <ChevronLeftIcon class="nav-icon" />
      </Pagination.Prev>

      <template v-for="(page, index) in items">
        <Pagination.ListItem
          v-if="page.type === 'page'"
          :key="index"
          :value="page.value"
          class="page-item"
        >
          {{ page.value }}
        </Pagination.ListItem>
        <Pagination.Ellipsis
          v-else
          :key="page.type"
          :index="index"
          class="ellipsis"
        >
          &#8230;
        </Pagination.Ellipsis>
      </template>

      <Pagination.Next class="nav-btn next">
        <ChevronRightIcon class="nav-icon" />
      </Pagination.Next>

      <Pagination.Last class="nav-btn">
        <ChevronDoubleRightIcon class="nav-icon" />
      </Pagination.Last>
    </Pagination.List>
  </Pagination.Root>
</template>

<style scoped>
.list {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.875rem;
  color: var(--sr-color-text);

  .nav-btn {
    display: flex;
    height: 1.75rem;
    width: 1.75rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--sr-color-border);

    &:hover {
      background-color: var(--sr-gray-100);
    }
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
    &.prev {
      margin-right: 0.25rem;
    }
    &.next {
      margin-left: 0.25rem;
    }

    .nav-icon {
      width: 1rem;
      height: 1rem;
    }
  }

  .page-item {
    height: 1.75rem;
    width: 1.75rem;
    cursor: pointer;
    border: 1px solid var(--sr-color-border);

    &:hover {
      opacity: 0.55;
    }
    &[data-selected] {
      color: var(--sr-color-text-pagination-selected);
      background-color: var(--sr-color-bg-pagination-selected);
    }
  }

  .ellipsis {
    display: flex;
    height: 1.75rem;
    width: 1.75rem;
    align-items: center;
    justify-content: center;
  }
}
</style>
