import { ref, watch } from 'vue';
import { HomeIcon, ArchiveBoxIcon, CheckIcon } from '@heroicons/vue/24/outline';
import { Stepper } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3';

type StepperArgs = InstanceType<typeof Stepper>['$props'];
type Story = StoryObj<StepperArgs>;

const STEPS = [
  { step: 1, title: '住所', description: '住所を入力してください', icon: HomeIcon },
  { step: 2, title: '配送', description: '配送方法を選択してください', icon: ArchiveBoxIcon },
  { step: 3, title: '確認', description: '注文を確認してください', icon: CheckIcon },
];

const meta: Meta<StepperArgs> = {
  title: 'Stepper',
  component: Stepper,
  render: (args: StepperArgs) => ({
    components: { Stepper },
    template: `<div style="height: 7rem;"><Stepper v-bind="args" /></div>`,
    setup() {
      const position = ref(args.modelValue ?? 1);
      watch(
        () => args.modelValue,
        (val) => {
          position.value = val ?? 1;
        },
      );
      return { args, position };
    },
  }),
  tags: ['autodocs'],
  args: {
    modelValue: 1,
    steps: STEPS,
  },
  argTypes: {
    modelValue: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Current step',
    },
  },
};

export const Default: Story = {};

export const Step2: Story = {
  args: { modelValue: 2 },
};

export const Step3: Story = {
  args: { modelValue: 3 },
};
export default meta;
