<script setup lang="ts">
import { Breadcrumbs } from '@smartrobox/ui';

const items = [
  { name: 'HOME', to: '/' },
  { name: 'level2', to: '/samples/button' },
  { name: 'level3', to: '/samples/select' },
  { name: 'level4', to: '/samples/checkbox' },
  { name: 'level5' },
];
const items2 = [
  { name: 'トップページ', to: '/' },
  { name: '製品カテゴリー一覧ページ', to: '/samples/button' },
  { name: '製品詳細情報ページ', to: '/samples/select' },
  { name: 'お客様のご注文内容確認ページ', to: '/samples/checkbox' },
  { name: 'ご注文完了ありがとうございましたページ' },
];
</script>

<template>
  <div>
    <Breadcrumbs :items="items" />
  </div>

  <div class="tw:mt-6">
    <Breadcrumbs :items="items2" />
  </div>

  <div class="tw:mt-6">
    <Breadcrumbs
      :items="items2"
      :max-link-width="'6rem'"
    />
  </div>
</template>
