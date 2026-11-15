import { ref, watch } from 'vue';
import { expect, within } from 'storybook/test';
import { Input } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type InputArgs = InstanceType<typeof Input>['$props'];
type Story = StoryObj<InputArgs>;

const meta: Meta<InputArgs> = {
  title: 'Input',
  component: Input,
  render: (args: InputArgs) => ({
    components: { Input },
    template: `<Input v-bind="args" aria-label="Name" />`,
    setup() {
      const value = ref(args.modelValue ?? '');
      watch(
        () => args.modelValue,
        (val) => {
          value.value = val ?? '';
        },
      );
      return { args, value };
    },
  }),
  tags: ['autodocs'],
  args: {
    modelValue: '',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Input value',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Input size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Input disabled',
    },
  },
};

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await expect(input).toBeDisabled();
    await expect(getComputedStyle(input).opacity).toBe('0.65');
  },
};

export default meta;
