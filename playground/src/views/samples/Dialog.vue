<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, Button, Label, Input, useSweetAlert } from '@smartrobox/ui';

const open = ref(false);
const name = ref('');
const age = ref<number>();
const { fireInfo } = useSweetAlert();

const handleApply = () => {
  open.value = false;

  fireInfo(
    JSON.stringify({
      name: name.value,
      age: age.value,
    }),
  );
};
</script>

<template>
  <Button @click="open = true">open</Button>
  <span class="tw:ml-2 tw:text-green-700 tw:dark:text-green-400">{{ open }} ({{ typeof open }})</span>
  <Dialog
    v-model:open="open"
    :zIndex="101"
  >
    <template #header>パラメータ設定</template>
    <template #footer>
      <div class="tw:flex tw:justify-end tw:gap-2">
        <Button
          variant="secondary"
          @click="open = false"
        >
          キャンセル
        </Button>
        <Button
          variant="primary"
          @click="handleApply"
        >
          適用
        </Button>
      </div>
    </template>

    <fieldset class="tw:mb-3.75 tw:flex tw:items-center tw:gap-5">
      <Label class="tw:w-26 tw:text-right">Name</Label>
      <Input
        v-model="name"
        class="tw:w-full"
        placeholder="Your name"
      />
    </fieldset>

    <fieldset class="tw:mb-3.75 tw:flex tw:items-center tw:gap-5">
      <Label class="tw:w-26 tw:text-right">Age</Label>
      <Input
        v-model="age"
        type="number"
        class="tw:w-full"
        placeholder="Your age"
      />
    </fieldset>
  </Dialog>
</template>
