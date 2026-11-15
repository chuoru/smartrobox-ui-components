<script setup lang="ts">
import { Editable } from 'reka-ui/namespaced';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import type { InputHTMLAttributes } from 'vue';

const model = defineModel<string>();
defineProps<{ size?: InputHTMLAttributes['size'] }>();
</script>

<template>
  <Editable.Root
    v-model="model"
    v-slot="{ isEditing }"
  >
    <Editable.Area class="area">
      <Editable.Preview />
      <Editable.Input
        :size="size"
        class="input"
      />
    </Editable.Area>

    <Editable.EditTrigger
      v-if="!isEditing"
      class="edit-trigger"
    >
      <PencilIcon class="trigger-icon" />
    </Editable.EditTrigger>
    <div
      v-else
      class="action-buttons"
    >
      <Editable.SubmitTrigger>
        <CheckIcon class="trigger-icon" />
      </Editable.SubmitTrigger>
      <Editable.CancelTrigger>
        <XMarkIcon class="trigger-icon" />
      </Editable.CancelTrigger>
    </div>
  </Editable.Root>
</template>

<style scoped>
.area {
  border-bottom: 1px solid;
  color: var(--sr-color-text);

  .input {
    &::placeholder {
      color: var(--sr-color-placeholder);
    }
  }
}

.edit-trigger {
  width: max-content;
}

.action-buttons {
  display: flex;
  gap: 0.25rem;
}

.trigger-icon {
  margin-bottom: -0.375rem;
  width: 1rem;
  height: 1rem;
}
</style>
