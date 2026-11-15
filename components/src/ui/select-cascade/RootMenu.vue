<script setup lang="ts">
import { ref, inject, onMounted, onBeforeUnmount } from 'vue';
import Menu from './Menu.vue';
import ChevronDown from '../../icons/ChevronDown.vue';
import { SR_NESTABLE_SELECT_KEY, SR_DOWNWARD_FLAG_KEY } from './constants';
import type { MenuExposed, MenuChild } from './types';

type MenuRefWithParent = MenuExposed;

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    minWidth?: string;
    size: 'xs' | 'sm' | 'md' | 'lg';
  }>(),
  {
    disabled: false,
    minWidth: undefined,
  },
);

const top = inject(SR_NESTABLE_SELECT_KEY)!;
const downward = inject(SR_DOWNWARD_FLAG_KEY)!;

const wrapper = ref<HTMLElement | null>(null);
const menu = ref<InstanceType<typeof Menu> | null>(null);

const once = (target: EventTarget, type: string, handler: (evt: Event) => void): void => {
  const onceWrapper = (evt: Event): void => {
    handler(evt);
    remove();
  };
  const remove = (): void => {
    target.removeEventListener(type, onceWrapper);
  };
  target.addEventListener(type, onceWrapper);
};

const close = (): void => {
  if (menu.value) {
    menu.value.close(true);
  }
};

const openMenu = (clickEvent: MouseEvent): void => {
  if (props.disabled) {
    return;
  }

  if (!menu.value || !wrapper.value) {
    return;
  }

  if (menu.value.isOpen) {
    const target = clickEvent.target as HTMLElement;
    if (target.dataset.submenu === 'true') {
      return;
    } else {
      return close();
    }
  }

  once(document, 'mouseup', (mouseupEvent: Event) => {
    if ((mouseupEvent as MouseEvent).timeStamp - clickEvent.timeStamp >= 500) {
      close();
    }
  });
  const { x, y, height } = wrapper.value.getBoundingClientRect();
  menu.value.open(x, downward ? y + height + 1 : y + height - 53, 'right');
};

const findDeepestActiveMenuItem = (menuRef: MenuExposed): MenuRefWithParent | null => {
  for (const item of menuRef.children) {
    if (item.isActive) {
      if (item.$refs.childMenu) {
        const deep = findDeepestActiveMenuItem(item.$refs.childMenu);
        if (deep) {
          return deep;
        }
      }
      return menuRef as MenuRefWithParent;
    }
  }
  return null;
};

const handleSpaceKey = (): void => {
  wrapper.value?.click();
};

const handleEscapeKey = (): void => {
  if (menu.value?.isOpen) {
    wrapper.value?.click();
  }
};

const handleEnterKey = (): void => {
  if (!menu.value) {
    return;
  }

  const menuRef = findDeepestActiveMenuItem(menu.value);
  if (menuRef) {
    const hoveredIndex = menuRef.children.findIndex((e: MenuChild) => e.hover);
    if (0 <= hoveredIndex) {
      menuRef.children[hoveredIndex].mouseup();
      menu.value.close();
    }
  }
};

const handleArrowUpKey = (): void => {
  if (!menu.value) {
    return;
  }

  const menuRef = findDeepestActiveMenuItem(menu.value);

  if (menuRef) {
    const hoveredIndex = menuRef.children.findIndex((e: MenuChild) => e.hover);
    if (0 < hoveredIndex) {
      menuRef.children[hoveredIndex].mouseleave();
      menuRef.children[hoveredIndex - 1].mouseenter();
    }
  } else if (menu.value.isOpen) {
    if (0 < menu.value.children.length) {
      menu.value.children[menu.value.children.length - 1].mouseenter();
    }
  }
};

const handleArrowDownKey = (): void => {
  if (!menu.value) {
    return;
  }

  const menuRef = findDeepestActiveMenuItem(menu.value);

  if (menuRef) {
    const hoveredIndex = menuRef.children.findIndex((e: MenuChild) => e.hover);
    if (0 <= hoveredIndex && hoveredIndex < menuRef.children.length - 1) {
      menuRef.children[hoveredIndex].mouseleave();
      menuRef.children[hoveredIndex + 1].mouseenter();
    }
  } else if (menu.value.isOpen) {
    if (0 < menu.value.children.length) {
      menu.value.children[0].mouseenter();
    }
  }
};

const handleArrowLeftKey = (): void => {
  if (!menu.value) {
    return;
  }

  const menuRef = findDeepestActiveMenuItem(menu.value);

  if (menuRef && menuRef !== menu.value) {
    const hoveredIndex = menuRef.children.findIndex((e: MenuChild) => e.hover);
    if (0 <= hoveredIndex) {
      menuRef.children[hoveredIndex].mouseleave();
      menuRef.children[hoveredIndex].deactivate();
      menuRef.parentMenuItem?.mouseenter();
    }
  }
};

const handleArrowRightKey = (): void => {
  if (!menu.value) {
    return;
  }

  const menuRef = findDeepestActiveMenuItem(menu.value);

  if (menuRef) {
    const hoveredIndex = menuRef.children.findIndex((e: MenuChild) => e.hover);
    if (0 <= hoveredIndex) {
      const childMenu = menuRef.children[hoveredIndex].$refs.childMenu;
      if (childMenu && childMenu.children.length > 0) {
        menuRef.children[hoveredIndex].mouseleave();
        childMenu.children[0].mouseenter();
      }
    }
  }
};

const handleKeyDown = (evt: KeyboardEvent): void => {
  switch (evt.key) {
    case ' ':
      handleSpaceKey();
      break;
    case 'Escape':
      handleEscapeKey();
      break;
    case 'Enter':
      handleEnterKey();
      break;
    case 'ArrowUp':
      handleArrowUpKey();
      break;
    case 'ArrowDown':
      handleArrowDownKey();
      break;
    case 'ArrowLeft':
      handleArrowLeftKey();
      break;
    case 'ArrowRight':
      handleArrowRightKey();
      break;
    default:
      break;
  }
};

onMounted(() => {
  wrapper.value?.addEventListener('keydown', handleKeyDown);
  window.addEventListener('resize', close);
  document.querySelector('.main-content')?.addEventListener('scroll', close);
});

onBeforeUnmount(() => {
  wrapper.value?.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('resize', close);
  document.querySelector('.main-content')?.removeEventListener('scroll', close);
});

defineExpose({
  menu,
  close,
});
</script>

<template>
  <div
    ref="wrapper"
    :class="['root-menu', top.theme, { disabled }, size]"
    :style="{ width: minWidth }"
    :tabindex="disabled ? -1 : 0"
    :aria-disabled="disabled || undefined"
    @click.prevent="openMenu"
  >
    <div>
      <div v-if="top.selected.value">
        {{ top.selected.value.label }}
      </div>
      <div v-else>&nbsp;</div>
    </div>
    <ChevronDown class="chevron" />
    <Menu ref="menu">
      <slot name="contextmenu" />
    </Menu>
  </div>
</template>

<style scoped>
.root-menu {
  position: relative;
  display: inline-block;
  color: var(--sr-color-text);
  box-shadow:
    0 1px 3px rgba(50, 50, 93, 0.15),
    0 1px 0 rgba(0, 0, 0, 0.02);
  font-weight: 400;
  line-height: 1.5;
  vertical-align: middle;
  border: 1px solid var(--sr-color-control-border);
  border-radius: var(--sr-form-control-border-radius);
  &.xs {
    padding: var(--sr-form-control-py-xs) calc(var(--sr-form-control-font-xs) * 0.75 + 1rem)
      var(--sr-form-control-py-xs) calc(var(--sr-form-control-font-xs) * 0.75);
    font-size: var(--sr-form-control-font-xs);
  }
  &.sm {
    padding: var(--sr-form-control-py-sm) calc(var(--sr-form-control-font-sm) * 0.75 + 1rem)
      var(--sr-form-control-py-sm) calc(var(--sr-form-control-font-sm) * 0.75);
    font-size: var(--sr-form-control-font-sm);
  }
  &.md {
    padding: var(--sr-form-control-py-md) calc(var(--sr-form-control-font-md) * 0.75 + 1rem)
      var(--sr-form-control-py-md) calc(var(--sr-form-control-font-md) * 0.75);
    font-size: var(--sr-form-control-font-md);
  }
  &.lg {
    padding: var(--sr-form-control-py-xl) calc(var(--sr-form-control-font-xl) * 0.75 + 1rem)
      var(--sr-form-control-py-xl) calc(var(--sr-form-control-font-xl) * 0.75);
    font-size: var(--sr-form-control-font-lg);
  }
}
.root-menu > .chevron {
  position: absolute;
  top: 50%;
  right: 0.625rem;
  width: 0.7rem;
  height: 0.7rem;
  transform: translateY(-50%);
  pointer-events: none;
}
.root-menu {
  &.theme-sm-transparent > div {
    padding: 4px 10px;
  }
}
.root-menu:focus-visible {
  outline: var(--sr-outline-width) solid var(--sr-outline-color);
  outline-offset: -1px;
  box-shadow:
    0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
}
.root-menu:hover > div:first-child {
  cursor: pointer;
}
.root-menu.disabled {
  opacity: 0.55;
  background-color: var(--sr-color-disabled-form-bg);
  pointer-events: none;
}
</style>
