<script setup lang="ts">
import { Button, useSweetAlert } from '@smartrobox/ui';

const { fireSuccess, fireInfo, fireError } = useSweetAlert();
</script>

<template>
  <div class="tw:flex tw:w-28 tw:flex-col tw:gap-3">
    <Button
      variant="primary"
      @click="fireSuccess('success')"
      >success</Button
    >
    <Button
      variant="secondary"
      @click="fireInfo('info')"
      >info</Button
    >
    <Button
      variant="danger"
      @click="fireError('error')"
      >error</Button
    >
  </div>
</template>
