import type { Ref, ShallowRef } from 'vue';

export type ActionItem = ActionValue | ActionOption;

export type ActionValue = {
  label: string;
  value: string | undefined;
};

export type ActionOption = {
  label: string;
  options: ActionItem[];
};

export type SelectedItem = ActionValue;

export type NestableSelectContext = {
  offsetTop: string;
  offsetLeft: string;
  theme: string;
  selected: Ref<SelectedItem | undefined>;
};

export type MenuItemRef = {
  $el: HTMLElement;
  parentMenu: ParentMenuContext;
  mouseenter: () => void;
};

export type MenuChild = {
  hover: boolean;
  isActive: boolean;
  $refs: { childMenu: MenuExposed | null };
  mouseenter: () => void;
  mouseleave: () => void;
  mouseup: () => void;
  deactivate: () => void;
};

export type ParentMenuContext = {
  readonly isOpen: boolean;
  readonly submenuDirection: 'left' | 'right';
  readonly activeMenuItem: ShallowRef<MenuItemRef | null>;
  readonly menuClosed: Ref<number>;
  children: MenuChild[];
  close: (parent?: boolean) => void;
};

export type MenuExposed = {
  readonly isOpen: boolean;
  readonly submenuDirection: 'left' | 'right';
  children: MenuChild[];
  parentMenuItem: MenuItemRef | null;
  open: (x: number, y: number, position?: 'left' | 'right') => void;
  close: (parent?: boolean) => void;
};
