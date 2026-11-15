<script setup lang="ts">
import { ref } from 'vue';
import { Button, Loading, useSweetAlert } from '@smartrobox/ui';

const isLoading = ref(false);
const fullPage = ref(true);
const timeoutId = ref<ReturnType<typeof setTimeout>>();
const { fireError } = useSweetAlert();

const handleClick = () => {
  isLoading.value = true;
  timeoutId.value = setTimeout(() => {
    timeoutId.value = undefined;
    isLoading.value = false;
  }, 5000);
};

const handleCancel = () => {
  clearTimeout(timeoutId.value);
  timeoutId.value = undefined;
  isLoading.value = false;
  fireError('Loader canceled.');
};
</script>

<template>
  <div>
    <Button @click="handleClick">start</Button>
    <Loading
      v-if="isLoading"
      :can-cancel="true"
      :on-cancel="handleCancel"
      :is-full-page="fullPage"
    />
  </div>
</template>
