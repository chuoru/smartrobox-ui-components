<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

withDefaults(defineProps<{ color?: string }>(), {
  color: 'white',
});
</script>

<template>
  <Loading
    :active="true"
    :color="color"
    :opacity="0.8"
    background-color="#000000"
  />
</template>
