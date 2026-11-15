<script setup lang="ts">
import { onMounted } from 'vue';
import { useSweetAlert } from '@smartrobox/ui';

const { fireInfo } = useSweetAlert();

onMounted(() => fireInfo('mounted: TAB VIEW 1'));
</script>

<template>
  <div>TAB VIEW 1</div>
</template>
