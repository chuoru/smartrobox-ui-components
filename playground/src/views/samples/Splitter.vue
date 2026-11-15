<script setup lang="ts">
import { Splitter } from '@smartrobox/ui';
</script>

<template>
  <div class="tw:h-64 tw:w-full tw:px-8 tw:text-sm tw:font-semibold">
    <Splitter.Group
      id="splitter-group-1"
      direction="horizontal"
    >
      <Splitter.Panel
        id="splitter-group-1-panel-1"
        :min-size="20"
        class="tw:flex tw:items-center tw:justify-center tw:rounded-xl tw:border tw:border-slate-400"
      >
        Panel A
      </Splitter.Panel>
      <Splitter.ResizeHandle
        id="splitter-group-1-resize-handle-1"
        class="tw:w-2"
      />
      <Splitter.Panel
        id="splitter-group-1-panel-2"
        :min-size="20"
      >
        <Splitter.Group
          id="splitter-group-2"
          direction="vertical"
          auto-save-id="sample-splitter"
        >
          <Splitter.Panel
            id="splitter-group-2-panel-1"
            :min-size="20"
            class="tw:flex tw:items-center tw:justify-center tw:rounded-xl tw:border tw:border-slate-400"
          >
            Panel B (auto save)
          </Splitter.Panel>
          <Splitter.ResizeHandle
            id="splitter-group-2-resize-handle-1"
            class="tw:h-2"
          />
          <Splitter.Panel
            id="splitter-group-2-panel-2"
            :collapsible="true"
            class="tw:flex tw:items-center tw:justify-center tw:rounded-xl tw:border tw:border-slate-400"
          >
            Panel C (auto save, collapsible)
          </Splitter.Panel>
        </Splitter.Group>
      </Splitter.Panel>
    </Splitter.Group>
  </div>
</template>
