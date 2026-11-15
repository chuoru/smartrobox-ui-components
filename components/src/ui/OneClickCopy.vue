<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { ClipboardDocumentIcon } from '@heroicons/vue/24/outline';
import { useSweetAlert } from '../composables/useSweetAlert';
import { vTooltip } from '../directives';

const slotRef = useTemplateRef('slot-ref');
const { fireInfo } = useSweetAlert();

const handleClick = () => {
  const text = slotRef.value?.innerText;

  if (text) {
    navigator.clipboard.writeText(text);
    fireInfo(`Copied "${text}"`);
  }
};
</script>

<template>
  <div>
    <span class="row">
      <span ref="slot-ref">
        <slot />
      </span>
      <button
        type="button"
        v-tooltip="{ content: 'Copy', placement: 'right' }"
        aria-label="Copy"
        @click="handleClick"
      >
        <ClipboardDocumentIcon class="copy-icon" />
      </button>
    </span>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;

  .copy-icon {
    margin-left: 0.5rem;
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
    outline: none;

    &:hover {
      opacity: 0.45;
    }
  }
}
</style>
