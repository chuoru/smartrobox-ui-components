<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRightIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { DropdownMenu, Button } from '@smartrobox/ui';

const toggleState = ref(false);
const checkboxOne = ref(false);
const checkboxTwo = ref(false);
const person = ref('leanne');

const handleSelect = () => alert('hello!');
</script>

<template>
  <div class="tw:relative">
    <DropdownMenu.Root v-model:open="toggleState">
      <DropdownMenu.Trigger>
        <Button>open</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content :side-offset="5">
          <DropdownMenu.Item
            value="New Tab"
            @select="handleSelect"
          >
            New Tab
            <DropdownMenu.ItemSuffix>⌘+T</DropdownMenu.ItemSuffix>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger value="more tools">
              More Tools
              <DropdownMenu.ItemSuffix>
                <ChevronRightIcon class="tw:size-3" />
              </DropdownMenu.ItemSuffix>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                :side-offset="2"
                :align-offset="-5"
              >
                <DropdownMenu.Item>
                  Save Page As…
                  <DropdownMenu.ItemSuffix>⌘+S</DropdownMenu.ItemSuffix>
                </DropdownMenu.Item>
                <DropdownMenu.Item>Create Shortcut…</DropdownMenu.Item>
                <DropdownMenu.Item>Name Window…</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Item value="New Window">
            New Window
            <DropdownMenu.ItemSuffix>⌘+N</DropdownMenu.ItemSuffix>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            value="New Private Window"
            disabled
          >
            New Private Window
            <DropdownMenu.ItemSuffix>⇧+⌘+N</DropdownMenu.ItemSuffix>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger value="more tools">
              More Tools
              <DropdownMenu.ItemSuffix>
                <ChevronRightIcon class="tw:size-3" />
              </DropdownMenu.ItemSuffix>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                :side-offset="2"
                :align-offset="-5"
              >
                <DropdownMenu.Item>
                  Save Page As…
                  <DropdownMenu.ItemSuffix>⌘+S</DropdownMenu.ItemSuffix>
                </DropdownMenu.Item>
                <DropdownMenu.Item> Create Shortcut… </DropdownMenu.Item>
                <DropdownMenu.Item> Name Window… </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item> Developer Tools </DropdownMenu.Item>
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger value="more toolsz">
                    More Tools
                    <DropdownMenu.ItemSuffix>
                      <ChevronRightIcon class="tw:size-3" />
                    </DropdownMenu.ItemSuffix>
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      :side-offset="2"
                      :align-offset="-5"
                    >
                      <DropdownMenu.Item>
                        Save Page As…
                        <DropdownMenu.ItemSuffix>⌘+S</DropdownMenu.ItemSuffix>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item> Create Shortcut… </DropdownMenu.Item>
                      <DropdownMenu.Item> Name Window… </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item> Developer Tools </DropdownMenu.Item>
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger value="more toolsz">
                          More Tools
                          <DropdownMenu.ItemSuffix>
                            <ChevronRightIcon class="tw:size-3" />
                          </DropdownMenu.ItemSuffix>
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.SubContent
                            :side-offset="2"
                            :align-offset="-5"
                          >
                            <DropdownMenu.Item>
                              Save Page As…
                              <DropdownMenu.ItemSuffix>⌘+S</DropdownMenu.ItemSuffix>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item> Create Shortcut… </DropdownMenu.Item>
                            <DropdownMenu.Item> Name Window… </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item> Developer Tools </DropdownMenu.Item>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Sub>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Item> Developer Tools </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem v-model="checkboxOne">
            <DropdownMenu.ItemIndicator>
              <CheckIcon class="tw:size-3" />
            </DropdownMenu.ItemIndicator>
            Show Bookmarks
            <DropdownMenu.ItemSuffix>⌘+B</DropdownMenu.ItemSuffix>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem v-model="checkboxTwo">
            <DropdownMenu.ItemIndicator>
              <CheckIcon class="tw:size-3" />
            </DropdownMenu.ItemIndicator>
            Show Full URLs
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Separator />

          <DropdownMenu.Label>People</DropdownMenu.Label>
          <DropdownMenu.RadioGroup v-model="person">
            <DropdownMenu.RadioItem value="leanne">
              <DropdownMenu.ItemIndicator>
                <span class="tw:text-[10px] tw:text-stone-600">&#x25CF;</span>
              </DropdownMenu.ItemIndicator>
              Leanne Graham
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="ervin">
              <DropdownMenu.ItemIndicator>
                <span class="tw:text-[10px] tw:text-stone-600">&#x25CF;</span>
              </DropdownMenu.ItemIndicator>
              Ervin Howell"
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </div>
</template>
