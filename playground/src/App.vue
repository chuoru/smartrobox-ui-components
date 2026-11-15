<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/solid';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import ThemeSwitch from '@/components/layout/ThemeSwitch.vue';
</script>

<template>
  <div class="tw:grid tw:h-screen tw:grid-cols-[15rem_1fr] tw:grid-rows-[2.5rem_1fr]">
    <div
      class="tw:col-span-full tw:flex tw:items-center tw:justify-between tw:bg-slate-200 tw:px-4 tw:shadow-sm tw:dark:bg-slate-800"
    >
      <router-link
        to="/"
        class="tw:flex tw:items-center tw:gap-2 tw:hover:opacity-65"
      >
        <HomeIcon class="tw:size-5" />
        <span class="">SmartRobox UI Components</span>
      </router-link>
      <ThemeSwitch />
    </div>
    <div class="tw:overflow-y-auto">
      <AppSidebar />
    </div>
    <main class="tw:overflow-y-auto tw:p-4">
      <router-view />
    </main>
  </div>
</template>
