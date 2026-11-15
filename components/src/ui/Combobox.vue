<script setup lang="ts">
import { Combobox } from 'reka-ui/namespaced';
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { AnimatePresence, Motion } from 'motion-v';
import type { ComboboxRootProps } from 'reka-ui';

type Options = {
  name: string;
  children?: {
    name: string;
  }[];
}[];

defineProps<
  Omit<ComboboxRootProps, 'modelValue'> & {
    options: Options;
    placeholder?: string;
  }
>();
</script>

<template>
  <Combobox.Root
    class="root"
    style="position: relative"
  >
    <Combobox.Anchor class="anchor">
      <Combobox.Input
        class="input"
        :placeholder="placeholder"
      />
      <Combobox.Trigger>
        <ChevronDownIcon class="chevron-down-icon" />
      </Combobox.Trigger>
    </Combobox.Anchor>

    <AnimatePresence>
      <Combobox.Content as-child>
        <Motion
          :initial="{ transform: 'translateY(-40px)', opacity: 0 }"
          :animate="{ transform: 'translateY(0)', opacity: 1 }"
          :exit="{ transform: 'translateY(-40px)', opacity: 0 }"
          class="content"
        >
          <Combobox.Viewport class="viewport">
            <Combobox.Empty class="empty" />
            <template
              v-for="(group, index) in options"
              :key="group.name"
            >
              <Combobox.Group class="group">
                <Combobox.Separator
                  v-if="index !== 0"
                  class="separator"
                />
                <Combobox.Label class="label">
                  {{ group.name }}
                </Combobox.Label>

                <Combobox.Item
                  v-for="option in group.children"
                  :key="option.name"
                  :value="option.name"
                  class="item"
                >
                  <Combobox.ItemIndicator class="item-indicator">
                    <CheckIcon class="check-icon" />
                  </Combobox.ItemIndicator>
                  <span>
                    {{ option.name }}
                  </span>
                </Combobox.Item>
              </Combobox.Group>
            </template>
          </Combobox.Viewport>
        </Motion>
      </Combobox.Content>
    </AnimatePresence>
  </Combobox.Root>
</template>

<style scoped>
.root {
  .anchor {
    display: inline-flex;
    height: 2.1875rem;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--sr-form-control-border-radius);
    border: 1px solid var(--sr-gray-300);
    background-color: white;
    padding-left: 0.9375rem;
    padding-right: 0.9375rem;
    font-size: 0.875rem;
    line-height: calc(1.25 / 0.875);

    &:hover {
      background-color: var(--sr-gray-50);
    }
    &:focus-visible {
      outline: solid var(--sr-outline-width) var(--sr-outline-color);
    }

    .input {
      height: 100%;
      outline: none;
      color: var(--sr-color-text);
      &::placeholder {
        color: var(--sr-color-placeholder);
      }
    }
    .chevron-down-icon {
      width: 16px;
      height: 16px;
      color: var(--sr-gray-400);
    }
  }
  .content {
    position: absolute;
    z-index: 10;
    margin-top: 0.25rem;
    width: 100%;
    min-width: 10rem;
    overflow: hidden;
    border-radius: var(--sr-form-control-border-radius);
    border: 1px solid var(--sr-gray-300);
    background-color: white;
  }
  .viewport {
    padding: 0.3125rem;

    .empty {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      text-align: center;
      min-width: 10rem;
      color: var(--sr-gray-400);
    }
    .group {
      .separator {
        margin: 0.375rem;
        height: 1px;
        background-color: var(--sr-gray-300);
      }
      .label {
        margin-bottom: 0.25rem;
        padding-left: 1.5625rem;
        padding-right: 1.5625rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 600;
        color: var(--sr-cmbbx-label-color);
      }
      .item {
        position: relative;
        display: flex;
        color: var(--sr-color-text);
        height: 1.5625rem;
        align-items: center;
        padding-right: 2.1875rem;
        padding-left: 1.5625rem;
        font-size: 0.875rem;
        line-height: 1;
        user-select: none;
        &:hover {
          background-color: var(--sr-gray-200);
        }
        .item-indicator {
          position: absolute;
          left: 0;
          display: inline-flex;
          width: 1.5625rem;
          align-items: center;
          justify-content: center;
          .check-icon {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
</style>
