<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { Stepper } from 'reka-ui/namespaced';
import type { StepperRoot } from 'reka-ui';
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';
import type { Property } from 'csstype';

type StepperStep = {
  step: number;
  title: string;
  description: string;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
};

const positin = defineModel<number>();

withDefaults(
  defineProps<{
    steps: StepperStep[];
    maxWidth?: Property.MaxWidth;
    clickable?: boolean;
  }>(),
  {
    maxWidth: '32rem',
    clickable: true,
  },
);

const stepperRootRef = useTemplateRef<InstanceType<typeof StepperRoot>>('stepper-root-ref');

defineExpose({
  goToStep: (step: number) => stepperRootRef.value?.goToStep(step),
  nextStep: () => stepperRootRef.value?.nextStep(),
  prevStep: () => stepperRootRef.value?.prevStep(),
  hasNext: (): boolean => stepperRootRef.value?.hasNext() ?? false,
  hasPrev: (): boolean => stepperRootRef.value?.hasPrev() ?? false,
});
</script>

<template>
  <Stepper.Root
    v-model="positin"
    :style="{ maxWidth }"
    class="stepper-root"
    ref="stepper-root-ref"
  >
    <Stepper.Item
      v-for="item in steps"
      :key="item.step"
      class="stepper-item"
      :step="item.step"
    >
      <Stepper.Trigger
        class="stepper-trigger"
        :class="{ 'is-not-clickable': !clickable }"
        @mousedown.capture="!clickable && $event.stopPropagation()"
        @keydown.capture="!clickable && $event.stopPropagation()"
      >
        <Stepper.Indicator>
          <Component
            :is="item.icon"
            class="stepper-icon"
          />
        </Stepper.Indicator>
      </Stepper.Trigger>

      <Stepper.Separator
        v-if="item.step !== steps[steps.length - 1].step"
        class="stepper-separator"
      />

      <div class="stepper-info">
        <Stepper.Title class="stepper-title">
          {{ item.title }}
        </Stepper.Title>
        <Stepper.Description class="stepper-description">
          {{ item.description }}
        </Stepper.Description>
      </div>
    </Stepper.Item>
  </Stepper.Root>
</template>

<style scoped>
.stepper-root {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  .stepper-item {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;

    &[data-disabled] .stepper-info {
      opacity: 0.5;
    }
    .stepper-trigger {
      display: inline-flex;
      height: 2.5rem;
      width: 2.5rem;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: 1px solid var(--sr-color-border);
      color: var(--sr-color-text);
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      cursor: pointer;
      &:focus {
        box-shadow: 0 0 0 2px #000;
        outline: none;
      }
      &:hover {
        opacity: 0.65;
      }
      &.is-not-clickable {
        cursor: default !important;
        &:hover {
          opacity: 1;
        }
      }
      .stepper-icon {
        height: 1.25rem;
        width: 1.25rem;
      }
    }
    &[data-state='active'] {
      .stepper-trigger {
        color: var(--sr-gray-700);
        background-color: var(--sr-success-300);
        border: 1px solid var(--sr-success-400);
        cursor: default;
        &:hover {
          opacity: 1;
        }
      }
    }
    &[data-state='inactive'] {
      .stepper-trigger,
      .stepper-info {
        opacity: 0.65;
        &.is-not-clickable {
          &:hover {
            opacity: 0.65 !important;
          }
        }
      }
    }
    &[data-state='active'] + &[data-state='inactive'] {
      .stepper-trigger {
        &:hover {
          opacity: 1;
        }
        &.is-not-clickable {
          &:hover {
            opacity: 0.65;
          }
        }
      }
    }
    &[data-disabled] .stepper-trigger {
      opacity: 0.65;
      cursor: not-allowed;
    }
    .stepper-separator {
      position: absolute;
      top: 1.25rem;
      left: calc(50% + 30px);
      right: calc(-50% + 20px);
      display: block;
      height: 2px;
      flex-shrink: 0;
      border-radius: 9999px;
      background-color: var(--sr-color-border);
    }
    .stepper-info {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 0.5rem;
      width: 100%;
      text-align: center;
      color: var(--sr-color-text);
      .stepper-title {
        font-weight: 500;
      }
      .stepper-description {
        display: block;
        font-size: 0.75rem;
        line-height: 1rem;
      }
    }
  }
}
</style>
