import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

type ThemeType = 'light' | 'dark';

export const useThemeStore = defineStore(
  'global',
  () => {
    const theme = ref<ThemeType>('light');

    const setTheme = (themeType: ThemeType) => {
      theme.value = themeType;
    };

    watch(
      theme,
      (value) => {
        document.body.classList.toggle('dark', value === 'dark');
      },
      { immediate: true },
    );

    return {
      theme,
      setTheme,
    };
  },
  {
    persist: {
      key: 'smartrobox-ui-playground-theme',
      pick: ['theme'],
    },
  },
);
