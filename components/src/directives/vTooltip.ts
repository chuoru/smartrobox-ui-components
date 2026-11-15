import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/vue';
import type { Directive, DirectiveBinding } from 'vue';
import type { Placement } from '@floating-ui/vue';

const ARROW_HEIGHT = 8; // px, the colored border's width (tip direction)

type TooltipOptions = {
  content: string;
  placement?: Placement; // default: 'top'
  offset?: number; // default: 0
  zIndex?: number; // default: 50
};

export type TooltipBinding = string | TooltipOptions;

export type TooltipState = {
  tooltip: HTMLDivElement;
  arrowEl: HTMLDivElement;
  cleanup: () => void;
  show: () => void;
  hide: () => void;
};

const createTooltipEl = (
  content: string,
  zIndex: number,
): {
  tooltip: HTMLDivElement;
  arrowEl: HTMLDivElement;
} => {
  const tooltipId = `tooltip-${crypto.randomUUID()}`;
  const tooltip = document.createElement('div');
  tooltip.setAttribute('id', tooltipId);
  tooltip.setAttribute('role', 'tooltip');
  Object.assign(tooltip.style, {
    position: 'absolute',
    zIndex,
    display: 'none',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.3s',
    maxWidth: '20rem',
    borderRadius: '0.375rem',
    border: 0,
    padding: '0.375rem 0.625rem',
    backgroundColor: 'var(--sr-color-bg-tooltip)',
    color: 'var(--sr-color-text-tooltip)',
    fontSize: '0.75rem',
    lineHeight: '1.375',
  });
  tooltip.textContent = content;

  // A classic CSS border-triangle: the element itself has zero width/height,
  // and one border-color is set (matching the tooltip body's fill) while the
  // two adjacent sides are transparent, so only the diagonal "wedge" between
  // them renders. Widths/colors/placement are set within `setupAutoUpdate`
  // based on placement.
  const arrowEl = document.createElement('div');
  Object.assign(arrowEl.style, {
    position: 'absolute',
    width: '0',
    height: '0',
  });
  tooltip.appendChild(arrowEl);

  document.body.appendChild(tooltip);
  return { tooltip, arrowEl };
};

const setupAutoUpdate = (
  reference: HTMLElement,
  floating: HTMLDivElement,
  arrowEl: HTMLDivElement,
  placement: Placement,
  offsetPx: number,
): (() => void) => {
  return autoUpdate(reference, floating, () => {
    computePosition(reference, floating, {
      placement,
      middleware: [offset(offsetPx), flip(), shift({ padding: 6 }), arrow({ element: arrowEl })],
    }).then(({ x, y, placement: resolvedPlacement, middlewareData }) => {
      Object.assign(floating.style, { left: `${x}px`, top: `${y}px` });

      const arrowData = middlewareData.arrow;
      if (!arrowData) {
        return;
      }

      // Position the arrow at the center of the opposite side.
      const baseSide = resolvedPlacement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
      const staticSide: Record<'top' | 'right' | 'bottom' | 'left', 'top' | 'right' | 'bottom' | 'left'> = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      };

      // A classic CSS border-triangle: the element has zero width/height, and
      // a triangle is formed by giving one border a color while the two
      // adjacent borders (perpendicular to it) stay transparent — only the
      // diagonal wedge between the colored border and its neighbors renders,
      // pointing away from the colored side. `borderSide` names which side to
      // color for each placement (pointing outward, toward the reference
      // element); `crossBorders` are the two adjacent sides left transparent.
      const ARROW_BASE = 10; // px, the transparent borders' width (base), halved per side
      const halfBase = `${ARROW_BASE / 2}px`;
      // The tip points away from the colored side (e.g. a colored
      // `borderTop` with transparent left/right pushes the tip downward), so
      // each placement colors the side opposite the direction the tip should
      // point.
      const borderSide: Record<
        'top' | 'right' | 'bottom' | 'left',
        'borderTop' | 'borderRight' | 'borderBottom' | 'borderLeft'
      > = {
        top: 'borderTop', // tooltip above reference: arrow points down
        bottom: 'borderBottom', // tooltip below reference: arrow points up
        left: 'borderLeft', // tooltip left of reference: arrow points right
        right: 'borderRight', // tooltip right of reference: arrow points left
      };
      const crossBorders: Record<
        'top' | 'right' | 'bottom' | 'left',
        ['borderLeft', 'borderRight'] | ['borderTop', 'borderBottom']
      > = {
        top: ['borderLeft', 'borderRight'],
        bottom: ['borderLeft', 'borderRight'],
        left: ['borderTop', 'borderBottom'],
        right: ['borderTop', 'borderBottom'],
      };
      const isVertical = baseSide === 'top' || baseSide === 'bottom';

      arrowEl.style.borderTop = '';
      arrowEl.style.borderRight = '';
      arrowEl.style.borderBottom = '';
      arrowEl.style.borderLeft = '';

      arrowEl.style[borderSide[baseSide]] = `${ARROW_HEIGHT}px solid var(--sr-color-bg-tooltip)`;
      const [crossA, crossB] = crossBorders[baseSide];
      arrowEl.style[crossA] = `${halfBase} solid transparent`;
      arrowEl.style[crossB] = `${halfBase} solid transparent`;

      // `side` (the placement's fixed edge, pinning the arrow against the
      // tooltip body) and the floating-ui-computed offset along the other
      // axis land on different properties, so they must not be allowed to
      // overwrite each other: top/bottom placements fix `top`/`bottom` and
      // vary `left`; left/right placements fix `left`/`right` and vary `top`.
      // `arrowData.x`/`y` is the centerline computed against the element's
      // zero width/height; since the border straddles evenly on either side
      // of that origin, no half-base correction is needed.
      const side = staticSide[baseSide];
      arrowEl.style.left = '';
      arrowEl.style.top = '';
      arrowEl.style.right = '';
      arrowEl.style.bottom = '';
      if (isVertical) {
        arrowEl.style.left = arrowData.x != null ? `${arrowData.x}px` : '';
      } else {
        arrowEl.style.top = arrowData.y != null ? `${arrowData.y}px` : '';
      }
      arrowEl.style[side] = `-${ARROW_HEIGHT}px`;
    });
  });
};

const normalizeOptions = (
  binding: DirectiveBinding<TooltipBinding>,
  defaultZIndex: number,
): Required<TooltipOptions> => {
  if (typeof binding.value === 'string') {
    return {
      content: binding.value,
      placement: 'top',
      offset: 8,
      zIndex: defaultZIndex,
    };
  }
  return {
    content: binding.value.content,
    placement: binding.value.placement ?? 'top',
    offset: binding.value.offset ?? 8,
    zIndex: binding.value.zIndex ?? defaultZIndex,
  };
};

export const STATE_KEY = Symbol('tooltipState');

export type TooltipDirectiveOptions = {
  zIndex?: number; // default: 50
};

export const createVTooltip = (
  options: TooltipDirectiveOptions = {},
): Directive<HTMLElement & { [STATE_KEY]?: TooltipState }, TooltipBinding> => {
  const defaultZIndex = options.zIndex ?? 50;

  return {
    mounted(el, binding) {
      const { content, placement, offset: offsetPx, zIndex } = normalizeOptions(binding, defaultZIndex);
      const { tooltip, arrowEl } = createTooltipEl(content, zIndex);

      let hideTimeoutId: ReturnType<typeof setTimeout> | undefined;
      const show = () => {
        clearTimeout(hideTimeoutId);
        tooltip.style.display = 'block';
        // Forces a style recalculation so the opacity transition below runs
        // against the 'display: block' state rather than being coalesced
        // with it into a single, untransitioned paint.
        void tooltip.offsetHeight;
        tooltip.style.opacity = '1';
      };
      const hide = () => {
        tooltip.style.opacity = '0';
        hideTimeoutId = setTimeout(() => {
          tooltip.style.display = 'none';
        }, 300);
      };

      const stopAutoUpdate = setupAutoUpdate(el, tooltip, arrowEl, placement, offsetPx);
      const cleanup = () => {
        clearTimeout(hideTimeoutId);
        stopAutoUpdate();
      };

      el.addEventListener('mouseenter', show);
      el.addEventListener('mouseleave', hide);
      el.addEventListener('focus', show);
      el.addEventListener('blur', hide);
      el.setAttribute('aria-describedby', tooltip.id);
      el[STATE_KEY] = { tooltip, arrowEl, cleanup, show, hide };
    },

    updated(el, binding) {
      const state = el[STATE_KEY];
      if (!state) {
        return;
      }

      if (state.tooltip.childNodes[0]) {
        if (typeof binding.value === 'string') {
          state.tooltip.childNodes[0].textContent = binding.value;
        } else if ('content' in binding.value) {
          state.tooltip.childNodes[0].textContent = binding.value.content;
        }
      }

      const { zIndex } = normalizeOptions(binding, defaultZIndex);
      state.tooltip.style.zIndex = `${zIndex}`;
    },

    beforeUnmount(el) {
      const state = el[STATE_KEY];
      if (!state) {
        return;
      }
      state.cleanup();
      state.tooltip.remove();
      el.removeEventListener('mouseenter', state.show);
      el.removeEventListener('mouseleave', state.hide);
      el.removeEventListener('focus', state.show);
      el.removeEventListener('blur', state.hide);
      el.removeAttribute('aria-describedby');
      delete el[STATE_KEY];
    },
  };
};

export const vTooltip = createVTooltip();

declare module 'vue' {
  interface GlobalDirectives {
    vTooltip: Directive<HTMLElement, TooltipBinding>;
  }
}
