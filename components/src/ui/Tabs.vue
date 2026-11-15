<script setup lang="ts">
import { Tabs } from 'reka-ui/namespaced';

type Tab = {
  key: string;
  label: string;
};

defineProps<{ tabs: Tab[] }>();

const model = defineModel<string | number>();
</script>

<template>
  <Tabs.Root
    v-model="model"
    class="root"
  >
    <Tabs.List class="list">
      <Tabs.Indicator class="indicator">
        <div class="indicator-bar" />
      </Tabs.Indicator>

      <Tabs.Trigger
        v-for="tab of tabs"
        :key="tab.key"
        :value="tab.key"
        class="trigger"
      >
        {{ tab.label }}
      </Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content
      v-for="tab of tabs"
      :key="tab.key"
      :value="tab.key"
      class="content"
    >
      <slot :name="tab.key" />
    </Tabs.Content>
  </Tabs.Root>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  .list {
    position: relative;
    display: flex;
    flex-shrink: 0;
    border-bottom: 1px solid var(--sr-color-border);

    .indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0.125rem;
      width: var(--reka-tabs-indicator-size);
      transform: translateX(var(--reka-tabs-indicator-position)) translateY(1px);
      border-radius: 9999px;
      padding-inline: 2rem;
      transition: translate 300ms;
      .indicator-bar {
        height: 100%;
        width: 100%;
        background-color: var(--sr-success-600);
      }
    }
    .trigger {
      display: flex;
      height: 2.5rem;
      flex: 1;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      padding-inline: 1.25rem;
      font-size: 0.875rem;
      line-height: 1;
      user-select: none;

      &:hover {
        opacity: 0.75;
      }
      &[data-state='active'] {
        color: var(--sr-success-600);
      }
    }
  }
  .content {
    flex-grow: 1;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    padding: 1.25rem 0;
    outline: none;
  }
}
</style>
