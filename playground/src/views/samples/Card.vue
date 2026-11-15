<script setup lang="ts">
import { Button, Card } from '@smartrobox/ui';
</script>

<template>
  <div class="tw:grid tw:max-w-4xl tw:grid-cols-2 tw:gap-6 tw:bg-[#f8f9fe] tw:p-6 tw:dark:bg-transparent">
    <Card>Body only</Card>
    <Card hover>
      <template #header>Camera 1</template>
      Hover lifts the card.
    </Card>
    <Card>
      <template #header>Detector</template>
      Status: running
      <template #footer>
        <div class="tw:flex tw:justify-end tw:gap-2">
          <Button
            variant="secondary"
            size="sm"
          >
            Stop
          </Button>
          <Button
            variant="primary"
            size="sm"
          >
            Restart
          </Button>
        </div>
      </template>
    </Card>
    <Card
      no-body
      :shadow="false"
    >
      <template #header>no-body, no shadow</template>
      <ul class="tw:divide-y tw:divide-slate-200">
        <li class="tw:px-6 tw:py-3">Row 1</li>
        <li class="tw:px-6 tw:py-3">Row 2</li>
      </ul>
    </Card>
  </div>
</template>
