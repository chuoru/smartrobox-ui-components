<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { Tabs } from '@smartrobox/ui';

const TabView1 = defineAsyncComponent(() => import('./TabView1.vue'));
const TabView2 = defineAsyncComponent(() => import('./TabView2.vue'));

const tabs = [
  { label: 'TAB-1', key: 'tab1' },
  { label: 'TAB-2', key: 'tab2' },
];

const active = ref('tab1');
</script>

<template>
  <Tabs
    v-model="active"
    :tabs="tabs"
    class="tw:w-120"
  >
    <template #tab1>
      <TabView1 />
    </template>
    <template #tab2>
      <TabView2 />
    </template>
  </Tabs>
</template>
