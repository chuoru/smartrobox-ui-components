import { SliderRange } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type Story = StoryObj;

const meta: Meta = {
  title: 'SliderRange',
  component: SliderRange,
  render: () => ({
    components: { SliderRange },
    template: `<div style="width: 12rem;"><SliderRange /></div>`,
    setup() {
      return {};
    },
  }),
  tags: ['autodocs'],
};

export const Default: Story = {};
export default meta;
