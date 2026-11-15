<script setup lang="ts">
import { ContextMenuRoot, useForwardPropsEmits } from 'reka-ui';
import type { ContextMenuRootEmits, ContextMenuRootProps } from 'reka-ui';

// Non-modal by default, like DropdownMenu: the page stays reachable and Tab closes the menu.
const props = withDefaults(defineProps<ContextMenuRootProps>(), { modal: false });
const emits = defineEmits<ContextMenuRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuRoot v-bind="forwarded">
    <slot />
  </ContextMenuRoot>
</template>
