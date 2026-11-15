<script setup lang="ts">
import { ButtonWithDeleteConfirm, useSweetAlert } from '@smartrobox/ui';

const { fireSuccess } = useSweetAlert();
</script>

<template>
  <div class="tw:flex">
    <ButtonWithDeleteConfirm @action-click="fireSuccess('Deleted.')" />
  </div>
</template>
