import { ref, watch } from 'vue';
import { expect, within } from 'storybook/test';
import { RadioGroup } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type RadioGroupArgs = InstanceType<typeof RadioGroup>['$props'];
type Story = StoryObj<RadioGroupArgs>;

const meta: Meta<RadioGroupArgs> = {
  title: 'RadioGroup',
  component: RadioGroup,
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup },
    template: `<RadioGroup v-bind="args" />`,
    setup() {
      const value = ref(args.modelValue ?? undefined);
      watch(
        () => args.modelValue,
        (val) => {
          value.value = val ?? undefined;
        },
      );
      return { args, value };
    },
  }),
  tags: ['autodocs'],
  args: {
    modelValue: undefined,
    options: [
      { label: 'りんご', value: 'apple' },
      { label: 'バナナ', value: 'banana' },
      { label: 'いちご', value: 'strawberry' },
    ],
    size: 'md',
    disabled: false,
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Selected value',
    },
    size: {
      control: { type: 'radio' },
      options: ['xs', 'sm', 'md'],
      description: 'Radio size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'RadioGroup disabled',
    },
  },
};

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');

    for (const radio of radios) {
      await expect(radio).toBeDisabled();
    }
  },
};

export default meta;
