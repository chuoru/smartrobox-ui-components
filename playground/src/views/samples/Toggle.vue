<script setup lang="ts">
import { ref } from 'vue';
import { ItalicIcon } from '@heroicons/vue/24/solid';
import { Toggle } from '@smartrobox/ui';

const state = ref(false);
</script>

<template>
  <Toggle v-model="state">
    <ItalicIcon class="tw:size-4" />
  </Toggle>
</template>
