<script setup lang="ts">
import { Button } from '@smartrobox/ui';
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-3 tw:p-2">
    <Button
      class="tw:w-32"
      v-tooltip="{
        content: 'ToolTip Content',
        placement: 'top',
      }"
    >
      TOP
    </Button>

    <Button
      class="tw:w-32"
      v-tooltip="{
        content: 'ToolTip Content',
        placement: 'right',
      }"
    >
      RIGHT
    </Button>

    <Button
      class="tw:w-32"
      v-tooltip="{
        content: 'ToolTip Content',
        placement: 'bottom',
      }"
    >
      BOTTOM
    </Button>

    <Button
      class="tw:w-32"
      v-tooltip="{
        content: 'ToolTip Content',
        placement: 'left',
      }"
    >
      LEFT
    </Button>
  </div>
</template>
