<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRightIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { ContextMenu } from '@smartrobox/ui';

const checkboxOne = ref(false);
const checkboxTwo = ref(false);
const person = ref('pedro');

const handleClick = () => alert('hello!');
</script>

<template>
  <ContextMenu.Root>
    <ContextMenu.Trigger>
      <span
        class="tw:block tw:w-75 tw:rounded-xl tw:border-2 tw:border-dashed tw:border-slate-700 tw:py-11.25 tw:text-center tw:text-sm tw:text-gray-700 tw:select-none tw:dark:border-slate-300 tw:dark:text-gray-100"
      >
        Right click here.
      </span>
    </ContextMenu.Trigger>
    <ContextMenu.Portal>
      <ContextMenu.Content :side-offset="5">
        <ContextMenu.Item
          value="New Tab"
          @click="handleClick"
        >
          New Tab
          <ContextMenu.ItemSuffix>⌘+T</ContextMenu.ItemSuffix>
        </ContextMenu.Item>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger value="more toolsz">
            <div>More Tools2</div>
            <ContextMenu.ItemSuffix>
              <ChevronRightIcon class="tw:size-3" />
            </ContextMenu.ItemSuffix>
          </ContextMenu.SubTrigger>
          <ContextMenu.Portal>
            <ContextMenu.SubContent
              :side-offset="2"
              :align-offset="-5"
            >
              <ContextMenu.Item>
                Save Page As…
                <ContextMenu.ItemSuffix>⌘+S</ContextMenu.ItemSuffix>
              </ContextMenu.Item>
              <ContextMenu.Item>Create Shortcut…</ContextMenu.Item>
              <ContextMenu.Item>Name Window…</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Developer Tools</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Portal>
        </ContextMenu.Sub>
        <ContextMenu.Item value="New Window">
          New Window
          <ContextMenu.ItemSuffix>⌘+N</ContextMenu.ItemSuffix>
        </ContextMenu.Item>
        <ContextMenu.Item
          value="New Private Window"
          disabled
        >
          New Private Window
          <ContextMenu.ItemSuffix>⇧+⌘+N</ContextMenu.ItemSuffix>
        </ContextMenu.Item>
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger value="more tools">
            More Tools
            <ContextMenu.ItemSuffix>
              <ChevronRightIcon class="tw:size-3" />
            </ContextMenu.ItemSuffix>
          </ContextMenu.SubTrigger>
          <ContextMenu.Portal>
            <ContextMenu.SubContent
              :side-offset="2"
              :align-offset="-5"
            >
              <ContextMenu.Item>
                Save Page As…
                <ContextMenu.ItemSuffix>⌘+S</ContextMenu.ItemSuffix>
              </ContextMenu.Item>
              <ContextMenu.Item>Create Shortcut…</ContextMenu.Item>
              <ContextMenu.Item>Name Window…</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Developer Tools</ContextMenu.Item>
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger value="more toolsz">
                  More Tools
                  <ContextMenu.ItemSuffix>
                    <ChevronRightIcon class="tw:size-3" />
                  </ContextMenu.ItemSuffix>
                </ContextMenu.SubTrigger>
                <ContextMenu.Portal>
                  <ContextMenu.SubContent
                    :side-offset="2"
                    :align-offset="-5"
                  >
                    <ContextMenu.Item>
                      Save Page As…
                      <ContextMenu.ItemSuffix>⌘+S</ContextMenu.ItemSuffix>
                    </ContextMenu.Item>
                    <ContextMenu.Item>Create Shortcut…</ContextMenu.Item>
                    <ContextMenu.Item>Name Window…</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item>Developer Tools</ContextMenu.Item>
                    <ContextMenu.Sub>
                      <ContextMenu.SubTrigger value="more toolsz">
                        More Tools
                        <ContextMenu.ItemSuffix>
                          <ChevronRightIcon class="tw:size-3" />
                        </ContextMenu.ItemSuffix>
                      </ContextMenu.SubTrigger>
                      <ContextMenu.Portal>
                        <ContextMenu.SubContent
                          :side-offset="2"
                          :align-offset="-5"
                        >
                          <ContextMenu.Item>
                            Save Page As…
                            <ContextMenu.ItemSuffix>⌘+S</ContextMenu.ItemSuffix>
                          </ContextMenu.Item>
                          <ContextMenu.Item>Create Shortcut…</ContextMenu.Item>
                          <ContextMenu.Item>Name Window…</ContextMenu.Item>
                          <ContextMenu.Separator />
                          <ContextMenu.Item>Developer Tools</ContextMenu.Item>
                        </ContextMenu.SubContent>
                      </ContextMenu.Portal>
                    </ContextMenu.Sub>
                  </ContextMenu.SubContent>
                </ContextMenu.Portal>
              </ContextMenu.Sub>
              <ContextMenu.Item>Developer Tools</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Portal>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.CheckboxItem v-model="checkboxOne">
          <ContextMenu.ItemIndicator>
            <CheckIcon class="tw:size-3" />
          </ContextMenu.ItemIndicator>
          Show Bookmarks
        </ContextMenu.CheckboxItem>
        <ContextMenu.CheckboxItem v-model="checkboxTwo">
          <ContextMenu.ItemIndicator>
            <CheckIcon class="tw:size-3" />
          </ContextMenu.ItemIndicator>
          Show Full URLs
        </ContextMenu.CheckboxItem>
        <ContextMenu.Separator />
        <ContextMenu.Label>People</ContextMenu.Label>
        <ContextMenu.RadioGroup v-model="person">
          <ContextMenu.RadioItem value="pedro">
            <ContextMenu.ItemIndicator>
              <span class="tw:text-[10px] tw:text-stone-600">&#x25CF;</span>
            </ContextMenu.ItemIndicator>
            Pedro Duarte
          </ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="colm">
            <ContextMenu.ItemIndicator>
              <span class="tw:text-[10px] tw:text-stone-600">&#x25CF;</span>
            </ContextMenu.ItemIndicator>
            Colm Tuite
          </ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
      </ContextMenu.Content>
    </ContextMenu.Portal>
  </ContextMenu.Root>
</template>
