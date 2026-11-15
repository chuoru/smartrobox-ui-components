import { ref, watch } from 'vue';
import { Tabs } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type TabsArgs = InstanceType<typeof Tabs>['$props'];
type Story = StoryObj<TabsArgs>;

const TABS = [
  { key: 'tab1', label: 'タブ 1' },
  { key: 'tab2', label: 'タブ 2' },
  { key: 'tab3', label: 'タブ 3' },
];

const meta: Meta<TabsArgs> = {
  title: 'Tabs',
  component: Tabs,
  render: (args: TabsArgs) => ({
    components: { Tabs },
    template: `
      <Tabs v-bind="args" style="width: 24rem;">
        <template #tab1>タブ 1 のコンテンツ</template>
        <template #tab2>タブ 2 のコンテンツ</template>
        <template #tab3>タブ 3 のコンテンツ</template>
      </Tabs>
    `,
    setup() {
      const active = ref(args.modelValue ?? 'tab1');
      watch(
        () => args.modelValue,
        (val) => {
          active.value = val ?? 'tab1';
        },
      );
      return { args, active };
    },
  }),
  tags: ['autodocs'],
  args: {
    modelValue: 'tab1',
    tabs: TABS,
  },
  argTypes: {
    modelValue: {
      control: { type: 'radio' },
      options: ['tab1', 'tab2', 'tab3'],
      description: 'Active tab key',
    },
  },
};

export const Default: Story = {};
export default meta;
