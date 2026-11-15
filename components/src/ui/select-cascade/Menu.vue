<script setup lang="ts">
import { ref, shallowRef, inject, provide } from 'vue';
import { SR_NESTABLE_SELECT_KEY, SR_PARENT_MENU_KEY, SR_DOWNWARD_FLAG_KEY } from './constants';
import type { MenuItemRef, MenuChild, ParentMenuContext, MenuExposed } from './types';

const SR_MENU_HEIGHT_PADDING = 4;

const props = defineProps<{
  parentMenuItem?: MenuItemRef | null;
}>();

const top = inject(SR_NESTABLE_SELECT_KEY)!;
const downward = inject(SR_DOWNWARD_FLAG_KEY)!;

const wrapper = ref<HTMLElement | null>(null);
const menu = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const submenuDirection = ref<'left' | 'right'>('right');
const activeMenuItem = shallowRef<MenuItemRef | null>(null);
const menuClosed = ref(0);
const children: MenuChild[] = [];

type StyleStatus = {
  target: HTMLElement;
  display: string;
  visibility: string;
};

const setBlockStyle = (targets: HTMLElement[]): StyleStatus[] => {
  return targets.map((target) => {
    const { display, visibility } = target.style;
    target.style.display = 'block';
    target.style.visibility = 'visible';
    return { target, display, visibility };
  });
};

const resetBlockStyle = (status: StyleStatus[]): void => {
  for (const source of status) {
    const { target, display, visibility } = source;
    target.style.display = display;
    target.style.visibility = visibility;
  }
};

const setPosition = (
  menuEl: HTMLElement,
  wrapperEl: HTMLElement,
  x: number,
  y: number,
  direction: 'left' | 'right',
): void => {
  let rect = menuEl.getBoundingClientRect();

  menuEl.style.maxHeight = `${window.innerHeight - 2 * SR_MENU_HEIGHT_PADDING}px`;

  wrapperEl.style.left = `${direction == 'right' ? x : x - rect.width + 1}px`;
  wrapperEl.style.top = `${downward ? y : y - rect.height + 34}px`;

  rect = menuEl.getBoundingClientRect();

  if (rect.bottom > window.innerHeight) {
    wrapperEl.style.top = `${window.innerHeight - rect.height}px`;
  }

  submenuDirection.value = direction;

  if (rect.right > window.innerWidth) {
    submenuDirection.value = 'left';
    wrapperEl.style.left = `${x - rect.width - (props.parentMenuItem ? props.parentMenuItem.$el.clientWidth : 0)}px`;
  }
  if (rect.left < 0) {
    submenuDirection.value = 'right';
    wrapperEl.style.left = `${x + (props.parentMenuItem ? props.parentMenuItem.$el.clientWidth : 0)}px`;
  }
};

const prepare = (x: number, y: number, direction: 'left' | 'right'): void => {
  const menuEl = menu.value;
  const wrapperEl = wrapper.value;

  if (!menuEl || !wrapperEl) {
    return;
  }
  const status = setBlockStyle([menuEl, wrapperEl]);
  setPosition(menuEl, wrapperEl, Math.floor(x), Math.floor(y), direction);
  resetBlockStyle(status);
};

const open = (x: number, y: number, position: 'left' | 'right' = 'right'): void => {
  prepare(x, y, position);
  isOpen.value = true;
};

const close = (parent: boolean = false): void => {
  if (isOpen.value) {
    isOpen.value = false;
    if (menu.value) {
      menu.value.style.display = 'none';
    }
    menuClosed.value++;
  }
  if (parent && props.parentMenuItem) {
    props.parentMenuItem.parentMenu.close(true);
  }
};

const parentMenuContext: ParentMenuContext = {
  get isOpen() {
    return isOpen.value;
  },
  get submenuDirection() {
    return submenuDirection.value;
  },
  activeMenuItem,
  menuClosed,
  children,
  close,
};

provide(SR_PARENT_MENU_KEY, parentMenuContext);

defineExpose<MenuExposed>({
  get isOpen() {
    return isOpen.value;
  },
  get submenuDirection() {
    return submenuDirection.value;
  },
  children,
  parentMenuItem: props.parentMenuItem ?? null,
  open,
  close,
});
</script>

<template>
  <div
    class="fixed"
    style="z-index: 1999"
    :style="{ top: top.offsetTop, left: top.offsetLeft }"
  >
    <div
      ref="wrapper"
      style="position: absolute"
    >
      <div
        v-show="isOpen"
        ref="menu"
        class="menu"
        :class="[top.theme]"
        @mousedown.stop.prevent
        @mouseup.stop
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
}
.menu {
  border-radius: 4pt;
  cursor: default;
  user-select: none;
  overflow: auto;
  background-color: var(--sr-color-bg-dlg);
  box-shadow: 2pt 2pt 8pt -6pt rgba(0, 0, 0, 0.5);
  border: 1px solid var(--sr-color-border);
  padding: 4px 0;
  &.theme-transparent {
    color: var(--sr-gray-800);
    background-color: oklch(96.7% 0.003 264.542 / 0.85);
  }
  &.theme-dark-transparent {
    color: var(--sr-gray-200);
    background-color: oklch(27.9% 0.041 260.031 / 0.85);
  }
}
</style>
