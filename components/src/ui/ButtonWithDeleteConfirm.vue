<script setup lang="ts">
import ButtonWithConfirm from './ButtonWithConfirm.vue';
</script>

<template>
  <ButtonWithConfirm
    title="Delete"
    head="Confirmation"
    body="Are you sure you want to delete?"
    variant="danger"
    :cancel="{ title: 'Cancel' }"
    :action="{ title: 'Delete', variant: 'danger' }"
  />
</template>
