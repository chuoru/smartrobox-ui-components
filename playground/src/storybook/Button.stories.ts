import { Button } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type ButtonArgs = InstanceType<typeof Button>['$props'] & { disabled?: boolean; onClick?: () => void };
type Story = StoryObj<ButtonArgs>;

const meta: Meta<ButtonArgs> = {
  title: 'Button',
  component: Button,
  render: (args: ButtonArgs) => ({
    components: { Button },
    template: `<Button v-bind="args">Confirm</Button>`,
    setup() {
      return { args };
    },
  }),
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'md',
    outline: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link', 'none'],
      description: 'Button variant',
    },
    size: {
      control: { type: 'radio' },
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    outline: {
      control: { type: 'boolean' },
      description: 'Outline style',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Button disabled',
    },
    onClick: { action: 'onClick' },
  },
};

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const None: Story = {
  args: { variant: 'none' },
};

export default meta;
