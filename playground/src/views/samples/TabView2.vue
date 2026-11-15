<script setup lang="ts">
import { onMounted } from 'vue';
import { useSweetAlert } from '@smartrobox/ui';

const { fireInfo } = useSweetAlert();

onMounted(() => fireInfo('mounted: TAB VIEW 2'));
</script>

<template>
  <div>TAB VIEW 2</div>
</template>
