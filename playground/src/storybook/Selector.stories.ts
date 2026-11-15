import { ref, watch } from 'vue';
import { SelectGrouped } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3';

type SelectorArgs = InstanceType<typeof SelectGrouped>['$props'];
type Story = StoryObj<SelectorArgs>;

const meta: Meta<SelectorArgs> = {
  title: 'Selector',
  component: SelectGrouped,
  render: (args: SelectorArgs) => ({
    components: { SelectGrouped },
    template: `<SelectGrouped v-bind="args" />`,
    setup() {
      const value = ref(args.modelValue ?? undefined);
      watch(
        () => args.modelValue,
        (val) => {
          value.value = val;
        },
      );
      return { args, value };
    },
  }),
  tags: ['autodocs'],
  args: {
    modelValue: undefined,
    options: [
      { label: '選択してください。', value: undefined },
      {
        label: '熱帯の果物',
        options: [
          { label: 'マンゴー', value: 'mango' },
          { label: 'パイナップル', value: 'pineapple' },
          { label: 'パパイヤ', value: 'papaya' },
        ],
      },
      {
        label: '温帯の果物',
        options: [
          { label: 'りんご', value: 'apple' },
          { label: 'もも', value: 'peach' },
          { label: 'ぶどう', value: 'grape' },
        ],
      },
    ],
    size: 'md',
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Selected value',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
    },
  },
};

export const Default: Story = {};
export default meta;
