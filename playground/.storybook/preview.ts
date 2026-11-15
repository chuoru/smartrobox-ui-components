import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import type { Preview, Decorator } from '@storybook/vue3-vite';
import '../src/style.css';

const applyBackgroundClass: Decorator = (story) => {
  if (document.body.classList.contains('dark')) {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  } else {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  }
  return story();
};

const preview: Preview = {
  decorators: [applyBackgroundClass],
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: 'white',
        },
        dark: {
          name: 'dark',
          value: 'oklch(12.9% 0.042 264.695)',
        },
      },
    },
  },
};

export default preview;
