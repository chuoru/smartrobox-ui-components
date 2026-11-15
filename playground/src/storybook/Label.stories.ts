import { Label } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3';

type LabelArgs = InstanceType<typeof Label>['$props'] & { default?: string };
type Story = StoryObj<LabelArgs>;

const meta: Meta<LabelArgs> = {
  title: 'Label',
  component: Label,
  render: (args: LabelArgs) => ({
    components: { Label },
    template: `<Label v-bind="args">{{ args.default ?? 'ラベルテキスト' }}</Label>`,
    setup() {
      return { args };
    },
  }),
  tags: ['autodocs'],
  args: {
    weight: 'normal',
    default: 'ラベルテキスト',
  },
  argTypes: {
    weight: {
      control: { type: 'radio' },
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight',
    },
    default: {
      control: { type: 'text' },
      description: 'Label text (slot)',
    },
  },
};

export const Default: Story = {};

export const Bold: Story = {
  args: { weight: 'bold' },
};

export const Semibold: Story = {
  args: { weight: 'semibold' },
};
export default meta;
