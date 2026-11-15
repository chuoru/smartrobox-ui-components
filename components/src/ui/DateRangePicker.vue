<script setup lang="ts">
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { DateRangePicker } from 'reka-ui/namespaced';
import type { DateRange } from 'reka-ui';

const model = defineModel<DateRange | null>();

withDefaults(defineProps<{ triggerLabel?: string }>(), {
  triggerLabel: 'Open calendar',
});
</script>

<template>
  <DateRangePicker.Root v-model="model">
    <DateRangePicker.Field
      v-slot="{ segments }"
      class="date-range-picker-field"
    >
      <template
        v-for="item in segments.start"
        :key="item.part"
      >
        <DateRangePicker.Input
          v-if="item.part === 'literal'"
          :part="item.part"
          type="start"
        >
          {{ item.value }}
        </DateRangePicker.Input>
        <DateRangePicker.Input
          v-else
          :part="item.part"
          class="date-range-picker-input-segment"
          type="start"
        >
          {{ item.value }}
        </DateRangePicker.Input>
      </template>
      <span class="date-range-picker-separator"> -</span>
      <template
        v-for="item in segments.end"
        :key="item.part"
      >
        <DateRangePicker.Input
          v-if="item.part === 'literal'"
          :part="item.part"
          type="end"
        >
          {{ item.value }}
        </DateRangePicker.Input>
        <DateRangePicker.Input
          v-else
          :part="item.part"
          class="date-range-picker-input-segment"
          type="end"
        >
          {{ item.value }}
        </DateRangePicker.Input>
      </template>

      <DateRangePicker.Trigger
        class="date-range-picker-trigger"
        :aria-label="triggerLabel"
      >
        <CalendarIcon class="date-picker-trigger-icon" />
      </DateRangePicker.Trigger>
    </DateRangePicker.Field>

    <DateRangePicker.Content
      :side-offset="4"
      class="date-range-picker-content"
    >
      <DateRangePicker.Arrow class="date-range-picker-arrow" />
      <DateRangePicker.Calendar
        v-slot="{ weekDays, grid }"
        class="date-range-picker-calendar"
      >
        <DateRangePicker.Header class="date-range-picker-header">
          <DateRangePicker.Prev class="date-range-picker-nav-btn">
            <ChevronLeftIcon class="date-range-picker-nav-icon" />
          </DateRangePicker.Prev>

          <DateRangePicker.Heading class="date-range-picker-heading" />
          <DateRangePicker.Next class="date-range-picker-nav-btn">
            <ChevronRightIcon class="date-range-picker-nav-icon" />
          </DateRangePicker.Next>
        </DateRangePicker.Header>
        <div class="date-range-picker-grid-wrapper">
          <DateRangePicker.Grid
            v-for="month in grid"
            :key="month.value.toString()"
            class="date-range-picker-grid"
          >
            <DateRangePicker.GridHead>
              <DateRangePicker.GridRow class="date-range-picker-grid-head-row">
                <DateRangePicker.HeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="date-range-picker-head-cell"
                >
                  {{ day }}
                </DateRangePicker.HeadCell>
              </DateRangePicker.GridRow>
            </DateRangePicker.GridHead>
            <DateRangePicker.GridBody>
              <DateRangePicker.GridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="date-range-picker-grid-row"
              >
                <DateRangePicker.Cell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                >
                  <DateRangePicker.CellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="date-range-picker-cell-trigger"
                  />
                </DateRangePicker.Cell>
              </DateRangePicker.GridRow>
            </DateRangePicker.GridBody>
          </DateRangePicker.Grid>
        </div>
      </DateRangePicker.Calendar>
    </DateRangePicker.Content>
  </DateRangePicker.Root>
</template>

<style>
.date-range-picker-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  color: var(--sr-color-text);
  border: 1px solid var(--sr-color-control-border);
  background-color: var(--sr-color-bg);
  padding: 0.25rem;
  text-align: center;
  user-select: none;

  &[data-invalid] {
    border-color: var(--sr-danger-500);
  }
  .date-range-picker-input-segment {
    border-radius: 0.25rem;
    padding: 0.125rem;
    &:focus-visible {
      outline: var(--sr-outline-width) solid var(--sr-outline-color);
    }
    &[data-placeholder] {
      color: var(--sr-color-placeholder);
    }
  }
  .date-range-picker-separator {
    margin-inline: 0.5rem;
  }
  .date-range-picker-trigger {
    margin-left: 1rem;
    border-radius: 0.25rem;
    padding: 0.25rem;
    .date-picker-trigger-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 var(--sr-outline-width) var(--sr-outline-color);
  }
}

.date-range-picker-content {
  border-radius: 0.25rem;
  border: 1px solid var(--sr-color-border);
  color: var(--sr-color-text);
  background-color: var(--sr-color-bg-dlg);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  .date-range-picker-arrow {
    fill: var(--sr-color-bg-dlg);
    stroke: var(--sr-color-border);
    transform: translateY(-1px);
  }
  .date-range-picker-calendar {
    padding: 1rem;

    .date-range-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .date-range-picker-nav-btn {
        display: inline-flex;
        height: 1.75rem;
        width: 1.75rem;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
        background-color: transparent;

        &:hover {
          opacity: 0.45;
        }
        &:focus-visible {
          outline: var(--sr-outline-width) solid var(--sr-outline-color);
        }
        .date-range-picker-nav-icon {
          width: 1rem;
          height: 1rem;
        }
      }
      .date-range-picker-heading {
        font-weight: 500;
      }
    }
  }
  .date-range-picker-grid-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;

    .date-range-picker-grid {
      width: 100%;
      border-collapse: collapse;
      user-select: none;

      .date-range-picker-grid-head-row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 0.25rem;

        .date-range-picker-head-cell {
          width: 2rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          color: var(--sr-success-800);
        }
      }
      .date-range-picker-grid-row {
        display: flex;
        width: 100%;

        .date-range-picker-cell-trigger {
          position: relative;
          display: flex;
          height: 2rem;
          width: 2rem;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          white-space: nowrap;
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--sr-color-text);
          outline: none;

          &:hover {
            background-color: var(--sr-success-400);
          }
          &[data-outside-view] {
            color: var(--sr-gray-300);
          }
          &[data-selected] {
            color: var(--sr-gray-100);
            background-color: var(--sr-success-500);
          }
          &[data-highlighted] {
            background-color: var(--sr-success-400);
          }
          &[data-unavailable] {
            pointer-events: none;
            background-color: var(--sr-gray-400);
            text-decoration: line-through;
          }
          &[data-today] {
            font-weight: bold;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
