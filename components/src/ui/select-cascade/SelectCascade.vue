<script setup lang="ts">
import { h, ref, watch, onMounted, provide } from 'vue';
import MenuItem from './MenuItem.vue';
import RootMenu from './RootMenu.vue';
import { SR_NESTABLE_SELECT_KEY, SR_DOWNWARD_FLAG_KEY } from './constants';
import type { VNode } from 'vue';
import type { ActionItem, SelectedItem } from './types';

const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    options: ActionItem[];
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    offsetTop?: string;
    offsetLeft?: string;
    downward?: boolean;
    theme?: string;
  }>(),
  {
    size: 'md',
    disabled: false,
    offsetTop: '0',
    offsetLeft: '0',
    downward: true,
    theme: 'theme-default',
  },
);

const emit = defineEmits<{
  change: [value?: string];
}>();

const selected = ref<SelectedItem | undefined>(undefined);
const width = ref<string | null>(null);
const isInitialized = ref(false);

provide(SR_NESTABLE_SELECT_KEY, {
  offsetTop: props.offsetTop,
  offsetLeft: props.offsetLeft,
  theme: props.theme,
  selected,
});
provide(SR_DOWNWARD_FLAG_KEY, props.downward);

watch(selected, (item) => {
  if (!isInitialized.value) {
    // skip emit() during initial assignment. This is aligned with the standard <select>.
    return;
  }
  model.value = item?.value;
  emit('change', item?.value);
});

watch(model, () => {
  if (selected.value?.value !== model.value) {
    // this will happen when sr-nestable-select is used in an array of selectors.
    const actionItem = getActionItem(props.options, model.value);

    if (actionItem && 'value' in actionItem) {
      selected.value = { label: actionItem.label, value: actionItem.value };
    } else {
      selected.value = undefined;
    }
  }
});

const getActionItem = (options: ActionItem[], value: string | undefined): ActionItem | null => {
  for (const item of options) {
    if ('value' in item && item.value === value) {
      return item;
    } else if ('options' in item) {
      const nestedItem = getActionItem(item.options, value);
      if (nestedItem) {
        return nestedItem;
      }
    }
  }
  return null;
};

const collectActionText = (): string[] => {
  const texts: string[] = [];

  const parse = (options: ActionItem[]): void => {
    for (const item of options) {
      if ('options' in item) {
        texts.push(item.label + '&rtrif;');
        parse(item.options);
      } else {
        texts.push(item.label);
      }
    }
  };
  parse(props.options);

  return texts;
};

const computeRootMenuMinWidth = (): string => {
  const texts = collectActionText();

  const container = document.createElement('div');
  container.style.display = 'inline-block';
  container.style.visibility = 'hidden';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.overflow = 'hidden';
  container.style.fontFamily = '"Open Sans", sans-serif';
  container.style.fontSize = '0.875rem';
  container.style.zIndex = '-1';

  for (const text of texts) {
    const elem = document.createElement('div');
    elem.style.display = 'block';
    elem.style.fontSize = `var(--sr-form-control-font-${props.size})`;
    elem.innerHTML = `&check;${text}`;
    container.appendChild(elem);
  }
  document.body.appendChild(container);
  const rect = container.getBoundingClientRect();
  document.body.removeChild(container);

  // calculation details.
  // rect.width + max(RootMenu.padding.left + RootMenu.padding.right) + margin(0.5rem)
  return `calc(${rect.width}px + 2.75rem`;
};

const createRecursiveElements = (items: ActionItem[]): VNode[] => {
  const group: VNode[] = [];

  for (const item of items) {
    if ('options' in item) {
      group.push(
        h(
          MenuItem,
          {
            label: item.label,
            value: '',
          },
          () => createRecursiveElements(item.options),
        ),
      );
    } else {
      group.push(
        h(MenuItem, {
          label: item.label,
          value: item.value,
        }),
      );
    }
  }
  return group;
};

onMounted(() => {
  const actionItem = getActionItem(props.options, model.value);
  if (actionItem && 'value' in actionItem) {
    selected.value = { label: actionItem.label, value: actionItem.value };
  }
  // adjust top-menu width with the longest text's.
  width.value = computeRootMenuMinWidth();
  isInitialized.value = true;
});

const render = () =>
  h(
    RootMenu,
    {
      disabled: props.disabled,
      minWidth: width.value ?? undefined,
      size: props.size,
    },
    {
      contextmenu: () => [...createRecursiveElements(props.options)],
    },
  );
</script>

<template>
  <render />
</template>
