<script setup lang="ts">
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui';
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui';

// Non-modal by default, as in the WAI-ARIA menu button pattern: the page stays reachable and Tab closes the menu.
const props = withDefaults(defineProps<DropdownMenuRootProps>(), { modal: false, open: undefined });
const emits = defineEmits<DropdownMenuRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
