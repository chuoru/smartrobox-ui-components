import { ref, watch } from 'vue';
import { Select } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type SelectArgs = InstanceType<typeof Select>['$props'] & { disabled?: boolean };
type Story = StoryObj<SelectArgs>;

const meta: Meta<SelectArgs> = {
  title: 'Select',
  component: Select,
  render: (args: SelectArgs) => ({
    components: { Select },
    template: `<Select v-bind="args" aria-label="Fruit" />`,
    setup() {
      const checked = ref(args.modelValue ?? false);
      watch(
        () => args.modelValue,
        (val) => {
          checked.value = val ?? false;
        },
      );
      return { args, checked };
    },
  }),
  tags: ['autodocs'],
  args: {
    modelValue: undefined,
    options: [
      { label: '選択してください。', value: undefined },
      { label: 'りんご', value: 'apple' },
      { label: 'バナナ', value: 'banana' },
      { label: 'いちご', value: 'strawberry' },
      { label: 'ぶどう', value: 'grape' },
      { label: 'もも', value: 'peach' },
      { label: 'メロン', value: 'melon' },
      { label: 'すいか', value: 'watermelon' },
    ],
    size: 'md',
    disabled: false,
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Selected item\`s key',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Button disabled',
    },
  },
};

export const Default: Story = {};
export default meta;
