<script setup lang="ts">
import { Popover } from 'reka-ui/namespaced';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { type PopoverRootProps, type PopoverContentProps } from 'reka-ui';

const model = defineModel<boolean>('open');

withDefaults(
  defineProps<
    PopoverRootProps & {
      align?: PopoverContentProps['align'];
      side?: PopoverContentProps['side'];
      zIndex?: number;
    }
  >(),
  {
    align: 'center',
  },
);
</script>

<template>
  <Popover.Root v-model:open="model">
    <Popover.Trigger>
      <slot name="trigger" />
    </Popover.Trigger>

    <Popover.Portal>
      <Popover.Content
        class="popover-content"
        :style="{ zIndex }"
        :align="align"
        :prioritize-position="true"
        :side="side"
      >
        <slot />
        <Popover.Close class="popover-close">
          <XMarkIcon class="popover-close-icon" />
        </Popover.Close>
        <Popover.Arrow class="popover-arrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
</template>

<style>
/*
  Since elements under `Popover.Portal` are teleported to document.body,
  place them in <style>(global) and prefix class names with `popover-` to prevent conflicts.
*/
.popover-content {
  position: relative;
  border-radius: 0.25rem;
  color: var(--sr-color-text);
  border: 1px solid var(--sr-color-border);
  background-color: var(--sr-color-bg-dlg);
  padding: 0.75rem 1rem 1.5rem;

  .popover-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: inline-flex;
    height: 1.5625rem;
    width: 1.5625rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    outline: none;

    &:hover {
      opacity: 75%;
    }
    &:focus-visible {
      outline: solid var(--sr-outline-width) var(--sr-outline-color);
    }
    .popover-close-icon {
      width: 1rem;
      height: 1rem;
    }
  }
  .popover-arrow {
    fill: var(--sr-color-bg-dlg);
    stroke: var(--sr-color-border);
  }
}
</style>
