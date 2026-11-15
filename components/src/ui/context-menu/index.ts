import {
  ContextMenuRoot as Root,
  ContextMenuTrigger as Trigger,
  ContextMenuPortal as Portal,
  ContextMenuSub as Sub,
  ContextMenuRadioGroup as RadioGroup,
} from 'reka-ui';
import Content from './Content.vue';
import Item from './Item.vue';
import ItemSuffix from './ItemSuffix.vue';
import Separator from './Separator.vue';
import Label from './Label.vue';
import CheckboxItem from './CheckboxItem.vue';
import RadioItem from './RadioItem.vue';
import ItemIndicator from './ItemIndicator.vue';
import SubContent from './SubContent.vue';
import SubTrigger from './SubTrigger.vue';

export const ContextMenu: {
  Root: typeof Root;
  Content: typeof Content;
  Item: typeof Item;
  ItemSuffix: typeof ItemSuffix;
  Trigger: typeof Trigger;
  Separator: typeof Separator;
  Label: typeof Label;
  CheckboxItem: typeof CheckboxItem;
  RadioGroup: typeof RadioGroup;
  RadioItem: typeof RadioItem;
  ItemIndicator: typeof ItemIndicator;
  Portal: typeof Portal;
  Sub: typeof Sub;
  SubContent: typeof SubContent;
  SubTrigger: typeof SubTrigger;
} = {
  Root,
  Content,
  Item,
  ItemSuffix,
  Trigger,
  Separator,
  Label,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Portal,
  Sub,
  SubContent,
  SubTrigger,
};
