<script setup lang="ts">
import { ButtonWithConfirm, useSweetAlert } from '@smartrobox/ui';

const { fireSuccess } = useSweetAlert();
</script>

<template>
  <div class="tw:flex">
    <ButtonWithConfirm
      head="Confirmation"
      body="Are you sure you want to deploy?"
      title="Deploy"
      variant="primary"
      :action="{ title: 'Yes', variant: 'primary' }"
      @action-click="fireSuccess('Deploy completed.')"
    />
  </div>
</template>
