<script setup lang="ts">
import { pick } from 'lodash';
import { useId, computed } from 'vue';

type Placement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

const props = withDefaults(
  defineProps<{
    anchorName?: string;
    placement?: Placement;
    marginTop?: number | string;
    marginLeft?: number | string;
    marginBottom?: number | string;
    marginRight?: number | string;
    triggerLabel?: string;
  }>(),
  {
    placement: 'bottom-left',
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 0,
  },
);

const emit = defineEmits<{
  toggle: [event: ToggleEvent];
}>();

const popoverId = useId();
const margins = computed(() => pick(props, ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']));
const anchorNameVar = computed(() => (props.anchorName ? `--${props.anchorName}` : `--popover-anchor-${popoverId}`));

const placementStyle = computed(() => {
  switch (props.placement) {
    case 'bottom-right':
      return { top: 'anchor(bottom)', left: 'anchor(right)', right: 'auto', bottom: 'auto', ...margins.value };
    case 'bottom-left':
      return { top: 'anchor(bottom)', right: 'anchor(left)', left: 'auto', bottom: 'auto', ...margins.value };
    case 'top-left':
      return { bottom: 'anchor(top)', right: 'anchor(left)', left: 'auto', top: 'auto', ...margins.value };
    case 'top-right':
      return { bottom: 'anchor(top)', left: 'anchor(right)', right: 'auto', top: 'auto', ...margins.value };
    default:
      props.placement satisfies never;
      return undefined;
  }
});

const handleEventToggle = (evt: ToggleEvent) => {
  emit('toggle', evt);
};
</script>

<template>
  <div>
    <button
      :commandfor="popoverId"
      command="toggle-popover"
      :aria-label="triggerLabel"
      :style="{ anchorName: anchorNameVar }"
    >
      <slot name="trigger" />
    </button>

    <div
      :id="popoverId"
      :style="{ positionAnchor: anchorNameVar, ...placementStyle }"
      popover
      class="popover-simple-content"
      @toggle="handleEventToggle"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.popover-simple-content {
  color: var(--sr-color-text);
  background-color: var(--sr-color-bg);
  border: 1px solid var(--sr-color-border);
  border-radius: 0.25rem;
  padding: 0.75rem 1rem 1rem;
}
</style>
