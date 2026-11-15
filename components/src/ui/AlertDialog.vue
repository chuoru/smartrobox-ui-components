<script setup lang="ts">
import { AlertDialog } from 'reka-ui/namespaced';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { AnimatePresence, Motion } from 'motion-v';
import Button from './Button.vue';
import type { ButtonSize, ButtonVariant } from './button';

type ActionConfig = {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const open = defineModel<boolean>('open');

defineProps<{
  head: string;
  body: string;
  cancel?: ActionConfig;
  action?: ActionConfig;
}>();

const emit = defineEmits<{
  actionClick: [event: PointerEvent];
  cancelClick: [event: PointerEvent];
  escapeKeyDown: [event: KeyboardEvent];
}>();
</script>

<template>
  <AlertDialog.Root v-model:open="open">
    <AlertDialog.Trigger
      v-if="$slots.default"
      as-child
    >
      <slot />
    </AlertDialog.Trigger>

    <AlertDialog.Portal>
      <AnimatePresence>
        <AlertDialog.Overlay
          class="overlay"
          as-child
        >
          <Motion
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0, pointerEvents: 'none' }"
          />
        </AlertDialog.Overlay>

        <AlertDialog.Content
          as-child
          class="content"
          @escape-key-down="emit('escapeKeyDown', $event)"
        >
          <Motion
            :initial="{ scale: 0, x: '-50%', y: '-50%' }"
            :animate="{ scale: 1, x: '-50%', y: '-50%' }"
          >
            <AlertDialog.Cancel
              class="close"
              aria-label="Close"
            >
              <XMarkIcon class="close-icon" />
            </AlertDialog.Cancel>

            <div class="icon">
              <slot name="icon">
                <svg
                  viewBox="0 0 82 83"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M38.1165 50.38L36.8565 28.24L36.5565 19.9H45.4365L45.1365 28.24L43.8765 50.38H38.1165ZM40.9965 66.34C37.8765 66.34 35.5365 63.82 35.5365 60.58C35.5365 57.28 37.8765 54.82 40.9965 54.82C44.1165 54.82 46.5165 57.28 46.5165 60.58C46.5165 63.82 44.1165 66.34 40.9965 66.34Z"
                    fill="currentColor"
                  />
                  <circle
                    cx="41"
                    cy="40.5"
                    r="38.5"
                    stroke="currentColor"
                    stroke-width="3"
                  />
                </svg>
              </slot>
            </div>

            <AlertDialog.Title class="title">
              {{ head }}
            </AlertDialog.Title>

            <AlertDialog.Description class="description">
              {{ body }}
            </AlertDialog.Description>

            <div class="actions">
              <AlertDialog.Cancel as-child>
                <Button
                  :variant="cancel?.variant ?? 'none'"
                  :size="cancel?.size ?? 'md'"
                  :class="{ 'modal-btn cancel': !cancel?.variant }"
                  @click="emit('cancelClick', $event)"
                >
                  {{ cancel?.title ?? 'Cancel' }}
                </Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action as-child>
                <Button
                  :variant="action?.variant ?? 'none'"
                  :size="action?.size ?? 'md'"
                  :class="{ 'modal-btn ok': !action?.variant }"
                  @click="emit('actionClick', $event)"
                >
                  {{ action?.title ?? 'OK' }}
                </Button>
              </AlertDialog.Action>
            </div>
          </Motion>
        </AlertDialog.Content>
      </AnimatePresence>
    </AlertDialog.Portal>
  </AlertDialog.Root>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 30;
  background-color: rgb(0 0 0 / 50%);
}

.content {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  max-height: 95vh;
  width: 90vw;
  max-width: 31.25rem;
  overflow-y: auto;
  color: var(--sr-color-text);
  border-radius: var(--sr-radius-lg);
  background-color: var(--sr-color-bg-dlg);
  box-shadow: 0 15px 35px rgb(50 50 93 / 20%), 0 5px 15px rgb(0 0 0 / 17%);

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
  .icon {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
    color: var(--sr-modal-btn-ok-bg);
    svg {
      width: 5rem;
      height: 5rem;
    }
  }
  .title {
    margin: 0.5rem 1.5rem;
    text-align: center;
    color: var(--sr-color-heading);
    font-size: 1.5rem;
    font-weight: 700;
  }
  .description {
    margin: 1rem 1.5rem 1.5rem;
    text-align: center;
    font-size: 1rem;
  }
  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3.75rem;
    padding: 1rem;
    background: var(--sr-modal-footer-bg);
    border-radius: 0 0 var(--sr-radius-lg) var(--sr-radius-lg);
  }
  .modal-btn {
    min-width: 7.5rem;
    height: 2.8125rem;
    color: white;
    text-transform: uppercase;
    font-weight: var(--sr-btn-font-weight);
    &.cancel {
      background: var(--sr-modal-btn-cancel-bg);
    }
    &.ok {
      background: var(--sr-modal-btn-ok-bg);
    }
  }
}
</style>
