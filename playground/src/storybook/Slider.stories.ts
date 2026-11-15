import { ref, watch } from 'vue';
import { Slider } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3';

type SliderArgs = InstanceType<typeof Slider>['$props'];
type Story = StoryObj<SliderArgs>;

const meta: Meta<SliderArgs> = {
  title: 'Slider',
  component: Slider,
  render: (args: SliderArgs) => ({
    components: { Slider },
    template: `<div style="width: 12rem;"><Slider v-bind="args" /></div>`,
    setup() {
      const value = ref(args.modelValue ?? 50);
      watch(
        () => args.modelValue,
        (val) => {
          value.value = val ?? 50;
        },
      );
      return { args, value };
    },
  }),
  tags: ['autodocs'],
  args: {
    modelValue: 50,
  },
  argTypes: {
    modelValue: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Slider value',
    },
  },
};

export const Default: Story = {};
export default meta;
