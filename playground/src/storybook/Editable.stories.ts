import { ref, watch } from 'vue';
import { Editable } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3';

type EditableArgs = InstanceType<typeof Editable>['$props'];
type Story = StoryObj<EditableArgs>;

const meta: Meta<EditableArgs> = {
  title: 'Editable',
  component: Editable,
  render: (args: EditableArgs) => ({
    components: { Editable },
    template: `<Editable v-bind="args" />`,
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
    modelValue: '編集可能なテキスト',
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Editable value',
    },
  },
};

export const Default: Story = {};
export default meta;
