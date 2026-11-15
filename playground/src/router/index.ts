import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { camelCase, upperFirst } from 'lodash-es';
import Home from '@/views/Home.vue';

export const SAMPLES = [
  'alert-dialog',
  'breadcrumbs',
  'button',
  'button-with-confirm',
  'button-with-delete-confirm',
  'card',
  'checkbox',
  'combobox',
  'context-menu',
  'date-picker',
  'date-range-picker',
  'date-time',
  'date-time-format',
  'dialog',
  'dropdown-menu',
  'editable',
  'error-alert',
  'hover-card',
  'input',
  'ip-address',
  'label',
  'link-external',
  'loading',
  'mac-address',
  'naming-styles',
  'number-format',
  'one-click-copy',
  'pagination',
  'popover',
  'popover-native',
  'progress',
  'radio-group',
  'select',
  'select-cascade',
  'select-grouped',
  'select-time-zone',
  'separator',
  'slider',
  'splitter',
  'stepper',
  'switch',
  'tabs',
  'textarea',
  'toast',
  'toggle',
  'toggle-group',
  'tooltip',
];

export const toPascalCase = (str: string) => upperFirst(camelCase(str));

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  ...SAMPLES.map((sample) => ({
    path: `/samples/${sample}`,
    component: () => import(`@/views/samples/${toPascalCase(sample)}.vue`),
  })),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
