<script setup lang="ts">
import { ref, computed, inject, onMounted, useSlots, watch } from 'vue';
import Menu from './Menu.vue';
import { SR_PARENT_MENU_KEY, SR_NESTABLE_SELECT_KEY } from './constants';
import type { CSSProperties } from 'vue';
import type { MenuExposed, MenuItemRef } from './types';

const SR_CHILD_MENU_PADDING_TOP = 4;

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: string;
  }>(),
  {
    label: '',
    value: '',
  },
);

const slots = useSlots();
const top = inject(SR_NESTABLE_SELECT_KEY)!;
const parentMenu = inject(SR_PARENT_MENU_KEY)!;

const el = ref<HTMLElement | null>(null);
const childMenu = ref<InstanceType<typeof Menu> | null>(null);
const hover = ref(false);

const selfRef: MenuItemRef = {
  get $el() {
    return el.value!;
  },
  parentMenu,
  mouseenter() {
    if (parentMenu.isOpen) {
      hover.value = true;
      activate();
    }
  },
};

const isActive = computed(() => {
  return hover.value || (childMenu.value !== null && childMenu.value.isOpen);
});

const isSelected = computed(() => {
  const selectedValue = top.selected.value && top.selected.value.value;
  return selectedValue === props.value;
});

const style = computed<CSSProperties>(() => {
  if (isActive.value) {
    if (slots.default) {
      return { backgroundColor: 'rgba(220, 220, 220, 0.75)' };
    } else {
      return { backgroundColor: 'rgba(150, 150, 150, 0.75)' };
    }
  } else {
    return {};
  }
});

const activate = (): void => {
  parentMenu.activeMenuItem.value = selfRef;

  if (childMenu.value && el.value) {
    const rect = el.value.getBoundingClientRect();
    const submenuDirection = parentMenu.submenuDirection;
    childMenu.value.open(rect[submenuDirection], rect.top - SR_CHILD_MENU_PADDING_TOP, submenuDirection);
  }
};

const deactivate = (): void => {
  if (childMenu.value) {
    childMenu.value.close();
  }
};

const mouseenter = (): void => {
  if (parentMenu.isOpen) {
    hover.value = true;
    activate();
  }
};

const mouseleave = (): void => {
  if (parentMenu.isOpen) {
    hover.value = false;
  }
};

const sleep = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const fire = (): void => {
  top.selected.value = { label: props.label, value: props.value };
};

const mouseup = async (): Promise<void> => {
  if (hover.value) {
    if (parentMenu.isOpen && !slots.default) {
      await sleep(200);
      fire();
      hover.value = false;
    }
  }
};

// Watch for activeMenuItem changes to deactivate other items
watch(parentMenu.activeMenuItem, (activeItem) => {
  if (activeItem !== selfRef) {
    deactivate();
  }
});

// Watch for menuClosed to reset state
watch(parentMenu.menuClosed, () => {
  hover.value = false;
  deactivate();
});

onMounted(() => {
  parentMenu.children.push({
    get hover() {
      return hover.value;
    },
    get isActive() {
      return isActive.value;
    },
    get $refs() {
      return { childMenu: childMenu.value as MenuExposed | null };
    },
    mouseenter,
    mouseleave,
    mouseup,
    deactivate,
  });
});

defineExpose({
  hover,
  isActive,
  childMenu,
  mouseenter,
  mouseleave,
  mouseup,
  deactivate,
});
</script>

<template>
  <div>
    <div
      ref="el"
      class="menu-item"
      :style="style"
      @mouseenter.stop="mouseenter"
      @mouseleave="mouseleave"
      @mouseup="mouseup"
      @mousedown.stop.prevent
    >
      <div
        style="padding: 0 0em"
        :style="{ visibility: isSelected ? 'visible' : 'hidden' }"
      >
        &check;
      </div>
      <div
        style="padding-left: 0.3em"
        class="label"
      >
        <div :data-submenu="$slots.default ? 'true' : 'false'">
          {{ label }}
        </div>
      </div>
      <div style="padding-left: 1em">
        <span v-if="$slots.default">&rtrif;</span>
      </div>
      <div v-if="$slots.default">
        <Menu
          ref="childMenu"
          :parent-menu-item="selfRef"
        >
          <slot />
        </Menu>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  display: flex;
  align-items: baseline;
  padding: 2px 8pt 2px 4pt;
  white-space: nowrap;
}
.label {
  flex-grow: 1;
}
</style>
