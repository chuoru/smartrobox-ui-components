<script setup lang="ts">
import { computed } from 'vue';
import { Dialog } from 'reka-ui/namespaced';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { AnimatePresence, Motion } from 'motion-v';

const model = defineModel<boolean>('open');

const props = withDefaults(
  defineProps<{
    zIndex?: number;
    top?: string;
  }>(),
  {
    zIndex: 300,
    top: undefined,
  },
);

// Align the content's top edge to `top` when specified; otherwise center it vertically.
const contentTop = computed(() => props.top ?? '50%');
const translateY = computed(() => (props.top === undefined ? '-50%' : '0%'));
</script>

<template>
  <Dialog.Root v-model:open="model">
    <Dialog.Portal>
      <AnimatePresence>
        <Dialog.Overlay
          as-child
          class="overlay"
          :style="{ zIndex }"
        >
          <Motion
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0, pointerEvents: 'none' }"
          />
        </Dialog.Overlay>
        <Dialog.Content
          as-child
          class="content"
          :style="{ zIndex: zIndex + 100, top: contentTop, left: '50%' }"
          :aria-describedby="$slots.description ? 'dialog-desc' : undefined"
        >
          <Motion
            :initial="{ scale: 0, x: '-50%', y: translateY }"
            :animate="{ scale: 1, x: '-50%', y: translateY }"
          >
            <Dialog.Title class="title">
              <slot name="header" />
            </Dialog.Title>

            <div class="body">
              <div
                v-if="$slots.description"
                id="dialog-desc"
              >
                <slot name="description" />
              </div>
              <slot />
            </div>
            <div
              v-if="$slots.footer"
              class="footer"
            >
              <slot name="footer" />
            </div>

            <Dialog.Close
              class="close"
              aria-label="Close"
            >
              <XMarkIcon class="close-icon" />
            </Dialog.Close>
          </Motion>
        </Dialog.Content>
      </AnimatePresence>
    </Dialog.Portal>
  </Dialog.Root>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 50%);
}

.content {
  position: fixed;
  display: flex;
  flex-direction: column;
  max-height: 95vh;
  width: 90vw;
  max-width: 31.25rem;
  overflow-y: auto;
  border-radius: var(--sr-radius-lg);
  color: var(--sr-color-text);
  background-color: var(--sr-color-bg-dlg);
  box-shadow: 0 15px 35px rgb(50 50 93 / 20%), 0 5px 15px rgb(0 0 0 / 17%);

  .title {
    color: var(--sr-color-heading);
    padding: 1.25rem 3rem 0 1.5rem;
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 600;
    &:empty {
      padding-top: 2.5rem;
    }
  }
  .body {
    padding: 1.25rem 1.5rem 1.5rem;
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background: var(--sr-modal-footer-bg);
    border-radius: 0 0 var(--sr-radius-lg) var(--sr-radius-lg);
  }
  .close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--sr-gray-600);
    .close-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
