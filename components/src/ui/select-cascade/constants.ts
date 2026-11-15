import type { InjectionKey } from 'vue';
import type { NestableSelectContext, ParentMenuContext } from './types';

export const SR_NESTABLE_SELECT_KEY: InjectionKey<NestableSelectContext> = Symbol('sr-nestable-select-key');
export const SR_PARENT_MENU_KEY: InjectionKey<ParentMenuContext> = Symbol('sr-parent-menu-key');
export const SR_DOWNWARD_FLAG_KEY: InjectionKey<boolean> = Symbol('sr-downward-flag-key');
