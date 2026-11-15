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
  parameters: { a11y: { test: 'error' } },
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

export const Success: Story = {
  args: { variant: 'success' },
};

export const Info: Story = {
  args: { variant: 'info' },
};

export const Warning: Story = {
  args: { variant: 'warning' },
};

export const Link: Story = {
  args: { variant: 'link' },
};

const ALL_VARIANTS = ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] as const;
const OUTLINE_VARIANTS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as const;

const allVariants: Story = {
  render: () => ({
    components: { Button },
    setup: () => ({ ALL_VARIANTS, OUTLINE_VARIANTS }),
    template: `
      <div style="display: grid; gap: 1rem">
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
          <Button v-for="v in ALL_VARIANTS" :key="v" :variant="v">{{ v }}</Button>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
          <Button v-for="v in OUTLINE_VARIANTS" :key="v" :variant="v" outline>{{ v }} outline</Button>
        </div>
      </div>`,
  }),
};

export const AllVariants: Story = allVariants;

export const AllVariantsDark: Story = {
  ...allVariants,
  globals: { backgrounds: { value: 'dark' } },
};

export default meta;
