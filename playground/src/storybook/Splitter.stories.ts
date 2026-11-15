import { Splitter } from '@smartrobox/ui';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

type Story = StoryObj;

const meta: Meta = {
  title: 'Splitter',
  component: Splitter.Group,
  render: () => ({
    components: {
      SplitterGroup: Splitter.Group,
      SplitterPanel: Splitter.Panel,
      SplitterResizeHandle: Splitter.ResizeHandle,
    },
    template: `
      <div style="height: 16rem; width: 100%;">
        <SplitterGroup id="story-splitter" direction="horizontal">
          <SplitterPanel id="story-panel-a" :min-size="20" style="display: flex; align-items: center; justify-content: center; border: 1px solid #94a3b8; border-radius: 0.5rem;">
            Panel A
          </SplitterPanel>
          <SplitterResizeHandle id="story-resize-handle" style="width: 0.5rem;" />
          <SplitterPanel id="story-panel-b" :min-size="20" style="display: flex; align-items: center; justify-content: center; border: 1px solid #94a3b8; border-radius: 0.5rem;">
            Panel B
          </SplitterPanel>
        </SplitterGroup>
      </div>
    `,
    setup() {
      return {};
    },
  }),
  tags: ['autodocs'],
};

export const Default: Story = {};
export default meta;
