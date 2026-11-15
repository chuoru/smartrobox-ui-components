<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { SwitchRoot, SwitchThumb } from 'reka-ui';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';
import { useThemeStore } from '@/stores/theme';

const { theme } = storeToRefs(useThemeStore());

const checked = computed<boolean>({
  get: () => theme.value === 'dark',
  set: (value: boolean) => {
    theme.value = value ? 'dark' : 'light';
  },
});
</script>

<template>
  <SwitchRoot
    v-model="checked"
    aria-label="Dark mode"
    class="tw:relative tw:flex tw:h-6 tw:w-10 tw:cursor-pointer tw:rounded-full tw:border tw:border-gray-200 tw:shadow-sm tw:transition-[background] tw:focus-within:border-gray-300 tw:focus-within:shadow-[0_0_0_1px] tw:focus-within:shadow-gray-300 tw:focus-within:outline-none tw:data-[state=checked]:border-gray-800 tw:data-[state=checked]:bg-gray-500 tw:data-[state=unchecked]:bg-gray-300"
  >
    <SwitchThumb
      class="tw:my-auto tw:flex tw:h-5 tw:w-5 tw:translate-x-0.5 tw:items-center tw:justify-center tw:rounded-full tw:bg-white tw:text-xs tw:shadow-xl tw:transition-transform tw:will-change-transform tw:data-[state=checked]:translate-x-4 tw:data-[state=checked]:bg-gray-700"
    >
      <MoonIcon
        v-if="checked"
        class="tw:size-4"
      />
      <SunIcon
        v-else
        class="tw:size-4"
      />
    </SwitchThumb>
  </SwitchRoot>
</template>
