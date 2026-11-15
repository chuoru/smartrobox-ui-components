<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { HomeIcon, ArchiveBoxIcon, CheckIcon } from '@heroicons/vue/24/outline';
import { Stepper, Button } from '@smartrobox/ui';

const STEPS = [
  {
    step: 1,
    title: 'Address',
    description: 'Add your address here',
    icon: HomeIcon,
  },
  {
    step: 2,
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: ArchiveBoxIcon,
  },
  {
    step: 3,
    title: 'Checkout',
    description: 'Confirm your order',
    icon: CheckIcon,
  },
];
const stepperRef = useTemplateRef<ComponentExposed<typeof Stepper>>('stepper-ref');
const position = ref(1);

const hasPrev = computed(() => stepperRef.value?.hasPrev() ?? false);
const hasNext = computed(() => stepperRef.value?.hasNext() ?? false);
</script>

<template>
  <div>
    <div class="tw:h-30">
      <Stepper
        v-model="position"
        ref="stepper-ref"
        :steps="STEPS"
      />
    </div>
    <div class="tw:flex tw:gap-2 tw:border-t tw:border-slate-300 tw:pt-2">
      <Button
        @click="stepperRef?.prevStep()"
        :disabled="!hasPrev"
        variant="primary"
      >
        prev
      </Button>
      <Button
        @click="stepperRef?.nextStep()"
        :disabled="!hasNext"
        variant="primary"
      >
        next
      </Button>
    </div>
    <div class="tw:mt-4 tw:border-t tw:border-slate-300">
      <span>position: </span>
      <span class="tw:text-green-700 tw:dark:text-green-400">{{ position }}</span>
    </div>
  </div>

  <div class="tw:mt-10">
    <div class="tw:h-30">
      <Stepper
        v-model="position"
        ref="stepper-ref"
        max-width="48rem"
        :steps="STEPS"
        :clickable="false"
      />
    </div>
  </div>
</template>
