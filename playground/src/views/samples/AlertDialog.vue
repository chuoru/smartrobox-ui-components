<script setup lang="ts">
import { ref } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { AlertDialog, Button, useSweetAlert } from '@smartrobox/ui';

const open = ref(false);
const { fireSuccess } = useSweetAlert();
</script>

<template>
  <div class="tw:flex">
    <AlertDialog
      head="削除確認"
      body="選択した画像を削除しますか？"
      :cancel="{ title: 'キャンセル' }"
      :action="{ title: '削除', variant: 'danger' }"
      @action-click="fireSuccess('Deleted.')"
    >
      <Button
        v-tooltip="{ content: 'Delete', placement: 'top' }"
        variant="none"
        size="2xs"
        aria-label="Delete"
      >
        <TrashIcon class="tw:size-5 tw:text-red-700 tw:dark:text-red-400" />
      </Button>
    </AlertDialog>
  </div>

  <div class="tw:mt-6 tw:flex">
    <Button
      variant="primary"
      @click="open = true"
    >
      v-model:open
    </Button>
    <AlertDialog
      v-model:open="open"
      head="Notification"
      body="Detector settings were saved. Restart the detector now?"
      @action-click="fireSuccess('OK')"
    />
  </div>
</template>
