<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import { Button, useSweetAlert } from '@smartrobox/ui';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
const { fireInfo } = useSweetAlert(theme);
const handleClick = () => fireInfo('clicked');

const variants = ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link', 'none'] as const;
const japanese: Record<(typeof variants)[number], string> = {
  default: 'クリック',
  primary: '保存',
  secondary: 'キャンセル',
  success: '開始',
  info: '詳細',
  warning: '注意',
  danger: '削除',
  link: 'リンク',
  none: '開く',
};
const ja = (variant: (typeof variants)[number]) => japanese[variant];
const outlineVariants = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as const;
const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <div class="tw:mb-8 tw:flex tw:gap-8">
    <div class="tw:flex tw:flex-col tw:gap-4">
      <div>
        <Button @click="handleClick">デフォルト</Button>
      </div>
      <div>
        <Button
          variant="none"
          class="tw:cursor-pointer tw:border-r-3 tw:border-l-3 tw:border-slate-400 tw:p-4 tw:hover:opacity-65"
          @click="handleClick"
        >
          カスタム
        </Button>
      </div>
      <div>
        <Button
          variant="primary"
          @click="handleClick"
        >
          保存
        </Button>
      </div>
    </div>

    <div class="tw:flex tw:flex-col tw:gap-4">
      <div>
        <Button @click="handleClick">DEAFULT</Button>
      </div>
      <div>
        <Button
          variant="none"
          class="tw:cursor-pointer tw:border-r-3 tw:border-l-3 tw:border-slate-400 tw:p-4 tw:hover:opacity-65"
          @click="handleClick"
        >
          custom
        </Button>
      </div>
      <div>
        <Button
          variant="primary"
          @click="handleClick"
        >
          Save
        </Button>
      </div>
    </div>
  </div>

  <div class="tw:flex tw:flex-col tw:gap-4 tw:border-t tw:border-slate-300 tw:p-4">
    <div>
      <Button
        as-child
        size="md"
        variant="default"
      >
        <RouterLink to="/">asChild + RouterLink</RouterLink>
      </Button>
    </div>
    <div>
      <Button
        as="a"
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        variant="default"
      >
        as="a" (external link)
      </Button>
    </div>
  </div>

  <div class="tw:flex tw:flex-wrap tw:gap-4 tw:border-t tw:border-slate-300 tw:p-4">
    <Button
      v-for="variant of outlineVariants"
      :key="variant"
      :variant="variant"
      outline
      @click="handleClick"
    >
      outline {{ variant }}
    </Button>
  </div>

  <div class="tw:flex tw:flex-col tw:gap-4">
    <div
      v-for="size of sizes"
      :key="size"
      class="tw:flex tw:flex-wrap tw:gap-4 tw:border-t tw:border-slate-300 tw:p-4"
    >
      <div
        v-for="variant of variants"
        :key="variant"
        class="tw:w-50"
      >
        <Button
          :variant="variant"
          :size="size"
          @click="handleClick"
        >
          {{ ja(variant) }} | {{ size }}
        </Button>
      </div>
    </div>

    <div
      v-for="size of sizes"
      :key="size"
      class="tw:flex tw:flex-wrap tw:gap-4 tw:border-t tw:border-slate-300 tw:p-4"
    >
      <div
        v-for="variant of variants"
        :key="variant"
        class="tw:w-50"
      >
        <Button
          :variant="variant"
          :size="size"
          @click="handleClick"
        >
          {{ variant }} | {{ size }}
        </Button>
      </div>
    </div>
  </div>
</template>
