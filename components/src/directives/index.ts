import { createVTooltip, vTooltip } from './vTooltip';
import type { TooltipDirectiveOptions } from './vTooltip';
import type { App } from 'vue';

export type DirectivesOptions = {
  tooltip?: TooltipDirectiveOptions;
};

export const directives = {
  install(app: App, options: DirectivesOptions = {}) {
    app.directive('tooltip', createVTooltip(options.tooltip));
  },
};

export { vTooltip, createVTooltip };
export type { TooltipDirectiveOptions };
