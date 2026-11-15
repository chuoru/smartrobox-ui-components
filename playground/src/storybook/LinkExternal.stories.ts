import { LinkExternal } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3';

type LinkExternalArgs = InstanceType<typeof LinkExternal>['$props'] & { default?: string };
type Story = StoryObj<LinkExternalArgs>;

const meta: Meta<LinkExternalArgs> = {
  title: 'LinkExternal',
  component: LinkExternal,
  render: (args: LinkExternalArgs) => ({
    components: { LinkExternal },
    template: `<LinkExternal v-bind="args">{{ args.default ?? 'リンクテキスト' }}</LinkExternal>`,
    setup() {
      return { args };
    },
  }),
  tags: ['autodocs'],
  args: {
    to: 'https://example.com',
    default: 'リンクテキスト',
  },
  argTypes: {
    to: {
      control: { type: 'text' },
      description: 'Link URL',
    },
    default: {
      control: { type: 'text' },
      description: 'Link text (slot)',
    },
  },
};

export const Default: Story = {};
export default meta;
