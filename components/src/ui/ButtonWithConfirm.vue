<script setup lang="ts">
import AlertDialog from './AlertDialog.vue';
import Button from './Button.vue';
import type { ButtonSize, ButtonVariant } from './button';

type ActionConfig = {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

withDefaults(
  defineProps<{
    head: string;
    body: string;
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    cancel?: ActionConfig;
    action?: ActionConfig;
  }>(),
  {
    variant: 'default',
    size: 'md',
  },
);

const emit = defineEmits<{
  actionClick: [event: PointerEvent];
}>();
</script>

<template>
  <AlertDialog
    :head="head"
    :body="body"
    :cancel="cancel"
    :action="action"
    @action-click="emit('actionClick', $event)"
  >
    <Button
      :variant="variant"
      :size="size"
    >
      {{ title }}
    </Button>
  </AlertDialog>
</template>
