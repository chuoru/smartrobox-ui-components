import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import type { Preview, Decorator } from '@storybook/vue3-vite';
import '../src/style.css';

const applyThemeClass: Decorator = (story, context) => {
  document.body.classList.toggle('dark', context.globals.backgrounds?.value === 'dark');
  return story();
};

const preview: Preview = {
  decorators: [applyThemeClass],
  parameters: {
    a11y: { test: 'error' },
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
          value: '#172b4d',
        },
      },
    },
  },
};

export default preview;
