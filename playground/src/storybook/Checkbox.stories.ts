import { ref, watch } from 'vue';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type CheckboxArgs = InstanceType<typeof Checkbox>['$props'];
type Story = StoryObj<CheckboxArgs>;

const meta: Meta<CheckboxArgs> = {
  title: 'Checkbox',
  component: Checkbox,
  render: (args) => ({
    components: { Checkbox },
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
    template: `<Checkbox v-bind="args" v-model="checked" />`,
  }),
  tags: ['autodocs'],
  args: {
    modelValue: false,
    disabled: false,
    label: 'Accept terms',
  },
  argTypes: {
    modelValue: {
      control: { type: 'radio' },
      options: [false, true, 'indeterminate'],
      description: 'Checkbox state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Checkbox disabled',
    },
  },
};

export const Default: Story = {};

export const Checked: Story = {
  args: { modelValue: true },
};

export const Indeterminate: Story = {
  args: { modelValue: 'indeterminate' },
};

export const CheckAndUncheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled checkbox' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText('Disabled checkbox');

    await expect(checkbox).toBeDisabled();
    await expect(getComputedStyle(checkbox).pointerEvents).toBe('none');

    const probe = document.createElement('span');
    probe.style.color = 'var(--sr-color-text-light)';
    canvasElement.appendChild(probe);
    const expectedColor = getComputedStyle(probe).color;
    probe.remove();

    await expect(getComputedStyle(label).color).toBe(expectedColor);
  },
};

export default meta;
