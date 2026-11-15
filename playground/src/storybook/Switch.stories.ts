import { Switch } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type SwitchArgs = InstanceType<typeof Switch>['$props'];
type Story = StoryObj<SwitchArgs>;

const meta: Meta<SwitchArgs> = {
  title: 'Switch',
  component: Switch,
  render: (args: SwitchArgs) => ({
    components: { Switch },
    template: `<Switch v-bind="args" />`,
    setup() {
      return { args };
    },
  }),
  tags: ['autodocs'],
  args: {
    size: 'md',
    label: 'スイッチ',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['xs', 'sm', 'md'],
      description: 'Switch size',
    },
    label: {
      control: { type: 'text' },
      description: 'Aria label',
    },
  },
};

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const ExtraSmall: Story = {
  args: { size: 'xs' },
};
export default meta;
